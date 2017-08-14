import {getCoord} from './utils'

/**
 * bearing
 * @param start
 * @param end
 * @param final
 * @returns {number}
 */
export const bearing = (start, end, final) => {
  if (final === true) {
    return calculateFinalBearing(start, end)
  } else {
    let [degrees2radians, radians2degrees] = [(Math.PI / 180), (180 / Math.PI)]
    let coordinates1 = getCoord(start)
    let coordinates2 = getCoord(end)
    let [lon1, lon2, lat1, lat2] = [(degrees2radians * coordinates1[0]),
      (degrees2radians * coordinates2[0]), (degrees2radians * coordinates1[1]),
      (degrees2radians * coordinates2[1])]
    let [a, b] = [(Math.sin(lon2 - lon1) * Math.cos(lat2)), (Math.cos(lat1) * Math.sin(lat2) -
      Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1))]
    return (radians2degrees * Math.atan2(a, b))
  }
}

/**
 * 计算最终逼近
 * @param start
 * @param end
 */
export const calculateFinalBearing = (start, end) => {
  // Swap start & end
  let bear = bearing(end, start)
  bear = (bear + 180) % 360
  return bear
}
