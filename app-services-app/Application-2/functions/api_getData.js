// This function is the endpoint's request handler.
exports = async function({ query, headers, body}, response) {
    const tix = context.services
      .get("mongodb-atlas")
      .db("demo_event0")
      .collection("tickets");
      
    return  {
      "data": await tix.find({}).toArray()
    };
};
