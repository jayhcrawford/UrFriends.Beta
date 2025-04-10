const app = require("./app");
const https = require("https");
const fs = require('fs');


// const PORT = process.env.PORT;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

const options = {
  key: fs.readFileSync('./certs/localhost-key.pem'),
  cert: fs.readFileSync('./certs/localhost.pem')
};

https.createServer(options, app).listen(3000, () => {
  console.log("Express running at https://localhost:3000/");
});
