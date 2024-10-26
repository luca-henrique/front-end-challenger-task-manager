import { formatDate } from "@/utils/format-date";
import { Col, Row, Typography } from "antd";
import { FormOutlined, DeleteOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";

import { CardTaskProps } from "./task.type";

const { Title, Paragraph } = Typography

export const CardTask = ({
  id,
  date,
  content,
  title,
  deleteTask,
  selectTask,
}: CardTaskProps) => {

  const handleDeleteTask = (id: number) => {
    deleteTask(id)
    toast.error('Task removida')
  }

  return (
    <Row style={{ width: "380px", background: "#F0D1A8", justifyContent: "space-between", padding: "22px", borderRadius: "12px" }}>
      <Col style={{ flexDirection: "column", display: "flex", flexWrap: "wrap", width: "240px" }}>
        <Title level={5} style={{ margin: 0 }}>{title}</Title>
        <Col style={{ height: "48px" }}>
          <Paragraph ellipsis={{
            rows: 2,
          }}
            type="secondary" style={{ margin: 0 }}>{content}</Paragraph>
        </Col>
        <Title level={5} style={{ margin: 0, marginTop: "8px" }}>{formatDate(date)}</Title>
      </Col>
      <Row style={{ gap: "10px", flexDirection: "row", display: "flex", height: "20px" }}>
        <FormOutlined onClick={() => selectTask(id)} id="select" />
        <DeleteOutlined onClick={() => handleDeleteTask(id)} id="delete" />
      </Row>
    </Row>
  );
};
