# Gulp

[Gulp](https://gulp-cwc8.onrender.com/) is a social media platform, inspired by [Yelp](https://www.yelp.com/).

- Gulp current offers the following features:
  - Businesses
  - Reviews
- Users can add their own businesses to the database and add description information about their businesses. 
- In the future, there are plans to implement a Google Maps-API and tag system. Users will be able to find the location of the businesses right on the webpage. With the tag system, they are able to filter their businesses base on their needs.

## Installation guide

### Clone the repo
  * run `git clone https://github.com/byeolrin/Gulp.git` in a desired directory

### Install dependencies
  * run `pipenv install -r requirements.txt` in the root project folder
  * run `npm install` in `react-vite` folder

### Create and ensure that the .env file has the following fields
(You will need to create an AWS S3 Bucket)
  * SECRET_KEY
  * DATABASE_URL
  * SCHEMA
  * S3_BUCKET
  * S3_KEY
  * S3_SECRET

### Migration
  * run `pipenv shell flask db upgrade` in the root project folder

### Optional seedings
  * run `pipenv shell flask seed reset` in the root project folder

### Start up the servers
  * run `pipenv shell flask run` in the root project folder
  * run `npm run dev` in `react-vite` folder

## Contact Me
[![LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/gary-k-cheung/)
![Gmail](https://img.shields.io/badge/Gmail-D14836?logo=gmail&logoColor=white)
![Gmail](https://img.shields.io/badge/yragkcheung.com-gray?logoColor=white)

## Tech Stack
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?logo=javascript&logoColor=%23F7DF1E)
![Python](https://img.shields.io/badge/python-3670A0?logo=python&logoColor=ffdd54)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?logo=css3&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?logo=npm&logoColor=white)
![Markdown](https://img.shields.io/badge/markdown-%23000000.svg?logo=markdown&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?logo=redux&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?logo=react-router&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?logo=vite&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?logo=eslint&logoColor=white)
![Flask](https://img.shields.io/badge/flask-%23000.svg?logo=flask&logoColor=white)
![Ubuntu](https://img.shields.io/badge/Ubuntu-E95420?logo=ubuntu&logoColor=white)
![Linux](https://img.shields.io/badge/Linux-FCC624?logo=linux&logoColor=black)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?logo=amazon-aws&logoColor=white)
![Static Badge](https://img.shields.io/badge/Amazon%20S3-green?logo=amazon%20s3&logoColor=white)
![SQLite](https://img.shields.io/badge/sqlite-%2307405e.svg?logo=sqlite&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?logo=postgresql&logoColor=white)
![MySQL](https://img.shields.io/badge/mysql-4479A1.svg?logo=mysql&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?logo=docker&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-FF6C37?logo=postman&logoColor=white)
![Render](https://img.shields.io/badge/Render-%46E3B7.svg?logo=render&logoColor=white)
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?logo=visual-studio-code&logoColor=white)
![MDN Web Docs](https://img.shields.io/badge/MDN_Web_Docs-black?logo=mdnwebdocs&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?logo=github&logoColor=white)
![Static Badge](https://img.shields.io/badge/SQLAlchemy-white?logo=sqlalchemy&logoColor=blue)


## API Documentation

## USER AUTHENTICATION/AUTHORIZATION

### All endpoints that require authentication

All endpoints that require a current user to be logged in.

* Request: endpoints that require authentication
* Error Response: Require authentication
  * Status Code: 401
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Authentication required"
    }
    ```

### All endpoints that require proper authorization

All endpoints that require authentication and the current user does not have the
correct role(s) or permission(s).

* Request: endpoints that require proper authorization
* Error Response: Require proper authorization
  * Status Code: 403
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Forbidden"
    }
    ```

### Get the All Users

Returns the information about the all users from the database when logged in.

* Require Authentication: false
* Request
  * Method: GET
  * URL: /api/users
  * Body: none

* Successful Response when there is a logged in user
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
        "users": [
            {
                "email": "demo@aa.io",
                "first_name": "DemoFirst",
                "id": 1,
                "last_name": "DemoLast",
                "username": "Demo"
            },
            {
                "email": "gary@aa.io",
                "first_name": "Gary",
                "id": 2,
                "last_name": "Cheung",
                "username": "gary"
            },
            {
                "email": "dennis@aa.io",
                "first_name": "Dennis",
                "id": 3,
                "last_name": "Ma",
                "username": "dennisbtw"
            },
            {
                "email": "chris@aa.io",
                "first_name": "Chris",
                "id": 4,
                "last_name": "Fealy",
                "username": "chris"
            }
        ]
    }
    ```

### Log In a User

Logs in a current user with valid credentials and returns the current user's
information.

* Require Authentication: false
* Request
  * Method: POST
  * URL: /api/auth/login
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "email": "john.smith@gmail.com",
      "password": "secret password"
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "user": {
        "id": 1,
        "firstName": "John",
        "lastName": "Smith",
        "email": "john.smith@gmail.com",
        "username": "JohnSmith"
      }
    }
    ```

* Error Response: Invalid credentials
  * Status Code: 401
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Invalid credentials"
    }
    ```

* Error response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Bad Request",
      "errors": {
        "credential": "Email or username is required",
        "password": "Password is required"
      }
    }
    ```

### Sign Up a User

Creates a new user, logs them in as the current user, and returns the current
user's information.

* Require Authentication: false
* Request
  * Method: POST
  * URL: /api/users
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "firstName": "John",
      "lastName": "Smith",
      "email": "john.smith@gmail.com",
      "username": "JohnSmith",
      "password": "secret password"
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "user": {
        "id": 1,
        "firstName": "John",
        "lastName": "Smith",
        "email": "john.smith@gmail.com",
        "username": "JohnSmith"
      }
    }
    ```

* Error response: User already exists with the specified email
  * Status Code: 500
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "User already exists",
      "errors": {
        "email": "User with that email already exists"
      }
    }
    ```

* Error response: User already exists with the specified username
  * Status Code: 500
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "User already exists",
      "errors": {
        "username": "User with that username already exists"
      }
    }
    ```

* Error response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Bad Request",
      "errors": {
        "email": "Invalid email",
        "username": "Username is required",
        "firstName": "First Name is required",
        "lastName": "Last Name is required"
      }
    }
    ```

## Businesses

### Get Businesses

Returns all businesses.

* Require Authentication: false
* Request
  * Method: GET
  * URL: /api/businesses
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
        "businesses": [
            {
                "address": "315 5th Ave Fl 3",
                "business_image": "https://s3-media0.fl.yelpcdn.com/bphoto/X6HVBVgZdZDTh5tLb77mFw/o.jpg",
                "business_name": "Nubiani",
                "business_url": "https://www.nubianinyc.com/",
                "city": "New York",
                "created_at": "Sun, 10 Mar 2024 21:53:44 GMT",
                "description": "NUBIANI - \" Sliced Meat directly cooked over a fire\" The term \"NUBIANI\" refers to grilled meat on direct heat that Koreans used to enjoy in the ancient Manchuria region. As nomadic people in ancient times, Koreans were highly skilled in cooking meat using a fire pit, the earliest form of barbeque, and in bringing out the natural flavors of the ingredient with minimal seasoning. Since then, cooking meat on direct heat has developed into a culinary art form over time in Korea. Located in the heart of Manhattan, NUBIANI is now open with a goal of further developing the transcendent Korean culinary culture of grilling meat, and introducing the finest flavors from direct heat cooking to the world.",
                "id": 1,
                "latitude": 40.7471,
                "longitude": -73.9854,
                "owner_id": 2,
                "phone": "917-623-0807",
                "price_range": 3,
                "reviews": [
                    {
                    "business_id": 1,
                    "created_at": "Sun, 10 Mar 2024 22:12:02 GMT",
                    "id": 6,
                    "rating": 5,
                    "review": "UNLUCKY really",
                    "updated_at": "Sun, 10 Mar 2024 22:12:02 GMT",
                    "user": {
                        "email": "demo@aa.io",
                        "first_name": "DemoFirst",
                        "id": 1,
                        "last_name": "DemoLast",
                        "username": "Demo"
                    },
                    "user_id": 1
                    }
                ],
                "state": "NY",
                "updated_at": "Sun, 10 Mar 2024 21:53:44 GMT",
                "zipcode": 10016
            }
        ]
    }
    ```

### Get all businesses owned by the userId

Returns all the businesses owned (created) by the userId.

* Require Authentication: true
* Request
  * Method: GET
  * URL: /api/businesses/user/:userId
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
        "businesses": [
            {
            "address": "5 W 32nd St",
            "business_image": "https://images.squarespace-cdn.com/content/v1/5cc8bc4f93a632622cd1616d/1558025251826-FKQBA9WWWZCTU25E138M/image-asset.jpeg",
            "business_name": "BCD Tofu House",
            "business_url": "https://www.bcdtofuhouse.com/",
            "city": "New York",
            "created_at": "Sun, 10 Mar 2024 21:53:44 GMT",
            "description": "BCD Tofu House is a popular Korean restaurant chain known for its authentic Korean cuisine, specializing in tofu-based dishes. The name \"BCD\" stands for \"Bukchon Dong,\" a neighborhood in Seoul, South Korea, renowned for its traditional Korean culture and cuisine.",
            "id": 3,
            "latitude": 40.7477,
            "longitude": -73.986,
            "owner_id": 4,
            "phone": "212-967-1900",
            "price_range": 2,
            "reviews": [
                {
                "business_id": 3,
                "created_at": "Sun, 10 Mar 2024 21:53:44 GMT",
                "id": 3,
                "rating": 4,
                "review": "The food was not too bad. If you are craving hot tofu soup, you should come!",
                "updated_at": "Sun, 10 Mar 2024 21:53:44 GMT",
                "user": {
                    "email": "gary@aa.io",
                    "first_name": "Gary",
                    "id": 2,
                    "last_name": "Cheung",
                    "username": "gary"
                },
                "user_id": 2
                },
                {
                "business_id": 3,
                "created_at": "Sun, 10 Mar 2024 21:53:44 GMT",
                "id": 5,
                "rating": 3,
                "review": "This place was okay...food was solid, but waiter didn't come to our table.",
                "updated_at": "Sun, 10 Mar 2024 21:53:44 GMT",
                "user": {
                    "email": "dennis@aa.io",
                    "first_name": "Dennis",
                    "id": 3,
                    "last_name": "Ma",
                    "username": "dennisbtw"
                },
                "user_id": 3
                }
            ],
            "state": "NY",
            "updated_at": "Sun, 10 Mar 2024 21:53:44 GMT",
            "zipcode": 10001
            }
        ]
    }
    ```

### Get details of a business from an id

Returns the details of a business specified by its id.

* Require Authentication: false
* Request
  * Method: GET
  * URL: /api/businesses/:businessId
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
       "business": {
            "address": "16 W 22nd St",
            "business_image": "https://assets-global.website-files.com/64dc46f3bd5126f2de6e5a04/65739ed106fcaedf0e2fb0eb_MEET-OUR-MEATweb.webp",
            "business_name": "COTE Korean Steakhouse",
            "business_url": "https://cotekoreansteakhouse.com/",
            "city": "New York",
            "created_at": "Sun, 10 Mar 2024 21:53:44 GMT",
            "description": "COTE, the carnivorous vision of proprietor Simon Kim, blends the dining experience of Korean barbecue together with the hallmarks of a classic American steakhouse. The result is a unique, convivial and interactive atmosphere, accompanied by the highest quality USDA Prime beef, an impeccable 1200+ label wine list, and a suite of classic-but-creative cocktails. Smokeless grills in every table, combined with cuts from our in-house dry aging room, ensure that every morsel of steak is hot, fresh, and caramelized to perfection. COTE is New York City's first Korean Steakhouse.",
            "id": 2,
            "latitude": 40.7415,
            "longitude": -73.9912,
            "owner_id": 2,
            "phone": "212-401-7986",
            "price_range": 4,
            "reviews": [
                {
                    "business_id": 2,
                    "created_at": "Sun, 10 Mar 2024 21:53:44 GMT",
                    "id": 2,
                    "rating": 5,
                    "review": "Best Korean steakhouse in New York City",
                    "updated_at": "Sun, 10 Mar 2024 21:53:44 GMT",
                    "user": {
                        "email": "demo@aa.io",
                        "first_name": "DemoFirst",
                        "id": 1,
                        "last_name": "DemoLast",
                        "username": "Demo"
                    },
                    "user_id": 1
                },
                {
                    "business_id": 2,
                    "created_at": "Sun, 10 Mar 2024 21:53:44 GMT",
                    "id": 4,
                    "rating": 5,
                    "review": "This restaurant was amazing and you must try it if you get the opportunity to.",
                    "updated_at": "Sun, 10 Mar 2024 21:53:44 GMT",
                    "user": {
                        "email": "dennis@aa.io",
                        "first_name": "Dennis",
                        "id": 3,
                        "last_name": "Ma",
                        "username": "dennisbtw"
                    },
                    "user_id": 3
                }
            ],
            "state": "NY",
            "updated_at": "Sun, 10 Mar 2024 22:00:25 GMT",
            "zipcode": 10010
        }
    }
    ```

* Error response: Couldn't find a Business with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "error": "Business could not be found."
    }
    ```

### Create a Business

Creates and returns a new business.

* Require Authentication: true
* Request
  * Method: POST
  * URL: /api/businesses/new
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "business_name": "Nubani",
      "phone": "917-623-0807",
      "address": "315 5th Ave Fl 3",
      "city": "New York",
      "state": "NY",
      "zipcode": 10016,
      "description": "NUBIANI - \" Sliced Meat directly cooked over a fire\" The term \"NUBIANI\" refers to grilled meat on direct heat that Koreans used to enjoy in the ancient Manchuria region. As nomadic people in ancient times, Koreans were highly skilled in cooking meat using a fire pit, the earliest form of barbeque, and in bringing out the natural flavors of the ingredient with minimal seasoning. Since then, cooking meat on direct heat has developed into a culinary art form over time in Korea. Located in the heart of Manhattan, NUBIANI is now open with a goal of further developing the transcendent Korean culinary culture of grilling meat, and introducing the finest flavors from direct heat cooking to the world.",
      "latitude": 40.7471,
      "longitude": -73.9854,
      "price_range": 3,
      "business_url": "https://www.nubianinyc.com/",
      "business_image": "https://s3-media0.fl.yelpcdn.com/bphoto/X6HVBVgZdZDTh5tLb77mFw/o.jpg"
    }
    ```

* Successful Response
  * Status Code: 201
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "business": {
        "address": "315 5th Ave Fl 3",
        "business_image": "https://s3-media0.fl.yelpcdn.com/bphoto/X6HVBVgZdZDTh5tLb77mFw/o.jpg",
        "business_name": "Nubiani",
        "business_url": "https://www.nubianinyc.com/",
        "city": "New York",
        "created_at": "Sun, 10 Mar 2024 21:53:44 GMT",
        "description": "NUBIANI - \" Sliced Meat directly cooked over a fire\" The term \"NUBIANI\" refers to grilled meat on direct heat that Koreans used to enjoy in the ancient Manchuria region. As nomadic people in ancient times, Koreans were highly skilled in cooking meat using a fire pit, the earliest form of barbeque, and in bringing out the natural flavors of the ingredient with minimal seasoning. Since then, cooking meat on direct heat has developed into a culinary art form over time in Korea. Located in the heart of Manhattan, NUBIANI is now open with a goal of further developing the transcendent Korean culinary culture of grilling meat, and introducing the finest flavors from direct heat cooking to the world.",
        "id": 1,
        "latitude": 40.7471,
        "longitude": -73.9854,
        "owner_id": 2,
        "phone": "917-623-0807",
        "price_range": 3,
        "reviews": [],
        "state": "NY",
        "updated_at": "Sun, 10 Mar 2024 21:53:44 GMT",
        "zipcode": 10016
      }
    }
    ```

* Error Response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Bad Request",
      "errors": {
        "business_name": "Business Name is required and needs to be more than 3 characters",
        "phone": "Please provide a valid phone number that contains 10 digit in xxx-xxx-xxxx format",
        "address": "Address is required",
        "city": "City is required",
        "state": "State is required",
        "zipcode": "Please provide a valid Zipcode that contains 5 digit",
        "description": "Description is required",
        "latitude": "Latitude must be a valid number between -90 and 90",
        "longitude": "Longitude must be a valid number between -180 and 180",
        "price_range": "Price Range is required",
        "business_url": "Please provide a valid URL",
        "business_image":"Business Image is required"
      }
    }
    ```

### Edit a Business

Updates and returns an existing business.

* Require Authentication: true
* Require proper authorization: Food must belong to the current user
* Request
  * Method: PUT
  * URL: /api/businesses/:businessId
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "business_name": "Nubani",
      "phone": "917-623-0807",
      "address": "315 5th Ave Fl 3",
      "city": "New York",
      "state": "NY",
      "zipcode": 10016,
      "description": "NUBIANI - \" Sliced Meat directly cooked over a fire\" The term \"NUBIANI\" refers to grilled meat on direct heat that Koreans used to enjoy in the ancient Manchuria region. As nomadic people in ancient times, Koreans were highly skilled in cooking meat using a fire pit, the earliest form of barbeque, and in bringing out the natural flavors of the ingredient with minimal seasoning. Since then, cooking meat on direct heat has developed into a culinary art form over time in Korea. Located in the heart of Manhattan, NUBIANI is now open with a goal of further developing the transcendent Korean culinary culture of grilling meat, and introducing the finest flavors from direct heat cooking to the world.",
      "latitude": 40.7471,
      "longitude": -73.9854,
      "price_range": 3,
      "business_url": "https://www.nubianinyc.com/",
      "business_image": "https://s3-media0.fl.yelpcdn.com/bphoto/X6HVBVgZdZDTh5tLb77mFw/o.jpg"
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
     {
      "business": {
        "address": "315 5th Ave Fl 3",
        "business_image": "https://s3-media0.fl.yelpcdn.com/bphoto/X6HVBVgZdZDTh5tLb77mFw/o.jpg",
        "business_name": "Nubiani",
        "business_url": "https://www.nubianinyc.com/",
        "city": "New York",
        "created_at": "Sun, 10 Mar 2024 21:53:44 GMT",
        "description": "NUBIANI - \" Sliced Meat directly cooked over a fire\" The term \"NUBIANI\" refers to grilled meat on direct heat that Koreans used to enjoy in the ancient Manchuria region. As nomadic people in ancient times, Koreans were highly skilled in cooking meat using a fire pit, the earliest form of barbeque, and in bringing out the natural flavors of the ingredient with minimal seasoning. Since then, cooking meat on direct heat has developed into a culinary art form over time in Korea. Located in the heart of Manhattan, NUBIANI is now open with a goal of further developing the transcendent Korean culinary culture of grilling meat, and introducing the finest flavors from direct heat cooking to the world.",
        "id": 1,
        "latitude": 40.7471,
        "longitude": -73.9854,
        "owner_id": 2,
        "phone": "917-623-0807",
        "price_range": 3,
        "reviews": [],
        "state": "NY",
        "updated_at": "Sun, 10 Mar 2024 21:53:44 GMT",
        "zipcode": 10016
      }
    }
    ```

* Error Response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
   {
      "message": "Bad Request",
      "errors": {
        "business_name": "Business Name is required and needs to be more than 3 characters",
        "phone": "Please provide a valid phone number that contains 10 digit in xxx-xxx-xxxx format",
        "address": "Address is required",
        "city": "City is required",
        "state": "State is required",
        "zipcode": "Please provide a valid Zipcode that contains 5 digit",
        "description": "Description is required",
        "latitude": "Latitude must be a valid number between -90 and 90",
        "longitude": "Longitude must be a valid number between -180 and 180",
        "price_range": "Price Range is required",
        "business_url": "Please provide a valid URL",
        "business_image":"Business Image is required"
      }
    }
    ```

* Error response: Couldn't find a Business with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "error": "Business could not be found."
    }
    ```

### Delete a Business

Deletes an existing business.

* Require Authentication: true
* Require proper authorization: Business must belong to the current user
* Request
  * Method: DELETE
  * URL: /api/businesses/:businessId
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Successfully deleted"
    }
    ```

* Error response: Couldn't find a Food with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "error": "Business could not be found."
    }
    ```

## Reviews

### Get Reviews

Returns all reviews.

* Require Authentication: false
* Request
  * Method: GET
  * URL: /api/reviews
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "reviews": [
        {
          "business_id": 2,
          "created_at": "Sun, 10 Mar 2024 21:53:44 GMT",
          "id": 2,
          "rating": 5,
          "review": "Best Korean steakhouse in New York City",
          "updated_at": "Sun, 10 Mar 2024 21:53:44 GMT",
          "user": {
            "email": "demo@aa.io",
            "first_name": "DemoFirst",
            "id": 1,
            "last_name": "DemoLast",
            "username": "Demo"
          },
          "user_id": 1
        },
        {
          "business_id": 3,
          "created_at": "Sun, 10 Mar 2024 21:53:44 GMT",
          "id": 3,
          "rating": 4,
          "review": "The food was not too bad. If you are craving hot tofu soup, you should come!",
          "updated_at": "Sun, 10 Mar 2024 21:53:44 GMT",
          "user": {
            "email": "gary@aa.io",
            "first_name": "Gary",
            "id": 2,
            "last_name": "Cheung",
            "username": "gary"
          },
          "user_id": 2
        }
      ]
    }
    ```

### Get details of a Review from an id

Returns the details of a review specified by its id.

* Require Authentication: false
* Request
  * Method: GET
  * URL: /api/reviews/:reviewId
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "review": {
        "business_id": 3,
        "created_at": "Sun, 10 Mar 2024 21:53:44 GMT",
        "id": 3,
        "rating": 4,
        "review": "The food was not too bad. If you are craving hot tofu soup, you should come!",
        "updated_at": "Sun, 10 Mar 2024 21:53:44 GMT",
        "user": {
          "email": "gary@aa.io",
          "first_name": "Gary",
          "id": 2,
          "last_name": "Cheung",
          "username": "gary"
        },
        "user_id": 2
      }
    }
    ```

* Error response: Couldn't find a Review with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "error": "Review could not be found."
    }
    ```

### Create a Review

Creates and returns a new review.

* Require Authentication: true
* Request
  * Method: POST
  * URL: /api/reviews/new
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "businessId": 2,
      "review": "Best Korean steakhouse in New York City",
      "rating": 5
    }
    ```

* Successful Response
  * Status Code: 201
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "review": {
        "business_id": 2,
        "created_at": "Sun, 10 Mar 2024 21:53:44 GMT",
        "id": 2,
        "rating": 5,
        "review": "Best Korean steakhouse in New York City",
        "updated_at": "Sun, 10 Mar 2024 21:53:44 GMT",
        "user": {
          "email": "demo@aa.io",
          "first_name": "DemoFirst",
          "id": 1,
          "last_name": "DemoLast",
          "username": "Demo"
        },
        "user_id": 1
      }
    }
    ```

* Error Response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Bad Request",
      "errors": {
        "businessId": "businessId is required",
        "review": "Review is required",
        "rating": "Rating must be between 1 and 5",
      }
    }
    ```

