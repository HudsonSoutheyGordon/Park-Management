import mysql from 'mysql';

let pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : '*****',
  password        : '*****',
  database        : '*****',
  dateStrings     : true
});
export default pool;
