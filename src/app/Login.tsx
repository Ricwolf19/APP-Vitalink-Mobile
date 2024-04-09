import { signInWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH } from '../../Firebase';
import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { I18nContext } from '@/context/langContext';

export default function Login() {
  const { language, i18n } = useContext(I18nContext);
  const t = i18n[language];

  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  const signIn = async () => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, pass);
      router.replace('/Patients');
    } catch (error) {
      switch (error.code) {
        case 'auth/missing-password':
          Alert.alert(
            t.login.alerts['password-title'],
            t.login.alerts.password
          );
          break;
        case 'auth/invalid-email':
          Alert.alert(t.login.alerts['email-title'], t.login.alerts.email);
          break;
        case 'auth/invalid-credential':
          Alert.alert(
            t.login.alerts['credential-title'],
            t.login.alerts.credential
          );
          break;
      }
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-gray-100">
      <KeyboardAvoidingView behavior="padding" className="w-full px-6">
        <Image
          className="items-center justify-center w-1/2 h-1/2 mx-auto"
          source={require('public/logo-rbg.png')}
          style={{ width: 130, height: 100, marginBottom: 40 }}
        />

        <Text className="text-3xl font-bold text-center text-gray-800">
          {t.login.title}
        </Text>
        <Text className="text-lg font-regular mb-8 text-center text-gray-600">
          {t.login.message}
        </Text>

        <View className="mb-6">
          <TextInput
            value={email}
            placeholder={t.login.email}
            autoCapitalize="none"
            className="w-full py-2 px-3 border-b border-gray-300 focus:outline-none focus:border-red-300"
            onChangeText={(text) => setEmail(text)}
          />
        </View>

        <View className="mb-6">
          <TextInput
            secureTextEntry={true}
            value={pass}
            placeholder={t.login.password}
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
            <Text className="text-center text-white">{t.login.login}</Text>
          </TouchableOpacity>
        )}
      </KeyboardAvoidingView>
    </View>
  );
}
