# Node.js の公式イメージ（最新版 LTS）
FROM node:20-slim

# 作業ディレクトリ作成
WORKDIR /app

# 依存関係のインストール（package.json + package-lock.json）
COPY package*.json ./
RUN npm install

# アプリのコードをコピー
COPY . .

# サーバーがリッスンするポートを指定（必要に応じて）
EXPOSE 3000

# アプリの起動コマンド
CMD ["node", "src/excute.ts"]
