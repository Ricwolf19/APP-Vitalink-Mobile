import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useAccountData } from '../../context/authContext';
import Spinner from '@/components/spinner';
import { Card, CardSubtitle, CardTitle } from '@/components/card';
import tailwind from 'twrnc';
import { format } from 'date-fns';

const PatientPage = () => {
  const { getPatient, accountData, listenToRealtimeData, storeVitalSigns } =
    useAccountData();
  const params = useLocalSearchParams();
  const [patientDataArray, setPatientDataArray] = useState<any[]>([]);
  const [realTimeData, setRealTimeData] = useState<any[]>([]);
  const [paramsData, setParamsData] = useState<any>({
    id: '',
    name: '',
    birthdate: '',
    doctorAssigned: '',
  });
  const [dataToSend, setDataToSend] = useState<any>({});
  const [hasFetchedPatient, setHasFetchedPatient] = useState(false);
  let id: keyof typeof params.id = params.id as keyof typeof params.id;

  useEffect(() => {
    let unsubscribe: (() => void) | null = null;
    const fetchPatient = async () => {
      if (!hasFetchedPatient && accountData && params) {
        let patient = await getPatient(id.toString());
        let birthdate = new Date(patient.birthDate);
        let formattedBirthdate = format(birthdate, 'MMMM do, yyyy');
        console.log(formattedBirthdate);
        

        setParamsData({
          id: patient.id,
          name: patient.name + ' ' + patient.lastName,
          birthdate: formattedBirthdate,
          doctorAssigned: patient.doctorAssigned,
        });

        setPatientDataArray([
          {
            title: 'Full Name',
            data: patient.name + ' ' + patient.lastName,
          },
          {
            title: 'Birthdate',
            data: patient.birthDate + ' (' + patient.age + ' years)',
          },
          {
            title: 'Status',
            data: patient.status,
          },
          {
            title: 'Doctor assigned',
            data: patient.doctorAssigned,
          },
          {
            title: 'Area assigned',
            data: patient.area,
          },
          {
            title: 'Blood type',
            data: patient.bloodType,
          },
          {
            title: 'Allergies',
            data:
              patient.allergies.length > 0
                ? patient.allergies.join(', ')
                : 'None',
          },
          {
            title: 'Chronic diseases',
            data:
              patient.chronicDiseases.length > 0
                ? patient.chronicDiseases.join(', ')
                : 'None',
          },
        ]);
        unsubscribe = listenToRealtimeData(patient.device, (data) => {
          setRealTimeData([
            {
              title: 'Temperature',
              data: data
                ? parseFloat(data.temp).toFixed(1) + '°C'
                : 'Loading...',
            },
            {
              title: 'Heart rate',
              data: data ? data.fc + 'bpm' : 'Loading...',
            },
            {
              title: 'Oxygenation level',
              data: data ? data.spo2 + '%' : 'Loading...',
            },
          ]);

          setDataToSend({
            temp: data.temp,
            fc: data.fc,
            spo2: data.spo2,
            dateTime: data.dateTime,
          });

          setPatientDataArray((prevArray) =>
            prevArray.map((item) =>
              item.title === 'Temperature' ? { ...item, data: data.temp } : item
            )
          );
        });
        setHasFetchedPatient(true);
      }
    };

    fetchPatient();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [accountData, hasFetchedPatient]);

  const saveVitalSigns = () => {
    if (dataToSend.temp !== undefined) {
      storeVitalSigns(id.toString(), dataToSend);
      console.log(dataToSend);
      Alert.alert('Done!', 'Vital signs saved successfully!');
    } else {
      Alert.alert('No device found', 'Please check the device connection.');
    }
  };

  return (
    <ScrollView
      className="flex-1"
      style={{ flex: 1, backgroundColor: '#fff' }}
      contentContainerStyle={tailwind`px-6 py-6`}
    >
      {accountData && patientDataArray && realTimeData ? (
        <>
          <Text style={tailwind`mb-2 text-xl font-bold`}>Vital Signs:</Text>
          <View style={tailwind`flex-row gap-x-2`}>
            {dataToSend.temp !== undefined ? (
              realTimeData.map((item, index) => (
                <Card
                  key={index}
                  style={tailwind`flex-1 h-16 justify-center items-center bg-red-100 border-white`}
                >
                  <CardSubtitle style={tailwind`text-black text-lg`}>
                    {item.data}
                  </CardSubtitle>
                </Card>
              ))
            ) : (
              <Text style={tailwind`text-base`}>No device connected</Text>
            )}
          </View>
          <Text style={tailwind`mt-3 mb-2 text-xl font-bold`}>
            Patient information:
          </Text>
          {patientDataArray.map((item, index) => (
            <View key={index}>
              <Text style={{ fontWeight: 'bold', fontSize: 15 }}>
                {item.title}
              </Text>
              <Text style={{ fontSize: 15 }}>{item.data}</Text>
              {index !== patientDataArray.length - 1 && (
                <View
                  style={{
                    height: 1,
                    marginTop: 10,
                    marginBottom: 10,
                  }}
                  className="bg-black/20"
                ></View>
              )}
            </View>
          ))}
          <TouchableOpacity
            onPress={saveVitalSigns}
            style={tailwind`bg-red-300 py-2 px-6 mt-4 rounded text-center`}
          >
            <Text className="text-center text-white text-lg">
              Save vital signs record
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: '/History',
                params: paramsData,
              })
            }
            style={tailwind`bg-gray-100 py-2 px-6 mt-2 rounded text-center`}
          >
            <Text className="text-center text-black text-lg">
              Vital signs history
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <Spinner />
      )}
    </ScrollView>
  );
};

export default PatientPage;
