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

class EditarProduto extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: "",
      descricao: "",
      preco: "",
      qte: ""
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
        url: "http://localhost:4321/produto/"+id,
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

    //importação da API
    alterarProduto = async () => {

      const acc = await AsyncStorage.getItem("userToken");
      const id = this.props.navigation.getParam("idProduto");
  
      const produto = {
        nome: this.state.nome,
        descricao: this.state.descricao,
        preco: this.state.preco,
        qte: this.state.qte
      };
  
      axios
        .request({
          method: "put",
          url: "http://localhost:4321/produto/"+id,
          headers: {'x-access-token': acc},
          data: produto
        })
        .then(response => console.log(response))
        .catch(err => console.log(err));
  
      Alert.alert("Quantidade do produto alterada com sucesso!");
      this.props.navigation.goBack();
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
            <Text style={styles.title}>Editar</Text>
          </Body>
          <Right />
        </Header>
        <Content>
        <Form>
            <Item style={styles.nullButton}>
              <Label>Nome:</Label>
              <Input
                autoCapitalize="none"
                value={this.state.nome}
                disabled={true}
                maxLength={25}
              />
            </Item>
            <Item style={styles.nullButton}>
              <Label>Descrição:</Label>
              <Input
                autoCapitalize="none"
                value={this.state.descricao}
                disabled={true}
                maxLength={50}
              />
            </Item>
            <Item style={styles.nullButton}>
              <Label>Preco(R$):</Label>
              <Input
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
                value={this.state.qte}
                onChangeText={qte => this.setState({ qte })}
                maxLength={5}
              />
            </Item>
          </Form>
          <Text />
          <View style={styles.buttonSection}>
            <TouchableHighlight
              underlayColor="#2A4809"
              style={styles.button}
              onPress={() => this.alterarProduto()}
            >
              <Text style={styles.buttonText}>Alterar produto</Text>
            </TouchableHighlight>
          </View>
        </Content>
      </Container>
    );
  }
}

export default EditarProduto;
