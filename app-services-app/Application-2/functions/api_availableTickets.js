exports = async function({ query, headers, body}, response) {
  
  const evt = context.services
      .get("mongodb-atlas")
      .db("demo_event0")
      .collection("events");
  const {event_id} = query;
  let x = await evt.findOne({event_identifier:event_id});
  let waitList = {data:{}};
  for(let i = 0; i < x.tickets.length; i++){
    let ctix = x.tickets[i];
    if(!waitList['data'][String(ctix.label)]){
      waitList['data'][String(ctix.label)] = {};
      waitList['data'][String(ctix.label)]['len'] =  ctix.waitList? ctix.waitList.length : 0;
      waitList['data'][String(ctix.label)]['price'] =  ctix.price;
      waitList['data'][String(ctix.label)]['max2sell'] =  ctix.max2sell;
        
    }
  }
  waitList['event'] = x.event_description;
  waitList['x'] = x;
  return waitList;
};