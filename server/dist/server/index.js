"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable prefer-const */
/* eslint-disable no-shadow */
/* eslint-disable no-bitwise */
/* eslint-disable no-plusplus */
/* eslint-disable no-plusplus */
/* eslint-disable no-bitwise */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-expressions */
/* eslint-disable camelcase */
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const rotating_file_stream_1 = require("rotating-file-stream");
// eslint-disable-next-line import/no-relative-packages
const serverConfig_1 = __importDefault(require("./config/serverConfig"));
const proxy_controllers_1 = require("./proxy_controllers");
const winston_1 = __importDefault(require("./config/winston"));
const app = (0, express_1.default)();
const { port } = serverConfig_1.default;
const serverUrl = serverConfig_1.default.base_site_url;
app.use((0, cors_1.default)());
// Morgan Logger Configuration
app.use((0, morgan_1.default)('combined'));
const rfsStream = (0, rotating_file_stream_1.createStream)('./logs/access.log', {
    size: '10M',
    compress: 'gzip', // compress rotated files
});
app.use((0, morgan_1.default)('common', {
    stream: rfsStream,
}));
// Proxy Middlewares
// app.use(SERVICE_IDENTIFIER.WALLET, walletProxy());
app.use('/events', () => {
    (0, proxy_controllers_1.notificationProxy)();
});
// Body parsing
app.use(express_1.default.json({ limit: '50mb' }));
app.use(express_1.default.urlencoded({ extended: true }));
app.get('/orders/manifest.json', (req, res) => {
    res.status(200).json({
        name: 'COT TATA 1MG',
        short_name: 'TATA 1MG',
        lang: 'en-IN',
        background_color: '#FFF3E3',
        theme_color: '#FFF3E3',
        display: 'standalone',
        start_url: '/orders/creation',
        orientation: 'portrait-primary',
        icons: [
            {
                src: `https://onemg.gumlet.io/vvlzmvp9d1jnhrs43ki6.png`,
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: `https://onemg.gumlet.io/vvlzmvp9d1jnhrs43ki6.png`,
                sizes: '192x192',
                type: 'image/png',
                purpose: 'maskable',
            },
            {
                src: `https://onemg.gumlet.io/w_512,h_512/srhvucvbhdu17jr6kntv.png`,
                sizes: '512x512',
                type: 'image/png',
            },
            {
                src: `https://onemg.gumlet.io/w_512,h_512/srhvucvbhdu17jr6kntv.png`,
                sizes: '512x512',
                type: 'image/png',
                purpose: 'maskable',
            },
        ],
        prefer_related_applications: false,
    });
    res.end();
});
/**
 * Login endpoint used for handling user/pass based login
 * @param  {Request} Http Request
 * @param  {Response} Http Response
 */
/**
 * Logout endpoint used for logging out 1mg user
 * @param  {Request} Http Request
 * @param  {Response} Http Response
 */
/**
 * Information endpoint to fetch User Information as a json
 * @param  {Request} Http Request
 * @param  {Response} Http Response
 */
/**
 * Google Login endpoint used for handling authorization code flow
 * @param  {Request} Http Request
 * @param  {Response} Http Response
 */
// ******************************* Start of no inspiration zone ************************************** //
// Taking any inspiration from the code below is strictly prohibited
// Some packages used from here onwards are already deprecated or are not being maintained for more than
// 5 years. Some of us might have to work on the below code as there might be no escape for the time being, but
// please consider this as your duty to get this cleaned up and please write all the logic above this comment
// SAVDHAAN RAHE, SATARK RAHE AUR KRIPIYA ISKA ISTAMAL KARNE KI KOSIS NA KARE
const rp = require('request-promise');
/**
 * Create Labs API request
 * @param  {Request} Http Request
 * @param  {Response} Http Response
 */
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
// Use a lookup table to find the index.
const lookup = typeof Uint8Array === 'undefined' ? [] : new Uint8Array(256);
for (let i = 0; i < chars.length; i++) {
    lookup[chars.charCodeAt(i)] = i;
}
const decode = (base64) => {
    let bufferLength = base64.length * 0.75;
    const len = base64.length;
    let i;
    let p = 0;
    let encoded1;
    let encoded2;
    let encoded3;
    let encoded4;
    if (base64[base64.length - 1] === '=') {
        bufferLength--;
        if (base64[base64.length - 2] === '=') {
            bufferLength--;
        }
    }
    const arraybuffer = new ArrayBuffer(bufferLength);
    const bytes = new Uint8Array(arraybuffer);
    for (i = 0; i < len; i += 4) {
        encoded1 = lookup[base64.charCodeAt(i)];
        encoded2 = lookup[base64.charCodeAt(i + 1)];
        encoded3 = lookup[base64.charCodeAt(i + 2)];
        encoded4 = lookup[base64.charCodeAt(i + 3)];
        bytes[p++] = (encoded1 << 2) | (encoded2 >> 4);
        bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2);
        bytes[p++] = ((encoded3 & 3) << 6) | (encoded4 & 63);
    }
    return arraybuffer;
};
// ******************************* End of no inspiration zone ************************************** //
/**
 * Health Check
 * @param  {Request} Http Request
 * @param  {Response} Http Response
 */
