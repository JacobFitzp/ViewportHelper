/**
 * Set of tools for interacting with the viewport
 *
 * @author Jacob Fitzpatrick <contact@jacobfitzp.co.uk>
 */

const ViewportHelper = {

    config: {
        viewportChangeEventTriggers: ['resize', 'scroll', 'orientationchange'],
        viewportPositionOffset: 0
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
            bottom: (window.scrollY + window.outerHeight + offsetAmount)
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
            bottom: element.getBoundingClientRect().bottom + window.scrollY
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
     * @param {HTMLElement|NodeList} element
     * @param {function} callback
     * @param {boolean} once
     * @param {number|null} offset
     */
    onElementInViewport: function (element, callback, offset = null, once = true) {
        ViewportHelper.registerListener(element, callback, function (listener) {
            return ViewportHelper.isElementInViewport(listener.element, listener.offset);
        }, offset, once);
    },

    /**
     * Register listener for when a given element comes out of the viewport.
     *
     * @param {HTMLElement|NodeList} element
     * @param {function} callback
     * @param {number|null} offset
     * @param {boolean} once
     */
    onElementNotInViewport: function (element, callback, offset = null, once = true) {
        ViewportHelper.registerListener(element, callback, function (listener) {
            return !ViewportHelper.isElementInViewport(listener.element, listener.offset);
        }, offset, once);
    },

    /**
     * Register listener function to be ran on viewport change.
     *
     * @param {HTMLElement|NodeList} element
     * @param {function} callback
     * @param {number|null} offset
     * @param {boolean} once
     * @param {function} check
     */
    registerListener: function (element, callback, check, offset, once) {

        var listenersLength = Object.entries(ViewportHelper.listeners).length;

        if (element instanceof NodeList) {
            element.forEach(function (subElement) {
                listenersLength++;
                ViewportHelper.listeners[listenersLength] = {element: subElement, callback: callback, once: once, offset: offset, check: check}
            });
        } else {
            ViewportHelper.listeners[listenersLength + 1] = {element: element, callback: callback, once: once, offset: offset, check: check}
        }
    },

    /**
     * Check event listeners, should be run whenever the
     * viewport changes.
     */
    checkListeners: function () {
        for (const [listenerIndex, listener] of Object.entries(ViewportHelper.listeners)) {
            if (listener.check(listener)) {
                listener.callback(listener.element);
                if (listener.once) {
                    delete ViewportHelper.listeners[listenerIndex];
                }
            }
        }
    },

    /**
     * Get percentage scroll progress
     *
     * @param {HTMLElement|null} container
     */
    getScrollProgress: function (container = null) {

        if (container === null) {
            container = document.body;
        }

        var viewportPosition = ViewportHelper.getViewportPosition(0),
            containerHeight = container.offsetHeight;

        return Math.floor((viewportPosition.bottom / containerHeight) * 100);
    },

    /**
     * Initialise listeners
     */
    initListeners: function () {

        ViewportHelper.checkListeners();

        ViewportHelper.onViewportChange(() => {
            ViewportHelper.checkListeners();
        });

        ViewportHelper.listenersInit = true;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    ViewportHelper.initListeners();
}, false);

window.ViewportHelper = ViewportHelper;