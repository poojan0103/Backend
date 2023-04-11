const bcrypt = require("bcryptjs")
const saltRounds = 10
const hashPassword = async(password)=>{
    var hashedPassword = await bcrypt.hash(password,saltRounds);
    
    return hashedPassword;
}

const comparePassword = async(password,hashedPassword)=>{
    var isMatch = await bcrypt.compare(password,hashedPassword);
    return isMatch;
}

module.exports = {hashPassword,comparePassword}  