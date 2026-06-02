import Ionicons from '@expo/vector-icons/Ionicons';
import { Dumbbell01Icon, PlusSignSquareIcon, WeightScaleIcon, CircleIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { useMutation, useConvex } from 'convex/react';
import { useRouter } from 'expo-router'; // ✅ FIXED
import { useContext, useState } from 'react';
import { auth as firebaseAuth } from '../../services/FirebaseConfig';
import { Alert, StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native';
import { CalculateCaloriesAI } from '../../services/AiModel';
import Prompt from '../../shared/Prompt';
import Button from './../../components/shared/Button';
import Input from './../../components/shared/Input';
import { UserContext } from './../../context/UserContext'; // ✅ FIXED
import { api } from './../../convex/_generated/api'; // ✅ FIXED
import Colors from './../../shared/Colors';

export default function Preferance() {

    const [weight, setWeight] = useState()
    const [height, setHeight] = useState()
    const [gender, setGender] = useState()
    const [goal, setGoal] = useState()

    const { user, setUser } = useContext(UserContext)   // ✅ FIXED
    const router = useRouter()

    const UpdateUserPref = useMutation(api.users.UpdateUserPref)
    const convex = useConvex()

    const onContinue = async () => {
        let currentUserId = user?._id;

        // Dev mode/Live Reload Context Recovery
        if (!currentUserId) {
            const auth = firebaseAuth;
            if (auth.currentUser?.email) {
                const userData = await convex.query(api.users.getUser, { email: auth.currentUser.email });
                if (userData) {
                    currentUserId = userData._id;
                    setUser(userData);
                }
            }
        }

        console.log("User id:", currentUserId);
        if (!weight || !height || !gender) {
            Alert.alert('Fill All The Details', 'Enter All The Details To continue');
            return;
        }

        const data = {
            uid: currentUserId,
            weight: weight,
            height: height,
            gender: gender,
            goal: goal
        }
        const PROMPT = JSON.stringify(data)+Prompt.CALORIES_PROMPT
        console.log(PROMPT)
        const AIResult = await CalculateCaloriesAI(PROMPT);
        const aiContent = AIResult?.choices?.[0]?.message?.content;
        
        let JSONContent = null;
        try {
            // Clean markdown formatting if provided by the model
            const cleanContent = aiContent.replace(/```json\n?|```/gi, '').trim();
            JSONContent = JSON.parse(cleanContent);
            
            // Clean AI outputs by forcefully casting potential strings into expected Numbers
            if (JSONContent?.calories) {
                JSONContent.calories = Number(JSONContent.calories);
            }
            if (JSONContent?.proteins) {
                JSONContent.proteins = Number(JSONContent.proteins);
            }
            
            console.log("\n=======================================");
            console.log("✅ AI Model Response:");
            console.log(JSON.stringify(JSONContent, null, 2));
            console.log("=======================================\n");
        } catch (_error) {
           console.log("❌ Error parsing JSON from AI model:", aiContent);
           Alert.alert("Error", "Failed to generate meal plan. Please try again.");
           return;
        }

        if (!currentUserId) {
            alert("No user ID found. Please try logging in again.");
            Alert.alert("Error", "User context completely disconnected.");
            return;
        }

        await UpdateUserPref({
            ...data,
            ...JSONContent
        })
        setUser(prev => ({
            ...prev,
            ...data,
            ...JSONContent
        }))

        router.replace('/(tabs)/Home')
    }

    return (
        <FlatList
            data={[]}
            renderItem={null}
            ListHeaderComponent={
                <View style={{
                    padding: 20,
                    backgroundColor: Colors.WHITE,
                    height: '100%'
                }}>
                    <Text style={{
                        textAlign: 'center',
                        fontSize: 30,
                        fontWeight: 'bold',
                        marginTop: 30
                    }}>
                        Tell Us About Yourself
                    </Text>

                    <Text style={{
                        fontSize: 16,
                        textAlign: 'center',
                        color: Colors.GRAY
                    }}>
                        This help us create your personalized meal plan
                    </Text>

                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 10
                    }}>
                        <View style={{ flex: 1 }}>
                            <Input placeholder={'e.g 70'} label='Weight (kg)' onChangeText={setWeight} />
                        </View>

                        <View style={{ flex: 1 }}>
                            <Input placeholder={'e.g 5.10'} label='Height (ft)' onChangeText={setHeight} />
                        </View>
                    </View>

                    {/* Gender */}
                    <View style={{ marginTop: 20 }}>
                        <Text style={{
                            fontWeight: '500',
                            fontSize: 18
                        }}>
                            Gender
                        </Text>

                        <View style={{
                            flexDirection: 'row',
                            gap: 10
                        }}>
                            <TouchableOpacity
                                onPress={() => setGender('Male')}
                                style={{
                                    borderWidth: 1,
                                    padding: 15,
                                    borderColor: gender === 'Male' ? Colors.PRIMARY : Colors.GRAY,
                                    borderRadius: 10,
                                    flex: 1,
                                    alignItems: 'center',
                                }}>
                                <Ionicons name="male" size={40} color={Colors.BLUE} />
                                <Text style={{ marginTop: 5, fontWeight: '600' }}>Male</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => setGender('Female')}
                                style={{
                                    borderWidth: 1,
                                    padding: 15,
                                    borderColor: gender === 'Female' ? Colors.PRIMARY : Colors.GRAY,
                                    borderRadius: 10,
                                    flex: 1,
                                    alignItems: 'center'
                                }}>
                                <Ionicons name="female" size={40} color={Colors.PINK} />
                                <Text style={{ marginTop: 5, fontWeight: '600' }}>Female</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => setGender('Other')}
                                style={{
                                    borderWidth: 1,
                                    padding: 15,
                                    borderColor: gender === 'Other' ? Colors.PRIMARY : Colors.GRAY,
                                    borderRadius: 10,
                                    flex: 1,
                                    alignItems: 'center'
                                }}>
                                <HugeiconsIcon icon={CircleIcon} size={40} color={Colors.PRIMARY} />
                                <Text style={{ marginTop: 5, fontWeight: '600' }}>Other</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Goals */}
                    <View style={{ marginTop: 20 }}>
                        <Text style={{
                            fontWeight: '500',
                            fontSize: 18
                        }}>
                            What&apos;s Your Goal?
                        </Text>

                        <TouchableOpacity
                            onPress={() => setGoal('Weight Loss')}
                            style={[
                                styles.GoalContainer,
                                {
                                    borderColor: goal === 'Weight Loss' ? Colors.PRIMARY : Colors.GRAY
                                }
                            ]}>
                            <HugeiconsIcon icon={WeightScaleIcon} size={24} />
                            <View style={{ marginLeft: 12 }}>
                                <Text style={styles.goalText}>Weight Loss</Text>
                                <Text style={styles.goalSubText}>Reduce Body Fat and get leaner</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => setGoal('Muscle Gain')}
                            style={[
                                styles.GoalContainer,
                                {
                                    borderColor: goal === 'Muscle Gain' ? Colors.PRIMARY : Colors.GRAY
                                }
                            ]}>
                            <HugeiconsIcon icon={Dumbbell01Icon} size={24} />
                            <View style={{ marginLeft: 12 }}>
                                <Text style={styles.goalText}>Muscle Gain</Text>
                                <Text style={styles.goalSubText}>Build Muscle & Get Stronger</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => setGoal('Weight Gain')}
                            style={[
                                styles.GoalContainer,
                                {
                                    borderColor: goal === 'Weight Gain' ? Colors.PRIMARY : Colors.GRAY
                                }
                            ]}>
                            <HugeiconsIcon icon={PlusSignSquareIcon} size={24} />
                            <View style={{ marginLeft: 12 }}>
                                <Text style={styles.goalText}>Weight Gain</Text>
                                <Text style={styles.goalSubText}>Increase Healthy Body Mass</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={{
                        marginTop: 25,
                        marginBottom: 40
                    }}>
                        <Button title={'Continue'} onPress={onContinue} />
                    </View>
                </View>
            }
        />
    )
}

const styles = StyleSheet.create({
    goalText: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    goalSubText: {
        color: Colors.GRAY
    },
    GoalContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.GRAY,
        borderRadius: 10,
        padding: 15,
        marginTop: 10
    }
});
