var oracledb = require('oracledb');
var dbConfig = require('./dbconfig.js');
var readline = require('readline');
var args = process.argv.slice(2);

oracledb.getConnection(
  {
    user          : dbConfig.user,
    password      : dbConfig.password,
    connectString : dbConfig.connectString
  },
  function(err, connection)
  {
    if (err) {
      console.error(err.message);
      return;
    }
    connection.execute(
      "SELECT product_id, product_name, list_price " +
        "FROM products " +
        "WHERE product_id = :id",

      // The "bind value" 180 for the "bind variable" :id
      // [1050],
      args,

      function(err, result)
      {
        if (err) {
          console.error(err.message);
          doRelease(connection);
          return;
        }
        // console.log('');
        // console.log(result.metaData); // [ { Product: 'PRODUCT_ID' }, { Name: 'PRODUCT_NAME' }, { Price: 'LIST_PRICE' } ]
        console.log('');
        console.log(result.rows);     
        doRelease(connection);
        console.log('');
      });
  });

function doRelease(connection)
{
  connection.close(
    function(err) {
      if (err) {
        console.error(err.message);
      }
    });
}
