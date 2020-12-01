print(
  "Start #################################################################"
);

db.auth("admin", "666666");

db = db.getSiblingDB("db-service");

db.drop("Company");
db.createCollection("Company");
db.Company.insert({
  _id: ObjectId("5e5df7fc6953acd3dc50fe8f"),
  name: "PredictiveHire",
  address: "15 Newton St",
  users: [],
  vacancys: []
});

db.drop("Vacancy");
db.createCollection("Vacancy");
db.Vacancy.insert({
  title: "Vacancy test",
  description: "this is a test",
  expiredAt:
    "Mon Nov 30 2020 20:33:48 GMT+1100 (Australian Eastern Daylight Time)"
});

print("End #################################################################");
