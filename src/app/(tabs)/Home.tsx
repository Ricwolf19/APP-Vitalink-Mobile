import React, { useState } from 'react';
import { View, Text, Button, ActivityIndicator } from 'react-native';
import { logOut, useAccountData } from '../../context/authContext';
import Spinner from '@/components/spinner';

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
          <Spinner/>
        )}
        <Button title="Log Out" onPress={() => logOut()} />
      </View>
    </View>
  );
}
