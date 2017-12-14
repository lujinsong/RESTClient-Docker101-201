# AlphaOffice RESTClient buildout

These scripts suuport the Docker 101-201 Workshops for the AlphaOffice usecase.

The Dockfile will build a new image locally in your docker environment. It pulls the Oracle Instant Client 12.2.x
from the Oracle Docker Store as the baseline.

The image contains a Node.js application used to connect to defined datasources. Right now it supports Oracle 12c DB, MYSQL and a flat JSON file containing the PRODUCTS list used in the AlphaOffice Catalog UI.

It runs in conjunction with any of the above datasources. In the case of an Oracle DB or MYSQL DB these databases need to already
be running in other containers on the same docker subnet. They have also been populated with the AlphaOffice schema that is queried via this REST interface. The interface in turn is referenced from the Product Catalog UI container.

This image is targeted towards supporting the advanced docker workshops created within the Solution Engineering group of Oracle Corporation.

To Build:

1) Change into the directory where the Dockerfile resides
2) docker build -t npm/restclient .

To Run: 
(Depends on your datasource. These examples assume an Oracle or MYSQL datasource populated with the Alpha Office schema)
The creation and population of those datasource containers are part of the Docker workshop series and require support files from another
git repo)

Example for Oracle DB: (Assumes container hostname to be 'oracledb-ao') 

docker run -d -it --rm --name restclient -p=8002:8002 --link orcl:oracledb-ao -e ORACLE_CONNECT='oracledb-ao/orclpdb1.localdomain' -e DS='oracle' npm/restclient

Example for MYSQL DB: (Assumes container hostname to be 'mysqldb-ao') 

docker run -d -it --rm --name restclient -p=8002:8002 --link mysql:mysqldb-ao -e MYSQL_HOST='mysqldb-ao' -e DS='mysql' npm/restclient
  
Example for JSON file:

docker run -d -it --rm --name restclient -p=8002:8002 -e DS='json' npm/restclient

When running you can test in a local browser at "localhost:8002/products". You should get 57 JSON formatted records returned...
 
