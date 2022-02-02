<h1>Viewport Helper</h1>

<img src=https://img.shields.io/npm/v/@jacobfitzp/viewport-helper> <img alt="npm bundle size (scoped)" src="https://img.shields.io/bundlephobia/min/@jacobfitzp/viewport-helper"> <img src=https://img.shields.io/badge/dependancies-0-green> <img src="https://img.shields.io/npm/dw/@jacobfitzp/viewport-helper">

viewport-helper.js is a set of useful tools for interacting with the viewport.

This library includes a comprehensive set of tools for detecting if elements are in the viewport, including the ability to listen for specific elements coming in and out of the viewport. 

<img src="https://i.ibb.co/S58rsmw/Group-1.png">

## Installation

### NPM

```
npm install @jacobfitzp/viewport-helper
```

Once installed, you can require the package using:

```javascript
require('@jacobfitzp/viewport-helper');
```

### CDN

```html
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@jacobfitzp/viewport-helper@v1.2.1/dist/viewport-helper.min.js"></script>
```

## Usage

### isElementInViewport()

Used to check if a specific element is currently in the viewport.

#### Parameters:

<table>
    <thead>
        <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Required</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>element</td>
            <td>HTMLElement</td>
            <td>Yes</td>
            <td>Target element</td>
        </tr>
        <tr>
            <td>offset</td>
            <td>number | null</td>
            <td>No</td>
            <td>Viewport offset</td>
        </tr>
    </tbody>
</table>

#### Example Usage:

```javascript
let element = document.querySelector('.some-element');

if (ViewportHelper.isElementInViewport(element)) {
    console.log('Element .some-element is currently in the viewport');
}
```

### OnElementInViewport()

Used to keep an eye on a given element and execute a callback function once it comes into the viewport.

#### Parameters:

<table>
    <thead>
        <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Required</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>element</td>
            <td>HTMLElement | NodeList</td>
            <td>Yes</td>
            <td>Target element</td>
        </tr>
        <tr>
            <td>callback</td>
            <td>function</td>
            <td>Yes</td>
            <td>Callback function</td>
        </tr>
        <tr>
            <td>offset</td>
            <td>number | null</td>
            <td>No</td>
            <td>Viewport offset</td>
        </tr>
        <tr>
            <td>once</td>
            <td>boolean</td>
            <td>No</td>
            <td>Fire event only once</td>
        </tr>
    </tbody>
</table>

#### Example usage:
```javascript
let element = document.querySelector('.some-element'),
    elements = document.querySelector('.some-element');

ViewportHelper.onElementInViewport(element, function () {
    console.log('Element .some-name has come into the viewport');
});

<!-- A NodeList can also be passed -->
ViewportHelper.onElementNotInViewport(elements, function (element) {
    console.log('Element in viewport:');
    console.log(element);
});
```

### onElementNotInViewport()

Does the oposite of `onElementInViewport`, it executes a callback function when a given element is not in the viewport.

#### Parameters:

<table>
    <thead>
        <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Required</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>element</td>
            <td>HTMLElement | NodeList</td>
            <td>Yes</td>
            <td>Target element</td>
        </tr>
        <tr>
            <td>callback</td>
            <td>function</td>
            <td>Yes</td>
            <td>Callback function</td>
        </tr>
        <tr>
            <td>offset</td>
            <td>number | null</td>
            <td>No</td>
            <td>Viewport offset</td>
        </tr>
        <tr>
            <td>once</td>
            <td>boolean</td>
            <td>No</td>
            <td>Fire event only once</td>
        </tr>
    </tbody>
</table>

#### Example usage:
```javascript
let element = document.querySelector('.some-element'),
    elements = document.querySelector('.some-element');

ViewportHelper.onElementNotInViewport(element, function () {
    console.log('Element .some-name is no longer in the viewport');
});

<!-- A NodeList can also be passed -->
ViewportHelper.onElementNotInViewport(elements, function (element) {
    console.log('Element not in viewport:');
    console.log(element);
});
```

### registerListener()

Used to register custom listener functions on viewport change.

#### Parameters:

<table>
    <thead>
        <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Required</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>element</td>
            <td>HTMLElement | NodeList</td>
            <td>Yes</td>
            <td>Target element</td>
        </tr>
        <tr>
            <td>callback</td>
            <td>function</td>
            <td>Yes</td>
            <td>Callback function</td>
        </tr>
        <tr>
            <td>check</td>
            <td>function</td>
            <td>Yes</td>
            <td>Check function</td>
        </tr>
        <tr>
            <td>offset</td>
            <td>number | null</td>
            <td>No</td>
            <td>Viewport offset</td>
        </tr>
        <tr>
            <td>once</td>
            <td>boolean</td>
            <td>No</td>
            <td>Fire event only once</td>
        </tr>
    </tbody>
</table>

#### Example usage:
```javascript
let element = document.querySelector('.some-element');

ViewportHelper.registerListener(element, function () {
    console.log('Custom listener function has been triggered > .some-element has come into the viewport');
}, function () {
    return ViewportHelper.isElementInViewport(element);
});
```

### onViewportChange()

Used to execute a callback function when the viewport changes in any way, for example if the user scrolls, resizes their screen, or rotates their device.

#### Parameters:

<table>
    <thead>
        <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Required</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>callback</td>
            <td>function</td>
            <td>Yes</td>
            <td>Callback function</td>
        </tr>
    </tbody>
</table>

#### Example Usage:

```javascript
ViewportHelper.onViewportChange(function () {
    console.log('Viewport has been changed');
});
```

### getViewportPosition()

Used to get the top and bottom position of the viewport.

### getElementPosition()

Used to get the top and bottom position of a given element.

#### Parameters:

<table>
    <thead>
        <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Required</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>element</td>
            <td>HTMLElement</td>
            <td>Yes</td>
            <td>Target element</td>
        </tr>
    </tbody>
</table>

## Configuration

This package can be configured by manipulating the `ViewportHelper.config` property, the following configuration options are available:

### viewportChangeEventTriggers

An array of event types that are classed as viewport change, for example scroll, resize and orientationchange.

### viewportPositionOffset

Offset the viewport position by a given amount, for example if you set the offset to 200px then elements within a 200px threshold of the viewport will be considered as being in the viewport.

This is useful if you want to do something just **before** elements come into the viewport, in some cases increasing this value can offer better user experience.

<img src="https://i.ibb.co/BPPf02f/Group-1.png">