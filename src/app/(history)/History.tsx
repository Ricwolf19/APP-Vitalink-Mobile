import Spinner from '@/components/spinner';
import { useAccountData } from '@/context/authContext';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tailwind from 'twrnc';

const History = () => {
  const { getVitalSigns } = useAccountData();
  const [fetched, setFetched] = useState(false);
  const [vitalSignsData, setVitalSignsData] = useState(null);
  const params = useLocalSearchParams();
  let id: keyof typeof params.id = params.id as keyof typeof params.id;

  useEffect(() => {
    if (!fetched && params) {
      const fetchVitalSigns = async () => {
        const vitalSigns = await getVitalSigns(id.toString());
        setVitalSignsData(vitalSigns);
      };

      fetchVitalSigns();
      setFetched(true);
    }
  }, []);

  return (
    <View className="flex-1 " style={{ flex: 1, backgroundColor: '#fff' }}>
      {vitalSignsData ? (
        <>
          <Text style={tailwind`text-2xl mt-3 mb-1 ml-4 font-bold`}>
            Records:
          </Text>
          {vitalSignsData[0].temp !== undefined ? 
          <FlatList
            data={vitalSignsData}
            renderItem={({ item }) => (
              <>
                <View style={tailwind`px-6`}>
                  <Text style={tailwind`  font-bold`}>{item.dateTime}</Text>
                  <Text style={tailwind` `}>{item.temp}°C - {item.spo2}% - {item.fc}bpm </Text>
                </View>
              </>
            )}
            style={tailwind`mb-5`}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => (
              <View style={tailwind`px-6`}>
                <View
                  style={{
                    height: 1,
                    marginTop: 10,
                    marginBottom: 10,
                  }}
                  className="bg-black/20"
                ></View>
              </View>
            )}
          ></FlatList>: <Text style={tailwind`text-base px-6`}>No records</Text>}
        </>
      ) : (
        <Spinner />
      )}
    </View>
  );
};

export default History;
