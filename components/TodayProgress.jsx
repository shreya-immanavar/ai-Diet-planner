import moment from 'moment'
import { useContext, useState, useEffect } from 'react'
import { Text, View } from 'react-native'
import { UserContext } from '../context/UserContext'
import Colors from '../shared/Colors'
import { useConvex } from 'convex/react'
import { api } from './../convex/_generated/api'
import { RefreshDataContext } from '../context/RefreshDataContext'

export default function TodayProgress() {
    const { user } = useContext(UserContext)
    const convex = useConvex();
    const [totalCaloriesConsumed, setTotalCaloriesConsumed] = useState(0);
    const [totalProteinsConsumed, setTotalProteinsConsumed] = useState(0);
    const {refreshData, setRefreshData}=useContext(RefreshDataContext)
    

    useEffect(() => {
        user && GetTotalCaloriesConsumed();
    }, [user,refreshData])
    const GetTotalCaloriesConsumed = async () => {
        const result = await convex.query(api.MealPlan.GetTotalCaloriesConsumed, {
            date: moment().format('DD/MM/YYYY'),
            uid: user?._id
        })

        setTotalCaloriesConsumed(result?.totalCalories || 0);
        setTotalProteinsConsumed(result?.totalProteins || 0);
    }
    
    const targetCalories = user?.calories || 3000;
    const progress = Math.min((totalCaloriesConsumed / targetCalories) * 100, 100);
    
    const targetProteins = user?.proteins || 100;
    const proteinProgress = Math.min((totalProteinsConsumed / targetProteins) * 100, 100);
    
    const getMotivationMessage = () => {
        if (progress === 0) return "Let's get started! 💪";
        if (progress < 50) return "Keep it up! 🔥";
        if (progress < 80) return "You're doing great! 🌟";
        if (progress < 100) return "Almost there! 🎯";
        return "Goal Reached! 🏆";
    }

    const getProteinMotivationMessage = () => {
        if (proteinProgress === 0) return "Let's get started! 💪";
        if (proteinProgress < 50) return "Keep it up! 🔥";
        if (proteinProgress < 80) return "You're doing great! 🌟";
        if (proteinProgress < 100) return "Almost there! 🎯";
        return "Goal Reached! 🏆";
    }


    return (
        <View style={{
            marginTop: 15,
            padding: 15,
            backgroundColor: Colors.WHITE,
            borderRadius: 10
        }}>

            {/* ONLY header should be row */}
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <Text style={{
                    fontSize: 20,
                    fontWeight: 'bold'
                }}>
                    Today&apos;s Goal
                </Text>

                <Text style={{
                    fontSize: 18
                }}>
                    {moment().format('MMM DD, YYYY')} {/* ✅ fixed */}
                </Text>
            </View>

            {/* Rest stays SAME */}
            <Text style={{
                fontSize: 30,
                fontWeight: 'bold',
                textAlign: 'center',
                marginTop: 10,
                color: Colors.PRIMARY
            }}>
                {totalCaloriesConsumed}/{user?.calories || 3000} kcal
            </Text>

            <Text style={{
                textAlign: 'center',
                marginTop: 2,
                fontSize: 16,
            }}>
                You&apos;re doing great! {/* ✅ fixed */}
            </Text>

            <View style={{
                backgroundColor: Colors.GRAY,
                height: 10,
                borderRadius: 99,
                marginTop: 15,
                opacity: 0.7
            }}>
                <View style={{
                    backgroundColor: Colors.PRIMARY,
                    width: `${progress}%`,
                    height: 10,
                    borderRadius: 99
                }} />
            </View>

            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 5
            }}>
                <Text>Calories Consumed</Text>
                <Text>{getMotivationMessage()}</Text>
            </View>

            {/* Protein Tracker */}
            <Text style={{
                fontSize: 25,
                fontWeight: 'bold',
                textAlign: 'center',
                marginTop: 20,
                color: Colors.BLUE || '#3b82f6'
            }}>
                {totalProteinsConsumed}/{targetProteins} g
            </Text>

            <View style={{
                backgroundColor: Colors.GRAY,
                height: 10,
                borderRadius: 99,
                marginTop: 15,
                opacity: 0.7
            }}>
                <View style={{
                    backgroundColor: Colors.BLUE || '#3b82f6',
                    width: `${proteinProgress}%`,
                    height: 10,
                    borderRadius: 99
                }} />
            </View>

            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 5
            }}>
                <Text>Proteins Consumed 🥩</Text>
                <Text>{getProteinMotivationMessage()}</Text>
            </View>

        </View>
    )
}