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
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
const onlineWallet = JSON.parse(localStorage.getItem("wallett"));
const wallet = onlineWallet|| [
    {UZS: 120000},
    {USD: 150},
    {RUB: 300},
]

UZS.innerText = formatMoney(wallet[0].UZS);
USD.innerText = formatMoney(wallet[1].USD);
RUB.innerText = formatMoney(wallet[2].RUB);


const exchanger =  {
    sell: {currency: '', qiymat: 0},
    buy: {currency: '', qiymat: 0},
    incr: 0
}




selectSell.addEventListener('change', () => exchanger.sell.currency = selectSell.value );
selectBuy.addEventListener('change', () => exchanger.buy.currency = selectBuy.value);
inputSell.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, ''); 
    const number = parseInt(value, 10); 

    if (!isNaN(number)) {
        const formattedNumber = number.toLocaleString('ru-RU');
        e.target.value = formattedNumber;  
        
        exchanger.sell.qiymat = number;  
        exchanger.buy.qiymat = exchanger.sell.qiymat * exchanger.incr;
        
        inputBuy.innerText = new Intl.NumberFormat('ru-RU').format(exchanger.buy.qiymat);
    } else {
        e.target.value = '';
    }
});
inputBuy.addEventListener('change', () => exchanger.buy.qiymat = inputBuy.value)

increase.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    const number = parseInt(value, 10);

    if (!isNaN(number)) {
        const formattedNumber = number.toLocaleString('ru-RU');
        e.target.value = formattedNumber;

        exchanger.incr = number; 
        exchanger.buy.qiymat = exchanger.sell.qiymat * exchanger.incr;

        inputBuy.innerText = exchanger.buy.qiymat.toLocaleString('ru-RU');
    } else {
        e.target.value = '';
    }
});


exchangeBtn.addEventListener('click', () =>{
    walletTable(wallet)

})


function walletTable(wallet) {

    function updateExchangeInfo() {
        const { sell, buy, incr } = exchanger;
    
        let emptyFields = 0;
        if (!sell.currency || sell.qiymat === 0) emptyFields++;
        if (!buy.currency || buy.qiymat === 0) emptyFields++;
        if (!incr === 0) emptyFields++;
    
        if (emptyFields === 1) {
            alert("Bitta malumot to'ldirilmagan ");
        } else if (emptyFields > 1) {
            alert("Malumotlarni to'ldiring");
        } else {
            const trBody = document.createElement('tr')

            const tdValue1 = document.createElement('td')
            tdValue1.classList.add('list_word')
            tdValue1.innerText = `${exchanger.sell.currency} : ${exchanger.sell.qiymat}`
            trBody.appendChild(tdValue1)
        
            const tdValue2 = document.createElement('td')
            tdValue2.classList.add('list_word')
            tdValue2.innerText = `${exchanger.buy.currency} : ${exchanger.buy.qiymat}`
            trBody.appendChild(tdValue2)
    
            const tdValue3 = document.createElement('td')
            tdValue3.classList.add('list_word')
            tdValue3.innerText = exchanger.incr
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
            
            console.log(parseFloat(minute.value));
            tdValue4.innerText = `${day}.${month}.${year} ,   ${hour}:${formattedMinute}`;
            trBody.appendChild(tdValue4)
            tableBody.appendChild(trBody)
            postMessage
    
            const inputSellValue = inputSell .value;
            const selectedCurrency = selectSell.value;
            for(const walletItem of wallet){
                if(walletItem[selectedCurrency] !== undefined){
                    walletItem[selectedCurrency] -= inputSellValue;
                    localStorage.setItem("wallett", JSON.stringify(wallet));
                }
            }
    
    
            const inputBuyValue = parseFloat(inputBuy.innerText);
            const selectedCurrency2 = selectBuy.value;
            for(const walletItem of wallet){
                if(walletItem[selectedCurrency2] !== undefined){
                    walletItem[selectedCurrency2] += inputBuyValue;   
                    localStorage.setItem("wallett", JSON.stringify(wallet));
                }
            }
    
            UZS.innerText = formatMoney(wallet[0].UZS);
            USD.innerText = formatMoney(wallet[1].USD);
            RUB.innerText = formatMoney(wallet[2].RUB);
            
            inputSell.value = 0;
            inputBuy.innerText = 0;
            increase.value = 0;
            selectSell.value = 0;
            selectBuy.value = 0;

        }
    }
    
    updateExchangeInfo();

}

