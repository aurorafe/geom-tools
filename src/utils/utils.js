/**
 * Created by FDD on 2017/8/4.
 */
import {factors} from '../constants'
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
        for(let i = 1; i < arr.length; i++){
          let newDistance = Math.abs(arr[i][params] - num)
          if(newDistance < distance){
            distance = newDistance
            ret = arr[i][params]
            res_ = arr[i]
          }
        }
      } else if (typeof arr[0] === 'object' && typeof params === 'string') {
        ret = arr[0][params]
        let distance = Math.abs(ret - num)
        for(let i = 1; i < arr.length; i++){
          let newDistance = Math.abs(arr[i][params] - num)
          if(newDistance < distance){
            distance = newDistance
            ret = arr[i][params]
            res_ = arr[i]
          }
        }
      } else if (typeof arr[0] === 'number') {
        ret = arr[0]
        let distance = Math.abs(ret - num)
        for(let i = 1; i < arr.length; i++){
          let newDistance = Math.abs(arr[i] - num)
          if(newDistance < distance){
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
    return coordinates;
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
