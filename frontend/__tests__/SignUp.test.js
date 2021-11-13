import React from "react";
import renderer from 'react-test-renderer';

import SignUp from '../login-pages/SignUp';


test('SignUp snapShot', () => {
    const snap = renderer.create(
        <SignUp />
    ).toJSON();
    expect(snap).toMatchSnapshot();
});