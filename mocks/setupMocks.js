export async function setupMocks() {
    let makeMock = () => console.log("Kjører i produksjonsmodus");

    if (process.env.ER_DEMO_APP === "true") {
        const mockserver = await import("./mirageDemo");
        makeMock = () => mockserver.makeMockServer();
    } else if (process.env.NODE_ENV === "development") {
        const mockserver = await import("./mirage");
        makeMock = () => mockserver.makeMockServer();
    }

    makeMock();
}
