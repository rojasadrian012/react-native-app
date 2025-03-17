import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import "../global.css"

import { useColorScheme } from '@/hooks/useColorScheme';
import { SQLiteProvider } from 'expo-sqlite';
import { migrateDbIfNeeded } from '@/api/database/database';
import { FontAwesome6, MaterialIcons } from '@expo/vector-icons';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <SQLiteProvider databaseName="accounts.db" onInit={migrateDbIfNeeded}>
        <Stack
          screenOptions={{
            headerTitle: "",
            headerLeft: () => <Logo />,
            headerStyle: {
              backgroundColor: "#10b981"
            }
          }}
        />
        <StatusBar style="auto" />
      </SQLiteProvider>
    </ThemeProvider>
  );
}


import { Text, View } from 'react-native';

function Logo() {
  return (
    <View className='pl-2 w-full flex flex-row justify-start items-center gap-2'>
      <MaterialIcons name="account-balance" size={24} color="back" />
      <Text className='text-black text-2xl font-bold'>Cuentas</Text>
    </View>
  );
}
