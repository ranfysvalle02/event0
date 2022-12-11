// This function is the endpoint's request handler.
exports = async function({ query, headers, body}, response) {
    const tix = context.services
      .get("mongodb-atlas")
      .db("demo_event0")
      .collection("tickets");
    const {user_id} = query;
    return  {
      "data": await tix.find({user_id:user_id}).toArray()
    };
};
