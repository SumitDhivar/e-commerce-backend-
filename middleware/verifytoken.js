import jwt from 'jsonwebtoken'

const verifytoken = (req, res, next) => {
    console.log('in verifytoken doing pre-processing');
    //1-fetch jwt cookie
    const token = req.cookies.jwtcookie
    //2-check if token is valid
    if (!token) {
        //5-else return error
        return res.status(401).send({ message: "Token not found" });
    }
    //3-validate token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        req.user = decoded;
    } catch (error) {
        return res.status(401).send({ message: "Invalid token" });
    }
    //4-if validate success
    next();
    console.log('in verifytoken doing post-processing');

}

export default verifytoken;