import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { LinearGradient } from 'expo-linear-gradient';
import userLogo from '../assets/user.jpeg';
import { useAuth0 } from 'react-native-auth0';


const CreateConsumptionScreen = ({ navigation }) => {
  const { clearSession} = useAuth0();

  const [amount, setAmount] = useState('');

  const handleCreateConsumption = () => {
    navigation.replace('SelectConsumptionScreen', { amount });

  };
  const handleCreateAccount = () => {
    navigation.replace('CreateAccount', { amount });

  };

  const handleListAccounts = () => {
    navigation.replace('ListAccounts', { amount });
  };
  const handleListConsumptions = () => {
    navigation.replace('ListConsumption', { amount });
  };

  const handleLogout = async () => {
    // Aquí podrías limpiar la sesión y redirigir al login
    try {
      await clearSession();
      navigation.replace('Home');
    } catch (e) {
      console.log('Log out cancelado');
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#6200ee', '#8e24aa']} style={styles.header}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Icon name="exit-to-app" size={28} color="#fff" />
        </TouchableOpacity>

        <Image source={userLogo} style={styles.userLogo} />
        <Text style={styles.accountName}>Juan Pérez</Text>
        <Text style={styles.accountDetail}>Número de cuenta: 123456789</Text>
        <Text style={styles.accountDetail}>Cédula: 987654321</Text>
        <Text style={styles.accountBalance}>Fondos disponibles: $5,000.00</Text>
      </LinearGradient>

      <View style={styles.actionContainer}>
        <TouchableOpacity style={styles.actionButton} onPress={handleCreateAccount}>
          <Icon name="account-balance-wallet" size={40} color="#6200ee" />
          <Text style={styles.actionText}>Crear Cuenta</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={handleCreateConsumption}>
          <Icon name="shopping-cart" size={40} color="#6200ee" />
          <Text style={styles.actionText}>Crear Consumo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={handleListAccounts}>
          <Icon name="credit-card" size={40} color="#6200ee" />
          <Text style={styles.actionText}>Listar Cuentas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}  onPress={handleListConsumptions}>
          <Icon name="history" size={40} color="#6200ee" />
          <Text style={styles.actionText}>Listar Consumos</Text>
        </TouchableOpacity>
      </View>

      <LinearGradient colors={['#8e24aa', '#6200ee']} style={styles.footer}>
        <Text style={styles.footerText}>Banco Seguro © 2025 - Todos los derechos reservados</Text>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  header: {
    padding: 20,
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    position: 'relative',
  },
  logoutButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 10,
    borderRadius: 20,
  },
  userLogo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  accountName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  accountDetail: {
    fontSize: 14,
    color: '#e0e0e0',
  },
  accountBalance: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 5,
  },
  actionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 20,
  },
  actionButton: {
    width: '45%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  actionText: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#6200ee',
  },
  footer: {
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  footerText: {
    color: '#fff',
    fontSize: 12,
  },
});

export default CreateConsumptionScreen;
