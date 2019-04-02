/**
 * @format
 * @flow
 */
import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    padding: 20
  },
  header: {
    backgroundColor: "#212121"
  },
  title: {
    fontSize: 22,
    color: "white",
    textAlign: "center"
  },
  welcome: {
    fontSize: 24,
    color: "black",
    textAlign: "center"
  },
  topic: {
    fontSize: 17,
    color: "black",
    fontWeight: "bold",
    textAlign: "left"
  },
  input: {
    backgroundColor: "#FFFFFF",
    height: 55,
    borderRadius: 3,
    padding: 5,
    marginTop: 12
  },
  button: {
    backgroundColor: "#7ED321",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
    borderRadius: 3,
    width: "60%"
  },
  content: {
    backgroundColor: "#D8D8D8"
  },
  buttonSection: {
    width: "100%",
    height: "20%",
    justifyContent: "center",
    alignItems: "center"
  },
  homeSection: {
    width: "100%",
    height: "70%",
    justifyContent: "center",
    alignItems: "center"
  },
  imageSection: {
    width: "100%",
    height: "70%",
    justifyContent: "center",
    alignItems: "center"
  },
  messageSection: {
    width: "90%",
    height: "40%",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "5%",
    backgroundColor: "#FFFFFF"
  },
  buttonText: {
    color: "black",
    fontSize: 20
  },
  item: {
    marginTop: 12
  },
  messageText: {
    marginLeft: "5%"
  },
  messageTextInner: {
    fontSize: 16,
    marginTop: 5,
    marginLeft: 10
  },
  bigBlue: {
    color: "blue",
    fontWeight: "bold",
    fontSize: 30
  },
  red: {
    color: "red"
  }
});

export default styles;