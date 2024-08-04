import "@styles/globals.css";
import { children } from "react";

export const metadata = {
  title: "ReadTogether",
  description: "本を共有しましょう",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <div className="main">
          <div className="gradient" />
        </div>
        <main className="app">{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
