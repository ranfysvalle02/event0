exports = async function(ticket_type,e_id) {
    const tix = context.services
      .get("mongodb-atlas")
      .db("demo_event0")
      .collection("tickets");
      
    const evts = context.services
      .get("mongodb-atlas")
      .db("demo_event0")
      .collection("events");
    console.log('ticketTransfer',ticket_type,e_id);
    let source = context.user.id;
    let target = '';
    let e = await evts.findOne({event_identifier:e_id});
    let newWL = [];
    let targetUserId = '';
    
    let evtUpdate = false;
    function randomIntFromInterval(min, max) { // min and max included 
      return Math.floor(Math.random() * (max - min + 1) + min)
    }

    for(let i = 0; i < e.tickets.length; i++){
      let ct = e.tickets[i];
      if(ct.label == ticket_type && ct.waitlist.length > 0){
        //special case - just one person
        let index = 0;
        if(ct.waitlist.length > 1){
          //pick someone randomly 
          index = randomIntFromInterval(0,ct.waitlist.length);  
        }
        console.log('index',index);
        let person = ct.waitlist[index];
        if(person){
          targetUserId = person.user_id;
          target = person.email;
          
          ct.waitlist.forEach((p)=>{
            if(p.email == target){
              targetUserId = p.user_id;
            }else{
              newWL.push(p);
            }
          })  
        }
        evtUpdate = await evts.updateOne({event_identifier:e_id,"tickets.label":ticket_type},{$set:{"tickets.$.waitlist":newWL}});//"pokemon.$.name": "Agumon"
        break;
      }
    }
    console.log('targetUserId',targetUserId);
    console.log('target',target);
    //the above removes from the waitlist (can probably be done with $pull)
    //in between, when platform supports paid tickets - we could automagically handle the financial transaction. NO RESALE FEE
    //the below changes the ticket 
    if(targetUserId){
      let ctix = await tix.updateOne({event_identifier:e_id,access_type:ticket_type,user_id:source},{$set:{user_id:targetUserId,email:target}});
      return {ctix:ctix, evtUpdate:evtUpdate};  
    }
    return {"err":"SOMETHING WENT WRONG WITH TICKET TRANSFER"};
    
};