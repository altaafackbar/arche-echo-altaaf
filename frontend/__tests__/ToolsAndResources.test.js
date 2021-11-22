import React from "react";
import renderer from 'react-test-renderer';

import ToolsAndResources from '../screens/tools_and_resources_screen/ToolsAndResources';


test('SignUp snapShot', () => {
    const snap = renderer.create(
        <ToolsAndResources />
    ).toJSON();
    expect(snap).toMatchSnapshot();
});