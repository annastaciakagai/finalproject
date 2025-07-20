const bcrypt = require('bcryptjs');

const password = 'trader2';
const hashedPassword = bcrypt.hashSync(password, 10);

console.log(hashedPassword);