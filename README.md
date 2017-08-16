# 空间数据工具，支持客户端和nodejs

> 现已支持wkt转GeoJSON，合并坐标，LRS

## LRS线参使用

> 暂时只支持到路线数组处理（带M值）

### 场景一：实景三维采集时当前位置定位无法查看到当前坐标的实景，需要后退几帧，约40m左右。

> 实现：需要对要定位的坐标做一次转换，参照路线后退大于40m的距离，获取到后退后的坐标再进行定位实景。

```javascript
// 需要先引入GeomTools工具类库
axios.get('./data/s41.json')
  .then(function (response) {
    var line = response['data']['features'][0];
    if (line && line['geometry'] && line['geometry']['paths']) {
      // 获取到的所有路线上的坐标，必须保证坐标集合为单层数组，多线时，需要合并到一起，便于数据计算处理。处理后的数据[point1, point2, ...]
      var coords = GeomTools.utils.corverRecurrence(line['geometry']['paths'])
      var lrsUtils = new GeomTools.LrsUtils()
      // 第一个参数为处理后的点集合，第二个参数为要定位的坐标
      var mile = lrsUtils.getClosePointFromLinesHasM(coords, [115.50680585701576, 25.803196348616325])
      console.log(mile)
      // 获取的point为偏移后的坐标，定位实景时采用此坐标。
      // 参数说明：第一个参数为处理后的点集合， 第二个参数为上步根据坐标转出的桩号（tolerance为偏移距离，单位km，注意上行后退需要减偏移距离，下行需要加上）
      // 第三个参数为桩号在point坐标的位置index, [115.50680585701576, 25.803196348616325, 30 /**桩号**/]，参数为2
      var point = GeomTools.utils.closeDisorderArray(coords, mile['coords'][2] - (typeof tolerance === 'number' ? tolerance : 0), 2)
      console.log(point)
    }
  })
  .catch(function (error) {
    console.log(error);
  });
```
