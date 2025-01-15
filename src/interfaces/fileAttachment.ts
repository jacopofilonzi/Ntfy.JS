//#region Imports
import { ReadStream } from "fs";
//#endregion

//-----------------------------------------------------------------------------------------------//

/**
 * Interface representing a file attachment.
 * 
 * @interface fileAttachment
 * 
 * @property {string} filename - The name of the file.
 * @property {ReadStream} buffer - The read stream of the file.
 */
interface fileAttachment {
    filename: string;
    buffer: ReadStream;
}

export default fileAttachment;