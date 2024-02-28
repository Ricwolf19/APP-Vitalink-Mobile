import { NavigationProp } from "@react-navigation/native";
import { FIREBASE_AUTH } from "Firebase";
import { router } from "expo-router";
import { User, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Button, View } from "react-native";


//                 Para meter direcciones a otros sitios
export default function Home() {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        onAuthStateChanged(FIREBASE_AUTH, (user) => {
            console.log('user: ', user);
            setUser(user);
        });
    }, []);

    return (
        <View>
            <Button onPress={() => router.replace('/Login')} title="Logout" />
         
        </View>
    )
}
