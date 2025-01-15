//#region Imports
import subscriptionOptions from "./subscriptionOptions";
import authCredentials from "./authCredentials";
//#endregion

//-----------------------------------------------------------------------------------------------//

/**
 * Interface representing the options for constructing an instance.
 * 
 * @interface constructorOptions
 * 
 * @property {string} [host] - The host address.
 * @property {string} [topic] - The topic to subscribe to.
 * @property {authCredentials} [credentials] - The credentials for authentication.
 * @property {string} [authToken] - The authentication token.
 * @property {subscriptionOptions[]} [subscriptionsOptions] - The options for subscriptions.
 */

export default interface constructorOptions {
    host?: string;
    topic?: string;
    credentials?: authCredentials;
    authToken?: string;
    subscriptionsOptions?: subscriptionOptions[];
}