const weatherForm = document.querySelector("form")
const searchElement = document.querySelector("input");
const message01 = document.querySelector("#message-01");
const message02 = document.querySelector("#message-02");

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();

    message01.textContent = "loading....";
    message02.textContent = " ";

    fetch("http://localhost:3000/weather?location=" + searchElement.value)
        .then((response) => {

            response.json().then((data) => {

                if (data.error) {
                    message01.textContent = data.error;
                } else {

                    message01.textContent = "Location is: " + data.Place_name;

                    message02.textContent = "Temperature is: " + data.Temperature.Temperature;
                }
            })
        });
});