import { Pressable, View, Text } from 'react-native';

import { Account } from '@/api';
import { ThemedText } from '../ThemedText';
import { Link } from 'expo-router';

interface Props {
    account: Account
}

export default function AccountPreview({ account }: Props) {
    return (
        <Link href={`/${account.id}`} asChild>
            <Pressable
                className='w-full rounded-lg border border-black py-6 px-4 dark:border-white'
            >
                <View className='flex-row justify-between'>
                    <ThemedText type="subtitle">{account.name}</ThemedText>
                    <Text className='text-blue-500 underline'>Ver más</Text>
                </View>
                <Text className='text-blue-500 text-lg'>{account.email}</Text>
                <Text numberOfLines={1} className='text-black dark:text-white text-lg'>{account.address}</Text>
                <Text className='text-black dark:text-white text-lg font-bold'>{account.country}</Text>
            </Pressable>
        </Link>
    );
}