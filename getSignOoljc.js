// import { load } from '@fingerprintjs/fingerprintjs';

// import { hmac } from '@noble/hashes/hmac';
// import { sha256 } from '@noble/hashes/sha2';
// import { utf8ToBytes, bytesToHex } from '@noble/hashes/utils';
const { hmac } = require('@noble/hashes/hmac');
const { sha256 } = require('@noble/hashes/sha2');
const { utf8ToBytes, bytesToHex } = require('@noble/hashes/utils');
// import { AxiosHeaders, AxiosRequestConfig } from 'axios';

const SIGN_HEADER = new Set(['accept', 'x-date', 'x-fingerprint', 'access-token']);

const accessKeyId = 'LJCDEMOYmE1MTU5OTBmNDg5ODlhNTQzMGUwY2YLJCDEMO';
const secretAccessKey = 'LJCVd05qVXdObU0yT0RaaU5HWTJORGs0TURNek5HTTJZakV6WTJNNE9XVQ==';

function randomId() {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 15);
  return `${timestamp}${randomStr}`;
}

function toBytes(data) {
  return typeof data === 'string' ? utf8ToBytes(data) : new Uint8Array(data);
}

function uriEscape(str) {
  return encodeURIComponent(str).replace(
    /[!*'()]/g,
    c => `%${c.charCodeAt(0).toString(16).toUpperCase()}`
  );
}

function stableJsonStringify(obj) {
  if (obj === null || typeof obj !== 'object') return String(obj ?? '');
  const keys = Object.keys(obj).sort();
  const result = {};
  for (const k of keys) result[k] = obj[k];
  return JSON.stringify(result);
}

function hmacHex(key, message) {
  return bytesToHex(hmac(sha256, toBytes(key), toBytes(message)));
}
function hashHex(data) {
  return bytesToHex(sha256(toBytes(data)));
}

function buildQueryString(url, params) {
  const entries = [...url.searchParams.entries()];

  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      if (v === undefined || v === null) return;
      if (Array.isArray(v))
        v.slice()
          .sort()
          .forEach(val => entries.push([k, String(val)]));
      else entries.push([k, String(v)]);
    });
  }

  return entries
    .sort(([aKey, aVal], [bKey, bVal]) => {
      const keyCompare = aKey.localeCompare(bKey);
      return keyCompare !== 0 ? keyCompare : aVal.localeCompare(bVal);
    })
    .map(([k, v]) => `${uriEscape(k)}=${uriEscape(v)}`)
    .join('&');
}

function buildHeaders(headers) {
  const trim = (v) => v?.trim().replace(/\s+/g, ' ') ?? '';
  const keys = Object.keys(headers)
    .filter(k => SIGN_HEADER.has(k.toLowerCase()) && headers[k])
    .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

  const signedHeaderKeys = keys.map(k => k.toLowerCase()).join(';');
  const canonicalHeaders = keys.map(k => `${k.toLowerCase()}:${trim(headers[k])}`).join('\n');

  return [signedHeaderKeys, canonicalHeaders];
}

function hashBody(data) {
  if (!data) return hashHex('');
  if (typeof data === 'string') return hashHex(data);
  if (typeof FormData !== 'undefined' && data instanceof FormData) {
    const entries = [];
    data.forEach((value, key) => {
      entries.push(`${uriEscape(key)}=${uriEscape(String(value))}`);
    });
    entries.sort();
    return hashHex(entries.join('&'));
  }
  if (typeof URLSearchParams !== 'undefined' && data instanceof URLSearchParams) {
    const params = Array.from(data.entries())
      .map(([k, v]) => [uriEscape(k), uriEscape(v)])
      .sort(([k1, v1], [k2, v2]) => k1.localeCompare(k2) || v1.localeCompare(v2));
    return hashHex(params.map(([k, v]) => `${k}=${v}`).join('&'));
  }
  if (data instanceof ArrayBuffer) return hashHex(new Uint8Array(data));
  if (ArrayBuffer.isView(data)) return hashHex(new Uint8Array(data.buffer));
  if (typeof data === 'object') return hashHex(stableJsonStringify(data));
  return hashHex(String(data));
}

