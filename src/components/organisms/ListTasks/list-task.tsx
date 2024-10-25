import { EditTaskForm } from "@/components/molecules/EditTaskForm/task-form";
import { CardTask } from "@/components/molecules/Task/task";
import { TaskForm } from "@/components/molecules/TaskForm/task-form";
import { useTask } from "@/store/store";

export const ListTask = () => {

  const { snapshot: { tasks, selecteTask } } = useTask()

  console.log(selecteTask.id)

  return (
    <>
      {selecteTask.id !== 0 ? <EditTaskForm /> : <TaskForm />}
      <div style={{ display: "flex", flexDirection: "row", gap: "10px", flexWrap: "wrap" }}>
        {tasks.map((task) => {
          return (
            <CardTask
              key={task.id}
              {...task}
            />
          );
        })}
      </div>
    </>
  );
};


