/**
 * Error when a topic is invalid
 */
class InvalidTopicError extends Error {
    /**
     * Creates an instance of InvalidTopicError.
     * @param {string} message - The error message.
     */
    constructor(message: string) {
        super(message);
        this.name = 'EInvalidTopic';
    }
}

export default InvalidTopicError;