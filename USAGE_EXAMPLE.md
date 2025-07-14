# edge-cookies-secure Usage Example

## Installation

```bash
npm install edge-cookies-secure
```

## Basic Usage

### Extract Chrome Cookies
```javascript
const cookies = require('edge-cookies-secure');

// Get cookies from Chrome (default browser)
cookies.getCookies('https://www.instagram.com/', function(err, cookies) {
    if (err) {
        console.error('Error:', err);
        return;
    }
    console.log('Chrome cookies:', cookies);
});
```

### Extract Edge Cookies
```javascript
const cookies = require('edge-cookies-secure');

// Get cookies from Microsoft Edge
cookies.getCookies('https://www.instagram.com/', function(err, cookies) {
    if (err) {
        console.error('Error:', err);
        return;
    }
    console.log('Edge cookies:', cookies);
}, 'Default', 'edge');
```

### Using with Promises (async/await)
```javascript
const cookies = require('edge-cookies-secure');

async function getCookies() {
    try {
        // Get Chrome cookies
        const chromeCookies = await cookies.getCookiesPromised('https://www.instagram.com/');
        
        // Get Edge cookies  
        const edgeCookies = await cookies.getCookiesPromised('https://www.instagram.com/', 'object', 'Default', 'edge');
        
        console.log('Chrome cookies:', Object.keys(chromeCookies).length);
        console.log('Edge cookies:', Object.keys(edgeCookies).length);
    } catch (error) {
        console.error('Error:', error);
    }
}

getCookies();
```

### Different Output Formats
```javascript
const cookies = require('edge-cookies-secure');

// Puppeteer format (for use with Puppeteer)
const puppeteerCookies = await cookies.getCookiesPromised('https://www.instagram.com/', 'puppeteer', 'Default', 'edge');

// Cookie header format (for HTTP requests)
const cookieHeader = await cookies.getCookiesPromised('https://www.instagram.com/', 'header', 'Default', 'edge');

// cURL format (for wget/curl commands)
const curlFormat = await cookies.getCookiesPromised('https://www.instagram.com/', 'curl', 'Default', 'edge');
```

## Browser Support

- **Google Chrome**: `browser` parameter = `'chrome'` (default)
- **Microsoft Edge**: `browser` parameter = `'edge'`

Both browsers are supported on Windows, macOS, and Linux. 