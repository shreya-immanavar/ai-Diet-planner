import { useConvex } from "convex/react";
import { useRouter } from "expo-router";
import { onAuthStateChanged } from 'firebase/auth';
import { ArrowRight } from 'lucide-react-native';
import { useContext, useEffect } from "react";
import { Image, Text, View } from "react-native";
import Button from '../components/shared/Button';
import { UserContext } from "../context/UserContext";
import { api } from "../convex/_generated/api";
import { auth } from '../services/FirebaseConfig';
import Colors from '../shared/Colors';



export default function Index() {
  const router = useRouter();
  const { setUser } = useContext(UserContext);
  const convex = useConvex();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (userInfo) => {
      console.log(userInfo?.email);

      if (userInfo?.email) {
        const userData = await convex.query(api.users.getUser, {
          email: userInfo.email
        });

        console.log("userData from index.jsx:", userData);
        if (userData) {
          setUser(userData);
          router.replace('/(tabs)/Home');
        }
      }
    });

    return () => unsubscribe();
  }, [convex, router, setUser]);

  return (
    <View style={{ flex: 1 }}>

      <Image
        source={require('./../assets/images/landing.png')}
        style={{ width: "100%", height: '100%' }}
      />

      <View style={{
        position: 'absolute',
        height: '100%',
        backgroundColor: '#0707075e',
        width: '100%',
        alignItems: 'center',
        padding: 20
      }}>
        <Image
          source={require('./../assets/images/logo.png')}
          style={{ width: 150, height: 150, marginTop: 150 }}
          resizeMode="contain"
        />

        <Text style={{ fontSize: 30, fontWeight: 'bold', color: Colors.WHITE }}>
          Dietrix
        </Text>

        <Text style={{
          textAlign: 'center',
          marginHorizontal: 20,
          fontSize: 20,
          color: Colors.WHITE,
          marginTop: 15,
          opacity: 0.8
        }}>
          Craft delicious, healthy meal plans tailored just for you.
        </Text>
      </View>

      <View style={{
        position: 'absolute',
        width: '100%',
        bottom: 25,
        padding: 20
      }}>
        <Button
          title={'Get Started'}
          onPress={() => router.push('/auth/SignIn')}
          icon={<ArrowRight />}
        />
      </View>
    </View>
  );
}