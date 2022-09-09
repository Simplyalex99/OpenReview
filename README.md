# OpenReview

## Description

OpenReview provides users with customer reviews on different local businesses and services, along with statiscal insight of businesses sales and customer experience
over any period of time. In addition, OpenReview shows what product is trending and sentimental analysis
with the help of natural language processing.

## Set-Up

Clone the repository, go to the root of the directory and run the following command:

```
docker-compose build
docker-compose up
```

OR

Go to /frontend directory and run the following command:

```
npm run dev
```

This will launch the project at port 3000 (http://localhost:3000)

To enable prettier auto formatting and lint testing run the following inside /frontend folder

```
npm run format:fix
npm run format
npm run lint
```

## Motivation

I was inspired to create this app when I saw Yelp's website and Niarra Travel. I saw the opportunity to enchance yelp's review by tieing in statistics of businesses sales and trending products with the help of natural language procesing which is growing. i also wanted to make a very beautiful and interactive website like Niarra Travel.

## Tech Stack

For the frontend of this project , I chose to use Next.js framework as it provides good search engine optimization, and fast page loading time which will improve user experience. Also, Next.js has many features to enchance developer experience and make projects scalable with both static and dynamic data which is what I am aiming for. I also used Sass as it is more flexible and maintainable but also to showcase my frontend skills. However, for scalability tailwindCSS or Bootstrap would be used.

As for the backend, I am choosing Flask since it is easy to use , works well with natural language processing libraries and provides good scalability. Redis is also being used too as the data is real time.

## Challenges

Some challenges I faced in this project so far includes:

- Learning a new framework Next.js, Flask.
- Learning TypeScript.
- Facing many bugs and build issues :(.
- Tieing in Docker-compose and third party libraries.
- Learning natural language processing.

## Future goals

- Add the second feature to this app which is the dashboard page of all the statistics and sentimental analysis.
