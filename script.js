function formatNumber(number) {
    return number.toLocaleString('ru-RU');
}

const UZS = document.getElementById('monyUZS');
const USD = document.getElementById('monyUSD');
const RUB = document.getElementById('monyRUB');
const exchangeBtn = document.getElementById('exchangeBtn');
const inputSell = document.getElementById('inputSell');
const increase = document.getElementById('increase');
const inputBuy = document.getElementById('inputBuy');
const selectSell = document.getElementById('sell');
const selectBuy = document.getElementById('buy');
const tableBody = document.getElementById('table_body');

function formatMoney(amount) {
    return amount === null ? "0" : amount.toLocaleString('ru-RU');
}

const onlineWallet = JSON.parse(localStorage.getItem("wallet"));
const wallet = onlineWallet || [
    {UZS: 120000},
    {USD: 1500},
    {RUB: 3000},
];

UZS.innerText = formatMoney(wallet[0].UZS);
USD.innerText = formatMoney(wallet[1].USD);
RUB.innerText = formatMoney(wallet[2].RUB);

const exchanger = {
    sell: {currency: '', qiymat: 0},
    buy: {currency: '', qiymat: 0},
    incr: 0
};
// localStorage.clear()
selectSell.addEventListener('change', () => exchanger.sell.currency = selectSell.value);
selectBuy.addEventListener('change', () => exchanger.buy.currency = selectBuy.value);

inputSell.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    const number = parseInt(value);

    if (!isNaN(number)) {
        e.target.value = formatNumber(number);
        exchanger.sell.qiymat = number;
        exchanger.buy.qiymat = exchanger.sell.qiymat * exchanger.incr;
        inputBuy.innerText = formatNumber(exchanger.buy.qiymat);
    } else {
        e.target.value = '';
    }
});

increase.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    const number = parseFloat(value);

    if (!isNaN(number)) {
        e.target.value = formatNumber(number);
        exchanger.incr = number; 
        exchanger.buy.qiymat = exchanger.sell.qiymat * exchanger.incr;
        inputBuy.innerText = formatNumber(exchanger.buy.qiymat);
    } else {
        e.target.value = '';
    }
});



exchangeBtn.addEventListener('click', () =>{
    walletTable(wallet)
    const sellAmount = exchanger.sell.qiymat;
    const buyAmount = exchanger.buy.qiymat;

    const sellCurrency = exchanger.sell.currency;
    const buyCurrency = exchanger.buy.currency;

    wallet.forEach(item => {
        if (item[sellCurrency] !== undefined) {
            item[sellCurrency] -= sellAmount;
        }
        if (item[buyCurrency] !== undefined) {
            item[buyCurrency] += buyAmount;
        }
    });

    localStorage.setItem("wallet", JSON.stringify(wallet));

    UZS.innerText = formatMoney(wallet[0].UZS);
    USD.innerText = formatMoney(wallet[1].USD);
    RUB.innerText = formatMoney(wallet[2].RUB);

    inputSell.value = '';
    inputBuy.innerText = '0';
    increase.value = '';
    selectSell.value = '';
    selectBuy.value = '';
})


function walletTable(wallet) {
   const { sell, buy, incr } = exchanger;

    let emptyFields = 0;
    if (!sell.currency || sell.qiymat === 0) emptyFields++;
    if (!buy.currency || buy.qiymat === 0) emptyFields++;
    if (incr === 0) emptyFields++;

    if (emptyFields === 1) {
        alert("Bitta malumot to'ldirilmagan ");
    } else if (emptyFields > 1) {
        alert("Malumotlarni to'ldiring");
    } else if(sell.currency == buy.currency){
        alert("2ta bir xil kurs tanlangan");
    } else {
        const trBody = document.createElement('tr')
        const tdValue1 = document.createElement('td')
        tdValue1.classList.add('list_word')
        tdValue1.innerText = `${exchanger.sell.currency} : ${formatMoney(exchanger.sell.qiymat)}`
        trBody.appendChild(tdValue1)
    
        const tdValue2 = document.createElement('td')
        tdValue2.classList.add('list_word')
        tdValue2.innerText = `${exchanger.buy.currency} : ${formatMoney(exchanger.buy.qiymat)}`
        trBody.appendChild(tdValue2)
        const tdValue3 = document.createElement('td')
        tdValue3.classList.add('list_word')
        tdValue3.innerText = formatMoney(exchanger.incr)
        trBody.appendChild(tdValue3)

        const tdValue4 = document.createElement('td')       
        tdValue4.classList.add('list_word')
        const now = new Date();
  
        const year = now.getFullYear();
        const month = now.getMonth()+1; 
        const day = now.getDate();
        const hour = now.getHours();
        const minute = now.getMinutes();
        const formattedMinute = String(minute).padStart(2, '0');
        
        tdValue4.innerText = `${day}.${month}.${year} ,   ${hour}:${formattedMinute}`;
        trBody.appendChild(tdValue4)
        tableBody.appendChild(trBody)
        postMessage

        
    }
}
