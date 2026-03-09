// Import necessary modules and configurations
import express from 'express'
import { PORT } from './config.js'
import { readlistings } from './readlisting.js'
import { detailslistings } from './detailslistings.js'

// Create an instance of the Express application
const app = express()

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})

// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })

// Endpoint to get listings with pagination
app.get('/listings', (req, res) => {
    readlistings(res, 0)
})

// Endpoint to get listings for a specific page
app.get('/listings/:page', (req, res) => {
    const pageSize = 17
    let page = req.params.page
    
    // Validate the page parameter to ensure it's a positive integer
    if (isNaN(page) || page < 1) {
        res.status(400).json({ error: 'Invalid page number' })
        return
    } 
    page = (page - 1) * pageSize
        readlistings(res, page)
})

app.get('/listings/:id', (req, res) => {
    const id = req.params.id
    detailslistings(res, id)
})