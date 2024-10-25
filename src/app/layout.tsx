import type { Metadata } from "next";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import ReactQueryProvider from "@/components/molecules/ReactQueryProvider/react-query-provider";

export const metadata: Metadata = {
  title: "Task Manager",
  description: "Challenger Task Manager",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>
          <AntdRegistry>{children}</AntdRegistry>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
