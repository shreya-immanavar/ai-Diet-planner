import { Dumbbell01Icon, Fire02Icon, PlusSignSquareIcon, TimeQuarterPassIcon, ServingFoodIcon, EggsIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { Image, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../shared/Colors';

export default function RecipeIntro({ recipeDetail, onAddClick }) {
    const RecipeJson = recipeDetail?.jsonData;
    return (
        <View>
            <Image source={{ 
                    uri: recipeDetail?.imageUrl === 'https://via.placeholder.com/400?text=No+Image' 
                        ? 'https://dummyimage.com/400x400/cccccc/000000.png&text=No+Image' 
                        : recipeDetail?.imageUrl 
                }}
                style={{
                    width: '100%',
                    height: 200,
                    borderRadius: 15
                }}
            />
            <View style={{
                marginTop: 15,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between'
            }}>
                <Text style={{
                    fontSize: 25,
                    fontWeight: 'bold'
                }}>{recipeDetail?.recipeName}</Text>
                <TouchableOpacity onPress={onAddClick}>
                    <HugeiconsIcon icon={PlusSignSquareIcon}
                        size={40}
                        color={Colors.PRIMARY}
                    />
                </TouchableOpacity>
            </View>
            <Text style={{
                fontSize: 16,
                marginTop: 6,
                color: Colors.GRAY,
                lineHeight: 25
            }}>{RecipeJson?.description}</Text>

            <View style={{
                marginTop: 15,
                display:'flex',
                flexDirection:'row',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 10
            }}>
                <View style={styles.propertiesContainer}>
                    <HugeiconsIcon icon={Fire02Icon} color={Colors.PRIMARY}
                        size={27} />
                    <Text style={
                        styles.subText
                    }>Calories</Text>
                    <Text style={styles.counts}>{RecipeJson?.calories || '-'}</Text>
                </View>
                 <View style={styles.propertiesContainer}>
                    <HugeiconsIcon icon={TimeQuarterPassIcon} color={Colors.PRIMARY}
                        size={27} />
                    <Text style={
                        styles.subText
                    }>Time</Text>
                    <Text style={styles.counts}>{RecipeJson?.cookTime ? RecipeJson?.cookTime + ' mins' : '-'}</Text>
                </View>
                 <View style={styles.propertiesContainer}>
                    <HugeiconsIcon icon={ServingFoodIcon} color={Colors.PRIMARY}
                        size={27} />
                    <Text style={
                        styles.subText
                    }>Serve</Text>
                    <Text style={styles.counts}>{RecipeJson?.serveTo || '-'}</Text>
                </View>
                 <View style={styles.propertiesContainer}>
                    <HugeiconsIcon icon={EggsIcon} color={Colors.PRIMARY}
                        size={27} />
                    <Text style={
                        styles.subText
                    }>Protein</Text>
                    <Text style={styles.counts}>{RecipeJson?.proteins != null ? `${RecipeJson?.proteins}g` : RecipeJson?.protein != null ? `${RecipeJson?.protein}g` : '-'}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    iconBg: {
        padding: 6

    },
    propertiesContainer:{
        display:'flex',
        alignItems:'center',
        flex: 1
    },
    subText: {
        fontSize: 18
    },
    counts: {
        fontSize: 22,
        color: Colors.PRIMARY,
        fontWeight:'bold'
    }
})