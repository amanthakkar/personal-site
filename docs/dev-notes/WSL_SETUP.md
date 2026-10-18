# WSL Setup Instructions for Building

If you're experiencing Windows build issues with esbuild, using WSL (Windows Subsystem for Linux) will solve the problem since it runs a Linux environment.

## Prerequisites

1. **Check if WSL is installed:**
   ```powershell
   wsl --list --verbose
   ```

2. **If WSL is not installed, install it:**
   ```powershell
   wsl --install
   ```
   This will install Ubuntu by default. Restart your computer when prompted.

## Setup Steps

### 1. Open WSL Terminal
- Press `Win + R`, type `wsl`, and press Enter
- Or open Ubuntu from Start Menu
- Or use Windows Terminal and select Ubuntu

### 2. Navigate to Your Project
```bash
cd /mnt/c/Users/amanb/Development/PersonalSite/personal-site
```

### 3. Install Node.js (if not already installed)
```bash
# Check if node is installed
node --version

# If not, install using nvm (recommended)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install 18  # or whatever version you need
nvm use 18
```

### 4. Install Dependencies
```bash
npm install
```

### 5. Build the Project
```bash
npm run build
```

This should work without the Windows permission errors!

### 6. Run Dev Server
```bash
npm run dev
```

## Tips

- **File Access**: WSL can access Windows files at `/mnt/c/...`
- **Git**: Git works the same in WSL
- **VS Code**: You can use `code .` in WSL to open VS Code with WSL integration
- **Performance**: WSL2 is faster than WSL1. Check your version with `wsl --list --verbose`

## Alternative: Use GitHub Actions

Since GitHub Actions runs on Linux, your builds will work there automatically. You can:
1. Push your code to GitHub
2. Let GitHub Actions build and deploy
3. Use `npm run dev` locally for development (which works fine on Windows)

This way you don't need WSL if you're comfortable with GitHub Actions handling builds.
