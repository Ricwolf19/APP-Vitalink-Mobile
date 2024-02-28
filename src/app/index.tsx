import "../global.css";
import { View, Image, Text } from "react-native";
import React, { useEffect } from 'react'
import { StatusBar } from "expo-status-bar";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated, {
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { router } from "expo-router";


export default function WelcomeScreen() {
  const ring1padding = useSharedValue(0)
  const ring2padding = useSharedValue(0)

  useEffect(() => {
    ring1padding.value = 0;
    ring2padding.value = 0;
    setTimeout(() => ring1padding.value = withSpring(ring1padding.value + hp(5)), 100);
    setTimeout(() => ring2padding.value = withSpring(ring2padding.value + hp(3)), 300);

    setTimeout(() => router.replace('/Login'), 2200)
  }, [])

  return (
    <View className="flex-1 justify-center items-center space-y-10 bg-blue-200/50">
      <StatusBar style="light" />

      {/* Logo */}
      <Animated.View className="bg-red-400 rounded-full" style={{ padding: ring2padding }}>
        <Animated.View className="bg-white rounded-full" style={{ padding: ring1padding }}>
          <Image source={require('../.././public/logo-rbg.png')}
            style={{ width: hp(13), height: hp(10) }} />
        </Animated.View>
      </Animated.View>

      <View style={{ padding: hp(1) }}></View>

      {/* Title */}
      <View className="flex items-center space-y-2">
        <Text className="font-bold text-red-700 tracking-widest" style={{ fontSize: hp(6) }}>
          Vita Link
        </Text>
        <Text className="font-medium text-blue-800 tracking-widest" style={{ fontSize: hp(2) }}>
          Smart Monitoring, Real Results
        </Text>
      </View>
    </View>
  )
}


