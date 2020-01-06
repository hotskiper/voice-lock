export function formatDate(date) {
  let yyyy = date.getFullYear();
  let MM = ("0" + (date.getMonth() + 1)).slice(-2);
  let dd = ("0" + date.getDate()).slice(-2);
  let hh = ("0" + date.getHours()).slice(-2);
  let mm = ("0" + date.getMinutes()).slice(-2);
  return yyyy + "-" + MM + "-" + dd + " " + hh + ":" + mm;
}

export function formatDateSimple(date) {
  let yyyy = date.getFullYear();
  let MM = ("0" + (date.getMonth() + 1)).slice(-2);
  let dd = ("0" + date.getDate()).slice(-2);
  return yyyy + "-" + MM + "-" + dd;
}

export function formatDateLong(date) {
  let yyyy = date.getFullYear();
  let MM = ("0" + (date.getMonth() + 1)).slice(-2);
  let dd = ("0" + date.getDate()).slice(-2);
  let hh = ("0" + date.getHours()).slice(-2);
  let mm = ("0" + date.getMinutes()).slice(-2);
  let weekArr = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
  let week = ' (' + weekArr[date.getDay()] + ')';
  return yyyy + "-" + MM + "-" + dd + " " + hh + ":" + mm + week;
}

