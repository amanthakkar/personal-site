# Hot Reload Not Working? Try These:

## Quick Fixes:

1. **Hard Refresh Browser**: 
   - Windows: `Ctrl + Shift + R` or `Ctrl + F5`
   - This clears cache and forces reload

2. **Check Browser Console**:
   - Open DevTools (F12)
   - Look for WebSocket connection errors
   - Check if HMR is connecting

3. **Restart Dev Server**:
   ```bash
   # Kill existing server
   pkill -f vite
   
   # Restart
   ./dev.sh
   # or
   source ~/.nvm/nvm.sh && nvm use && npm run dev
   ```

4. **Clear Browser Cache**:
   - Chrome: Settings → Privacy → Clear browsing data → Cached images and files

5. **Check Network Tab**:
   - Open DevTools → Network tab
   - Look for failed requests (red)
   - Check if `/@vite/client` is loading

## If Still Not Working:

The dev server might need to be restarted. Vite's HMR should work automatically, but sometimes a restart helps.
