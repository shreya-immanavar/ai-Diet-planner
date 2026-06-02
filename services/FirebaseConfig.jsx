// Import the functions you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  getReactNativePersistence,
  initializeAuth
} from "firebase/auth";
import { Platform } from "react-native";

import AsyncStorage from '@react-native-async-storage/async-storage';

// Firebase config
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: "ai-diet-planner-61674.firebaseapp.com",
  projectId: "ai-diet-planner-61674",
  storageBucket: "ai-diet-planner-61674.firebasestorage.app",
  messagingSenderId: "352762012765",
  appId: "1:352762012765:web:007703062d5f9353a6d9b4",
  measurementId: "G-6X8X8MMY1P"
};

// Initialize app
export const app = initializeApp(firebaseConfig);

// ✅ Correct auth setup
export const auth = Platform.OS === 'web'
  ? getAuth(app)
  : initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage)
    });