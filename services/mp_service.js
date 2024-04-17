const db = require('./db');
const helper = require('../helper');
const config = require('../config');

//bonus API to show the list of each tables.
async function showAll(page = 1){
    const offset = helper.getOffset(page, config.listPerPage);
    const list_treasures = await db.query(
        `SELECT * FROM treasures LIMIT ${offset},${config.listPerPage}`
    );

    const list_money_values = await db.query(
        `SELECT * FROM money_values LIMIT ${offset},${config.listPerPage}`
    );

    const list_users = await db.query(
        `SELECT * FROM users LIMIT ${offset},${config.listPerPage}`
    );

    const data = {
        treasures: helper.emptyOrRows(list_treasures),
        money_values: helper.emptyOrRows(list_money_values),
        users: helper.emptyOrRows(list_users)
    };
    const meta = {page};
  
    return {
      data,
      meta
    }
}


async function findTreasureBoxWithinRadius(params){
  const result = await db.query(
    `SELECT name, latitude, longitude, 
    ( 6371 * acos( cos( radians(${params.latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${params.longitude}) ) + sin( radians(${params.latitude}) ) * sin( radians( latitude ) ) ) ) 
    AS distance FROM treasures HAVING ROUND(distance)=${params.distance1} OR ROUND(distance)=${params.distance2} ORDER BY distance ASC;`
  );

  return {result};
}

async function findTreasureBoxWithPrizeValue(params){
  const pv = params.prize_value?params.prize_value:10;
  const result = await db.query(
    `SELECT filtered_treasures.name AS name, money_values.amt AS prize_value 
    FROM money_values 
    JOIN 
    (
      SELECT id, name, ( 6371 * acos( cos( radians(${params.latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${params.longitude}) ) + sin( radians(${params.latitude}) ) * sin( radians( latitude ) ) ) ) AS distance 
      FROM treasures 
      HAVING ROUND(distance)=${params.distance1} OR ROUND(distance)=${params.distance2}
    )AS filtered_treasures ON money_values.treasure_id = filtered_treasures.id 
    WHERE money_values.amt >=${pv} 
    ORDER BY money_values.amt ASC
    LIMIT 1;`
  );
    return {result};
}

//bonus
async function findClosestTreasureBox(params){
    const result = await db.query(
      `SELECT *, ( 6371 * acos( cos( radians(${params.latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${params.longitude}) ) + sin( radians(${params.latitude}) ) * sin( radians( latitude ) ) ) ) AS distance 
      FROM treasures HAVING ROUND(distance) > 0 ORDER BY distance ASC LIMIT 1;`
    );
  
    return {result};
  }
  

module.exports = {
    showAll,
    findTreasureBoxWithinRadius,
    findTreasureBoxWithPrizeValue,
    findClosestTreasureBox
}