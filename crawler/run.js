const crawler = require("./index");

crawler()
  .then((resp) => console.log(`"resp" =====>`, resp))
  .catch((err) => console.log(`err =====>`, JSON.stringify(err)));
