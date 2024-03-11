import {
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { useAccountData } from '../../context/authContext';
import {
  Card,
  CardContent,
  CardSubtitle,
  CardText,
  CardTitle,
} from '@/components/card';
import React, { useEffect, useState } from 'react';
import tailwind from 'twrnc';
import Spinner from '@/components/spinner';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBedPulse, faStethoscope } from '@fortawesome/free-solid-svg-icons';

const Patients = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { accountData, reload } = useAccountData();

  const onRefresh = async () => {
    setRefreshing(true);
    await reload();
    setRefreshing(false);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f8fafc' }}>
      {accountData ? (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {accountData.patients.map((patient) => (
            <TouchableOpacity key={patient.id}>
              <Card style={tailwind`w-auto m-3 mb-0 mt-3 bg-white`}>
                <CardContent style={tailwind`gap-1`}>
                  <CardTitle style={{ color: '#1565c0' }}>
                    <FontAwesomeIcon icon={faBedPulse} color="#1565c0" />
                    {'  '}
                    {patient.name} {patient.lastName}
                  </CardTitle>
                  <CardSubtitle>
                    Doctor assigned:{' '}
                    {patient.doctorAssigned ? patient.doctorAssigned : 'None'}
                  </CardSubtitle>
                  <CardText>{patient.age} years old</CardText>
                  <CardText>Blood type: {patient.bloodType}</CardText>
                  <CardText>Area: {patient.area}</CardText>
                  <CardSubtitle>Last checked: 2h ago</CardSubtitle>
                </CardContent>
              </Card>
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : (
        <Spinner />
      )}
    </View>
  );
};

export default Patients;
