import React, { useState, useEffect, useContext } from 'react';
import { Text, TouchableOpacity, View, FlatList, Alert } from 'react-native';
import Colors from '../shared/Colors';
import moment from 'moment';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { Coffee02Icon, Sun03Icon, Moon02Icon } from '@hugeicons/core-free-icons';
import { UserContext } from '../context/UserContext';
import { RefreshDataContext } from '../context/RefreshDataContext';
import { api } from '../convex/_generated/api';
import { useMutation } from 'convex/react';
import Button from './shared/Button';
import DateSelectionCard from './DateSelectionCard';

export default function AddToMealActionSheet({ recipeDetail, hideActionSheet }) {
    const [selectedDate, setSelectedDate] = useState();
    const [selectedMeal, setSelctedMeal] = useState();
    const [loading, setLoading] = useState(false);
    const { user } = useContext(UserContext)
    const { setRefreshData } = useContext(RefreshDataContext); // Added context to trigger UI reload
    const CreateMealPlan = useMutation(api.MealPlan.CreateMealPlan)
    const mealOptions = [
        {
            title: 'Breakfast',
            icon: Coffee02Icon
        },
        {
            title: 'Lunch',
            icon: Sun03Icon
        },
        {
            title: 'Dinner',
            icon: Moon02Icon
        }
    ];

    

    const AddToMealPlan = async() => {
        if (!selectedDate || !selectedMeal) {
            Alert.alert('Error!', 'Please Select All Details ')
            return;
        }
        setLoading(true);
        try {
            const result = await CreateMealPlan({
                date: selectedDate,
                mealType: selectedMeal,
                recipeId: recipeDetail?._id,
                uid: user?._id
            });
            console.log(result);
            
            if (result?.error) {
                Alert.alert('Cannot Add Meal', result.message);
                setLoading(false);
                return;
            }
            
            // Trigger a global refresh so TodaysMealPlan updates immediately
            setRefreshData(Date.now());
            
            Alert.alert('Added!', 'Added to Meal Plan')
            hideActionSheet()
        } catch (e) {
            console.error(e);
            Alert.alert('Error', 'Failed to add meal');
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={{ padding: 20 }}>
            <Text style={{
                fontSize: 20,
                fontWeight: 'bold',
                textAlign: 'center'
            }}>
                Add To Meal
            </Text>

         <DateSelectionCard setSelectedDate={setSelectedDate}/>

            <FlatList
                data={mealOptions}
                numColumns={3}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => setSelctedMeal(item.title)}
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            padding: 7,
                            borderWidth: 1,
                            borderRadius: 10,
                            margin: 5,
                            backgroundColor: selectedMeal == item.title ? Colors.SECONDARY : Colors.WHITE,
                            borderColor: selectedMeal == item.title ? Colors.PRIMARY : Colors.GRAY
                        }}>

                        <HugeiconsIcon icon={item.icon} />

                        <Text style={{
                            fontSize: 20,
                            fontWeight: 'bold'
                        }}>
                            {item.title}
                        </Text>
                    </TouchableOpacity>
                )}
            />
            <View style={{
                marginTop: 15
            }}>
                <Button title={' + Add To Meal Plan'} onPress={AddToMealPlan} loading={loading} />
                <TouchableOpacity
                    onPress={() => hideActionSheet()}
                    style={{
                        padding: 15
                    }}>
                    <Text style={{
                        textAlign: 'center',
                        fontSize: 20
                    }}>Cancel</Text>
                </TouchableOpacity>
            </View >
        </View>
    );
}