import React from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Alert,
  FlatList,
  TouchableHighlight,
  AsyncStorage
} from "react-native";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Item,
  Body,
  Icon,
  Left,
  Right,
  Button,
  Title,
  Input,
  Form,
  Label
} from "native-base";
import axios from "axios";
import styles from "./style";

class Confirmacao extends React.Component {

  //realização de logout
  logout = async () => {
    axios
      .get("http://localhost.com:4321/api/Usuarios/logout")
      .then(response => {
        console.log(response.body);
      })
      .catch(err => console.log(err));

    this.props.navigation.navigate("Login");
    await AsyncStorage.clear();
  };

  render() {
    return (
      <Container>
        <Header style={styles.header} iosBarStyle="light-content">
          <Left/>
          <Body>
            <Text style={styles.title}>E-commerce</Text>
          </Body>
          <Right />
        </Header>
        <Content>
          <Text />
          <Text/>
          <View style={styles.confirmacaoSection}>
            <TouchableHighlight
              underlayColor="#090948"
              style={styles.buttonA}
              onPress={() => this.props.navigation.navigate("Home")}
            >
              <Text style={styles.buttonText}>Nova compra</Text>
            </TouchableHighlight>
          </View>
          <Text/>
          <Text/>
          <View style={styles.confirmacaoSection}>
            <TouchableHighlight
              underlayColor="#111111"
              style={styles.buttonB}
              onPress={() => this.logout()}
            >
              <Text style={styles.buttonText}>Sair</Text>
            </TouchableHighlight>
          </View>
        </Content>
      </Container>
    );
  }
}

export default Confirmacao;
