import { View, Text } from 'react-native';
import { useAccountData } from '../../context/authContext';
import React, { useEffect, useState } from 'react';

const Patients = () => {
  const { accountData } = useAccountData();

  return (
    <View >
      {accountData ? (
        accountData.patients.map((patient) => (
          <View key={patient.id} className='mb-2 bg-gray-300'>
            <Text>{patient.name}</Text>
            <Text>{patient.age}</Text>
            <Text>{patient.allergies}</Text>
            <Text>{patient.birthDate}</Text>
            <Text>{patient.bloodType}</Text>
            <Text>{patient.area}</Text>
          </View>
        ))
      ) : (
        <Text>Loading...</Text>
        //TODO loading spinner or smth
      )}
    </View>
  );
};

export default Patients;
