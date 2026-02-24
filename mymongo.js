import { MongoClient, ServerApiVersion } from "mongodb";
import { MDBURI } from "./config.js";


const client = new MongoClient(MDBURI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
})

const airBNBDB = client.db("sample_airbnb")
const listingsCollection = airBNBDB.collection("listingsAndReviews")

export { listingsCollection }