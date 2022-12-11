exports = async function({ query, headers, body}, response) {
  const tix = context.services
    .get("mongodb-atlas")
    .db("demo_event0")
    .collection("tickets");
    
  const evts = context.services
    .get("mongodb-atlas")
    .db("demo_event0")
    .collection("events");
  const {ticket_type,target,source} = query;
  let e = await evts.findOne({event_identifier:"DEMO"});
  let newWL = [];
  let targetUserId = '';
  
  let evtUpdate = false;
  
  for(let i = 0; i < e.tickets.length; i++){
    let ct = e.tickets[i];
    if(ct.label == ticket_type){
      ct.waitlist.forEach((p)=>{
        if(p.email == target){
          targetUserId = p.user_id;
        }else{
          newWL.push(p);
        }
      })
      evtUpdate = await evts.updateOne({event_identifier:"DEMO","tickets.label":ticket_type},{$set:{"tickets.$.waitlist":newWL}});//"pokemon.$.name": "Agumon"
    }
  }
  
  //the above removes from the waitlist 
  //in between, when platform supports paid tickets - we could automagically handle the financial transaction. NO RESALE FEE
  //the below changes the ticket 
  if(targetUserId){
    let ctix = await tix.updateOne({access_type:ticket_type,user_id:source},{$set:{user_id:targetUserId,email:target}});
    return {ctix:ctix, evtUpdate:evtUpdate,newWL};  
  }
  return {"err":"SOMETHING WENT WRONG WITH TICKET TRANSFER"};
  
};