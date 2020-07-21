const db = require("./db");

exports.handler = async (event) => {
  db.startPool();

  try {
    let bal = await db.getBalance();
    bal = bal + 100;
    await db.setBalance(bal);
    const response = {
      statusCode: 200,
      body: JSON.stringify(bal),
    };
    return response;
  } catch (e) {
    const response = {
      statusCode: 500,
      body: JSON.stringify(e),
    };
    return response;
  }
};
