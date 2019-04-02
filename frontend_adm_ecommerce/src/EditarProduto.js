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
      produtos: []
    };
  }

  componentDidMount() {
    this.postProduto();
  }

  //importação da API
  postProduto() {
    axios
      .post("http://localhost:4321/produto")
      .then(response => {
        this.setState({ produtos: response.data });
      })
      .catch(err => console.log(err));
  }


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
            <Text style={styles.title}>Editar</Text>
          </Body>
          <Right/>
        </Header>
        <Content>
          <Text/>  
          <Text/>  
          <Text/>  
          <Text/>  
          <Text/>  
        </Content>
      </Container>
    );
  }
}

export default EditarProduto;
