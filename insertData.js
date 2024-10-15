const { sql } = require("@vercel/postgres");
const xlsx = require("xlsx");

const insertData = async () => {
  const workbook = xlsx.readFile("data_to_pos.xlsx");
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const data = xlsx.utils.sheet_to_json(sheet, { header: 1 });
  // eslint-disable-next-line no-restricted-syntax
  for await (const row of data) {
    const [address, addressDetail, lat, lng] = row;
    try {
      await sql`INSERT INTO "trashcan_info" (address, "addressDetail", latitude,longitude ,"userId") VALUES (${address}, ${addressDetail}, ${lat}, ${lng}, 1)`;
    } catch (err) {
      console.error(err);
    }
  }
};

const dropData = async () => {
  try {
    await sql`DELETE FROM "trashcan_info"`;
  } catch (err) {
    console.error(err);
  }
};

dropData();
insertData();
const show = async () => {
  try {
    const res = await sql`SELECT * FROM "user"`;
    console.log("res", res);
  } catch (err) {
    console.error(err);
  }
};
