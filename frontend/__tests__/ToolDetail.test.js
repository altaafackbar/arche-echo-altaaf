import React from "react";
import renderer from 'react-test-renderer';

import ToolDetail from '../screens/tools_and_resources_screen/ToolDetail';


test('SignUp snapShot', () => {
    const snap = renderer.create(
        <ToolDetail />
    ).toJSON();
    expect(snap).toMatchSnapshot();
});