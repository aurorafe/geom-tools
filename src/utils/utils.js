/**
 * Created by FDD on 2017/8/4.
 */
import {factors} from '../constants'
import { feature, point } from './geometry'
/**
 * 递归（注意防止内存溢出，多层数据）
 * @param data
 * @returns {Array}
 */
export const corverRecurrence = (data) => {
  let _data = []
  function recurrence (items) {
    if (items && Array.isArray(items) && items.length > 0) {
      items.forEach(function (item) {
        if (item && Array.isArray(item) && item.length > 0) {
          _data.push(item)
        } else {
          recurrence(item)
        }
      })
    }
  }

  recurrence(data)
  return _data
}

/**
 * 无序数组查找最近成员
 * @param arr
 * @param num
 * @param params
 * @returns {null}
 */
export const closeDisorderArray = (arr, num, params) => {
  try {
    if (arr && Array.isArray(arr) && arr.length > 0 && typeof num === 'number') {
      let [ret, res_] = ['', null]
      if (Array.isArray(arr[0]) && typeof params === 'number') {
        ret = arr[0][params]
        let distance = Math.abs(ret - num)
        for (let i = 1; i < arr.length; i++) {
          let newDistance = Math.abs(arr[i][params] - num)
          if (newDistance < distance) {
            distance = newDistance
            ret = arr[i][params]
            res_ = arr[i]
          }
        }
      } else if (typeof arr[0] === 'object' && typeof params === 'string') {
        ret = arr[0][params]
        let distance = Math.abs(ret - num)
        for (let i = 1; i < arr.length; i++) {
          let newDistance = Math.abs(arr[i][params] - num)
          if (newDistance < distance) {
            distance = newDistance
            ret = arr[i][params]
            res_ = arr[i]
          }
        }
      } else if (typeof arr[0] === 'number') {
        ret = arr[0]
        let distance = Math.abs(ret - num)
        for (let i = 1; i < arr.length; i++) {
          let newDistance = Math.abs(arr[i] - num)
          if (newDistance < distance) {
            distance = newDistance
            ret = arr[i]
            res_ = arr[i]
          }
        }
      }
      return res_
    } else {
      throw Error('传入数据有误！')
    }
  } catch (error) {
    console.log(error)
  }
}

/**
 * 有序列表查
 * @param arr
 * @param num
 * @param params
 * @returns {*}
 */
export const closeOrderArray = (arr, num, params) => {
  try {
    let [left, right] = [0, (arr.length - 1)]
    while (left <= right) {
      let middle = Math.floor((right + left) / 2)
      if (right - left <= 1) {
        break
      }
      if (Array.isArray(arr[middle]) && typeof params === 'number') {
        if (arr[middle][params] === num) {
          return middle
        } else if (arr[middle][params] > num) {
          right = middle
        } else {
          left = middle
        }
        let leftValue = arr[left][params]
        let rightValue = arr[right][params]
        return rightValue - num > num - leftValue ? leftValue : rightValue
      } else if (typeof arr[middle] === 'object' && typeof params === 'string') {
        if (arr[middle][params] === num) {
          return middle
        } else if (arr[middle][params] > num) {
          right = middle
        } else {
          left = middle
        }
        let leftValue = arr[left][params]
        let rightValue = arr[right][params]
        return rightValue - num > num - leftValue ? leftValue : rightValue
      } else if (typeof arr[middle] === 'number') {
        if (arr[middle] === num) {
          return middle
        } else if (arr[middle] > num) {
          right = middle
        } else {
          left = middle
        }
        let leftValue = arr[left]
        let rightValue = arr[right]
        return rightValue - num > num - leftValue ? leftValue : rightValue
      }
    }
  } catch (error) {
    console.log(error)
  }
}

/**
 * 计算距离
 * @param from
 * @param to
 * @param units
 * @returns {number}
 */
export const distance = (from, to, units) => {
  var degrees2radians = Math.PI / 180
  var coordinates1 = getCoord(from)
  var coordinates2 = getCoord(to)
  var dLat = degrees2radians * (coordinates2[1] - coordinates1[1])
  var dLon = degrees2radians * (coordinates2[0] - coordinates1[0])
  var lat1 = degrees2radians * coordinates1[1]
  var lat2 = degrees2radians * coordinates2[1]
  var a = Math.pow(Math.sin(dLat / 2), 2) +
    Math.pow(Math.sin(dLon / 2), 2) * Math.cos(lat1) * Math.cos(lat2)
  return radiansToDistance(2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)), units)
}

/**
 * 获取坐标
 * @param obj
 */
export const getCoord = (obj) => {
  if (!obj) throw new Error('obj is required')
  let coordinates = getCoords(obj)
  if (coordinates.length > 1 &&
    typeof coordinates[0] === 'number' &&
    typeof coordinates[1] === 'number') {
    return coordinates
  } else {
    throw new Error('Coordinate is not a valid Point')
  }
}

/**
 * 获取坐标列表
 * @param obj
 * @returns {*}
 */
export const getCoords = (obj) => {
  if (!obj) throw new Error('obj is required')
  let coordinates
  // Array of numbers
  if (obj.length) {
    coordinates = obj
    // Geometry Object
  } else if (obj.coordinates) {
    coordinates = obj.coordinates
    // Feature
  } else if (obj.geometry && obj.geometry.coordinates) {
    coordinates = obj.geometry.coordinates
  }
  // Checks if coordinates contains a number
  if (coordinates) {
    containsNumber(coordinates)
    return coordinates
  }
  throw new Error('No valid coordinates')
}

/**
 * contains
 * @param coordinates
 * @returns {boolean}
 */
