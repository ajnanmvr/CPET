const mongoose = require("mongoose");
const app = require("./app");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./models/graphQlShema");
const AppError = require("./utils/AppError");
const globalError = require("./utils/gloablErrors");


mongoose.connect(process.env.MONGO_URI, (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log("connected to mongo");
  }
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development",
  })
);

app.all("*", (req, res, next) => {
  next(new AppError(`Cant find ${req.originalUrl}  on the server`, 404));
});
app.use(globalError);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
