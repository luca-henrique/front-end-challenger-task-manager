'use client'


import { Icon } from '@/assets/icons/icons';
import { Row, Typography } from 'antd';


export const Header = () => {
  return (
    <Row style={{ display: "flex", flexDirection: "row", gap: "10px", marginTop: "4rem", marginBottom: "2rem" }}>
      <Icon.BookIcon />
      <Typography.Title
        style={{ textAlign: "center", margin: "0px", color: "#000" }}
        level={2}
      >
        Task Manager
      </Typography.Title>
    </Row>
  )
}