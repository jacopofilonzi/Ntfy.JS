//#region Imports
//Interfaces
import constructorOptions from "./interfaces/constructorOptions";
import subscriptionOptions from "./interfaces/subscriptionOptions";
import messageOptions from "./interfaces/messageOptions";
import ntfyResponse from "./interfaces/ntfyResponse";
//Enumerators
import Priority from "./enumerators/priority";
//Utils
import { b64encoder } from "./utils/base64";
//Errors
import DuplicateSubscriptionError from "./Errors/DuplicateSubscription";
import AuthorizationDeniedError from "./Errors/AuthorizationDenied";
import InvalidCredentialsError from "./Errors/InvalidCredentials";
import InvalidTopicError from "./Errors/InvalidTopic";
//External modules
import { EventSource } from "eventsource";
import { EventEmitter } from "stream";
import axios from "axios";
import path from "path";
import InvalidHostError from "./Errors/invalidHost";
import checkHostAddress from "./utils/checkHostAddress";
//#endregion

//-----------------------------------------------------------------------------------------------//

/**
 * A client for ntfy in Node.js using TypeScript
 * 
 * @class Ntfy
 * @extends {EventEmitter}
 */
class Ntfy extends EventEmitter{
    //#region Properties
    private host: string;
    private topic?: string;

    private credentials?: {username: string, password: string};
    private authToken?: string;

    private subscriptions: Map<string, EventSource>;
    //#endregion

    //#region Constructor
    /**
     * 
     * @param options Options for the Ntfy class
     * @throws InvalidHostError if the host is not a valid URL
     * @throws InvalidTopicError if the topic is not specified by the options or the constructor
     * @throws AuthorizationDeniedError if the host requires credentials and none are provided
     * @throws InvalidCredentialsError if the credentials provided are invalid
     * @throws Error if the request fails for any other reason
     * 
     * @example
     *  const ntfy = new Ntfy({
     *      host: 'https://ntfy.sh',
     *      topic: 'topic',
     *      credentials: {
     *          username: 'username', 
     *          password: 'password'
     *     },
     *      authToken: 'authToken',
     *      subscriptionsOptions: [
     *          { 
     *              topic: 'topic1'
     *          },
     *          { 
     *              topic: 'topic2', 
     *              credentials: { 
     *                  username: 'username', 
     *                  password: 'password' 
     *              }
     *          },
     *          { 
     *              topic: 'topic3',
     *              authToken: 'authToken 
     *          }
     *      ]
     *  });
     * 
     * @example
     * const ntfy = new Ntfy();
     * //Clean istance
     * //host: 'https://ntfy.sh'
     * //default topic: undefined
     * //No credentials set
     * //No authToken set
     * //No subscriptions 
     */
    constructor(options?: constructorOptions) {
        super();

        //Validate host
        if (options?.host && !checkHostAddress(options.host))
            throw new InvalidHostError('Use http[s]://<host\' ip or domain>[:port]');
        else
            this.host = options?.host ?? "https://ntfy.sh";

        //insert topic
        this.topic = options?.topic;

        //insert credentials
        this.credentials = options?.credentials
        this.authToken = options?.authToken; 
        this.subscriptions = new Map<string, EventSource>();
        
        //Subscribe to topics if any
        for (const _subscription of options?.subscriptionsOptions ?? []) {
            this.subscribe(_subscription);
        }

    }
    //#endregion

    //#region Publisher

    /**
     * Send a message to the default or specified topic
     * 
     * @param options options for the message to be sent
     * @returns {Promise<ntfyResponse>}Response from the server
     * @throws InvalidHostError if the host is not a valid URL
     * @throws InvalidTopicError if the topic is not specified by the options or the constructor
     * @throws AuthorizationDeniedError if the host requires credentials and none are provided
     * @throws InvalidCredentialsError if the credentials provided are invalid
     * @throws Error if the request fails for any other reason
     * 
     */
    public async send(options: messageOptions): Promise<ntfyResponse> {

    //#region Checks
        //Validate host
        if (options.host !== undefined && !checkHostAddress(options.host))
            throw new InvalidHostError('Use http[s]://<host\' ip or domain>[:port]'); 
    
        //Validate topic
        if (!options.topic && !this.topic)
            throw new InvalidTopicError("undefined is not a valid topic");

    //#endregion

    //#region Define headers
        const headers: any = {};

        //Authorization token
        if (options.authToken || this.authToken)
            headers['Authorization'] = `Bearer ${options.authToken ?? this.authToken}`;

        //Message title
        if (options.title)
            headers['Title'] = options.title;

        //Message priority
        headers['Priority'] = options.priority ?? Priority.Default;

        //Utility link
        if (options.link)
            headers["Click"] = options.link.toString();

        //Message icon
        if (options.iconURL)
            headers['Icon'] = options.iconURL.toString();
        
        //Parse attachments
        if (options.attachment)
        {
            if (options.attachment instanceof URL)
                headers['Attach'] = options.attachment.toString();
            else
                headers["Filename"] = options.attachment.filename;
        }

        //Message delay
        if (options.delay)
            headers['Delay'] = options.delay;

        //Message emoji tags
        if (options.emoji)
            headers['Tags'] = options.emoji.join(',');

        //Message action buttons
        if (options.actions)
            headers['Actions'] = () => {
                let strings: string[] = [];
                // action=<action1>, label=<label1>, paramN=... [; action=<action2>, label=<label2>, ...]

                options.actions!.forEach(action => {
                    strings.push(`${action.type}, ${action.label}, $action.url`);
                });

                return `Actions: ${strings.join(';')}`;
            }

        if (options.email)
            headers['Email'] = options.email;

        if (options.phoneNumer)
            headers['Call'] = options.phoneNumer;

    //#endregion

    //#region Send request
        try 
        {
            //Define url
            const url = new URL(path.join(this.host,  options.topic! ?? this.topic)).toString()

            if (options.attachment === undefined || options.attachment instanceof URL)
            {
                //Axios post request
                const response = await axios.post(url, options.content, {
                    auth: this.credentials,
                    headers: headers,
                })
                return response.data as ntfyResponse;
            }
            else
            {
                //Axios put request
                const response = await axios.put(url, options.attachment.buffer, {
                    auth: this.credentials,
                    headers: headers,
                })
                return response.data as ntfyResponse;
            }
        }
        catch (error: any) //Catch request errors
        {            
            if (error.response)
                switch (error.response.status) {
                    case 403: //Credentials required
                    throw new AuthorizationDeniedError(error.response.data);
                    break;
                
                    case 401: //Invalid credentials
                    throw new InvalidCredentialsError(error.response.data);
                    break;

                    default: //Not mapped error
                    throw new Error(error);
                    break;
                }
            else
                throw new Error(error);
            
        }
    //#endregion
    
    }

