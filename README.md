# mini-project-geolocation
A project that uses NodeJS and ExpressJS

Please check Mini-project.pdf for more information. 


**INITIAL INSTRUCTIONS**

1. Install the following in your system/local machine: Visual Studio Code, Node & Postman
2. Download/Clone the repository and configure the database information in config.js and database.json using your mysql local/server.
3. Open the project in Visual Studio code and run the following command in the terminal to install Node Package Manager
   >npm install

**INSTALLATION GUIDE FOR NEEDED LIBRARIES**
1. Run the following command in your terminal to install the needed libraries:
   >npm install express
   
   >npm install mysql2
   
   >npm install -g db-migrate
   
   >npm install -g db-migrate-mysql

Note: If db-migrate does not work, there might be restricted access in executing migration scripts. 

You can unrestrict your current user using this command, run your Windows Powershell in Administrator mode:
>Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy Unrestricted

**TO RUN THE APPLICATION**
>node app.js

**COMMANDS FOR MIGRATION**
1. To add table using migration script
   >db-migrate up 

2. To drop table using migration script
   >db-migrate down

3. I haven't done a seeding script so for data values of the migrated tables, please run the queries inside seed_query.sql, I prepared the queries by converting the rows from excel sheet into a query. 

**====================================================================================**

**POSTMAN GUIDE**

You can import the postman collection named Mini-Project-NodeJS_geolocation.postman_collection

Play around the collection, here are the short description of the APIs in that collection:

1. For API: localhost:3050/mini-project-node-js/find-treasure-box-with-prize-value
> The result shows the treasure box from the table: treasures where the distance difference from it is ABOUT distance1 or ABOUT distance2 km (ROUNDED OFF DISTANCE) AND prize_value of it is based on prize_value input or as default 10 and treasure box has the least amount.

2. For API: localhost:3050/mini-project-node-js/find-treasure-box-within-radius
> The results shows the treasure boxes from the table: treasures where the distance difference from it is ABOUT distance1 or ABOUT distance2 km (ROUNDED OFF DISTANCE).

3. For API: localhost:3050/mini-project-node-js/
> The results shows the values inside all tables (treasures, users and money_values).

4. For API: localhost:3050/mini-project-node-js/find-closest-treasure-box
> The result shows the closest treasure box from the given point.

