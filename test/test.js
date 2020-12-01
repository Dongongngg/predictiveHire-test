const BFF_URL = "http://localhost:4000/graphql";
const AUTH_URL = "http://localhost:8000";
const DB_URL = "http://localhost:5000";

//  test connection to bff-service
const test = async () => {
  const res = await fetch(BFF_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      query: `
          query {
              test
          }
          `
    })
  });
  const resBody = await res.json();
  return resBody.data;
};

const createCompanySeed = async () => {
  try {
    const companySeed = await fetch(DB_URL + "/test/company/seed", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      }
    }).then((res) => res.json());
    console.log(companySeed);
    const text = document.querySelector("#res");
    text.textContent = JSON.stringify(companySeed, undefined, 2);
  } catch (err) {
    console.log(err.message);
    const text = document.querySelector("#res");
    text.textContent = JSON.stringify(err.message, undefined, 2);
  }
};
const createUserSeed = async () => {
  try {
    const userSeed = await fetch(AUTH_URL + "/test/user/seed", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      }
    }).then((res) => res.json());
    console.log(userSeed);
    const text = document.querySelector("#res");
    text.textContent = JSON.stringify(userSeed, undefined, 2);
  } catch (err) {
    console.log(err.message);
    const text = document.querySelector("#res");
    text.textContent = JSON.stringify(err.message, undefined, 2);
  }
};

test().then((data) => {
  const text = document.querySelector("#connection");
  text.textContent = data ? data.test : "Not Ready";
});
// signIn, store token in location storage
const signInBob = async () => {
  try {
    const res = await fetch(AUTH_URL + "/auth/login", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ username: "bob", password: "bob" })
    }).then((res) => res.json());
    console.log(res);
    if (res.data.token) {
      window.localStorage.setItem("user", JSON.stringify(res.data));
    }
    const text = document.querySelector("#res");
    text.textContent = JSON.stringify(res, undefined, 2);
  } catch (err) {
    console.log(err.message);
    const text = document.querySelector("#res");
    text.textContent = JSON.stringify(err.message, undefined, 2);
  }
};

const signInMark = async () => {
  try {
    const res = await fetch(AUTH_URL + "/auth/login", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ username: "mark", password: "mark" })
    }).then((res) => res.json());
    console.log(res);
    if (res.data.token) {
      window.localStorage.setItem("user", JSON.stringify(res.data));
    }
    const text = document.querySelector("#res");
    text.textContent = JSON.stringify(res, undefined, 2);
  } catch (err) {
    console.log(err.message);
    const text = document.querySelector("#res");
    text.textContent = JSON.stringify(err.message, undefined, 2);
  }
};

// authorized user's requests has token
const authHeader = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.token) {
    return {
      authToken: user.token,
      role: user.roles,
      "content-type": "application/json"
    };
  } else {
    return { "content-type": "application/json" };
  }
};
// get all vacancys
const getVacancys = async () => {
  const text = document.querySelector("#res");
  const res = await fetch(BFF_URL, {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify({
      query: `
          query {
            getVacancys{
              success
              data{
                _id
                title
                description
              }
            }
          }
          `
    })
  });
  const resBody = await res.json();
  console.log(resBody);
  text.textContent = JSON.stringify(resBody, undefined, 2);
};
// generate random data for vacancy
const createVacancy = async () => {
  const text = document.querySelector("#res");
  let title = Math.random().toString(36).substring(7);
  const res = await fetch(BFF_URL, {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify({
      query: `
          mutation {
            createVacancy(input:{title:"title-${title}",description:"lkdjlas jksldjlsj fslkfjs kfjlj l",expiredAt:"${Date()}"}){
              success
              data{
                _id
                title
                description
              }
            }
          }
          `
    })
  });
  const resBody = await res.json();
  console.log(resBody);
  text.textContent = JSON.stringify(resBody, undefined, 2);
};

// delete last data from all vacancy
const deleteVacancy = async () => {
  // get value of input
  let inputId = document.getElementById("delete-id").value;
  const res = await fetch(BFF_URL, {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify({
      query: `
          mutation {
            deleteVacancy(_id:"${inputId}"){
              success
              data{
                _id
                title
                description
              }
            }
          }
          `
    })
  });
  const resBody = await res.json();
  console.log(resBody);
  const text = document.querySelector("#res");
  text.textContent = JSON.stringify(resBody, undefined, 2);
};

// update one vacancy with random text
const updateVacancy = async () => {
  // get value of input
  let inputId = document.getElementById("update-id").value;
  const res = await fetch(BFF_URL, {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify({
      query: `
          mutation {
            updateVacancy(_id:"${inputId}",input:{title:"updated",description:"updated",expiredAt:"${Date()}"}){
              success
              data{
                _id
                title
                description
              }
            }
          }
          `
    })
  });
  const resBody = await res.json();
  console.log(resBody);
  const text = document.querySelector("#res");
  text.textContent = JSON.stringify(resBody, undefined, 2);
};
