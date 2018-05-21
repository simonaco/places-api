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
      let placeId = req.params.id;
      db
        .collection('places')
        .findOneAndDelete({ id: placeId }, (err, result) => {
          if (err) throw err;
          context.res = {
            status: 200,
            body: { message: 'place deleted successfully!' }
          };
          database.close();
          context.done();
        });
    }
  );
};
