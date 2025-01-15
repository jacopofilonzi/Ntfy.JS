/**
 * Error thrown when the credentials provided are invalid.
 */
class InvalidCredentialsError extends Error {
    /**
     * Creates an instance of InvalidCredentialsError.
     * @param {string} message - The error message.
     */
    constructor(message: string) {
        super(message);
        this.name = 'EInvalidCredentials';
    }
}

export default InvalidCredentialsError;