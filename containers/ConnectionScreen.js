import React, { useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
  TouchableOpacity,
  Platform,
  ImageBackground,
  StatusBar,
} from "react-native";
import axios from "axios";
import logo from "../img/logo.png";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Connection = ({ navigation, dataReturn, setTokenFinded }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (dataReturn && email === "") {
    setEmail(dataReturn);
  }

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      if (email !== "") {
        if (password !== "") {
          const response = await axios.post("http://localhost:3000/read/user", {
            email: email,
            password: password,
          });

          // await AsyncStorage.setItem("token", response.data.user.token);
          setTokenFinded(response.data.user.token);
          Alert.alert(`Bienvenu ${response.data.user.account.username}`);
          setIsLoading(false);
        } else {
          setErrorMessage("Veuillez renseigner votre Mot De Passe");
          setIsLoading(false);
        }
      } else {
        setErrorMessage("Veuillez entrer votre Email");
        setIsLoading(false);
      }
    } catch (error) {
      console.error({ message: error.message });
      setIsLoading(false);
      Alert.alert(
        `Veuillez vérifier votre identifiant, (et / ou) mot de passe`
      );
    }
  };

  return (
    <KeyboardAwareScrollView extraScrollHeight={150} style={{ flex: 1 }}>
      <StatusBar barStyle={"dark-content"} />
      <View style={styles.container}>
        <View style={styles.logo}>
          <ImageBackground
            source={logo}
            style={styles.logoImg}
          ></ImageBackground>
        </View>
        <View style={styles.containerInput}>
          <TextInput
            style={styles.inputHome}
            placeholder="email"
            fontStyle="italic"
            placeholderTextColor="black"
            value={!dataReturn ? email : dataReturn}
            onChangeText={(text) => {
              setEmail(text.toLowerCase());
            }}
          ></TextInput>
          <TextInput
            style={styles.inputHome}
            placeholder="Mot de Passe"
            fontStyle="italic"
            placeholderTextColor="black"
            value={password}
            secureTextEntry={true}
            onChangeText={(text) => {
              setPassword(text);
            }}
          ></TextInput>
        </View>
        <View style={styles.containerMessage}>
          <Text style={styles.textMessage}>{errorMessage}</Text>
        </View>

        <View style={styles.boxBtnLogin}>
          {isLoading ? (
            <ActivityIndicator size="large" color="#2E2E2E" />
          ) : (
            <TouchableOpacity onPress={handleSubmit} style={styles.btnValide}>
              <Text style={styles.textValide}>connexion</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={() => navigation.navigate("Acount")}>
            <Text style={styles.textCreateAccount}>Créer un compte</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  logoImg:
    Platform.OS === "ios"
      ? {
          height: 70,
          width: 150,
        }
      : {
          height: 60,
          width: 180,
        },
  containerInput: {
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
  containerMessage: {
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    marginBottom: 20,
  },
  textMessage: {
    fontSize: 20,
    fontWeight: "600",
    color: "red",
  },

  containerBtn: {
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },

  logo:
    Platform.OS === "ios"
      ? {
          margin: 150,
        }
      : {
          marginTop: 120,
          marginBottom: 130,
        },

  inputHome:
    Platform.OS === "ios"
      ? {
          padding: 15,
          backgroundColor: "white",
          opacity: 0.7,
          position: "relative",
          zIndex: 2,
          width: "80%",
          margin: 10,
          height: 50,
          borderRadius: 5,
          marginBottom: 30,
          borderBottomWidth: 2,
          borderBottomColor: "blue",
        }
      : {
          padding: 15,
          backgroundColor: "white",
          opacity: 0.7,
          position: "relative",
          zIndex: 2,
          width: "90%",
          marginBottom: 10,
          height: 50,
          borderRadius: 5,
          marginBottom: 30,
          borderBottomWidth: 2,
          borderBottomColor: "blue",
        },

  blocInputHome: {
    height: "auto",
    alignItems: "center",
  },
  boxBtnLogin: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  btnValide: {
    width: 300,
    backgroundColor: "#585858",
    padding: 15,
  },

  textValide: {
    marginHorizontal: 90,
    width: 100,
    color: "blue",
    fontWeight: "600",
    fontSize: 18,
  },

  textCreateAccount: {
    fontSize: 12,
    fontWeight: "600",
    marginTop: 100,
    justifyContent: "center",
    textDecorationLine: "underline",
  },
});

export default Connection;
