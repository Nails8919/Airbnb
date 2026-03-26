// library imports
import { listingsCollection } from './mymongo.js'

// Function to read listings from the database with pagination
const readlistings = (res, skip = 0) => {
    listingsCollection
        .find( //query object, in this case an empty object to match all documents
            {},
            {
                limit: 17, //limit the number of results to 17
                skip: skip,  //skip the specified number of documents for pagination
                sort: { number_of_reviews: -1 }, //sort the results by number_of_reviews in descending order
                projection: { // specification on which fields to include in the result
                    accommodates: 1,
                    number_of_reviews: 1,
                    review_scores: { review_scores_rating: 1 },
                    price: 1,
                    _id: 1,
                    summary: 1,
                    host: {
                        host_url: 1,
                        host_name: 1,
                        host_picture_url: 1,
                        host_is_superhost: 1
                    },
                }
            })
        .toArray()  //convert the cursor to an array of documents
        .then(listings => { //handle the results of the query (promise)
            // Check if any listings were found and send the appropriate response
            if (!listings)
                res.status(404).json({ error: 'No listings found' })
            else {
                for (let doc of listings) {  //format the price and host name based on the conditions
                    if (doc.price >= 1000) {
                        let remainder = doc.price % 1000
                        let prices = Math.floor(doc.price - remainder) / 1000
                        doc.price = `US$${prices},${remainder}`
                    }

                    // Check if the host is a superhost and format the host name accordingly
                    if (doc.host.host_is_superhost == true) {
                        doc.host.host_name = `${doc.host.host_name} is a superhost`
                    } else {
                        doc.host.host_name = `${doc.host.host_name} is your host`
                    }
                }
                res.json(listings) //send the formatted listings as a JSON response back to the client
            }
        })
}

// Export the readlistings function for use in other modules
export { readlistings }