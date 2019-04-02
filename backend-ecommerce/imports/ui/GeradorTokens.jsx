import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import Tokens from '../api/tokens';
import Usuarios from '../api/usuarios';


class GeradorTokens extends Component {

  gerarToken = () => {
    if(Usuarios.find({username:"abc", senha:"123"}).count() === 1){
      Tokens.insert({data: new Date()})
    }
  }

  render() {

    let tokens = this.props.tokens;

    let listaDeTokens = tokens.map((item, index) => {
      return <li key={index}> {item._id} - {JSON.stringify(item.data)}</li>
    })

    return (
      <div>
        <button onClick={() => this.gerarToken()}> Gerar token </button>
        <ul>
          {listaDeTokens}
        </ul>	
      </div>
    );
  }

}

export default TokenContainer = withTracker(() => {
    return {
      tokens: Tokens.find().fetch()
    };
  })(GeradorTokens);
  