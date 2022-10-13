import { getCurrency } from "./currancy.js";

const selectboxes = document.querySelectorAll('.selectbox');
const converterItems = document.querySelectorAll('.converter__item');

/*const rate = {
  UAH: 1,
  USD: 42,
  EUR: 45,
  PLN: 7,
  GBP: 48
}*/

const rate = await getCurrency();

const selectedCurrency = ['UAH', 'USD'];
const values = [0, 0];

//Начальные параметры
function init() {
  selectboxes.forEach((selectbox,idx) =>  {
    const currencyName = selectbox.querySelector('span');
    const activeCurrency = selectbox.querySelector('li.active');
    const currencyList = selectbox.querySelectorAll('li');

    currencyName.textContent = selectedCurrency[idx];

    if(activeCurrency.textContent !== currencyName.textContent) {
      activeCurrency.classList.remove('active');
    }  
    if(currencyList[idx].textContent === currencyName.textContent) {
      currencyList[idx].classList.add('active');
    }
  });
}
init()


//Выпадающий список
function showSelect(e) {
    const click = e.target.closest('.selectbox');
    
    if(click.classList.contains('selectbox_opened')) {
      click.classList.remove('selectbox_opened');
    } else {
      for (let select of selectboxes) {
        select.classList.remove('selectbox_opened');
      }

      click.classList.add('selectbox_opened');
    }
}

selectboxes.forEach(selectbox =>  {
  
  const selectboxSelected = selectbox.querySelector('.selectbox__selected');
  selectboxSelected.addEventListener('click', showSelect);


  /*selectboxSelected.addEventListener('click', () => {
    if (selectbox.classList.contains('selectbox_opened')) {
      selectbox.classList.remove('selectbox_opened');
    } else {
      for (let select of selectboxes) {
        select.classList.remove('selectbox_opened');
      }

      selectbox.classList.add('selectbox_opened');
    } 
  })*/
});


//выбор активной валюты 
selectboxes.forEach((selectbox, converterItemIdx) => selectbox.addEventListener('click', (e) => {
  let currencyText = selectbox.querySelector('span');
  const li = selectbox.querySelector('li.active');
  const click = e.target.closest('li');

  if(click/*.tagName === 'LI'*/ && !click.classList.contains('active')) {
      li.classList.remove('active');
      
      click.classList.add('active');

      selectbox.classList.remove('selectbox_opened');

  const currencyName = click.textContent;
  currencyText.textContent = currencyName;

  selectedCurrency[converterItemIdx] = currencyName;


  const resultValue = currencyCalculate(values, selectedCurrency, rate, converterItemIdx);
  converterItems[converterItemIdx ? 0 : 1].querySelector('.converter__input').value = resultValue;
  }

}))


//Отслеживаем изменения в input

//const reg = /^\d+$/;

function inputValue() {

  converterItems.forEach((itemBlock, converterItemIdx) => {
  const input = itemBlock.querySelector('.converter__input');

  input.addEventListener('input', (e) => {
    const userData = e.target.value;

    if(isNaN(userData)/*!reg.test(userData) || userData === ''*/) {
      input.value = values[converterItemIdx];
    } else {
      values[converterItemIdx] = userData;
      const resultValue = currencyCalculate(values, selectedCurrency, rate, converterItemIdx);
      converterItems[converterItemIdx ? 0 : 1].querySelector('.converter__input').value = resultValue;
    }
  }) 
  
  })
}
inputValue()

//Расчитываем курс валют
function currencyCalculate(values,selectedCurrency,rate, idxValue) {
  let result = 0;
  const currentValue = values[idxValue] * rate[selectedCurrency[idxValue]];
  result = Math.round((currentValue/rate[selectedCurrency[!idxValue ? 1 : 0]])*100)/100;
  values[idxValue ? 0 : 1] = result;

  return result;
}
