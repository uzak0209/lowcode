# Node.js の公式イメージ（最新版 LTS）
FROM mcr.microsoft.com/playwright:v1.52.0-jammy

# 作業ディレクトリ作成
WORKDIR /app

# 依存関係のインストール（package.json + package-lock.json）
COPY package*.json ./
RUN npm install

# アプリのコードをコピー
COPY . .
RUN npx playwright install
# サーバーがリッスンするポートを指定（必要に応じて）
EXPOSE 3000

# アプリの起動コマンド
CMD ["npx", "tsx", "src/time_scheduler.ts"]
