/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";

import { Button } from "./index";

describe("button", () => {
  it("should render a button with title and onClick handler", () => {
    const title = "click me";
    const onClick = jest.fn();
    render(<Button data={{ title }} actions={{ onClick }} />);
    const button = screen.getByTitle(title);
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalled();
  });
});