export const containsNumber = (coordinates) => {
  if (coordinates.length > 1 &&
    typeof coordinates[0] === 'number' &&
    typeof coordinates[1] === 'number') {
    return true
  }
  if (Array.isArray(coordinates[0]) && coordinates[0].length) {
    return containsNumber(coordinates[0])
  }
  throw new Error('coordinates must only contain numbers')
}

/**
 * 弧度转距离
 * @param radians
 * @param units
 * @returns {number}
 */
export const radiansToDistance = (radians, units) => {
  if (radians === undefined || radians === null) throw new Error('参数错误')
  let factor = factors[units || 'kilometers']
  if (!factor) throw new Error('单位错误！')
  return radians * factor
}

/**
 * destination
 * @param origin
 * @param distance
 * @param bearing
 * @param units
 * @returns {*}
 */
export const destination = (origin, distance, bearing, units) => {
  let [degrees2radians, radians2degrees] = [(Math.PI / 180), (180 / Math.PI)]
  let coordinates1 = getCoord(origin)
  let [longitude1, latitude1] = [(degrees2radians * coordinates1[0]),
    (degrees2radians * coordinates1[1])]
  let bearingRad = degrees2radians * bearing
  let radians = distanceToRadians(distance, units)
  let latitude2 = Math.asin(Math.sin(latitude1) * Math.cos(radians) +
    Math.cos(latitude1) * Math.sin(radians) * Math.cos(bearingRad))
  let longitude2 = longitude1 +
    Math.atan2(Math.sin(bearingRad) *
      Math.sin(radians) * Math.cos(latitude1),
      Math.cos(radians) - Math.sin(latitude1) * Math.sin(latitude2))
  return point([radians2degrees * longitude2, radians2degrees * latitude2])
}

/**
 * 距离转弧度
 * @param distance
 * @param units
 * @returns {number}
 */
export const distanceToRadians = (distance, units) => {
  if (distance === undefined || distance === null) {
    throw new Error('距离必须传入！')
  }
  let factor = factors[units || 'kilometers']
  if (!factor) {
    throw new Error('单位错误！')
  }
  return distance / factor
}

/**
 * flattenEach<@turf/meta>
 * @param geojson
 * @param callback
 */
export const flattenEach = (geojson, callback) => {
  geomEach(geojson, function (geometry, featureIndex, properties) {
    // Callback for single geometry
    var type = (geometry === null) ? null : geometry.type
    switch (type) {
      case null:
      case 'Point':
      case 'LineString':
      case 'Polygon':
        callback(feature(geometry, properties), featureIndex, 0)
        return
    }
    var geomType
    // Callback for multi-geometry
    switch (type) {
      case 'MultiPoint':
        geomType = 'Point'
        break
      case 'MultiLineString':
        geomType = 'LineString'
        break
      case 'MultiPolygon':
        geomType = 'Polygon'
        break
    }
    geometry.coordinates.forEach(function (coordinate, featureSubIndex) {
      var geom = {
        type: geomType,
        coordinates: coordinate
      }
      callback(feature(geom, properties), featureIndex, featureSubIndex)
    })
  })
}

/**
 * geomEach<@turf/meta>
 * @param geojson
 * @param callback
 */
export const geomEach = (geojson, callback) => {
  /* eslint one-var: 0 */
  var i, j, g, geometry, stopG,
    geometryMaybeCollection,
    isGeometryCollection,
    geometryProperties,
    featureIndex = 0,
    isFeatureCollection = geojson.type === 'FeatureCollection',
    isFeature = geojson.type === 'Feature',
    stop = isFeatureCollection ? geojson.features.length : 1

  // This logic may look a little weird. The reason why it is that way
  // is because it's trying to be fast. GeoJSON supports multiple kinds
  // of objects at its root: FeatureCollection, Features, Geometries.
  // This function has the responsibility of handling all of them, and that
  // means that some of the `for` loops you see below actually just don't apply
  // to certain inputs. For instance, if you give this just a
  // Point geometry, then both loops are short-circuited and all we do
  // is gradually rename the input until it's called 'geometry'.
  //
  // This also aims to allocate as few resources as possible: just a
  // few numbers and booleans, rather than any temporary arrays as would
  // be required with the normalization approach.
  for (i = 0; i < stop; i++) {
    geometryMaybeCollection = (isFeatureCollection ? geojson.features[i].geometry : (isFeature ? geojson.geometry : geojson))
    geometryProperties = (isFeatureCollection ? geojson.features[i].properties : (isFeature ? geojson.properties : {}))
    isGeometryCollection = (geometryMaybeCollection) ? geometryMaybeCollection.type === 'GeometryCollection' : false
    stopG = isGeometryCollection ? geometryMaybeCollection.geometries.length : 1
    for (g = 0; g < stopG; g++) {
      geometry = isGeometryCollection ? geometryMaybeCollection.geometries[g] : geometryMaybeCollection
      // Handle null Geometry
      if (geometry === null) {
        callback(null, featureIndex, geometryProperties)
        featureIndex++
        continue
      }
      switch (geometry.type) {
        case 'Point':
        case 'LineString':
        case 'MultiPoint':
        case 'Polygon':
        case 'MultiLineString':
        case 'MultiPolygon': {
          callback(geometry, featureIndex, geometryProperties)
          featureIndex++
          break
        }
        case 'GeometryCollection': {
          for (j = 0; j < geometry.geometries.length; j++) {
            callback(geometry.geometries[j], featureIndex, geometryProperties)
            featureIndex++
          }
          break
        }
        default:
          throw new Error('Unknown Geometry Type')
      }
    }
  }
}
