const express = require('express')
const app = express();
const path = require('path')
const port = 3000;

const mongooseUri = 'mongodb+srv://ambrahamjeevan:K9JEZf9GVyYlRH56@cluster0.zfb2ydg.mongodb.net/'

app.use('/',express.static(path.join(__dirname,'static')))


app.get('/register',)

app.listen(port,()=> {
    console.log(`http://localhost:${port}`)
})
