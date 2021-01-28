import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Image,
  Platform,
  StatusBar,
} from "react-native";
import axios from "axios";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import logo from "../img/logo.png";
// import AsyncStorage from "@react-native-community/async-storage";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Account = ({ setDataReturn, setTokenFinded }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [data, setData] = useState({});
  const [hiddenEyesPassword, setHiddenEyesPassword] = useState(true);
  const [hiddenEyesPasswordConfirm, setHiddenEyesPasswordConfirm] = useState(
    true
  );
  const [red, setRed] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [expoPushToken, setExpoPushToken] = useState("");

  const navigation = useNavigation();

  // TODO: make wrong answer functionality
  const handleCVhangeRed = () => {
    setRed(false);
  };
  const handleEyesPassword = () => {
    setHiddenEyesPassword(!hiddenEyesPassword);
  };
  const handleEyesPasswordConfirm = () => {
    setHiddenEyesPasswordConfirm(!hiddenEyesPasswordConfirm);
  };

  const handleReturn = () => {
    navigation.goBack();
  };

  // Connexion to BDD

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post("http://localhost:3000/create/acount", {
        username,
        email,
        phone,
        password,
        expoPushToken,
      });
      setData(response.data);
      setIsLoading(false);
      if (data.message) {
        setDataReturn(response.data.email);
        Alert.alert(`${response.data.email} Est deja enregistré`);
        navigation.navigate("Connection");
      } else {
        Alert.alert(`Bienvenu ${response.data.user.account.username}`);
        // await AsyncStorage.setItem("token", response.data.user.token);
        setTokenFinded(response.data.user.token);
      }
    } catch (error) {
      console.error({ message: error.message });
    }
  };

  return (
    <KeyboardAwareScrollView extraScrollHeight={110} style={{ flex: 1 }}>
      <StatusBar barStyle={"dark-content"} />
      <View style={styles.container}>
        {/* <Notification setExpoPushToken={setExpoPushToken} /> */}
        <Image source={logo} style={styles.logoImg} />
        <Text style={styles.textAcount}>Mon compte</Text>
        <TextInput
          style={red ? styles.inputHome : styles.red}
          placeholder="Username"
          onChangeText={(text) => {
            setUsername(text);
          }}
          value={username}
        ></TextInput>
        <TextInput
          style={red ? styles.inputHome : styles.red}
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
          value={email}
        ></TextInput>

        <TextInput
          style={red ? styles.inputHome : styles.red}
          placeholder="Phone"
          onChangeText={(text) => setPhone(text)}
          value={phone}
        ></TextInput>

        <View style={styles.eye}>
          <TextInput
            style={red ? styles.inputSafety : styles.red}
            placeholder="Password"
            secureTextEntry={hiddenEyesPassword}
            onChangeText={(text) => setPassword(text)}
            value={password}
          ></TextInput>
          <TouchableOpacity onPress={handleEyesPassword}>
            {hiddenEyesPassword ? (
              <MaterialCommunityIcons
                name="eye-outline"
                size={24}
                color="black"
              />
            ) : (
              <MaterialCommunityIcons
                name="eye-off-outline"
                size={24}
                color="black"
              />
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.eye}>
          <TextInput
            style={red ? styles.inputSafety : styles.red}
            placeholder="Password Confirm"
            secureTextEntry={hiddenEyesPasswordConfirm}
            onChangeText={(text) => setPasswordConfirm(text)}
            value={passwordConfirm}
          ></TextInput>
          <TouchableOpacity onPress={handleEyesPasswordConfirm}>
            {hiddenEyesPasswordConfirm ? (
              <MaterialCommunityIcons
                name="eye-outline"
                size={24}
                color="black"
              />
            ) : (
              <MaterialCommunityIcons
                name="eye-off-outline"
                size={24}
                color="black"
              />
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.containerBtns}>
          {isLoading ? (
            <ActivityIndicator size="large" color="#2E2E2E" />
          ) : (
            <TouchableOpacity onPress={handleSubmit} style={styles.btnSubmit}>
              <Text style={{ color: "blue", fontSize: 15, fontWeight: "600" }}>
                Valider
              </Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={handleReturn}>
            <Text style={styles.textLogin}>
              Deja un compte ? / Se Connecter
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};
const styles = StyleSheet.create({
  container:
    Platform.OS === "ios"
      ? {
          justifyContent: "center",
          alignItems: "center",
          marginTop: 150,
        }
      : { justifyContent: "center", alignItems: "center", marginTop: 100 },

  containerBtns: {
    height: 100,
    alignItems: "center",
    justifyContent: "space-between",
  },

  logoImg:
    Platform.OS === "ios"
      ? { height: 70, width: 150 }
      : { height: 60, width: 80 },

  textAcount: {
    top: 60,
    marginBottom: 100,
    fontWeight: "600",
    fontSize: 20,
  },
  inputHome: {
    padding: 5,
    backgroundColor: "white",
    opacity: 0.7,
    width: "70%",
    height: 50,
    borderRadius: 5,
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: "blue",
    fontStyle: "italic",
    fontWeight: "600",
    fontSize: 15,
  },
  inputSafety: {
    width: "90%",
    fontStyle: "italic",
    fontWeight: "600",
    fontSize: 15,
  },

  red: {
    padding: 5,
    backgroundColor: "white",
    opacity: 0.7,
    width: "80%",
    margin: 10,
    height: 50,
    borderRadius: 5,
    marginBottom: 30,
    borderBottomWidth: 2,
    borderBottomColor: "red",
  },
  eye: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
    backgroundColor: "white",
    opacity: 0.7,
    width: "70%",
    margin: 10,
    height: 50,
    borderRadius: 5,
    marginBottom: 30,
    borderBottomWidth: 2,
    borderBottomColor: "blue",
    padding: 5,
  },

  btnSubmit: {
    width: 300,
    backgroundColor: "#585858",
    padding: 15,
    alignItems: "center",
  },
  textLogin: {
    fontSize: 12,
    fontWeight: "600",
    justifyContent: "center",
    textDecorationLine: "underline",
  },
});
export default Account;
