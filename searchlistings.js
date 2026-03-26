import { listingsCollection } from "./mymongo.js"


const searchListings = (res, query) => {

    const mongoQuery = {};
    const numericValue = Number(query);


    if (!isNaN(numericValue)) {
        mongoQuery.minimum_nights = { $lte: numericValue };
    }

    else {
        mongoQuery.property_type = {
            $regex: `^${query}$`,
            $options: "i" // case-insensitive
        };
    }
    // if (query.minimum_nights) {
    //     mongoQuery.minimum_nights = { $gte: query.minimum_nights };
    // }

    listingsCollection
        .find(mongoQuery,
            {
                limit: 10,

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
            if (!listing || listing.length === 0) {
                res.status(404).json({ error: 'Listing not found' })
            } else {
                res.json(listing)
            }
            // res.json(listing)
        })
}

export { searchListings }