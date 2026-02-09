const https = require('https');

const url = 'https://petshack.au/';

https.get(url, (res) => {
    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });
    res.on('end', () => {
        const urls = [];

        // Simple regex to find potential image URLs
        const imgRegex = /src="([^"]+\.(?:png|svg|jpg|webp|jpeg|ico))"/gi;
        const hrefRegex = /href="([^"]+\.(?:png|svg|jpg|webp|jpeg|ico))"/gi;
        const styleRegex = /url\(['"]?([^'"]+\.(?:png|svg|jpg|webp|jpeg|ico))['"]?\)/gi;

        let match;
        while ((match = imgRegex.exec(data)) !== null) {
            urls.push(match[1]);
        }
        while ((match = hrefRegex.exec(data)) !== null) {
            urls.push(match[1]);
        }
        while ((match = styleRegex.exec(data)) !== null) {
            urls.push(match[1]);
        }

        const uniqueUrls = [...new Set(urls)];
        console.log(JSON.stringify(uniqueUrls, null, 2));
    });
}).on('error', (err) => {
    console.error('Error: ' + err.message);
});
