exports = async function() {
  /*
    A Scheduled Trigger will always call a function without arguments.
    Documentation on Triggers: https://www.mongodb.com/docs/atlas/app-services/triggers/overview/

    Functions run by Triggers are run as System users and have full access to Services, Functions, and MongoDB Data.

    Access a mongodb service:
    const collection = context.services.get(<SERVICE_NAME>).db("db_name").collection("coll_name");
    const doc = collection.findOne({ name: "mongodb" });

    Note: In Atlas Triggers, the service name is defaulted to the cluster name.

    Call other named functions if they are defined in your application:
    const result = context.functions.execute("function_name", arg1, arg2);

    Access the default http client and execute a GET request:
    const response = context.http.get({ url: <URL> })

    Learn more about http client here: https://www.mongodb.com/docs/atlas/app-services/functions/context/#std-label-context-http
  */
  
  //pipeline goes here
  let pipeline = [{$unwind: {
 path: '$tickets'
}}, {$project: {
 _id: 0
}}, {$out: 'event_state'}];
  
  const collection = context.services.get("mongodb-atlas").db("demo_event0").collection("events");
  
  let x = await collection.aggregate(pipeline);
  console.log('x',JSON.stringify(x));
  return x;
  
};
