const expect = require("chai").expect;

const { Users } = require("./users");

describe("Users", () => {
  let users;

  beforeEach(() => {
    users = new Users();
    users.users = [
      {
        id: "1",
        name: "Israel",
        room: "Node Course"
      },
      {
        id: "2",
        name: "Eniola",
        room: "React Course"
      },
      {
        id: "3",
        name: "Tobi",
        room: "Node Course"
      }
    ];
  });

  it("should add new user", () => {
    let users = new Users();
    let user = {
      id: "123",
      name: "Israel",
      room: "The office fans"
    };

    let res = users.addUser(user.id, user.name, user.room);

    expect(users.users).equals([user]);
  });

  it("should return name for node course", () => {
    let userList = users.getUserList("Node Course");

    expect(userList).equal(["Israel", "Tobi"]);
  });

  it("should return name for react course", () => {
    let userList = users.getUserList("React Course");

    expect(userList).equal(["Eniola"]);
  });
});
