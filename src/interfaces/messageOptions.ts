//#region Imports
import Priority from "../enumerators/priority";
import action from "./action";
import fileAttachment from "./fileAttachment";
//#endregion

//-----------------------------------------------------------------------------------------------//

/**
 * Interface representing the options for a message.
 * 
 * @interface messageOptions
 * 
 * @property {string} host - The host of the message.
 * @property {string} [topic] - The topic of the message.
 * @property {string} [title] - The title of the message.
 * @property {string} content - The content of the message.
 * @property {Priority} [priority] - The priority of the message.
 * @property {URL} [link] - A URL link associated with the message.
 * @property {URL} [iconURL] - A URL for the icon associated with the message.
 * @property {URL | fileAttachment} [attachment] - An attachment for the message, which can be a URL or a file attachment.
 * @property {action[]} [actions] - An array of actions associated with the message.
 * @property {EpochTimeStamp} [delay] - A delay for the message, specified as an epoch timestamp.
 * @property {string[]} [emoji] - An array of emojis associated with the message.
 * @property {string} [email] - An email address associated with the message.
 * @property {string} [phoneNumer] - A phone number associated with the message.
 * @property {{username: string, password: string}} [credentials] - Credentials for authentication, consisting of a username and password.
 * @property {string} [authToken] - An authentication token for the message.
 */
interface messageOptions {
    host: string;
    topic?: string;
    title?: string;
    content: string;
    priority?: Priority;
    link?: URL;
    iconURL?: URL;
    attachment?: URL | fileAttachment;
    actions?: action[];
    delay?: EpochTimeStamp;
    emoji?: string[];
    email?: string;
    phoneNumer?: string;
    credentials?: {username: string, password: string};
    authToken?: string;
}

export default messageOptions;