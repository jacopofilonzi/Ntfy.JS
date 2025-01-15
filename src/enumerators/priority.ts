/**
 * Priority levels for ntfy messages
 * @enum {number}
 * @example
 * message.priority = Priority.High;
 */
enum Priority {
    /**
     * Minimum priority (1)
     * - No vibration
     * - No sound
     * - Hidden under "Other notifications"
     */
    Minumum = 1,

    /**
     * Low priority (2)
     * - No vibration
     * - No sound
     * - Only visible when pulling down notification drawer
     */
    Low = 2,

    /**
     * Default priority (3)
     * - Default short vibration
     * - Default sound
     * - Standard notification behavior
     */
    Default = 3,

    /**
     * High priority (4)
     * - Long vibration burst
     * - Default sound
     * - Pop-over notification
     */
    High = 4,

    /**
     * Urgent priority (5)
     * - Very long vibration bursts
     * - Default sound
     * - Pop-over notification
     * - May bypass DND mode
     */
    Urgent = 5
}

export default Priority;