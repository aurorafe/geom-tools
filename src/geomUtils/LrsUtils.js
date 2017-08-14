/**
 * Created by FDD on 2017/8/14.
 * @desc 线性参考，包含坐标转桩号和桩号转坐标
 */
import * as utils from '../utils/utils'
import ''
class LrsUtils {
  /**
   * 从线中获取最近的点
   * @param lines（GeoJSON）
   * @param point
   * @param units
   * @returns {*}
   */
  getClosePointFromLines (lines, point, units) {
    try {
      // 判断数据是否标准
      let type = (lines.geometry) ? lines.geometry.type : lines.type;
      if (type !== 'LineString' && type !== 'MultiLineString') {
        throw new Error('lines must be LineString or MultiLineString');
      }
      let closestPoint = point([Infinity, Infinity], {
        dist: Infinity
      })
      let length = 0.0
      flattenEach(lines, function (line) {
        let coords = utils.getCoords(line)
        for (let i = 0; i < coords.length - 1; i++) {
          // start
          let start = point(coords[i])
          start.properties.dist = utils.distance(point, start, units)
          // stop
          let stop = point(coords[i + 1])
          stop.properties.dist = utils.distance(point, stop, units)
          // sectionLength
          let sectionLength = utils.distance(start, stop, units)
          // perpendicular
          var heightDistance = Math.max(start.properties.dist, stop.properties.dist)
          var direction = bearing(start, stop)
          var perpendicularPt1 = destination(point, heightDistance, direction + 90, units)
          var perpendicularPt2 = destination(point, heightDistance, direction - 90, units)
          var intersect = lineIntersects(lineString([perpendicularPt1.geometry.coordinates, perpendicularPt2.geometry.coordinates]), lineString([start.geometry.coordinates, stop.geometry.coordinates]));
          var intersectPt = null
          if (intersect.features.length > 0) {
            intersectPt = intersect.features[0]
            intersectPt.properties.dist = distance(point, intersectPt, units)
            intersectPt.properties.location = length + distance(start, intersectPt, units)
          }
          if (start.properties.dist < closestPt.properties.dist) {
            closestPt = start;
            closestPt.properties.index = i
            closestPt.properties.location = length
          }
          if (stop.properties.dist < closestPt.properties.dist) {
            closestPt = stop;
            closestPt.properties.index = i + 1
            closestPt.properties.location = length + sectionLength
          }
          if (intersectPt && intersectPt.properties.dist < closestPt.properties.dist) {
            closestPt = intersectPt;
            closestPt.properties.index = i
          }
          // update length
          length += sectionLength
        }

      })
      return closestPoint
    } catch (error) {
      console.log(error)
    }
  }
}

export default LrsUtils
