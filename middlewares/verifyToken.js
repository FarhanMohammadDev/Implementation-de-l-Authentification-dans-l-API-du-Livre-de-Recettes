const jwt = require("jsonwebtoken")
// verify Token
function verifyToken(req,res,next) {
    
    const token =  req.headers.token;
    if (token) {
        try {
            const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY)  
            console.log("Decoded Token:", decoded);
            req.user = decoded;
            next();
        } catch (error) {
            console.error("Token Verification Error:", error);
            res.status(401).json({message:"No token provided"}) 
        }
    } else {
        res.status(401).json({message:"No token provided"})
    }
}

// verify Token & Authorize the user

function verifyTokenAndAuthorization(req,res,next) {
    verifyToken(req,res, ()=>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next();
        }else{
            return res.status(403) // forbidden
            .json({message: "You are not allowed"}) // Unauthorized
        }
    } );
}

// verify Token & Authorize the user
function verifyTokenAndAdmin(req,res,next) {
    verifyToken(req,res, ()=>{
        if(req.user.isAdmin){
            next();
        }else{
            return res.status(403) // forbidden
            .json({message: "You are not allowed, only admin allowed"}) // Unauthorized
        }
    } );
}

module.exports = {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin
}