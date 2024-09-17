#!/bin/bash

BASE_DIR="./data"

echo "This will delete all CSV files in $BASE_DIR. Are you sure? (y/n)"
read -r confirm

if [[ $confirm == [yY] || $confirm == [yY][eE][sS] ]]; then
    echo "Deleting all CSV files in $BASE_DIR..."
    find "$BASE_DIR" -type f -name '*.csv' -exec rm {} +
    echo "CSV files deleted successfully."
else
    echo "CSV file deletion cancelled."
fi
