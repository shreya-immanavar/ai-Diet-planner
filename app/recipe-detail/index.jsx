import { useQuery } from 'convex/react';
import { useLocalSearchParams } from 'expo-router';
import { useRef } from 'react';
import { FlatList, View } from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import RecipeIngredients from '../../components/RecipeIngredients';
import RecipeIntro from '../../components/RecipeIntro';
import RecipeSteps from '../../components/RecipeSteps';
import Button from '../../components/shared/Button';
import { api } from '../../convex/_generated/api';
import Colors from '../../shared/Colors';
import AddToMealActionSheet from '../../components/AddToMealActionSheet';

export default function RecipeDetail() {
    const { recipeId } = useLocalSearchParams();
    const actionSheetRef=useRef(null);
    const recipeDetail = useQuery(api.Recipes.GetRecipeById, {
        id: recipeId ?? 'j977j3n3dswm1e7rzyw50mve9x7e4a2a'
    });

    return (
        <View style={{ flex: 1, backgroundColor: Colors.WHITE }}>
            <FlatList
                data={[]}
                renderItem={null}
                ListHeaderComponent={
                    <View style={{ padding: 20, paddingTop: 30 }}>
                        {/* Recipe Intro */}
                        <RecipeIntro recipeDetail={recipeDetail} onAddClick={() => actionSheetRef.current?.show()} />

                        {/* Recipe Ingredient */}
                        <RecipeIngredients recipeDetail={recipeDetail} />

                        {/* Cooking Steps */}
                        <RecipeSteps recipeDetail={recipeDetail} />

                        {/* Button moved inside */}
                        <View style={{ marginTop: 20 }}>
                            <Button title={'Add to Meal Plan'}  onPress={()=>actionSheetRef.current.show()}/>
                        </View>

                        <ActionSheet ref={actionSheetRef}>
                                <AddToMealActionSheet recipeDetail={recipeDetail} hideActionSheet={()=>actionSheetRef.current.hide()}/>
                        </ActionSheet>
                    </View>
                }
            />
        </View>
    );
}