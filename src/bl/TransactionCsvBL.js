//Primary function called by the front end
export default function convertTxReportArrayToTxCSVArray(rptArray,currency) {
  let outputArray = [];
  for (const arrayRow of rptArray) {
    let outputArrayRow = {
      currency: currency,
      burnDate: arrayRow.burnDate,
      inSymbol: arrayRow.inSymbol,
      inAmount: arrayRow.inAmount,
      outSymbol: arrayRow.outSymbol,
      outAmount: arrayRow.outAmount,
      xactnFee: arrayRow.xactnFee,
      inCoinPrice: arrayRow.inCoinPrice,
      outCoinPrice: arrayRow.outCoinPrice,
      xactnFeeCoinPrice: arrayRow.xactnFeeCoinPrice,
      xactnType: arrayRow.xactnType,
      xactnTypeDetail: arrayRow.xactnTypeDetail,
      xactnId: arrayRow.xactnId,
      inAmountRaw: arrayRow.inAmountRaw,
      outAmountRaw: arrayRow.outAmountRaw,
      xactnFeeRaw: arrayRow.xactnFeeRaw,
      sender: arrayRow.sender,
      recipient: arrayRow.recipient,
      memo: arrayRow.memo
    };
    outputArray.push(outputArrayRow);
  }

  return outputArray;
}
