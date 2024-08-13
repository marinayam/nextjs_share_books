/**
 * @type {import('next').NextConfig}
 *
 * 設定オブジェクトの型を指定
 * コードエディタが次の設定が正しいかどうかを検証してくれたり、補完をサポート
 */
const nextConfig = {
  experimental: {
    appDir: true, //「appディレクトリ」を有効にする機能
    serverComponentsExternalPackages: ["mongoose"], // サーバーコンポーネントで使用する外部パッケージを指定。ここでは、Mongoose（MongoDBと連携するためのパッケージ）を指定
  },
  images: {
    domains: ["lh3.googleusercontent.com"], // 外部からの画像を許可するドメインを指定。Googleのプロフィール画像を読み込むことを許可
  },
  webpack(config) {
    // Webpackの設定をカスタマイズ
    config.experiments = {
      ...config.experiments, // 既存のWebpack設定を保持しつつ、追加設定
      topLevelAwait: true, //「トップレベルawait」を使用可能に設定。async/awaitをモジュールのトップレベルで使用可能に！
    };
    return config; // カスタマイズした設定をWebpackに渡す
  },
};

// 上記の設定オブジェクトをNext.jsに渡すために、module.exportsでエクスポート
module.exports = nextConfig;
