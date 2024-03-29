exports = async function(event_label,event_tickets,event_description,event_staff,event_md,event_flyer,event_sd,event_ed,event_images){
  const xss = require("xss");

  const evt = context.services
      .get("mongodb-atlas")
      .db("demo_event0")
      .collection("events");
  
  let e = await evt.findOne({"event_identifier":event_label});
  if(event_label.length >= 5 && e.user_id == context.user.id){
    // no events for label, we good 
    console.log('EVENT_TICKETS',event_tickets);
    await evt.updateOne({event_identifier:event_label},{$set:{
     tickets:event_tickets, event_staff: event_staff,
     event_md:xss(event_md),event_flyer:event_flyer,event_sd:event_sd,event_ed:event_ed,event_images:event_images,
     event_description: event_description}},{upsert:false}); 
     
    return true;
  }else{
    return  e.user_id; //cant do this my friend.... label conflict
  }
};