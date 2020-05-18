const expect = require("chai").expect;

const { isRealString } = require("./validation");

describe("isRealString", () => {
  it("should reject non-string value", () => {
    let res = isRealString(98);
    // expect(res).to.be(false);
    expect(res).to.be.false;
  });

  it("should reject string with only spaces", () => {
    var res = isRealString("    ");
    expect(res).to.be.false;
  });

  it("should allow string with non-space characters", () => {
    var res = isRealString("Test case");
    expect(res).to.be.true;
  });
});
