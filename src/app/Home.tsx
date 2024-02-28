import { FIREBASE_AUTH } from "Firebase";
import { Redirect, router } from "expo-router";
import { User, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Button, View, Text, ActivityIndicator } from "react-native";

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

  return (
    <View>
      <Button onPress={() => FIREBASE_AUTH.signOut()} title="Logout" />
      <Text>Hello {user.email}</Text>
    </View>
  );
}
