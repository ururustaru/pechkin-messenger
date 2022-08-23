const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;
const distFolder = (__dirname + '/../dist/');

app.use(express.static(distFolder));

app.use((request, response) => {
  response.sendFile(path.resolve(`${distFolder}/index.html`));
});

app.listen(PORT, function() {
  console.log(`App is running on port :${PORT}`);
});
