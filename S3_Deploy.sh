#!/bin/bash

# -----------------------------
# 🚀 Deploy Static Site to S3
# Bucket: nashvillepizzaco.com
# -----------------------------

echo "🔄 Starting S3 sync to us-east-2..."

aws s3 sync . s3://nashvillepizzaco.com \
  --region us-east-2 \
  --delete \
  --exclude ".git/*" \
  --exclude "venv/*" \
  --exclude "S3_Deploy.sh"

echo "✅ Sync complete!"

echo "🌐 Check your site at:"
echo "  If using S3 static hosting:"
echo "    http://nashvillepizzaco.com.s3-website-us-east-2.amazonaws.com"
echo "  If using CloudFront:"
echo "    https://www.nashvillepizzaco.com"



# Make this live with:
# bash
# chmod +x S3_Deploy.sh
# then run
# ./S3_Deploy.sh
