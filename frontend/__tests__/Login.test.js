import React from "react";
import { render } from "@testing-library/react-native";

import Login from "../login-pages/Login";

test("renders correctly", async () => {
    console.log(render(<Login />));
});