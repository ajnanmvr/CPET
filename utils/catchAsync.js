module.exports = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((next) => {
      console.log(next);
    }); //next catches the error
  };
};
