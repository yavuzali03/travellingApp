import {Dimensions, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import useAuthViewModels from "../viewmodels/authViewModel";
import {useNavigation} from "@react-navigation/native";
import React, {useState} from "react";
import {useUser} from "../contexts/userContext";
import {ButtonFilled} from "../components/buttonFilled";
import {useStyle} from "../contexts/styleContext";

export const Login = () => {
    const { handleLogin, loading, error } = useAuthViewModels();
    const styleContext = useStyle();
    const navigation = useNavigation();

    const { setUser, setIsLoggedIn } = useUser();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const loginUser = async () => {
        const user = await handleLogin({
            username, email, password,
        });
        if (user) {
            setUser(user);
            setIsLoggedIn(true);
        }

    };

    return (

        <SafeAreaView style={styles.safeAreaContainer}>

            <View style={styles.container}>
                <Text style={[styles.text,{fontSize:40 , fontWeight : "bold" , paddingBottom : 50}]}>Giriş yap</Text>

                <View style={{marginBottom : 20}}>
                <View style={styleContext.textInputView}>
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


                <View style={styleContext.textInputView}>
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


                <View style={styleContext.textInputView}>
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
                </View>

                <ButtonFilled onPress={()=>loginUser()} title={"Giriş yap"} width={width*0.8} height={50} />



                <Text style={[styleContext.text , {marginTop : 20}]}>Hesabın yok mu?
                    {
                        <Text style={[styleContext.text , {color :"#2D2D74" , fontWeight:"bold"}]} onPress={()=>navigation.navigate("registerScreen")}> kaydol</Text>
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

});
