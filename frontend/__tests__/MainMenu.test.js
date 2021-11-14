import React from "react";
import renderer from 'react-test-renderer';

import MainMenuV2 from '../screens/menus/MainMenu-V2';


test('SignUp snapShot', () => {
    const snap = renderer.create(
        <MainMenuV2 />
    ).toJSON();
    expect(snap).toMatchSnapshot();
});