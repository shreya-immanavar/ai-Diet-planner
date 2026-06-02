import { View, Text, Platform, FlatList } from 'react-native'
import React from 'react'
import GenerateRecipeCard from '../../components/GenerateRecipeCard'
import RecipeCard from '../../components/RecipeCard';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';

export default function Meals() {

  const recipeList = useQuery(api.Recipes.GetAllRecipes);
  console.log(recipeList);

  return (
    <FlatList
      data={recipeList ?? []}
      keyExtractor={(item) => item._id}
      numColumns={2}
      contentContainerStyle={{
        padding: 20,
        paddingTop: Platform.OS === 'ios' ? 40 : 30,
      }}
      columnWrapperStyle={{ gap: 10 }}
      ListHeaderComponent={
        <View>
          <Text style={{
            fontSize: 30,
            fontWeight: 'bold',
            marginBottom: 4,
          }}>Discover Recipes 🥗</Text>

          <GenerateRecipeCard />

          {recipeList?.length === 0 && (
            <Text style={{
              textAlign: 'center',
              marginTop: 30,
              fontSize: 16,
              color: '#888',
            }}>
              No recipes yet. Generate one above! 👆
            </Text>
          )}
        </View>
      }
      renderItem={({ item }) => (
        <RecipeCard recipe={item} />
      )}
    />
  )
}