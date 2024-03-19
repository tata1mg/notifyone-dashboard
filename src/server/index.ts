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
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import * as jwt from 'jsonwebtoken';

import path from 'path';
import { createStream } from 'rotating-file-stream';
import { requestInstance } from './utility/request';
import { SERVICE_IDENTIFIER } from './lib/service_path_identifier';
import { jwtTokenPayload, AuthCustomRequest } from './utility/types';
// eslint-disable-next-line import/no-relative-packages
import config from './config/serverConfig';
import { tokenExtractor } from './utility/middleware';
import { notificationProxy } from './proxy_controllers';
import logger from './config/winston';
import {
  JWT_EXPIRED_ERROR,
  JWT_EXPIRE_TIME,
  BEARER_TOKEN,
  INSUFFICIENT_ROLES,
} from './utility/constants';

const app: Application = express();
const { port } = config;
const serverUrl = config.base_site_url;

app.use(cors());

// Morgan Logger Configuration
app.use(morgan('combined'));

const rfsStream = createStream('./logs/access.log', {
  size: '10M', // rotate every 10 MegaBytes written
  compress: 'gzip', // compress rotated files
});

app.use(
  morgan('common', {
    stream: rfsStream,
  })
);

// Proxy Middlewares
// app.use(SERVICE_IDENTIFIER.WALLET, walletProxy());
app.use('/events', () => {
  notificationProxy();
});

// Body parsing
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));
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

const chars =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

// Use a lookup table to find the index.
const lookup = typeof Uint8Array === 'undefined' ? [] : new Uint8Array(256);
for (let i = 0; i < chars.length; i++) {
  lookup[chars.charCodeAt(i)] = i;
}

const decode = (base64: string): ArrayBuffer => {
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

if (config.env === 'prod') {
  // Serve React static builds using the node server, only works if `prod` is supplied in the config
  app.use(
    '/communication',
    express.static(path.join(__dirname, '/../../communication/build'))
  );
  app.use(
    '/payment',
    express.static(path.join(__dirname, '/../../payment/build'))
  );
  app.use(
    '/pricing',
    express.static(path.join(__dirname, '/../../pricing/build'))
  );

  //   app.use(
  //     '/user-management',
  //     express.static(path.join(__dirname, '/../../user/build'))
  //   );

  app.use(
    '/diagnostics',
    express.static(path.join(__dirname, '/../../labs/build'))
  );

  app.use('/dmg', express.static(path.join(__dirname, '/../../dmg/build')));
  app.use(
    '/orders',
    express.static(path.join(__dirname, '/../../orders/build'))
  );

  app.use(
    '/vendor-hub',
    express.static(path.join(__dirname, '/../../vendor_hub/build'))
  );
  app.use(
    '/healthrecords',
    express.static(path.join(__dirname, '/../../healthrecords/build'))
  );

  app.use(express.static(path.join(__dirname, '/../../platform/build')));

  app.use(
    '/onboarding',
    express.static(path.join(__dirname, '/../../onboarding/build'))
  );

  // These are necessary for routing within react
  app.get('/communication/*', (req, res) => {
    res.sendFile(
      path.join(`${__dirname}/../../communication/build/index.html`)
    );
  });

  app.get('/payment/*', (req, res) => {
    res.sendFile(path.join(`${__dirname}/../../payment/build/index.html`));
  });

  app.get('/pricing/*', (req, res) => {
    res.sendFile(path.join(`${__dirname}/../../pricing/build/index.html`));
  });

  app.get('/dmg/*', (req, res) => {
    res.sendFile(path.join(`${__dirname}/../../dmg/build/index.html`));
  });
  app.get('/orders/*', (req, res) => {
    res.sendFile(path.join(`${__dirname}/../../orders/build/index.html`));
  });

  app.get('/vendor-hub/*', (req, res) => {
    res.sendFile(path.join(`${__dirname}/../../vendor_hub/build/index.html`));
  });

  //   app.get('/user-management/*', (req, res) => {
  //     res.sendFile(path.join(`${__dirname}/../../user/build/index.html`));
  //   });

  app.get('/diagnostics/*', (req, res) => {
    res.sendFile(path.join(`${__dirname}/../../labs/build/index.html`));
  });

  app.get('/onboarding/*', (req, res) => {
    res.sendFile(path.join(`${__dirname}/../../onboarding/build/index.html`));
  });
  app.get('/healthrecords/*', (req, res) => {
    res.sendFile(
      path.join(`${__dirname}/../../healthrecords/build/index.html`)
    );
  });

  app.get('/*', (req, res) => {
    res.sendFile(path.join(`${__dirname}/../../platform/build/index.html`));
  });
}

// eslint-disable-next-line no-console
console.log('Test log 1');
// eslint-disable-next-line no-console
console.log('Test log 2');

try {
  app.listen(port, serverUrl, (): void => {
    const runServerURl = `http://${serverUrl}:${port}`;
    // eslint-disable-next-line no-console
    console.log(`Connected successfully on port ${runServerURl}`);
  });
} catch (error) {
  logger.error(`Error occured: ${error}`);
}
