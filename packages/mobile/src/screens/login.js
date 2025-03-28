import {Dimensions, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import useAuthViewModels from "../viewmodels/authViewModels";
import {useNavigation} from "@react-navigation/native";
import React, {useState} from "react";
import {useUser} from "../contexts/userContext";

export const Login = () => {
    const { handleLogin, loading, error } = useAuthViewModels();

    const navigation = useNavigation();

    const { setUser } = useUser();  // useUser ile context'e erişiyoruz

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginUser = async () => {
        const user = await handleLogin({
            username, email, password,
        });
            setUser(user);
        navigation.navigate("homeScreen");

    };

    return (

        <SafeAreaView style={styles.safeAreaContainer}>

            <View style={styles.container}>
                <Text style={[styles.text,{fontSize:40 , fontWeight : "bold" , paddingBottom : 50}]}>Giriş yap</Text>
                <View style={styles.textInputView}>
                    <TextInput
                        keyboardType="default"
                        returnKeyType="next"
                        placeholder="Kullanıcı adı"
                        placeholderTextColor="gray"
                        style={styles.textInput}
                        value={username}
                        onChangeText={(text) => setUsername(text)}
                    />
                </View>


                <View style={styles.textInputView}>
                    <TextInput
                        keyboardType="email-address"
                        returnKeyType="go"
                        placeholder="E-posta"
                        placeholderTextColor="gray"
                        style={styles.textInput}
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                    />
                </View>


                <View style={styles.textInputView}>
                    <TextInput
                        keyboardType="default"
                        returnKeyType="next"
                        placeholder="Şifre"
                        placeholderTextColor="gray"
                        secureTextEntry={true}
                        style={styles.textInput}
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                    />
                </View>


                <TouchableOpacity onPress={()=> loginUser()}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Giriş yap</Text>
                    </View>
                </TouchableOpacity>

                <Text style={[styles.text , {marginTop : 20}]}>Zaten hesabım var
                    {
                        <Text style={[styles.text , {color :"#2D2D74" , fontWeight:"bold"}]} onPress={()=>navigation.navigate("loginScreen")}> giriş yap</Text>
                    }
                </Text>

            </View>
        </SafeAreaView>

    );
};

const width = Dimensions.get("window").width;
console.log(24 - (width*0.8-width*0.75)/2);
const styles = StyleSheet.create({
    text : {
        color: "#313335",
    },
    safeAreaContainer: {
        flex: 1,
        backgroundColor: "#FFFFF8",
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFFFF8",
    },
    textInput: {
        width: width * 0.6,
        color: "gray",
        fontFamily: "Montserrat-Regular",
    },
    textInputView: {
        margin : 4,
        backgroundColor: "rgba(230, 230, 223, 0.4)",
        width: width * 0.8,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        borderRadius: 16 ,
        paddingHorizontal: 10,

    },
    button: {
        width: width * 0.8,
        height: 50,
        backgroundColor: "#ED1C24",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 16,
        marginTop: 20,
    },
    buttonText: {
        fontSize: 18,
        color: "#FFFFF8",
        fontWeight : "bold"
    }
});
