import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Implementa la lógica de autenticación aquí
  };

  return (
    <View className="flex-1 items-center justify-center">
      <TextInput
        className="border border-gray-500 p-2 w-64 mb-4"
        placeholder="Correo electrónico"
        keyboardType="email-address"
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        className="border border-gray-500 p-2 w-64 mb-4"
        placeholder="Contraseña"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />
      <TouchableOpacity
        className="('bg-blue-500 p-3 rounded"
        onPress={handleLogin}
      >
        <Text className="text-white text-center">Iniciar sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
