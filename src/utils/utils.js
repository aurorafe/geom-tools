/**
 * Created by FDD on 2017/8/4.
 */

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
