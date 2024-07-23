const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

// Middleware setup
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the root directory
app.use(express.static(path.join(__dirname)));

// Define a route for GET requests to the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'address.html'));
});

// Proxy route to handle requests and forward them
app.post('/proxy', async (req, res) => {
    try {
        const response = await axios.post('https://maps.gov.ge/map/portal/search', new URLSearchParams(req.body), {
            headers: {
                'Accept': '*/*',
                'Accept-Encoding': 'gzip, deflate, br, zstd',
                'Accept-Language': 'en-US,en;q=0.9',
                'Connection': 'keep-alive',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Cookie': 'apitoken=; TS0137a4bf=01e0cab1bff23d51a6f86c3a49abf2286003b9407da50dda35ac05ccac5ba8d96c6b6a34bcbca0b8eb420dc01d698578b41202d321433243263ec185df59f6fdadabad40de; apitoken=; TS0137a4bf=01e0cab1bff23d51a6f86c3a49abf2286003b9407da50dda35ac05ccac5ba8d96c6b6a34bcbca0b8eb420dc01d698578b41202d321433243263ec185df59f6fdadabad40de; PHPSESSID=89b3743c08427cc7b97d667249f1cc9c; TS019e7a9a=01e0cab1bf33ece317ce5ef67feab9531d781cf436a50dda35ac05ccac5ba8d96c6b6a34bc45e1b3fac20148f387375db5157b1d7dbf970226ef3c5d98ac6a3355aab76650; _ga_DZ14T204N0=GS1.1.1721228048.1.0.1721228048.0.0.0; _ga=GA1.1.1393691302.1721228048',
                'Host': 'maps.gov.ge',
                'Origin': 'https://maps.gov.ge',
                'Referer': 'https://maps.gov.ge/map/portal',
                'Sec-Fetch-Dest': 'empty',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Site': 'same-origin',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
                'X-Requested-With': 'XMLHttpRequest',
                'sec-ch-ua': '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Windows"'
            }
        });

        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

// Start the server
app.listen(port, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${port}/`);
});
