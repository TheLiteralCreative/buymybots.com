# 🚀 Doombroom E-Commerce Platform

## 📌 Project Overview

Doombroom is a **multi-seller e-commerce platform** designed to provide a seamless online shopping experience with robust backend infrastructure.

## 🛠 Technology Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: AWS Lambda, DynamoDB
- **Hosting**: AWS S3, CloudFront
- **Authentication**: AWS Cognito
- **Domain**: Route 53

## 🌟 Key Features

### For Buyers
- Dynamic product storefront
- Live inventory updates
- Secure PayPal checkout
- Product search and filtering

### For Sellers
- Multi-seller support
- Product management dashboard
- Bulk product upload
- Sales analytics

## 🔧 Deployment Process

### Prerequisites
- AWS Account
- AWS CLI installed
- Domain registered w GoDaddy

### Step-by-Step Deployment

1. **Frontend Deployment**
   ```bash
   # Create S3 Bucket
   aws s3 mb s3://doombroom.com

   # Set Bucket Policy
   aws s3api put-bucket-policy --bucket doombroom.com --policy file://deployment/s3-bucket-policy.json

   # Upload Website Files
   aws s3 cp frontend/ s3://doombroom.com/ --recursive --acl public-read
   ```

2. **SSL & Domain Configuration**
   ```bash
   # Request SSL Certificate
   aws acm request-certificate \
       --domain-name doombroom.com \
       --validation-method DNS \
       --subject-alternative-names www.doombroom.com

   # Create Route 53 Hosted Zone
   aws route53 create-hosted-zone \
       --name doombroom.com \
       --caller-reference $(date +%s)
   ```

3. **CloudFront Distribution**
   ```bash
   # Create CloudFront Distribution
   aws cloudfront create-distribution \
       --origin-domain-name doombroom.com.s3.amazonaws.com \
       --default-root-object index.html \
       --viewer-certificate "{\"ACMCertificateArn\":\"arn:aws:acm:us-east-1:ACCOUNT_ID:certificate/CERT_ID\",\"SSLSupportMethod\":\"sni-only\"}"
   ```

4. **Backend Setup**
   ```bash
   # Create DynamoDB Table
   aws dynamodb create-table \
       --table-name doombroom.com_Products \
       --attribute-definitions AttributeName=item_id,AttributeType=S \
       --key-schema AttributeName=item_id,KeyType=HASH \
       --billing-mode PAY_PER_REQUEST

   # Deploy Lambda Functions
   cd backend/lambda-functions
   zip -r get-products.zip get-products.js
   aws lambda create-function \
       --function-name get-products \
       --runtime nodejs18.x \
       --role arn:aws:iam::YOUR_ACCOUNT_ID:role/DoombroomLambdaRole \
       --handler get-products.handler \
       --zip-file fileb://get-products.zip
   ```

## 📦 Project Structure
```
doombroom.com/
│── frontend/
│   ├── index.html
│   ├── products.js
│   └── styles.css
│── backend/
│   ├── lambda-functions/
│   │   └── get-products.js
│   └── dynamodb-schemas/
└── deployment/
    └── s3-bucket-policy.json
```

## 🔒 Security Features
- IAM Role-Based Access
- SSL Encryption
- CloudFront HTTPS Redirects
- Origin Access Identity (OAI)

## 🚧 Upcoming Features
- Enhanced PayPal Checkout
- Seller Dashboard Improvements
- Advanced Product Search
- Buyer-Seller Messaging System

## 📝 Troubleshooting
- Ensure AWS CLI is configured
- Verify IAM roles and permissions
- Check CloudFront and S3 configurations

## 📄 License
© 2025 Doombroom. All Rights Reserved.
# nashvillepizzaco.com
