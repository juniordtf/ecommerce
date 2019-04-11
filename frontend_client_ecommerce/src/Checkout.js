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
import { connect } from 'react-redux';
import styles from "./style";

class Checkout extends React.Component {

  confirmacao = () => {
    this.props.dispatch({ type: 'CLEAR' });
    Alert.alert("Obrigado por comprar conosco! =)")
    this.props.navigation.navigate("Confirmacao")
  }

  render() {

    return (
      <Container>
        <Header style={styles.header} iosBarStyle="light-content">
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" style={{ color: "#FFF" }} />
            </Button>
          </Left>
          <Body>
            <Text style={styles.title}>Checkout</Text>
          </Body>
          <Right />
        </Header>
        <Content>
          <Text />
          <View style={styles.checkoutSection}>
            <Text style={styles.topic}>Valor total (R$):  </Text>
            <Text style={{ fontSize: 18 }}>{this.props.novoTotal}</Text>
          </View>
          <Text />
          <Text />
          <View style={styles.buttonHomeSection}>
            <TouchableHighlight
              underlayColor="#2A4809"
              style={styles.button}
              onPress={() => this.confirmacao()}
            >
              <Text style={styles.buttonText}>Confirmar</Text>
            </TouchableHighlight>
          </View>
        </Content>
      </Container>
    );
  }
}


function mapStateToProps(state) {
  return {
    novoTotal: state.novoTotal
  };
}

export default connect(mapStateToProps)(Checkout);