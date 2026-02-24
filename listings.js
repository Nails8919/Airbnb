

const listings = (req, res) => {
    listingsCollection ()
        .find (
            {},
        {
            accommodation: 1,
            number_of_reviews: 1,
            price: 1,
            review_scores_rating: 1,
            _id : 1,
            summary: 1,
            host_url: 1,
                host_name: 1,
        })
        .toArray()
        .then

}