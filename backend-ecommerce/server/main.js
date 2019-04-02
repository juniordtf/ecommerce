import { Meteor } from 'meteor/meteor';
import Links from '../imports/api/links';
import Produtos from '../imports/api/produtos';
import Usuarios from '../imports/api/usuarios';
import Tokens from '../imports/api/tokens';



function insertLink(title, url) {
  Links.insert({ title, url, createdAt: new Date() });
}

Meteor.startup(() => {

  Tokens.insert({texto:"bla bla bla", data: new Date() });
  Produtos.insert({produto:"pao de queijo"});


  // base está vazia
  if (Usuarios.find().count() === 0){
    Usuarios.insert({username:"abc", senha:"123"});
    Usuarios.insert({username:"def", senha:"134"});
    Usuarios.insert({username:"afg", senha:"567"});
  }

});
