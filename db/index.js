const express = require('express');
const router = require('./routes')
const app = express()
const cors = require('cors')


app.use(cors())
app.options('*', cors());
app.use(express.json())
app.use('/', router)

const port = 5000;

app.listen(port, () => {
    console.log('\nReady for GET requests on http://localhost:' + port);
});