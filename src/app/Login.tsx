import { FIREBASE_AUTH } from "../../Firebase";
import { Link } from "expo-router";
import { useState } from "react";
import { View, Text } from "react-native";


export default function Login() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  return (
    <View className="flex-1">
      <View className="py-12 md:py-24 lg:py-32 xl:py-48">
        <View className="container px-4 md:px-6">
          <View className="flex flex-col items-center gap-4 text-center">
            <Text
              role="heading"
              className="text-3xl text-center native:text-5xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl"
            >
              VITA LINK
            </Text>
            <Text className="mx-auto max-w-[700px] text-lg text-center text-gray-500 md:text-xl dark:text-gray-400">
              CONECTADO CON FIREBA
            </Text>

            <View className="gap-4">
              <Link
                suppressHighlighting
                className="bg-black p-5 rounded-md text-white"
                href="/"
              >
                Login
              </Link>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}