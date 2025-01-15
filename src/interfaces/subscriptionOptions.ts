/**
 * Interface representing the options for a subscription.
 * 
 * @interface subscriptionOptions
 * 
 * @property {string} [topic] - The topic to subscribe to.
 * @property {string} [host] - The host of the subscription service.
 * @property {{username: string, password: string}} [credentials] - The credentials for authentication.
 * @property {string} [authToken] - The authentication token.
 */
interface subscriptionOptions {
    topic?: string;
    host?: string;
    credentials?: {username: string, password: string};
    authToken?: string;
}

export default subscriptionOptions;