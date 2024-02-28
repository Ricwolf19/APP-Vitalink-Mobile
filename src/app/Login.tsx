import { signInWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from "../../Firebase";
// import { Link } from "expo-router";
import React, { useState } from "react";
import { View, Text, TextInput, ActivityIndicator, KeyboardAvoidingView, TouchableOpacity, Image } from "react-native";
import { router } from "expo-router";

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
      router.replace('/Home')
      alert('Successfully Login')
    } catch (error) {
      console.log(error);
      alert('Sign In failed: ' + error.message)
    } finally {
      setLoading(false);
    }
  }


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
        <Image
          source={require('public/logo-rbg.png')}
          style={{ width: 130, height: 100, marginBottom: 40, marginLeft: 95 }}
        />

        <Text className="text-3xl font-bold mb-6 text-center text-gray-800">
          Welcome Back!
        </Text>

        <View className="mb-6">

          <TextInput
            value={email}
            placeholder="Enter your email"
            autoCapitalize="none"
            className="w-full py-2 px-3 border-b border-gray-300 focus:outline-none focus:border-blue-500"
            onChangeText={(text) => setEmail(text)}
          />
        </View>

        <View className="mb-6">
          <TextInput
            secureTextEntry={true}
            value={pass}
            placeholder="Enter your password"
            autoCapitalize="none"
            className="w-full py-2 px-3 border-b border-gray-300 focus:outline-none focus:border-blue-500"
            onChangeText={(text) => setPass(text)}
          />
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <TouchableOpacity
            onPress={signIn}
            className="bg-blue-500 py-2 px-4 rounded text-white text-center"
          >
            <Text className="text-center text-white">Login</Text>
          </TouchableOpacity>
        )}
      </KeyboardAvoidingView>
    </View>
  );
}