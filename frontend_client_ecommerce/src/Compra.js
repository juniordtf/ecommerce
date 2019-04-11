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
import { connect } from 'react-redux';
import styles from "./style";

class Compra extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: "",
      descricao: "",
      preco: "",
      qte: "",
      qtePedida: "0"
    };
  }

  componentDidMount() {
    this.getProduto();
  }

  //importação da API
  getProduto = async () => {
    const acc = await AsyncStorage.getItem("userToken");
    const id = this.props.navigation.getParam("idProduto");

    axios
      .request({
        method: "get",
        url: "http://localhost:4321/produto/" + id,
        headers: { "x-access-token": acc }
      })
      .then(response => {
        this.setState({
          nome: response.data.nome,
          descricao: response.data.descricao,
          preco: response.data.preco,
          qte: response.data.qte
        });
      })
      .catch(err => console.log(err));
  };

  //Função para comprar o produto
  comprarProduto = async () => {
    const acc = await AsyncStorage.getItem("userToken");
    const id = this.props.navigation.getParam("idProduto");

    let aux_a = parseFloat(this.state.qtePedida);
    let aux_b = parseFloat(this.state.qte);
    let aux_c = parseFloat(this.state.preco);

    if (aux_a > aux_b) {
      Alert.alert(
        "A quantidade deste item em estoque é de ",
        JSON.stringify(aux_b)
      );
    } else {
      let novaQte = aux_b - aux_a;

      const produto = {
        nome: this.state.nome,
        descricao: this.state.descricao,
        preco: this.state.preco,
        qte: novaQte
      };

      axios
        .request({
          method: "put",
          url: "http://localhost:4321/produto/" + id,
          headers: { "x-access-token": acc },
          data: produto
        })
        .then(response => console.log(response))
        .catch(err => console.log(err));

      let subTotal = aux_a * aux_c;
      this.props.dispatch({ type: 'SUM', novoTotal: subTotal });
      this.props.navigation.navigate("Home");
    }
  };

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
            <Text style={styles.title}>Compra</Text>
          </Body>
          <Right />
        </Header>
        <Content>
          <Form>
            <Item>
              <Label>Nome: </Label>
              <Input
                style={styles.nullButton}
                autoCapitalize="none"
                value={this.state.nome}
                disabled={true}
                maxLength={25}
              />
            </Item>
            <Item>
              <Label>Descrição:</Label>
              <Input
                style={styles.nullButton}
                autoCapitalize="none"
                value={this.state.descricao}
                disabled={true}
                maxLength={50}
              />
            </Item>
            <Item>
              <Label>Preco(R$):</Label>
              <Input
                style={styles.nullButton}
                autoCapitalize="none"
                value={this.state.preco}
                disabled={true}
                maxLength={12}
              />
            </Item>
            <Item>
              <Label>Quantidade:</Label>
              <Input
                autoCapitalize="none"
                value={this.state.qtePedida}
                onChangeText={qtePedida => this.setState({ qtePedida })}
                maxLength={5}
              />
            </Item>
          </Form>
          <Text />
          <View style={styles.buttonSection}>
            <TouchableHighlight
              underlayColor="#2A4809"
              style={styles.button}
              onPress={() => this.comprarProduto()}
            >
              <Text style={styles.buttonText}>Adicionar ao carrinho</Text>
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
  
  export default connect(mapStateToProps)(Compra);