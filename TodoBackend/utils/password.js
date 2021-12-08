const bycrypt = require('bcrypt');


/*
* --------------------------
* password Hashing 
* --------------------------
*/
passwordHash = (params) =>{
    
    let hash =  bycrypt.hashSync(params, 10);
    return  hash;
}

/*
*----------------------
*password compare 
* ---------------------
*/
passwordCompare = async (password,hash)=>{
    let isVerfied = bycrypt.compareSync(password,hash);
    return isVerfied
}


module.exports = {passwordHash,passwordCompare}

