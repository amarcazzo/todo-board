import React from "react";
import Board from "./Board.js";
import styled from "styled-components";
import { connect } from "react-redux";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px;
  padding: 5px;
`;

const Card = styled.div`
  font-size: 24px;
  font-weight: 500;
  width: 30%;
  border: 1px solid;
  border-radius: 4px;
  box-shadow: 0 2px 6px 0 hsla(0, 0%, 0%, 0.2);
  padding: 15px;
`;

function Content(props) {
  const boards = (
    <Wrapper>
      <Board boardType="0" boardTitle="Backlog" />
      <Board boardType="1" boardTitle="In Progress" />
      <Board boardType="2" boardTitle="Done" />
    </Wrapper>
  );

  const requestLogin = (
    <Wrapper>
      <Card>Necesita estar logueado para poder utilizar esta herramienta.</Card>
    </Wrapper>
  );

  return props.isLoggedIn ? boards : requestLogin;
}

Content.propTypes = {};

const mapStateToProps = state => ({
  isLoggedIn: state.user.isLoggedIn
});

export default connect(
  mapStateToProps,
  {}
)(Content);
