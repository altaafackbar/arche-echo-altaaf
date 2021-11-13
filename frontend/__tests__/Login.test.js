import React from "react";
import renderer from 'react-test-renderer';

import LandingV2 from "../login-pages/Landing-V2";


describe('<App />', () => {
    it('has 1 child', () => {
        const tree = renderer.create(<LandingV2 />).toJSON();
        console.log(tree);
    });
});