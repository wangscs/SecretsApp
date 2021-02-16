# Secrets App
The purpose of this secrets app is to allow users to anonymously post content for other anonymous users to see. 
People who are not users (i.e did not create an account) are not allowed to view the secrets/posts.

My reason to make this is purely to practice user authentication and the different levels of security I am able to give a web app that I create.


# Notes for user Security/Encryption
### Level 1 Username and Password
- Basic if else checks whether user's information matches records in db.
- Bad because password is stored as plain text in db.

### Level 2 Encryption
- Use encryption to scramble strings.
- Easy encryptions: Caesar Cipher, Enigma Machine.
- Method used: AES-256-CBC encryption.
- Encryption isnt good enough when my code base is store on an open source platform like github.

### Level 3 Hashing
- Benefits by not requiring the need to turn an encrypted password back to plain text.
- Uses mathematical equations to make it almost impossible to backtrack or reverse encryptions back to plain text.
- When user registers, password is hashed on stored on db, when logging in users entered password will be hashed and compared to the hashed string in db.
- Cons: People use hash tables for most common passwords, brute force may be able to hack into system.

### Level 4 Salting with Hashing
- Generates a random unique string of characters and appends it to the users password during registration.
- When logging in, itll retrieve the password entered and combine it with the salt store in the user's profile and hash that.
- If the entered password + salt + hash = db.user.password, then it grants access.
- This increases the security from hashing.
- To further increase security, use different hashing algorithms from MD5 to bcrypt.
- To even further increase security, use many rounds of salting.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - For example, user enters password.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - Users password gets appended with a salt code

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - Users password with salt code gets hashed using bcrypt

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - Hashed password gets appended with another salt code and hashed again 

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - The second hashed password is now different from the first

### Level 5 Cookies and sessions
- Cookies are a small piece of data that a server sends to the user's browser so that the browser can store it and send back data when the user comes back later to the same server.
- It can be used to tell if two requests came from the same browser and keep the user logged in.
- It also remembers stateful information for the stateless HTTP protocols.
- When using passport-local-mongoose, it'll automatically salt and hash our passwords for us.

### Level 6 OAuth (Delegation)
- An open standard for access delegation, which is commonly used as a way for users to grant websites or applications to access their information without giving the websites their passwords.
- Gives the responsibility of user security to big tech companies with many intelligent engineers like google/facebook to authenticate users so third party websites would have less liability in the event of being hacked.
- IE, registering an account with spotify using facebook login credentials.
- Another example would be if a user is trying to make an account with a third party website, they can register using their facebook. So the website will send a get request to facebook which would respond with the users name, email, credentials, etc.




