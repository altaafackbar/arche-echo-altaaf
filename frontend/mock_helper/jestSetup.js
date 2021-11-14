jest.mock("@react-navigation/native", () => {
    const actualNav = jest.requireActual("@react-navigation/native");
    return {
        ...actualNav,
        useNavigation: () => ({
            navigate: jest.fn(),
            dispatch: jest.fn(),
            goBack: jest.fn(),
            replace: jest.fn(),
        }),
    };
});

window.addEventListener = jest.fn();
window.attachEvent = jest.fn();