// const signer = (x_date, x_fingerprint) => {
//   const date = new Date().toISOString().replace(/[:-]|\.\d{3}/g, '');
//   const shortDate = date.substring(0, 8);
//   // const fingerprint = localStorage.getItem('fingerprint') || '';
//   const fingerprint = x_fingerprint;

//   const config = {
//     method: 'GET',
//     headers: {
//       'X-Fingerprint': x_fingerprint,
//       'X-Date': x_date
//     },
//     url: 'https://api.ooljc.com/auth/captcha',
//     params: {},
//     data: {}
//   }

//   const { method, url, headers = {}, params, data } = config;
//   const u = new URL(url, 'http://localhost');
//   const apiPath = u.pathname;
//   const queryString = buildQueryString(u, params);
//   const [signedHeaders, canonicalHeaders] = buildHeaders(headers);
//   const payloadHash = hashBody(data);

//   const canonicalRequest = [
//     method.toUpperCase(),
//     apiPath,
//     queryString,
//     canonicalHeaders,
//     signedHeaders,
//     payloadHash
//   ].join('\n');

//   const credential = [accessKeyId, shortDate, fingerprint, 'oljc'].join('/');
//   const stringToSign = ['LJC-HMAC-SHA256', date, credential, hashHex(canonicalRequest)].join('\n');

//   const kDate = hmacHex(secretAccessKey, date);
//   const kFingerprint = hmacHex(kDate, fingerprint);
//   const kSigning = hmacHex(kFingerprint, 'oljc');
//   const signature = hmacHex(kSigning, stringToSign);

//   return [
//       'LJC-HMAC-SHA256',
//       `Credential=${credential},`,
//       `SignedHeaders=${signedHeaders},`,
//       `Signature=${signature}`
//     ].join(' ');
// }

function signer(x_date, x_fingerprint) {
  // const date = new Date().toISOString().replace(/[:-]|\.\d{3}/g, '');
  const date = x_date;
  const shortDate = date.substring(0, 8);
  // const fingerprint = localStorage.getItem('fingerprint') || '';
  const fingerprint = x_fingerprint;

  // config.headers['X-Fingerprint'] = fingerprint;
  // config.headers['X-Date'] = date;

  const config = {
    method: 'GET',
    headers: {
      'accept': 'application/json, text/plain, */*',
      'X-Fingerprint': x_fingerprint,
      'X-Date': x_date
    },
    url: 'https://api.ooljc.com/auth/captcha',
    params: {},
    data: {}
  }

  const { method, url, headers = {}, params, data } = config;
  const u = new URL(url, 'http://localhost');
  const apiPath = u.pathname;
  const queryString = buildQueryString(u, params);
  const [signedHeaders, canonicalHeaders] = buildHeaders(headers);
  const payloadHash = hashBody(data);

  const canonicalRequest = [
    method.toUpperCase(),
    apiPath,
    queryString,
    canonicalHeaders,
    signedHeaders,
    payloadHash
  ].join('\n');

  const credential = [accessKeyId, shortDate, fingerprint, 'oljc'].join('/');
  const stringToSign = ['LJC-HMAC-SHA256', date, credential, hashHex(canonicalRequest)].join('\n');

  const kDate = hmacHex(secretAccessKey, date);
  const kFingerprint = hmacHex(kDate, fingerprint);
  const kSigning = hmacHex(kFingerprint, 'oljc');
  const signature = hmacHex(kSigning, stringToSign);

  return [
    'LJC-HMAC-SHA256',
    `Credential=${credential},`,
    `SignedHeaders=${signedHeaders},`,
    `Signature=${signature}`
  ].join(' ');
}

// export async function initFingerprint() {
//   try {
//     const fp = await load();
//     const result = await fp.get();
//     const id = result.visitorId || randomId();
//     localStorage.setItem('fingerprint', id);
//   } catch {
//     localStorage.setItem('fingerprint', randomId());
//   }
// }

const t = new Date().toISOString().replace(/[:-]|\.\d{3}/g, "")
const X_Fingerprint = () => randomId();
const X_Date = () => new Date().toISOString().replace(/[:-]|\.\d{3}/g, "");


module.exports = {
    'X_Fingerprint': X_Fingerprint,
    'X_Date': X_Date,
    'Authorization': (x_date, x_fingerprint) => signer(x_date, x_fingerprint)
}