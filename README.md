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
    "board_title": "science",         // String [Required]
    "user_id": 1,                     // Integer [Foreign Key]
}
```

`articles` 
```
{
    "id": 1,                                      // Integer [Primary Key]
    "article_label": "New Genome Discovered",     // String [Optional]
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

----


#BOARDS ROUTES

## **GET ALL**
## Returns all user boards 

*Method URL* `https://pintereach0.herokuapp.com/api/boards/${id}`
*HTTP method:* **[GET]**

### Headers

| name | type   | required | description |
| ----- | ------ | -------- | ----- |
| `Content-Type` | String | Yes | Must be application/json |
| `Authorization`| String | Yes       | Bearer JWT authorization token |

#### Parameters

| name    | type   | required | description              |
| --------| ------ | -------- | ------------------------ |
| `id`| Int    | Yes      | Id of specific user |


#### Response

##### 200 (OK)
>If you successfully return the boards for the user, the endpoint will return an HTTP response with a status code `200` and a body as below.

*example* 

```
    {
        "id": 1,
        "board_title": "board1",
        "user_id": 1
    },
    {
        "id": 2,
        "board_title": "board2",
        "user_id": 1
    }
```

#### 404 (User not found)
>If the user you're trying to access doesn't exist, it'll return code '404' and a body as follows: 

```
"message": 'user with that id not found'}
```


#### 500 (Unauthorized)
>If you are not logged in or your session has expired, the endpoint will return code `500` and a body as follows: 

```
"message": "insufficient credentials, please login again"
```

---
## **ADD BOARD**
## Add a board for the user


*Method URL* `https://pintereach0.herokuapp.com/api/boards/`
*HTTP method:* **[POST]**

### Headers

| name | type   | required | description |
| ----- | ------ | -------- | ----- |
| `Content-Type` | String | Yes | Must be application/json |
| `Authorization`| String | Yes       | Bearer JWT authorization token |

#### Body 

| name     | type   | required | description              |
| ---------| ------ | -------- | ------------------------ |
| `board_title`  | String | Yes       |  
| `user_id`  | integer | Yes       | 

*example:*
```
{
  board_title: "Array Methods",
  user_id: 1
}
```

#### Response

##### 201 (OK)
>If you successfully createa board, the endpoint will return an HTTP response with a status code `201` and a body as below.

*example* 

```
    {
        "id": 1,
        "board_title": "board1",
        "user_id": 1
    },
```

#### 500 (incomplete request)
>If your request has insufficient information, the endpoint will return code `500` and a body as follows:

```
"message": 'incomplete request, expecting a user_id to associate the board with and a board_title'}
```


#### 400 (Unauthorized)
>If you are not logged in or your session has expired, the endpoint will return code `400` 



_____
## **DELETE BOARD**
### Deletes board with specific id.

*Method Url:* `https://pintereach0.herokuapp.com/api/boards/:boardId`

*HTTP method:* **[DELETE]**

#### Headers

| name           | type   | required | description                    |
| -------------- | ------ | -------- | ------------------------------ |
| `Content-Type` | String | Yes      | Must be application/json       |
| `Authorization`| String | Yes      | Bearer JWT authorization token |

#### Parameters

| name    | type   | required | description              |
| --------| ------ | -------- | ------------------------ |
| `boardId`| Int    | Yes      | Id of specific quiz |


#### Response
##### 200 (OK)
>If the request if successful, the server will return an HTTP response with a status code `200` and body as follows:

```
[
  message: 'board was deleted'
]
  ```

##### 404 (Not Found)
>If the boardId passed in does not match one in the database, the endpoint will return an HTTP response with a status code `404` and a body as below.
```
{
  message: "board with that id doesn't exist"
}
```

##### 401 (Unauthorized)
>If you are not logged in, the endpoint will return the status code `401` and a body as follows
```
{
  error:'insufficient credentials, please login again'
}
```

---
## *GET BOARDS AND ARTICLES* 
## Recieve an array of board objects, each with an array of articles associated with that board_id 

*Method URL* `https://pintereach0.herokuapp.com/api/boards/${id}/all`
*HTTP method:* **[GET]**

### Headers

| name | type   | required | description |
| ----- | ------ | -------- | ----- |
| `Content-Type` | String | Yes | Must be application/json |
| `Authorization`| String | Yes       | Bearer JWT authorization token |

#### Parameters

| name    | type   | required | description              |
| --------| ------ | -------- | ------------------------ |
| `id`| Int    | Yes      | Id of specific user |


#### Response

##### 200 (OK)
>If you successfully return the boards for the user, the endpoint will return an HTTP response with a status code `200` and a body as below.

*example* 

```
{
    "boards": [
        {
            "id": 1,
            "board_title": "admin",
            "user_id": 1,
            "articles": [
                {
                    "id": 1,
                    "url": "asdlkfj",
                    "article_label": "test article",
                    "board_id": 1
                },
                {
                    "id": 3,
                    "url": "password",
                    "article_label": "test3",
                    "board_id": 1
                },
                {
                    "id": 4,
                    "url": "password",
                    "article_label": "test4",
                    "board_id": 1
                }
            ]
        },
        {
            "id": 2,
            "board_title": "test 2",
            "user_id": 1,
            "articles": [
                {
                    "id": 2,
                    "url": "url",
                    "article_label": "test 2",
                    "board_id": 2
                }
            ]
        }
    ]
}
```

#### 404 (User not found)
>If the user you're trying to access doesn't exist, it'll return code '404' and a body as follows: 

```
"message": 'user with that id not found'}
```


#### 500 (Unauthorized)
>If you are not logged in or your session has expired, the endpoint will return code `500` and a body as follows: 

```
"message": "insufficient credentials, please login again"
```
---


#ARTICLES ROUTES

## **GET ALL**
## Returns all articles for a specific board

*Method URL* `https://pintereach0.herokuapp.com/api/articles/${id}`
*HTTP method:* **[GET]**

### Headers

| name | type   | required | description |
| ----- | ------ | -------- | ----- |
| `Content-Type` | String | Yes | Must be application/json |
| `Authorization`| String | Yes       | Bearer JWT authorization token |

#### Parameters

| name    | type   | required | description              |
| --------| ------ | -------- | ------------------------ |
| `id`| Int    | Yes      | Id of specific board |


#### Response

##### 200 (OK)
>If you successfully return the articles for the board, the endpoint will return an HTTP response with a status code `200` and a body as below.

*example* 

```
    {
        "id": 1,
        "url": "url 1",
        "article_label": "new article pinned 1",
        "board_id": 1
    },
    {
        "id": 3,
        "url": "url 3",
        "article_label": "new article pinned 3",
        "board_id": 1
    }
```

#### 404 (article not found)
>If the article you're trying to access doesn't exist, it'll return code '404' and a body as follows: 

```
"message": 'article with that id not found'}
```


#### 500 (Unauthorized)
>If you are not logged in or your session has expired, the endpoint will return code `500` and a body as follows: 

```
"message": "insufficient credentials, please login again"
```

---
## **ADD ARTICLE**
## Add article to a board


*Method URL* `https://pintereach0.herokuapp.com/api/articles/`
*HTTP method:* **[POST]**

### Headers

| name | type   | required | description |
| ----- | ------ | -------- | ----- |
| `Content-Type` | String | Yes | Must be application/json |
| `Authorization`| String | Yes       | Bearer JWT authorization token |

#### Body 

| name     | type   | required | description              |
| ---------| ------ | -------- | ------------------------ |
| `article_label`  | String | Yes       |  
| `board_id`  | integer | Yes       | 

*example:*
```
{
  article_label: "new article",
  board_id: 1
}
```

#### Response

##### 201 (OK)
>If you successfully create an article, the endpoint will return an HTTP response with a status code `201` and a body as below.

*example* 

```
    {
        "id": 1,
        "article_label": "new article",
        "board_id": 1
    },
```

#### 500 (incomplete request)
>If your request has insufficient information, the endpoint will return code `500` and a body as follows:

```
message: 'incomplete request, expecting a url and board_id'
```


#### 400 (Unauthorized)
>If you are not logged in or your session has expired, the endpoint will return code `400` 


_____
## **DELETE BOARD**
### Deletes board with specific id.

*Method Url:* `https://pintereach0.herokuapp.com/api/articles/:id`

*HTTP method:* **[DELETE]**

#### Headers

| name           | type   | required | description                    |
| -------------- | ------ | -------- | ------------------------------ |
| `Content-Type` | String | Yes      | Must be application/json       |
| `Authorization`| String | Yes      | Bearer JWT authorization token |

#### Parameters

| name    | type   | required | description              |
| --------| ------ | -------- | ------------------------ |
| `id`| Int    | Yes      | Id of article you want deleted |


#### Response
##### 200 (OK)
>If the request if successful, the server will return an HTTP response with a status code `200` and body as follows:

```
[
  message: 'article was deleted'
]
  ```

##### 404 (Not Found)
>If the boardId passed in does not match one in the database, the endpoint will return an HTTP response with a status code `404` and a body as below.
```
{
  message: "article with that id doesn't exist"
}
```

##### 401 (Unauthorized)
>If you are not logged in, the endpoint will return the status code `401` and a body as follows
```
{
  error:'insufficient credentials, please login again'
}
```
