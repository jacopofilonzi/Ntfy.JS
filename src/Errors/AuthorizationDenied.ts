/**
 * Error thrown when the user is not authorized to perform an action.
 */
class AuthorizationDeniedError extends Error {
    /**
     * Creates an instance of AuthorizationDeniedError.
     * @param {string} message - The error message.
     */
    constructor(message: string) {
        super(message);
        this.name = 'EAuthorizationDenied';
    }
}

export default AuthorizationDeniedError;