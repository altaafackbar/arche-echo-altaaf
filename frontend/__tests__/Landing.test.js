import React from "react";
import renderer from 'react-test-renderer';

import Landing from '../login-pages/Landing-V2';
import FirestoreMock from '../mockFirebase'


const firestoreMock = new FirestoreMock()

test('Landing snapShot', () => {
    beforeEach(() => {
        firebase.firestore = firestoreMock
        firestoreMock.reset()
    })

    const snap = renderer.create(
        <Landing />
    ).toJSON();
    expect(snap).toMatchSnapshot();
});