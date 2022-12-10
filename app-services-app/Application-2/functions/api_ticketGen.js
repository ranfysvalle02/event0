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
    var UsernameGenerator = require('username-generator');
    
    let demoEvt = await evt.findOne({"event_identifier":"DEMO"});
    
    let randomIntFromInterval = function(min, max) { // min and max included 
      return Math.floor(Math.random() * (max - min + 1) + min)
    };
    
    let ticketTypes = ["General Admission","VIP"];
    let tt = ticketTypes[randomIntFromInterval(0,1)];
    
    let {user_id} = query;
    let tixTypeFound = false;
    let evtUpdate = false;
    if(!demoEvt.tickets){
      return demoEvt;
    }
    for(let i = 0; i < demoEvt.tickets.length; i++){
      let t = demoEvt.tickets[i];
      if(tt == t.label && t.max2sell >= t.sold){
        evtUpdate = await evt.updateOne({event_identifier:"DEMO","tickets.label":t.label},{$inc:{
          'tickets.$.sold':1
        }});
        tixTypeFound = true;
        break;
      }
    }
    if(tixTypeFound){
      
      const result = await tix.insertOne({
                "access_type": tt,
                "event_identifier": "DEMO",
                "email": "demo@demo.com",
                "user_id":user_id,
                "scanned": false
            });
      return {ticket:"https://api.qrserver.com/v1/create-qr-code/?data="+result.insertedId.toString(), evtUpdate: evtUpdate};    
    }
    return {"err":"Ticket type unavailable."};  
      
};
