/**
 * Convert a string to base64
 * 
 * @param str - The string to convert.
 * @returns 
 */
function b64encoder(str: string): string {
    return Buffer.from(str).toString('base64');
}

/**
 * Convert a base64 string to a string
 * 
 * @param str - The string to convert.
 * @returns 
 */
function b64decoder(str: string): string {
    return Buffer.from(str, 'base64').toString('utf-8');
}

export { b64encoder, b64decoder };