const verifyadminrole = (req, res, next) => {

//check if tokenhas roles and roles has ADMIN
 const user = req.user;

 if ( !user ){
    return res.status(401).send ({ message: 'NOT Authenticated' });
 }
 const roles = user.role;

    if(!roles.includes('admin')){
        return res.status(403).send({message: 'not authorized '})
    }
    next();
}

export default verifyadminrole;