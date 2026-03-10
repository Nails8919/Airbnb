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
        projection:{
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
            if (results) {
                let minnights = results.minimum_nights;
                let maxnights = results.maximum_nights;
                results.number_of_nights = `${minnights} to ${maxnights} nights`;
            }
            res.json(results); // Send the formatted results as a JSON response
        })
        // res.json({message:"details"}); // Send the formatted results as a JSON response
}

export { detailslistings }