import { ArrowRight02Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Text, TouchableOpacity } from 'react-native';
import Colors from '../shared/Colors';

export default function GenerateRecipeCard() {
    const router = useRouter();

    return (
        <LinearGradient
            colors={[Colors.BLUE, Colors.PRIMARY]}
            style={{
                marginTop: 15,
                padding: 16,
                borderRadius: 14,
                elevation: 4, // Android shadow
            }}
        >
            <Text style={{
                fontSize: 22,
                fontWeight: 'bold',
                color: Colors.WHITE
            }}>
                Need Meal Ideas? ✨
            </Text>

            <Text style={{
                color: Colors.WHITE,
                fontSize: 16,
                opacity: 0.9,
                marginTop: 6,
                lineHeight: 22
            }}>
                Let our AI generate personalized recipes just for you!
            </Text>

            <TouchableOpacity
                onPress={() => router.push('/generate-ai-recipe')}
                style={{
                    paddingVertical: 12,
                    paddingHorizontal: 16,
                    backgroundColor: Colors.WHITE,
                    marginTop: 14,
                    borderRadius: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8
                }}
            >
                <Text style={{
                    color: Colors.PRIMARY,
                    fontWeight: '600',
                    fontSize: 15
                }}>
                    Generate with AI
                </Text>

                <HugeiconsIcon
                    icon={ArrowRight02Icon}
                    color={Colors.PRIMARY}
                />
            </TouchableOpacity>
        </LinearGradient>
    );
}