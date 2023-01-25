exports = async function(event_label,event_tickets,event_description,event_staff){

  const evt = context.services
      .get("mongodb-atlas")
      .db("demo_event0")
      .collection("events");
  
  let e = await evt.find({"event_identifier":event_label}).toArray();
  if(event_label.length >= 5 && e.length == 0){
    // no events for label, we good 
    console.log('EVENT_TICKETS',event_tickets);
   await evt.insertOne({
     tickets:event_tickets, event_staff: event_staff,
     event_description: event_description, 
     event_identifier:event_label, 
     user_id:context.user.id}); 
     
   return true;
  }else{
    return false; //cant do this my friend.... label conflict
  }
};