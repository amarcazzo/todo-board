import React, { Component } from "react";
import Header from "./components/Header";
import Content from "./components/Content";
import { Provider } from "react-redux";
import store from "./store";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Header />
        <Content />
      </Provider>
    );
  }
}

export default App;
