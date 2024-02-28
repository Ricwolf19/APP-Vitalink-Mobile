import { FIREBASE_AUTH } from "Firebase";
import { Button, View } from "react-native";


export default function Home(){
    
    return (
        <View>
            <Button onPress={() => FIREBASE_AUTH.signOut()} title="Logout"/>
        </View>
    )
}