### Edit a Review

Updates and returns an existing review.

* Require Authentication: true
* Require proper authorization: Review must belong to the current user
* Request
  * Method: PUT
  * URL: /api/review/:reviewId
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "businessId": 2,
      "review": "Best Korean steakhouse in New York City",
      "rating": 5
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "review": {
        "business_id": 2,
        "created_at": "Sun, 10 Mar 2024 21:53:44 GMT",
        "id": 2,
        "rating": 5,
        "review": "Best Korean steakhouse in New York City",
        "updated_at": "Sun, 10 Mar 2024 21:53:44 GMT",
        "user": {
          "email": "demo@aa.io",
          "first_name": "DemoFirst",
          "id": 1,
          "last_name": "DemoLast",
          "username": "Demo"
        },
        "user_id": 1
      }
    }
    ```

* Error Response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Bad Request",
      "errors": {
        "businessId": "businessId is required",
        "review": "Review is required",
        "rating": "Rating must be between 1 and 5",
      }
    }
    ```

* Error response: Couldn't find a Review with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "error": "Review could not be found."
    }
    ```

### Delete a Review

Deletes an existing review.

* Require Authentication: true
* Require proper authorization: Review must belong to the current user
* Request
  * Method: DELETE
  * URL: /api/reviews/:reviewId
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Successfully deleted"
    }
    ```

* Error response: Couldn't find a Meal with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "error": "Review could not be found."
    }
    ```