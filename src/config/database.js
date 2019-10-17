module.exports = {
  dialect: 'postgres',
  username: 'postgres',
  password: 'docker',
  host: 'localhost',
  database: 'gobarber',
  define: {
    timestamp: true,
    underscored: true,
    underscoredAll: true
  }
};
