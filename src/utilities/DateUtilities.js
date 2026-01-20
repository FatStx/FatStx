export function formatDate1(thisDate) {
  let workingDate = new Date(thisDate);
  let monthNumeric = parseInt(workingDate.getUTCMonth()) + 1;
  let dayForOutput = (workingDate.getUTCDate() < 10 ? '0' : '') + workingDate.getUTCDate();
  let monthForOutput = monthNumeric < 10 ? '0' + monthNumeric.toString() : monthNumeric.toString();
  let hourForOutput = (workingDate.getUTCHours() < 10 ? '0' : '') + workingDate.getUTCHours();
  let minuteForOutput = (workingDate.getUTCMinutes() < 10 ? '0' : '') + workingDate.getUTCMinutes();
  let secondForOutput = (workingDate.getUTCSeconds() < 10 ? '0' : '') + workingDate.getUTCSeconds();
  let returnDate =
    monthForOutput +
    '/' +
    dayForOutput +
    '/' +
    workingDate.getUTCFullYear() +
    ' ' +
    hourForOutput +
    ':' +
    minuteForOutput +
    ':' +
    secondForOutput;
  return returnDate;
}
