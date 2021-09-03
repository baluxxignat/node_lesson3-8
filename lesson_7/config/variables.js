module.exports = {
    PORT: process.env.PORT || 5000,
    DATA_BASE_PORT: process.env.DB_CONNECTION_URL || 'mongodb://localhost:27017/apr-2021',
    ACCESS_SECRET_KEY: process.env.ACCESS_SECRET_KEY || 'Secret',
    REFRESH_SECRET_KEY: process.env.REFRESH_SECRET_KEY || 'Secret2'
};
