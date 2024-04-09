import { Stack } from 'expo-router';
import { faBedPulse } from '@fortawesome/free-solid-svg-icons';
import { View, Text } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { I18nContext } from '@/context/langContext';
import { useContext } from 'react';

const PageLayout = () => {
  const { language, i18n } = useContext(I18nContext);
  const t = i18n[language];
  return (
    <Stack>
      <Stack.Screen
        name="PatientPage"
        options={barOptions(t.layout.patient)}
      />
    </Stack>
  );
};

const barOptions = (text: string) => {
  return {
    headerTintColor: '#1565c0',
    headerTitle() {
      return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <FontAwesomeIcon
            color="#1565c0"
            icon={faBedPulse}
            size={25}
            style={{ marginRight: 10 }}
          />
          <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#1565c0' }}>
            {text}
          </Text>
        </View>
      );
    },
  };
};

export default PageLayout;
