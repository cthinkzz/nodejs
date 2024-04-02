const fs = require('fs');
const crypto = require('crypto');
const { data } = require('./data');
const statusMonitor = require('express-status-monitor');

const key = crypto.randomBytes(32);
const vi = crypto.randomBytes(16);

const encryptData = (data, key, vi) => {
  const cipher = crypto.createCipheriv('aes-256-cbc', key, vi);
  let encrypted = cipher.update(data, 'utf-8', 'hex');
  encrypted = encrypted + cipher.final('hex');
  return encrypted;
};

const decryptData = (data, key, vi) => {
  const deCipher = crypto.createDecipheriv('aes-256-cbc', key, vi);
  let decrypted = deCipher.update(data, 'hex', 'utf-8');
  decrypted = decrypted + deCipher.final('utf-8');
  return decrypted;
};

const write = (data, encoding, filename) => {
  const writableStream = fs.createWriteStream(filename, encoding);
  writableStream.on('error', (err) => {
    console.log('error while writing file ', err);
  });
  writableStream.write(data);
  writableStream.close();

  writableStream.on('finish', () => {
    console.log('finished writing file');
  });
};
const read = (filename, encoding, res) => {
  let data = '';
  const readStream = fs.createReadStream(filename, encoding);
  readStream.on('error', (err) => {
    console.log('error while reading file ', err);
  });

  readStream.on('data', (chunk) => {
    data = data + chunk;
  });

  //   readStream.on('data', (chunk) => {
  //     data = data + chunk;
  //   });

  readStream.on('close', () => {
    const decrypted = decryptData(data, key, vi);
    res.send(decrypted);
  });
};

const readFile = (filename, encoding, res) => {
  const readStream = fs.createReadStream(filename, encoding);
  readStream.on('error', (err) => {
    console.log('error while reading file ', err);
  });

  readStream.on('data', (chunk) => {
    res.write(chunk);
  });

  readStream.on('close', () => {
    res.end();
  });
};
const express = require('express');
const app = express();
app.use(statusMonitor());
app.use(express.text());

app.post('/write', (req, res) => {
  const { body } = req;
  const encrypted = encryptData(body, key, vi);
  write(encrypted, 'hex', 'file2.txt');
  res.send('File write was succesfull');
});

app.get('/read', (req, res) => {
  read('file2.txt', 'hex', res);
});

app.get('/readNormal', (req, res) => {
  fs.readFile('file2.txt', { encoding: 'utf-8' }, (data) => res.send(data));
});

app.get('/readFile', (req, res) => {
  readFile('file.txt', 'utf-8', res);
});

app.listen(3000, () => console.log('listening on 3000'));
