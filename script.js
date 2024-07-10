document.addEventListener('DOMContentLoaded', function() {
    fetchCurrentPrice();
});

document.getElementById('calculatorForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const microstacks = document.getElementById('microstacks').value;
    const stacks = microstacks / 1000000;
    const currentPrice = parseFloat(document.getElementById('price').dataset.price);
    const valueInUSD = stacks * currentPrice;
    document.getElementById('result').innerText = `${microstacks} microstacks is equal to ${stacks} Stacks (STX) and worth approximately $${valueInUSD.toFixed(2)} USD`;
});

function fetchCurrentPrice() {
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=blockstack&vs_currencies=usd')
        .then(response => response.json())
        .then(data => {
            const price = data.blockstack.usd;
            document.getElementById('price').innerText = `Current STX Price: $${price} USD`;
            document.getElementById('price').dataset.price = price;
        })
        .catch(error => {
            console.error('Error fetching STX price:', error);
            document.getElementById('price').innerText = 'Error fetching STX price';
        });
}