import { View, Text } from 'react-native';
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
        <Tabs.Screen
          name="Home"
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesomeIcon icon={faHome} color={color} size={size * 0.8} />
            ),
            tabBarShowLabel: false,
          }}
        />
        <Tabs.Screen
          name="Patients"
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesomeIcon
                icon={faHospitalUser}
                color={color}
                size={size * 0.8}
              />
            ),
            tabBarShowLabel: false,
          }}
        />
        <Tabs.Screen
          name="Doctors"
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesomeIcon
                icon={faUserDoctor}
                color={color}
                size={size * 0.8}
              />
            ),
            tabBarShowLabel: false,
          }}
        />
        <Tabs.Screen
          name="Profile"
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesomeIcon icon={faGear} color={color} size={size * 0.8} />
            ),
            tabBarShowLabel: false,
          }}
        />
      </Tabs>
  );
};

export default TabsLayout;
