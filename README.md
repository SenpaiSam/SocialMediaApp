# REST API Tutorial

This sample is published as part of [the corresponding article](https://www.toptal.com/nodejs/secure-rest-api-in-nodejs) at the Toptal Engineering Blog. Visit https://www.toptal.com/developers/blog and subscribe to our newsletter to read great posts!

## Before using
 - MongoDB installed and running locally (https://www.mongodb.com/)
   - Using Windows, just open the terminal at where you installed mongo and run `mongod.exe`
 - Run `npm install` or `yarn` in your root project folder


UI:
- check if User info (Bio,Website,...) is empty string and dont show up {DONE}
- return Default image or build default with css {DONE (default Image)}
- Search Users (just load first 4 items) {DONE} <-- TEST IT
- Post Comments {DONE}
- check if Reposted by user (disable btn if Repost) / delete Repost if clicked again ?v0.1 {Checked but not showed in UI}

- when hover over time show full time
- follower list for User
- notifications
- Show number of likes (Done), Reposts, Comments
- when on repost create no image and text input then repost it simple

Server:
- Delete Post {- Dont delete repost with content} {DONE}
- Like / dislike {DONE}
- Search Users {Look in Username and Profilename} {DONE}
- Birthday format (just Date) {is ok}

- dont load all notifications (do it like post.list)
- Comments <-- 1 (+Delete <our own Comment) v0.1


IDEE:
- Post creation ui (Repost, img,...) [load picture if choosen] {dont work}
- metions clientside -> neue Datenbank Zeile (array) [same by hashtags]

TODO:
- Dont throw error in console on UserImage check (?n)
- Dont make it to Repost own Post (simple Repost) because on delete of repost the post deletes to (simple repost) {DONE}
- Umfragen
- Profilbild löschen