const path = require('path');

module.exports = {
    PORT: process.env.PORT || 5000,
    pathToViews: path.join(process.cwd(), 'lesson_3', 'views'),
    pathToDatabase: path.join(process.cwd(), 'lesson_3', 'dataBase', 'users.json')
};
