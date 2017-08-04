/**
 * Created by FDD on 2017/8/4.
 * @desc 控件数据转换
 */
import terraformerWktParser from 'terraformer-wkt-parser'
import * as utils from '../utils/utils'
class GeomParser {
  /**
   * wkt转换为geojson
   * @param geometry
   * @returns {*}
   */
  wkt2GeoJSON (geometry) {
    try {
      return terraformerWktParser.parse(geometry)
    } catch (e) {
      console.info(e)
    }
  }

  /**
   * wkt 转换空间数据数组（保持结构不变）
   * @param geometry
   * @returns {*}
   */
  wkt2ArraySource (geometry) {
    try {
      let geom = terraformerWktParser.parse(geometry)
      if (geom.hasOwnProperty('coordinates') && geom['coordinates'] && Array.isArray(geom['coordinates'])) {
        return geom['coordinates']
      } else {
        throw Error('转换出错！')
      }
    } catch (error) {
      console.info(error)
    }
  }

  /**
   * 合并后的多点多线多面数据
   * @param geometry
   */
  wkt2ArrayFix (geometry) {
    try {
      let coordinates = this.wkt2ArraySource(geometry)
      return (utils.corverRecurrence(coordinates))
    } catch (error) {
      console.info(error)
    }
  }

  /**
   * GeoJSON转换为WKT
   * @param geometry
   * @returns {*}
   */
  geoJSON2Wkt (geometry) {
    try {
      return terraformerWktParser.convert(geometry)
    } catch (error) {
      console.log(error)
    }
  }

  /**
   * 转换空间数据数组（保持结构不变）
   * @param geometry
   * @returns {*}
   */
  geoJSON2ArraySource (geometry) {
    try {
      if (geometry.hasOwnProperty('coordinates') && geometry['coordinates'] && Array.isArray(geometry['coordinates'])) {
        return geometry['coordinates']
      } else {
        throw Error('转换出错！')
      }
    } catch (e) {
      console.info(e)
    }
  }

  /**
   * 合并后的多点多线多面数据
   * @param geometry
   */
  geoJSON2ArrayFix (geometry) {
    try {
      let coordinates = this.geoJSON2ArraySource(geometry)
      return (utils.corverRecurrence(coordinates))
    } catch (error) {
      console.info(error)
    }
  }
}

export default GeomParser
