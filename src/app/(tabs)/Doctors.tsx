import { View, Text, ActivityIndicator } from 'react-native';
import { useAccountData } from '../../context/authContext';
import React from 'react';
import Spinner from '@/components/spinner';

const Doctors = () => {
  const { accountData } = useAccountData();

  return (
    <View>
      {accountData ? (
        accountData.doctors.map((doctor) => (
          <View key={doctor.id}>
            <Text>{doctor.name}</Text>
            <Text>{doctor.lastName}</Text>
            <Text>{doctor.area}</Text>
            <Text>{doctor.age}</Text>
            <Text>{doctor.numCedula}</Text>
          </View>
        ))
      ) : (
        <Spinner/>
      )}
    </View>
  );
};

export default Doctors;
