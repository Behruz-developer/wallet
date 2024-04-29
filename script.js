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
selectSell.addEventListener('change', () => exchanger.sell.currency = selectSell.value);
selectBuy.addEventListener('change', () => exchanger.buy.currency = selectBuy.value);

inputSell.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    const number = parseInt(value);

    if (!isNaN(number)) {
        e.target.value = formatNumber(number);
        exchanger.sell.qiymat = number;
        if (selectSell.value == 'USD' || selectSell.value == 'RUB') {
            exchanger.buy.qiymat = exchanger.sell.qiymat * exchanger.incr;
                
            }else if(selectSell.value == 'UZS'){
                exchanger.buy.qiymat = exchanger.sell.qiymat / exchanger.raincrte;
            }
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
        if (selectSell.value == 'USD' || selectSell.value == 'RUB') {
            exchanger.buy.qiymat = exchanger.sell.qiymat * exchanger.incr;
                
        }else if(selectSell.value == 'UZS'){
            exchanger.buy.qiymat = exchanger.sell.qiymat / exchanger.incr;
        }
        inputBuy.innerText = formatNumber(exchanger.buy.qiymat);
    } else {
        e.target.value = '';
    }
});



exchangeBtn.addEventListener('click', () =>{
    walletTable()
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

const savedWallet = JSON.parse(localStorage.getItem("savedWallet")) || [];

function walletTable() {
    const { sell, buy, incr } = exchanger;

    let emptyFields = 0;
    if (!sell.currency || sell.qiymat === 0) emptyFields++;
    if (!buy.currency || buy.qiymat === 0) emptyFields++;
    if (incr === 0) emptyFields++;

    if (emptyFields === 1) {
        alert("Bitta ma'lumot to'ldirilmagan ");
    } else if (emptyFields > 1) {
        alert("Malumotlarni to'ldiring");
    } else if(sell.currency == buy.currency){
        alert("2ta bir xil kurs tanlangan");
    } else {
        const transaction = {
            sellCurrency: sell.currency,
            sellAmount: sell.qiymat,
            buyCurrency: buy.currency,
            buyAmount: buy.qiymat,
            exchangeRate: incr,
            date: formatDate(new Date())
        };
        savedWallet.push(transaction);
        localStorage.setItem("savedWallet", JSON.stringify(savedWallet));

        addTransactionToTable(transaction);
    }
}

function addTransactionToTable(transaction) {
    const tr = document.createElement('tr');

    addCell(tr, `${transaction.sellCurrency} : ${formatMoney(transaction.sellAmount)}`);
    addCell(tr, `${transaction.buyCurrency} : ${formatMoney(transaction.buyAmount)}`);
    addCell(tr, formatMoney(transaction.exchangeRate));
    addCell(tr, transaction.date);

    tableBody.appendChild(tr);
}

function addCell(tr, text) {
    const td = document.createElement('td');
    td.classList.add('list_word');
    td.textContent = text;
    tr.appendChild(td);
}

function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const formattedMinute = String(minute).padStart(2, '0');
    
    return `${day}.${month}.${year}, ${hour}:${formattedMinute}`;
}

document.addEventListener('DOMContentLoaded', () => {
    savedWallet.forEach(transaction => {
        addTransactionToTable(transaction);
    });
});
