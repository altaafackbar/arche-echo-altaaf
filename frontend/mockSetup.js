// jest.mock('firebase', () => {
//     return {
//         apps: { length: 1 },
//         auth: () => { return { currentUser: { displayName: 'mockTestIsWorking' }, onAuthStateChanged: f => { f('test') } } },
//         app: () => { return {} },
//         initializeApp: (something) => { return { something } },
//     }

// });
jest.mock('firebase', () => {
    var firebase = require('./Firebase')
    // firebase.firestore = require('./mockFirebase')
    // firebase.auth = () => {
    //     return {
    //         currentUser: {
    //             displayName: 'mock'
    //         }
    //     }
    // }


    return firebase
})

window.addEventListener = jest.fn();
window.attachEvent = jest.fn();