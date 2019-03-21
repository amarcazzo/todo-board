import React from "react";
import Task from "./Task";

function TaskList(props) {
  return (
    <div>
      {props.items.map(x => (
        <Task
          key={x.id}
          id={x.id}
          title={x.title}
          boardType={props.boardType}
          handleChangeState={props.handleChangeState}
          handleRemove={props.handleRemove}
        />
      ))}
    </div>
  );
}

export default TaskList;
