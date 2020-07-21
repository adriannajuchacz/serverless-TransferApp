const { Pool } = require("pg");
const pool = new Pool({
  host: 'aa1682linxrnijl.c09xht5iw0ld.us-east-1.rds.amazonaws.com',
  user: 'monolithDB',
  password: 'DBPassword',
  port: 5432,
  database: 'ebdb'
});

async function startPool() {
  await pool
    .connect()
    .then(() => {
      console.log("connected")
    })
    .catch((e) => {
      console.log(e);
    });
  return;
}

async function endPool() {
  await pool.end();
  return;
}

async function getBalance() {
  try {
    const res = await pool.query("select * from balances;");
    let currentBalance = res.rows[0].balance;
    return currentBalance;
  } catch (error) {
    console.log(error);
  }
}

async function setBalance(bal) {
  try {
    await pool.query(`update balances set balance = ${bal};`);
  } catch (error) {
    console.log(error);
  }
}

module.exports.getBalance = getBalance;
module.exports.setBalance = setBalance;
module.exports.startPool = startPool;
module.exports.endPool = endPool;
