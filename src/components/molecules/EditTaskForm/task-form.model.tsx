import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { FieldTypeTaskFormSchema, TaskFormSchemaType } from './task-form.type';
import { TaskSchema, TaskSchemaType } from './task-form.schema';
import { useTask } from '@/store/store';

export const useTaskForm = () => {
  const { actions: { updateTask }, snapshot: { selecteTask } } = useTask()

  const { setValue, handleSubmit, clearErrors, watch, formState: { errors } } =
    useForm<TaskFormSchemaType>({
      resolver: zodResolver(TaskSchema),
      mode: 'all',
      defaultValues: {
        title: selecteTask.title,
        content: selecteTask.content,
      },
    });

  const handleChangeInputValue = (
    fieldName: FieldTypeTaskFormSchema,
    value: string,
  ) => {
    setValue(fieldName, value);
    clearErrors(fieldName);
  };

  console.log(errors)

  function handleEvent(value: TaskSchemaType) {
    console.log(value)
    updateTask(value);
  }

  return {
    handleSubmit: handleSubmit(handleEvent),
    handleChangeInputValue,
    watch,
    errors
  };
};
