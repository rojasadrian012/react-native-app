import { useEffect, useState } from 'react';
import { Alert, Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

import { DataEntry, getAccountById } from '@/api';
import { ThemedText, ThemedView } from '@/components';
import UserDetailCard from '@/components/shared/UserDetaillCard';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import AccountDetailCard from '@/components/shared/AccountDetailCard';

export default function AccountDetail() {
    const { id } = useLocalSearchParams();
    const [data, setData] = useState<DataEntry | null>(null)

    useEffect(() => {
        if (!Array.isArray(id))
            getAccountById(id).then(setData);
    }, [id]);

    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
            headerImage={
                <IconSymbol
                    size={310}
                    color="#808080"
                    name="chevron.left.forwardslash.chevron.right"
                    style={styles.headerImage}
                />
            }>
            <View className='w-full h-full flex justify-start items-start'>
                <ThemedText type='title'>Detalles de la cuenta</ThemedText>
                <ScrollView className='w-full'>
                    {data?.account && <AccountDetailCard account={data?.account} />}
                    <View className='my-4'>
                        <ThemedText type='subtitle'>Miembros de la Familia</ThemedText>
                    </View>
                    {data?.users.map((user) => (
                        <UserDetailCard key={user.id} user={user} />
                    ))}

                </ScrollView>
            </View>
        </ParallaxScrollView>


    );
}


const styles = StyleSheet.create({
    headerImage: {
        color: '#808080',
        bottom: -90,
        left: -35,
        position: 'absolute',
    },
});