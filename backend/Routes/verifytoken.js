const jwt = require('jsonwebtoken');

module.exports  = function( req, res, next ){

    var token = req.header("auth-token");
    if(!token) return res.send("access denied");

    try{
        const verified = jwt.verify(token, process.env.Secret_text);
        req.user = verified;
        next();
    }
    catch(err)
    {
        res.status(400).send("invalid token.")
    }

}