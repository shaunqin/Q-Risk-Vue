/**
 * 时间日期相关操作
 */

/**
 * 时间格式化
 * 将 2018-09-23T11:54:16.000+0000 格式化成 2018/09/23 11:54:16
 * @param datetime 国际化日期格式
 */
export function format(datetime) {
  return formatWithSeperator(datetime, '-', ':')
}

/**
 * 时间格式化
 * 将 2019-01-01T12:00:00.000+0000 格式化成类似 2019/01/01 12:00:00
 * 可以指定日期和时间分隔符
 * @param datetime 国际化日期格式
 */
export function formatWithSeperator(datetime, dateSeprator, timeSeprator) {
  if (datetime != null) {
    const dateMat = new Date(datetime)
    const year = dateMat.getFullYear()
    const month = getZero(dateMat.getMonth() + 1)
    const day = getZero(dateMat.getDate())
    const hh = getZero(dateMat.getHours())
    const mm = getZero(dateMat.getMinutes())
    const ss = getZero(dateMat.getSeconds())
    const timeFormat = year + dateSeprator + month + dateSeprator + day + ' ' + hh + timeSeprator + mm + timeSeprator + ss
    return timeFormat
  }
}

function getZero(v) {
  return v < 10 ? "0" + v : v;
}

export function formatShortString(datetime) {
  let dateSeprator = "-";
  if (datetime != null) {
    const dateMat = new Date(datetime)
    const year = dateMat.getFullYear()
    const month = getZero(dateMat.getMonth() + 1)
    const day = getZero(dateMat.getDate())
    const timeFormat = year + dateSeprator + month + dateSeprator + day
    return timeFormat
  }
}