import { listingsCollection } from "./mymongo"


const searchListings = () => {
    listingsCollection
    .findOne({
        minimum_nights: { $lte: 5 },
        maximum_nights: { $gte: 10 }

    },
     {
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
    .then(listing => {
        if (!listing) {

        }
    })
}