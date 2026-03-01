import { listingsCollection } from './mymongo.js'

const readlistings = (res) => {
    listingsCollection
        .find(
            {},
            {
                limit: 15,
                // accommodation: 1,
                // number_of_reviews: 1,
                // review_scores: {review_scores_rating: 1},
                // price: 1,
                // _id : 1,
                // summary: 1,
                // host: {host_url: 1, host_name: 1, host_picture_url: 1},
            })
        .toArray()
        .then(listings => {
            if (!listings)
                res.status(404).json({ error: 'No listings found' })
            else
                res.json(listings)
        })
}


export { readlistings }