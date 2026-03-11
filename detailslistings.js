// library imports
import { listingsCollection } from './mymongo.js';

// Function to read detailed information about a specific listing from the database
const detailslistings = (res, id) => {
    listingsCollection
        // Query object to find a document by its unique ID
        .findOne(
            { _id: id },
            // Use of projection to specify which fields to include in the result
            {
                projection: {
                    listing_url: 1,
                    name: 1,
                    description: 1,
                    address: 1,
                    property_type: 1,
                    room_type: 1,
                    bedrooms: 1,
                    beds: 1,
                    amenities: 1,
                    picture_url: 1,
                    cancel_policy: 1,
                    minimum_nights: 1,
                    maximum_nights:1,
                    host: {
                        host_name: 1,
                        host_url: 1,
                        host_picture_url: 1
                    },
                    review_scores: {
                        review_scores_rating: 1
                    },
                    reviews: 1
                }
            })


        .then(results => {// Handle the result of the query (promise)
            if (!results) {
                res.status(400).json({ error: 'ID not found' });
                return;
            }
            // Format the results based on the conditions
            // for (let doc of results) {
            // if (doc.number_of_nights) {
            // let minnights = results.minimum_nights;
            // let maxnights = results.maximum_nights;
            // if (results.minimum_nights == 0 && results.maximum_nights){
                results.number_of_nights = `${results.minimum_nights} to ${results.maximum_nights} nights`;
                // delete results.minimum_nights && results.maximum_nights
            // }
            res.json(results); // Send the formatted results as a JSON response
        })
}

export { detailslistings } // Export the detailslistings function for use in other modules