const express = require('express');
const ah = require('./hooks');
const app = express();
const port = 3000;

app.use((request, response, next) => {
    const data = { headers: request.headers };
    ah.createRequestContext(data);
    next();
});

const requestHandler = (request, response, next) => {
    const reqContext = ah.getRequestContext();
    response.json(reqContext);
    next()
};

app.get('/', requestHandler)

app.listen(port, (err) => {
    if (err) {
        return console.error(err);
    }
    console.log(`server is listening on ${port}`);
}); 