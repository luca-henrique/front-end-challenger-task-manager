"use client";

import { SignInForm } from "@/components/molecules/SignInForm/sign-in-form";
import { Flex } from "antd";

export default function Home() {
  return (
    <Flex
      vertical
      justify="center"
      align="center"
      style={{ height: "100vh", background: "#f5f5f5" }}
    >
      <SignInForm />
    </Flex>
  );
}
