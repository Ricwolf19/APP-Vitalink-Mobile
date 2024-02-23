import { Link } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

export default function Page() {
    return (
      <View className="flex flex-1 bg-white">
        <Content />
      </View>
    );
  }

export function Content() {
    return (
      <View className="flex-1">
        <View className="py-12 md:py-24 lg:py-32 xl:py-48">
          <View className="container px-4 md:px-6">
            <View className="flex flex-col items-center gap-4 text-center">
              <Text
                role="heading"
                className="text-3xl text-center native:text-5xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl"
              >
                {/* For use dark mode and light mode (Dark mode focus) put like this in the classNames of tailwindcss:  text-black  (For the dark mode)dark:text-yellow-500*/}
                ESTE SERA EL LOGIN
              </Text>
              <Text className="mx-auto max-w-[700px] text-lg text-center text-gray-500 md:text-xl dark:text-gray-400">
                Discover and collaborate on amce. Explore our services now.
              </Text>
  
              <View className="gap-4">
                <Link
                  suppressHighlighting
                  className="bg-black p-5 rounded-md text-white"
                  href="/"
                >
                  Regresar a home
                </Link>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }