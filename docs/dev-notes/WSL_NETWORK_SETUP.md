# WSL2 Network Setup for Vite Dev Server

## The Problem
WSL2 uses NAT networking, so even with `--host`, the dev server isn't directly accessible from Windows Chrome.

## The Solution

### Step 1: Get Your WSL IP Address
Run this in WSL:
```bash
hostname -I | awk '{print $1}'
```
Your WSL IP is: **172.23.148.171**

### Step 2: Set Up Windows Port Forwarding
Open **Windows PowerShell as Administrator** and run:

```powershell
# Get WSL IP (or use the one above)
$wslIp = (wsl hostname -I).Trim().Split()[0]

# Add port forwarding rule
netsh interface portproxy add v4tov4 listenport=5173 listenaddress=0.0.0.0 connectport=5173 connectaddress=$wslIp

# Verify it was added
netsh interface portproxy show all
```

### Step 3: Open Windows Firewall Port
In PowerShell (as Administrator):
```powershell
# Allow inbound traffic on port 5173
New-NetFirewallRule -DisplayName "WSL2 Vite Dev Server" -Direction Inbound -LocalPort 5173 -Protocol TCP -Action Allow
```

### Step 4: Run Vite with --host
In WSL:
```bash
npm run dev
```

The `--host` flag is already in your package.json, so it should work automatically.

### Step 5: Access from Windows Chrome
Open Chrome on Windows and go to:
- **http://localhost:5173**

## Remove Port Forwarding (if needed)
```powershell
netsh interface portproxy delete v4tov4 listenport=5173 listenaddress=0.0.0.0
```

## Troubleshooting
- If it still doesn't work, check Windows Firewall settings
- Make sure you're running PowerShell as Administrator
- Verify the WSL IP hasn't changed (it can change on WSL restart)
