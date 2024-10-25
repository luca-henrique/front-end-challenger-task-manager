'use client'

import React, { useEffect } from 'react';

import { ListTask } from '@/components/organisms/ListTasks/list-task';
import { useTask } from '@/store/store';


export default function Home() {
  const { actions: { readTasks } } = useTask()

  useEffect(() => {
    readTasks()
  }, [])

  return (
    <div>
      <h1>Task Manager</h1>
      <ListTask />
    </div>
  );
}


