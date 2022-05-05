const express = require('express');

const app = express();

const appName = 'App-tcc';

const outputPath = `${__dirname}/dist/${appName}` ;

app.use(express.static(outputPath));

app.get('/*',(req, res) => {
    res.sendFile(`${outputPath}/index.html`);

});

app.listen(process.env.PORT)