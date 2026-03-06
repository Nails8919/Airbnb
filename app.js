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
    readlistings(res, 0)
})

app.get('/listings/:page', (req, res) => {
    const pageSize = 17
    let page = req.params.page
    
    if (isNaN(page) || page < 1) {
        res.status(400).json({ error: 'Invalid page number' })
        return
    } 
    page = (page - 1) * pageSize
        readlistings(res, page)
})