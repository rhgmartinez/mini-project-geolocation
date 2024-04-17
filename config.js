const config = {
    db: {
      /* don't expose password or any sensitive info, done only for demo */
      host: "localhost",
      port:"3306",
      database: "mini_project",
      user: "root",
      password: "",
      connectTimeout: 60000
    },
    listPerPage: 30,
  };
  module.exports = config;