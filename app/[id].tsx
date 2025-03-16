import { useEffect, useState } from 'react';
import { Alert, Linking, Pressable, ScrollView, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

import { DataEntry, getAccountById } from '@/api';
import { ThemedText, ThemedView } from '@/components';
import AccountDetailCard from '@/components/shared/AccountDetaillCard';

export default function AccountDetail() {
    const { id } = useLocalSearchParams();
    const [data, setData] = useState<DataEntry | null>(null)

    useEffect(() => {
        if (!Array.isArray(id))
            getAccountById(id).then(setData);
    }, [id]);

    return (
        <View className='w-full h-full flex justify-start items-start ml-6 mt-20'>
            <ThemedText type='title'>Detalles de la cuenta</ThemedText>
            <ScrollView className='mb-24'>
                <ThemedText>{data?.account.name}</ThemedText>
                <ThemedText>{data?.account.email}</ThemedText>
                <ThemedText>{data?.account.country}</ThemedText>
                <ThemedText>Pagado hasta {data?.account.expirationDate}</ThemedText>
                <ThemedText>{data?.account.password}</ThemedText>
                <View className='my-4'>
                    <ThemedText type='subtitle'>Miembros de la Familia</ThemedText>
                </View>
                {data?.users.map((user) => (
                    <AccountDetailCard key={user.id} user={user} />
                ))}

            </ScrollView>
        </View>

    );
}