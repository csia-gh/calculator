const dotenv = require('dotenv');
dotenv.config();
const app = require('./server');

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`App is listening at port ${port}`);
});
