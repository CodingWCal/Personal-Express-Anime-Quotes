# Personal Express App: Anime Quotes Message Board

A lightweight Express.js app that lets you post, upvote with a star, and delete your favorite anime quotes in real-time.

**Link to project:** https://github.com/CodingWCal/personal-express-anime-quotes  
![Anime Quotes App Screenshot]()  
*Screenshot of the live app showing quote list and voting controls.*

## How It’s Made

**Tech used:**  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (Atlas), Mongoose  
- **Templating:** EJS  
- **Frontend:** HTML, CSS, Font Awesome, vanilla JavaScript (Fetch API)  

I started with wiring up Express routes for CRUD on a `quotes` collection,  and added thumbs-up handlers with a star icon. EJS renders the list server-side, and the front-end `main.js` uses fetch calls to PUT/DELETE without full page reloads.

## Optimizations

- Indexed the `quotes` collection on _id to speed up updates.  
- Minified frontend JS & CSS for faster load times.  

## Lessons Learned

- Getting single-page-style interactivity without a front-end framework can be surprisingly clean with Express + Fetch.  
- EJS partials made it easy to avoid duplicate markup across pages.  
- Managing state server-side (upvotes/downvotes) felt more robust than juggling client-only logic.
