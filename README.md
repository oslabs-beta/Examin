# Examin

## _Automatic React Unit Test Generator_

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/facebook/react/blob/master/LICENSE)
[![Version](https://badge.fury.io/gh/tterb%2FHyde.svg)](https://badge.fury.io/gh/tterb%2FHyde)
[![GitHub Release](https://img.shields.io/static/v1?label=release&message=1.0.0.1&color=brightgreen)]()
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![GitHub contributors](https://img.shields.io/static/v1?label=contributers&message=4&color=yellowgreen)]()
[![Open Source](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://opensource.org/)

## Features ⚡

Examin is a Chrome extension that generates React unit tests for your application. Ensure your application renders as expected before adding new features. Examin generates the baseline unit tests and allows developers to customize their tests for their application.

- Install the Examin extension
- Install npm dependencies for Jest/Enzyme
- Navigate to the Examin panel in Chrome developer tools
- ✨ Generate tests ✨

![Preview of Examin](./src/extension/build/assets/main.png)

## Installation 🔌

To get started, manually install Examin in Developer mode.

1. Clone the repo <br/>
   `git clone https://github.com/oslabs-beta/Examin.git`
2. Install NPM packages <br/>
   `npm install`
3. Create a build directory <br/>
   `npm run build`
4. Load the unpacked extension from src/extension/build to Chrome

NOTE: The React Developer Tools extension is also required for Examin to run, if you do not already have it installed on your browser.

## How to Use ❓️

1. Install Jest/Enzyme for your project

   - `npm install jest enzyme enzyme-adapter-react-16 @babel/core @babel/preset-env`
   - Add presets to your `.babelrc` file <br/>
     `{ "presets": ["@babel/preset-env", "@babel/preset-react"] }`

2. Run the Examin build using npm run dev

3. Navigate to the Examin panel in Chrome DevTools

   - Must be in developer mode
   - Revise import statements as needed

4. Add Generated tests into your application
   - Add `__tests__` directory in root directory
   - Add test js file to `__tests__` directory
   - Run tests using `jest` or `jest <filename>`

## Troubleshooting ⁉️

- [Jest docs](https://jestjs.io/docs/getting-started)
- [Enzyme docs](https://enzymejs.github.io/enzyme/)
- Error: Unable to resolve dependency tree while installing `enzyme-adapter-react-16`
  - Add peerDependencies to your **package.json** file
    ```sh
    "peerDependencies": { "react": "^16.8.0 || ^17.0.0", "react-dom": "^16.8.0 || ^17.0.0" }
    ```

## Core Team ☕ 💼

- **Cliff Assuncao** - [@Github](https://github.com/WizardSource) - [@LinkedIn](https://www.linkedin.com/in/cliff-assuncao-1b2593211/)
- **Kirsten Yoon** - [@Github](https://github.com/kirstenyoon) - [@LinkedIn](http://linkedin.com/in/kirstenyoon)
- **Nicholas Brush** - [@Github](https://github.com/Njbrush) - [@LinkedIn](https://www.linkedin.com/in/nicholas-j-brush/)
- **Ty Doan** - [@Github](https://github.com/tdoan35) - [@LinkedIn](https://www.linkedin.com/in/ty-thanh-doan/)
