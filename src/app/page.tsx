"use client";

import { Icon } from "@/assets/icons/icons";
import { Button, Flex, Form, Typography } from "antd";

import React from "react";
import { MailOutlined, KeyOutlined } from "@ant-design/icons";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

import z from "zod";
import { useSignInModel } from "../model/sign-in-screen.model";
import { Input } from "@/components/atoms/Input/input";

const PASSWORD_MIN_LENGTH = 4;
const PASSWORD_MAX_LENGTH = 16;

export const SignInScreenSchema = z
  .object({
    email: z.string({ required_error: "CPF/CNPJ é obrigatório." }),

    password: z
      .string()
      .min(
        PASSWORD_MIN_LENGTH,
        `A senha deve ter no mínimo ${PASSWORD_MIN_LENGTH} caracteres.`
      )
      .max(
        PASSWORD_MAX_LENGTH,
        `A senha deve ter no máximo ${PASSWORD_MAX_LENGTH} caracteres.`
      ),
  })
  .required();

export type SignInScreenSchemaType = z.infer<typeof SignInScreenSchema>;

export default function Home() {
  const { handleChangeInputValue, handleSubmit, errors } = useSignInModel();

  return (
    <Flex
      vertical
      justify="center"
      align="center"
      style={{ height: "100vh", background: "#f0f0f0" }}
    >
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
    </Flex>
  );
}
