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
    waitList['data'][String(ctix.label)] = ctix.waitlist.length;
  }
  waitList['event'] = x.event_description;
  return waitList;
};