'use strict';

var http = require('http')
var express = require('express')
var bodyParser = require('body-parser')
var oracledb = require('oracledb')
var mysql = require('mysql')
var dbOraConfig = require('./dbOraConfig.js');
var dbMYSQLConfig = require('./dbMYSQLConfig.js');
var datasource = process.env.DS;
var myJSON = require('./product-catalog.json');
 
var port = process.env.PORT || 8002
var app = express()

app.use(bodyParser.json())
app.use(express.static(__dirname))

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', function(req, res) {
	res.send('index.html')
})

/*
 * We define a new route /products. First thing we need to do when this route is
 * hit is get a connection, then we fire the sql and finally convert the data to
 * the format our application can consume
 */

app.get('/products', function(req, res) {

	console.log('/products api called')

  if (datasource == 'oracle') {

    oracledb.getConnection(
      {
        user          : dbOraConfig.user,
        password      : dbOraConfig.password,
        connectString : dbOraConfig.connectString
      },
      function(err, connection)
      {
        if (err) {
          console.error(err.message);
          return;
        }
        console.log("Oracle connection made...");

        connection.execute('SELECT * from PRODUCTS', [], { outFormat: oracledb.OBJECT }, function(err, result) {
            if (err) {
                console.log('Error while performing Query.');
                doRelease(connection);
                return;
            }
            console.log('sql executed')
         /*   console.log(result.rows); */
            var products = {"Products" : result.rows}
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(products));   
            doRelease(connection);
        });
      });
  } else if (datasource == 'mysql') { /* End IF block */

    var connection = mysql.createConnection({
       host     : dbMYSQLConfig.host,
       port     : dbMYSQLConfig.port,
       user     : dbMYSQLConfig.user,
       password : dbMYSQLConfig.password,
       database : 'AlphaOfficeDB'
    });

    console.log("MYSQL connection made...");
    connection.query('SELECT * from PRODUCTS', function(err, rows, fields) {
        if (err) {
            console.log('Error while performing Query.');
            return;
        }
        console.log('sql executed')
/*	    console.log(rows);  */
        var products = {"Products" : rows}
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(products));
    });

  } else {  /* end ELSE IF block */

    console.log('/products api called')
    console.log('JSON file used...')
  
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(myJSON));
  }

});

app.get('/product/:id', function(req, res) {

	console.log('/product api called')

  if (datasource == 'oracle') {

    oracledb.getConnection(
      {
        user          : dbOraConfig.user,
        password      : dbOraConfig.password,
        connectString : dbOraConfig.connectString
      },
      function(err, connection)
      {
        if (err) {
          console.error(err.message);
          return;
        }
        console.log("Oracle connection made...");

        connection.execute('SELECT * from PRODUCTS where PRODUCT_ID = ' + req.params.id, [], { outFormat: oracledb.OBJECT }, function(err, result) {
            if (err) {
                console.log('Error while performing Query.');
                doRelease(connection);
                return;
            }
            console.log('sql executed')
         /*   console.log(result.rows); */
            var products = {"Product" : result.rows}
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(products));   
            doRelease(connection);
        });
      });
  } else if (datasource == 'mysql') { /*end IF block */
    
    var connection = mysql.createConnection({
       host     : dbMYSQLConfig.host,
       port     : dbMYSQLConfig.port,
       user     : dbMYSQLConfig.user,
       password : dbMYSQLConfig.password,
       database : 'AlphaOfficeDB'
    });

    console.log("MYSQL connection made...");

    connection.query('SELECT * from PRODUCTS where PRODUCT_ID = ' + req.params.id, function(err, rows, fields) {
        if (err) {
            console.log('Error while performing Query.');
            return;
        }
	    console.log('sql executed')
	 /*   console.log(rows);  */
        var product = {"Product" : rows[0]}
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(product));
    });

  }  /* end ELSE IF block  */

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

app.listen(port, function() {
	console.log('AlphaOffice REST interface listening on port ' + port)

});
