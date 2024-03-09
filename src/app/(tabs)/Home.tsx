import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { logOut, useAccountData } from '../../context/authContext';

export default function Home() {
  const { accountData } = useAccountData();
  console.log(accountData);
  

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View>
        {accountData ? (
          <View>
            <Text>Welcome, {accountData.userName}</Text>
            <Text>Email: {accountData.email}</Text>
            <Text>Rol: {accountData.rol}</Text>
            <Text>{accountData.rol}</Text>
          </View>
        ) : (
          <Text>Loading...</Text>
          //TODO loading spinner or smth
        )}
        <Button title="Log Out" onPress={() => logOut()} />
      </View>
    </View>
  );
}
