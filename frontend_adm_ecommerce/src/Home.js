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

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      produtos: []
    };
  }

  componentDidMount() {
    this.getProdutos();
  }

  //importação da API
  getProdutos = async () => {
    const acc = await AsyncStorage.getItem("userToken");

    axios
      .request({
        method: "get",
        url: "http://localhost:4321/produto",
        headers: { "x-access-token": acc }
      })
      .then(response => {
        this.setState({ produtos: response.data });
      })
      .catch(err => console.log(err));
  };

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

  renderItem = ({ item }) => {
    let idProduto = item._id;
    return (
      <View>
        <Text>Nome: {item.nome} </Text>
        <Text>Descrição: {item.descricao}</Text>
        <Text>
          Preço unit. (R$): {item.preco} Qte.: {item.qte} 
        </Text>
        <Button
          transparent
          onPress={() =>
            this.props.navigation.navigate("EditarProduto", { idProduto })
          }
        >
          <Text style={styles.bigBlue}>Aumentar estoque</Text>
        </Button>
        <View style={styles.line} />
      </View>
    );
  };

  render() {
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
          <View style={styles.buttonHomeSection}>
            <TouchableHighlight
              underlayColor="#2A4809"
              style={styles.button}
              onPress={() => this.props.navigation.navigate("CriarProduto")}
            >
              <Text style={styles.buttonText}>Criar Produto</Text>
            </TouchableHighlight>
          </View>
          <Text />
          <Text />
          <Text style={styles.topic}> Estoque</Text>
          <Text />
          <Text />
          <View>
            <FlatList data={this.state.produtos} renderItem={this.renderItem} />
          </View>
          <Text />
          <Text />
        </Content>
      </Container>
    );
  }
}

export default Home;
