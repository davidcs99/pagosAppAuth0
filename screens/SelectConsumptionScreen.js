import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, FlatList, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { LinearGradient } from 'expo-linear-gradient';
import userLogo from '../assets/user.jpeg';
const consumptionTypes = [
  { id: '1', name: 'Restaurante', value: '$20.00', icon: 'restaurant' },
  { id: '2', name: 'Supermercado', value: '$50.00', icon: 'shopping-cart' },
  { id: '3', name: 'Transporte', value: '$10.00', icon: 'directions-car' },
  { id: '4', name: 'Servicios', value: '$30.00', icon: 'receipt' },
];

const CreateConsumptionScreen = ({ navigation }) => {
  const [amount, setAmount] = useState('');
  const [selectedConsumption, setSelectedConsumption] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelectConsumption = (item) => {
    setSelectedConsumption(item);
    setModalVisible(true);
  };

  const handleConfirmConsumption = () => {
    setModalVisible(false);
    navigation.navigate('PayBill', { amount, consumptionType: selectedConsumption });
  };

  const handleGoBack = () => {
    navigation.replace('Bienvenido'); 
  };

  const handleLogout = async () => {
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

      <View style={styles.createConsumptionContainer}>
        <TextInput
          style={styles.input}
          placeholder="Cantidad del consumo"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />
      </View>

      <FlatList
        data={consumptionTypes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.consumptionItem} onPress={() => handleSelectConsumption(item)}>
            <Icon name={item.icon} size={40} color="#6200ee" />
            <View>
              <Text style={styles.consumptionText}>{item.name}</Text>
              <Text style={styles.consumptionValue}>{item.value}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Confirmar consumo de {selectedConsumption?.name} por {amount || selectedConsumption?.value}?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmConsumption}>
                <Text style={styles.buttonText}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

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
  createConsumptionContainer: {
    padding: 20,
    alignItems: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    paddingLeft: 10,
    fontSize: 16,
    width: '100%',
  },
  consumptionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  consumptionText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#333',
  },
  consumptionValue: {
    fontSize: 14,
    color: '#666',
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cancelButton: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 10,
  },
  confirmButton: {
    backgroundColor: '#6200ee',
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
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
  backButton: {
    position: 'absolute',
    top: 15,
    left: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 10,
    borderRadius: 20,
  },
  logoutButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 10,
    borderRadius: 20,
  }
});

export default CreateConsumptionScreen;
