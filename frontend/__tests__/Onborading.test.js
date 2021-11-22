import React from "react";
import renderer from 'react-test-renderer';

import Onboarding from '../screens/onboarding-screens/Onboarding';


test('SignUp snapShot', () => {
    const snap = renderer.create(
        <Onboarding />
    ).toJSON();
    expect(snap).toMatchSnapshot();
});