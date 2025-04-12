// validations.js
exports.validateRequest = (req, requiredParams, paramTypes) => {
    // التحقق من وجود جميع المعلمات المطلوبة
    for (const param of requiredParams) {
        if (!req.body[param]) {
            return { valid: false, message: `يجب إرسال ${param}.` };
        }
    }

    // التحقق من أنواع المعلمات
    if (paramTypes) {
        for (const param in paramTypes) {
            if (typeof req.body[param] !== paramTypes[param]) {
                return { valid: false, message: `${param} يجب أن يكون من نوع ${paramTypes[param]}.` };
            }
        }
    }

    return { valid: true };
};