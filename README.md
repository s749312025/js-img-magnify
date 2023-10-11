

# js-img-magnify

![npm](https://img.shields.io/npm/v/js-img-magnify)  ![npm bundle size](https://img.shields.io/bundlephobia/minzip/js-img-magnify) ![npm](https://img.shields.io/npm/dw/js-img-magnify)

Pure JavaScript utility enabling magnifying glass effect on an images.
No external dependencies required.

So you can use it in any web application, such as `Vue`, `React`,`Angular`, `Svelte`, or any other application.

support `Typescript`

## Demo

[view Demo](https://s749312025.github.io/js-img-magnify/)

## How to use

- npm or yarn
  
  - install
    ```bash
    npm i js-img-magnify
    # or
    yarn js-img-magnify
    ```
  - use
    ```js
    import magnifyImg from 'js-img-magnify';
    import img from './assets/waterDrop.jpg';
    magnifyImg({
        src: img,   // or img url
        zoom: 3,
        target: document.getElementById('example'),
        width: 500, // img width, Can also '50%'
        MagnifyDomStyles: {"borderRadius":"50%","border":"4px solid red"},
        MagnifyDom: document.getElementById('show'),
        ...
    })
    ```
- cdn
  
  - install
    ```html
    <script src="https://cdn.jsdelivr.net/npm/js-img-magnify@latest/lib/js-img-magnify.umd.js"></script>
    ```
  - use
    ```js
    magnifyImg({
        src: imgURL,
        zoom: 3,
        target: document.getElementById('example'),
        width: 500, // img width, Can also '50%'
        MagnifyDom: document.getElementById('show'),
        ...
    })
    ```

## Props

| propName | type | required |desc | default |
| --- | --- | --- |--- |--- |
| src | string | true | img tag src prop | |
| zoom | number | false| magnification times | 3 |
|target | HTMLElement| true | target HTMLElement ||
|width | string/number | false | imgTag width，`100` or `"50%"` | "auto" |
|MagnifyDomWidth| number| false| js created magnifying glass dom, if `MagnifyDom` has value, This will not work. | 200|
|MagnifyDomStyles|partialCSSStyleDeclaration|false|it will merge js created magnifying glass dom styles, if `MagnifyDom` has value, This will not work | {} |
|MagnifyDom| HTMLElement| false | user custom magnify Dom |
|overflow | Boolean | false | Whether or not to allow exceeding the image range at the image edges | true |
