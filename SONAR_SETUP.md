# SonarQube Setup for AI Travelling Planner

This document explains how to set up SonarQube analysis for the AI Travelling Planner project.

## Option 1: SonarCloud (Recommended)

SonarCloud is free for public repositories and provides hosted SonarQube analysis.

### Setup Steps:

1. **Sign up for SonarCloud**

   - Go to [sonarcloud.io](https://sonarcloud.io)
   - Sign in with your GitHub account
   - Import your `AI-Travelling-Planner` repository

2. **Install SonarQube Scanner**

   ```powershell
   npm install -g sonarqube-scanner
   ```

3. **Get your SonarCloud token**

   - In SonarCloud, go to Account → Security
   - Generate a new token
   - Copy the token

4. **Set environment variable**

   ```powershell
   $env:SONAR_TOKEN="your-sonarcloud-token-here"
   ```

5. **Run analysis**
   ```powershell
   npm run sonar
   ```

### GitHub Actions Integration

Add this to `.github/workflows/sonar.yml`:

```yaml
name: SonarCloud Analysis
on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  sonarcloud:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0
      - name: SonarCloud Scan
        uses: sonarcloud-github-action@master
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
```

## Option 2: Local SonarQube Server

### Prerequisites:

- Java 17+ installed
- Docker (optional but recommended)

### Setup Steps:

1. **Start SonarQube server using Docker**

   ```powershell
   docker run -d --name sonarqube -p 9000:9000 sonarqube:latest
   ```

   Or download and run locally:

   - Download SonarQube Community Edition
   - Extract and run `bin/windows-x86-64/StartSonar.bat`

2. **Access SonarQube**

   - Open http://localhost:9000
   - Default login: admin/admin
   - Change password when prompted

3. **Create project**

   - Click "Create Project"
   - Choose "Manually"
   - Set project key: `ai-travelling-planner`
   - Generate token

4. **Install SonarQube Scanner**

   ```powershell
   npm install -g sonarqube-scanner
   ```

5. **Set environment variable**

   ```powershell
   $env:SONAR_TOKEN="your-local-sonar-token"
   ```

6. **Run local analysis**
   ```powershell
   npm run sonar:local
   ```

## Option 3: IDE Integration

### VS Code Extension

1. Install "SonarLint" extension
2. Connect to SonarCloud or local SonarQube
3. Get real-time code quality feedback

## Available Scripts

- `npm run sonar` - Run SonarCloud analysis
- `npm run sonar:local` - Run local SonarQube analysis
- `npm run lint:all` - Run ESLint on client and server
- `npm run install:all` - Install dependencies for both client and server

## Code Quality Improvements

To get better analysis results, consider adding:

1. **Unit Tests**

   - Add Jest for server-side testing
   - Add React Testing Library for client-side testing

2. **Test Coverage**

   - Configure coverage reports
   - Update sonar-project.properties with coverage paths

3. **ESLint Configuration**
   - Server already has ESLint via client
   - Consider adding server-specific ESLint config

## Files Created

- `sonar-project.properties` - SonarCloud configuration
- `sonar-project-local.properties` - Local SonarQube configuration
- `package.json` - Root package.json with sonar scripts
- Updated client and server package.json with sonar scripts

## Next Steps

1. Choose your preferred analysis method (SonarCloud recommended)
2. Follow the setup steps above
3. Run your first analysis
4. Review the quality report
5. Fix identified issues
6. Set up automated analysis (GitHub Actions for SonarCloud)

## Quality Gates

SonarQube will check for:

- Bugs and vulnerabilities
- Code smells
- Security hotspots
- Code coverage (when tests are added)
- Code duplication
- Maintainability rating
