import { createStackNavigator, createAppContainer } from 'react-navigation';
import Login from './Login'
import Home from './Home'
import Cadastro from './Cadastro'
import CriarProduto from './CriarProduto'
import EditarProduto from './EditarProduto'



const Navigator = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      header: null
    }
  },
  Cadastro: {
    screen: Cadastro,
    navigationOptions: {
      header: null
    }
  },
  Home: {
    screen: Home,
    navigationOptions: {
      header: null
    }
  },
  CriarProduto: {
    screen: CriarProduto,
    navigationOptions: {
      header: null
    }
  },
  EditarProduto: {
    screen: EditarProduto,
    navigationOptions: {
      header: null
    }
  }
})

export default createAppContainer(Navigator)