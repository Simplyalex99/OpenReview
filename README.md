# Business Insight Data Anayltic App

## Table Of Contents

1. [Description](https://github.com/Simplyalex99/OpenReview/tree/feat#description)
2. [Demo](https://github.com/Simplyalex99/OpenReview/tree/feat#demo)
3. [Set-Up](https://github.com/Simplyalex99/OpenReview/tree/feat#set-up)
4. [Project Summary](https://github.com/Simplyalex99/OpenReview/tree/feat#project-summary)
5. [Tech-Stack](https://github.com/Simplyalex99/OpenReview/tree/feat#tech-stack)
6. [Motivation](https://github.com/Simplyalex99/OpenReview/tree/feat#motivation)
7. [Challenges](https://github.com/Simplyalex99/OpenReview/tree/feat#challenges)
8. [API](https://github.com/Simplyalex99/OpenReview/tree/feat#api)
9. [Deployment](https://github.com/Simplyalex99/OpenReview/tree/feat#deployment)

## Description

OpenReview is a machine learning app that uses natural language processing to save businesses time and money by providing categorized customer reviews on different local businesses and services, along with business competitors and category product recommendations and prediction of the business's success based on customer reviews and ratings.

## Demo

Please visit https://open-review.vercel.app/ to try the app. Below you will find an image preview of the app.


<img src="https://github.com/Simplyalex99/OpenReview/blob/feat/docs/README_images/app/homepage.png " width="500" height="400" />


<img src="https://github.com/Simplyalex99/OpenReview/blob/feat/docs/README_images/app/dashboard.png " width="500" height="400" />


## Set-Up


To launch the app go to the root of the directory and run the following command:

```
docker-compose build
docker-compose up
```

OR

Clone the repository then install the dependencies by going inside the /frontend folder and run

```
npm install
```

Then run the following command inside /backend folder:

```
pip install -r requirements.txt
```

Then install redis in your local machine, then run

```
redis-cli
```


Then go to the root of the directory and run the command:

```
npm run dev
```

This will launch the project at port 3000 (http://localhost:3000)

To enable prettier auto formatting run the command inside /frontend directory:

```
npm run format:fix
```

To test run the following inside /frontend folder

```
npm run format
```

## Project Summary

The goal of this project is to provide businesses with key insights to make good business decisions that will save them time and potential money by:

1. Predicting if a business will be successful based on initial customer reviews and rating
2. Categorizing customer reviews by topics to gain deeper insight into different areas where the business is doing well or not
3. Recommend similar competitor businesses by category and popularity.

For more information about the final results of this task and my approach to this data science problem
see the [datascience doc](https://github.com/Simplyalex99/OpenReview/blob/feat/docs/DataScience.md)


## Tech-Stack

For this project I used the following langauges and tech-stack:

_Frontend_ : Next.js, Typescript, Sass.

_Backend_ : Flask, Redis.

_Deployment_ : Docker, Google Cloud Kubernetes.

_Figma_ : [figma design](https://www.figma.com/file/Xza7TZVW0vgrO8imo9QKbD/OpenReview?type=design&node-id=0%3A1&t=oUCpQutoFKnzfrUt-1)


## Motivation

I was inspired to create this app when I saw Yelp's website and Niarra Travel. I saw the opportunity to enchance yelp's review by tieing in natural language processing to find hidden customer review categories , reocmmendations and predicting business sucess. I also wanted to make a very beautiful and interactive website like Niarra Travel.

## Challenges

Some challenges I faced in this project so far includes:

- Learning a new framework Next.js, Flask.
- Learning TypeScript.
- Facing many bugs and build issues.
- Tieing in Docker-compose and third party libraries.
- Learning natural language processing.

## API

See the  [API doc](https://github.com/Simplyalex99/OpenReview/blob/feat/docs/API.md) for more information.


## Deployment

Backend and redis is hosted on [render](https://render.com/) and the frontend is hosted on vercel. In the root 
directory is a render.yaml file. For more information on this file please visit the [render.yaml documentation](https://render.com/docs/blueprint-spec).