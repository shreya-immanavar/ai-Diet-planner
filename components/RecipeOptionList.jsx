import { Text, TouchableOpacity, View } from 'react-native'
import { GenerateAIRecipe, GenarteRecipeImage } from '../services/AiModel'
import Colors from '../shared/Colors'
import Prompt from '../shared/Prompt'
import React, { useState, useContext } from 'react'
import { UserContext } from './../context/UserContext'
import { api } from './../convex/_generated/api'
import { useMutation } from 'convex/react'
import LoadingDialog from './LoadingDialog'
import { useRouter } from 'expo-router'

export default function RecipeOptionList({ recipeOption }) {
    const [loading, setLoading] = useState(false);
    const CreateRecipe = useMutation(api.Recipes.CreateRecipe)
    const { user } = useContext(UserContext)
    const router = useRouter();
    const onRecipeSelectOption = async (recipe) => {
        setLoading(true);
        const PROMPT = "RecipeName:" + recipe?.recipeName + "Description:" + recipe?.description + Prompt.GENERATE_COMPLETE_RECIPE_PROMPT
        try {
            const result = await GenerateAIRecipe(PROMPT);
            const extractJson = (result.choices[0].message.content).replace('```json', '').replace('```', '')
            const parsedJSONResp = JSON.parse(extractJson);
            //generate recipe Image
            let imageUrl = 'https://dummyimage.com/400x400/cccccc/000000.png&text=No+Image'; // default string to satisfy convexity validator
            try {
                const imgPrompt = parsedJSONResp?.imagePrompt || `A delicious dish of ${parsedJSONResp?.recipeName}, food photography, high quality`;
                console.log("Image prompt:", imgPrompt);
                const aiImageResp = await GenarteRecipeImage(imgPrompt);
                console.log("Image API response:", aiImageResp?.data);
                imageUrl = aiImageResp?.data?.image || imageUrl;
                console.log("Final imageUrl:", imageUrl);
            } catch (imageError) {
                console.log("Failed to generate image:", imageError?.message || imageError);
            }
            //save it in Datebase
            const saveRecipeResult = await CreateRecipe({
                jsonData: parsedJSONResp,
                imageUrl: imageUrl,
                recipeName: parsedJSONResp?.recipeName,
                uid: user?._id
            })
            console.log(saveRecipeResult)
            //Redirect recipe Details Screen
            setLoading(false);
            router.push({
                pathname: '/recipe-detail',
                params: {
                    recipeId: saveRecipeResult
                }
            })
        
        }
        catch (e) {
        setLoading(false);
    }
    setLoading(false);
}
return (
    <View>
        <View style={{
            marginTop: 20
        }}>
            <Text style={{
                fontSize: 20,
                fontWeight: 'bold'
            }}> select Recipe</Text>
        </View>

        <View>
            {recipeOption?.map((item, index) => (
                <TouchableOpacity
                    onPress={() => onRecipeSelectOption(item)}
                    key={index} style={{
                        padding: 15,
                        borderWidth: 0.2,
                        borderRadius: 15,
                        marginTop: 15
                    }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 'bold'
                    }}>{item?.recipeName}</Text>
                    <Text style={{
                        color: Colors.GRAY
                    }}>{item?.description}</Text>
                </TouchableOpacity>
            ))}
        </View>
        <LoadingDialog loading={loading} />
    </View>
)
}