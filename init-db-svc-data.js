db.createUser({
  user: "james",
  pwd: "123456",
  roles: [
    {
      role: "dbAdmin",
      db: "ph-test"
    }
  ]
});

db.company.insertOne({
  _id: ObjectId("5e5df7fc6953acd3dc50fe8f"),
  name: "PredictiveHire",
  address: "15 Newton St"
});
