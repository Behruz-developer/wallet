const currency = document.getElementById('currency');
const currencyUSD = document.getElementById('currencyUSD');
const currencyRUB = document.getElementById('currencyRUB');
const tableUSD = document.getElementById('tableUSD');
const tableRUB = document.getElementById('tableRUB');


const currencyHeader = document.getElementById('currency_header')
const currencyBody = document.getElementById('currency_body')

currency.addEventListener('change', ()=> addCurrency(kursiValyut))

const kursiValyut = [
    {mainValyuta: 'UZS', extraValyuta1: {valyuta: 'USD', qiymat: 3250}, extraValyuta2: {valyuta: 'RUB', qiymat: 250}},
    {mainValyuta: 'UZS', extraValyuta1: {valyuta: 'USD', qiymat: 1435}, extraValyuta2: {valyuta: 'RUB', qiymat: 25}},
    {mainValyuta: 'USD', extraValyuta1: {valyuta: 'UZS', qiymat: 1000}, extraValyuta2: {valyuta: 'RUB', qiymat: 500}},
    {mainValyuta: 'RUB', extraValyuta1: {valyuta: 'USD', qiymat: 1000}, extraValyuta2: {valyuta: 'UZS', qiymat: 500}}
]

function addCurrency(kursiValyut){
    currencyBody.innerHTML = '';
    kursiValyut.filter(v => v.mainValyuta == currency.value).forEach(kursiValyuta => {
        tableUSD.innerText = kursiValyuta.extraValyuta1.valyuta
        tableRUB.innerText = kursiValyuta.extraValyuta2.valyuta
        currencyUSD.innerText = kursiValyuta.extraValyuta1.valyuta
        currencyRUB.innerText = kursiValyuta.extraValyuta2.valyuta
        
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

    });
    

}
