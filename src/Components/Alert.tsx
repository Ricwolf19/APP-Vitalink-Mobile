import { Text, View } from "react-native";

export function Alert({ mesagge }: any) {
    return (
        <View className="bg-red-100 border-red-400 text-red-700 px-4 py-3 rounded relative mb-2 text-center">
            <Text className="sm:inline-block">{mesagge}</Text>
        </View>
    )
}
