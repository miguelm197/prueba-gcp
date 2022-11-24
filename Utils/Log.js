const moment = require("moment");

exports.normal = (text, con = false, des = false) => {
  let fecha = moment().format("DD/MM/yyyy HH:mm:ss");
  
  if (con) console.log("");
  if (con) console.log(fecha + "  - ", text);
  if (des && con) console.log("");
  if (des && con) console.log("");
};
