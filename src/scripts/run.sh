#!/bin/bash

set -a
source .env
set +a

echo "TOKEN_ADDRESS: $TOKEN_ADDRESS"
echo "INFURA_API_KEY: $INFURA_API_KEY"

cd "$(dirname "$0")"

echo "Running fetchTransferLog.ts across multiple blockchain directories..."
ts-node arbitrum/fetchTransferLog.ts &
ts-node base/fetchTransferLog.ts &
ts-node bsc/fetchTransferLog.ts &
ts-node ethereum/fetchTransferLog.ts &
ts-node optimistic/fetchTransferLog.ts &
ts-node polygon/fetchTransferLog.ts &

wait
echo "All fetchTransferLog.ts scripts have been executed."

cd -
