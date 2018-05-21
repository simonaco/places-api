const MongoClient = require('mongodb').MongoClient;
const auth = {
  user: process.env.CosmosDBUser,
  password: process.env.CosmosDBPassword
};
module.exports = function(context, req) {
  context.log('JavaScript HTTP trigger function processed a request.');
  MongoClient.connect(
    process.env.CosmosDBURL,
    { auth: auth },
    (err, database) => {
      if (err) throw err;
      const db = database.db('admin');
      let place = ({ name, rating, description, img, stars } = req.body);
      let placeId = req.params.id;
      db.collection('places').findOneAndUpdate(
        { id: placeId },
        {
          id: placeId,
          rating: place.rating,
          name: place.name,
          description: place.description,
          img: place.img,
          stars: place.stars
        },
        (err, places) => {
          if (err) throw err;
          context.res = {
            body: place
          };
          database.close();
          context.done();
        }
      );
    }
  );
};
