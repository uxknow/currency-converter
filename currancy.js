export async function getCurrency() {
    const dataCurrency = {UAH: 1};
    const currencies = ['USD', 'EUR', 'GBP','PLN']

    try {
    const url = await fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
    const data = await url.json()
    for (let {cc, rate} of data) {
        if(currencies.includes(cc)) {
            dataCurrency[cc] = +rate.toFixed(2)
        }
    }
     } catch (err) {
        throw new Error(`Unable to get currency ${dataCurrency}`);
    }

     return dataCurrency;
}



