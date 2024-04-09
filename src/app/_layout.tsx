import { Stack } from 'expo-router';
import { AuthProvider } from '@/context/authContext';
import { I18nProvider } from '@/context/langContext';

const Layout = () => {
  return (
    <I18nProvider>
      <AuthProvider>
        <Stack>
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="(history)"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="(pages)"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Login"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="index"
            options={{
              headerShown: false,
            }}
          />
        </Stack>
      </AuthProvider>
    </I18nProvider>
  );
};

export default Layout;

//Types of routes of EXPO-ROUTER:

// import { Slot } from 'expo-router';

// export default function HomeLayout() {
//   return <Slot />;
// }

// import { Stack } from 'expo-router';

// export default Stack;

// import { Tabs } from 'expo-router';

// export default Tabs;

// import { Drawer } from 'expo-router/drawer';

// export default function Layout() {
//   return (
//     <Drawer>
//       <Drawer.Screen
//         name="index" // This is the name of the page and must match the url from root
//         options={{
//           drawerLabel: 'Home',
//           title: 'overview',
//         }}
//       />
//       <Drawer.Screen
//         name="user/[id]" // This is the name of the page and must match the url from root
//         options={{
//           drawerLabel: 'User',
//           title: 'overview',
//         }}
//       />
//     </Drawer>
//   );
// }
