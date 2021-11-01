import React from "react";
import { render } from "@testing-library/react-native";

import DisclaimerModal from "../screens/modals/disclaimer-modal";

test("renders correctly", async () => {
    console.log(render(<DisclaimerModal />));
});