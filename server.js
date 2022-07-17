const mongoose = require("mongoose");
const app = require("./app");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./models/graphQlShema");

mongoose.connect(process.env.MONGO_URI, (err) => {
  if (!err) {
    console.log("connected to mongo");
  } else {
    console.log(err);
  }
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development",
  })
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
