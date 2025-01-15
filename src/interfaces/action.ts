/**
 * Represents an action that can be performed.
 * 
 * @interface action
 * 
 * @property {"view" | "http" | "broadcast"} type
 * The type of action to be performed. It can be one of the following:
 * - "view": Opens a view.
 * - "http": Makes an HTTP request.
 * - "broadcast": Sends a broadcast message.
 * 
 * @property {string} label
 * The label or name of the action, which is displayed to the user.
 * 
 * @property {string[]} args
 * The arguments required for the action. For more details, refer to the 
 * [ntfy documentation](https://docs.ntfy.sh/publish/#action-buttons).
 */
interface action {
    type: "view" | "http" | "broadcast";
    label: string;
    args: string[];
}

export default action;