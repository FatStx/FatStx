import { XactnType } from "./transactiontypes"

export function getXactnType(xactn,outputArrayRow){
  let xactnTypes = filterXactnTypes(xactn,outputArrayRow);
  let xactnType='Unknown';

  if (xactnTypes.length>0 && xactnTypes[0].XactnType !== '') {
      xactnType=xactnTypes[0].XactnType;
  } else if (outputArrayRow.isNftIn) {
      if (outputArrayRow.isNftOut) {
          xactnType='Trade NFT';
      } else {
          xactnType='Receive NFT';
      }
  } else if (outputArrayRow.isNftOut) {
      xactnType='Send NFT';
  } else if (outputArrayRow.inAmountRaw>0) {
      if (outputArrayRow.outAmountRaw>0) {
          xactnType='Trade Coin';
      } else {
          xactnType='Receive'
      }   
  } else if (outputArrayRow.outAmountRaw>0) {
      xactnType='Send'
  } else {
      xactnType='XFee Only'
  }

  return xactnType;
}

export function getXactnTypeDetail(xactn,outputArrayRow){
  let xactnTypeDetail='';
  let xactnTypes =filterXactnTypes(xactn,outputArrayRow);

  if (xactnTypes.length>0 && xactnTypes[0].XactnTypeDetail !=='')
  {
    xactnTypeDetail=' (' + xactnTypes[0].XactnTypeDetail + ')';
  }
  return xactnTypeDetail;
}

function filterXactnTypes(xactn,outputArrayRow)
{
  let xactnType = XactnType.xactnTypes.filter(function(item) {
    return matchContract(item.contract,xactn.tx)
        && matchContractMethod(item.function,xactn.tx)
        && matchSender(item.senderAddress,outputArrayRow.sender)
        && matchRecipient(item.recipientAddress,outputArrayRow.recipient);
  });

  return xactnType;

}

function matchContract(filterContract,tx) {
  if (filterContract === ''
    || (tx.contract_call !== undefined && tx.contract_call.contract_id ===filterContract)
    ) {
      return true;
    }
    else
    {
      return false;
    }
}

function matchContractMethod(filterContractMethod,tx) {
  if (filterContractMethod === ''
    || (tx.contract_call !== undefined && tx.contract_call.function_name ===filterContractMethod)
    ) {
      return true;
    }
    else
    {
      return false;
    }
}

function matchSender(filterSender,sender) {
  if (filterSender === ''
    || (sender === filterSender)
    ) {
      return true;
    }
    else
    {
      return false;
    }
}

function matchRecipient(filterRecipient,recipient) {
  if (filterRecipient === ''
    || (recipient === filterRecipient)
    ) {
      return true;
    }
    else
    {
      return false;
    }
}