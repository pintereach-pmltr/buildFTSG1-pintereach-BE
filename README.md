#Overview
This repository holds all back-end files and resources for the pintereach application. This repository was made during Lambda School's build week where students from different cohorts joined together to create a functioning application in a week. This project consists of 2 UI engineers, 2 Front End engineers, 1 Back End, and a team lead.

#API URL

#Installation 
Fork/Clone the repository. In the same directory as the package.json, run:

```yarn install```

This will install all packages. To start the server:

```yarn server```

To test the repository:

```yarn test```

#Test Accounts

```username: admin ```
```password: password ```


#SCHEMA

users

{
  "id": 1,                            // Integer [Primary key]
  "username": "admin",                // String [Required, Unique]
  "password": "password",             // String [Required]
}

board 

{
    "board-id": 1,                    // Integer [Primary Key]
    "board-title": "news",            // String [Required]
    "user_id": 1,                     // Integer [Foreign Key]
}