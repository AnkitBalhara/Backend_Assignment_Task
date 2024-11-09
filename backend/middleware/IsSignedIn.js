const jwt = require("jsonwebtoken");


function isSignedIn(req, res, next) {
    if (req.cookies.token === "" || !req.cookies.token) {
      res.redirect("/login/findUser");
    } else {
      let data = jwt.verify(req.cookies.token, "secretkey");
      // console.log(data);
      req.user = data;
      next();
    }
  }

  module.exports= isSignedIn;