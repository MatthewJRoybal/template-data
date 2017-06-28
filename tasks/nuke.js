module.exports = function(DB, config) {
  return new Promise((resolve, reject) => {
    DB.dropDatabase().then(resolve).catch(reject);
  });
}