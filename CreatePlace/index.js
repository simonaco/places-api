const MongoClient = require('mongodb').MongoClient;
const auth = {
  user: process.env.CosmosDBUser,
  password: process.env.CosmosDBPassword
};
module.exports = function(context, req) {
  MongoClient.connect(
    process.env.CosmosDBURL,
    { auth: auth },
    (err, database) => {
      if (err) throw err;
      let place = ({ name, rating, description, img, stars } = req.body);
      var db = database.db('admin');
      db.collection('places').insertOne(
        {
          name: place.name,
          rating: place.rating,
          description: place.description,
          img: place.img,
          stars: place.stars
        },
        (err, result) => {
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
