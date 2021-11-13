import React from "react";
import renderer from 'react-test-renderer';

import Landing from '../login-pages/Landing-V2';


test('Landing snapShot', () => {
    const snap = renderer.create(
        <Landing />
    ).toJSON();
    expect(snap).toMatchSnapshot();
});