import React from "react";
import MarkdownPreview from "@uiw/react-markdown-preview";

const source = `
# How to use 

## _Automatic React Unit Test Generator_

1. Install Jest/Enzyme for your project

   - ${`npm install jest enzyme enzyme-adapter-react-16 @babel/core @babel/preset-env`}
   - Add presets to your .babelrc file <br/>
     { "presets": ["@babel/preset-env", "@babel/preset-react"] } 

2. Run the Examin build using npm run dev

3. Navigate to the Examin panel in Chrome DevTools

   - Must be in developer mode
   - Revise import statements as needed

4. Add Generated tests into your application
   - Add __tests__ directory in root directory
   - Add test js file to __tests__ directory
   - Run tests using jest or jest <filename>




## Troubleshooting ⁉

- Jest docs
- Enzyme docs
- Error: Unable to resolve dependency tree while installing enzyme-adapter-react-16
  - Add peerDependencies to your **package.json** file
    sh
    "peerDependencies": { "react": "^16.8.0 || ^17.0.0", "react-dom": "^16.8.0 || ^17.0.0" }


## Contributing

Examin is open source on Github through the tech accelerator umbrella OS Labs. Please read the our github readme to learn more on how you can participate in improvements.

## If you need further assistance, please contact

- **examindev@gmail.com** -
- **** -


        `;

function Howto() {
  return (
    <div>
      <MarkdownPreview source={source} />
    </div>
  );
}

export default Howto;
