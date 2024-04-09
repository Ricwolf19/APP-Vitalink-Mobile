import Spinner from '@/components/spinner';
import { useAccountData } from '@/context/authContext';
import { useLocalSearchParams } from 'expo-router';
import { useContext, useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tailwind from 'twrnc';
import * as Print from 'expo-print';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import { format } from 'date-fns';
import { I18nContext } from '@/context/langContext';

interface VitalSign {
  id: string;
  dateTime: string;
  temp: number;
  spo2: number;
  fc: number;
}

const History = () => {
  const { language, i18n } = useContext(I18nContext);
  const t = i18n[language];
  const { getVitalSigns } = useAccountData();
  const [fetched, setFetched] = useState(false);
  const [pdf, setPdf] = useState('');
  const [now, setNow] = useState(null);
  const [vitalSignsData, setVitalSignsData] = useState(null);
  const params = useLocalSearchParams();
  let id = params.id;
  let name = params.name;
  let birthdate = params.birthdate;
  let doctorAssigned = params.doctorAssigned;

  const saveHistoryToPDF = async (html: string) => {
    try {
      const date = new Date();
      const formattedDate = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}-${String(
        date.getHours()
      ).padStart(2, '0')}-${String(date.getMinutes()).padStart(
        2,
        '0'
      )}-${String(date.getSeconds()).padStart(2, '0')}`;

      const { uri } = await Print.printToFileAsync({ html });
      const newUri =
        FileSystem.documentDirectory + 'history-' + formattedDate + '.pdf';

      await FileSystem.moveAsync({
        from: uri,
        to: newUri,
      });

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(newUri);
      } else {
        console.log(`Sharing is not available on this device`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!fetched && params) {
      const fetchVitalSigns = async () => {
        console.log(params);

        const vitalSigns: VitalSign[] = (await getVitalSigns(
          id.toString()
        )) as VitalSign[];

        const formattedData = vitalSigns.map((item) => {
          let [date, time] = item.dateTime.split(' ');

          let dateParts = date.split('-').map((part) => part.padStart(2, '0'));
          let formattedDate = dateParts.join('-');

          let timeParts = time.split(':').map((part) => part.padStart(2, '0'));
          let formattedTime = timeParts.join(':');

          let formattedDateTime = `${formattedDate} ${formattedTime}`;

          return { ...item, dateTime: formattedDateTime };
        });

        const sortedData = formattedData.sort((a, b) => {
          const dateA = a.dateTime
            .split(' ')
            .map((part) => part.split('-').reverse().join('-'))
            .join(' ');
          const dateB = b.dateTime
            .split(' ')
            .map((part) => part.split('-').reverse().join('-'))
            .join(' ');

          return new Date(dateB).getTime() - new Date(dateA).getTime();
        });

        setVitalSignsData(sortedData);
        const now = format(new Date(), "MMMM do, yyyy 'at' HH:mm:ss");
        setNow(now);
        const groupedData = sortedData.reduce<Record<string, string[]>>(
          (acc, data) => {
            const dateTimeParts = data.dateTime.split(' ');
            const dateParts = dateTimeParts[0].split('-');
            const timeParts = dateTimeParts[1].split(':');

            const date = new Date(
              +dateParts[2],
              +dateParts[1] - 1,
              +dateParts[0],
              +timeParts[0],
              +timeParts[1],
              +timeParts[2]
            );

            const dateKey = format(date, 'MMMM do, yyyy');

            if (!acc[dateKey]) {
              acc[dateKey] = [];
            }
            acc[dateKey].push(
              `<li><strong>${format(date, 'HH:mm')}: </strong>${data.temp}°C, ${
                data.spo2
              }%, ${data.fc}bpm</li>`
            );

            return acc;
          },
          {}
        );

        const vitalSignsString = Object.entries(groupedData)
          .map(
            ([date, measurements]) => `
          <section>
            <strong>${date}</strong>
            <ul>
              ${measurements.join('')}
            </ul>
          </section>
        `
          )
          .join('');

        setPdf(`
        <!DOCTYPE html>
        <html lang="en" data-theme="light">
        
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.red.min.css" />
          <title>Document</title>
        
          <style>
            @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap') * {
              font-family: 'IBM Plex Sans', sans-serif !important;
            }
        
            h1,
            h2,
            h3 {
              font-weight: 700 !important;
            }
        
            pdf-container {
              margin: 1rem !important;
            }
          </style>
          </head>
          
        <body>
          <main class="container">
            <nav>
              <ul>
                <img src="https://i.ibb.co/zHDB2x1/logo-rbg.png" alt="logo" style="height: 30px;">
              </ul>
              <ul>
                <li><strong>VitaLink</strong></li>
              </ul>
              <ul>
                <li>
                  <img src="https://cdn-icons-png.flaticon.com/512/32/32223.png" alt="logo" style="height: 30px;">
                </li>
              </ul>
            </nav>
        
            <hgroup>
              <h1>VitaLink Patient History Report</h1>
              <p>Recorded ${now}</p>
            </hgroup>
            <section>
              <h3>General Information</h3>
              <ul>
                <li><strong>Name:</strong> ${name}</li>
                <li><strong>Birthdate:</strong> ${birthdate}</li>
                <li><strong>Doctor assigned:</strong> ${doctorAssigned}</li>
              </ul>
            </section>
            <section>
              <h3>Vital Signs Records</h3>
            ${vitalSignsString}
            </section>
          </main>
        </body>
        
        </html>
      `);
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
            {t.history.record}:
          </Text>
          {vitalSignsData[0] !== undefined? (
            <>
              <FlatList
                data={vitalSignsData}
                renderItem={({ item }) => (
                  <>
                    <View style={tailwind`px-6`}>
                      <Text style={tailwind`  font-bold`}>{item.dateTime}</Text>
                      <Text style={tailwind` `}>
                        {item.temp}°C - {item.spo2}% - {item.fc}bpm{' '}
                      </Text>
                    </View>
                  </>
                )}
                style={tailwind`mb-3`}
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
              ></FlatList>
              <TouchableOpacity
                onPress={() => {
                  saveHistoryToPDF(pdf);
                }}
                className=" bg-black py-2 px-4 text-white text-center"
              >
                <Text className="text-center text-white text-xl">
                  {t.history.share}
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <Text style={tailwind`text-base px-6`}>{t.history.norecords}</Text>
          )}
        </>
      ) : (
        <Spinner />
      )}
    </View>
  );
};

export default History;
