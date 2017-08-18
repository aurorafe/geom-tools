/**
 * Created by FDD on 2017/8/14.
 * @desc 线性参考，包含坐标转桩号和桩号转坐标
 */
import * as utils from '../utils/utils'
import {bearing} from '../utils/bearing'
import lineIntersects from '@turf/line-intersect'
import constants from '../constants'
import * as geometryUtils from '../utils/geometry'
import GeomParser from './GeomParser'
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
      let type = (lines.geometry) ? lines.geometry.type : lines.type
      if (type !== 'LineString' && type !== 'MultiLineString') {
        throw new Error('lines must be LineString or MultiLineString')
      }
      let closestPoint = geometryUtils.point([Infinity, Infinity], {
        dist: Infinity
      })
      let length = 0.0
      utils.flattenEach(lines, function (line) {
        let coords = utils.getCoords(line)
        for (let i = 0; i < coords.length - 1; i++) {
          if (coords[i].length < 3) {
            continue
          } else {
            // start
            let start = geometryUtils.point(coords[i])
            start.properties.dist = utils.distance(point, start, units)
            // stop
            let stop = geometryUtils.point(coords[i + 1])
            stop.properties.dist = utils.distance(point, stop, units)
            // sectionLength
            let sectionLength = utils.distance(start, stop, units)
            // perpendicular
            let heightDistance = Math.max(start.properties.dist, stop.properties.dist)
            let direction = bearing(start, stop)
            let perpendicularPt1 = utils.destination(point, heightDistance, direction + 90, units)
            let perpendicularPt2 = utils.destination(point, heightDistance, direction - 90, units)
            let intersect = lineIntersects(geometryUtils.lineString([perpendicularPt1.geometry.coordinates,
              perpendicularPt2.geometry.coordinates]), geometryUtils.lineString([start.geometry.coordinates, stop.geometry.coordinates]))
            let intersectPt = null
            if (intersect.features.length > 0) {
              intersectPt = intersect.features[0]
              intersectPt.properties.dist = utils.distance(point, intersectPt, units)
              intersectPt.properties.location = length + utils.distance(start, intersectPt, units)
            }
            if (start.properties.dist < closestPoint.properties.dist) {
              closestPoint = start
              closestPoint.properties.index = i
              closestPoint.properties.location = length
            }
            if (stop.properties.dist < closestPoint.properties.dist) {
              closestPoint = stop
              closestPoint.properties.index = i + 1
              closestPoint.properties.location = length + sectionLength
            }
            if (intersectPt && intersectPt.properties.dist < closestPoint.properties.dist) {
              closestPoint = intersectPt
              closestPoint.properties.index = i
            }
            // update length
            length += sectionLength
          }
        }
      })
      return closestPoint
    } catch (error) {
      console.log(error)
    }
  }

  /**
   * 处理单独带M值的路线
   * @param lines
   * @param point
   * @param epsg
   * @returns {*}
   */
  getClosePointFromLinesHasM (lines, point, epsg) {
    try {
      let pointSnap = null
      if (Array.isArray(lines) && lines.length > 0) {
        // start
        let [start, stop] = [{
          dist: Infinity,
          index: Infinity
        }, {}]
        for (let i = 0; i < lines.length - 1; i++) {
          if (lines[i].length < 3) {
            continue
          } else {
            let dist = utils.getDistance_(point, lines[i], constants['radius'])
            stop['dist'] = dist
            stop['coords'] = lines[i]
            stop['index'] = i
            let corver_ = function (_start, _stop) {
              if (_start['dist'] < _stop['dist']) {
                _start = JSON.stringify(_start)
              } else {
                _start = JSON.stringify(_stop)
              }
              return JSON.parse(_start)
            }
            start = corver_(start, stop)
            pointSnap = start
          }
        }
      }
      return pointSnap
    } catch (error) {
      console.log(error)
    }
  }

  /**
   * 桩号获取坐标
   * @param lines
   * @param mile
   * @returns {null}
   */
  getPointByMileage (lines, mile) {
    try {
      if (typeof lines === 'string' &&
        (lines.indexOf('LINESTRING') >= 0 ||
        lines.indexOf('MULTILINESTRING')) >= 0) {
        let _coords = (new GeomParser()).wkt2ArrayFix(lines)
        return (utils.closeDisorderArray(_coords, mile, 2))
      }
    } catch (error) {
      console.log(error)
    }
  }

  /**
   * 坐标转桩号
   * @param lines
   * @param coordinates
   * @returns {*}
   */
  getMileageByPoint (lines, coordinates) {
    try {
      if (typeof lines === 'string' &&
        (lines.indexOf('LINESTRING') >= 0 ||
        lines.indexOf('MULTILINESTRING')) >= 0) {
        let _gLines = (new GeomParser()).wkt2GeoJSON(lines)
        return (this.getClosePointFromLines(_gLines, geometryUtils.point(coordinates), 'miles'))
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export default LrsUtils
