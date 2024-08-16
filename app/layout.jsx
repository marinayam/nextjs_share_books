import "@styles/globals.css";
import { children } from "react";
import Nav from "@components/Nav";
import Provider from "@components/Provider";

export const metadata = {
  title: "ReadTogether", // ウェブページのタイトル、ブラウザのタブに表示
  description: "本を共有しましょう", // 検索エンジンで表示される説明文
};

// 全ページで共通して表示される要素をここに配置
const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        {/* プロバイダーでラップすることで、アプリ全体でグローバルな状態管理や認証を提供 */}
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
