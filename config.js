const Pool = require ('pg').Pool;

// TEST

// const pool= new Pool({
//   user: "postgres",
//   password:"tairha1261",
//   host:"localhost",
//   port:5432,
//   database:"TaskManagement"
//   });

const pool=new Pool ({
  user: "zydhkzdonpmqwx",
  password:"b9cbdf88c750f9237042d002950cf61a3fbee49d7ce49756f3a7b7fb48b71e7e",
  host:"ec2-35-168-145-180.compute-1.amazonaws.com",
  port:5432,
  database:"degl04om6fj02q",
  ssl: { rejectUnauthorized: false }});
  module.exports = pool;
 

