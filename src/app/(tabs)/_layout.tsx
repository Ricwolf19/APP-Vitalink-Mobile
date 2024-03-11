import { View, Image, Text } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faGear,
  faHome,
  faHospitalUser,
  faUserDoctor,
} from '@fortawesome/free-solid-svg-icons';

const TabsLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen name="Home" options={tabBarOptions('Home', faHome)} />
      <Tabs.Screen
        name="Patients"
        options={tabBarOptions('Patients List', faHospitalUser)}
      />
      <Tabs.Screen
        name="Doctors"
        options={tabBarOptions('Doctors List', faUserDoctor)}
      />
      <Tabs.Screen
        name="Profile"
        options={tabBarOptions('Profile & Settings', faGear)}
      />
    </Tabs>
  );
};

const tabBarOptions = (text: string, icon: any) => {
  return {
    tabBarIcon: ({ focused, size }) => (
      <FontAwesomeIcon
        color={focused ? '#f87171' : '#888'}
        icon={icon}
        size={size * 0.8}
      />
    ),
    headerTitle() {
      return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            source={require('../../../public/logo-rbg.png')}
            style={{ width: 30, height: 22, marginRight: 10}}
          />
          <Text style={{ fontWeight: 'bold', fontSize: 25, color: '#eb4945' }}>
            {text}
          </Text>
        </View>
      );
    },
    tabBarShowLabel: false,
    headerStyle: {
      backgroundColor: 'white',
      shadowColor: 'black',
    },
  };
};

export default TabsLayout;
