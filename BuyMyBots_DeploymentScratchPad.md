
# 📋 Project Deployment Scratch Pad: Static Site on AWS

Use this file to track **project-specific variables** needed for deploying a static website using the agnostic deployment guide.

---

## 🌐 Domain Information

- **Primary Domain Name (Apex)**:
  - Example: `myprojectsite.com`

- **Subdomain(s)**:
  - Example: `www.myprojectsite.com`

---

## 🪣 S3 Bucket Configuration

- **S3 Bucket Name**:
  - Must match your apex domain exactly: `myprojectsite.com`

- **AWS Region**:
  - Example: `us-east-2`

---

## 🔐 SSL Certificate (ACM)

- **Requested Certificate Domains**:
  - [ ] `myprojectsite.com`
  - [ ] `www.myprojectsite.com`

- **ACM Certificate ARN**:
  - `arn:aws:acm:us-east-1:xxxxxxxxxxxx:certificate/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`

- **ACM Status**:
  - [ ] Pending Validation
  - [ ] Issued

---

## 🧩 DNS Records (GoDaddy or Route 53)

### ACM Validation (CNAME)
- `_acm-valid_xxxxxx.myprojectsite.com` → `_validation.aws`

### Site Routing
- `@` A record or Forwarding Rule → `www.myprojectsite.com`
- `www` CNAME → `xxxxxxxxxxxxxx.cloudfront.net`

---

## 🌩️ CloudFront Distribution

- **Distribution ID**:
  - Example: `E123ABC456XYZ`

- **Domain Names (CNAMEs)**:
  - [ ] `myprojectsite.com`
  - [ ] `www.myprojectsite.com`

- **CloudFront URL**:
  - `https://dXXXXXXXXXX.cloudfront.net`

- **OAC Config Name**:
  - Example: `OAC-MyProjectSite`

---

## 🔐 S3 Bucket Policy

Paste or reference the policy used (after replacing `yourdomain.com` and `distribution ID`):

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
      "Resource": "arn:aws:s3:::myprojectsite.com/*",
      "Condition": {
        "StringEquals": {
          "AWS:SourceArn": "arn:aws:cloudfront::123456789012:distribution/E123ABC456XYZ"
        }
      }
    }
  ]
}
```

---

## 💻 GitHub

- **Repo URL**:  
  `https://github.com/YOUR_USERNAME/YOUR_REPOSITORY`

- **Git Status**:
  - [ ] Repo initialized
  - [ ] Connected and pushed
  - [ ] Linked in README / footer

---

## 🧪 Final Testing Notes

- [ ] `https://www.myprojectsite.com` loads successfully
- [ ] Redirects from `http://` and apex domain work
- [ ] SSL valid for all domains
- [ ] JS/CSS files render without error
- [ ] CLI deploy succeeded

---

Use this scratch pad alongside the main `.md` guide to stay organized while launching new projects.
