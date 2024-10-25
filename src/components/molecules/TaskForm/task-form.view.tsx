import { TaskFormViewProps } from "./task-form.type";


export const TaskFormView = ({ handleSubmit, handleChangeInputValue, watch, errors }: TaskFormViewProps) => {

  const { title, content } = watch()


  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", marginBottom: "30px", width: "400px", gap: "10px" }}>
      <input value={title} onChange={event => handleChangeInputValue('title', event.target.value)} />
      <textarea value={content} onChange={event => handleChangeInputValue('content', event.target.value)} />
      <button type="submit">Criar</button>
    </form>
  );
};