const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}
const FormatChinesTimeToSecond = time => { ////中国标准时间转年月日时分秒
  var date = new Date(time)
  var y = date.getFullYear()
  var m = date.getMonth() + 1
  m = m < 10 ? '0' + m : m
  var d = date.getDate()
  d = d < 10 ? '0' + d : d
  var h = date.getHours()
  h = h < 10 ? '0' + h : h
  var minute = date.getMinutes()
  minute = minute < 10 ? '0' + minute : minute
  var s = date.getSeconds()
  s = s < 10 ? '0' + s : s
  return y + '年' + m + '月' + d + '日 ' + h + ':' + minute + ':' + s
}
const FormatChinesTimeToDay = time  =>{ //中国标准时间转年月日
  var date = new Date(time)
  var y = date.getFullYear()
  var m = date.getMonth() + 1
  m = m < 10 ? '0' + m : m
  var d = date.getDate()
  d = d < 10 ? '0' + d : d
  return y + '年' + m + '月' + d + '日'
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}
function getCurrentDate(date){
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var  day = date.getDate()
  month = (month < 10) ? "0" + month : month;
  return year+"-"+month+"-"+day
}

function getCurrentTime(date){
  var hour = date.getHours()
  var minute = date.getMinutes()
  return hour+":"+minute
}

function getEndDate(date){
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  if(month==12){
    year+=1;
    month = 1; 
  }
  else{
    month+=1;
  }
  month = (month<10)? "0"+month : month;
  return year+"-"+month+"-"+day;
}


module.exports = {
  formatTime,
  getCurrentDate,
  getCurrentTime,
  getEndDate,
  FormatChinesTimeToDay,
  FormatChinesTimeToSecond
}
