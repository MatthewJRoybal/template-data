const collections = {
  users: true,
  posts: true
};

module.exports = function(DB, config) {
  return new Promise((resolve, reject) => {
    DB.db(process.env.DB_NAME);
    console.log(DB);
    Object.keys(collections)
      .filter(collection => collections[collection])
      .forEach(collection => {
        DB.createCollection(collection);
      });
    resolve();
  })
}