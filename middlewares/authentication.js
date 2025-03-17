const { validateToken } = require("../services/authentication");

function checkForAuthenticationCookie(cookieName) {
    return (req, res, next) => {
        const tokenCookieValue = req.cookies[cookieName];

        if (!tokenCookieValue) {
            return next(); // ✅ Stops execution if no cookie
        }

        try {
            const userPayload = validateToken(tokenCookieValue);
            req.user = userPayload;
        } catch (error) {
            return next(); // ✅ Prevents calling next() twice
        }

        next();
    };
}

module.exports = {
    checkForAuthenticationCookie,
};