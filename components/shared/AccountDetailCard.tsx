import { View, Clipboard, Pressable, Text } from 'react-native';

import { Account } from '@/api';
import { ThemedText } from '@/components';

interface Props {
    account: Account
}

const copyToClipboard = (text: string) => {
    Clipboard.setString(text);
};

export default function AccountDetailCard({ account }: Props) {
    return (
        <View className='my-4'>
            <ThemedText type='defaultSemiBold'>{account.name}</ThemedText>
            <ThemedText className='mt-4'>Correo: </ThemedText>
            <Pressable
                className='flex-row justify-between items-center'
                onPress={() => copyToClipboard(account.email)}
            >
                <Text className='text-blue-500 underline text-lg'>{account.email}</Text>
                <Text className='text-blue-500 text-sm'>Copiar</Text>
            </Pressable>
            <ThemedText className='mt-4'>Contraseña: </ThemedText>
            <Pressable
                className='flex-row justify-between items-center'
                onPress={() => copyToClipboard(account.password)}
            >
                <Text className='text-blue-500 underline text-lg'>{account.password}</Text>
                <Text className='text-blue-500 underline text-sm'>Copiar</Text>
            </Pressable>
            <ThemedText className='mt-4'>Pais: {account.country}</ThemedText>
            <ThemedText>Metodo de pago: {account.paymentMethod}</ThemedText>
            <ThemedText>Pagado hasta {account.expirationDate}</ThemedText>
        </View>
    );
}