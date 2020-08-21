const form = document.querySelector("form");
const input = document.querySelector("input");
const errorMessage = document.querySelector("#message-1");
const successMessage = document.querySelector("#message-2");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  errorMessage.textContent = "Loading....";
  successMessage.textContent = "";

  const inputVal = input.value;

  axios("http://localhost:3000/weather?address=" + inputVal).then(
    ({ data }) => {
      if (data.error) {
        errorMessage.textContent = data.error;
        errorMessage.style.color = "red";
      } else {
        errorMessage.textContent = data.place;
        errorMessage.style.color = "orangered";
        successMessage.textContent = data.forcast;
        successMessage.style.color = "green";
      }
    }
  );
});
