import React from "react";
import renderer from 'react-test-renderer';

import LandingV2 from '../login-pages/Landing-V2';


test('Landing snapShot', async () => {
    const snap = renderer.create(
        <LandingV2 />
    ).toJSON();
    expect(snap).toMatchSnapshot();
});