// library imports
import { listingsCollection } from './mymongo.js';

// Function to read detailed information about a specific listing from the database
const detailslistings = (res, id) => {
    listingsCollection
        .findOne({ _id: id })
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
            number_of_nights: 1,
            picture_url: 1,
            cancel_policy: 1,
            host: {
                name: 1,
                url: 1,
                picture_url: 1
            },
            review_scores: {
                rating: 1
            },
            reviews: 1
        })
        // Handle the result of the query (promise)
        .then(listing => {
            if (!listing) {
                res.status(404).json({ error: 'Listing not found' });
            }
            // Format the results based on the conditions
            else {
                for (let doc of listing) {
                    const minnights = doc.minimum_nights;
                    const maxnights = doc.maximum_nights;
                    doc.number_of_nights = `${minnights} to ${maxnights} nights`;
                }
            }
            res.json(listing);
        });
};

export { detailslistings };