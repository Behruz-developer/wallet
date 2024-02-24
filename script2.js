const currency = document.getElementById('currency');
const currencyUSD = document.getElementById('currencyUSD');
const currencyRUB = document.getElementById('currencyRUB');
const tableUSD = document.getElementById('tableUSD');
const tableRUB = document.getElementById('tableRUB');


const currencyHeader = document.getElementById('currency_header')
const currencyBody = document.getElementById('currency_body')

currency.addEventListener('change', ()=> addCurrency(kursiValyut))

const savedCurrency = JSON.parse(localStorage.getItem("kursiValyut"));
const kursiValyut = savedCurrency || [
    {mainValyuta: 'UZS', extraValyuta1: {valyuta: 'USD', qiymat: 3250}, extraValyuta2: {valyuta: 'RUB', qiymat: 250}},
    {mainValyuta: 'UZS', extraValyuta1: {valyuta: 'USD', qiymat: 1435}, extraValyuta2: {valyuta: 'RUB', qiymat: 25}},
    {mainValyuta: 'USD', extraValyuta1: {valyuta: 'UZS', qiymat: 1000}, extraValyuta2: {valyuta: 'RUB', qiymat: 500}},
    {mainValyuta: 'RUB', extraValyuta1: {valyuta: 'USD', qiymat: 1000}, extraValyuta2: {valyuta: 'UZS', qiymat: 500}}
]

function addCurrency(kursiValyut){

    for(const kursiValyuta of kursiValyut){
        if(currency.value == kursiValyuta.mainValyuta){
            tableUSD.innerText = kursiValyuta.extraValyuta1.valyuta
            tableRUB.innerText = kursiValyuta.extraValyuta2.valyuta


            const trBody = document.createElement('tr')

            const tdValue1 = document.createElement('td')
            tdValue1.classList.add('list_word')
            tdValue1.innerText = kursiValyuta.extraValyuta1.qiymat
            trBody.appendChild(tdValue1)

            const tdValue2 = document.createElement('td')
            tdValue2.classList.add('list_word')
            tdValue2.innerText = kursiValyuta.extraValyuta2.qiymat
            trBody.appendChild(tdValue2)

            currencyBody.appendChild(trBody)
            // const trHeader = document.createElement('tr')
            // trHeader.classList.add('list_card')

            // const thValue = document.createElement('th')
            // thValue.classList.add('list_title')
            // thValue.innerText = kursiValyuta.extraValyuta1.valyuta
            // trHeader.appendChild(thValue)

            // currencyHeader.appendChild(thValue)
            // console.log(thValue);
            localStorage.setItem("kursiValyut", JSON.stringify(kursiValyut));
            
        };
    }
}








// const uSD = document.querySelectorAll('.usd')
// console.log(uSD.textContent);
// const som = document.querySelectorAll('.som')
// const rub = document.querySelectorAll('.rub')

// currency.addEventListener('change', ()=> {
//     if(currency.value == 'USD'){
//         currencyUSD.textContent = "UZS:"
//         tableUSD.textContent = "UZS"
//         currencyRUB.textContent = "RUB:"
//         tableRUB.textContent = "RUB"
//         USD.forEach(USD => USD.style.display = 'none')
//         som.forEach(som => som.style.display = 'block')
//     }else if(currency.value == 'UZS'){
//         currencyUSD.textContent = "USD:"
//         tableUSD.textContent = "USD"
//         currencyRUB.textContent = "RUB:"
//         tableRUB.textContent = "RUB"
//         som.forEach(som => som.style.display = 'none')
//         USD.forEach(USD => USD.style.display = 'block')
//     }else if(currency.value == 'RUB'){
//         currencyUSD.textContent = "UZS:"
//         tableUSD.textContent = "UZS"
//         currencyRUB.textContent = "USD:"
//         tableRUB.textContent = "USD"
//         rub.forEach(rub => rub.style.display = 'none')
//         som.forEach(som => som.style.display = 'block')
//     }
// })

