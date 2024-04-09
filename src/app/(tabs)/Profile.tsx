import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useContext, useEffect, useState } from 'react';
import { logOut, useAccountData } from '@/context/authContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import Spinner from '@/components/spinner';
import { I18nContext } from '@/context/langContext';
import { Picker } from '@react-native-picker/picker';

const Profile = () => {
  const { language, i18n, setLanguage } = useContext(I18nContext);
  const t = i18n[language];
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const { accountData, reload } = useAccountData();
  const [accountDataArray, setAccountDataArray] = useState<any[]>([]);

  const changeLanguage = () => {
    if (language === 'en') {
      setLanguage('es');
    } else {
      setLanguage('en');
    }
  };

  useEffect(() => {
    setAccountDataArray([
      {
        title: t.profile.username,
        data: accountData.userName,
      },
      {
        title: 'Email',
        data: accountData.email,
      },
      {
        title: 'Rol',
        data: accountData.rol,
      },
    ]);
  }, [accountData, language]);

  const onRefresh = async () => {
    setRefreshing(true);
    await reload();
    setRefreshing(false);
  };

  return (
    <View
      className="flex-1 bg-gray-100 px-6"
      style={{ backgroundColor: '#f8fafc' }}
    >
      {accountData ? (
        <>
          <Image
            source={{ uri: accountData.profilePhoto }}
            style={styles.profilePhoto}
          />
          <SafeAreaView>
            <FlatList
              data={accountDataArray}
              renderItem={({ item }) => (
                <>
                  <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                    {item.title}
                  </Text>
                  <Text style={{ fontSize: 16 }}>{item.data}</Text>
                </>
              )}
              keyExtractor={(item) => item.title}
              ItemSeparatorComponent={() => (
                <View
                  style={{
                    height: 1,
                    marginTop: 10,
                    marginBottom: 10,
                  }}
                  className="bg-black/25"
                ></View>
              )}
            ></FlatList>
            <View
              style={{
                height: 1,
                marginTop: 10,
                marginBottom: 10,
              }}
              className="bg-black/25"
            ></View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                {t.profile.lang}
              </Text>
              <Picker
                selectedValue={language}
                onValueChange={(itemValue) => setLanguage(itemValue)}
                style={{ height: 50, width: 150 }}
              >
                <Picker.Item label={t.profile.en} value="en" />
                <Picker.Item label={t.profile.es} value="es" />
              </Picker>
            </View>
            <View
              style={{
                height: 1,
                marginTop: 10,
                marginBottom: 10,
              }}
              className="bg-black/25"
            ></View>
          </SafeAreaView>

          <TouchableOpacity
            onPress={logOut}
            className=" bg-red-400 py-2 px-4 rounded text-white w-full text-center mt-4"
          >
            <Text className="text-center text-white text-xl">
              {t.profile.logout}
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <Spinner />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  profilePhoto: {
    marginTop: 20,
    alignSelf: 'center',
    height: 150,
    width: 150,
    borderRadius: 75,
  },
  button: {
    width: 150,
  },
  text: {
    fontSize: 14,
    marginBottom: 10,
    color: '#333', // Color de texto similar al gray-800 de Tailwind
  },
  lineStyle: {
    borderWidth: 0.2,
    borderColor: 'pink',
    margin: 8,
  },
});

export default Profile;
