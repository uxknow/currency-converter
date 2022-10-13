
export async function getCurrency() {
    let dataCurrency;

    try {
    const url = await fetch("https://www.cbr-xml-daily.ru/daily_json.js");
    const data =  await url.json(); 

    const rate = data.Valute;
    dataCurrency = {"UAH": 1};

    for (let type in rate) {
    const UAH = 1 / rate[type].Value;
    if (type === 'USD' || type === 'EUR' || type === 'GBP' || type === 'PLN')
    dataCurrency[type] = UAH.toFixed(2);
    }
    } catch (err) {
        throw new Error(`Unable to get currency ${dataCurrency}`);
    }

    return dataCurrency;
}

