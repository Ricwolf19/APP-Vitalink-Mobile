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
import React, { useContext, useEffect, useState } from 'react';
import tailwind from 'twrnc';
import Spinner from '@/components/spinner';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBedPulse, faStethoscope } from '@fortawesome/free-solid-svg-icons';
import { router } from 'expo-router';
import { I18nContext } from '@/context/langContext';


const Patients = () => {
  const { language, i18n } = useContext(I18nContext);
  const t = i18n[language];
  const [refreshing, setRefreshing] = useState<boolean>(false);
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
          contentContainerStyle={tailwind`py-1.5`}
        >
          {accountData.patients.map((patient: any) => (
            <TouchableOpacity
              key={patient.id}
              onPress={() => {
                router.push({ pathname: '/PatientPage', params: { id: patient.id, name:patient.name } });
              }}
            >
              <Card style={tailwind`w-auto my-1.5 mx-3 bg-white`}>
                <CardContent style={tailwind`gap-1`}>
                  <CardTitle style={{ color: '#1565c0' }}>
                    <FontAwesomeIcon icon={faBedPulse} color="#1565c0" />
                    {'  '}
                    {patient.name} {patient.lastName}
                  </CardTitle>
                  <CardSubtitle>
                    {t.card.doctor}:{' '}
                    {patient.doctorAssigned ? patient.doctorAssigned : 'N/A'}
                  </CardSubtitle>
                  <CardText>{patient.age} {t.card.age}</CardText>
                  <CardText>{t.card.blood}: {patient.bloodType}</CardText>
                  <CardText>{t.card.area}: {patient.area}</CardText>
                  <CardSubtitle>{t.card.status}: {patient.status}</CardSubtitle>
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
