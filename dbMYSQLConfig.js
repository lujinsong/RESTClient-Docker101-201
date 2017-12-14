module.exports = {
  user          : process.env.MYSQL_USER || "alpha",
  password      : process.env.MYSQL_PASSWORD || "Alpha2017_",
  port          : process.env.MYSQL_PORT || "3306",
  host          : process.env.MYSQL_HOST || "172.17.0.5"
};
