import { Schema, model, models } from "mongoose";

// UserSchemaを作成し、ユーザーの情報を定義
const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, "既に登録されているアドレスです"],
    // unique: trueにより、同じメールアドレスが複数登録されないようにする
    required: [true, "メールアドレスは必須です"],
  },
  username: {
    type: String,
    required: [true, "ユーザー名は必須です"],
    match: [
      /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      "ユーザー名が無効です。8-20文字以内で登録してください。",
    ],
  },
  image: {
    type: String,
  },
});

// models.Userでアカウント存在チェック
// 存在しない場合は、作成
const User = models.User || model("User", UserSchema);

export default User;
