const hostUrlRegex = /^(https?:\/\/)?(([a-zA-Z0-9.-]+(\.[a-zA-Z]{2,})+)|(\d{1,3}\.){3}\d{1,3})(:\d+)?(\/.*[^\/])?$/;


/**
 * Checks if the host address is valid
 * 
 * @param {string} host - The host address to check
 * 
 * @returns {boolean} - If the host address is valid
 */
function checkHostAddress(host: string): boolean {
    return hostUrlRegex.test(host);
}

export default checkHostAddress;