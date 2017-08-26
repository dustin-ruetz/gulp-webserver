# dev-webserver

This webserver makes common development resources available when developing in a local environment.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Purpose](#purpose)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Purpose

1. Prevents the need for creating/maintaining separate copies of common development resources across multiple projects.
1. It adds the `Access-Control-Allow-Origin` header to the server's response. This header modifies the server's [cross-origin resource sharing (CORS)][cors] policy, thereby allowing it to share local fonts, images, stylesheets, scripts, and any other desired resources.

## Installation

1. Prerequisite: Have [Node.js][node-js] installed.
1. Download a clone/copy of this repository.
1. Open a terminal window at the root of the repository.
1. Run `npm install` to download all dependencies.

## Usage

**Note:** These instructions assume default ports of `4000` for the webserver and `3000` for other local projects. Edit `gulpfile.js` if you wish to change this configuration.

1. Run `gulp` to start the server at the default `localhost:4000` location.
1. Place the resources you wish to share in the `public/` directory.
    * Static resources (favicons, fonts, images, etc.) can be placed directly in the `public/` folder.
    * Resources that require compilation (such as SCSS files and JavaScript written in ES6 syntax) can be developed in the `dev/` folder. The `gulp` task will compile them to browser-compatible CSS and JS files and output these to the `public/` folder.
        * An example of a compilable/shareable resource that can be used in responsive web development projects is `window-dimensions-helper` (SCSS and JS files are included in the `dev/` folder). It is a simple helper module that is dynamically injected into the DOM and its contents are updated every time the window is resized.
1. Open another project and link to your resources normally via `localhost:4000/public/` (example below).

```html
<!doctype html>
<html lang="en">
    <head>
        <title>Project Title</title>
        <link rel="icon" type="image/png" href="http://localhost:4000/public/icons/special-dev-favicon.png">
        <link rel="stylesheet" href="http://localhost:4000/public/fonts/special-font.css">
        <link rel="stylesheet" href="http://localhost:4000/public/styles/window-dimensions-helper.css">
        <link rel="stylesheet" href="styles/main.css">
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body>

        ... (rest of document) ...

        <script src="http://localhost:4000/public/scripts/window-dimensions-helper.js"></script>
        <script src="scripts/main.js"></script>
    </body>
</html>
```

## License

[MIT License][mit-license]

Copyright 2017 Dustin Ruetz.

[cors]: https://enable-cors.org
[node-js]: https://nodejs.org/en
[mit-license]: https://opensource.org/licenses/MIT