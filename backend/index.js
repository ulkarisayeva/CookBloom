const app = require("./app");

const { API_PORT } = process.env;
const port = API_PORT || "5005";

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
