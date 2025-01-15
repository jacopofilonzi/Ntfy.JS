/**
 * Error for when the host is invalid
 */
class InvalidHostError extends Error {
    /**
     * Creates an instance of InvalidHostError.
     * @param {string} message - The error message.
     */
    constructor(message: string) {
        super(message);
        this.name = 'InvalidHostError';
    }
}

export default InvalidHostError;