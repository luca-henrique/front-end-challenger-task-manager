"use client";

import { Icon } from "@/assets/icons/icons";
import { Button, Form, Typography } from "antd";

import React from "react";
import { MailOutlined, KeyOutlined } from "@ant-design/icons";

import { Input } from "@/components/atoms/Input/input";
import { SignInFormType } from "./sign-in-form.type";

export const SignInFormView = ({ handleSubmit, errors, handleChangeInputValue }: SignInFormType) => {
  return (
    <Form
      onFinish={handleSubmit}
      layout="vertical"
      style={{
        width: "500px",
        background: "#fff",
        padding: "44px",
        gap: "20px",
        borderRadius: "12px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
        <Icon.BookIcon />
        <Typography.Title
          style={{ textAlign: "center", margin: "0px", color: "#000" }}
          level={2}
        >
          Task Manager
        </Typography.Title>
      </div>

      <Typography.Title style={{ margin: "0px" }} level={2}>
        Entrar
      </Typography.Title>

      <Input
        label="Email"
        error={errors.email?.message}
        prefix={<MailOutlined />}
        type="email"
        size="large"
        onChange={(event) =>
          handleChangeInputValue("email", event.target.value)
        }
      />

      <Input
        size="large"
        label="Senha"
        error={errors.password?.message}
        prefix={<KeyOutlined />}
        type="password"
        onChange={(event) =>
          handleChangeInputValue("password", event.target.value)
        }
      />

      <Button
        style={{ background: "#F0D1A8" }}
        type="primary"
        htmlType="submit"
        size="large"
      >
        Entrar
      </Button>
    </Form>
  )
}