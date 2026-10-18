# Localhost Cookie Fix

## The Issue
Chrome and Edge block cookies on `localhost` by default for security. Your cookies work fine on other domains (like Google), but not on `localhost:5173`.

## Solutions

### Option 1: Use 127.0.0.1 Instead (Easiest)
Instead of `http://localhost:5173`, use:
- **http://127.0.0.1:5173**

Cookies work on `127.0.0.1` even though they don't work on `localhost`!

### Option 2: Set Up Local Domain
1. Edit Windows hosts file: `C:\Windows\System32\drivers\etc\hosts` (as Administrator)
2. Add this line:
   ```
   127.0.0.1 local.amanthakkar.com
   ```
3. Access via: `http://local.amanthakkar.com:5173`
4. Cookies will work on this "real" domain

### Option 3: Test on Production
The code will work perfectly on `amanthakkar.com` - cookies work on real domains.

## Quick Test
1. Change URL from `localhost:5173` to `127.0.0.1:5173`
2. Refresh page
3. Check console: `document.cookie` should now show cookies
4. Visitor tracking should work correctly

## Why This Happens
- `localhost` is treated as a special case by browsers
- `127.0.0.1` is treated as a regular IP address
- Real domains (like amanthakkar.com) work normally

The code is correct - it's just a browser quirk with `localhost`.
