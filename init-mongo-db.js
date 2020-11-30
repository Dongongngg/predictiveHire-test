db.auth("admin", "666666");
print(
  "Start #################################################################"
);

db = db.getSiblingDB("db-service");

db.createCollection("company");

db.company.insert({
  _id: ObjectId("5e5df7fc6953acd3dc50fe8f"),
  name: "PredictiveHire",
  address: "15 Newton St",
  users: [],
  vacancys: []
});

db.company.insert({
  title: "Vacancy test",
  description: "this is a test",
  expiredAt:
    "Mon Nov 30 2020 20:33:48 GMT+1100 (Australian Eastern Daylight Time)"
});

print("End #################################################################");
