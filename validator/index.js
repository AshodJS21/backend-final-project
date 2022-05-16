const { check, body, validationResult, query, header } = require('express-validator')

const validator = (validations) => async (req, res, next) => {
    for (let validation of validations) {
        const result = await validation.run(req);
        if (result.errors.length) break;
    }
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }

    res.status(400).json({ errors: errors.array() });
}

module.exports = {
    login: validator([
        check('userEmail').exists()
            .withMessage('no email'),
        check('userPassword').exists()
            .withMessage('no password')
    ]),

    createTask: validator([

        check('taskName').exists()
            .withMessage('no task-name'),
        check('taskDescription').exists()
            .withMessage('no task description'),
        check('taskStatus').exists()
            .withMessage('no task-status'),
        check('taskImage').exists()
            .withMessage('no task-image'),
        check('clientId').exists()
            .withMessage('no client id'),
        check('workerId').exists()
            .withMessage('no worker id')

    ]),
    
    updateTask: validator([
        check('taskStatus').exists()
            .isIn(['pending', 'in progress', 'completed'])
            .withMessage('no task status'),
    ]),


    //user creater validation
    createUser: validator([

        check('userName').exists()
            .withMessage('no username'),
        check('userEmail').exists()
            .withMessage('no useremail'),
        check('userPassword').exists()
            .withMessage('no user password'),
        check('userRole').exists()
            .withMessage('no user role'),
            
    ]),
}