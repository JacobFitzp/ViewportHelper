<h1>Viewport Helper</h1>

![npm (scoped)](https://img.shields.io/npm/v/@jacobfitzp/viewport-helper)

viewport-helper.js is a set of useful tools for interacting with the viewport, mainly the ability to check if an element is in the viewport or not.

## Installation

This package can be installed using NPM:

```
npm install @jacobfitzp/viewport-helper
```

Alteratively you can download or clone this repo and include the source code manually.

## Usage

### isElementInViewport()

This method is used to check if a specific element is currently in the viewport.

#### Parameters:

`element {HTMLElement}` : Target element, this is the element we will check is in the viewport.

`offset {int|null} [optional]` : Offset the viewport by a given amount, if set this will override the viewportPositionOffset config.

#### Example Usage:

```javascript
let element = document.querySelector('.some-element');

if (ViewportHelper.isElementInViewport(element)) {
    console.log('Element .some-element is currently in the viewport');
}
```

### OnElementInViewport()

This method is used to keep an eye on a given element and execute a callback function once it comes into the viewport.

#### Parameters:

`element {HTMLElement}` : Target element, this is the element that will trigger the callback once it comes into the viewport.

`callback {function}` : Callback function to be called once the element comes into the viewport.

`offset {int|null} [optional]` : Offset the viewport by a given amount, if set this will override the viewportPositionOffset config.

`once {boolean}` : Only call the callback once if true, once the element comes into the viewport the listener will be removed and the callback won't be triggered again - Useful for one time actions such as image lazyloading.

#### Example usage:
```javascript
let element = document.querySelector('.some-element');

ViewportHelper.onElementInViewport(element, function () {
    console.log('Element .some-name has come into the viewport');
});
```

### onViewportChange()

This method is used to execute a callback function when the viewport changes in any way, for example if the user scrolls, resizes their screen, or rotates their device.

#### Parameters:

`callback {function}` : Function to execute when the viewport changes.

#### Example Usage:

```javascript
ViewportHelper.onViewportChange(function () {
    console.log('Viewport has been changed');
});
```

### getViewportPosition()

This method is used to get the top and bottom position of the viewport.

### getElementPosition()

This method is used to get the top and bottom position of a given element.

#### Parameters:

`element {HTMLElement}` : Element to get the position of

## Configuration

This package can be configured by manipulating the `ViewportHelper.config` property, the following configuration options are available:

### viewportChangeEventTriggers

An array of event types that are classed as viewport change, for example scroll, resize and orientationchange.

### viewportPositionOffset

Offset the viewport position by a given amount, for example if you set the offset to 200px then elements within a 200px threshold of the viewport will be considered as being in the viewport.

This is useful if you want to do something just **before** elements come into the viewport, in some cases increasing this value can offer better user experience.
