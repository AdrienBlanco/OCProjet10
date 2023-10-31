import { fireEvent, render, screen } from "@testing-library/react";
import Home from "./index";

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      if (fireEvent) { // Ajout d'une condition pour prendre en compte fireEvent dans la réussite des tests
        await screen.findByText("En cours");
        await screen.findByText("Message envoyé !");
      }
    });
  });
});


describe("When a page is created", () => {
  it("a list of events is displayed", () => {
    render(<Home />);
    const events = screen.getByTestId("events-testid");
    expect(events).toBeDefined();
  })
  it("a list a people is displayed", () => {
    render(<Home />);
    const people = screen.getByTestId("people-testid");
    expect(people).toBeDefined();
  })
  it("a footer is displayed", () => {
    render(<Home />);
    const footer = screen.getByTestId("footer-testid");
    expect(footer).toBeDefined();
  })
  it("an event card, with the last event, is displayed", () => {
    render(<Home />);
    const last = screen.getByTestId("last-testid");
    expect(last).toBeDefined();
  })
});
