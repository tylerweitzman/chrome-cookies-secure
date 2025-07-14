const chrome = require('./index');

console.log('Testing Edge Instagram cookie extraction...\n');

// Test extracting Instagram cookies from Edge
chrome.getCookies('https://www.instagram.com/', 'object', function(err, cookies) {
    if (err) {
        console.error('Error extracting cookies:', err.message);
        console.error('\nPossible issues:');
        console.error('1. Microsoft Edge is not installed');
        console.error('2. You haven\'t visited Instagram in Edge');
        console.error('3. Edge is currently running (try closing it)');
        console.error('4. Permission issues accessing Edge\'s cookie database');
        return;
    }

    if (Object.keys(cookies).length === 0) {
        console.log('No Instagram cookies found in Edge.');
        console.log('Make sure you have visited Instagram.com in Microsoft Edge and are logged in.');
        return;
    }

    console.log('Instagram cookies found in Edge:');
    console.log('=====================================');
    
    Object.entries(cookies).forEach(([name, value]) => {
        // Show first few characters of the value for security
        const displayValue = value.length > 20 ? value.substring(0, 20) + '...' : value;
        console.log(`${name}: ${displayValue}`);
    });
    
    console.log(`\nTotal cookies found: ${Object.keys(cookies).length}`);
    
    // Also test in puppeteer format which shows more details
    console.log('\n\nTesting puppeteer format...');
    chrome.getCookies('https://www.instagram.com/', 'puppeteer', function(err, puppeteerCookies) {
        if (err) {
            console.error('Error with puppeteer format:', err.message);
            return;
        }
        
        console.log('\nPuppeteer format cookies (showing first 2):');
        console.log('==========================================');
        puppeteerCookies.slice(0, 2).forEach((cookie, index) => {
            console.log(`Cookie ${index + 1}:`);
            console.log(`  Name: ${cookie.name}`);
            console.log(`  Value: ${cookie.value.substring(0, 20)}...`);
            console.log(`  Domain: ${cookie.domain}`);
            console.log(`  Path: ${cookie.path}`);
            console.log(`  Secure: ${cookie.Secure}`);
            console.log(`  HttpOnly: ${cookie.HttpOnly}`);
            console.log('');
        });
    }, 'Default', 'edge');
    
}, 'Default', 'edge'); 