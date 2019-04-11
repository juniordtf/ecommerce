import React from "react";
import { StyleSheet, View, StatusBar } from "react-native";
import Navigator from "./src/Navigator";
import { Provider } from "react-redux";
import { createStore } from "redux";

const initialState = {
  novoTotal: 0
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "SUM":
      return {
        ...state,
        novoTotal: state.novoTotal + action.novoTotal
      };
      case "CLEAR":
      return {
        ...state,
        novoTotal: 0
      };
    default:
      return state;
  }
}

const store = createStore(reducer);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Navigator />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
