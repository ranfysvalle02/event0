# event0
##### a ticket platform without the fees or the ticket scalping

## How will this prevent ticket scalping?
Tickets can only be resold for the price they were purchased. It's essentially a transfer of ownership. 
If the person wants a ticket to the event, he can purchase it directly from event owner. If the tickets are sold out - the user may still attempt to purchase the ticket at which point they'll be added to a waitlist. If a ticket of the desired type becomes available (by someone who owns a ticket of that type 'transfering it to the resale system') - the system will randomly select someone from the waitlist and grant that ticket to that person. In this stage we could issue refunds, payment processing, etc. Keep your tickets, and your scalp. 

## Is it really free?
Yup. The whole thing is hosted on MongoDB Atlas free tier. 

# Limitation for Demo
- Platform does not support ticket resale until tickets are SOLD OUT
- Resale == Ticket Ownership Transfer (no fee; no ticket scalping;)

# Latest updates
- Partial.ly integration for ticket price > 0.00;
- Photo Gallery using iFrame (for event only)
- Centralized 'Authentication'

# Testing the DEMO
- Please use a test credit card: 4242-4242-4242-4242; MM/DD: 12/25; CVC: 123


# Demo Features
- Register/Login
- Purchase tickets
- Transfer tickets
- View Tickets
- embedded Atlas Charts using "On-Demand Materialized Views" @ Event Page
- QR Scanner / Checkin for Event Admin
- Secure with App Services Authentication / Rules / Realm-Web SDK
- Find Events (GraphQL behind the scenes)
- Create Events
- Edit Events

# LIVE DEMO 
https://event0-ssxjd.mongodbstitch.com/index.html -> My Event Tickets

https://event0-ssxjd.mongodbstitch.com/scanner.html -> QR Scanner / Checkin

https://event0-ssxjd.mongodbstitch.com/event.html -> Purchase Tickets

https://event0-ssxjd.mongodbstitch.com/register.html -> Register

https://event0-ssxjd.mongodbstitch.com/new-event.html -> Create new event

https://event0-ssxjd.mongodbstitch.com/edit-event.html -> Edit event

https://event0-ssxjd.mongodbstitch.com/all-events.html -> Browse all events (Using GraphQL without APOLLO)



# Inspired by 
![Alt text](https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fhispanicprwire.com%2Fwp-content%2Fuploads%2F2015%2F11%2FLA56683LOGO-b.jpg&f=1&nofb=1&ipt=1ba378962d2b52e51a286ce1a9a1f6e6aef7c4c18ffd67ff6543d267dc96d832&ipo=images "a title")
