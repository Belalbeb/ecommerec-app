import jwt from "jsonwebtoken"



export const verifyToken = (req, res ,next)=>{
    let { token } = req.headers;
        jwt.verify(token,"belal", (err, decoded)=>{
            if(err) return res.status(400).json({err})
                req.user= decoded
            
               next()
        })
}