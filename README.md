# AlphaOfficeSetup

These scripts suuport various Workshops for the AlphaOffice usecase.
  
  1) AlphaOffice MYSQL setup uses:
     setupAlphaUser.sh
     createUserAlpha.sql
     createProducts.sql
  
    These scripts will create the Alpha user in an AlphaOfficeDB MySQL instance. Once the Alpha user
    is created the Product Catalog tables will be created and data loaded.
  
  2) AlphaOffice Container Service Classic REST API bonus lab:
     token_session
     alphaoffice-deploy.json
     alphaoffice-stack.json
     
     These scripts use the Container Service Classic REST API's to deploy the three containers
     created in previous labs. The images must be already pushed to a docker registry.
     
  3) AlphaOffice ORACLE database setup scripts (Modified to work with populating an EE version of
     the Oracle database obtained from the Oracle Docker Store
     )
     The setupAlphaDB.sql is run from within a OracleDB container from SQLPLUS using the mounted
     volume that's defined for that container.
     
     The setup does the following:
       Sets NOARCHIVELOG to conserve container disk space
       Configures HTTP and HTTPS ports for Enterprise Express
       Creates the "alpha" user in the supplied PDB
       populates the PRODUCTS and PRODUCT_CATEGORIES tables
       
     Ex: (in container)
       sqlplus / as sysdba
       SQL> @/<your-mount-point/setupAlphaDB.sql
     
       setupAlphaDB.sql
       products.in
       categories.in
  
