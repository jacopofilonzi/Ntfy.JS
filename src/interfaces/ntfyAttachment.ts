/**
 * Represents an attachment in the Ntfy system.
 * 
 * @interface ntfyAttachment
 * 
 * @property {string} name - The name of the attachment.
 * @property {string} type - The MIME type of the attachment.
 * @property {number} size - The size of the attachment in bytes.
 * @property {EpochTimeStamp} expires - The expiration time of the attachment.
 * @property {string} url - The URL where the attachment can be accessed.
 */
interface ntfyAttachment {
    name: string;
    type: string;
    size: number;
    expires: EpochTimeStamp;
    url: string;
}

export default ntfyAttachment;