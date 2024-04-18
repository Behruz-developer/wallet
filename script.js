function formatNumber(number) {
    return number.toLocaleString('ru-RU');
}

function formatMoney(amount) {
    return amount.toLocaleString('ru-RU');
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
    sell: {currency: '', amount: 0},
    buy: {currency: '', amount: 0},
    rate: 0
};

selectSell.addEventListener('change', () => exchanger.sell.currency = selectSell.value);
selectBuy.addEventListener('change', () => exchanger.buy.currency = selectBuy.value);

inputSell.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    const number = parseInt(value);
    if (!isNaN(number)) {
        e.target.value = formatNumber(number);
        exchanger.sell.amount = number;
        exchanger.buy.amount = exchanger.sell.amount * exchanger.rate;
        inputBuy.innerText = formatNumber(exchanger.buy.amount);
    } else {
        e.target.value = '';
    }
});

increase.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    const number = parseFloat(value);
    if (!isNaN(number)) {
        e.target.value = formatNumber(number);
        exchanger.rate = number;
        exchanger.buy.amount = exchanger.sell.amount * exchanger.rate;
        inputBuy.innerText = formatNumber(exchanger.buy.amount);
    } else {
        e.target.value = '';
    }
});

exchangeBtn.addEventListener('click', () => {
    let emptyFields = 0;
    if (!exchanger.sell.currency || exchanger.sell.amount === 0) emptyFields++;
    if (!exchanger.buy.currency || exchanger.buy.amount === 0) emptyFields++;
    if (exchanger.rate === 0) emptyFields++;

    if (emptyFields === 1) {
        alert("Bitta malumot to'ldirilmagan ");
    } else if (emptyFields > 1) {
        alert("Malumotlarni to'ldiring");
    } else if(exchanger.sell.currency === exchanger.buy.currency){
        alert("2ta bir xil kurs tanlangan");
    } else {
        const sellAmount = exchanger.sell.amount;
        const buyAmount = exchanger.buy.amount;
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

        addToTable(`${exchanger.sell.currency} : ${formatMoney(exchanger.sell.amount)}`,
            `${exchanger.buy.currency} : ${formatMoney(exchanger.buy.amount)}`,
            formatMoney(exchanger.rate),
            getCurrentTimeFormatted());
        saveExchangeData();
    }
});

function addToTable(sell, buy, rate, time) {
    const trBody = document.createElement('tr');
    ['sell', 'buy', 'rate', 'time'].forEach((key, idx) => {
        const tdValue = document.createElement('td');
        tdValue.classList.add('list_word');
        tdValue.innerText = arguments[idx];
        trBody.appendChild(tdValue);
    });
    tableBody.appendChild(trBody);
}
function saveExchangeData() {
    const exchangeData = Array.from(document.querySelectorAll('#table_body tr')).map(tr => {
        const cells = tr.querySelectorAll('td');
        return {
            sell: cells[0].innerText,
            buy: cells[1].innerText,
            rate: cells[2].innerText,
            time: cells[3].innerText
        };
    });
    localStorage.setItem("exchangeData", JSON.stringify(exchangeData));
}

function loadExchangeData() {
    const exchangeData = JSON.parse(localStorage.getItem("exchangeData")) || [];
    exchangeData.forEach(data => {
        addToTable(data.sell, data.buy, data.rate, data.time);
    });
}

function getCurrentTimeFormatted() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const hour = now.getHours();
    const minute = String(now.getMinutes()).padStart(2, '0');
    return `${day} / ${month} / ${year}, ${hour}:${minute}`;
}

document.addEventListener('DOMContentLoaded', () => {
    loadExchangeData(); 
});