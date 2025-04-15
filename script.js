const currency_one = document.getElementById("currency-one");
const currency_two = document.getElementById("currency-two");

const amount_one = document.getElementById("amount-one");
const amount_two = document.getElementById("amount-two");

const rateText = document.getElementById("rate");
const swap = document.getElementById("btn");

currency_one.addEventListener("change", calculateMoney);
currency_two.addEventListener("change", calculateMoney);
amount_one.addEventListener("input", calculateMoney);
amount_two.addEventListener("input", calculateMoney);

// function calculateMoney() {
//   const one = currency_one.value;
//   const two = currency_two.value;
//   fetch(`https://api.exchangerate-api.com/v4/latest/${one}`).then((res) =>
//     console.log(res.JSON())
//   );
//   //   fetch(url).then((respond) => console.log(respond.JSON()));

//   //   console.log(url);
// }

// ... existing code ...
function calculateMoney() {
  const one = currency_one.value;
  const two = currency_two.value;
  fetch(`https://api.exchangerate-api.com/v4/latest/${one}`)
    .then((res) => res.json())
    .then((data) => {
      const rate = data.rates[two];
      rateText.innerText = `1 ${one} = ${rate} ${two}`;
      amount_two.value = (amount_one.value * rate).toFixed(2);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

swap.addEventListener("click", () => {
  // การทำงานของการลลับค่า
  // USD => THB || THB => USD
  // swap = tempCurrency => USD || THB => tempCurrency(USD)
  const tempCurrency = currency_one.value; // สกุลต้นทาง
  currency_one.value = currency_two.value;
  currency_two.value = tempCurrency; // นำตัวแปลที่เก็บค่าไว้มาใช้แทน currency one เพราะ มันถูกเปลี่ยนค่าไปแล้วใน line ด้านบน ค่าล่าสุดจึงเปลี่ยนไปไม่ใช่ค่าเดิม
  calculateMoney();
});

// ... existing code ...

calculateMoney();
