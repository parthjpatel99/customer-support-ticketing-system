const passport = require("passport");

const userAuth = passport.authenticate("jwt", { session: false });
const serializedUser = (user) => {
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
};

const checkRole = (roles) => (req, res, next) =>
  !roles.includes(req.user.role)
    ? res.status(401).json("unauthorized")
    : next();

module.exports = {
  userAuth,
  serializedUser,
  checkRole,
};
