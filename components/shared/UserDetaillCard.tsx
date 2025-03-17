import { Alert, Linking, Pressable, Text, View } from 'react-native';

import { updateUserPaymentDate, User } from '@/api';
import { ThemedText, ThemedView } from '@/components';
import { FontAwesome } from '@expo/vector-icons';
import { useState } from 'react';
import { useSQLiteContext } from 'expo-sqlite';

interface Props {
  user: User
}


const sendMessage = (phoneNumber: string, message: string) => {
  const url = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
  Linking.canOpenURL(url)
    .then((supported) => {
      if (supported) {
        return Linking.openURL(url);
      } else {
        Alert.alert("Error", "WhatsApp no está instalado en este dispositivo");
      }
    })
    .catch((err) => console.error("Error al abrir WhatsApp:", err));
};


export default function UserDetailCard({ user }: Props) {
  const [checked, setChecked] = useState(false);
  const [date, setDate] = useState(user.paymentDate);
  const db = useSQLiteContext();

  console.log(user.paymentDate);

  const handleClick = async () => {
    const newPaymentDate = await updateUserPaymentDate(db, user);


    if (newPaymentDate !== "error update") {
      user = { ...user, paymentDate: newPaymentDate };
      setChecked(!checked);
    }
  };

  return (
    <View key={user.id} className='w-full rounded-lg border border-black pt-6 pb-3 px-4 dark:border-white mb-4'>
      <View className='flex-row justify-between mb-4'>
        <ThemedText type='subtitle'>{user.name}</ThemedText>
        <ThemedText>{user.paymentDate}</ThemedText>
      </View>
      <ThemedText>Correo: {user.email}</ThemedText>
      <ThemedText>Contraseña: {user.password}</ThemedText>
      <View className='my-4 flex-row justify-between items-center'>
        <Pressable
          className="rounded-lg border border-black p-4 dark:border-white"
          onPress={() =>
            sendMessage(
              user.phone,
              `Hola ${user.name}, llegó su fecha de pago.\nAvísame cuando hayas realizado el pago.\n¡Gracias!`
            )
          }>
          <Text className='text-black dark:text-white font-bold'>Enviar Mensaje</Text>
        </Pressable>
        <Pressable
          onPress={handleClick}
          className='rounded-full p-3 border border-black dark:border-white'
        >
          {/* {checked
            ? <FontAwesome name="check" size={24} color="green" />
            : <FontAwesome name="check" size={24} color="gray" />
          } */}
          
          <FontAwesome name="check" size={24} color="green" />

        </Pressable>
        <ThemedText type='defaultSemiBold'>{user.price}</ThemedText>
      </View>
    </View>
  );
}
