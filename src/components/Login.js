import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logIn, logOut, authInit } from "../actions/userActions";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 15px;
`;

const Button = styled.button`
  margin: 5px;
  height: 30px;
  width: 80px;
  font-weight: 500;
  font-size: 14px;
  border: none;
  background-color: transparent;
  transition: transform 0.2s;
  outline: none;

  &:hover {
    background-color: #f7f8f9;
    border-radius: 4px;
  }
`;

const ProfilePic = styled.img`
  border-radius: 50%;
  max-width: 40px;
  border: 1px solid;
  boder-color: #dbe4ee;
  margin: 5px;

  &:hover {
    box-shadow: 0 2px 6px 0 hsla(0, 0%, 0%, 0.2);
  }
`;

class Login extends Component {
  componentDidMount() {
    this.props.authInit();
  }

  render() {
    const click = this.props.isLoggedIn ? this.props.logOut : this.props.logIn;
    const legend = this.props.isLoggedIn ? "Log Out" : "Log In";
    const picture = this.props.picture || "./images/profile_placeholder.png";
    return (
      <Wrapper>
        <ProfilePic src={picture} />
        <Button onClick={click}>{legend}</Button>
      </Wrapper>
    );
  }
}

Login.propTypes = {
  logIn: PropTypes.func.isRequired,
  logOut: PropTypes.func.isRequired,
  authInit: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  username: state.user.name,
  picture: state.user.picture,
  isLoggedIn: state.user.isLoggedIn
});

export default connect(
  mapStateToProps,
  { logIn, logOut, authInit }
)(Login);
