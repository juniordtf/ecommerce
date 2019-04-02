import React from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
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

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      produtos: []
    };
  }

  componentDidMount() {
    this.getProduto();
  }

  //importação da API
  getProduto() {
    axios
      .get("http://localhost:4321/produto")
      .then(response => {
        this.setState({ produtos: response.data });
      })
      .catch(err => console.log(err));
  }

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
    //construção da renderização através da função map
    let estoque = this.state.produtos.map((item, index) => {
      return (
        <View>
          <Text>Nome: {JSON.stringify(item.nome)}</Text>
          <Text>Descricao: {JSON.stringify(item.descricao)}</Text>
          <Text>
            Preço unit.: {JSON.stringify(item.preco)} Qte.:{" "}
            {JSON.stringify(item.qte)}
          </Text>
          <Text />
        </View>
      );
    });

    return (
      <Container>
        <Header style={styles.header} iosBarStyle="light-content">
          <Left />
          <Body>
            <Text style={styles.title}>Home</Text>
          </Body>
          <Right>
            <Button transparent onPress={() => this.logout()}>
              <Text style={{ fontSize: 18, color: "white" }}>Sair</Text>
            </Button>
          </Right>
        </Header>
        <Content>
          <Text />
          <View style={styles.buttonSection}>
            <TouchableHighlight
              underlayColor="#2A4809"
              style={styles.button}
              onPress={() => this.props.navigation.navigate("CriarProduto")}
            >
              <Text style={styles.buttonText}>Criar Produto</Text>
            </TouchableHighlight>
          </View>
          <View style={styles.buttonSection}>
            <TouchableHighlight
              underlayColor="#2A4809"
              style={styles.button}
              onPress={() => this.props.navigation.navigate("EditarProduto")}
            >
              <Text style={styles.buttonText}>Editar Produto</Text>
            </TouchableHighlight>
          </View>
          <Text />
          <Text />
          <Text style={styles.topic}> Estoque</Text>
          <Text />
          <Text />
          <View>{estoque}</View>
        </Content>
      </Container>
    );
  }
}

export default Home;
