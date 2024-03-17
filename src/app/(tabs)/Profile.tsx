import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useEffect, useState } from 'react';
import { logOut, useAccountData } from '@/context/authContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import Spinner from '@/components/spinner';

const Profile = () => {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const { accountData, reload } = useAccountData();
  const [accountDataArray, setAccountDataArray] = useState<any[]>([]);

  useEffect(() => {
    setAccountDataArray([
      {
        title: 'Usuario',
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
  }, [accountData]);

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
      {accountData ? ( <>
      <Image
        source={{ uri: accountData.profilePhoto}}
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
                backgroundColor: '#fca5a5',
                marginTop: 10,
                marginBottom: 10,
              }}
            ></View>
          )}
        ></FlatList>
      </SafeAreaView>

      <TouchableOpacity
        onPress={logOut}
        className=" bg-red-400 py-2 px-4 rounded text-white w-full text-center mt-4"
      >
        <Text className="text-center text-white text-xl">Logout</Text>
      </TouchableOpacity>
      </>): (
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
