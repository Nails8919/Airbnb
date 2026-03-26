// Importation of necessary modules and configurations
import express from 'express'
import { PORT } from './config.js'
import { readlistings } from './readlisting.js'
import { detailslistings } from './detailslistings.js'
import { searchListings } from './searchlistings.js'

// Create an instance of the Express application
const app = express()

// Start the server and listen on the specified port
app.listen(PORT, () => {
    // Message to vertify that the server is running.
    console.log(`Server is running on http://localhost:${PORT}`)
})

// Endpoint to get listings with pagination
app.get('/listings', (req, res) => {
    // Call the readlistings function to retrieve the listings and send it back to the client
    readlistings(res, 0)
})

// Endpoint to get listings for a specific page
app.get('/listings/:page', (req, res) => {
    //Created variable to the store page number and page size for pagination
    const pageSize = 17
    // Created a variable to store the page number from the request parameters
    let page = req.params.page
    
    // Validate the page parameter to ensure it's a positive integer
    if (isNaN(page) || page < 1) {
        res.status(400).json({ error: 'Invalid page number' })
        return
    } 
    // Calculate the offset for pagination based on the page number and page size
    page = (page - 1) * pageSize
        readlistings(res, page)
})

// Endpoint to get details of a specific listing by ID
app.get('/details/:id', (req, res) => {
    // Created a variable to store the listing ID from the request parameters
    const id = req.params.id
    // error handling for listing ID
    if (isNaN(id)) {
        res.status(400).json({ error: 'Invalid ID' })
        return
    }
    // Call this function to retrieve the data of the requested listing and send it back to the client
    detailslistings(res, id)
})

// Endpoint to search listings based on a query
app.get('/search/:query', (req, res) => {
    // Created a variable to store the search query from the request parameters
    const query = req.params.query
    // error handling for search query
    if (!query) {
        res.status(400).json({ error: 'Query parameter is required' })
        return
    }
    // Call the searchListings function to perform the search and send the results back to the client
    searchListings(res, query)
})