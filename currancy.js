
export async function getCurrency() {
    let dataCurrency;

    try {
    const url = await fetch("https://www.cbr-xml-daily.ru/daily_json.js");
    const data =  await url.json(); 
    const rate = data.Valute;
    dataCurrency = {"UAH": 1};
    console.log(data.base)

    const UAH = 10 / rate.UAH.Value
       
    for (let type in rate) {
    const exchangeRate = UAH * rate[type].Value;

    if (type === 'USD' || type === 'EUR' || type === 'GBP' || type === 'PLN')
    dataCurrency[type] = parseFloat(exchangeRate.toFixed(2));
    }
    } catch (err) {
        throw new Error(`Unable to get currency ${dataCurrency}`);
    }

    return dataCurrency;
}



