import { Platform, StyleSheet, Text, TextInput, View, FlatList } from 'react-native'
import Button from '../../components/shared/Button'
import Colors from '../../shared/Colors'
import { GenerateAIRecipe } from '../../services/AiModel'
import Prompt from '../../shared/Prompt'
import { useState, useContext } from 'react'
import { TouchableOpacity } from 'react-native'
import RecipeOptionList from '../../components/RecipeOptionList'
import { UserContext } from '../../context/UserContext'

export default function GenerateAiRecipe() {
    const { user } = useContext(UserContext);
    const [input, setInput] = useState();
    const [type, setType] = useState('Veg');
    const [loading, setLoading] = useState(false);
    const [recipeOption,setRecipeOption]=useState([]);
    const GenerateRecipeOptions = async () => {
        setLoading(true);
        // Make AI Model call to generate recipe Options
        try {
            const calorieTarget = user?.calories || 3000;
            const PROMPT = "User Input: '" + input + "'. Dietary Preference: " + type + ".\nIMPORTANT: The user has a daily target of " + calorieTarget + " kcal. Please dynamically scale the ingredients, portion sizes, and resulting calories of the generated recipes so that they represent substantial meals (e.g., 500-1000 kcal each) to help the user realistically hit this overall daily goal.\n" + Prompt.GENERATE_RECIPE_OPTION_PROMPT;
            const result = await GenerateAIRecipe(PROMPT);
            console.log(result.choices[0].message)
            const extractJson=(result.choices[0].message.content).replace('```json','').replace('```','')
            const parsedJSONResp=JSON.parse(extractJson);
            console.log(parsedJSONResp);
            setRecipeOption(parsedJSONResp);
            setLoading(false)
        }
        catch (e) {
            setLoading(false);
            console.log(e)
        }

    }
    return (
        <FlatList
            data={[]}
            renderItem={null}
            ListHeaderComponent={
                <View style={{
                    paddingTop: Platform.OS === 'ios' ? 40 : 20,
                    padding: 20,
                    backgroundColor: Colors.WHITE,
                    height: '100%'
                }}>
                    <Text style={{
                        fontSize: 25,
                        fontWeight: 'bold'
                    }}>
                        AI Recipe Generator
                    </Text>

                    <Text style={{
                        marginTop: 10,
                        fontSize: 16,
                        color: Colors.GRAY
                    }}>
                        Generate personalized recipes using AI
                    </Text>

                    <TextInput
                        style={styles.textarea}
                        onChangeText={(value) => setInput(value)}
                        placeholder='Enter your ingredient or recipe name'
                        multiline={true}   // ✅ fix
                    />

                    <View style={{ flexDirection: 'row', gap: 10, marginTop: 15 }}>
                        {['Veg', 'Non-Veg', 'Vegan'].map((item) => (
                            <TouchableOpacity key={item} onPress={() => setType(item)} style={{
                                padding: 10,
                                borderWidth: 1,
                                borderColor: type === item ? Colors.PRIMARY : Colors.GRAY,
                                borderRadius: 8,
                                backgroundColor: type === item ? Colors.PRIMARY : Colors.WHITE,
                                flex: 1,
                                alignItems: 'center'
                            }}>
                                <Text style={{color: type === item ? Colors.WHITE : Colors.GRAY, fontWeight: 'bold'}}>{item}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <View style={{
                        marginTop: 25
                    }}>
                        <Button title={'Generate Recipe'}
                            onPress={GenerateRecipeOptions}
                            loading={loading} />
                    </View>
                    {recipeOption.length>0&&<RecipeOptionList recipeOption={recipeOption}/>}
                </View>
            }
        />
    )
}

const styles = StyleSheet.create({
    textarea: {
        padding: 15,
        borderWidth: 1,
        borderRadius: 10,
        fontSize: 20,
        marginTop: 15,
        height: 150,
        textAlignVertical: 'top',
        backgroundColor: Colors.WHITE
    }
})