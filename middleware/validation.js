import { body, validationResult } from "express-validator";

const validation = (req, res, next) => {
    //check if name is not empty
    console.log('in validation doing pre-processing');
    //if yes allow
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array() });
    }
    next();
};

export default validation;