const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const dropdown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg")

for (let select of dropdown) {
    for (currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode==="USD") {
            newOption.selected = "selected";
        } else if (select.name === "To" && currCode==="INR") {
            newOption.selected = "selected";
        }    
        select.append(newOption);
    }
    select.addEventListener("change",(evt) => {
        updateFlag(evt.target);
    })

}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};


btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    amtVal = amtVal.replace(/[^0-9]/g, '');
    amount.value = amtVal;
    if(amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
    }

    const words = [];

   fetch(`${BASE_URL}/${fromCurr.value.toLowerCase()}.json`)
  .then(response => response.json())
  .then(result => {
    console.log("result", result);

    // Assuming the JSON response is an object and you want to collect its values
    for (const key in result) {
      if (result.hasOwnProperty(key)) {
        words.push(result[key]);
      }
    }

    console.log("words", words);

    let objectArray = words.filter(item => typeof item === "object" && item !== null);
    console.log(objectArray);

    // Accessing the value based on toCurr.value
    let Rate;
    if (objectArray.length > 0 && toCurr.value.toLowerCase() in objectArray[0]) {
      Rate = objectArray[0][toCurr.value.toLowerCase()];
    } else {
      Rate = null; // Handle the case where the key does not exist
    }

    let finalAmount = amtVal * Rate;

    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`

    // console.log(acrkValue);

  })
  .catch(error => console.log("error", error));
    
});


//   })
//   .catch(error => console.log("error", error));

 

 

 