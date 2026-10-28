import {validationResult} from 'express-validator'

export const validatorCheck = (request,respond,next) => {
    const result = validationResult(request);
    if (!result.isEmpty()){
        return respond.status(400).json({
            errors:result.array(),
        })
    }
    next();
}

export const createUserValidatioinSchema = {
    username:{
        isLength:{
            options:{
                min: 5,
                max: 35
            }
        },
        notEmpty: true,
        isString: true,
    },
    password:{
        isLength:{
            options:{
                min:4,
                max:12
            }
        },
        isString:true,
        notEmpty:true
    }
}