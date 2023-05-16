## API

On your local machine, all OpenReview API endpoints are under `http://localhost:5000/businesses`. Some of the endpoints use Yelp API with slight modifcation in the number of query params. You can refer to Yelp API at `https://docs.developer.yelp.com/docs/fusion-intro`. Below you will find more information about current endpoints.

If an _invalid request_ is submitted, or some other error occurs, OpenReview API returns a JSON response in the following format:

```javascript
{
  "status" : integer,
  "name" : string,
  "description"    : string
}
```

The `status` attribute describes the http status code.

The `name` attribute describes the type of error.

The `description` attribute contains the message to indicate what the specific error is.

If the _request is valid_ , OpenReview API returns a JSON in the following format for each endpoint:

_Path_ : `/autocomplete`

_HTTP Method_ : `GET`

_Reference_ : `https://docs.developer.yelp.com/reference/v3_autocomplete`

_Query Params_ :

```
text : string (required),
latitude : number (required),
longitude : number (required)
```

_Data_ :

```javascript
{

  categories: {
          alias: string,
          title: string
  }
  businesses: {
          id: string,
          name: string
  }
  terms: {
      text: Array<string>
  }

}
```

---

_Path_ : `/search`

_HTTP Method_ : `GET`

_Reference_ : `https://docs.developer.yelp.com/reference/v3_business_search`

_Query Params_:

```
text : string (required),
latitude : number (required),
longitude : number (required),
radius: number (optional),
limit: number (optional),
sort_by: string (optional; takes one of the following four: best_match, rating, review_count or distance. Default is best_match),
```

_Data_ :

```javascript
{

  businesses: {
          alias: string,
          categories: [
           {
               alias: string
               title: string
            }
          ],
          coordinates : {
               latitude: number,
               longitude: number
          } ,
          display_phone: string,
          distance: number,
          id: string,
          image_url: string,
          is_closed: bool,
          location: {
               address1: string,
               address2: string,
               address3: string,
               city: string,
               country: string,
               display_address: Array<string>,
               state: string,
               zip_code: string

          },
          name: string,
          phone: string,
          price: string,
          rating: number,
          review_count: number,
          transaction: Array<string>,
          url: string
          } ,
   region: {
       center: {
           latitude: number,
           longitude: number

       }

   },
   total: number

  }

```

---

_Path_ : `/<id>/reviews`

_HTTP Method_ : `GET`

_Reference_ : `https://docs.developer.yelp.com/reference/v3_business_reviews`

_Query Params_:

```
limit : number (optional),
sort_by : string (optional; takes one of the following four: best_match, rating, review_count or distance. Default is best_match),
```

_Data_ :

```javascript
{
   total: integer,
   reviews : [{
       id: string,
       url: string,
       text: string,
       rating: number,
       time_created: string,
       user : {
           id: string,
           profile_url: string,
           image_url: string,
           name: string
       }



   }],
   possible_languages: Array<string>
}
```

---

_Path_ : `/predictions/topics`

_HTTP Method_ : `POST`

_Body_ :

```
{
    reviews: [
        {
            text: string
        }
    ]
}
```

_Data_ :

```javascript

{

    topics:[
        
        { categories: Array<string> },
      
    ],
    status: integer
}
```

---

_Path_ : `/predictions/business-success`

_HTTP Method_ : POST

_Body_ :

```

{
    reviews: [

        {
            text: string,
            rating: number
        }


    ]

}
```

_Data_ :

```javascript

{

    successful:bool,
    positive_reviews: number,
    negative_reviews:number,
    predictions: Array<bool>,
    status: integer
}
```

---

_Path_ : `/recommendations/popular`

_HTTP Method_ : `GET`

_Query Params_:

```
category : string (required),
```

_Data_ :

```javascript
{
	businesses: [
		{
			business_id: string,
			business_name: string,
			business_rating: number,
            address: string,
            city:string,
            total_reviews: number,
            category: string,
            url: string,
            img_url: string

		},
	];

	status: integer;
}
```

---

_Path_ : `/recommendations/categories`

_HTTP Method_ : `GET`

_Query Params_:

```
category : string (required),
```

_Data_ :

```javascript

{
    categories: Array<string>,
    status: integer

}
```

### Status Codes

OpenReview's API returns the following status codes in its API:

| Status Code | Description             |
| :---------- | :---------------------- |
| 200         | `OK`                    |
| 400         | `BAD REQUEST`           |
| 404         | `NOT FOUND`             |
| 500         | `INTERNAL SERVER ERROR` |

```

```
