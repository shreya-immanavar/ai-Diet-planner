import { View, FlatList } from 'react-native';
import React, { useEffect, useContext } from 'react';
import { UserContext } from './../../context/UserContext';
import { useRouter, useRootNavigationState } from 'expo-router';
import HomeHeader from '../../components/HomeHeader';
import TodayProgress from '../../components/TodayProgress';
import GenerateRecipeCard from '../../components/GenerateRecipeCard';
import TodaysMealPlan from '../../components/TodaysMealPlan';

export default function Home() {
    const { user } = useContext(UserContext);
    const router = useRouter();
    const navigationState = useRootNavigationState();

    useEffect(() => {
        // Wait until Expo Router has fully mounted the navigation tree
        if (!navigationState?.key) return;

        if (!user?.weight) {
            // Using a tiny timeout delays the redirect until the current React render cycle finishes.
            // This cleanly avoids the "navigated before mounting" error in Metro/Web environments!
            const timer = setTimeout(() => {
                router.replace('/preferance');
            }, 10);
            return () => clearTimeout(timer);
        }
    }, [user, navigationState, router]);

    return (
        <FlatList
            data={[]}
            renderItem={() => null}
            ListHeaderComponent={
                <View style={{
                    padding: 20
                }}>
                    <HomeHeader />
                    <TodayProgress />
                    <GenerateRecipeCard />
                    <TodaysMealPlan />
                </View>
            }
        />

    );
}