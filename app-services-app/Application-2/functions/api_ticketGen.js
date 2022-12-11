// This function is the endpoint's request handler.
exports = async function({ query, headers, body}, response) {
    
    const tix = context.services
      .get("mongodb-atlas")
      .db("demo_event0")
      .collection("tickets");
    
    const evt = context.services
      .get("mongodb-atlas")
      .db("demo_event0")
      .collection("events");
    
    let demoEvt = await evt.findOne({"event_identifier":"DEMO"});
    
    
    
    let {user_id,ticket_type,email} = query;
    tt = String(ticket_type);
    
    let tixTypeFound = false;
    let evtUpdate = false;
    let waitlist = false;
    if(!demoEvt.tickets){
      return demoEvt;
    }
    for(let i = 0; i < demoEvt.tickets.length; i++){
      let t = demoEvt.tickets[i];
      if(tt == t.label){
        if(t.max2sell > t.sold){
          evtUpdate = await evt.updateOne({event_identifier:"DEMO","tickets.label":t.label},{$inc:{
            'tickets.$.sold':1
          }});
          tixTypeFound = true;
          break;
        }
        if(t.max2sell == t.sold){
          evtUpdate = await evt.updateOne({event_identifier:"DEMO","tickets.label":t.label},{$addToSet:{
            'tickets.$.waitlist':{
              user_id:user_id,
              email:email
            }
          }});
          tixTypeFound = true;
          waitlist = true;
          break;
        }  
      }
      
    }
    if(tixTypeFound && !waitlist){
      
      const result = await tix.insertOne({
                "access_type": tt,
                "event_identifier": "DEMO",
                "email": String(email),
                "user_id":user_id,
                "scanned": false
            });
      return {ticket:"https://api.qrserver.com/v1/create-qr-code/?data="+result.insertedId.toString(), evtUpdate: evtUpdate};    
    }
    if(waitlist){
      return {"waitlist":true};
    }
    return {"err":"Ticket type unavailable."};  
      
};
