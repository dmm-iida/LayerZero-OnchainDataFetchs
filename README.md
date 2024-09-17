## LayerZero OnchainDataFetchs

LayerZero OnchainDataFetchsは、LayerZeroが展開している様々なブロックチェーンからオンチェーンデータをフェッチし管理するために設計されたNode.jsスクリプトです。

git clone [repository URL]
cd layerzero-onchaindatafetchs

```bash
node -v

v20.x.x
```

#### Installation

プロジェクトをセットアップするには、以下の手順で行ってください。

1. **Clone the repository:**

   ```bash
   git clone [repository URL]
   cd layerzero-onchaindatafetchs
   ```

2. **Install dependencies:**
   ```bash
   npm i
   ```

#### Usage

以下のnpmスクリプトが用意されています。

- **Start the Application:**
  このスクリプトは、オン・チェーン・データをフェッチして処理するメイン機能を実行します。

  ```bash
  npm run start
  ```

  これは`src/scripts/run.sh`を実行し、複数のブロックチェーンディレクトリで同時にデータ取得スクリプトをトリガーします。

- **Cleanup Generated Files:**
  スクリプトによって生成されたCSVファイルをクリーンアップします。

  ```bash
  npm run cleanup
  ```

  これは、`src/scripts/cleanup_csv_files.sh` を実行し、指定したディレクトリからすべてのCSVファイルを安全に削除し、データの乱雑さを防ぎます。

- **Format Code:**
  コードベースをクリーンで標準的な状態に保ちます。
  ```bash
  npm run format
  ```

```bash
npm run start

> layerzero-onchaindatafetchs@1.0.0 start
> sh src/scripts/run.sh

Running fetchTransferLog.ts across multiple blockchain directories...
Saved to ....../LayerZero-OnchainDataFetchs/data/bsc-mainnet/recipients.csv
Saved to ....../LayerZero-OnchainDataFetchs/data/bsc-mainnet/transfer_txs.csv
Saved to ....../LayerZero-OnchainDataFetchs/data/mainnet/transfer_txs.csv
Saved to ....../LayerZero-OnchainDataFetchs/data/mainnet/recipients.csv
Saved to ....../LayerZero-OnchainDataFetchs/data/base-mainnet/transfer_txs.csv
Saved to ....../LayerZero-OnchainDataFetchs/data/base-mainnet/recipients.csv
Saved to ....../LayerZero-OnchainDataFetchs/data/polygon-mainnet/transfer_txs.csv
Saved to ....../LayerZero-OnchainDataFetchs/data/polygon-mainnet/recipients.csv
Saved to ....../LayerZero-OnchainDataFetchs/data/arbitrum-mainnet/transfer_txs.csv
Saved to ....../LayerZero-OnchainDataFetchs/data/arbitrum-mainnet/recipients.csv
Saved to ....../LayerZero-OnchainDataFetchs/data/optimism-mainnet/transfer_txs.csv
Saved to ....../LayerZero-OnchainDataFetchs/data/optimism-mainnet/recipients.csv
All fetchTransferLog.ts scripts have been executed.
```

```bash
npm run cleanup

> layerzero-onchaindatafetchs@1.0.0 cleanup
> sh src/scripts/cleanup_csv_files.sh

This will delete all CSV files in ./data. Are you sure? (y/n)
y
Deleting all CSV files in ./data...
CSV files deleted successfully.
```
