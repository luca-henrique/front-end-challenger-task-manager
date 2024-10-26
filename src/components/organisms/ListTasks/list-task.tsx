import { EditTaskForm } from "@/components/molecules/EditTaskForm/task-form";
import { CardTask } from "@/components/molecules/Task/task";
import { TaskForm } from "@/components/molecules/TaskForm/task-form";
import { useTask } from "@/store/task";
import { Col, Row } from "antd";

export const ListTask = () => {
  const { snapshot: { tasks, selecteTask }, actions: { deleteTask, selectTask } } = useTask()
  return (
    <Col style={{ display: "flex", flexDirection: "column", width: "80%" }}>
      {selecteTask.id !== 0 ? <EditTaskForm /> : <TaskForm />}
      <Row style={{ display: "flex", flexDirection: "row", gap: "10px", flexWrap: "wrap" }}>
        {tasks.map((task) => {
          return (
            <CardTask
              deleteTask={deleteTask}
              selectTask={selectTask}
              key={task.id}
              {...task}
            />
          );
        })}
      </Row>
    </Col>
  );
};


