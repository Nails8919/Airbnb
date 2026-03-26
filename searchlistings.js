// Imported libraries
import { listingsCollection } from "./mymongo.js"

// Function to search listings based on a query
const searchListings = (res, query) => {
    // Created a MongoDB query object based on the search query
    const mongoQuery = {};
    // const numericValue = Number(query);

    //Case 1 (type of search query)
    if (!isNaN(query)) {
        mongoQuery.minimum_nights = { $lte: query };
    }
    else {
        //Case 2 (Second type of search query)
        mongoQuery.property_type = {
            $regex: `^${query}$`, // Searches for a field using this pattern and not an exact value
            $options: "i" // case-insensitive
        };
    }

    // Query for the MongoDB collection to find listings that match the search query
    listingsCollection
        .find(mongoQuery,
            {
                // limited the results on search query!
                limit: 10,
                // Specified the fields to include in the search results
                projection: {
                    // _id: 1,
                    // name: 1,
                    // summary: 1,
                    // address: 1,
                    // property_type: 1,
                    // reviews: 1,
                    // score: 1,
                    // rating: 1,
                    // price: 1,
                    minimum_nights: 1
                }
            })
        // Convert the cursor to an array and handle the results
        .toArray()
        // Send the search results back to the client as a JSON response
        .then(listing => {
            if (!listing || listing.length == 0) {
                res.status(404).json({ error: 'Listing not found' })
            } else {
                res.json(listing)
            }
        })
}
// Export the searchListings function for use in other parts of the application
export { searchListings }