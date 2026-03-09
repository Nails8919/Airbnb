// library imports
import { MongoClient, ServerApiVersion } from "mongodb";
import { MDBURI } from "./config.js";


// Create a new MongoClient instance with the specified URI and server API version
const client = new MongoClient(MDBURI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
})

// Connection to the MongoDB server
const airBNBDB = client.db("sample_airbnb")
const listingsCollection = airBNBDB.collection("listingsAndReviews")

// Export the listingsCollection for use in other modules
export { listingsCollection }