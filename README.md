# Examin

## _Automatic React Unit Test Generator._

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/facebook/react/blob/master/LICENSE) [![npm version](https://img.shields.io/npm/v/react.svg?style=flat)](https://www.npmjs.com/package/react) [![CircleCI Status](https://circleci.com/gh/facebook/react.svg?style=shield&circle-token=:circle-token)](https://circleci.com/gh/facebook/react) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://reactjs.org/docs/how-to-contribute.html#your-first-pull-request)

Examin is a browser-extension, currently compatibility,
React.

- Taking out the grunt work.  
- right-click inspect and find Examin next to your dev-tools  
- ✨Magic ✨

## Features

- Export a Test File for you to use in your app.  
- Record State changes  
- Branch Testing

Team [Examin] is looking to simplify [ unit-testing.][df1]

> The overriding goal for Examin's
> unit testing platform is to make testing
> as easy as possible. The idea is that a
> to have test automatically generated with  
> the click of a few buttons, and have your project  
> testable as-is without having to write time consuming test files
> or formatting instructions.

We hope you enjoy the tool!  

## Tech

Examin uses a number of open source projects to work properly:

- [React] - HTML enhanced for web apps!
- [TypeScript] - awesome web-based text editor
- [node.js] - evented I/O for the backend

And of course Examin itself is open source with a [public repository][dill]
 on GitHub.

## Installation

Examin requires [Node.js](https://nodejs.org/) v10+ to run.

Install the dependencies and devDependencies and start the server.

```sh
cd examin
npm i
node app
```

For production environments...

```sh
npm install --production
NODE_ENV=production node app
```

## Plugins

Examin is currently extended with the following plugins.
Instructions on how to use them in your own application are linked below.

| Plugin | README |
| ------ | ------ |
| MaterialUI | [plugins/Material/README.md][PlMaterialUI] |
| CodeMirror | [plugins/CodeMirror/README.md][PlCM] |
| Jest | [plugins/Jest/README.md][PlJest] |
| Babel | [plugins/babel/README.md][PlBabel] |

## Development

Want to contribute? Great!

Examin uses Webpack for fast developing.
Make a change in your file and instantaneously see your updates!

Open your favorite Terminal and run these commands.

First Tab:

```sh
npm install
```

Second Tab:

```sh
npm run dev
```

(optional) Third:

```sh
third command
```

### Building for source

For production release:

```sh
first command
```

Generating pre-built zip archives for distribution:

```sh
second command
```

## License

MIT

**Free Software, Hell Yeah!**

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)
  
   [git-repo-url]: <https://github.com/os-labs/examin.git>
   [markdown-it]: <https://github.com/markdown-it/markdown-it>
   [node.js]: <http://nodejs.org>

   [PlJest]: <https://github.com/os-labs/examin/tree/master/plugins/jest/README.md>
   [PlMateralUI]: <https://github.com/os-labs/examin/tree/master/plugins/material/README.md>
