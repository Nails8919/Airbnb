import { listingsCollection } from "./mymongo.js"


const searchListings = (res, query) => {
    listingsCollection
    .find({
        minimum_nights: { $gte: query}
        // maximum_nights: { $gte: 10 }
    },
     {
        limit:10,

        projection: {
            _id: 1,
            name: 1,
            summary: 1,
            address: 1,
            property_type: 1,
            reviews: 1,
            score: 1,
            rating: 1,
            price: 1
        }
    })
    .toArray()
    .then(listing => {
        if (!listing) {
            res.status(404).json({ error: 'Listing not found' })    
        }
        res.json(listing)
    })
}

export { searchListings }