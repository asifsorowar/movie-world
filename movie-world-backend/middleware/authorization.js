module.exports = (req, res, next) => {
  if (!req.headers.authorization) res.status(403).send("unauthorized request!");

  req.body.userId = req.headers.authorization;

  return next();
};
