import React, { useState } from 'react';
import { 
    Text,
    SafeAreaView,
    Platform,
    StatusBar,
    StyleSheet,
    AsyncStorage,
    TextInput,
    TouchableOpacity,
    Alert 
} from 'react-native';

import api from '../services/api';

export default function BooK({ navigation }) {
    const [date, setDate] = useState('');
    const id = navigation.getParam('id');

    async function handleSubmit(){
        const user_id = await AsyncStorage.getItem('user');

        await api.post(`/spots/${id}/bookings`, {
            date
        }, {
            headers: { user_id }
        });

        Alert.alert('Solicitação de reserva enviada.');

        navigation.navigate('List');
    }

    function handleCancel() {
        navigation.navigate('List');
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.label}>DATA DE INTERESSE *</Text>
                
            <TextInput 
                style={styles.input}
                placeholder="Qual data quer reservar?"
                placeholderTextColor="#999"
                value={date}
                onChangeText={setDate}
            />

            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                <Text style={styles.buttonText}>Solicitar reserva</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleCancel} style={[styles.button, styles.buttonCancelar]}>
                <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>

        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    container: {
        margin: 30,
        marginTop: 35,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 10
    },

    label: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8
    },

    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        height: 44,
        marginBottom: 20,
        borderRadius: 20
    },
    
    button: {
        height: 42,
        backgroundColor: "#f05a5b",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20
    },

    buttonCancelar: {
        backgroundColor: '#ccc',
        marginTop: 10,  
    },

    buttonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#fff"
    }
})