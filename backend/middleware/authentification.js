const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

        req.user = decoded._id;
    } catch (err) {
        console.log(err, "err")
        return res.status(401).send("Invalid Token");
    }
    return next();
};

module.exports = verifyToken;