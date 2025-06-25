const { getUser } = require("../service/auth");

const checkForAuthentication = (req, res, next) => {
  const tokenCookie = req.cookies?.token;
  req.user = null;
  if (!tokenCookie) return next();
  const user = getUser(tokenCookie);
  req.user = user;
  return next();
};

const restrictTo = (roles = []) => {
  return function (req, res, next) {
    // console.log("restrictTo", req)
    if (!req.user) return res.redirect("/login");
    if (!roles.includes(req.user.role)) return res.end("Unauthorized");
    return next();
  };
};

module.exports = {
  checkForAuthentication,
  restrictTo,
};
