'use client'

import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { FieldTypeTaskFormSchema, TaskFormSchemaType } from './task-form.type';
import { TaskSchema, TaskSchemaType } from './task-form.schema';
import { useTask } from '@/store/task';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

export const useTaskForm = () => {
  const { actions: { updateTask, selectTask }, snapshot: { selecteTask } } = useTask()

  const { setValue, handleSubmit, clearErrors, watch, formState: { errors } } =
    useForm<TaskFormSchemaType>({
      resolver: zodResolver(TaskSchema),
      mode: 'all',
      defaultValues: {
        title: selecteTask.title,
        content: selecteTask.content,
      },
    });

  useEffect(() => {
    setValue('title', selecteTask.title)
    setValue('content', selecteTask.content)
  }, [selecteTask, setValue])

  const handleChangeInputValue = (
    fieldName: FieldTypeTaskFormSchema,
    value: string,
  ) => {
    setValue(fieldName, value);
    clearErrors(fieldName);
  };


  async function handleEvent(value: TaskSchemaType) {
    await updateTask(value);
    toast.success('Task atualizada')
    selectTask(0)
  }

  return {
    handleSubmit: handleSubmit(handleEvent),
    handleChangeInputValue,
    watch,
    errors
  };
};
