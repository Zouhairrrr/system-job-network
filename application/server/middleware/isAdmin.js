const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const { token } = req.body
    const decodedToken = jwt.verify(token,'secret1234')
    if(decodedToken.role == 'admin')
        return next()
    res.status(403).json({ message: 'forbeddin accesss'})
}