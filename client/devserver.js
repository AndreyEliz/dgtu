const express = require('express');
var cors = require('cors')
const jwt = require("jsonwebtoken");

var privateKEY  = `-----BEGIN RSA PRIVATE KEY-----
MIIBOgIBAAJBAN4+QvTBnwWwep4BcGpTw4olUGQe1waiX/6OScNSVj8PUTMxpusM
UtmcxEjU9IgzfC3Q3aFVgqL04j8/GDJNaIECAwEAAQJAZ/7EgBmWWygwyH0t6GNX
7e32B1OzFOSofMqCU8bUmt6lP3LP+j5WdjojaVOg2Gp0eVJSZGxrqbfCoARkmvxd
QQIhAP+9aA25U974+oyD6dFCHP461wsPiNKnqU13qkjKE76pAiEA3ngh+OrP7c7h
oVj0+FDjJ4Kb1FVBR48DYxiDLtOxuhkCICyqMeAjvAg3R9r+tvl7KIEmWaRu5CCW
c7U57x2jXWtxAiAqiYfdY3B8hQkpY6v7auP0IwoOsHp550N7iC1VH88kyQIhAL3R
1bG7JhhBqQzsIwBdJcOY8PN5PstmGVrOcLLdZrqq
-----END RSA PRIVATE KEY-----`;
var publicKEY  = `-----BEGIN PUBLIC KEY-----
MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAN4+QvTBnwWwep4BcGpTw4olUGQe1wai
X/6OScNSVj8PUTMxpusMUtmcxEjU9IgzfC3Q3aFVgqL04j8/GDJNaIECAwEAAQ==
-----END PUBLIC KEY-----`;

const signOptions = {
    issuer:  'dev',
    expiresIn:  "12h",
    algorithm:  "RS256"
};

const app = express();
app.use(cors({credentials: true, origin: true}));
const port = 44359;

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.get('/', (request, response) => response.send(''))


app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`server is listening on ${port}`)
})

/**
 * mocks
 */

app.post('/authentication/token',(request, response) => {
    console.log(request.body)
    const payload = {
        username: request.body.username
    }
    const token = jwt.sign(payload, privateKEY, signOptions);
    const legit = jwt.verify(token, publicKEY, signOptions);
    console.log("\nJWT verification result: " + JSON.stringify(legit));
    response.send({
        access_token: token
    })
})



