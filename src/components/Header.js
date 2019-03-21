import React, { Component } from "react";
import styled from "styled-components";
import Login from "./Login.js";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Title = styled.h1`
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  padding: 20px;
`;

export default class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "To-do Board"
    };
  }

  componentDidMount() {}

  render() {
    const state = this.state;
    return (
      <Wrapper>
        <Title>{state.title}</Title>
        <Login
          user={state.user}
          logIn={this.handleLogIn}
          logOut={this.handleLogOut}
          isUserSignedIn={this.isUserSignedIn}
        />
      </Wrapper>
    );
  }
}
