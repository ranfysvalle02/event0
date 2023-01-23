exports = async function(arg){
  /*
    Accessing application's values:
    var x = context.values.get("value_name");

    Accessing a mongodb service:
    var collection = context.services.get("mongodb-atlas").db("dbname").collection("coll_name");
    collection.findOne({ owner_id: context.user.id }).then((doc) => {
      // do something with doc
    });

    To call other named functions:
    var result = context.functions.execute("function_name", arg1, arg2);

    Try running in the console below.
  */
  const tix = context.services
      .get("mongodb-atlas")
      .db("demo_event0")
      .collection("tickets");
    
    let r = await tix.find({user_id:context.user.id}).toArray();
    const events = context.services
      .get("mongodb-atlas")
      .db("demo_event0")
      .collection("events");
    let waitlist = await events.find({"tickets.waitlist.0":{"$exists":true}}).toArray();
  return {data: r, waitlist:waitlist};
};