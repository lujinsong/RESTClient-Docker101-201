module.exports = {
  user          : process.env.ORACLE_USER || "alpha",
  password      : process.env.ORACLE_PASSWORD || "Alpha2017_",
  connectString : process.env.ORACLE_CONNECT || "172.17.0.3/orclpdb1.localdomain",
  externalAuth  : process.env.ORACLE_EXTERNALAUTH ? true : false
};
