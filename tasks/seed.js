const faker = require('faker');

function generateUsers() {
	return {
		username: faker.internet.userName(),
		password: faker.internet.password()
	}
}

function insertUsers(config) {
	const seedUsers = [];
	for(let i = 1; i <= (config.count || 250); i++) {
		seedUsers.push(generateUsers());
	}
  console.log(seedUsers);
	return seedUsers;
}

module.exports = function(DB, config) {
  return new Promise((resolve, reject) => {
   console.log(config); DB.collection('Users').insertMany(insertUsers(config)).then(resolve).catch(reject);
  });
}