const GRAPHQL_URL = "http://localhost:4000/graphql";

const fetchIt = async () => {
  const res = await fetch(GRAPHQL_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      query: `
        query {
            greeting
        }
        `
    })
  });
  const resBody = await res.json();
  return resBody.data;
};

fetchIt().then((data) => {
  const text = document.querySelector("#app");
  text.textContent = data.greeting;
});
