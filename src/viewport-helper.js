/**
 * Set of tools for interacting with the viewport
 *
 * @author Jacob Fitzpatrick <contact@jacobfitzp.co.uk>
 */

const ViewportHelper = {

    config: {
        viewportChangeEventTriggers: ['resize', 'scroll', 'orientationchange'],
        viewportPositionOffset: 0,
    },

    listeners: {},

    /**
     * Get position of viewport
     *
     * @returns {{top: number, bottom: number}}
     */
    getViewportPosition: () => {
        return {
            top: (window.scrollY - ViewportHelper.config.viewportPositionOffset),
            bottom: (window.scrollY + window.innerHeight + ViewportHelper.config.viewportPositionOffset)
        };
    },

    /**
     * Get position of a given element
     *
     * @param {HTMLElement} element
     * @returns {{top: number, bottom: number}}
     */
    getElementPosition: (element) => {
        return {
            top: element.getBoundingClientRect().top,
            bottom: element.getBoundingClientRect().bottom
        };
    },

    /**
     * Check if a given element is in the viewport
     *
     * @param {HTMLElement} element
     * @returns {boolean}
     */
    isElementInViewport: (element) => {

        let viewportPosition = ViewportHelper.getViewportPosition(),
            elementPosition = ViewportHelper.getElementPosition(element);

        return (
            viewportPosition.top < elementPosition.top &&
            viewportPosition.bottom > elementPosition.top
        ) || (
            viewportPosition.top > elementPosition.bottom &&
            viewportPosition.bottom < elementPosition.bottom
        );
    },

    /**
     * Register listener for when the viewport changes
     *
     * @param {function} callback
     */
    onViewportChange: (callback) => {
        ViewportHelper.config.viewportChangeEventTriggers.forEach((eventType) => {
            document.addEventListener(eventType, () => {
                callback();
            }, {
                passive: true
            });
        });
    },

    /**
     * Register listener for when a given element comes into the viewport.
     *
     * @param {HTMLElement} element
     * @param {function} callback
     * @param {boolean} once
     */
    onElementInViewport: (element, callback, once) => {

        let listenersLength = ViewportHelper.listeners.length;

        ViewportHelper.listeners[listenersLength + 1] = {
            element: element,
            callback: callback,
            once: once
        }
    },

    /**
     * Initialise listeners
     */
    init: () => {
        ViewportHelper.onViewportChange(() => {
            for (const [listenerIndex, listener] of Object.entries(ViewportHelper.listeners)) {
                if (ViewportHelper.isElementInViewport(listener.element)) {

                    if (listener.once) {
                        ViewportHelper.listeners[listenerIndex] = undefined;
                    }

                    listener.callback();
                }
            }
        });
    }
}

ViewportHelper.init();

export default ViewportHelper;