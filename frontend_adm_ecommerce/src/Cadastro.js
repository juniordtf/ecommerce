import React from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight
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
  Title,
  Button,
  Input,
  Form
} from "native-base";
import axios from "axios";
import styles from "./style";

class Cadastro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  addUser = () => {
    const newUser = {
      username: this.state.username,
      password: this.state.password
    };

    axios({
      method: "post",
      url: "http://localhost:4321/api/Usuarios",
      data: newUser
    })
      .then(response => {
        console.log(response.data);
      })
      .catch(err => console.log(err));

    this.props.navigation.navigate("Login");
  };

  render() {
    return (
      <Container>
        <Header style={styles.header} iosBarStyle="light-content">
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" style={{color: '#FFF'}} />
            </Button>
          </Left>
          <Body>
            <Text style={styles.title}>Cadastro</Text>
          </Body>
          <Right />
        </Header>
        <Content>
          <Text />
          <Text style={styles.topic}>Criar conta</Text>
          <Text />
          <Card>
            <CardItem>
              <Input
                placeholder="Nome..."
                autoCapitalize="none"
                value={this.state.username}
                onChangeText={username => this.setState({ username })}
                maxLength={25}
              />
            </CardItem>
            <CardItem>
              <Input
                placeholder="Senha..."
                autoCapitalize="none"
                value={this.state.password}
                onChangeText={password => this.setState({ password })}
                maxLength={15}
              />
            </CardItem>
            <View style={styles.buttonSection}>
              <TouchableHighlight
                underlayColor="#2A4809"
                style={styles.button}
                onPress={() => this.addUser()}
              >
                <Text style={styles.buttonText}>Criar Conta</Text>
              </TouchableHighlight>
            </View>
            <Text />
          </Card>
        </Content>
      </Container>
    );
  }
}

export default Cadastro;
