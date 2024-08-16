import NextAuth from "next-auth";
// Googleアカウントを使ったログイン
import GoogleProvider from "next-auth/providers/google";
import User from "@models/user";
import { connectToDB } from "@utils/database";

const handler = NextAuth({
  // 認証に使用するプロバイダーを設定
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  // 認証後の処理を行うためのコールバック関数を定義
  callbacks: {
    // セッションに関するコールバック関数
    async session({ session }) {
      // ユーザーの email に基づいてデータベースからユーザー情報を取得
      const sessionUser = await User.findOne({ email: session.user.email });
      // MongoDB の user_id をセッション情報に追加
      session.user.id = sessionUser._id.toString();

      return session;
    },
    // サインイン時の処理を行うコールバック関数
    async signIn({ account, profile, user, credentials }) {
      try {
        // データベースに接続
        await connectToDB();

        // userが既に存在するか確認
        const userExists = await User.findOne({ email: profile.email });

        // userが存在しない場合は、新規作成
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }

        return true;
      } catch (error) {
        console.log("サインインに失敗しました: ", error.message);
        return false;
      }
    },
  },
});

// GET および POST リクエストの処理としてエクスポート
// これらのリクエストが来たときに NextAuth の認証処理が実行される
export { handler as GET, handler as POST };
