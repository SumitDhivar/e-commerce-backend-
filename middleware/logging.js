const logging = (req,res,next) => {
    console.log('in logging doing pre-processing');
    next();
    console.log('in logging doing post-processing');
}

export default logging;