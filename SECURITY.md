# Security Policy

## Supported Versions

We actively support the following versions of ShopWise with security updates:

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

We take security vulnerabilities seriously. If you discover a security vulnerability within ShopWise, please follow these steps:

### 🔒 Private Disclosure Preferred

**Please do NOT create a public GitHub issue for security vulnerabilities.**

Instead, please report security vulnerabilities through one of the following channels:

1. **Email**: Send details to `security@shopwise.dev`
2. **GitHub Security Advisory**: Use GitHub's private vulnerability reporting feature
3. **Encrypted Communication**: For sensitive reports, request our PGP key

### 📋 What to Include

When reporting a vulnerability, please include:

- **Description**: Clear description of the vulnerability
- **Steps to Reproduce**: Detailed steps to reproduce the issue
- **Impact Assessment**: Your assessment of the potential impact
- **Proof of Concept**: If available, a minimal proof of concept
- **Suggested Fix**: If you have ideas for fixing the issue
- **Your Contact Info**: How we can reach you for follow-up

### ⏱️ Response Timeline

We are committed to responding to security reports promptly:

- **Initial Response**: Within 24 hours
- **Confirmation**: Within 72 hours
- **Status Updates**: Every 7 days until resolved
- **Resolution**: Target within 90 days for critical issues

### 🎯 Scope

This security policy applies to:

- ✅ ShopWise Backend API (`/backend`)
- ✅ ShopWise Frontend (`/frontend`)
- ✅ Authentication & Authorization systems
- ✅ AI/ML integrations (Gemini API usage)
- ✅ Database interactions
- ✅ Third-party integrations

### 🚫 Out of Scope

The following are generally considered out of scope:

- ❌ Social engineering attacks
- ❌ Physical attacks against our infrastructure
- ❌ Attacks requiring physical access to user devices
- ❌ Issues in third-party dependencies (report to respective projects)
- ❌ Vulnerabilities requiring unlikely user interaction

### 🏆 Recognition

We believe in recognizing security researchers who help us maintain a secure platform:

- **Hall of Fame**: Public recognition (with your permission)
- **Acknowledgment**: Credit in release notes
- **Swag**: ShopWise branded merchandise for significant findings

### 🛠️ Security Best Practices

For developers contributing to ShopWise:

1. **Code Review**: All code must be reviewed before merging
2. **Dependency Updates**: Regularly update dependencies
3. **Static Analysis**: Use automated security scanning tools
4. **Authentication**: Implement proper authentication and authorization
5. **Input Validation**: Validate and sanitize all user inputs
6. **Error Handling**: Don't expose sensitive information in errors
7. **Logging**: Log security-relevant events appropriately

### 📚 Additional Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [CWE/SANS Top 25](https://cwe.mitre.org/top25/archive/2023/2023_top25_list.html)
- [GitHub Security Lab](https://securitylab.github.com/)

---

**Thank you for helping keep ShopWise secure!** 🛡️