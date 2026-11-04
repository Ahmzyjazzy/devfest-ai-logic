#!/usr/bin/env sh
# Uploads firebase/catalogue.txt to your default Storage bucket, replacing the
# old one, so the support agent sees the products the store shows.
# Needs the Google Cloud CLI signed in to the account that owns the project:
#   gcloud auth login
set -e

PROJECT_ID=$(grep -E '^VITE_FIREBASE_PROJECT_ID=' .env.local | cut -d= -f2)
BUCKET=$(grep -E '^VITE_FIREBASE_STORAGE_BUCKET=' .env.local | cut -d= -f2)

if [ -z "$PROJECT_ID" ] || [ -z "$BUCKET" ]; then
  echo "Set VITE_FIREBASE_PROJECT_ID and VITE_FIREBASE_STORAGE_BUCKET in .env.local first."
  exit 1
fi

gcloud storage cp firebase/catalogue.txt "gs://$BUCKET/catalogue.txt" \
  --content-type="text/plain; charset=utf-8" --project="$PROJECT_ID"
echo "Uploaded gs://$BUCKET/catalogue.txt"
