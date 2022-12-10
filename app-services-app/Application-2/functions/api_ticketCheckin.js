exports = async function({ query, headers, body}, response) {
    const tix = context.services
      .get("mongodb-atlas")
      .db("demo_event0")
      .collection("tickets");
      
    // Query params, e.g. '?arg1=hello&arg2=world' => {arg1: "hello", arg2: "world"}
    const {ticket_id} = query;
    let ctix = await tix.findOne({_id:BSON.ObjectId(String(ticket_id))});
    if(!ctix.scanned){
      let r = await tix.updateOne({_id:BSON.ObjectId(String(ticket_id))},{$set:{
        scanned:true,
        scanInTime: new Date()
      }})
      return {q:{_id:BSON.ObjectId(String(ticket_id))}, r:r};  
    }else{
      return {q:{_id:BSON.ObjectId(String(ticket_id))}, r:ctix, scanFailed:true};
    }
    
};