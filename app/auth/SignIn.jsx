import { Link, useRouter } from 'expo-router';
import { useContext, useState } from 'react';
import { Alert, Image, Platform, Text, View, ScrollView } from 'react-native';
import Button from '../../components/shared/Button'; // ✅ FIXED
import Input from '../../components/shared/Input'; // ✅ FIXED

// Firebase
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../services/FirebaseConfig";

// Convex
import { useConvex, useMutation } from "convex/react";
import { UserContext } from '../../context/UserContext';
import { api } from "../../convex/_generated/api";



export default function SignIn(){

  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const convex = useConvex();

  const { setUser } = useContext(UserContext);

  const createNewUser = useMutation(api.users.createNewUser);

  const onSignIn = async () => {
    const cleanEmail = email.trim(); // Prevent trailing space errors
    
    if (!cleanEmail || !password) {
      if (Platform.OS === 'web') {
        alert('Enter All Field Values');
      } else {
        Alert.alert('Missing Fields!', 'Enter All Field Values');
      }
      return;
    }

    // Standard email validation: accepts pure letters, numbers, and standard symbols
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      if (Platform.OS === 'web') {
        alert('Please enter a valid email address');
      } else {
        Alert.alert('Invalid Email', 'Please enter a valid email address');
      }
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, cleanEmail, password);
      const firebaseUser = userCredential.user;

      const userData = await convex.query(api.users.getUser, {
        email: cleanEmail
      });

      console.log(firebaseUser);

      if (userData) {
        setUser(userData);
      } else if (firebaseUser) {
        const resultObj = await createNewUser({
          email: email,
          name: "User"
        });

        console.log("Convex saved:", resultObj);
        setUser(resultObj);
      }

      router.replace('/(tabs)/Home');

    } catch (error) {
      console.log(error);

      if (Platform.OS === 'web') {
        alert(error.message);
      } else {
        Alert.alert("Login Failed", error.message);
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow:1, alignItems:'center', padding:20 }}>
      <Image source={require('./../../assets/images/logo.png')}
        style={{ width: 167, height: 150, marginTop: 60 }} />

      <Text style={{ fontSize: 30, fontWeight: 'bold' }}>
        Welcome Back
      </Text>

      <View style={{ marginTop: 20, width: '100%' }}>
        <Input placeholder="Email" value={email} onChangeText={setEmail}/>
        <Input placeholder="Password" value={password} password onChangeText={setPassword}/>
      </View>

      <View style={{ marginTop: 15, width: '100%' }}>
        <Button title="Sign In" onPress={onSignIn}/>

        <Text style={{ textAlign: 'center', marginTop: 15 }}>
          Don&apos;t have an account?
        </Text>

        <Link href="/auth/SignUp">
          <Text style={{ textAlign: 'center', marginTop: 10, fontWeight: 'bold' }}>
            Create New Account
          </Text>
        </Link>
      </View>
    </ScrollView>
  );
}



