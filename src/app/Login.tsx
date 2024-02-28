import { signInWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from "../../Firebase";
// import { Link } from "expo-router";
import { useState } from "react";
import { View, Text, TextInput, ActivityIndicator, Button, KeyboardAvoidingView } from "react-native";
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
    <View className="flex-1">
      <KeyboardAvoidingView behavior="padding">
        <Text>Login</Text>
        <TextInput value={email} placeholder="Email" autoCapitalize="none" onChangeText={(text) => setEmail(text)}></TextInput>
        <TextInput secureTextEntry={true} value={pass} placeholder="Password" autoCapitalize="none" onChangeText={(text) => setPass(text)}></TextInput>

        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <>
            <Button title="Login" onPress={signIn} />
            {/* <Button title="SignUp" onPress={signUp} /> */}
          </>
        )}
      </KeyboardAvoidingView>
    </View>
  );
}