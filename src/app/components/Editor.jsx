import React from 'react';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css';
import { Controlled as ControlledEditor } from 'react-codemirror2';
import './Editor.css';

// import CodeMirror from '@uiw/react-codemirror';

// import { makeStyles } from '@material-ui/core/styles';

export default function Editor(props) {
	const { language, displayName, value, onChange } = props;
	// const [open, setOpen] = useState(true)

	function handleChange(editor, data, value) {
		// onChange === setCode(value) where value === code
		onChange(value);
	}

	return (
		<ControlledEditor
			onBeforeChange={handleChange}
			value={value}
			options={{
				lineWrapping: true,
				lint: true,
				mode: language,
				theme: 'dracula',
				lineNumbers: true,
				viewportMargin: Infinity,
				scrollbarStyle: 'null',
			}}
		/>
	);
}
