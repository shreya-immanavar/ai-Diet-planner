import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import Colors from './../../shared/Colors'

export default function TabLayout(){
    return (
        <Tabs screenOptions={{
            tabBarActiveTintColor:Colors.PRIMARY,
            headerShown:false
        }}>
            <Tabs.Screen 
                name='Home'
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" size={size} color={color} />
                    )
                }}
            />

            <Tabs.Screen 
                name='Meals'
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="restaurant" size={size} color={color} />
                    )
                }}
            />

            <Tabs.Screen 
                name='Progress'
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="stats-chart" size={size} color={color} />
                    )
                }}
            />

            <Tabs.Screen 
                name='Profile'
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person" size={size} color={color} />
                    )
                }}
            />
        </Tabs>
    )
}