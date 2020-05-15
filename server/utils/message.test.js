const expect = require("chai").expect;
const { generateMessage } = require("./message");

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
