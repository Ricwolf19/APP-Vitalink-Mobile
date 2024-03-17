import { signInWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH } from '../../Firebase';
// import { Link } from "expo-router";
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { router } from 'expo-router';

export default function Login() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  const signIn = async () => {
    setLoading(true);
    try {
      // const res =
      await signInWithEmailAndPassword(auth, email, pass);
      //  console.log(res);
      router.replace('/Patients');
    } catch (error) {
      switch (error.code) {
        case 'auth/missing-password':
          alert('Please enter your password');
          break;
        case 'auth/invalid-email':
          alert('Please enter a valid email');
          break;
        case 'auth/invalid-credential':
          alert('Incorrect password or email');
          break;
      }
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  //Funcion para registrarse
  // const signUp = async () => {
  //   setLoading(true);
  //   try {
  //     const res = await createUserWithEmailAndPassword(auth, email, pass);
  //     console.log(res);
  //     alert('User created!!!')
  //   } catch (error) {
  //     console.log(error);
  //     alert('Sign Up failed: ' + error.message)
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  return (
    <View className="flex-1 justify-center items-center bg-gray-100">
      <KeyboardAvoidingView behavior="padding" className="w-full px-6">
        <Image className='items-center justify-center w-1/2 h-1/2 mx-auto'
          source={require('public/logo-rbg.png')}
          style={{ width: 130, height: 100, marginBottom: 40}}
        />

        <Text className="text-3xl font-bold text-center text-gray-800">
          Welcome Back
        </Text>
        <Text className="text-lg font-regular mb-8 text-center text-gray-600">
          Sign in to continue
        </Text>

        <View className="mb-6">
          <TextInput
            value={email}
            placeholder="Enter your email"
            autoCapitalize="none"
            className="w-full py-2 px-3 border-b border-gray-300 focus:outline-none focus:border-red-300"
            onChangeText={(text) => setEmail(text)}
          />
        </View>

        <View className="mb-6">
          <TextInput
            secureTextEntry={true}
            value={pass}
            placeholder="Enter your password"
            autoCapitalize="none"
            className="w-full py-2 px-3 border-b border-gray-300 focus:outline-none focus:border-red-300"
            onChangeText={(text) => setPass(text)}
          />
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#000" />
        ) : (
          <TouchableOpacity
            onPress={signIn}
            className=" bg-red-400 py-2 px-4 rounded text-white text-center"
          >
            <Text className="text-center text-white">Login</Text>
          </TouchableOpacity>
        )}
      </KeyboardAvoidingView>
    </View>
  );
}
