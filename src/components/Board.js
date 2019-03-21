import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getTasks,
  addTask,
  changeState,
  deleteTask
} from "../actions/taskActions";
import styled from "styled-components";
import TaskList from "./TaskList";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30%;
  border-radius: 4px;
  box-shadow: 0 2px 6px 0 hsla(0, 0%, 0%, 0.2);
  padding: 10px;
`;

const Tasks = styled.ul`
  margin: 0px;
  padding: 0px;
  width: 95%;
  list-style-type: circle;
`;

const NewTask = styled.input`
  border-radius: 4px;
  background-color: #f3f4f6;
  margin: 10px -10px 10px -10px;
  width: 100%;
  border: none;
  padding: 10px;
  outline: none;
`;

const Title = styled.div`
  width: 95%;
  padding: 10px;
`;

const Form = styled.form`
  margin: 0;
  padding: 0;
  width: 90%;
`;

const Search = styled.input`
  border-radius: inherit;
  background-color: #f3f4f6;
  width: 90%;
  border: none;
  padding: 10px;
  margin: 10px 0 10px 0;
  outline: none;
`;

class Board extends Component {
  constructor(props) {
    super(props);

    this.state = {
      boardTitle: props.boardTitle,
      boardType: Number(props.boardType),
      newTask: {
        title: "",
        state: 0
      },
      search: ""
    };

    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleChangeState = this.handleChangeState.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    let task = this.state.newTask;
    this.setState({
      newTask: { title: "", state: 0 }
    });

    this.props.addTask(task);
  }

  handleInput(e) {
    this.setState({ newTask: { title: e.target.value, state: 0 } });
  }

  handleRemove(taskId) {
    this.props.deleteTask(taskId);
  }

  handleChangeState(taskId) {
    let task = this.props.tasks.find(x => x.id === taskId);

    if (task.state < 2) task.state += 1;

    this.props.changeState(task);
  }

  handleSearch(e) {
    this.setState({ search: e.target.value.toLowerCase() });
  }

  componentDidMount() {
    this.props.getTasks(this.props.userId);
  }

  render() {
    const tasks = this.props.tasks.filter(x => {
      return (
        x.state === this.state.boardType &&
        x.title.toLowerCase().includes(this.state.search)
      );
    });

    const newTaskForm = (
      <Form onSubmit={this.handleSubmit}>
        <NewTask
          type="text"
          onChange={this.handleInput}
          placeholder="New task"
          value={this.state.newTask.title}
        />
      </Form>
    );

    const noTaskFound = <small>No tasks found.</small>;

    return (
      <Wrapper>
        <Title>{this.state.boardTitle}</Title>
        <Search type="text" placeholder="Search" onChange={this.handleSearch} />
        <Tasks>
          {tasks.length === 0 ? (
            noTaskFound
          ) : (
            <TaskList
              items={tasks}
              handleChangeState={this.handleChangeState}
              boardType={this.state.boardType}
            />
          )}
        </Tasks>
        {this.state.boardType === 0 ? newTaskForm : ""}
      </Wrapper>
    );
  }
}

Board.propTypes = {
  getTasks: PropTypes.func.isRequired,
  addTask: PropTypes.func.isRequired,
  changeState: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  tasks: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  tasks: state.tasks.items,
  lastUpdatedItemId: state.tasks.lastUpdatedItemId,
  userId: state.user.id
});

export default connect(
  mapStateToProps,
  { getTasks, addTask, changeState, deleteTask }
)(Board);
