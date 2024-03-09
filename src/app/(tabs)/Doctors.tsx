import { View, Text } from 'react-native';
import { useAccountData } from '../../context/authContext';
import React from 'react';

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
        <Text>Loading...</Text>
        //TODO loading spinner or smth
      )}
    </View>
  );
};

export default Doctors;
