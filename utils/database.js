import mongoose from "mongoose";
// MongoDBとNode.jsを接続

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB接続中");
    return;
  }

  // 接続されていない場合は、ここでMongoDBに接続する
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "read_together",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;

    console.log("MongoDB接続しました");
  } catch (error) {
    console.log(error);
  }
};
