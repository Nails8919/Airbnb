// library imports
import { listingsCollection } from './mymongo.js';
import { ObjectId } from 'mongodb';

// Function to read detailed information about a specific listing from the database
const detailslistings = (res, id) => {
    listingsCollection
        .findOne({ _id: new ObjectId(id) })
        // Use of projection to specify which fields to include in the result
        .projection({
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
        })
        // Handle the result of the query (promise)
        .then(listing => {
            if (!listing) {
                res.status(404).json({ error: 'ID not found' });
            }
            // Format the results based on the conditions
            else {
                for (let doc of listing) {
                    let minnights = doc.minimum_nights;
                    let maxnights = doc.maximum_nights;
                    number_of_nights = `${minnights} to ${maxnights} nights`;
                }
            }
            res.json(listing);
        });
};

export { detailslistings };