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
      console.log('Connected succesfully');
      const db = database.db('admin');
      db
        .collection('places')
        .find()
        .toArray((err, result) => {
          if (err) throw err;
          context.log('This is a happy moment');
          result.forEach(place => delete place._id);
          context.res = {
            //status: 200,
            body: result
          };
          database.close();
          context.done();
        });
    }
  );
};
