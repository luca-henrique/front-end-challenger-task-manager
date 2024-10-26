'use client'

import React, { useEffect } from 'react';

import { ListTask } from '@/components/organisms/ListTasks/list-task';
import { useTask } from '@/store/task';
import { Col } from 'antd';
import { Header } from '@/components/molecules/Header/header';

export default function Home() {
  const { actions: { readTasks } } = useTask()

  useEffect(() => {
    readTasks()
  }, [])

  return (
    <Col style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <Header />
      <ListTask />
    </Col>
  );
}


