import { StyleSheet, Text, View , TextInput, Pressable, KeyboardAvoidingView, Alert} from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const navigation = useNavigation();

  const handleRegister = () => {
    const user = {
      name: name,
      email: email,
      password: password,
      image: image,
    }

    // send a Post request to the backend API to register the user
    axios.post("http://192.168.0.105:8000/register", user).then((response) => {
      console.log(response);
      Alert.alert(
        "Registration successfully",
        "You have been Registration successfully"
      );
      setName("");
      setEmail("");
      setPassword("");
      setImage("");
    }).catch((error) => {
      Alert.alert(
        "Registration Error",
        "An error occurred while registering"
      );
      console.log("registration failed", error);
    })
  }

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView >
        <View style={styles.header__login}>
          <Text style={[styles.header_text, { color: "#4a55a2" }]}>Register</Text>
          <Text style={styles.header_text}>Register to Your Account</Text>
        </View>
        <View style={styles.view_form}>
          <View>
            <Text style={styles.form_text}>Name</Text>
            <TextInput style={[styles.textinput, { fontSize: name ? 18 : 18 }]}
              value={name}
              onChangeText={(text) => setName(text)}
              placeholderTextColor={"black"}
              placeholder='Name' />
          </View>
          <View style={{marginTop: 10}}>
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

          <View style={{ marginTop: 10 }}>
            <Text style={styles.form_text}>Image</Text>
            <TextInput style={styles.textinput}
              value={image}
              onChangeText={(text) => setImage(text)}
              placeholderTextColor={"black"}
              placeholder='Image' />
          </View>

          <Pressable style={styles.btn_login}
          onPress={handleRegister}>
            <Text style={styles.btn_text}>Register</Text>
          </Pressable>

          <Pressable style={{ marginTop: 15 }} onPress={() => navigation.goBack()}>
            <Text style={styles.btn_SignUp} >Already have an account? Sign in</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent:'center',
    padding: 10,
  },
  header__login: {
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
    color: "gray",
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
    marginTop: 25,
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