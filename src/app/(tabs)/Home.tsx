import { FIREBASE_AUTH } from 'Firebase';
import { Redirect } from 'expo-router';
import { User, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import {
  Button,
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [initialLoad, setInitialLoad] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (currentUser) => {
      setUser(currentUser);
      setInitialLoad(true);
      //   console.log('user: ', currentUser);
    });

    // Cleanup subscription when component unmounts
    return () => unsubscribe();
  }, []);

  if (!initialLoad) {
    // Muestra un indicador de carga mientras se verifica la autenticación inicial
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!user) {
    return <Redirect href="/Login" />;
  }

  const userDetails = [
    `Email: ${user.email}`,
    `Display Name: ${user.displayName || 'N/A'}`,
    `Email Verified: ${user.emailVerified ? 'Yes' : 'No'}`,
    `Anonymous User: ${user.isAnonymous ? 'Yes' : 'No'}`,
    `Phone Number: ${user.phoneNumber || 'N/A'}`,
  ];

  return (
    <View className="flex-1 justify-center items-center">
      <View className="mb-8">
        <Text className="text-2xl font-bold">Hello, {user.email}</Text>
      </View>

      <View className="bg-gray-200 p-4 rounded mb-4">
        <Text className="text-lg font-bold mb-2">User Details:</Text>
        {userDetails.map((detail, index) => (
          <Text key={index}>{detail}</Text>
        ))}
      </View>

      <TouchableOpacity 
        onPress={() => FIREBASE_AUTH.signOut()}
        className=" bg-black py-2 px-4 rounded text-white text-center"
      >
        <Text className="text-center text-white">Log out</Text>
      </TouchableOpacity>
    </View>
  );
}
