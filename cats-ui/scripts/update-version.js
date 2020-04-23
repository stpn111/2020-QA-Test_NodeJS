const fs = require('fs');

fs.writeFile(
  './build/version.json',
  JSON.stringify({
    version: process.env.CI_COMMIT_REF_NAME || null,
  }),
  () => {}
);
