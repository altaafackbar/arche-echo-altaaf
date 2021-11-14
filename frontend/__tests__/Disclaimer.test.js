import React from "react";
import renderer from 'react-test-renderer';

import DisclaimerModal from '../screens/modals/disclaimer-modal';


test('SignUp snapShot', () => {
    const snap = renderer.create(
        <DisclaimerModal />
    ).toJSON();
    expect(snap).toMatchSnapshot();
});