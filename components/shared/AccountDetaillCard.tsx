import { Alert, Linking, Pressable, Text, View } from 'react-native';

import { User } from '@/api';
import { ThemedText, ThemedView } from '@/components';

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


export default function AccountDetailCard({ user }: Props) {
  return (
    <View key={user.id} className='w-full rounded-lg border border-black pt-6 pb-3 px-4 dark:border-white mb-4'>
      <View className='flex-row justify-between mb-4'>
        <ThemedText type='defaultSemiBold'>{user.name}</ThemedText>
        <ThemedText>{user.paymentDate}</ThemedText>
      </View>
      <ThemedText>Correo: {user.email}</ThemedText>
      <ThemedText>Contraseña: {user.password}</ThemedText>
      <View className='my-4 flex-row justify-between items-center'>
        <Pressable
          className="rounded-lg border border-black p-4 dark:border-white"
          onPress={() =>
            sendMessage(
              user.phone,
              `Hola ${user.name}, llegó su fecha de pago.\nAvísame cuando hayas realizado el pago.\n¡Gracias!`
            )
          }>
          <Text className='text-black dark:text-white'>Enviar Mensaje</Text>
        </Pressable>
        <ThemedText type='defaultSemiBold'>{user.price}</ThemedText>
      </View>
    </View>
  );
}