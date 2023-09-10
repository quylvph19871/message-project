import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, Pressable, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  // useEffect(() => {
  //   const checkLoginStatus = async () => {
  //     try {
  //       const token = await AsyncStorage.getItem("authToken");

  //       if (token) {
  //         navigation.navigate("Home");
  //       } else {
  //       }
  //     } catch (error) {
  //       console.log("error", error)
  //     }

  //   };
  //   checkLoginStatus();
  // }, []);

  const handleLogin = () => {
    const user = {
      email: email,
      password: password
    }

    axios.post("http://192.168.0.105:8000/login", user)
      .then((response) => {
      console.log(response);
      const token = response.data.token;
      AsyncStorage.setItem("authToken", token);

      navigation.replace("Home");
    })
      .catch((error) => {
        Alert.alert("Login Error", "Invalid email or password");
        console.log("Login Error", error);
      })
  }
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView >
        <View style={styles.header__login}>
          <Text style={[styles.header_text, { color: "#4a55a2" }]}>Sign In</Text>
          <Text style={styles.header_text}>Sign In to Your Account</Text>
        </View>
        <View style={styles.view_form}>
          <View>
            <Text style={styles.form_text}>Email</Text>
            <TextInput style={[styles.textinput, { fontSize: email ? 18 : 18 }]}
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholderTextColor={"black"}
              placeholder='Enter your email' />
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={styles.form_text}>Password</Text>
            <TextInput style={[styles.textinput, { fontSize: email ? 18 : 18 }]}
              value={password}
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
              placeholderTextColor={"black"}
              placeholder='Password' />
          </View>

          <Pressable style={styles.btn_login}
            onPress={handleLogin}>
            <Text style={styles.btn_text}>Login</Text>
          </Pressable>

          <Pressable style={{ marginTop: 15 }} onPress={() => navigation.navigate("Register")}>
            <Text style={styles.btn_SignUp} >Dont't have an account? Sign Up</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 10,
  },
  header__login: {
    marginTop: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  header_text: {
    fontSize: 17,
    fontWeight: "600",
  },
  view_form: {
    marginTop: 50
  },
  form_text: {
    fontSize: 18,
    fontWeight: '600',
    color: "gray"
  },
  textinput: {
    borderBottomColor: 18,
    borderBottomWidth: 1,
    marginVertical: 10,
    width: 300,
  },
  btn_login: {
    width: 200,
    backgroundColor: "#4a55a2",
    padding: 15,
    marginTop: 50,
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 6
  },
  btn_text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: "center"
  },
  btn_SignUp: {
    textAlign: 'center',
    color: 'gray',
    fontSize: 16
  }

})