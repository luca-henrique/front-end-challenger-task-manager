import { Button, Form } from "antd";
import { TaskFormViewProps } from "./task-form.type";
import { Input } from "@/components/atoms/Input/input";
import TextArea from "antd/es/input/TextArea";
import { CONTENT_MAX_LENGTH } from "@/common/validations";



export const TaskFormView = ({ handleSubmit, handleChangeInputValue, watch, errors }: TaskFormViewProps) => {

  const { title, content } = watch()

  return (
    <Form onFinish={handleSubmit} style={{ display: "flex", flexDirection: "column", marginBottom: "30px", width: "400px", gap: "10px" }}>
      <Input label="Titulo" error={errors.title?.message} value={title} onChange={event => handleChangeInputValue('title', event.target.value)} />
      <TextArea rows={2} value={content} onChange={event => handleChangeInputValue('content', event.target.value)} maxLength={CONTENT_MAX_LENGTH} />
      <Button
        style={{ background: "#F0D1A8" }}
        type="primary"
        htmlType="submit"
        size="large"
      >
        Atualizar
      </Button>
    </Form>
  );
};