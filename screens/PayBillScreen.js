import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';

const accountsToPay = [
  { id: '1', name: 'Electricidad', amount: '$30.00', dueDate: '2025-02-28', icon: 'flash-on' },
  { id: '2', name: 'Agua', amount: '$20.00', dueDate: '2025-02-26', icon: 'water' },
  { id: '3', name: 'Internet', amount: '$50.00', dueDate: '2025-03-05', icon: 'wifi' },
  { id: '4', name: 'Teléfono', amount: '$15.00', dueDate: '2025-02-28', icon: 'phone' },
];

const AccountsToPayScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState('');

  const handlePayAccount = () => {
    // Handle payment action (simulating with a console log)
    console.log(`Pagando ${selectedAccount.name} por ${paymentAmount}`);
    setModalVisible(false); // Close modal after payment
    navigation.navigate('PaymentSuccess', { account: selectedAccount, amount: paymentAmount });
  };

  const renderItem = ({ item }) => (
    <View style={styles.tableRow}>
      <View style={styles.rowContent}>
        <Icon name={item.icon} size={30} color="#6200ee" />
        <View style={styles.textContainer}>
          <Text style={styles.tableCell}>{item.name}</Text>
          <Text style={styles.tableDescription}>Vencimiento: {item.dueDate}</Text>
        </View>
      </View>
      <Text style={styles.tableCell}>{item.amount}</Text>
      <TouchableOpacity
        style={styles.payButton}
        onPress={() => {
          setSelectedAccount(item);
          setModalVisible(true);
        }}
      >
        <Text style={styles.payButtonText}>Pagar</Text>
      </TouchableOpacity>
    </View>
  );

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
        <Text style={styles.headerTitle}>Cuentas por Pagar</Text>
      </LinearGradient>

      <FlatList
        data={accountsToPay}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.tableContainer}
      />

      {/* Modal for payment */}
      <Modal visible={modalVisible} animationType="fade" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Ingrese el monto a pagar:</Text>
            <TextInput
              style={styles.input}
              placeholder="Monto"
              keyboardType="numeric"
              value={paymentAmount}
              onChangeText={setPaymentAmount}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.confirmButton} onPress={handlePayAccount}>
                <Text style={styles.buttonText}>Confirmar Pago</Text>
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
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  tableContainer: {
    marginTop: 20,
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  rowContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    marginLeft: 10,
  },
  tableCell: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  tableDescription: {
    fontSize: 12,
    color: '#777',
  },
  payButton: {
    backgroundColor: '#6200ee',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  payButtonText: {
    color: '#fff',
    fontSize: 16,
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

export default AccountsToPayScreen;
