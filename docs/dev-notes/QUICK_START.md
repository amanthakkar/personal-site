# Quick Start Guide

## The Problem
You were getting: "You are using Node.js 18.18.0. Vite requires Node.js version 20.19+ or 22.12+"

## The Solution

### Option 1: Use the Helper Script (Easiest)
```bash
./dev.sh
```

### Option 2: Manual (Every Time You Open a New Terminal)
```bash
source ~/.nvm/nvm.sh
nvm use
npm run dev
```

### Option 3: Restart Your Terminal
Just close and reopen your terminal - nvm should auto-load from `.bashrc` now.

## Verify It's Working
After running `npm run dev`, you should see:
```
VITE v7.2.4  ready in XXX ms
➜  Local:   http://localhost:5173/
```

## Access from Windows Chrome
1. Set up port forwarding in Windows PowerShell (as Admin):
   ```powershell
   netsh interface portproxy add v4tov4 listenport=5173 listenaddress=0.0.0.0 connectport=5173 connectaddress=172.23.148.171
   New-NetFirewallRule -DisplayName "WSL2 Vite Dev Server" -Direction Inbound -LocalPort 5173 -Protocol TCP -Action Allow
   ```

2. Open Chrome and go to: **http://localhost:5173**

## If WSL IP Changes
If port forwarding stops working, get your new WSL IP:
```bash
hostname -I | awk '{print $1}'
```
Then update the port forwarding command with the new IP.
