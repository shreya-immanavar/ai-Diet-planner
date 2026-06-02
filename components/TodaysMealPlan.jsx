import { Calendar03Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { useState, useEffect, useContext } from 'react';
import { Text, View, FlatList } from 'react-native';
import Colors from '../shared/Colors';
import Button from './shared/Button';
import { useConvex } from 'convex/react';
import { UserContext } from '../context/UserContext';
import { api } from '../convex/_generated/api';
import MealPlanCard from './MealPlanCard';
import moment from 'moment';
import { RefreshDataContext } from '../context/RefreshDataContext';

export default function TodaysMealPlan({ selectedDate = null }) {
    const [mealPlan, setMealPlan] = useState();
    const { user } = useContext(UserContext);
    const { refreshData, setRefreshData } = useContext(RefreshDataContext)

    const convex = useConvex();
    useEffect(() => {
        user && GetTodaysMealPlan();
    }, [user, refreshData])
    const GetTodaysMealPlan = async () => {
        const result = await convex.query(api.MealPlan.GetTodaysMealPlan, {
            date: moment(selectedDate ?? new Date()).format('DD/MM/YYYY'),
            uid: user?._id
        });
        console.log(result);
        setMealPlan(result);
    }
    return (
        <View style={{
            marginTop: 15
        }}>
            {!selectedDate && <Text style={{
                fontSize: 20,
                fontWeight: 'bold'
            }}>Todays Meal Plan</Text>}

            {!mealPlan ?
                <View style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: 20,
                    backgroundColor: Colors.WHITE,
                    marginTop: 15,
                    borderRadius: 15
                }}>
                    <HugeiconsIcon icon={Calendar03Icon} size={40} color={Colors.PRIMARY} />
                    <Text style={{
                        fontSize: 18,
                        color: Colors.GRAY,
                        marginBottom: 20
                    }}>You Don&apos;t Have Any Meal Plan For Today</Text>
                    <Button title={'Create New Meal Plan'} />
                </View>
                : <View>
                    <FlatList
                        data={mealPlan}
                        renderItem={({ item }) => (
                            <MealPlanCard mealPlanInfo={item} refreshData={GetTodaysMealPlan} />

                        )}

                    />
                </View>
            }
        </View>
    )
}