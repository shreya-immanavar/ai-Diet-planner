import { Link, useRouter } from 'expo-router';
import { useContext, useState } from 'react';
import { Alert, Image, Platform, Text, View, ScrollView } from 'react-native';
import Button from '../../components/shared/Button';
import Input from '../../components/shared/Input';

// Firebase
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../services/FirebaseConfig";

// Convex
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

// Context
import { UserContext } from "../../context/UserContext";



export default function SignUp() {

  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { setUser } = useContext(UserContext);

  const createNewUser = useMutation(api.users.createNewUser);

  const onSignUp = async () => {
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
      const userCredential = await createUserWithEmailAndPassword(auth, cleanEmail, password);
      const user = userCredential.user;

      console.log(user);

      if (user) {
        const resultObj = await createNewUser({
          name: name || "user",
          email: email
        });

        console.log("Convex saved:", resultObj);

        setUser(resultObj);

        // ✅ ADDED SUCCESS MESSAGE
        if (Platform.OS === 'web') {
          alert("Account Created Successfully 🎉");
        } else {
          Alert.alert("Success", "Account Created Successfully 🎉");
        }

        router.replace('/(tabs)/Home');
      }

    } catch (error) {
      console.log(error);

      if (Platform.OS === 'web') {
        alert(error.message);
      } else {
        Alert.alert("Error", error.message);
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center', padding: 20 }}>
      
      <Image 
        source={require('./../../assets/images/logo.png')} 
        style={{ width: 167, height: 150, marginTop: 60 }} 
      />

      <Text style={{ fontSize: 25, fontWeight: 'bold' }}>
        Create New Account
      </Text>

      <View style={{ marginTop: 20, width: '100%' }}>
        <Input placeholder="Full Name" value={name} onChangeText={setName}/>
        <Input placeholder="Email" value={email} onChangeText={setEmail}/>
        <Input placeholder="Password" value={password} password onChangeText={setPassword}/>
      </View>

      <View style={{ marginTop: 15, width: '100%' }}>
        <Button title="Create Account" onPress={onSignUp}/>

        <Text style={{ textAlign: 'center', marginTop: 15 }}>
          Already have an account?
        </Text>

        <Link href="/auth/SignIn">
          <Text style={{ textAlign: 'center', marginTop: 10, fontWeight: 'bold' }}>
            Sign In Here
          </Text>
        </Link>
      </View>
    </ScrollView>
  );
}