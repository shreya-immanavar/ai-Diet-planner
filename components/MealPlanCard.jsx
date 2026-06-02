import { Text, View, StyleSheet, Image, Alert, TouchableOpacity } from 'react-native';
import Colors from '../shared/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { api } from '../convex/_generated/api';
import { RefreshDataContext } from '../context/RefreshDataContext';
import { useMutation } from 'convex/react';
import { useContext } from 'react';

export default function MealPlanCard({ mealPlanInfo }) {

    const updateStatus = useMutation(api.MealPlan.updateStatus);
    const {refreshData, setRefreshData}=useContext(RefreshDataContext)
    const onCheck = async(status) => {
        const result = await updateStatus({
            id: mealPlanInfo?.mealPlan?._id,
            status: status,
            calories: Number(mealPlanInfo?.recipe?.jsonData?.calories) || 0,
            proteins: Number(mealPlanInfo?.recipe?.jsonData?.proteins || mealPlanInfo?.recipe?.jsonData?.protein) || 0
        });
        Alert.alert('Great!','Status Updated!');
        setRefreshData(Date.now());
    }
    return (
        <View style={{
            padding: 20,
            display: 'flex',
            flexDirection: 'row',
            gap: 10,
            backgroundColor: Colors.WHITE,
            borderRadius: 15,
            marginTop: 10
        }}>
            <Image source={{ uri: mealPlanInfo?.recipe?.imageUrl }}
                style={{
                    width: 70,
                    height: 70,
                    borderRadius: 15
                }}
            />
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 10,
                flex: 1
            }}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.mealTypeText}>{mealPlanInfo?.mealPlan?.mealType}</Text>
                    <Text style={styles.recipeName}>{mealPlanInfo?.recipe?.recipeName}</Text>
                    <View style={{ flexDirection: 'row', gap: 10 }}>
                        <Text style={styles.calories}>• {mealPlanInfo?.recipe?.jsonData?.calories} Kcal</Text>
                        <Text style={[styles.calories, {color: Colors.PRIMARY}]}>
                            • {mealPlanInfo?.recipe?.jsonData?.proteins || mealPlanInfo?.recipe?.jsonData?.protein || 0}g Protein
                        </Text>
                    </View>
                </View>
                <View>
                    {mealPlanInfo?.mealPlan?.status === true ?
                        <TouchableOpacity onPress={() => onCheck(false)}>
                            <Ionicons name="checkbox" size={28} color={Colors.GREEN} />
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPress={() => onCheck(true)}>
                            <Ionicons name="square-outline" size={28} color={Colors.GRAY} />
                        </TouchableOpacity>
                    }
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mealTypeText: {
        backgroundColor: Colors.SECONDARY,
        color: Colors.PRIMARY,
        padding: 2,
        paddingHorizontal: 10,
        borderRadius: 99,
        alignSelf: 'flex-start'
    },
    recipeName: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    calories: {
        fontSize: 16,
        fontWeight: '500',
        marginTop: 5,
        color: Colors.GREEN
    }
})