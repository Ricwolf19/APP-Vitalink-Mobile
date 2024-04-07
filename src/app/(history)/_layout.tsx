import { Stack } from 'expo-router';
import { faBedPulse, faClockRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { View, Text } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

const PageLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="History" options={barOptions('Vital signs history')} />
    </Stack>
  );
};

const barOptions = (text: string) => {
  return {
    headerTitle() {
      return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <FontAwesomeIcon
            icon={faClockRotateLeft}
            size={18}
            style={{ marginRight: 10 }}
          />
          <Text style={{ fontSize: 20, color: '#000' }}>
            {text}
          </Text>
        </View>
      );
    },
  };
};

export default PageLayout;
