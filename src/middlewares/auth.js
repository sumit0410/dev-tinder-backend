const adminAuth = (req, res, next) => {
  console.log("Admin authorization is running");
  const token = "xyz";
  const isAdminAutorized = token === "xyz";
  if (!isAdminAutorized) {
    res.status(401).send("Admin is not autorized");
  } else {
    next();
  }
};

const userAuth = (req, res, next) => {
  console.log("User authorization is running");
  const token = "xyz";
  const isUserAuthorized = token === "xyz";
  if (!isUserAuthorized) {
    res.status(401).send("User is not autorized");
  } else {
    next();
  }
};

module.exports = {
  adminAuth,
  userAuth,
};
