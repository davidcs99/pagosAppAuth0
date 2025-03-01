import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Modal, FlatList, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { LinearGradient } from 'expo-linear-gradient';
import userLogo from '../assets/user.jpeg';
import { useAuth0 } from 'react-native-auth0';

const { width, height } = Dimensions.get('window');

const ListAccountsScreen = ({ navigation }) => {
  const { clearSession } = useAuth0();
  const [selectedAccount, setSelectedAccount] = useState('');
  const [consumptions, setConsumptions] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const accounts = [
    { id: '123456789', name: '123456789' },
    { id: '987654321', name: '987654321' },
    { id: '555555555', name: '555555555' },
  ];

  const handleAccountSelect = (account) => {
    setSelectedAccount(account.id);
    setModalVisible(false);
    const dummyConsumptions = [
      { id: '1', description: 'Restaurante', amount: '$20.00', date: '2024-01-15' },
      { id: '2', description: 'Supermercado', amount: '$50.00', date: '2024-02-01' },
      { id: '3', description: 'Transporte', amount: '$10.00', date: '2024-02-10' },
      { id: '4', description: 'Servicios', amount: '$30.00', date: '2024-03-05' },
    ];
    setConsumptions(dummyConsumptions);
  };

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

      <TouchableOpacity style={styles.accountSelector} onPress={() => setModalVisible(true)}>
        <Text style={styles.accountLabel}>
          {selectedAccount ? `Cuenta seleccionada: ${accounts.find(account => account.id === selectedAccount)?.name}` : 'Seleccionar Cuenta'}
        </Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <FlatList
              data={accounts}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.accountItem} onPress={() => handleAccountSelect(item)}>
                  <Text style={styles.accountItemText}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity style={styles.modalCloseButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalCloseText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {selectedAccount !== '' && (
        <ScrollView style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            <Text style={styles.headerCell}>Nro.</Text>
            <Text style={styles.headerCell}>Descripción</Text>
            <Text style={styles.headerCell}>Monto</Text>
            <Text style={styles.headerCell}>Fecha</Text>
          </View>
          {consumptions.map((consumption) => (
            <View key={consumption.id} style={styles.tableRow}>
              <Text style={styles.cell}>{consumption.id}</Text>
              <Text style={styles.cell}>{consumption.description}</Text>
              <Text style={styles.cell}>{consumption.amount}</Text>
              <Text style={styles.cell}>{consumption.date}</Text>
            </View>
          ))}
        </ScrollView>
      )}

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
    width: width * 0.2,
    height: width * 0.2,
    borderRadius: width * 0.1,
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
  accountSelector: {
    padding: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    margin: 10,
    width: '90%',
    alignSelf: 'center',
  },
  accountLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: '90%',
    maxHeight: height * 0.6,
  },
  accountItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  accountItemText: {
    fontSize: 18,
  },
  modalCloseButton: {
    marginTop: 20,
    backgroundColor: '#6200ee',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  modalCloseText: {
    color: '#fff',
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