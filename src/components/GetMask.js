import React from 'react';

function GetMask(list) {
  var x = list.split('/');  
    var mask2 = "0";
    switch (x[1]) {
      case "8":
        mask2 = "255.0.0.0";
        break;
      case "9":
        mask2 = "255.128.0.0";
        break;
      case "10":
        mask2 = "255.192.0.0";
        break;
        case "11":
          mask2 = "255.224.0.0";
          break;
        case "12":
          mask2 = "255.240.0.0";
          break;
        case "13":
          mask2 = "255.248.0.0";
          break;
        case "14":
          mask2 = "255.252.0.0";
          break;
        case "15":
          mask2 = "255.254.0.0";
            break;
        case "16":
            mask2 = "255.255.0.0";
            break;
        case "17":
            mask2 = "255.255.128.0";
            break;
        case "18":
            mask2 = "255.255.192.0";
            break;
        case "19":
            mask2 = "255.255.224.0";
            break;
        case "20":
            mask2 = "255.255.240.0";
            break;
        case "21":
            mask2 = "255.255.248.0";
            break;
        case "22":
            mask2 = "255.255.252.0";
            break;
        case "23":
            mask2 = "255.255.254.0";
            break;
        case "24":
            mask2 = "255.255.255.0";
            break;
        case "25":
            mask2 = "255.255.255.128";
            break;
        case "26":
            mask2 = "255.255.255.192";
            break;
        case "27":
            mask2 = "255.255.255.224";
            break;
        case "28":
            mask2 = "255.255.255.240";
            break;
        case "29":
            mask2 = "255.255.255.248";
            break;
        case "30":
            mask2 = "255.255.255.252";
            break;
        case "31":
            mask2 = "255.255.255.254";
            break;
        case "32":
            mask2 = "255.255.255.255";
            break;
        default:
            mask2 = "255.255.255.255"
            break;
    }
    return mask2;
}

export default GetMask;