    //#endregion
    
    //#region Subscriber

    /**
     * Subscribe to a topic
     * 
     * @param options Options for the subscription
     * @returns {void}
     * @throws InvalidHostError if the host is not a valid URL
     * @throws InvalidTopicError if the topic is not specified by the options or the constructor
     * @throws DuplicateSubscriptionError if the client is already subscribed to the topic
     * @throws Error if the stream fails for any other reason
     * @throws AuthorizationDeniedError if the host requires credentials and none are provided
     * @throws InvalidCredentialsError if the credentials provided are invalid
     * @throws Error if the request fails for any other reason
     */
    public subscribe(options: subscriptionOptions): void {

    //#region Checks

        //Validate host
        if (options.host !== undefined && !checkHostAddress(options.host))
            throw new InvalidHostError('Use http[s]://<host\' ip or domain>[:port]');

        //Validate topic
        if (!options.topic && !this.topic)
            throw new InvalidTopicError("undefined is not a valid topic");

        //Check if already subscribed
        if (this.subscriptions.has(options.topic! ?? this.topic))
            throw new DuplicateSubscriptionError('Already subscribed to this topic');
    //#endregion
        

        //Define url
        const url = new URL(path.join(options.host ?? this.host, options.topic! ?? this.topic, `sse`))

        //Set credentials given in options
        if (options.credentials)
        {
            let b64credentials = b64encoder(`${options.credentials.username}:${options.credentials.password}`)
            let b64string = b64encoder(`Basic ${b64credentials}`).replace(/=+$/, '');
            url.searchParams.append('auth', b64string);
        }
        //Set authToken given in options
        else if (options.authToken)
        {
            let b64string = b64encoder(`Bearer ${options.authToken}`);
            url.searchParams.append('auth', b64string);
        }

        //Set credentials given in constructor
        else if (this.credentials)
        {
            let b64credentials = b64encoder(`${this.credentials.username}:${this.credentials.password}`)
            let b64string = b64encoder(`Basic ${b64credentials}`).replace(/=+$/, '');
            url.searchParams.append('auth', b64string);
        }
        //Set authToken given in constructor
        else if (this.authToken)
        {
            let b64string = b64encoder(`Bearer ${this.authToken}`);
            url.searchParams.append('auth', b64string);
        }

        //Create EventSource
        const stream = new EventSource(url.toString())

        //Add to subscriptions
        this.subscriptions.set(options.topic! ?? this.topic, stream);

        
        //Event listeners
        stream.onmessage = (event) => {
            const data = JSON.parse(event.data);
            this.emit('message', data.topic, data as ntfyResponse);
            this.emit(`topic:${data.topic}`, data as ntfyResponse);
        };
      
        stream.onopen = () => {
            this.emit('newSubscription', options.topic! ?? this.topic);
        };


        stream.onerror = (error) => {
            stream.close();
            this.subscriptions.delete(options.topic! ?? this.topic);
            throw new Error(`Error in SSE stream for topic ${url.toString()}: ${error}`);
            // Implement reconnection logic if necessary
        };
    }

    /**
     * Unsubscribe from a topic
     * 
     * @param topic Topic to unsubscribe from
     * @throws InvalidTopicError if the client is not subscribed to the topic
     * 
     * @example
     * Ntfy.unsubscribe('topic');
     */
    public unsubscribe(topic: string): void {
        if (!this.subscriptions.has(topic))
            throw new InvalidTopicError('Not subscribed to this topic');

        //Close stream
        this.subscriptions.get(topic)!.close();
        this.subscriptions.delete(topic);
    }

    /**
     * Unsubscribe from all topics
     * 
     * @returns {number} Number of topics unsubscribed from
     */
    public unsubscribeAll(): number {

        let count = this.subscriptions.size;

        this.subscriptions.forEach((stream, topic) => {
            stream.close();
            this.subscriptions.delete(topic);
        });

        return count;
    }

    /**
     * Get a list of subscribed topics
     * 
     * @returns {string[]} List of subscribed topics
     */
    public getSubscriptions(): string[] {
        return Array.from(this.subscriptions.keys());
    }

    //#endregion
}

export default Ntfy;