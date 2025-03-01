import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { LinearGradient } from 'expo-linear-gradient';
import userLogo from '../assets/user.jpeg';
import { useAuth0 } from 'react-native-auth0';

const ListAccountsScreen = ({ navigation }) => {
  const { clearSession } = useAuth0();

  const handleLogout = async () => {
    try {
      await clearSession();
      navigation.replace('Home');
    } catch (e) {
      console.log('Log out cancelado');
    }
  };

  const handleGoBack = () => {
    navigation.replace('Bienvenido'); 
  };

  const accounts = [
    { id: 1, account: '123456789', balance: '$1,000.00', date: '2024-01-15' },
    { id: 2, account: '987654321', balance: '$2,500.00', date: '2024-02-01' },
    { id: 3, account: '555555555', balance: '$500.00', date: '2024-02-10' },
    { id: 4, account: '111222333', balance: '$3,000.00', date: '2024-03-05' },
    { id: 5, account: '444555666', balance: '$1,200.00', date: '2024-03-15' },
    { id: 6, account: '777888999', balance: '$800.00', date: '2024-04-01' },
    { id: 7, account: '101112131', balance: '$1,800.00', date: '2024-04-10' },
    { id: 8, account: '141516171', balance: '$2,200.00', date: '2024-05-05' },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#6200ee', '#8e24aa']} style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Icon name="chevron-left" size={28} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Icon name="exit-to-app" size={28} color="#fff" />
        </TouchableOpacity>
        <Image source={userLogo} style={styles.userLogo} />
        <Text style={styles.accountName}>Juan Pérez</Text>
        <Text style={styles.accountDetail}>Número de cuenta: 123456789</Text>
        <Text style={styles.accountDetail}>Cédula: 987654321</Text>
        <Text style={styles.accountBalance}>Fondos disponibles: $5,000.00</Text>
      </LinearGradient>

      <ScrollView style={styles.tableContainer}>
        <View style={styles.tableHeader}>
          <Text style={styles.headerCell}>Nro.</Text>
          <Text style={styles.headerCell}>Cuenta</Text>
          <Text style={styles.headerCell}>Saldo</Text>
          <Text style={styles.headerCell}>Fecha</Text>
        </View>
        {accounts.map((account) => (
          <View key={account.id} style={styles.tableRow}>
            <Text style={styles.cell}>{account.id}</Text>
            <Text style={styles.cell}>{account.account}</Text>
            <Text style={styles.cell}>{account.balance}</Text>
            <Text style={styles.cell}>{account.date}</Text>
          </View>
        ))}
      </ScrollView>

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
  backButton: {
    position: 'absolute',
    top: 15,
    left: 15,
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
  tableContainer: {
    flex: 1,
    padding: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#6200ee',
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
  },
  tableRow: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 2,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  headerCell: {
    flex: 1,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
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

export default ListAccountsScreen;