import React, { useState } from 'react';
import {
    Modal,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Dimensions
} from 'react-native';
import { useStyle } from '../contexts/styleContext';

const { width } = Dimensions.get('window');

export const ExpenseModal = ({ visible, onClose, onSubmit }) => {
    const style = useStyle();
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');

    const handleAdd = () => {
        if (!amount || isNaN(amount)) return;
        onSubmit({ amount: parseFloat(amount), description });
        setAmount('');
        setDescription('');
        onClose();
    };

    return (
        <Modal visible={visible} animationType="slide" transparent={true}>
            <View style={styles.overlay}>
                <View style={styles.modal}>
                    <Text style={style.title}>Harcama Ekle</Text>
                    <TextInput
                        placeholder="Tutar (₺)"
                        keyboardType="numeric"
                        value={amount}
                        onChangeText={setAmount}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="Açıklama"
                        value={description}
                        onChangeText={setDescription}
                        style={[styles.input, { height: 80 }]}
                        multiline
                    />
                    <TouchableOpacity onPress={handleAdd} style={styles.button}>
                        <Text style={style.title}>Ekle</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onClose} style={[styles.button, { backgroundColor: 'gray' }]}>
                        <Text style={style.text}>İptal</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.4)'
    },
    modal: {
        width: width * 0.9, backgroundColor: 'white', padding: 20, borderRadius: 10
    },
    input: {
        borderWidth: 1, borderColor: '#ccc', padding: 10, marginVertical: 10, borderRadius: 6
    },
    button: {
        backgroundColor: '#ED1C24', padding: 12, borderRadius: 6, alignItems: 'center', marginTop: 10
    }
});
