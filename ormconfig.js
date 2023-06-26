module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'pass123',
  database: 'postgres',
  entities: ['dist/**/*.entity.ts'],
  migrations: ['dist/migrations/*.js'],
  cli: {
    magratiosDir: 'src/migrations',
  },
};
