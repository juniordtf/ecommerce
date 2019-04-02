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

class CriarProduto extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: "",
      descricao: "",
      preco: "",
      qte: ""
    };
  }


  //importação da API
  criar = () => {
    const novoProduto = {
      nome: this.state.nome,
      descricao: this.state.descricao,
      preco: this.state.preco,
      qte: this.state.qte
    };

    axios
      .request({
        method: "post",
        url: "http://localhost:4321/produto",
        data: novoProduto
      })
      .then(response => console.log(response))
      .catch(err => console.log(err));

    Alert.alert("produto criado com sucesso!");
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
            <Text style={styles.title}>Criar</Text>
          </Body>
          <Right />
        </Header>
        <Content>
          <Form>
            <Item>
              <Label>Nome:</Label>
              <Input
                autoCapitalize="none"
                value={this.state.nome}
                onChangeText={nome => this.setState({ nome })}
                maxLength={25}
              />
            </Item>
            <Item>
              <Label>Descrição:</Label>
              <Input
                autoCapitalize="none"
                value={this.state.descricao}
                onChangeText={descricao => this.setState({ descricao })}
                maxLength={50}
              />
            </Item>
            <Item>
              <Label>Preco(R$):</Label>
              <Input
                autoCapitalize="none"
                value={this.state.preco}
                onChangeText={preco => this.setState({ preco })}
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
              onPress={() => this.criar()}
            >
              <Text style={styles.buttonText}>Criar produto</Text>
            </TouchableHighlight>
          </View>
        </Content>
      </Container>
    );
  }
}

export default CriarProduto;
