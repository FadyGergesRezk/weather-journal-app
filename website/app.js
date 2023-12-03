/* Global Variables */
const myApi = "f91d576f7d0543e9568ec6606d54897f";
const generateButton = document.getElementById("generate");

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear(); //add 1 to the month because js starts from 0 as january

//when generte button is clicked :
generateButton.addEventListener("click", () => {
    const zipCode = document.getElementById("zip").value;
    const feelings = document.querySelector("#feelings").value;
    getApiData(myApi, zipCode).then((data) => {
        postToServer("/postData", { date: newDate, temp: data.main.temp, content: feelings });
        getDataFromServer("/getData").then((data) => {
            // testing console.log(data.date);
            //update the UI part 
            document.getElementById("date").innerText = "Date : " + data.date;
            document.getElementById("temp").innerText = "Current temperature : " + data.temp + "°C";
            document.getElementById("content").innerText = "Feeling : " + data.content;
            document.querySelector(".entryHolder").classList.add("active");
        });
    });
});
//getting data from external server using zipcode and api key
async function getApiData(myApi, zipCode) {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${myApi}&units=metric`;
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (err) {
        console.log("error in getting the data from the external api", err);
    }
}

const postToServer = async (url = "", data = {}) => {
    const res = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    try {
        const data = await res.json();
        return data;
    } catch (err) {
        console.log("error in post method", err);
    }
};
const getDataFromServer = async (url = "") => {
    const res = await fetch(url, {
        method: "GET",
        credentials: "same-origin",
    });
    try {
        const data = await res.json();
        return data;
    } catch (err) {
        console.log("error in get method", err);
    }
};
