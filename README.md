Teach for Technology
============

Video blog web app for learning cutting edge technologies.

How to:
===
 * Build client side: ```grunt```
 * Run in production mode: ```NODE_ENV=production node app.js```
 * Run in dev mode: ```node app.js```
 
Setup dev env in Windows:
===
 * Comment out hiredis in package.json since it's not supported in Windows
 * Run ```npm install```
 * If there is some issue with bcrypt package, run ```npm install bcrypt --msvs_version=2013```
 
