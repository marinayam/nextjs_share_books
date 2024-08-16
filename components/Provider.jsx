"use client";

// アプリ全体で認証セッション（ログイン情報など）を管理可能に！
import { SessionProvider } from "next-auth/react";

const Provider = ({ children, session }) => (
  // 子コンポーネント（children）にセッション情報を提供
  <SessionProvider session={session}>{children}</SessionProvider>
);

export default Provider;
