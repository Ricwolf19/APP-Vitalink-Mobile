import { Stack } from 'expo-router';
import { faClockRotateLeft } from '@fortawesome/free-solid-svg-icons';
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
        name="History"
        options={barOptions(t.layout.history)}
      />
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
          <Text style={{ fontSize: 20, color: '#000' }}>{text}</Text>
        </View>
      );
    },
  };
};

export default PageLayout;
