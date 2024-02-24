const monyUZD = document.getElementById('monyUZD');
const exchangeBtn = document.getElementById('exchangeBtn');
const inputEx = document.getElementById('inputEx');

exchangeBtn.addEventListener('click', () => {
    var currentValue = parseInt(monyUZD.textContent);
    var newValue = currentValue - inputEx.value;

    monyUZD.textContent = newValue.toString();
})
