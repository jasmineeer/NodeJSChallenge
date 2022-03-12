const {body} = require(`express-validator`)

exports.validate = [
    // validasi username
    body(`username`).notEmpty()
    .withMessage(`Username must be filled`),
    // validasi password
    body(`password`).isLength({min: 8})
    .withMessage(`Password need to be at least 8 characters`)
]