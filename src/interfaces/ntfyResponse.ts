//#region Imports
import ntfyAttachment from "./ntfyAttachment";
//#endregion

//-----------------------------------------------------------------------------------------------//

/**
 * Response template given by the ntfy API
 * 
 * @interface ntfyResponse
 * 
 * @property {string} id - The ID of the response.
 * @property {EpochTimeStamp} time - The time the response was sent.
 * @property {EpochTimeStamp} expires - The time the response expires.
 * @property {string} event - The event of the response.
 * @property {string} topic - The topic of the response.
 * @property {1 | 2 | 3 | 4 | 5} priority - The priority of the response.
 * @property {string[]} tags - The tags of the response.
 * @property {string} click - The click of the response.
 * @property {ntfyAttachment} attachment - The attachment of the response.
 * @property {string} title - The title of the response.
 * @property {string} message - The message of the response.
 * 
 * 
 */
interface ntfyResponse {
    id: string;
    time: EpochTimeStamp;
    expires: EpochTimeStamp;
    event: string;
    topic: string;
    priority: 1 | 2 | 3 | 4 | 5;
    tags: string[];
    click: string;
    attachment: ntfyAttachment;
    title: string;
    message: string;
}

export default ntfyResponse;