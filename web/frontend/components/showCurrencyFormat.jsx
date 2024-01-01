

export function showAmountWithCurrency(value,currency) {

  

    let moneyFormat = currency;
    console.log("moneyformat",moneyFormat)
    let sdCurrencyFormatcondition;
    if (moneyFormat.includes("{{amount_no_decimals}}")) {
        sdCurrencyFormatcondition = "amount_no_decimals";
    } else if (moneyFormat.includes("{{amount_with_comma_separator}}")) {
        sdCurrencyFormatcondition = "amount_with_comma_separator";
    } else if (moneyFormat.includes("{{amount_no_decimals_with_space_separator}}")) {
        sdCurrencyFormatcondition = "amount_no_decimals_with_space_separator";
    } else if (moneyFormat.includes("{{amount_no_decimals_with_comma_separator}}") || moneyFormat.includes("${{ amount_no_decimals_with_comma_separator }}")) {
        sdCurrencyFormatcondition = "amount_no_decimals_with_comma_separator";
    }else if(moneyFormat.includes("{{amount_with_space_separator}}$")){
        sdCurrencyFormatcondition = "amount_with_space_separator";
    } else if(moneyFormat.includes("{{amount}}")) {
        sdCurrencyFormatcondition = "amount";
    }else{
        if(moneyFormat.length){

            let pattern = /{{(.*?)}}/;
            let match = moneyFormat.match(pattern);
            sdCurrencyFormatcondition = `${match[1]}`
        }
    }

   let sdCurrencyprice ;
    switch (sdCurrencyFormatcondition) {
        case "amount":
       sdCurrencyprice = moneyFormat.replace("{{amount}}",value);
           break;
        case "amount_with_comma_separator":
         
           if(value){ let stringValue = value.toString();
            if(stringValue.indexOf('.') > 0){
                let comma_seperator = stringValue.replace(".",",")
                sdCurrencyprice = moneyFormat.replace("{{amount_with_comma_separator}}",comma_seperator);
            }else{
                sdCurrencyprice = moneyFormat.replace("{{amount_with_comma_separator}}",value);
            }}else{
              
                sdCurrencyprice = moneyFormat.replace("{{amount_with_comma_separator}}",value);
            }
            break;
        case "amount_no_decimals_with_space_separator":
        let noDecimalwithSpace = parseInt(value);
        sdCurrencyprice = moneyFormat.replace("{{amount_no_decimals_with_space_separator}}",noDecimalwithSpace);
            break;
        case "amount_no_decimals":
        let noDecimal = parseInt(value);
        sdCurrencyprice = moneyFormat.replace("{{amount_no_decimals}}",noDecimal);
            break;
        case "amount_no_decimals_with_comma_separator":
        let noDecimalwithComma = parseInt(value);

        //   sdCurrencyprice = moneyFormat.replace("{{amount_no_decimals_with_comma_separator}}",noDecimalwithComma);
        sdCurrencyprice = moneyFormat.replace(/{{amount_no_decimals_with_comma_separator}}|\${{ amount_no_decimals_with_comma_separator }}/g, noDecimalwithComma);
        break;
        case "amount_with_space_separator":
           if(value){ let spaceStringValue = value.toString();
            if(spaceStringValue.indexOf('.') > 0){
          let Space_comma_seperator = spaceStringValue.replace(".",",")
        sdCurrencyprice = moneyFormat.replace("{{amount_with_space_separator}}",Space_comma_seperator);
            }else{
        sdCurrencyprice = moneyFormat.replace("{{amount_with_space_separator}}",value);

            }}else{
                sdCurrencyprice = moneyFormat.replace("{{amount_with_space_separator}}",value);
            }
            break;
        default:
            // code block
         
            sdCurrencyprice = moneyFormat.replace(`{{${sdCurrencyFormatcondition}}}`,value);
    }
   
    return sdCurrencyprice  ;
}