import { formatDate } from "@/utils/formatDate";
import { Button, Tooltip } from "antd";
import { FormOutlined, DeleteOutlined } from "@ant-design/icons";
import { Task } from "@/types/task";
import { useTask } from "@/store/store";

type CardTaskProps = Omit<Task, 'user_id'>;

export const CardTask = ({
  id,
  date,
  content,
  title,
}: CardTaskProps) => {

  const { actions: { deleteTask, selectTask } } = useTask()

  return (
    <div style={{ display: "flex", flexDirection: "row", width: "300px", background: "#d1d1d1", justifyContent: "space-between", padding: "12px", borderRadius: "12px" }}>
      <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <h4 style={{ margin: 0 }}>{title}</h4>
        <h4 style={{ margin: 0 }}>{content}</h4>
        <h4 style={{ margin: 0 }}>{formatDate(date)}</h4>
      </div>
      <div>
        <Tooltip title="search">
          <Button
            shape="circle"
            icon={<FormOutlined />}
            onClick={() => selectTask(id)}
          />
        </Tooltip>
        <Tooltip title="search">
          <Button
            shape="circle"
            danger
            icon={<DeleteOutlined />}
            onClick={() => deleteTask(id)}
          />
        </Tooltip>
      </div>
    </div>
  );
};
