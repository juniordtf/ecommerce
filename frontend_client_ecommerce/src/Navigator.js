import { createStackNavigator, createAppContainer } from 'react-navigation';
import Login from './Login'
import Home from './Home'
import Cadastro from './Cadastro'
import Compra from './Compra'
import Checkout from './Checkout'
import Confirmacao from './Confirmacao'


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
  Compra: {
    screen: Compra,
    navigationOptions: {
      header: null
    }
  },
  Checkout: {
    screen: Checkout,
    navigationOptions: {
      header: null
    }
  },
  Confirmacao: {
    screen: Confirmacao,
    navigationOptions: {
      header: null
    }
  }
})

export default createAppContainer(Navigator)