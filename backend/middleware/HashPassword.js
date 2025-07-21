import bcrypt from "bcryptjs";
const hashpassword=(req,res,next)=>{
     req.body.password=bcrypt.hashSync(req.body.password,8);
     next();
}
export {
    hashpassword
}