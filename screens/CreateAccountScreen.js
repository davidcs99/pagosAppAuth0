import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, Modal, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { LinearGradient } from 'expo-linear-gradient';
import userLogo from '../assets/user.jpeg';
import { useAuth0 } from 'react-native-auth0';

const CreateAccountScreen = ({ navigation }) => {
  const { clearSession } = useAuth0();
  const [balance, setBalance] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const handleCreateAccount = () => {
    setModalVisible(true);
  };

  const handleGoBack = () => {
    navigation.replace('Bienvenido'); 
  };

  const confirmCreateAccount = () => {
    Alert.alert('Cuenta creada exitosamente');
    setBalance('');
    setModalVisible(false);
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

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Usuario:</Text>
        <TextInput
          style={styles.input}
          value="Juan Pérez" // Usuario quemado
          editable={false}
        />
        <Text style={styles.inputLabel}>Saldo:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese el saldo"
          keyboardType="numeric"
          value={balance}
          onChangeText={setBalance}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.createButton} onPress={handleCreateAccount}>
          <Text style={styles.createButtonText}>Crear Cuenta</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              ¿Está seguro que desea crear una nueva cuenta con saldo ${balance}?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.buttonConfirm]}
                onPress={confirmCreateAccount}
              >
                <Text style={styles.textStyle}>Confirmar</Text>
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
  inputContainer: {
    padding: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#6200ee',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    paddingHorizontal: 20,
  },
  createButton: {
    backgroundColor: '#6200ee',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize:16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop:10,
  },
  modalButton: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: '40%',
    alignItems:'center',
  },
  buttonClose: {
    backgroundColor: '#ccc',
  },
  buttonConfirm: {
    backgroundColor: '#6200ee',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 15,
    left: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 10,
    borderRadius: 20,
  },
});

export default CreateAccountScreen;