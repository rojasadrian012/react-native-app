import { Image, StyleSheet, Platform, View, Pressable } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useEffect, useState } from 'react';
import { Account, DataEntry, getAccounts, User } from '@/api';
import AccountPreview from '@/components/shared/AccountPreview';
import { useSQLiteContext } from 'expo-sqlite';


export default function HomeScreen() {
  const [data, setData] = useState<DataEntry[]>([])
  const db = useSQLiteContext()

  useEffect(() => {
    async function fetchData() {
      try {
        const accountsQuery = `
          SELECT 
            id, name, email, password, address, paymentMethod, country, expirationDate, observation
          FROM accounts
        `;
        const accountsData: Account[] = await db.getAllAsync(accountsQuery);

        const usersQuery = `
          SELECT 
            id, accountId, name, email, password, price, paymentDate, phone
          FROM users
        `;
        const usersData: User[] = await db.getAllAsync(usersQuery);

        const dataEntries: DataEntry[] = accountsData.map((account) => {
          return {
            account,
            users: usersData.filter((user) => user.accountId === account.id),
          };
        });

        setData(dataEntries);
      } catch (error) {
        console.error("❌ Error al obtener DataEntries:", error);
        return [];
      }
    }

    fetchData();
  }, []);


  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText style={styles.text} type="title">Cuentas de Spotify</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>

        {data.map(({ account }) => (
          <AccountPreview key={account.id} account={account} />
        ))}

      </ThemedView>

    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    color: '#808080',
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  text: {
    color: '#10b981'
  }
});
