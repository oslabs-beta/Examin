import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import App from '../src/app/App.tsx';
import ExaminPanel from '../src/app/components/ExaminPanel.tsx';
import { AppBar, Grid } from '@material-ui/core';
import { createShallow } from '@material-ui/core/test-utils';

jest.mock('codemirror/lib/codemirror.css');

configure({ adapter: new Adapter() });

describe('App Component', () => {
	const wrapper = shallow(<App />);

	it('Contains ExaminPanel component', () => {
		expect(wrapper.find(ExaminPanel).length).toBe(1);
	});
});

xdescribe('ExaminPanel Component', () => {
	const wrapper = shallow(<ExaminPanel />);

	it('Contains MaterialUI Box component', () => {
		expect(wrapper.find(Box).length).toBe(1);
		expect(wrapper.find(AppBar).length).toBe(1);
	});
});

describe('<AppBar />', () => {
	let shallow;
	let wrapper;

	beforeAll(() => {
		shallow = createShallow();
	});

	it('shallow render', () => {
		wrapper = shallow(<AppBar />);
	});

	xit('contains Grid', () => {
		expect(wrapper.find(Grid).length).toBe(0);
	});
});
