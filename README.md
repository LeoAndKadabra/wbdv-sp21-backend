# wbdv-sp21-backend
Backend of team project at Northeastern Univeristy

## User System
Current default domain and port:

`localhost:8080`
### Authentication Routes
#### Register & Create User (method=POST)
`http://domain:port/users/register`
#### Login & Read User (method=POST)
`http://domain:port/users/login`
#### Logout User (method=GET)
`http://domain:port/users/logout`

### Profile Page Routes
#### Update User (method=PUT)
`http://domain:port/users`
#### Delete User (method=DELETE)
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
`http://domain:port/reviews/*`