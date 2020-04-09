# Iva-converter

## Description

High quality docx to PDF conversion one remote iva-docs servers. Generate up to 1000 Documents a month for free.
For more information checkout the official website
https://iva-docs.com

## Registration

Create an account at https://app.iva-docs.com/auth/register
You'll need to create an API key in the API section of the website after you create your account.

## Usage example

```javascript
const { docxToPdfFromPath, initIva } = require("iva-converter");
const { writeFileSync } = require("fs");
const { basename } = require("path");

// GET YOUR API KEY AT https://app.iva-docs.com/auth/register
initIva("YOUR_API_KEY");

const filePath = "/path/to/file";
// Returns a Promise
// can be used with Async/Await
docxToPdfFromPath(filePath)
  .then((pdfFile) => {
    writeFileSync(basename(filePath).replace(".docx", ".pdf"), pdfFile);
  })
  .catch((err) => {
    // err will be the status code of the error in the remote server.
    // We recommend having a retry logic in case you encounter a Too Many Requests (429) error code
    // Also another interesting case is the timeout code (408) we have a default timeout at 20 seconds.
    // Let us know if your request timeout often we help debug
    if (err === 429 || err === 408) {
      // Retry logic
    }
  });
```

## Any issue

We have a chat on the website, we'd love to talk if you have any issue
