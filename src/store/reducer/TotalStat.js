import * as actionType from '../actions/actionTypes'


const initialState = {
     TotalCases: 0,
     Recovered: 0,
     ActiveCases: 0,
     Deaths: 0,
     percentage: 0,
     difference: 0,
     TCFormatted: 0,
     RFormatted: 0

}

function addCommas(nStr) {
     nStr += '';
     var x = nStr.split('.');
     var x1 = x[0];
     var x2 = x.length > 1 ? '.' + x[1] : '';
     var rgx = /(\d+)(\d{3})/;
     while (rgx.test(x1)) {
          x1 = x1.replace(rgx, '$1' + ',' + '$2');
     }
     return x1 + x2;
}

function kFormatter(num) {
     return Math.abs(num) > 999 ? Math.sign(num) * ((Math.abs(num) / 1000).toFixed(1)) + 'k' : Math.sign(num) * Math.abs(num)
}

const reducer = (state = initialState, action) => {

     switch (action.type) {

          case (actionType.SET_STAT_DATA):
               const receivedCaseData = action.StatisticalData.data;
               let totalCases = receivedCaseData["cases"];
               let Recovered = receivedCaseData["recovered"]
               return {
                    ...state,
                    TotalCases: addCommas(receivedCaseData["cases"]),
                    Recovered: addCommas(receivedCaseData["recovered"]),
                    ActiveCases: addCommas(receivedCaseData["active"]),
                    Deaths: addCommas(receivedCaseData["deaths"]),
                    percentage: ((Recovered / totalCases) * 100).toFixed(1),
                    difference: 0,
                    TCFormatted: kFormatter(receivedCaseData["cases"]),
                    RFormatted: kFormatter(receivedCaseData["recovered"])
               }

          default:
               return state

     }

}


export default reducer