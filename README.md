# isms-management-app

## 概要

- 社内の機器・ライセンス保有者が不明な状態にならないようにして、常に最新の情報を保持する運用体制を構築する。
- 現在作成中

## 使用技術

- フロントエンド
  - 言語：TypeScript 4.8.2
  - FW：NextJS 13.0.0
- バックエンド
  - 言語：Node.js 14.21.2（TypeScript）
  - FW:：NestJS 9.0.0
- DB：PostgresSQL 14.6
- ORM：Prisma 4.6.1
- インフラ：AWS（予定）
- monorepo:Nx

## 実装予定機能

- 管理者側

  - 認証機能
    - 管理者の登録（複数の組織が使用していることを想定）
    - ログイン機能
    - ログアウト機能
    - パスワードリセット機能
  - 機器・ライセンス管理機能
    - 機器情報（種別・機器名・購入日・利用者・ステータス）の表示・登録・更新・削除
    - ライセンス情報（種別・サービス名・購入日・有効期限・利用者・ステータス）の表示・登録・更新・削除
  - ユーザー管理
    - ユーザー情報（氏名・メールアドレス・部署）の登録・削除・更新
  - メール送信の設定（バッチ処理）

    - 送信日の設定
    - リマインダー機能
      - 回答したかどうかのチェック
      - 未回答者に 1 日ごとにメール送信
    - 送信先を設定
      - 宛先を選択できようにする
      - デフォルトは社員全員
      - 新たにメンバーが追加されたら、宛先対象になる
    - 月初に現在の機器情報を送信
    - 送信日時・（リマインド）設定

  - 月ごとに情報更新の確認
    - 管理者は利用状況を確認して承認
    - 過去の更新歴を見れるようにする

- **ユーザー側**
  - 認証機能
    - ログイン
    - 初回ログイン時にパスワードを設定する
      - 一度更新したら更新フラグを立てて、2 回目以降は表示しないようにする
    - パスワードリセット
  - ユーザーの機器・ライセンス情報を表示
  - 送られたメールから利用状況を更新
    - ステータスの選択
    - ステータスを送信

## 画面

https://www.figma.com/file/8AE8nc91Bdc8ztdbKq5f37/isms-management-app?node-id=0%3A1&t=WjAmvEapj66j8crX-1

## ER 図

![スクリーンショット 2023-01-09 0 38 10](https://user-images.githubusercontent.com/84260901/211205707-5fd3cdb3-aaca-47da-8007-d10612f55485.png)
