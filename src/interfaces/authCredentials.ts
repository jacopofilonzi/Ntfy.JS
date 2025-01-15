/**
 * Interface representing authentication credentials.
 * 
 * @interface authCredentials
 * @property {string} username - The username for authentication.
 * @property {string} password - The password for authentication.
 */
interface authCredentials {
    username: string;
    password: string;
}

export default authCredentials;