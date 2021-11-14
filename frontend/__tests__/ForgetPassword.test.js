import React from "react";
import renderer from 'react-test-renderer';

import ForgotPasswordModal from '../screens/modals/ForgotPasswordModal';


test('SignUp snapShot', () => {
    const snap = renderer.create(
        <ForgotPasswordModal />
    ).toJSON();
    expect(snap).toMatchSnapshot();
});