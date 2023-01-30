module.exports = (schema)=>{
   return (req, res, next)=>{
    // make validate to req body
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    else{
        next()
    }
   }
}