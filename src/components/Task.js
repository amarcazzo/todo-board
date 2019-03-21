import React from "react";
import styled from "styled-components";

const Button = styled.button`
  border: none;
  border-radius: 2px;
  transition-duration: 0.4s;
  margin: 0;
  padding: 0;
  display: none;
  height: 18px;
  width: 18px;
  background-color: transparent;

  &:hover {
    background-color: ${props =>
      props.name === "changeState" ? "#4caf50" : "#c42952"};
    color: white;
  }
`;

const Wrapper = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  margin: 5px;
  border-radius: 4px;

  &:hover {
    background-color: #ecf5fc;
    button {
      display: inline;
    }
  }
`;

class Task extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.props.handleChangeState(this.props.id);
  }

  render() {
    const props = this.props;
    const buttons = (
      <div>
        <Button name="changeState" onClick={this.handleClick}>
          ✓
        </Button>
      </div>
    );
    return (
      <Wrapper id={props.id}>
        <label>{props.title}</label>
        {props.boardType !== 2 ? buttons : ""}
      </Wrapper>
    );
  }
}

export default Task;
