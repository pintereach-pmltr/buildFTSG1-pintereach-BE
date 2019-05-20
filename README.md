# Overview
This repository holds all back-end files and resources for the pintereach application. This repository was made during Lambda School's build week where students from different cohorts joined together to create a functioning application in a week. This project consists of 2 UI engineers, 2 Front End engineers, 1 Back End, and a team lead.

## API URL

## Installation 
Fork/Clone the repository. In the same directory as the package.json, run:

```yarn install```

This will install all packages. To start the server:

```yarn server```

To test the repository:

```yarn test```

## Test Accounts

```username: admin ```
```password: password ```


## SCHEMA

`users`
```
{
  "id": 1,                            // Integer [Primary key]
  "username": "admin",                // String [Required, Unique]
  "password": "password",             // String [Required]
}
```

`board` 
```
{
    "id": 1,                          // Integer [Primary Key]
    "board-title": "science",         // String [Required]
    "user_id": 1,                     // Integer [Foreign Key]
}
```

`articles` 
```
{
    "id": 1,                                      // Integer [Primary Key]
    "article-label": "New Genome Discovered",     // String [Optional]
    "url": "https://www.sciencenews.org/article/peacock-spiders-superblack-spots-reflect-just-05-percent-light" //String [Required]
    "board_id": 1,                                 // Integer [Foreign Key]
}
```

# AUTH ROUTES

## **REGISTER**
### **Registers a user**

*Method Url:* `https://pintereach0.herokuapp.com/api/auth/register`


*HTTP method:* **[POST]**

#### Headers

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `Content-Type` | String | Yes      | Must be application/json |

#### Body

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `username`     | String | Yes      | Must be unique           |
| `email`        | String | Yes      | Must be unique           |
| `password`     | String | Yes      |                          |

*example:*

```
{
  username: "admin",
  password: "password",
}
```

#### Response

##### 200 (OK)
>If you successfully register a user the endpoint will return an HTTP response with a status code `200` and a body as below.
```
{ 
  "message": "you have successfully registered, admin!"
}
```
##### 400 (Bad Request)
>If you send in invalid/incomplete, the endpoint will return an HTTP response with a status code `400` and a body as below.
```
{
  "message": "missing username and or password fields"
}
```
[Back to Table of Contents](#table-of-contents)
____

## **LOGIN**
### **Logs a user in**

*Method Url:* `https://pintereach0.herokuapp.com/api/auth/login`

*HTTP method:* **[POST]**

#### Headers

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `Content-Type` | String | Yes      | Must be application/json |

#### Body

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `username`     | String | Yes      | Must match a username in the database |
| `password`     | String | Yes      | Must match a password in the database corresponding username |

*example:*

```
{
  username: "admin",
  password: "password"
}
```

#### Response

##### 200 (OK)
>If you successfully login, the endpoint will return an HTTP response with a status code `200` and a body as below.
```
{
  "message": "Welcome admin!, have a token...",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJ1c2VybmFtZSI6ImFkbWluIiwicm9sZXMiOlsiU3R1ZGVudCJdLCJpYXQiOjE1NTgzNzQ2NjAsImV4cCI6MTU1ODQ2MTA2MH0.8wOUVO-qmeCVF03fDyGxi7Us2jboWw5r99e7at-Lfnk"
}
```
##### 400 (Bad Request)
>If you send in invalid fields or the passwords do not match, the endpoint will return an HTTP response with a status code `400` and a body as below.
```
{
  "message": "'Invalid Credentials'"
}
```
##### 404 (Not Found)
>If you send in an email address that does not match one in the database, the endpoint will return an HTTP response with a status code `404` and a body as below.
```
{
  "error": true,
  "message": "The requested content does not exist."
}
```