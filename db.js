const{Pool}= require('pg');
const pool = new Pool({
user: "postgres",
password:"8587",
database: "myschool",
host:"localhost",
port:5432
});

module.exports=pool;