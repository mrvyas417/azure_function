const { app } = require('@azure/functions');

app.http('appFunction', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (request,context) => {
        var mysql = require('mysql2/promise');
        var jsonBody;
        var sqlconnection = mysql.createPool({
            host: process.env.hostname,
            user: "sqladmin",
            password:  process.env.studentdbpassword,
            database: "student"
          });         

         
              var sqlquery="SELECT student_id,first_name,last_name FROM student_info";              
              var result = await sqlconnection.query(sqlquery);             
              return { body: JSON.stringify(result[0])};
    }
});
