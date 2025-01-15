/**
 * Error for when a subscription is already in the list of subscriptions
 */
class DuplicateSubscriptionError extends Error {
    /**
     * Creates an instance of DuplicateSubscriptionError.
     * @param {string} message - The error message.
     */
    constructor(message: string) {
        super(message);
        this.name = 'EDuplicateSubscription';
    }
}

export default DuplicateSubscriptionError;