


import { DataEntry, getAccountById } from '@/api';
import { ThemedText, ThemedView } from '@/components';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

export default function AccountDetail() {
    const { id } = useLocalSearchParams();
    const [data, setData] = useState<DataEntry | null>(null)

    useEffect(() => {
        if (!Array.isArray(id))
            getAccountById(id).then(setData);
    }, [id]);

    return (
        <View className='w-full h-full flex justify-start items-start ml-6 mt-20'>
            <ThemedText type='title'>Detalles de la cuenta {id}</ThemedText>
            <ScrollView className='mb-24'>
                <ThemedText>{data?.account.name}</ThemedText>
                <ThemedText>{data?.account.email}</ThemedText>
                <ThemedText>{data?.account.country}</ThemedText>
                <ThemedText>{data?.account.expirationDate}</ThemedText>
                <ThemedText>{data?.account.password}</ThemedText>
                <ThemedText>{data?.account.password}</ThemedText>
                <View className='my-4'>
                    <ThemedText type='subtitle'>Miembros de la Familia</ThemedText>
                </View>
                {data?.users.map((user) => (
                    <View key={user.id} className='w-full rounded-lg border border-black py-6 px-4 dark:border-white mb-4'>
                        <ThemedText>Usuario: {user.name}</ThemedText>
                        <ThemedText>Correo: {user.email}</ThemedText>
                        <ThemedText>Contraseña: {user.password}</ThemedText>
                        <ThemedText>Fecha de Pago: {user.paymentDate}</ThemedText>
                        <ThemedText>Precio de venta: {user.price}</ThemedText>
                    </View>
                ))}

            </ScrollView>
        </View>

    );
}