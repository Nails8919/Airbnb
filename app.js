import express from 'express'
import { PORT } from './config.js'
import { readlistings } from './readlisting.js'

const app = express()


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/listings', (req, res) => {
    readlistings(res)
}
)