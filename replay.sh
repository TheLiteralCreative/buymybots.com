#!/bin/bash
# ⏩ REPLAY SCRIPT — Uploads CSV + Site Refresh

echo "🗃️ Uploading latest inventory CSV to S3..."
aws s3 cp inventory.csv s3://buymybots.com/inventory.csv --region us-east-2 --acl bucket-owner-full-control

echo "🚀 Syncing site..."
aws s3 sync . s3://buymybots.com --region us-east-2 --acl bucket-owner-full-control --delete

echo "🔄 Invalidating CloudFront cache..."
aws cloudfront create-invalidation \
    --distribution-id E2VLAMZOK64745 \
    --paths "/*"

echo "✅ Replay Complete. Site + Inventory updated!"