if (serverConfig_1.default.env === 'prod') {
    // Serve React static builds using the node server, only works if `prod` is supplied in the config
    app.use('/communication', express_1.default.static(path_1.default.join(__dirname, '/../../communication/build')));
    app.use('/payment', express_1.default.static(path_1.default.join(__dirname, '/../../payment/build')));
    app.use('/pricing', express_1.default.static(path_1.default.join(__dirname, '/../../pricing/build')));
    //   app.use(
    //     '/user-management',
    //     express.static(path.join(__dirname, '/../../user/build'))
    //   );
    app.use('/diagnostics', express_1.default.static(path_1.default.join(__dirname, '/../../labs/build')));
    app.use('/dmg', express_1.default.static(path_1.default.join(__dirname, '/../../dmg/build')));
    app.use('/orders', express_1.default.static(path_1.default.join(__dirname, '/../../orders/build')));
    app.use('/vendor-hub', express_1.default.static(path_1.default.join(__dirname, '/../../vendor_hub/build')));
    app.use('/healthrecords', express_1.default.static(path_1.default.join(__dirname, '/../../healthrecords/build')));
    app.use(express_1.default.static(path_1.default.join(__dirname, '/../../platform/build')));
    app.use('/onboarding', express_1.default.static(path_1.default.join(__dirname, '/../../onboarding/build')));
    // These are necessary for routing within react
    app.get('/communication/*', (req, res) => {
        res.sendFile(path_1.default.join(`${__dirname}/../../communication/build/index.html`));
    });
    app.get('/payment/*', (req, res) => {
        res.sendFile(path_1.default.join(`${__dirname}/../../payment/build/index.html`));
    });
    app.get('/pricing/*', (req, res) => {
        res.sendFile(path_1.default.join(`${__dirname}/../../pricing/build/index.html`));
    });
    app.get('/dmg/*', (req, res) => {
        res.sendFile(path_1.default.join(`${__dirname}/../../dmg/build/index.html`));
    });
    app.get('/orders/*', (req, res) => {
        res.sendFile(path_1.default.join(`${__dirname}/../../orders/build/index.html`));
    });
    app.get('/vendor-hub/*', (req, res) => {
        res.sendFile(path_1.default.join(`${__dirname}/../../vendor_hub/build/index.html`));
    });
    //   app.get('/user-management/*', (req, res) => {
    //     res.sendFile(path.join(`${__dirname}/../../user/build/index.html`));
    //   });
    app.get('/diagnostics/*', (req, res) => {
        res.sendFile(path_1.default.join(`${__dirname}/../../labs/build/index.html`));
    });
    app.get('/onboarding/*', (req, res) => {
        res.sendFile(path_1.default.join(`${__dirname}/../../onboarding/build/index.html`));
    });
    app.get('/healthrecords/*', (req, res) => {
        res.sendFile(path_1.default.join(`${__dirname}/../../healthrecords/build/index.html`));
    });
    app.get('/*', (req, res) => {
        res.sendFile(path_1.default.join(`${__dirname}/../../platform/build/index.html`));
    });
}
// eslint-disable-next-line no-console
console.log('Test log 1');
// eslint-disable-next-line no-console
console.log('Test log 2');
try {
    app.listen(port, serverUrl, () => {
        const runServerURl = `http://${serverUrl}:${port}`;
        // eslint-disable-next-line no-console
        console.log(`Connected successfully on port ${runServerURl}`);
    });
}
catch (error) {
    winston_1.default.error(`Error occured: ${error}`);
}
