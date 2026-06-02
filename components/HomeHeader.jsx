import { useContext } from 'react'
import { Image, Text, View } from 'react-native'
import { UserContext } from '../context/UserContext'

export default function HomeHeader() {
    const { user } = useContext(UserContext)

    const calculateBMI = () => {
        if (!user?.weight || !user?.height) return null;
        try {
            const heightStr = String(user.height);
            const parts = heightStr.split('.');
            const feet = parseInt(parts[0]) || 0;
            const inches = parseInt(parts[1]) || 0;
            
            const totalInches = (feet * 12) + inches;
            const heightInMeters = totalInches * 0.0254;
            
            if (heightInMeters === 0) return null;
            
            const weight = parseFloat(user.weight);
            const bmi = weight / (heightInMeters * heightInMeters);
            
            return bmi.toFixed(1);
        } catch(e) {
            return null;
        }
    }


    const getBMICategory = (bmi) => {
        if (!bmi) return "";
        const val = parseFloat(bmi);
        if (val < 18.5) return "Underweight";
        if (val < 25) return "Normal";
        if (val < 30) return "Overweight";
        return "Obese";
    }

    const getBMIColor = (bmi) => {
        if (!bmi) return "gray";
        const val = parseFloat(bmi);
        if (val < 18.5) return "#3b82f6"; // Blue
        if (val < 25) return "#22c55e"; // Green
        if (val < 30) return "#f59e0b"; // Orange
        return "#ef4444"; // Red
    }

    const bmiValue = calculateBMI();

    return (
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%'
        }}>
        
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>

            <Image 
                source={require('../assets/images/profile.png')}
                style={{
                    width: 60,
                    height: 60,
                    borderRadius: 99
                }} 
            />

            <View>
                <Text style={{ fontSize: 20 }}>
                    Hello, 👋
                </Text>

                <Text style={{
                    fontSize: 23,
                    fontWeight: 'bold'
                }}>
                    {user?.name || "User"}
                </Text>
            </View>
            </View>

            {bmiValue && (
                <View style={{
                    alignItems: 'flex-end'
                }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 'bold'
                    }}>
                        BMI: {bmiValue}
                    </Text>
                    <View style={{
                        marginTop: 2,
                        backgroundColor: getBMIColor(bmiValue) + '20', // Add some transparency to bg
                        paddingHorizontal: 8,
                        paddingVertical: 2,
                        borderRadius: 99
                    }}>
                        <Text style={{
                            fontSize: 12,
                            fontWeight: '600',
                            color: getBMIColor(bmiValue)
                        }}>
                            {getBMICategory(bmiValue)}
                        </Text>
                    </View>
                </View>
            )}
        </View>
    )
}