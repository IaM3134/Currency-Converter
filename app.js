const BASE_URL = "https://2024-03-06.currency-api.pages.dev/v1/currencies"
const dropDown = document.querySelectorAll(".dropDown select")
const exBtn = document.querySelector("form button");
const fromCrr = document.querySelector(".from select");
const toCrr = document.querySelector(".to select");
const msg = document.querySelector(".msg");


for(let select of dropDown){
    for(crrCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = crrCode;
        newOption.value = crrCode;
        select.append(newOption);
        if(crrCode === "USD" && select.name === "from"){
            newOption.selected = "selected";
        }
        else if(crrCode === "INR" && select.name === "to"){
            newOption.selected = "selected";
        }
    }
    select.addEventListener("change", (evt) =>{
        updateFlag(evt.target);
    })
}

const updateFlag = (element) => {
    let crrCode = element.value;
    let countryCode = countryList[crrCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

exBtn.addEventListener("click", async (evt) =>{
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal == "" || amtVal<1){
        amount.value = "1";
        amtVal = "1";
    }
    // console.log(fromCrr.value.toLowerCase(), toCrr.value.toLowerCase());
    let URL = `${BASE_URL}/${fromCrr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[fromCrr.value.toLowerCase()][toCrr.value.toLowerCase()];
    let totalamt = amtVal * rate.toFixed(3);
    msg.innerText = `${amtVal} ${fromCrr.value} = ${totalamt} ${toCrr.value}`;
})