## v1.2.2

### Additions
- OnViewportWidthChange method - Similar to onViewportChange however it only fires when the width of the window changes, and ignores all other changes to the viewport.

### Fixes
- Fix issue with resize event listener, listeners are now added to window instead of document.

## v1.2.1

### Updates
* OnElementInViewport and OnElementNotInViewport now both accept a NodeList instead of just a HTMLElement.
* OnElementInViewport and OnElementNotInViewport now both pass the element to the callback function as a paramater - Needed now that a list of elements can be provided.
* RegisterListener now accepts a NodeList

### Fixes
* Improved support for older broswers 
* Removed redudant code that was causing performance issues

## v1.2.0

### Updates
* Updates the listeners to initialise on DOMContentLoaded.
* Simplified the listeners component - Was previously uniessasirily compilcated.

### Fixes
* Improved support for older broswers
* Improved performance