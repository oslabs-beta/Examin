import React from 'react';
import MarkdownPreview from '@uiw/react-markdown-preview';

const source = `
# How to use 

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




## Additional Information
- **exmain.dev**
- GitHub: **github.com/oslabs-beta/Examin**
- Contact: **examindev@gmail.com** 



        `;

function Howto() {
	return (
		<div>
			<MarkdownPreview source={source} />
		</div>
	);
}

export default Howto;
