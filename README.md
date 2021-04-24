# wbdv-sp21-backend
Backend of team project at Northeastern Univeristy

## User System
Current default domain and port:

`localhost:8080`
### Authentication Routes
#### Register & Create User (POST)
`http://domain:port/users/register`
#### Login & Read User (POST)
`http://domain:port/users/login`
#### Logout User (GET)
`http://domain:port/users/logout`

### Profile Page Routes
#### Visite User Profile (GET)
`http://domain:port/users/profile?username=<username>`
#### Update User (PUT)
`http://domain:port/users`
#### Delete User (DELETE)
`http://domain:port/users`

#### User Schema
```json
{
  "username": "String, unique",
  "password": "String",
  "email": "123@gmail.com",
  "address": "center of the universe"
}
```
## Comment System
### Routes
#### Get Comments (GET)
`http://domain:port/comments?username=<username>`
or
`http://domain:port/comments?movieId=<omdbId>`
#### Create a new comment (POST)
`http://domain:port/comments`
#### Delete a comment (DELETE)
`http://domain:port/comments`
*request body should be like*

```json
{
  "_id": "<comment id>"
}
```