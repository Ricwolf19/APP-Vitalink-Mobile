import {
  View,
  Text,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { useAccountData } from '../../context/authContext';
import React, { useContext, useState } from 'react';
import Spinner from '@/components/spinner';
import {
  Card,
  CardContent,
  CardSubtitle,
  CardText,
  CardTitle,
} from '@/components/card';
import tailwind from 'twrnc';
import { faHospital } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { I18nContext } from '@/context/langContext';

const Doctors = () => {
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
          {accountData.doctors.map((doctor: any) => (
            <Card key={doctor.id} style={tailwind`w-auto my-1.5 mx-3 bg-white`}>
              <CardContent style={tailwind`gap-1`}>
                <CardTitle style={{ color: '#1565c0' }}>
                  <FontAwesomeIcon icon={faHospital} color="#1565c0" />
                  {'  '}
                  {doctor.name} {doctor.lastName}
                </CardTitle>
                <CardSubtitle>{t.card.id}: {doctor.numCedula}</CardSubtitle>
                <CardText>{t.card.area}: {doctor.area}</CardText>
                <CardSubtitle>{t.card.patients}: </CardSubtitle>
                <CardText>
                  {doctor.patients.map(
                    (patient: any, i: number, patientsArray: number) => (
                      <Text key={i}>
                        {'• ' + patient + (patientsArray[i + 1] ? '\n' : '')}
                      </Text>
                    )
                  )}
                </CardText>
                <CardSubtitle>{t.card.status}: {doctor.status} </CardSubtitle>
              </CardContent>
            </Card>
          ))}
        </ScrollView>
      ) : (
        <Spinner />
      )}
    </View>
  );
};

export default Doctors;
