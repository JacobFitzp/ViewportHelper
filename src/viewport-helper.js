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
    getViewportPosition: function (offset = null) {

        var offsetAmount = ViewportHelper.config.viewportPositionOffset;

        if (offset !== null) {
            offsetAmount = offset;
        }

        return {
            top: (window.scrollY - offsetAmount),
            bottom: (window.scrollY + window.innerHeight + offsetAmount)
        };
    },

    /**
     * Get position of a given element
     *
     * @param {HTMLElement} element
     * @returns {{top: number, bottom: number}}
     */
    getElementPosition: function (element) {
        return {
            top: element.getBoundingClientRect().top + window.scrollY,
            bottom: element.getBoundingClientRect().bottom
        };
    },

    /**
     * Check if a given element is in the viewport
     *
     * @param {HTMLElement} element
     * @param {number|null} offset
     * @returns {boolean}
     */
    isElementInViewport: function (element, offset = null) {

        var viewportPosition = ViewportHelper.getViewportPosition(offset),
            elementPosition = ViewportHelper.getElementPosition(element);

        return (
            viewportPosition.top < elementPosition.top &&
            viewportPosition.bottom > elementPosition.top
        ) || (
            viewportPosition.top < elementPosition.bottom &&
            viewportPosition.bottom > elementPosition.bottom
        );
    },

    /**
     * Register listener for when the viewport changes
     *
     * @param {function} callback
     */
    onViewportChange: function (callback) {
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
     * @param {number|null} offset
     */
    onElementInViewport: function (element, callback, offset = null, once = true) {
        ViewportHelper.registerListener(element, callback, offset, once, function (listener) {
            return ViewportHelper.isElementInViewport(listener.element, listener.offset);
        });
    },

    /**
     * Register listener for when a given element comes out of the viewport.
     *
     * @param {HTMLElement} element
     * @param {function} callback
     * @param {number|null} offset
     * @param {boolean} once
     */
    onElementNotInViewport: function (element, callback, offset = null, once = true) {
        ViewportHelper.registerListener(element, callback, offset, once, function (listener) {
            return !ViewportHelper.isElementInViewport(listener.element, listener.offset);
        });
    },

    /**
     * Register listener function to be ran on viewport change.
     *
     * @param {HTMLElement} element
     * @param {function} callback
     * @param {number|null} offset
     * @param {boolean} once
     * @param {function} check
     */
    registerListener: function (element, callback, offset, once, check) {

        var listenersLength = Object.entries(ViewportHelper.listeners).length;

        ViewportHelper.listeners[listenersLength + 1] = {
            element: element,
            callback: callback,
            once: once,
            offset: offset,
            check: check
        }
    },

    /**
     * Check event listeners, should be run whenever the
     * viewport changes.
     */
    checkListeners: function () {
        for (const [listenerIndex, listener] of Object.entries(ViewportHelper.listeners)) {
            if (listener.check(listener)) {

                listener.callback();

                if (listener.once) {
                    delete ViewportHelper.listeners[listenerIndex];
                }
            }
        }
    },

    /**
     * Initialise listeners
     */
    init: function () {
        ViewportHelper.checkListeners();

        ViewportHelper.onViewportChange(() => {
            ViewportHelper.checkListeners();
        });
    }
}

document.addEventListener('DOMContentLoaded', function () {
    ViewportHelper.init();
}, false);

window.ViewportHelper = ViewportHelper;