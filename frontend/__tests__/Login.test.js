import React from "react";
import renderer from 'react-test-renderer';

import Login from "../login-pages/Login";


describe('<App />', () => {
    it('has 1 child', () => {
        const tree = renderer.create(<Login />).toJSON();
        console.log(tree);
    });
});