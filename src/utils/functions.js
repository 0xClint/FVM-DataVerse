import { Database } from "@tableland/sdk";

// const mainPetitionTableID = "allPetition_80001_6408";   old

// Deployed on Polygon
// const mainPetitionTableID = "allPetition_80001_6419";

// Deployed on FileCoin
const mainPetitionTableID = "allPetition_3141_194";

export async function createMainPetitionTable(signer) {
  const db = new Database(signer);

  const { meta: allPetition } = await db
    .prepare(
      `
    CREATE TABLE 
        allPetition
    (   
        addr TEXT,
        name TEXT,
        title TEXT,
        description TEXT,
        tag TEXT,
        min_sign INTEGER,        
        cur_sign INTEGER,
        sign_table TEXT,
        cid TEXT,
        PRIMARY KEY(sign_table)
    );
  `
    )
    .run();

  await console.log(allPetition.txn.name);

  return allPetition.txn.name;
}

export async function createPetitionTable(signer, data) {
  const db = new Database(signer);
  console.log(typeof data.addr);
  //   Get user addr, name, msg, amount donated (if tx happens)
  const { meta: petitionSign } = await db
    .prepare(
      `
      CREATE TABLE
          ${data.addr.slice(2)}
      (
          addr TEXT,
          name TEXT,
          msg TEXT,
          don TEXT
      );
    `
    )
    .run();
  await petitionSign.txn.wait();

  console.log(petitionSign.txn.name);
  let petitionSignature = petitionSign.txn.name; // `{prefix}_{chainId}_{tableId}`

  //   ********************************************************
  const { meta: addPetition } = await db
    .prepare(
      `INSERT INTO ${mainPetitionTableID} (addr,name,title,description,tag,min_sign,cur_sign,sign_table,cid) VALUES
    ( ?,?,?,?,?,?,?,?,?);
    `
    )
    .bind(
      data.addr,
      data.pseudoName,
      data.title,
      data.description,
      data.tag,
      data.minimum_signature,
      data.current_signature,
      petitionSignature,
      data.CID_from_lighthouse
    )
    .run();
  // Wait for transaction finality
  await addPetition.txn.wait();

  // Perform a read query, requesting all rows from the table
  const { results } = await db
    .prepare(`SELECT * FROM ${mainPetitionTableID};`)
    .all();
  console.log(results);

  //   ****************************************************************
}

export async function signPetition(signer, data) {
  const db = new Database(signer);

  const { meta: signPetition } = await db
    .prepare(`INSERT INTO ${data.sign_table} VALUES (?,?,?,?);`)
    .bind(data.addr, data.name_of_signer, data.message, data.donation_amount)
    .run();

  await signPetition.txn.wait();

  const { results } = await db
    .prepare(`SELECT * FROM ${data.sign_table};`)
    .all();
  console.log(results);

  const { meta: updateSignCount } = await db
    .prepare(
      `
    UPDATE 
        ${mainPetitionTableID}
    SET 
        cur_sign = cur_sign+1 
    WHERE
        addr=?1 AND sign_table=?2
    ;
  `
    )
    .bind(data.addr, data.sign_table)
    .run();
  await updateSignCount.txn.wait();
}

export async function readData(signer, data) {
  const db = new Database({ signer });
  const { results } = await db.prepare(`SELECT * FROM ${data};`).all();

  // console.log(results);
  return results;
}

export async function findData(data) {
  const db = new Database();

  const { results } = await db
    .prepare(
      `SELECT * FROM ${mainPetitionTableID} WHERE sign_table = '${data}';`
    )
    .all();

  // console.log(results);
  return results[0];
}
