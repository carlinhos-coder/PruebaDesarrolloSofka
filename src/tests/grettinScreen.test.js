
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import { GrettingScreen } from '../components/Gretting/GrettingScreen'

configure({ adapter: new Adapter() });
const wrapper = shallow(<GrettingScreen />)
describe('proof <GrettingScreen/>', () => {
    test('should show the component correctly ', () => {

        expect(wrapper).toMatchSnapshot();
    });

    test('should send name when clic in saludar ', () => {
        wrapper.find('form').simulate('click', { preventDefault() { } })
    });



})