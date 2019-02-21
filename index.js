const express = require('express')
const app = express()
const port = 4000
const monk = require('monk')
const bodyparser = require('body-parser') 
const cors= require('cors')
const url = 'mongodb://admin:admin@johncluster-shard-00-00-5rn6t.mongodb.net:27017,johncluster-shard-00-01-5rn6t.mongodb.net:27017,johncluster-shard-00-02-5rn6t.mongodb.net:27017/first-database?ssl=true&replicaSet=JOHNCLUSTER-shard-0&authSource=admin&retryWrites=true'
const db = monk(url);


db.then(()=> {
    console.log('Connected correctly to server') 
})

const people = db.get('first-collection')


app.use(cors())
app.use(bodyparser.json())

app.get('/', async (req, res) => {

    const results = await people.find() 

    res.status(200).send(results) 
})

app.post('/', async (req, res) => {
    const results = await people.insert(req.body)
    res.status(200).send(results)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

