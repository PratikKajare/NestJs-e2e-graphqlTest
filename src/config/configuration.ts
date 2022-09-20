export default () => ({
  application: {
    port: parseInt(process.env.PORT, 10) || 3000,
  },
  database: {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABSE_PORT,
    name: process.env.DATABASE_NAME,
    mongoDb: process.env.DATABASE_MONGODb,
  },
});
