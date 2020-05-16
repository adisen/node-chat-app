const expect = require("chai").expect;
const { generateMessage, generateLocationMessage } = require("./message");

describe("generateMessage", () => {
  it("should generate the correct message object", () => {
    let from = "Test";
    let text = "Sample text";

    let res = generateMessage(from, text);

    expect(res.createdAt).to.be.a("number");
    expect(res).to.include({
      from,
      text
    });
  });
});

describe("generateLocationMessage", () => {
  it("should generate the correct location object", () => {
    let from = "test";
    let latitude = 1;
    let longitude = 19;
    let url = "https://www.google.com/maps?q=1,19";

    let res = generateLocationMessage(from, latitude, longitude);

    expect(res.createdAt).to.be.a("number");
    expect(res).to.include({ from, url });
  });
});
