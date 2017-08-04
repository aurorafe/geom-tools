/**
 * Created by FDD on 2017/8/4.
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
