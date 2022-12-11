exports = async function({ query, headers, body}, response) {
  
  const evt = context.services
      .get("mongodb-atlas")
      .db("demo_event0")
      .collection("events");
      
  let x = await evt.findOne({event_identifier:"DEMO"});
  let waitList = {data:{}};
  for(let i = 0; i < x.tickets.length; i++){
    let ctix = x.tickets[i];
    if(ctix.waitlist && ctix.waitlist.length > 0){
      ctix.waitlist.forEach((c)=>{delete c['user_id']});
      waitList['data'][String(ctix.label)] = ctix.waitlist
    }
  }
  return waitList;
};