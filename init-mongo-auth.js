print(
  "Start #################################################################"
);

db.auth("admin", "666666");

db = db.getSiblingDB("auth-service");

db.drop("User");
db.createCollection("User");

db.User.insert({
  _id: ObjectId("5e5df7f450571fb3aecdcf21"),
  companyId: ObjectId("5e5df7fc6953acd3dc50fe8f"),
  name: "Bob Markle",
  username: "bob",
  password: "bob",
  roles: ["user"]
});

db.User.insert({
  _id: ObjectId("5e5df7f450571fb3aecdcf21"),
  companyId: ObjectId("5e5df7fc6953acd3dc50fe8f"),
  name: "Bob Smith",
  username: "mark",
  password: "mark",
  roles: ["admin"]
});

print("End #################################################################");
