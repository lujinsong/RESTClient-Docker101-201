FROM store/oracle/database-instantclient:12.2.0.1
# Create app directory

WORKDIR /usr/src/app

RUN curl --silent --location https://rpm.nodesource.com/setup_9.x | bash -
RUN yum install -y nodejs
RUN yum install -y gcc-c++ make
RUN npm install oracledb express body-parser http jwt-simple lodash mysql
RUN yum install -y git vi ftp
RUN git clone https://github.com/wvbirder/node-oracledb

# If you are building your code for production # RUN npm install --only=production
# Bundle app source

COPY . .

EXPOSE 8002

# CMD [ "/bin/bash" ]
CMD [ "npm", "start" ]
