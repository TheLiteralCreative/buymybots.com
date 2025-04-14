
# 🚀 Deploying a Static Website Using AWS S3 + CloudFront + ACM + GoDaddy DNS + GitHub Integration

This document outlines a **project-agnostic deployment process** for launching a static website using:

- Amazon S3 (for hosting)
- CloudFront (for secure CDN & HTTPS delivery)
- ACM (SSL certificates)
- GoDaddy (for DNS management)
- GitHub (for version control and collaboration)

Each section includes:
- Web console instructions (for UI-based setup)
- CLI commands (when applicable)
- **Testing checkpoints** ✅

---

## 🗂️ Step 1: Prepare Local Folder Structure

1. Create a new folder on your machine:

```bash
mkdir ~/Documents/YourProjectName
cd ~/Documents/YourProjectName
```

2. Add your static files (e.g., `index.html`, `scripts.js`, `styles.css`, etc.)

3. Confirm contents:
```bash
ls
```

✅ **Checkpoint:** Local folder is prepared with all required static assets.

---

## 🔁 Step 2: Initialize Git and Push to GitHub

# Step into your project folder (if not already there)
cd ~/Documents/AWS_A3-Builds-in-Process/Project

### CLI:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
git branch -M main
git push -u origin main
```

✅ **Checkpoint:** GitHub repository is populated with your project files.

---

## 🪣 Step 3: Create S3 Bucket

### Console Instructions:
1. Go to **S3 > Create bucket**
2. Bucket name: `yourdomain.com`
3. Region: `us-east-2`
4. Uncheck "Block all public access" (for initial testing only — will secure with CloudFront OAC later)
5. Disable versioning & encryption (unless needed)
6. Create bucket

### CLI:
```bash
aws s3api create-bucket \
  --bucket yourdomain.com \
  --region us-east-2 \
  --create-bucket-configuration LocationConstraint=us-east-2
```

✅ **Checkpoint:** Bucket is created and visible in S3 console.

---

## 📤 Step 4: Upload Website Files to S3

### CLI:
```bash
cd ~/Documents/YourProjectName
aws s3 sync . s3://yourdomain.com --region us-east-2 --delete --acl bucket-owner-full-control
```

✅ **Checkpoint:** Files appear in S3 bucket root under `Objects` tab.

---

## 📄 Step 5: Enable Static Website Hosting (For Preview Only)

### Console:
1. Open S3 > `yourdomain.com` > Properties
2. Scroll to "Static website hosting"
3. Enable it:
   - Hosting type: `Host a static website`
   - Index document: `index.html`
4. Note the website endpoint: `http://yourdomain.com.s3-website-us-east-2.amazonaws.com`

✅ **Checkpoint:** Open the URL in browser and confirm `index.html` loads (non-HTTPS, used only for testing).

---

## 🔒 Step 6: Request SSL Certificate via ACM

### Console:
1. Go to **ACM > Request Certificate (in us-east-1)**
2. Choose: **Request a public certificate**
3. Add:
   - `yourdomain.com`
   - `www.yourdomain.com`
4. Choose DNS validation
5. Confirm and request
6. Copy the CNAME records shown (for use in GoDaddy)

✅ **Checkpoint:** ACM certificate enters `PENDING_VALIDATION` status.

---

## 🌐 Step 7: Add DNS Validation Records in GoDaddy

### Console (GoDaddy DNS):
1. Go to DNS > `yourdomain.com`
2. Add **two CNAME records** from ACM:
   - Name: `_xyz.yourdomain.com` → Value: `_acm-validations.aws`
   - Repeat for both domains

✅ **Checkpoint:** Within 10 minutes, ACM cert status becomes **ISSUED**.

---

## 🌩️ Step 8: Create CloudFront Distribution

### Console:
1. Go to **CloudFront > Create Distribution**
2. Origin domain: `yourdomain.com.s3.us-east-2.amazonaws.com` (REST endpoint)
3. Viewer protocol policy: `Redirect HTTP to HTTPS`
4. Alternate domain names:
   - `yourdomain.com`
   - `www.yourdomain.com`
5. SSL certificate: Select the one created in ACM
6. Enable OAC:
   - Choose `Origin access control settings (recommended)`
   - Create new OAC: `OAC-YourProjectName`
7. Default root object: `index.html`
8. Save and deploy

✅ **Checkpoint:** Distribution status becomes **Deployed** and shows as **Enabled**

---

## 🔐 Step 9: Add OAC Bucket Policy to S3

### Console:
Go to S3 > `yourdomain.com` > Permissions > Bucket Policy

Paste the following:
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowCloudFrontOACAccess",
      "Effect": "Allow",
      "Principal": {
        "Service": "cloudfront.amazonaws.com"
      },
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::yourdomain.com/*",
      "Condition": {
        "StringEquals": {
          "AWS:SourceArn": "arn:aws:cloudfront::ACCOUNT_ID:distribution/YOUR_DISTRIBUTION_ID"
        }
      }
    }
  ]
}
```

✅ **Checkpoint:** `https://www.yourdomain.com` securely serves `index.html`

---

## 🌍 Step 10: Assign DNS in GoDaddy

### Console (GoDaddy DNS):

1. Set `www` record:
   - Type: CNAME
   - Name: `www`
   - Value: `your-cloudfront-distribution.cloudfront.net`

2. Set apex (`@`) record:
   - If CNAME not supported → **Forward to `www`**
   - Type: Permanent (301), forward only

✅ **Checkpoint:**
- `https://www.yourdomain.com` loads your site
- `https://yourdomain.com` cleanly redirects

---

## 🔁 Final Testing

- [ ] `https://www.yourdomain.com` loads ✅
- [ ] `https://yourdomain.com` redirects ✅
- [ ] All assets (JS/CSS) load without error ✅
- [ ] DNS resolves from multiple networks ✅

---

## 🧩 Optional: Clean-Up

- [ ] Disable public access on bucket (now protected via OAC)
- [ ] Set bucket block public access settings back to ON
- [ ] Set long TTL caching rules in CloudFront for production
- [ ] Add logging if needed

---

**You're now fully deployed.**

Your project is secure, versioned, integrated with GitHub, and scalable via AWS.
