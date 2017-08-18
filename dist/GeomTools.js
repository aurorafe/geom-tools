/*! This file is created by FDD */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("GeomTools", [], factory);
	else if(typeof exports === 'object')
		exports["GeomTools"] = factory();
	else
		root["GeomTools"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 13);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDistance_ = exports.toRadians = exports.geomEach = exports.flattenEach = exports.distanceToRadians = exports.destination = exports.radiansToDistance = exports.containsNumber = exports.getCoords = exports.getCoord = exports.distance = exports.closeOrderArray = exports.closeDisorderArray = exports.corverRecurrence = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _constants = __webpack_require__(6);

var _constants2 = _interopRequireDefault(_constants);

var _geometry = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var corverRecurrence = exports.corverRecurrence = function corverRecurrence(data) {
  var _data = [];
  function recurrence(items) {
    if (items && Array.isArray(items) && items.length > 0) {
      items.forEach(function (item) {
        if (item && Array.isArray(item) && item.length > 0) {
          _data = _data.concat(item);
        } else {
          recurrence(item);
        }
      });
    }
  }
  recurrence(data);
  return _data;
};

var closeDisorderArray = exports.closeDisorderArray = function closeDisorderArray(arr, num, params) {
  try {
    if (arr && Array.isArray(arr) && arr.length > 0 && typeof num === 'number') {
      var ret = '',
          res_ = null;

      if (Array.isArray(arr[0]) && typeof params === 'number') {
        ret = arr[0][params];
        var _distance = Math.abs(ret - num);
        for (var i = 1; i < arr.length; i++) {
          var newDistance = Math.abs(arr[i][params] - num);
          if (newDistance < _distance) {
            _distance = newDistance;
            ret = arr[i][params];
            res_ = arr[i];
          }
        }
      } else if (_typeof(arr[0]) === 'object' && typeof params === 'string') {
        ret = arr[0][params];
        var _distance2 = Math.abs(ret - num);
        for (var _i = 1; _i < arr.length; _i++) {
          var _newDistance = Math.abs(arr[_i][params] - num);
          if (_newDistance < _distance2) {
            _distance2 = _newDistance;
            ret = arr[_i][params];
            res_ = arr[_i];
          }
        }
      } else if (typeof arr[0] === 'number') {
        ret = arr[0];
        var _distance3 = Math.abs(ret - num);
        for (var _i2 = 1; _i2 < arr.length; _i2++) {
          var _newDistance2 = Math.abs(arr[_i2] - num);
          if (_newDistance2 < _distance3) {
            _distance3 = _newDistance2;
            ret = arr[_i2];
            res_ = arr[_i2];
          }
        }
      }
      return res_;
    } else {
      throw Error('传入数据有误！');
    }
  } catch (error) {
    console.log(error);
  }
};

var closeOrderArray = exports.closeOrderArray = function closeOrderArray(arr, num, params) {
  try {
    var left = 0,
        right = arr.length - 1;

    while (left <= right) {
      var middle = Math.floor((right + left) / 2);
      if (right - left <= 1) {
        break;
      }
      if (Array.isArray(arr[middle]) && typeof params === 'number') {
        if (arr[middle][params] === num) {
          return middle;
        } else if (arr[middle][params] > num) {
          right = middle;
        } else {
          left = middle;
        }
        var leftValue = arr[left][params];
        var rightValue = arr[right][params];
        return rightValue - num > num - leftValue ? leftValue : rightValue;
      } else if (_typeof(arr[middle]) === 'object' && typeof params === 'string') {
        if (arr[middle][params] === num) {
          return middle;
        } else if (arr[middle][params] > num) {
          right = middle;
        } else {
          left = middle;
        }
        var _leftValue = arr[left][params];
        var _rightValue = arr[right][params];
        return _rightValue - num > num - _leftValue ? _leftValue : _rightValue;
      } else if (typeof arr[middle] === 'number') {
        if (arr[middle] === num) {
          return middle;
        } else if (arr[middle] > num) {
          right = middle;
        } else {
          left = middle;
        }
        var _leftValue2 = arr[left];
        var _rightValue2 = arr[right];
        return _rightValue2 - num > num - _leftValue2 ? _leftValue2 : _rightValue2;
      }
    }
  } catch (error) {
    console.log(error);
  }
};

var distance = exports.distance = function distance(from, to, units) {
  var degrees2radians = Math.PI / 180;
  var coordinates1 = getCoord(from);
  var coordinates2 = getCoord(to);
  var dLat = degrees2radians * (coordinates2[1] - coordinates1[1]);
  var dLon = degrees2radians * (coordinates2[0] - coordinates1[0]);
  var lat1 = degrees2radians * coordinates1[1];
  var lat2 = degrees2radians * coordinates2[1];
  var a = Math.pow(Math.sin(dLat / 2), 2) + Math.pow(Math.sin(dLon / 2), 2) * Math.cos(lat1) * Math.cos(lat2);
  return radiansToDistance(2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)), units);
};

var getCoord = exports.getCoord = function getCoord(obj) {
  if (!obj) throw new Error('obj is required');
  var coordinates = getCoords(obj);
  if (coordinates.length > 1 && typeof coordinates[0] === 'number' && typeof coordinates[1] === 'number') {
    return coordinates;
  } else {
    throw new Error('Coordinate is not a valid Point');
  }
};

var getCoords = exports.getCoords = function getCoords(obj) {
  if (!obj) throw new Error('obj is required');
  var coordinates = void 0;

  if (obj.length) {
    coordinates = obj;
  } else if (obj.coordinates) {
    coordinates = obj.coordinates;
  } else if (obj.geometry && obj.geometry.coordinates) {
    coordinates = obj.geometry.coordinates;
  }

  if (coordinates) {
    containsNumber(coordinates);
    return coordinates;
  }
  throw new Error('No valid coordinates');
};

var containsNumber = exports.containsNumber = function containsNumber(coordinates) {
  if (coordinates.length > 1 && typeof coordinates[0] === 'number' && typeof coordinates[1] === 'number') {
    return true;
  }
  if (Array.isArray(coordinates[0]) && coordinates[0].length) {
    return containsNumber(coordinates[0]);
  }
  throw new Error('coordinates must only contain numbers');
};

var radiansToDistance = exports.radiansToDistance = function radiansToDistance(radians, units) {
  if (radians === undefined || radians === null) throw new Error('参数错误');
  var factor = _constants2.default[units || 'kilometers'];
  if (!factor) throw new Error('单位错误！');
  return radians * factor;
};

var destination = exports.destination = function destination(origin, distance, bearing, units) {
  var degrees2radians = Math.PI / 180,
      radians2degrees = 180 / Math.PI;

  var coordinates1 = getCoord(origin);
  var longitude1 = degrees2radians * coordinates1[0],
      latitude1 = degrees2radians * coordinates1[1];

  var bearingRad = degrees2radians * bearing;
  var radians = distanceToRadians(distance, units);
  var latitude2 = Math.asin(Math.sin(latitude1) * Math.cos(radians) + Math.cos(latitude1) * Math.sin(radians) * Math.cos(bearingRad));
  var longitude2 = longitude1 + Math.atan2(Math.sin(bearingRad) * Math.sin(radians) * Math.cos(latitude1), Math.cos(radians) - Math.sin(latitude1) * Math.sin(latitude2));
  return (0, _geometry.point)([radians2degrees * longitude2, radians2degrees * latitude2]);
};

var distanceToRadians = exports.distanceToRadians = function distanceToRadians(distance, units) {
  if (distance === undefined || distance === null) {
    throw new Error('距离必须传入！');
  }
  var factor = _constants2.default[units || 'kilometers'];
  if (!factor) {
    throw new Error('单位错误！');
  }
  return distance / factor;
};

var flattenEach = exports.flattenEach = function flattenEach(geojson, callback) {
  geomEach(geojson, function (geometry, featureIndex, properties) {
    var type = geometry === null ? null : geometry.type;
    switch (type) {
      case null:
      case 'Point':
      case 'LineString':
      case 'Polygon':
        callback((0, _geometry.feature)(geometry, properties), featureIndex, 0);
        return;
    }
    var geomType;

    switch (type) {
      case 'MultiPoint':
        geomType = 'Point';
        break;
      case 'MultiLineString':
        geomType = 'LineString';
        break;
      case 'MultiPolygon':
        geomType = 'Polygon';
        break;
    }
    geometry.coordinates.forEach(function (coordinate, featureSubIndex) {
      var geom = {
        type: geomType,
        coordinates: coordinate
      };
      callback((0, _geometry.feature)(geom, properties), featureIndex, featureSubIndex);
    });
  });
};

var geomEach = exports.geomEach = function geomEach(geojson, callback) {
  var i,
      j,
      g,
      geometry,
      stopG,
      geometryMaybeCollection,
      isGeometryCollection,
      geometryProperties,
      featureIndex = 0,
      isFeatureCollection = geojson.type === 'FeatureCollection',
      isFeature = geojson.type === 'Feature',
      stop = isFeatureCollection ? geojson.features.length : 1;

  for (i = 0; i < stop; i++) {
    geometryMaybeCollection = isFeatureCollection ? geojson.features[i].geometry : isFeature ? geojson.geometry : geojson;
    geometryProperties = isFeatureCollection ? geojson.features[i].properties : isFeature ? geojson.properties : {};
    isGeometryCollection = geometryMaybeCollection ? geometryMaybeCollection.type === 'GeometryCollection' : false;
    stopG = isGeometryCollection ? geometryMaybeCollection.geometries.length : 1;
    for (g = 0; g < stopG; g++) {
      geometry = isGeometryCollection ? geometryMaybeCollection.geometries[g] : geometryMaybeCollection;

      if (geometry === null) {
        callback(null, featureIndex, geometryProperties);
        featureIndex++;
        continue;
      }
      switch (geometry.type) {
        case 'Point':
        case 'LineString':
        case 'MultiPoint':
        case 'Polygon':
        case 'MultiLineString':
        case 'MultiPolygon':
          {
            callback(geometry, featureIndex, geometryProperties);
            featureIndex++;
            break;
          }
        case 'GeometryCollection':
          {
            for (j = 0; j < geometry.geometries.length; j++) {
              callback(geometry.geometries[j], featureIndex, geometryProperties);
              featureIndex++;
            }
            break;
          }
        default:
          throw new Error('Unknown Geometry Type');
      }
    }
  }
};

var toRadians = exports.toRadians = function toRadians(angleInDegrees) {
  return angleInDegrees * Math.PI / 180;
};

var getDistance_ = exports.getDistance_ = function getDistance_(c1, c2, radius) {
  var lat1 = toRadians(c1[1]);
  var lat2 = toRadians(c2[1]);
  var deltaLatBy2 = (lat2 - lat1) / 2;
  var deltaLonBy2 = toRadians(c2[0] - c1[0]) / 2;
  var a = Math.sin(deltaLatBy2) * Math.sin(deltaLatBy2) + Math.sin(deltaLonBy2) * Math.sin(deltaLonBy2) * Math.cos(lat1) * Math.cos(lat2);
  return 2 * radius * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var feature = exports.feature = function feature(geometry, properties, bbox, id) {
  if (geometry === undefined) throw new Error('geometry is required');
  if (properties && properties.constructor !== Object) throw new Error('properties must be an Object');
  var feat = {
    type: 'Feature',
    properties: properties || {},
    geometry: geometry
  };
  if (bbox) {
    if (bbox.length !== 4) throw new Error('bbox must be an Array of 4 numbers');
    feat.bbox = bbox;
  }
  if (id) feat.id = id;
  return feat;
};

var geometry = exports.geometry = function geometry(type, coordinates, bbox) {
  if (!type) throw new Error('type is required');
  if (!coordinates) throw new Error('coordinates is required');
  if (!Array.isArray(coordinates)) throw new Error('coordinates must be an Array');
  var geom;
  switch (type) {
    case 'Point':
      geom = point(coordinates).geometry;
      break;
    case 'LineString':
      geom = lineString(coordinates).geometry;
      break;
    case 'Polygon':
      geom = polygon(coordinates).geometry;
      break;
    case 'MultiPoint':
      geom = multiPoint(coordinates).geometry;
      break;
    case 'MultiLineString':
      geom = multiLineString(coordinates).geometry;
      break;
    case 'MultiPolygon':
      geom = multiPolygon(coordinates).geometry;
      break;
    default:
      throw new Error(type + ' is invalid');
  }
  if (bbox) {
    if (bbox.length !== 4) throw new Error('bbox must be an Array of 4 numbers');
    geom.bbox = bbox;
  }
  return geom;
};

var point = exports.point = function point(coordinates, properties, bbox, id) {
  if (!coordinates) throw new Error('No coordinates passed');
  if (coordinates.length === undefined) throw new Error('Coordinates must be an array');
  if (coordinates.length < 2) throw new Error('Coordinates must be at least 2 numbers long');
  if (typeof coordinates[0] !== 'number' || typeof coordinates[1] !== 'number') throw new Error('Coordinates must contain numbers');
  return feature({
    type: 'Point',
    coordinates: coordinates
  }, properties, bbox, id);
};

var polygon = exports.polygon = function polygon(coordinates, properties, bbox, id) {
  if (!coordinates) throw new Error('No coordinates passed');
  for (var i = 0; i < coordinates.length; i++) {
    var ring = coordinates[i];
    if (ring.length < 4) {
      throw new Error('Each LinearRing of a Polygon must have 4 or more Positions.');
    }
    for (var j = 0; j < ring[ring.length - 1].length; j++) {
      if (ring[ring.length - 1][j] !== ring[0][j]) {
        throw new Error('First and last Position are not equivalent.');
      }
    }
  }
  return feature({
    type: 'Polygon',
    coordinates: coordinates
  }, properties, bbox, id);
};

var lineString = exports.lineString = function lineString(coordinates, properties, bbox, id) {
  if (!coordinates) throw new Error('No coordinates passed');
  if (coordinates.length < 2) throw new Error('Coordinates must be an array of two or more positions');
  return feature({
    type: 'LineString',
    coordinates: coordinates
  }, properties, bbox, id);
};

var featureCollection = exports.featureCollection = function featureCollection(features, bbox) {
  if (!features) throw new Error('No features passed');
  if (!Array.isArray(features)) throw new Error('features must be an Array');
  var fc = {
    type: 'FeatureCollection',
    features: features
  };
  if (bbox) fc.bbox = bbox;
  return fc;
};

var multiLineString = exports.multiLineString = function multiLineString(coordinates, properties, bbox, id) {
  if (!coordinates) throw new Error('No coordinates passed');
  return feature({
    type: 'MultiLineString',
    coordinates: coordinates
  }, properties, bbox, id);
};

var multiPoint = exports.multiPoint = function multiPoint(coordinates, properties, bbox, id) {
  if (!coordinates) throw new Error('No coordinates passed');
  return feature({
    type: 'MultiPoint',
    coordinates: coordinates
  }, properties, bbox, id);
};

var multiPolygon = exports.multiPolygon = function multiPolygon(coordinates, properties, bbox, id) {
  if (!coordinates) throw new Error('No coordinates passed');
  return feature({
    type: 'MultiPolygon',
    coordinates: coordinates
  }, properties, bbox, id);
};

var geometryCollection = exports.geometryCollection = function geometryCollection(geometries, properties, bbox, id) {
  if (!geometries) throw new Error('geometries is required');
  if (!Array.isArray(geometries)) throw new Error('geometries must be an Array');
  return feature({
    type: 'GeometryCollection',
    geometries: geometries
  }, properties, bbox, id);
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function feature(geometry, properties, bbox, id) {
    if (geometry === undefined) throw new Error('geometry is required');
    if (properties && properties.constructor !== Object) throw new Error('properties must be an Object');

    var feat = {
        type: 'Feature',
        properties: properties || {},
        geometry: geometry
    };
    if (bbox) {
        if (bbox.length !== 4) throw new Error('bbox must be an Array of 4 numbers');
        feat.bbox = bbox;
    }
    if (id) feat.id = id;
    return feat;
}

function geometry(type, coordinates, bbox) {
    if (!type) throw new Error('type is required');
    if (!coordinates) throw new Error('coordinates is required');
    if (!Array.isArray(coordinates)) throw new Error('coordinates must be an Array');

    var geom;
    switch (type) {
        case 'Point':
            geom = point(coordinates).geometry;break;
        case 'LineString':
            geom = lineString(coordinates).geometry;break;
        case 'Polygon':
            geom = polygon(coordinates).geometry;break;
        case 'MultiPoint':
            geom = multiPoint(coordinates).geometry;break;
        case 'MultiLineString':
            geom = multiLineString(coordinates).geometry;break;
        case 'MultiPolygon':
            geom = multiPolygon(coordinates).geometry;break;
        default:
            throw new Error(type + ' is invalid');
    }
    if (bbox) {
        if (bbox.length !== 4) throw new Error('bbox must be an Array of 4 numbers');
        geom.bbox = bbox;
    }
    return geom;
}

function point(coordinates, properties, bbox, id) {
    if (!coordinates) throw new Error('No coordinates passed');
    if (coordinates.length === undefined) throw new Error('Coordinates must be an array');
    if (coordinates.length < 2) throw new Error('Coordinates must be at least 2 numbers long');
    if (typeof coordinates[0] !== 'number' || typeof coordinates[1] !== 'number') throw new Error('Coordinates must contain numbers');

    return feature({
        type: 'Point',
        coordinates: coordinates
    }, properties, bbox, id);
}

function polygon(coordinates, properties, bbox, id) {
    if (!coordinates) throw new Error('No coordinates passed');

    for (var i = 0; i < coordinates.length; i++) {
        var ring = coordinates[i];
        if (ring.length < 4) {
            throw new Error('Each LinearRing of a Polygon must have 4 or more Positions.');
        }
        for (var j = 0; j < ring[ring.length - 1].length; j++) {
            if (ring[ring.length - 1][j] !== ring[0][j]) {
                throw new Error('First and last Position are not equivalent.');
            }
        }
    }

    return feature({
        type: 'Polygon',
        coordinates: coordinates
    }, properties, bbox, id);
}

function lineString(coordinates, properties, bbox, id) {
    if (!coordinates) throw new Error('No coordinates passed');
    if (coordinates.length < 2) throw new Error('Coordinates must be an array of two or more positions');

    return feature({
        type: 'LineString',
        coordinates: coordinates
    }, properties, bbox, id);
}

function featureCollection(features, bbox) {
    if (!features) throw new Error('No features passed');
    if (!Array.isArray(features)) throw new Error('features must be an Array');

    var fc = {
        type: 'FeatureCollection',
        features: features
    };
    if (bbox) fc.bbox = bbox;
    return fc;
}

function multiLineString(coordinates, properties, bbox, id) {
    if (!coordinates) throw new Error('No coordinates passed');

    return feature({
        type: 'MultiLineString',
        coordinates: coordinates
    }, properties, bbox, id);
}

function multiPoint(coordinates, properties, bbox, id) {
    if (!coordinates) throw new Error('No coordinates passed');

    return feature({
        type: 'MultiPoint',
        coordinates: coordinates
    }, properties, bbox, id);
}

function multiPolygon(coordinates, properties, bbox, id) {
    if (!coordinates) throw new Error('No coordinates passed');

    return feature({
        type: 'MultiPolygon',
        coordinates: coordinates
    }, properties, bbox, id);
}

function geometryCollection(geometries, properties, bbox, id) {
    if (!geometries) throw new Error('geometries is required');
    if (!Array.isArray(geometries)) throw new Error('geometries must be an Array');

    return feature({
        type: 'GeometryCollection',
        geometries: geometries
    }, properties, bbox, id);
}

var factors = {
    miles: 3960,
    nauticalmiles: 3441.145,
    degrees: 57.2957795,
    radians: 1,
    inches: 250905600,
    yards: 6969600,
    meters: 6373000,
    metres: 6373000,
    centimeters: 6.373e+8,
    centimetres: 6.373e+8,
    kilometers: 6373,
    kilometres: 6373,
    feet: 20908792.65
};

var areaFactors = {
    kilometers: 0.000001,
    kilometres: 0.000001,
    meters: 1,
    metres: 1,
    centimetres: 10000,
    millimeter: 1000000,
    acres: 0.000247105,
    miles: 3.86e-7,
    yards: 1.195990046,
    feet: 10.763910417,
    inches: 1550.003100006
};

function round(num, precision) {
    if (num === undefined || num === null || isNaN(num)) throw new Error('num is required');
    if (precision && !(precision >= 0)) throw new Error('precision must be a positive number');
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(num * multiplier) / multiplier;
}

function radiansToDistance(radians, units) {
    if (radians === undefined || radians === null) throw new Error('radians is required');

    var factor = factors[units || 'kilometers'];
    if (!factor) throw new Error('units is invalid');
    return radians * factor;
}

function distanceToRadians(distance, units) {
    if (distance === undefined || distance === null) throw new Error('distance is required');

    var factor = factors[units || 'kilometers'];
    if (!factor) throw new Error('units is invalid');
    return distance / factor;
}

function distanceToDegrees(distance, units) {
    return radians2degrees(distanceToRadians(distance, units));
}

function bearingToAngle(bearing) {
    if (bearing === null || bearing === undefined) throw new Error('bearing is required');

    var angle = bearing % 360;
    if (angle < 0) angle += 360;
    return angle;
}

function radians2degrees(radians) {
    if (radians === null || radians === undefined) throw new Error('radians is required');

    var degrees = radians % (2 * Math.PI);
    return degrees * 180 / Math.PI;
}

function degrees2radians(degrees) {
    if (degrees === null || degrees === undefined) throw new Error('degrees is required');

    var radians = degrees % 360;
    return radians * Math.PI / 180;
}

function convertDistance(distance, originalUnit, finalUnit) {
    if (distance === null || distance === undefined) throw new Error('distance is required');
    if (!(distance >= 0)) throw new Error('distance must be a positive number');

    var convertedDistance = radiansToDistance(distanceToRadians(distance, originalUnit), finalUnit || 'kilometers');
    return convertedDistance;
}

function convertArea(area, originalUnit, finalUnit) {
    if (area === null || area === undefined) throw new Error('area is required');
    if (!(area >= 0)) throw new Error('area must be a positive number');

    var startFactor = areaFactors[originalUnit || 'meters'];
    if (!startFactor) throw new Error('invalid original units');

    var finalFactor = areaFactors[finalUnit || 'kilometers'];
    if (!finalFactor) throw new Error('invalid final units');

    return area / startFactor * finalFactor;
}

module.exports = {
    feature: feature,
    geometry: geometry,
    featureCollection: featureCollection,
    geometryCollection: geometryCollection,
    point: point,
    multiPoint: multiPoint,
    lineString: lineString,
    multiLineString: multiLineString,
    polygon: polygon,
    multiPolygon: multiPolygon,
    radiansToDistance: radiansToDistance,
    distanceToRadians: distanceToRadians,
    distanceToDegrees: distanceToDegrees,
    radians2degrees: radians2degrees,
    degrees2radians: degrees2radians,
    bearingToAngle: bearingToAngle,
    convertDistance: convertDistance,
    convertArea: convertArea,
    round: round
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _terraformerWktParser = __webpack_require__(20);

var _terraformerWktParser2 = _interopRequireDefault(_terraformerWktParser);

var _utils = __webpack_require__(0);

var utils = _interopRequireWildcard(_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GeomParser = function () {
  function GeomParser() {
    _classCallCheck(this, GeomParser);
  }

  _createClass(GeomParser, [{
    key: 'wkt2GeoJSON',
    value: function wkt2GeoJSON(geometry) {
      try {
        return _terraformerWktParser2.default.parse(geometry);
      } catch (e) {
        console.info(e);
      }
    }
  }, {
    key: 'wkt2ArraySource',
    value: function wkt2ArraySource(geometry) {
      try {
        var geom = _terraformerWktParser2.default.parse(geometry);
        if (geom.hasOwnProperty('coordinates') && geom['coordinates'] && Array.isArray(geom['coordinates'])) {
          return geom['coordinates'];
        } else {
          throw Error('转换出错！');
        }
      } catch (error) {
        console.info(error);
      }
    }
  }, {
    key: 'wkt2ArrayFix',
    value: function wkt2ArrayFix(geometry) {
      try {
        var coordinates = this.wkt2ArraySource(geometry);
        return utils.corverRecurrence(coordinates);
      } catch (error) {
        console.info(error);
      }
    }
  }, {
    key: 'geoJSON2Wkt',
    value: function geoJSON2Wkt(geometry) {
      try {
        return _terraformerWktParser2.default.convert(geometry);
      } catch (error) {
        console.log(error);
      }
    }
  }, {
    key: 'geoJSON2ArraySource',
    value: function geoJSON2ArraySource(geometry) {
      try {
        if (geometry.hasOwnProperty('coordinates') && geometry['coordinates'] && Array.isArray(geometry['coordinates'])) {
          return geometry['coordinates'];
        } else {
          throw Error('转换出错！');
        }
      } catch (e) {
        console.info(e);
      }
    }
  }, {
    key: 'geoJSON2ArrayFix',
    value: function geoJSON2ArrayFix(geometry) {
      try {
        var coordinates = this.geoJSON2ArraySource(geometry);
        return utils.corverRecurrence(coordinates);
      } catch (error) {
        console.info(error);
      }
    }
  }]);

  return GeomParser;
}();

exports.default = GeomParser;
module.exports = exports['default'];

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function getCoord(obj) {
    if (!obj) throw new Error('obj is required');

    var coordinates = getCoords(obj);

    if (coordinates.length > 1 && typeof coordinates[0] === 'number' && typeof coordinates[1] === 'number') {
        return coordinates;
    } else {
        throw new Error('Coordinate is not a valid Point');
    }
}

function getCoords(obj) {
    if (!obj) throw new Error('obj is required');
    var coordinates;

    if (obj.length) {
        coordinates = obj;
    } else if (obj.coordinates) {
        coordinates = obj.coordinates;
    } else if (obj.geometry && obj.geometry.coordinates) {
        coordinates = obj.geometry.coordinates;
    }

    if (coordinates) {
        containsNumber(coordinates);
        return coordinates;
    }
    throw new Error('No valid coordinates');
}

function containsNumber(coordinates) {
    if (coordinates.length > 1 && typeof coordinates[0] === 'number' && typeof coordinates[1] === 'number') {
        return true;
    }

    if (Array.isArray(coordinates[0]) && coordinates[0].length) {
        return containsNumber(coordinates[0]);
    }
    throw new Error('coordinates must only contain numbers');
}

function geojsonType(value, type, name) {
    if (!type || !name) throw new Error('type and name required');

    if (!value || value.type !== type) {
        throw new Error('Invalid input to ' + name + ': must be a ' + type + ', given ' + value.type);
    }
}

function featureOf(feature, type, name) {
    if (!feature) throw new Error('No feature passed');
    if (!name) throw new Error('.featureOf() requires a name');
    if (!feature || feature.type !== 'Feature' || !feature.geometry) {
        throw new Error('Invalid input to ' + name + ', Feature with geometry required');
    }
    if (!feature.geometry || feature.geometry.type !== type) {
        throw new Error('Invalid input to ' + name + ': must be a ' + type + ', given ' + feature.geometry.type);
    }
}

function collectionOf(featureCollection, type, name) {
    if (!featureCollection) throw new Error('No featureCollection passed');
    if (!name) throw new Error('.collectionOf() requires a name');
    if (!featureCollection || featureCollection.type !== 'FeatureCollection') {
        throw new Error('Invalid input to ' + name + ', FeatureCollection required');
    }
    for (var i = 0; i < featureCollection.features.length; i++) {
        var feature = featureCollection.features[i];
        if (!feature || feature.type !== 'Feature' || !feature.geometry) {
            throw new Error('Invalid input to ' + name + ', Feature with geometry required');
        }
        if (!feature.geometry || feature.geometry.type !== type) {
            throw new Error('Invalid input to ' + name + ': must be a ' + type + ', given ' + feature.geometry.type);
        }
    }
}

function getGeom(geojson) {
    if (!geojson) throw new Error('geojson is required');
    if (geojson.geometry !== undefined) return geojson.geometry;
    if (geojson.coordinates || geojson.geometries) return geojson;
    throw new Error('geojson must be a valid Feature or Geometry Object');
}

function getGeomType(geojson) {
    if (!geojson) throw new Error('geojson is required');
    var geom = getGeom(geojson);
    if (geom) return geom.type;
}

module.exports = {
    geojsonType: geojsonType,
    collectionOf: collectionOf,
    featureOf: featureOf,
    getCoord: getCoord,
    getCoords: getCoords,
    containsNumber: containsNumber,
    getGeom: getGeom,
    getGeomType: getGeomType
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function coordEach(geojson, callback, excludeWrapCoord) {
    if (geojson === null) return;
    var featureIndex,
        geometryIndex,
        j,
        k,
        l,
        geometry,
        stopG,
        coords,
        geometryMaybeCollection,
        wrapShrink = 0,
        coordIndex = 0,
        isGeometryCollection,
        type = geojson.type,
        isFeatureCollection = type === 'FeatureCollection',
        isFeature = type === 'Feature',
        stop = isFeatureCollection ? geojson.features.length : 1;

    for (featureIndex = 0; featureIndex < stop; featureIndex++) {
        var featureSubIndex = 0;

        geometryMaybeCollection = isFeatureCollection ? geojson.features[featureIndex].geometry : isFeature ? geojson.geometry : geojson;
        isGeometryCollection = geometryMaybeCollection ? geometryMaybeCollection.type === 'GeometryCollection' : false;
        stopG = isGeometryCollection ? geometryMaybeCollection.geometries.length : 1;

        for (geometryIndex = 0; geometryIndex < stopG; geometryIndex++) {
            geometry = isGeometryCollection ? geometryMaybeCollection.geometries[geometryIndex] : geometryMaybeCollection;

            if (geometry === null) continue;
            coords = geometry.coordinates;
            var geomType = geometry.type;

            wrapShrink = excludeWrapCoord && (geomType === 'Polygon' || geomType === 'MultiPolygon') ? 1 : 0;

            switch (geomType) {
                case null:
                    break;
                case 'Point':
                    callback(coords, coordIndex, featureIndex, featureSubIndex);
                    coordIndex++;
                    featureSubIndex++;
                    break;
                case 'LineString':
                case 'MultiPoint':
                    for (j = 0; j < coords.length; j++) {
                        callback(coords[j], coordIndex, featureIndex, featureSubIndex);
                        coordIndex++;
                        featureSubIndex++;
                    }
                    break;
                case 'Polygon':
                case 'MultiLineString':
                    for (j = 0; j < coords.length; j++) {
                        for (k = 0; k < coords[j].length - wrapShrink; k++) {
                            callback(coords[j][k], coordIndex, featureIndex, featureSubIndex);
                            coordIndex++;
                            featureSubIndex++;
                        }
                    }break;
                case 'MultiPolygon':
                    for (j = 0; j < coords.length; j++) {
                        for (k = 0; k < coords[j].length; k++) {
                            for (l = 0; l < coords[j][k].length - wrapShrink; l++) {
                                callback(coords[j][k][l], coordIndex, featureIndex, featureSubIndex);
                                coordIndex++;
                                featureSubIndex++;
                            }
                        }
                    }break;
                case 'GeometryCollection':
                    for (j = 0; j < geometry.geometries.length; j++) {
                        coordEach(geometry.geometries[j], callback, excludeWrapCoord);
                    }break;
                default:
                    throw new Error('Unknown Geometry Type');
            }
        }
    }
}

function coordReduce(geojson, callback, initialValue, excludeWrapCoord) {
    var previousValue = initialValue;
    coordEach(geojson, function (currentCoord, coordIndex, featureIndex, featureSubIndex) {
        if (coordIndex === 0 && initialValue === undefined) previousValue = currentCoord;else previousValue = callback(previousValue, currentCoord, coordIndex, featureIndex, featureSubIndex);
    }, excludeWrapCoord);
    return previousValue;
}

function propEach(geojson, callback) {
    var i;
    switch (geojson.type) {
        case 'FeatureCollection':
            for (i = 0; i < geojson.features.length; i++) {
                callback(geojson.features[i].properties, i);
            }
            break;
        case 'Feature':
            callback(geojson.properties, 0);
            break;
    }
}

function propReduce(geojson, callback, initialValue) {
    var previousValue = initialValue;
    propEach(geojson, function (currentProperties, featureIndex) {
        if (featureIndex === 0 && initialValue === undefined) previousValue = currentProperties;else previousValue = callback(previousValue, currentProperties, featureIndex);
    });
    return previousValue;
}

function featureEach(geojson, callback) {
    if (geojson.type === 'Feature') {
        callback(geojson, 0);
    } else if (geojson.type === 'FeatureCollection') {
        for (var i = 0; i < geojson.features.length; i++) {
            callback(geojson.features[i], i);
        }
    }
}

function featureReduce(geojson, callback, initialValue) {
    var previousValue = initialValue;
    featureEach(geojson, function (currentFeature, featureIndex) {
        if (featureIndex === 0 && initialValue === undefined) previousValue = currentFeature;else previousValue = callback(previousValue, currentFeature, featureIndex);
    });
    return previousValue;
}

function coordAll(geojson) {
    var coords = [];
    coordEach(geojson, function (coord) {
        coords.push(coord);
    });
    return coords;
}

function geomEach(geojson, callback) {
    var i,
        j,
        g,
        geometry,
        stopG,
        geometryMaybeCollection,
        isGeometryCollection,
        geometryProperties,
        featureIndex = 0,
        isFeatureCollection = geojson.type === 'FeatureCollection',
        isFeature = geojson.type === 'Feature',
        stop = isFeatureCollection ? geojson.features.length : 1;

    for (i = 0; i < stop; i++) {

        geometryMaybeCollection = isFeatureCollection ? geojson.features[i].geometry : isFeature ? geojson.geometry : geojson;
        geometryProperties = isFeatureCollection ? geojson.features[i].properties : isFeature ? geojson.properties : {};
        isGeometryCollection = geometryMaybeCollection ? geometryMaybeCollection.type === 'GeometryCollection' : false;
        stopG = isGeometryCollection ? geometryMaybeCollection.geometries.length : 1;

        for (g = 0; g < stopG; g++) {
            geometry = isGeometryCollection ? geometryMaybeCollection.geometries[g] : geometryMaybeCollection;

            if (geometry === null) {
                callback(null, featureIndex, geometryProperties);
                featureIndex++;
                continue;
            }
            switch (geometry.type) {
                case 'Point':
                case 'LineString':
                case 'MultiPoint':
                case 'Polygon':
                case 'MultiLineString':
                case 'MultiPolygon':
                    {
                        callback(geometry, featureIndex, geometryProperties);
                        featureIndex++;
                        break;
                    }
                case 'GeometryCollection':
                    {
                        for (j = 0; j < geometry.geometries.length; j++) {
                            callback(geometry.geometries[j], featureIndex, geometryProperties);
                            featureIndex++;
                        }
                        break;
                    }
                default:
                    throw new Error('Unknown Geometry Type');
            }
        }
    }
}

function geomReduce(geojson, callback, initialValue) {
    var previousValue = initialValue;
    geomEach(geojson, function (currentGeometry, currentIndex, currentProperties) {
        if (currentIndex === 0 && initialValue === undefined) previousValue = currentGeometry;else previousValue = callback(previousValue, currentGeometry, currentIndex, currentProperties);
    });
    return previousValue;
}

function flattenEach(geojson, callback) {
    geomEach(geojson, function (geometry, featureIndex, properties) {
        var type = geometry === null ? null : geometry.type;
        switch (type) {
            case null:
            case 'Point':
            case 'LineString':
            case 'Polygon':
                callback(feature(geometry, properties), featureIndex, 0);
                return;
        }

        var geomType;

        switch (type) {
            case 'MultiPoint':
                geomType = 'Point';
                break;
            case 'MultiLineString':
                geomType = 'LineString';
                break;
            case 'MultiPolygon':
                geomType = 'Polygon';
                break;
        }

        geometry.coordinates.forEach(function (coordinate, featureSubIndex) {
            var geom = {
                type: geomType,
                coordinates: coordinate
            };
            callback(feature(geom, properties), featureIndex, featureSubIndex);
        });
    });
}

function flattenReduce(geojson, callback, initialValue) {
    var previousValue = initialValue;
    flattenEach(geojson, function (currentFeature, featureIndex, featureSubIndex) {
        if (featureIndex === 0 && featureSubIndex === 0 && initialValue === undefined) previousValue = currentFeature;else previousValue = callback(previousValue, currentFeature, featureIndex, featureSubIndex);
    });
    return previousValue;
}

function segmentEach(geojson, callback) {
    flattenEach(geojson, function (feature, featureIndex) {
        var featureSubIndex = 0;

        if (!feature.geometry) return;

        var type = feature.geometry.type;
        if (type === 'Point' || type === 'MultiPoint') return;

        coordReduce(feature, function (previousCoords, currentCoord) {
            var currentSegment = lineString([previousCoords, currentCoord], feature.properties);
            callback(currentSegment, featureIndex, featureSubIndex);
            featureSubIndex++;
            return currentCoord;
        });
    });
}

function segmentReduce(geojson, callback, initialValue) {
    var previousValue = initialValue;
    segmentEach(geojson, function (currentSegment, currentIndex, currentSubIndex) {
        if (currentIndex === 0 && initialValue === undefined) previousValue = currentSegment;else previousValue = callback(previousValue, currentSegment, currentIndex, currentSubIndex);
    });
    return previousValue;
}

function feature(geometry, properties) {
    if (geometry === undefined) throw new Error('No geometry passed');

    return {
        type: 'Feature',
        properties: properties || {},
        geometry: geometry
    };
}

function lineString(coordinates, properties) {
    if (!coordinates) throw new Error('No coordinates passed');
    if (coordinates.length < 2) throw new Error('Coordinates must be an array of two or more positions');

    return {
        type: 'Feature',
        properties: properties || {},
        geometry: {
            type: 'LineString',
            coordinates: coordinates
        }
    };
}

module.exports = {
    coordEach: coordEach,
    coordReduce: coordReduce,
    propEach: propEach,
    propReduce: propReduce,
    featureEach: featureEach,
    featureReduce: featureReduce,
    coordAll: coordAll,
    geomEach: geomEach,
    geomReduce: geomReduce,
    flattenEach: flattenEach,
    flattenReduce: flattenReduce,
    segmentEach: segmentEach,
    segmentReduce: segmentReduce
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  miles: 3960,
  nauticalmiles: 3441.145,
  degrees: 57.2957795,
  radians: 1,
  inches: 250905600,
  yards: 6969600,
  meters: 6373000,
  metres: 6373000,
  radius: 6378137,
  centimeters: 6.373e+8,
  centimetres: 6.373e+8,
  kilometers: 6373,
  kilometres: 6373,
  feet: 20908792.65
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function coordEach(layer, callback, excludeWrapCoord) {
    var i,
        j,
        k,
        g,
        l,
        geometry,
        stopG,
        coords,
        geometryMaybeCollection,
        wrapShrink = 0,
        currentIndex = 0,
        isGeometryCollection,
        isFeatureCollection = layer.type === 'FeatureCollection',
        isFeature = layer.type === 'Feature',
        stop = isFeatureCollection ? layer.features.length : 1;

    for (i = 0; i < stop; i++) {

        geometryMaybeCollection = isFeatureCollection ? layer.features[i].geometry : isFeature ? layer.geometry : layer;
        isGeometryCollection = geometryMaybeCollection.type === 'GeometryCollection';
        stopG = isGeometryCollection ? geometryMaybeCollection.geometries.length : 1;

        for (g = 0; g < stopG; g++) {
            geometry = isGeometryCollection ? geometryMaybeCollection.geometries[g] : geometryMaybeCollection;
            coords = geometry.coordinates;

            wrapShrink = excludeWrapCoord && (geometry.type === 'Polygon' || geometry.type === 'MultiPolygon') ? 1 : 0;

            if (geometry.type === 'Point') {
                callback(coords, currentIndex);
                currentIndex++;
            } else if (geometry.type === 'LineString' || geometry.type === 'MultiPoint') {
                for (j = 0; j < coords.length; j++) {
                    callback(coords[j], currentIndex);
                    currentIndex++;
                }
            } else if (geometry.type === 'Polygon' || geometry.type === 'MultiLineString') {
                for (j = 0; j < coords.length; j++) {
                    for (k = 0; k < coords[j].length - wrapShrink; k++) {
                        callback(coords[j][k], currentIndex);
                        currentIndex++;
                    }
                }
            } else if (geometry.type === 'MultiPolygon') {
                for (j = 0; j < coords.length; j++) {
                    for (k = 0; k < coords[j].length; k++) {
                        for (l = 0; l < coords[j][k].length - wrapShrink; l++) {
                            callback(coords[j][k][l], currentIndex);
                            currentIndex++;
                        }
                    }
                }
            } else if (geometry.type === 'GeometryCollection') {
                for (j = 0; j < geometry.geometries.length; j++) {
                    coordEach(geometry.geometries[j], callback, excludeWrapCoord);
                }
            } else {
                throw new Error('Unknown Geometry Type');
            }
        }
    }
}
module.exports.coordEach = coordEach;

function coordReduce(layer, callback, initialValue, excludeWrapCoord) {
    var previousValue = initialValue;
    coordEach(layer, function (currentCoords, currentIndex) {
        if (currentIndex === 0 && initialValue === undefined) {
            previousValue = currentCoords;
        } else {
            previousValue = callback(previousValue, currentCoords, currentIndex);
        }
    }, excludeWrapCoord);
    return previousValue;
}
module.exports.coordReduce = coordReduce;

function propEach(layer, callback) {
    var i;
    switch (layer.type) {
        case 'FeatureCollection':
            for (i = 0; i < layer.features.length; i++) {
                callback(layer.features[i].properties, i);
            }
            break;
        case 'Feature':
            callback(layer.properties, 0);
            break;
    }
}
module.exports.propEach = propEach;

function propReduce(layer, callback, initialValue) {
    var previousValue = initialValue;
    propEach(layer, function (currentProperties, currentIndex) {
        if (currentIndex === 0 && initialValue === undefined) {
            previousValue = currentProperties;
        } else {
            previousValue = callback(previousValue, currentProperties, currentIndex);
        }
    });
    return previousValue;
}
module.exports.propReduce = propReduce;

function featureEach(layer, callback) {
    if (layer.type === 'Feature') {
        callback(layer, 0);
    } else if (layer.type === 'FeatureCollection') {
        for (var i = 0; i < layer.features.length; i++) {
            callback(layer.features[i], i);
        }
    }
}
module.exports.featureEach = featureEach;

function featureReduce(layer, callback, initialValue) {
    var previousValue = initialValue;
    featureEach(layer, function (currentFeature, currentIndex) {
        if (currentIndex === 0 && initialValue === undefined) {
            previousValue = currentFeature;
        } else {
            previousValue = callback(previousValue, currentFeature, currentIndex);
        }
    });
    return previousValue;
}
module.exports.featureReduce = featureReduce;

function coordAll(layer) {
    var coords = [];
    coordEach(layer, function (coord) {
        coords.push(coord);
    });
    return coords;
}
module.exports.coordAll = coordAll;

function geomEach(layer, callback) {
    var i,
        j,
        g,
        geometry,
        stopG,
        geometryMaybeCollection,
        isGeometryCollection,
        currentIndex = 0,
        isFeatureCollection = layer.type === 'FeatureCollection',
        isFeature = layer.type === 'Feature',
        stop = isFeatureCollection ? layer.features.length : 1;

    for (i = 0; i < stop; i++) {

        geometryMaybeCollection = isFeatureCollection ? layer.features[i].geometry : isFeature ? layer.geometry : layer;
        isGeometryCollection = geometryMaybeCollection.type === 'GeometryCollection';
        stopG = isGeometryCollection ? geometryMaybeCollection.geometries.length : 1;

        for (g = 0; g < stopG; g++) {
            geometry = isGeometryCollection ? geometryMaybeCollection.geometries[g] : geometryMaybeCollection;

            if (geometry.type === 'Point' || geometry.type === 'LineString' || geometry.type === 'MultiPoint' || geometry.type === 'Polygon' || geometry.type === 'MultiLineString' || geometry.type === 'MultiPolygon') {
                callback(geometry, currentIndex);
                currentIndex++;
            } else if (geometry.type === 'GeometryCollection') {
                for (j = 0; j < geometry.geometries.length; j++) {
                    callback(geometry.geometries[j], currentIndex);
                    currentIndex++;
                }
            } else {
                throw new Error('Unknown Geometry Type');
            }
        }
    }
}
module.exports.geomEach = geomEach;

function geomReduce(layer, callback, initialValue) {
    var previousValue = initialValue;
    geomEach(layer, function (currentGeometry, currentIndex) {
        if (currentIndex === 0 && initialValue === undefined) {
            previousValue = currentGeometry;
        } else {
            previousValue = callback(previousValue, currentGeometry, currentIndex);
        }
    });
    return previousValue;
}
module.exports.geomReduce = geomReduce;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function () {};
		module.paths = [];

		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function get() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function get() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(0);

var utils = _interopRequireWildcard(_utils);

var _bearing = __webpack_require__(14);

var _lineIntersect = __webpack_require__(11);

var _lineIntersect2 = _interopRequireDefault(_lineIntersect);

var _constants = __webpack_require__(6);

var _constants2 = _interopRequireDefault(_constants);

var _geometry = __webpack_require__(1);

var geometryUtils = _interopRequireWildcard(_geometry);

var _GeomParser = __webpack_require__(3);

var _GeomParser2 = _interopRequireDefault(_GeomParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LrsUtils = function () {
  function LrsUtils() {
    _classCallCheck(this, LrsUtils);
  }

  _createClass(LrsUtils, [{
    key: 'getClosePointFromLines',
    value: function getClosePointFromLines(lines, point, units) {
      try {
        var type = lines.geometry ? lines.geometry.type : lines.type;
        if (type !== 'LineString' && type !== 'MultiLineString') {
          throw new Error('lines must be LineString or MultiLineString');
        }
        var closestPoint = geometryUtils.point([Infinity, Infinity], {
          dist: Infinity
        });
        var length = 0.0;
        utils.flattenEach(lines, function (line) {
          var coords = utils.getCoords(line);
          for (var i = 0; i < coords.length - 1; i++) {
            if (coords[i].length < 3) {
              continue;
            } else {
              var start = geometryUtils.point(coords[i]);
              start.properties.dist = utils.distance(point, start, units);

              var stop = geometryUtils.point(coords[i + 1]);
              stop.properties.dist = utils.distance(point, stop, units);

              var sectionLength = utils.distance(start, stop, units);

              var heightDistance = Math.max(start.properties.dist, stop.properties.dist);
              var direction = (0, _bearing.bearing)(start, stop);
              var perpendicularPt1 = utils.destination(point, heightDistance, direction + 90, units);
              var perpendicularPt2 = utils.destination(point, heightDistance, direction - 90, units);
              var intersect = (0, _lineIntersect2.default)(geometryUtils.lineString([perpendicularPt1.geometry.coordinates, perpendicularPt2.geometry.coordinates]), geometryUtils.lineString([start.geometry.coordinates, stop.geometry.coordinates]));
              var intersectPt = null;
              if (intersect.features.length > 0) {
                intersectPt = intersect.features[0];
                intersectPt.properties.dist = utils.distance(point, intersectPt, units);
                intersectPt.properties.location = length + utils.distance(start, intersectPt, units);
              }
              if (start.properties.dist < closestPoint.properties.dist) {
                closestPoint = start;
                closestPoint.properties.index = i;
                closestPoint.properties.location = length;
              }
              if (stop.properties.dist < closestPoint.properties.dist) {
                closestPoint = stop;
                closestPoint.properties.index = i + 1;
                closestPoint.properties.location = length + sectionLength;
              }
              if (intersectPt && intersectPt.properties.dist < closestPoint.properties.dist) {
                closestPoint = intersectPt;
                closestPoint.properties.index = i;
              }

              length += sectionLength;
            }
          }
        });
        return closestPoint;
      } catch (error) {
        console.log(error);
      }
    }
  }, {
    key: 'getClosePointFromLinesHasM',
    value: function getClosePointFromLinesHasM(lines, point, epsg) {
      try {
        var pointSnap = null;
        if (Array.isArray(lines) && lines.length > 0) {
          var start = {
            dist: Infinity,
            index: Infinity
          },
              stop = {};

          for (var i = 0; i < lines.length - 1; i++) {
            if (lines[i].length < 3) {
              continue;
            } else {
              var dist = utils.getDistance_(point, lines[i], _constants2.default['radius']);
              stop['dist'] = dist;
              stop['coords'] = lines[i];
              stop['index'] = i;
              var corver_ = function corver_(_start, _stop) {
                if (_start['dist'] < _stop['dist']) {
                  _start = JSON.stringify(_start);
                } else {
                  _start = JSON.stringify(_stop);
                }
                return JSON.parse(_start);
              };
              start = corver_(start, stop);
              pointSnap = start;
            }
          }
        }
        return pointSnap;
      } catch (error) {
        console.log(error);
      }
    }
  }, {
    key: 'getPointByMileage',
    value: function getPointByMileage(lines, mile) {
      try {
        if (typeof lines === 'string' && (lines.indexOf('LINESTRING') >= 0 || lines.indexOf('MULTILINESTRING')) >= 0) {
          var _coords = new _GeomParser2.default().wkt2ArrayFix(lines);
          return utils.closeDisorderArray(_coords, mile, 2);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, {
    key: 'getMileageByPoint',
    value: function getMileageByPoint(lines, coordinates) {
      try {
        if (typeof lines === 'string' && (lines.indexOf('LINESTRING') >= 0 || lines.indexOf('MULTILINESTRING')) >= 0) {
          var _gLines = new _GeomParser2.default().wkt2GeoJSON(lines);
          return this.getClosePointFromLines(_gLines, geometryUtils.point(coordinates), 'miles');
        }
      } catch (error) {
        console.log(error);
      }
    }
  }]);

  return LrsUtils;
}();

exports.default = LrsUtils;
module.exports = exports['default'];

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var polygon = __webpack_require__(2).polygon;

module.exports = function (bbox) {
    var lowLeft = [bbox[0], bbox[1]];
    var topLeft = [bbox[0], bbox[3]];
    var topRight = [bbox[2], bbox[3]];
    var lowRight = [bbox[2], bbox[1]];

    return polygon([[lowLeft, lowRight, topRight, topLeft, lowLeft]]);
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var meta = __webpack_require__(5);
var rbush = __webpack_require__(15);
var helpers = __webpack_require__(2);
var getCoords = __webpack_require__(4).getCoords;
var lineSegment = __webpack_require__(12);
var point = helpers.point;
var featureEach = meta.featureEach;
var featureCollection = helpers.featureCollection;

module.exports = function (line1, line2) {
    var unique = {};
    var results = [];

    if (line1.type === 'LineString') line1 = helpers.feature(line1);
    if (line2.type === 'LineString') line2 = helpers.feature(line2);
    if (line1.type === 'Feature' && line2.type === 'Feature' && line1.geometry.type === 'LineString' && line2.geometry.type === 'LineString' && line1.geometry.coordinates.length === 2 && line2.geometry.coordinates.length === 2) {
        var intersect = intersects(line1, line2);
        if (intersect) results.push(intersect);
        return featureCollection(results);
    }

    var tree = rbush();
    tree.load(lineSegment(line2));
    featureEach(lineSegment(line1), function (segment) {
        featureEach(tree.search(segment), function (match) {
            var intersect = intersects(segment, match);
            if (intersect) {
                var key = getCoords(intersect).join(',');
                if (!unique[key]) {
                    unique[key] = true;
                    results.push(intersect);
                }
            }
        });
    });
    return featureCollection(results);
};

function intersects(line1, line2) {
    var coords1 = getCoords(line1);
    var coords2 = getCoords(line2);
    if (coords1.length !== 2) {
        throw new Error('<intersects> line1 must only contain 2 coordinates');
    }
    if (coords2.length !== 2) {
        throw new Error('<intersects> line2 must only contain 2 coordinates');
    }
    var x1 = coords1[0][0];
    var y1 = coords1[0][1];
    var x2 = coords1[1][0];
    var y2 = coords1[1][1];
    var x3 = coords2[0][0];
    var y3 = coords2[0][1];
    var x4 = coords2[1][0];
    var y4 = coords2[1][1];
    var denom = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);
    var numeA = (x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3);
    var numeB = (x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3);

    if (denom === 0) {
        if (numeA === 0 && numeB === 0) {
            return null;
        }
        return null;
    }

    var uA = numeA / denom;
    var uB = numeB / denom;

    if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
        var x = x1 + uA * (x2 - x1);
        var y = y1 + uA * (y2 - y1);
        return point([x, y]);
    }
    return null;
}

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var helpers = __webpack_require__(2);
var getCoords = __webpack_require__(4).getCoords;
var flattenEach = __webpack_require__(5).flattenEach;
var lineString = helpers.lineString;
var featureCollection = helpers.featureCollection;

module.exports = function (geojson) {
    if (!geojson) throw new Error('geojson is required');

    var results = [];
    flattenEach(geojson, function (feature) {
        lineSegment(feature, results);
    });
    return featureCollection(results);
};

function lineSegment(geojson, results) {
    var coords = [];
    var geometry = geojson.geometry;
    switch (geometry.type) {
        case 'Polygon':
            coords = getCoords(geometry);
            break;
        case 'LineString':
            coords = [getCoords(geometry)];
    }
    coords.forEach(function (coord) {
        var segments = createSegments(coord, geojson.properties);
        segments.forEach(function (segment) {
            segment.id = results.length;
            results.push(segment);
        });
    });
}

function createSegments(coords, properties) {
    var segments = [];
    coords.reduce(function (previousCoords, currentCoords) {
        var segment = lineString([previousCoords, currentCoords], properties);
        segment.bbox = bbox(previousCoords, currentCoords);
        segments.push(segment);
        return currentCoords;
    });
    return segments;
}

function bbox(coords1, coords2) {
    var x1 = coords1[0];
    var y1 = coords1[1];
    var x2 = coords2[0];
    var y2 = coords2[1];
    var west = x1 < x2 ? x1 : x2;
    var south = y1 < y2 ? y1 : y2;
    var east = x1 > x2 ? x1 : x2;
    var north = y1 > y2 ? y1 : y2;
    return [west, south, east, north];
}

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _GeomParser = __webpack_require__(3);

var _GeomParser2 = _interopRequireDefault(_GeomParser);

var _LrsUtils = __webpack_require__(9);

var _LrsUtils2 = _interopRequireDefault(_LrsUtils);

var _utils = __webpack_require__(0);

var utils = _interopRequireWildcard(_utils);

var _geometry = __webpack_require__(1);

var geometry = _interopRequireWildcard(_geometry);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  GeomParser: _GeomParser2.default,
  LrsUtils: _LrsUtils2.default,
  utils: utils,
  geometry: geometry
};
module.exports = exports['default'];

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calculateFinalBearing = exports.bearing = undefined;

var _utils = __webpack_require__(0);

var bearing = exports.bearing = function bearing(start, end, final) {
  if (final === true) {
    return calculateFinalBearing(start, end);
  } else {
    var degrees2radians = Math.PI / 180,
        radians2degrees = 180 / Math.PI;

    var coordinates1 = (0, _utils.getCoord)(start);
    var coordinates2 = (0, _utils.getCoord)(end);
    var lon1 = degrees2radians * coordinates1[0],
        lon2 = degrees2radians * coordinates2[0],
        lat1 = degrees2radians * coordinates1[1],
        lat2 = degrees2radians * coordinates2[1];
    var a = Math.sin(lon2 - lon1) * Math.cos(lat2),
        b = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1);

    return radians2degrees * Math.atan2(a, b);
  }
};

var calculateFinalBearing = exports.calculateFinalBearing = function calculateFinalBearing(start, end) {
  var bear = bearing(end, start);
  bear = (bear + 180) % 360;
  return bear;
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var turfBBox = __webpack_require__(16);
var featureCollection = __webpack_require__(17).featureCollection;
var featureEach = __webpack_require__(7).featureEach;
var bboxPolygon = __webpack_require__(10);
var rbush = __webpack_require__(19);

module.exports = function (maxEntries) {
    var tree = rbush(maxEntries);

    tree.insert = function (feature) {
        if (Array.isArray(feature)) {
            var bbox = feature;
            feature = bboxPolygon(bbox);
            feature.bbox = bbox;
        } else {
            feature.bbox = feature.bbox ? feature.bbox : turfBBox(feature);
        }
        return rbush.prototype.insert.call(this, feature);
    };

    tree.load = function (features) {
        var load = [];

        if (Array.isArray(features)) {
            features.forEach(function (bbox) {
                var feature = bboxPolygon(bbox);
                feature.bbox = bbox;
                load.push(feature);
            });
        } else {
            featureEach(features, function (feature) {
                feature.bbox = feature.bbox ? feature.bbox : turfBBox(feature);
                load.push(feature);
            });
        }
        return rbush.prototype.load.call(this, load);
    };

    tree.remove = function (feature) {
        if (Array.isArray(feature)) {
            var bbox = feature;
            feature = bboxPolygon(bbox);
            feature.bbox = bbox;
        }
        return rbush.prototype.remove.call(this, feature);
    };

    tree.clear = function () {
        return rbush.prototype.clear.call(this);
    };

    tree.search = function (geojson) {
        var search = rbush.prototype.search.call(this, this.toBBox(geojson));
        return featureCollection(search);
    };

    tree.collides = function (geojson) {
        return rbush.prototype.collides.call(this, this.toBBox(geojson));
    };

    tree.all = function () {
        var all = rbush.prototype.all.call(this);
        return featureCollection(all);
    };

    tree.toJSON = function () {
        return rbush.prototype.toJSON.call(this);
    };

    tree.fromJSON = function (json) {
        return rbush.prototype.fromJSON.call(this, json);
    };

    tree.toBBox = function (geojson) {
        var bbox;
        if (geojson.bbox) bbox = geojson.bbox;else if (Array.isArray(geojson) && geojson.length === 4) bbox = geojson;else bbox = turfBBox(geojson);

        return {
            minX: bbox[0],
            minY: bbox[1],
            maxX: bbox[2],
            maxY: bbox[3]
        };
    };
    return tree;
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var each = __webpack_require__(7).coordEach;

module.exports = function (geojson) {
    var bbox = [Infinity, Infinity, -Infinity, -Infinity];
    each(geojson, function (coord) {
        if (bbox[0] > coord[0]) bbox[0] = coord[0];
        if (bbox[1] > coord[1]) bbox[1] = coord[1];
        if (bbox[2] < coord[0]) bbox[2] = coord[0];
        if (bbox[3] < coord[1]) bbox[3] = coord[1];
    });
    return bbox;
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function feature(geometry, properties) {
    if (!geometry) throw new Error('No geometry passed');

    return {
        type: 'Feature',
        properties: properties || {},
        geometry: geometry
    };
}
module.exports.feature = feature;

module.exports.point = function (coordinates, properties) {
    if (!coordinates) throw new Error('No coordinates passed');
    if (coordinates.length === undefined) throw new Error('Coordinates must be an array');
    if (coordinates.length < 2) throw new Error('Coordinates must be at least 2 numbers long');
    if (typeof coordinates[0] !== 'number' || typeof coordinates[1] !== 'number') throw new Error('Coordinates must numbers');

    return feature({
        type: 'Point',
        coordinates: coordinates
    }, properties);
};

module.exports.polygon = function (coordinates, properties) {
    if (!coordinates) throw new Error('No coordinates passed');

    for (var i = 0; i < coordinates.length; i++) {
        var ring = coordinates[i];
        if (ring.length < 4) {
            throw new Error('Each LinearRing of a Polygon must have 4 or more Positions.');
        }
        for (var j = 0; j < ring[ring.length - 1].length; j++) {
            if (ring[ring.length - 1][j] !== ring[0][j]) {
                throw new Error('First and last Position are not equivalent.');
            }
        }
    }

    return feature({
        type: 'Polygon',
        coordinates: coordinates
    }, properties);
};

module.exports.lineString = function (coordinates, properties) {
    if (!coordinates) throw new Error('No coordinates passed');

    return feature({
        type: 'LineString',
        coordinates: coordinates
    }, properties);
};

module.exports.featureCollection = function (features) {
    if (!features) throw new Error('No features passed');

    return {
        type: 'FeatureCollection',
        features: features
    };
};

module.exports.multiLineString = function (coordinates, properties) {
    if (!coordinates) throw new Error('No coordinates passed');

    return feature({
        type: 'MultiLineString',
        coordinates: coordinates
    }, properties);
};

module.exports.multiPoint = function (coordinates, properties) {
    if (!coordinates) throw new Error('No coordinates passed');

    return feature({
        type: 'MultiPoint',
        coordinates: coordinates
    }, properties);
};

module.exports.multiPolygon = function (coordinates, properties) {
    if (!coordinates) throw new Error('No coordinates passed');

    return feature({
        type: 'MultiPolygon',
        coordinates: coordinates
    }, properties);
};

module.exports.geometryCollection = function (geometries, properties) {
    if (!geometries) throw new Error('No geometries passed');

    return feature({
        type: 'GeometryCollection',
        geometries: geometries
    }, properties);
};

var factors = {
    miles: 3960,
    nauticalmiles: 3441.145,
    degrees: 57.2957795,
    radians: 1,
    inches: 250905600,
    yards: 6969600,
    meters: 6373000,
    metres: 6373000,
    kilometers: 6373,
    kilometres: 6373,
    feet: 20908792.65
};

module.exports.radiansToDistance = function (radians, units) {
    var factor = factors[units || 'kilometers'];
    if (factor === undefined) throw new Error('Invalid unit');

    return radians * factor;
};

module.exports.distanceToRadians = function (distance, units) {
    var factor = factors[units || 'kilometers'];
    if (factor === undefined) throw new Error('Invalid unit');

    return distance / factor;
};

module.exports.distanceToDegrees = function (distance, units) {
    var factor = factors[units || 'kilometers'];
    if (factor === undefined) throw new Error('Invalid unit');

    return distance / factor * 57.2958;
};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = partialSort;

function partialSort(arr, k, left, right, compare) {
    left = left || 0;
    right = right || arr.length - 1;
    compare = compare || defaultCompare;

    while (right > left) {
        if (right - left > 600) {
            var n = right - left + 1;
            var m = k - left + 1;
            var z = Math.log(n);
            var s = 0.5 * Math.exp(2 * z / 3);
            var sd = 0.5 * Math.sqrt(z * s * (n - s) / n) * (m - n / 2 < 0 ? -1 : 1);
            var newLeft = Math.max(left, Math.floor(k - m * s / n + sd));
            var newRight = Math.min(right, Math.floor(k + (n - m) * s / n + sd));
            partialSort(arr, k, newLeft, newRight, compare);
        }

        var t = arr[k];
        var i = left;
        var j = right;

        swap(arr, left, k);
        if (compare(arr[right], t) > 0) swap(arr, left, right);

        while (i < j) {
            swap(arr, i, j);
            i++;
            j--;
            while (compare(arr[i], t) < 0) {
                i++;
            }while (compare(arr[j], t) > 0) {
                j--;
            }
        }

        if (compare(arr[left], t) === 0) swap(arr, left, j);else {
            j++;
            swap(arr, j, right);
        }

        if (j <= k) left = j + 1;
        if (k <= j) right = j - 1;
    }
}

function swap(arr, i, j) {
    var tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
}

function defaultCompare(a, b) {
    return a < b ? -1 : a > b ? 1 : 0;
}

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = rbush;

var quickselect = __webpack_require__(18);

function rbush(maxEntries, format) {
    if (!(this instanceof rbush)) return new rbush(maxEntries, format);

    this._maxEntries = Math.max(4, maxEntries || 9);
    this._minEntries = Math.max(2, Math.ceil(this._maxEntries * 0.4));

    if (format) {
        this._initFormat(format);
    }

    this.clear();
}

rbush.prototype = {

    all: function all() {
        return this._all(this.data, []);
    },

    search: function search(bbox) {

        var node = this.data,
            result = [],
            toBBox = this.toBBox;

        if (!intersects(bbox, node)) return result;

        var nodesToSearch = [],
            i,
            len,
            child,
            childBBox;

        while (node) {
            for (i = 0, len = node.children.length; i < len; i++) {

                child = node.children[i];
                childBBox = node.leaf ? toBBox(child) : child;

                if (intersects(bbox, childBBox)) {
                    if (node.leaf) result.push(child);else if (contains(bbox, childBBox)) this._all(child, result);else nodesToSearch.push(child);
                }
            }
            node = nodesToSearch.pop();
        }

        return result;
    },

    collides: function collides(bbox) {

        var node = this.data,
            toBBox = this.toBBox;

        if (!intersects(bbox, node)) return false;

        var nodesToSearch = [],
            i,
            len,
            child,
            childBBox;

        while (node) {
            for (i = 0, len = node.children.length; i < len; i++) {

                child = node.children[i];
                childBBox = node.leaf ? toBBox(child) : child;

                if (intersects(bbox, childBBox)) {
                    if (node.leaf || contains(bbox, childBBox)) return true;
                    nodesToSearch.push(child);
                }
            }
            node = nodesToSearch.pop();
        }

        return false;
    },

    load: function load(data) {
        if (!(data && data.length)) return this;

        if (data.length < this._minEntries) {
            for (var i = 0, len = data.length; i < len; i++) {
                this.insert(data[i]);
            }
            return this;
        }

        var node = this._build(data.slice(), 0, data.length - 1, 0);

        if (!this.data.children.length) {
            this.data = node;
        } else if (this.data.height === node.height) {
            this._splitRoot(this.data, node);
        } else {
            if (this.data.height < node.height) {
                var tmpNode = this.data;
                this.data = node;
                node = tmpNode;
            }

            this._insert(node, this.data.height - node.height - 1, true);
        }

        return this;
    },

    insert: function insert(item) {
        if (item) this._insert(item, this.data.height - 1);
        return this;
    },

    clear: function clear() {
        this.data = createNode([]);
        return this;
    },

    remove: function remove(item, equalsFn) {
        if (!item) return this;

        var node = this.data,
            bbox = this.toBBox(item),
            path = [],
            indexes = [],
            i,
            parent,
            index,
            goingUp;

        while (node || path.length) {

            if (!node) {
                node = path.pop();
                parent = path[path.length - 1];
                i = indexes.pop();
                goingUp = true;
            }

            if (node.leaf) {
                index = findItem(item, node.children, equalsFn);

                if (index !== -1) {
                    node.children.splice(index, 1);
                    path.push(node);
                    this._condense(path);
                    return this;
                }
            }

            if (!goingUp && !node.leaf && contains(node, bbox)) {
                path.push(node);
                indexes.push(i);
                i = 0;
                parent = node;
                node = node.children[0];
            } else if (parent) {
                i++;
                node = parent.children[i];
                goingUp = false;
            } else node = null;
        }

        return this;
    },

    toBBox: function toBBox(item) {
        return item;
    },

    compareMinX: compareNodeMinX,
    compareMinY: compareNodeMinY,

    toJSON: function toJSON() {
        return this.data;
    },

    fromJSON: function fromJSON(data) {
        this.data = data;
        return this;
    },

    _all: function _all(node, result) {
        var nodesToSearch = [];
        while (node) {
            if (node.leaf) result.push.apply(result, node.children);else nodesToSearch.push.apply(nodesToSearch, node.children);

            node = nodesToSearch.pop();
        }
        return result;
    },

    _build: function _build(items, left, right, height) {

        var N = right - left + 1,
            M = this._maxEntries,
            node;

        if (N <= M) {
            node = createNode(items.slice(left, right + 1));
            calcBBox(node, this.toBBox);
            return node;
        }

        if (!height) {
            height = Math.ceil(Math.log(N) / Math.log(M));

            M = Math.ceil(N / Math.pow(M, height - 1));
        }

        node = createNode([]);
        node.leaf = false;
        node.height = height;

        var N2 = Math.ceil(N / M),
            N1 = N2 * Math.ceil(Math.sqrt(M)),
            i,
            j,
            right2,
            right3;

        multiSelect(items, left, right, N1, this.compareMinX);

        for (i = left; i <= right; i += N1) {

            right2 = Math.min(i + N1 - 1, right);

            multiSelect(items, i, right2, N2, this.compareMinY);

            for (j = i; j <= right2; j += N2) {

                right3 = Math.min(j + N2 - 1, right2);

                node.children.push(this._build(items, j, right3, height - 1));
            }
        }

        calcBBox(node, this.toBBox);

        return node;
    },

    _chooseSubtree: function _chooseSubtree(bbox, node, level, path) {

        var i, len, child, targetNode, area, enlargement, minArea, minEnlargement;

        while (true) {
            path.push(node);

            if (node.leaf || path.length - 1 === level) break;

            minArea = minEnlargement = Infinity;

            for (i = 0, len = node.children.length; i < len; i++) {
                child = node.children[i];
                area = bboxArea(child);
                enlargement = enlargedArea(bbox, child) - area;

                if (enlargement < minEnlargement) {
                    minEnlargement = enlargement;
                    minArea = area < minArea ? area : minArea;
                    targetNode = child;
                } else if (enlargement === minEnlargement) {
                    if (area < minArea) {
                        minArea = area;
                        targetNode = child;
                    }
                }
            }

            node = targetNode || node.children[0];
        }

        return node;
    },

    _insert: function _insert(item, level, isNode) {

        var toBBox = this.toBBox,
            bbox = isNode ? item : toBBox(item),
            insertPath = [];

        var node = this._chooseSubtree(bbox, this.data, level, insertPath);

        node.children.push(item);
        extend(node, bbox);

        while (level >= 0) {
            if (insertPath[level].children.length > this._maxEntries) {
                this._split(insertPath, level);
                level--;
            } else break;
        }

        this._adjustParentBBoxes(bbox, insertPath, level);
    },

    _split: function _split(insertPath, level) {

        var node = insertPath[level],
            M = node.children.length,
            m = this._minEntries;

        this._chooseSplitAxis(node, m, M);

        var splitIndex = this._chooseSplitIndex(node, m, M);

        var newNode = createNode(node.children.splice(splitIndex, node.children.length - splitIndex));
        newNode.height = node.height;
        newNode.leaf = node.leaf;

        calcBBox(node, this.toBBox);
        calcBBox(newNode, this.toBBox);

        if (level) insertPath[level - 1].children.push(newNode);else this._splitRoot(node, newNode);
    },

    _splitRoot: function _splitRoot(node, newNode) {
        this.data = createNode([node, newNode]);
        this.data.height = node.height + 1;
        this.data.leaf = false;
        calcBBox(this.data, this.toBBox);
    },

    _chooseSplitIndex: function _chooseSplitIndex(node, m, M) {

        var i, bbox1, bbox2, overlap, area, minOverlap, minArea, index;

        minOverlap = minArea = Infinity;

        for (i = m; i <= M - m; i++) {
            bbox1 = distBBox(node, 0, i, this.toBBox);
            bbox2 = distBBox(node, i, M, this.toBBox);

            overlap = intersectionArea(bbox1, bbox2);
            area = bboxArea(bbox1) + bboxArea(bbox2);

            if (overlap < minOverlap) {
                minOverlap = overlap;
                index = i;

                minArea = area < minArea ? area : minArea;
            } else if (overlap === minOverlap) {
                if (area < minArea) {
                    minArea = area;
                    index = i;
                }
            }
        }

        return index;
    },

    _chooseSplitAxis: function _chooseSplitAxis(node, m, M) {

        var compareMinX = node.leaf ? this.compareMinX : compareNodeMinX,
            compareMinY = node.leaf ? this.compareMinY : compareNodeMinY,
            xMargin = this._allDistMargin(node, m, M, compareMinX),
            yMargin = this._allDistMargin(node, m, M, compareMinY);

        if (xMargin < yMargin) node.children.sort(compareMinX);
    },

    _allDistMargin: function _allDistMargin(node, m, M, compare) {

        node.children.sort(compare);

        var toBBox = this.toBBox,
            leftBBox = distBBox(node, 0, m, toBBox),
            rightBBox = distBBox(node, M - m, M, toBBox),
            margin = bboxMargin(leftBBox) + bboxMargin(rightBBox),
            i,
            child;

        for (i = m; i < M - m; i++) {
            child = node.children[i];
            extend(leftBBox, node.leaf ? toBBox(child) : child);
            margin += bboxMargin(leftBBox);
        }

        for (i = M - m - 1; i >= m; i--) {
            child = node.children[i];
            extend(rightBBox, node.leaf ? toBBox(child) : child);
            margin += bboxMargin(rightBBox);
        }

        return margin;
    },

    _adjustParentBBoxes: function _adjustParentBBoxes(bbox, path, level) {
        for (var i = level; i >= 0; i--) {
            extend(path[i], bbox);
        }
    },

    _condense: function _condense(path) {
        for (var i = path.length - 1, siblings; i >= 0; i--) {
            if (path[i].children.length === 0) {
                if (i > 0) {
                    siblings = path[i - 1].children;
                    siblings.splice(siblings.indexOf(path[i]), 1);
                } else this.clear();
            } else calcBBox(path[i], this.toBBox);
        }
    },

    _initFormat: function _initFormat(format) {

        var compareArr = ['return a', ' - b', ';'];

        this.compareMinX = new Function('a', 'b', compareArr.join(format[0]));
        this.compareMinY = new Function('a', 'b', compareArr.join(format[1]));

        this.toBBox = new Function('a', 'return {minX: a' + format[0] + ', minY: a' + format[1] + ', maxX: a' + format[2] + ', maxY: a' + format[3] + '};');
    }
};

function findItem(item, items, equalsFn) {
    if (!equalsFn) return items.indexOf(item);

    for (var i = 0; i < items.length; i++) {
        if (equalsFn(item, items[i])) return i;
    }
    return -1;
}

function calcBBox(node, toBBox) {
    distBBox(node, 0, node.children.length, toBBox, node);
}

function distBBox(node, k, p, toBBox, destNode) {
    if (!destNode) destNode = createNode(null);
    destNode.minX = Infinity;
    destNode.minY = Infinity;
    destNode.maxX = -Infinity;
    destNode.maxY = -Infinity;

    for (var i = k, child; i < p; i++) {
        child = node.children[i];
        extend(destNode, node.leaf ? toBBox(child) : child);
    }

    return destNode;
}

function extend(a, b) {
    a.minX = Math.min(a.minX, b.minX);
    a.minY = Math.min(a.minY, b.minY);
    a.maxX = Math.max(a.maxX, b.maxX);
    a.maxY = Math.max(a.maxY, b.maxY);
    return a;
}

function compareNodeMinX(a, b) {
    return a.minX - b.minX;
}
function compareNodeMinY(a, b) {
    return a.minY - b.minY;
}

function bboxArea(a) {
    return (a.maxX - a.minX) * (a.maxY - a.minY);
}
function bboxMargin(a) {
    return a.maxX - a.minX + (a.maxY - a.minY);
}

function enlargedArea(a, b) {
    return (Math.max(b.maxX, a.maxX) - Math.min(b.minX, a.minX)) * (Math.max(b.maxY, a.maxY) - Math.min(b.minY, a.minY));
}

function intersectionArea(a, b) {
    var minX = Math.max(a.minX, b.minX),
        minY = Math.max(a.minY, b.minY),
        maxX = Math.min(a.maxX, b.maxX),
        maxY = Math.min(a.maxY, b.maxY);

    return Math.max(0, maxX - minX) * Math.max(0, maxY - minY);
}

function contains(a, b) {
    return a.minX <= b.minX && a.minY <= b.minY && b.maxX <= a.maxX && b.maxY <= a.maxY;
}

function intersects(a, b) {
    return b.minX <= a.maxX && b.minY <= a.maxY && b.maxX >= a.minX && b.maxY >= a.minY;
}

function createNode(children) {
    return {
        children: children,
        height: 1,
        leaf: true,
        minX: Infinity,
        minY: Infinity,
        maxX: -Infinity,
        maxY: -Infinity
    };
}

function multiSelect(arr, left, right, n, compare) {
    var stack = [left, right],
        mid;

    while (stack.length) {
        right = stack.pop();
        left = stack.pop();

        if (right - left <= n) continue;

        mid = left + Math.ceil((right - left) / n / 2) * n;
        quickselect(arr, mid, left, right, compare);

        stack.push(left, mid, mid, right);
    }
}

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function (root, factory) {
  if (( false ? 'undefined' : _typeof(module)) === 'object' && _typeof(module.exports) === 'object') {
    exports = module.exports = factory(__webpack_require__(21));
  } else if ((typeof navigator === 'undefined' ? 'undefined' : _typeof(navigator)) === "object") {
    if (!root.Terraformer) {
      throw new Error("Terraformer.WKT requires the core Terraformer library. http://github.com/esri/terraformer");
    }
    root.Terraformer.WKT = factory(root.Terraformer);
  }
})(undefined, function (Terraformer) {
  var exports = {};

  var parser = function () {
    var parser = { trace: function trace() {},
      yy: {},
      symbols_: { "error": 2, "expressions": 3, "point": 4, "EOF": 5, "linestring": 6, "polygon": 7, "multipoint": 8, "multilinestring": 9, "multipolygon": 10, "coordinate": 11, "DOUBLE_TOK": 12, "ptarray": 13, "COMMA": 14, "ring_list": 15, "ring": 16, "(": 17, ")": 18, "POINT": 19, "Z": 20, "ZM": 21, "M": 22, "EMPTY": 23, "point_untagged": 24, "polygon_list": 25, "polygon_untagged": 26, "point_list": 27, "LINESTRING": 28, "POLYGON": 29, "MULTIPOINT": 30, "MULTILINESTRING": 31, "MULTIPOLYGON": 32, "$accept": 0, "$end": 1 },
      terminals_: { 2: "error", 5: "EOF", 12: "DOUBLE_TOK", 14: "COMMA", 17: "(", 18: ")", 19: "POINT", 20: "Z", 21: "ZM", 22: "M", 23: "EMPTY", 28: "LINESTRING", 29: "POLYGON", 30: "MULTIPOINT", 31: "MULTILINESTRING", 32: "MULTIPOLYGON" },
      productions_: [0, [3, 2], [3, 2], [3, 2], [3, 2], [3, 2], [3, 2], [11, 2], [11, 3], [11, 4], [13, 3], [13, 1], [15, 3], [15, 1], [16, 3], [4, 4], [4, 5], [4, 5], [4, 5], [4, 2], [24, 1], [24, 3], [25, 3], [25, 1], [26, 3], [27, 3], [27, 1], [6, 4], [6, 5], [6, 5], [6, 5], [6, 2], [7, 4], [7, 5], [7, 5], [7, 5], [7, 2], [8, 4], [8, 5], [8, 5], [8, 5], [8, 2], [9, 4], [9, 5], [9, 5], [9, 5], [9, 2], [10, 4], [10, 5], [10, 5], [10, 5], [10, 2]],
      performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $, _$) {

        var $0 = $.length - 1;
        switch (yystate) {
          case 1:
            return $[$0 - 1];
            break;
          case 2:
            return $[$0 - 1];
            break;
          case 3:
            return $[$0 - 1];
            break;
          case 4:
            return $[$0 - 1];
            break;
          case 5:
            return $[$0 - 1];
            break;
          case 6:
            return $[$0 - 1];
            break;
          case 7:
            this.$ = new PointArray([Number($[$0 - 1]), Number($[$0])]);
            break;
          case 8:
            this.$ = new PointArray([Number($[$0 - 2]), Number($[$0 - 1]), Number($[$0])]);
            break;
          case 9:
            this.$ = new PointArray([Number($[$0 - 3]), Number($[$0 - 2]), Number($[$0 - 1]), Number($[$0])]);
            break;
          case 10:
            this.$ = $[$0 - 2].addPoint($[$0]);
            break;
          case 11:
            this.$ = $[$0];
            break;
          case 12:
            this.$ = $[$0 - 2].addRing($[$0]);
            break;
          case 13:
            this.$ = new RingList($[$0]);
            break;
          case 14:
            this.$ = new Ring($[$0 - 1]);
            break;
          case 15:
            this.$ = { "type": "Point", "coordinates": $[$0 - 1].data[0] };
            break;
          case 16:
            this.$ = { "type": "Point", "coordinates": $[$0 - 1].data[0], "properties": { z: true } };
            break;
          case 17:
            this.$ = { "type": "Point", "coordinates": $[$0 - 1].data[0], "properties": { z: true, m: true } };
            break;
          case 18:
            this.$ = { "type": "Point", "coordinates": $[$0 - 1].data[0], "properties": { m: true } };
            break;
          case 19:
            this.$ = { "type": "Point", "coordinates": [] };
            break;
          case 20:
            this.$ = $[$0];
            break;
          case 21:
            this.$ = $[$0 - 1];
            break;
          case 22:
            this.$ = $[$0 - 2].addPolygon($[$0]);
            break;
          case 23:
            this.$ = new PolygonList($[$0]);
            break;
          case 24:
            this.$ = $[$0 - 1];
            break;
          case 25:
            this.$ = $[$0 - 2].addPoint($[$0]);
            break;
          case 26:
            this.$ = $[$0];
            break;
          case 27:
            this.$ = { "type": "LineString", "coordinates": $[$0 - 1].data };
            break;
          case 28:
            this.$ = { "type": "LineString", "coordinates": $[$0 - 1].data, "properties": { z: true } };
            break;
          case 29:
            this.$ = { "type": "LineString", "coordinates": $[$0 - 1].data, "properties": { m: true } };
            break;
          case 30:
            this.$ = { "type": "LineString", "coordinates": $[$0 - 1].data, "properties": { z: true, m: true } };
            break;
          case 31:
            this.$ = { "type": "LineString", "coordinates": [] };
            break;
          case 32:
            this.$ = { "type": "Polygon", "coordinates": $[$0 - 1].toJSON() };
            break;
          case 33:
            this.$ = { "type": "Polygon", "coordinates": $[$0 - 1].toJSON(), "properties": { z: true } };
            break;
          case 34:
            this.$ = { "type": "Polygon", "coordinates": $[$0 - 1].toJSON(), "properties": { m: true } };
            break;
          case 35:
            this.$ = { "type": "Polygon", "coordinates": $[$0 - 1].toJSON(), "properties": { z: true, m: true } };
            break;
          case 36:
            this.$ = { "type": "Polygon", "coordinates": [] };
            break;
          case 37:
            this.$ = { "type": "MultiPoint", "coordinates": $[$0 - 1].data };
            break;
          case 38:
            this.$ = { "type": "MultiPoint", "coordinates": $[$0 - 1].data, "properties": { z: true } };
            break;
          case 39:
            this.$ = { "type": "MultiPoint", "coordinates": $[$0 - 1].data, "properties": { m: true } };
            break;
          case 40:
            this.$ = { "type": "MultiPoint", "coordinates": $[$0 - 1].data, "properties": { z: true, m: true } };
            break;
          case 41:
            this.$ = { "type": "MultiPoint", "coordinates": [] };
            break;
          case 42:
            this.$ = { "type": "MultiLineString", "coordinates": $[$0 - 1].toJSON() };
            break;
          case 43:
            this.$ = { "type": "MultiLineString", "coordinates": $[$0 - 1].toJSON(), "properties": { z: true } };
            break;
          case 44:
            this.$ = { "type": "MultiLineString", "coordinates": $[$0 - 1].toJSON(), "properties": { m: true } };
            break;
          case 45:
            this.$ = { "type": "MultiLineString", "coordinates": $[$0 - 1].toJSON(), "properties": { z: true, m: true } };
            break;
          case 46:
            this.$ = { "type": "MultiLineString", "coordinates": [] };
            break;
          case 47:
            this.$ = { "type": "MultiPolygon", "coordinates": $[$0 - 1].toJSON() };
            break;
          case 48:
            this.$ = { "type": "MultiPolygon", "coordinates": $[$0 - 1].toJSON(), "properties": { z: true } };
            break;
          case 49:
            this.$ = { "type": "MultiPolygon", "coordinates": $[$0 - 1].toJSON(), "properties": { m: true } };
            break;
          case 50:
            this.$ = { "type": "MultiPolygon", "coordinates": $[$0 - 1].toJSON(), "properties": { z: true, m: true } };
            break;
          case 51:
            this.$ = { "type": "MultiPolygon", "coordinates": [] };
            break;
        }
      },
      table: [{ 3: 1, 4: 2, 6: 3, 7: 4, 8: 5, 9: 6, 10: 7, 19: [1, 8], 28: [1, 9], 29: [1, 10], 30: [1, 11], 31: [1, 12], 32: [1, 13] }, { 1: [3] }, { 5: [1, 14] }, { 5: [1, 15] }, { 5: [1, 16] }, { 5: [1, 17] }, { 5: [1, 18] }, { 5: [1, 19] }, { 17: [1, 20], 20: [1, 21], 21: [1, 22], 22: [1, 23], 23: [1, 24] }, { 17: [1, 25], 20: [1, 26], 21: [1, 28], 22: [1, 27], 23: [1, 29] }, { 17: [1, 30], 20: [1, 31], 21: [1, 33], 22: [1, 32], 23: [1, 34] }, { 17: [1, 35], 20: [1, 36], 21: [1, 38], 22: [1, 37], 23: [1, 39] }, { 17: [1, 40], 20: [1, 41], 21: [1, 43], 22: [1, 42], 23: [1, 44] }, { 17: [1, 45], 20: [1, 46], 21: [1, 48], 22: [1, 47], 23: [1, 49] }, { 1: [2, 1] }, { 1: [2, 2] }, { 1: [2, 3] }, { 1: [2, 4] }, { 1: [2, 5] }, { 1: [2, 6] }, { 11: 51, 12: [1, 52], 13: 50 }, { 17: [1, 53] }, { 17: [1, 54] }, { 17: [1, 55] }, { 5: [2, 19] }, { 11: 58, 12: [1, 52], 17: [1, 59], 24: 57, 27: 56 }, { 17: [1, 60] }, { 17: [1, 61] }, { 17: [1, 62] }, { 5: [2, 31] }, { 15: 63, 16: 64, 17: [1, 65] }, { 17: [1, 66] }, { 17: [1, 67] }, { 17: [1, 68] }, { 5: [2, 36] }, { 11: 58, 12: [1, 52], 17: [1, 59], 24: 57, 27: 69 }, { 17: [1, 70] }, { 17: [1, 71] }, { 17: [1, 72] }, { 5: [2, 41] }, { 15: 73, 16: 64, 17: [1, 65] }, { 17: [1, 74] }, { 17: [1, 75] }, { 17: [1, 76] }, { 5: [2, 46] }, { 17: [1, 79], 25: 77, 26: 78 }, { 17: [1, 80] }, { 17: [1, 81] }, { 17: [1, 82] }, { 5: [2, 51] }, { 14: [1, 84], 18: [1, 83] }, { 14: [2, 11], 18: [2, 11] }, { 12: [1, 85] }, { 11: 51, 12: [1, 52], 13: 86 }, { 11: 51, 12: [1, 52], 13: 87 }, { 11: 51, 12: [1, 52], 13: 88 }, { 14: [1, 90], 18: [1, 89] }, { 14: [2, 26], 18: [2, 26] }, { 14: [2, 20], 18: [2, 20] }, { 11: 91, 12: [1, 52] }, { 11: 58, 12: [1, 52], 17: [1, 59], 24: 57, 27: 92 }, { 11: 58, 12: [1, 52], 17: [1, 59], 24: 57, 27: 93 }, { 11: 58, 12: [1, 52], 17: [1, 59], 24: 57, 27: 94 }, { 14: [1, 96], 18: [1, 95] }, { 14: [2, 13], 18: [2, 13] }, { 11: 51, 12: [1, 52], 13: 97 }, { 15: 98, 16: 64, 17: [1, 65] }, { 15: 99, 16: 64, 17: [1, 65] }, { 15: 100, 16: 64, 17: [1, 65] }, { 14: [1, 90], 18: [1, 101] }, { 11: 58, 12: [1, 52], 17: [1, 59], 24: 57, 27: 102 }, { 11: 58, 12: [1, 52], 17: [1, 59], 24: 57, 27: 103 }, { 11: 58, 12: [1, 52], 17: [1, 59], 24: 57, 27: 104 }, { 14: [1, 96], 18: [1, 105] }, { 15: 106, 16: 64, 17: [1, 65] }, { 15: 107, 16: 64, 17: [1, 65] }, { 15: 108, 16: 64, 17: [1, 65] }, { 14: [1, 110], 18: [1, 109] }, { 14: [2, 23], 18: [2, 23] }, { 15: 111, 16: 64, 17: [1, 65] }, { 17: [1, 79], 25: 112, 26: 78 }, { 17: [1, 79], 25: 113, 26: 78 }, { 17: [1, 79], 25: 114, 26: 78 }, { 5: [2, 15] }, { 11: 115, 12: [1, 52] }, { 12: [1, 116], 14: [2, 7], 18: [2, 7] }, { 14: [1, 84], 18: [1, 117] }, { 14: [1, 84], 18: [1, 118] }, { 14: [1, 84], 18: [1, 119] }, { 5: [2, 27] }, { 11: 58, 12: [1, 52], 17: [1, 59], 24: 120 }, { 18: [1, 121] }, { 14: [1, 90], 18: [1, 122] }, { 14: [1, 90], 18: [1, 123] }, { 14: [1, 90], 18: [1, 124] }, { 5: [2, 32] }, { 16: 125, 17: [1, 65] }, { 14: [1, 84], 18: [1, 126] }, { 14: [1, 96], 18: [1, 127] }, { 14: [1, 96], 18: [1, 128] }, { 14: [1, 96], 18: [1, 129] }, { 5: [2, 37] }, { 14: [1, 90], 18: [1, 130] }, { 14: [1, 90], 18: [1, 131] }, { 14: [1, 90], 18: [1, 132] }, { 5: [2, 42] }, { 14: [1, 96], 18: [1, 133] }, { 14: [1, 96], 18: [1, 134] }, { 14: [1, 96], 18: [1, 135] }, { 5: [2, 47] }, { 17: [1, 79], 26: 136 }, { 14: [1, 96], 18: [1, 137] }, { 14: [1, 110], 18: [1, 138] }, { 14: [1, 110], 18: [1, 139] }, { 14: [1, 110], 18: [1, 140] }, { 14: [2, 10], 18: [2, 10] }, { 12: [1, 141], 14: [2, 8], 18: [2, 8] }, { 5: [2, 16] }, { 5: [2, 17] }, { 5: [2, 18] }, { 14: [2, 25], 18: [2, 25] }, { 14: [2, 21], 18: [2, 21] }, { 5: [2, 28] }, { 5: [2, 29] }, { 5: [2, 30] }, { 14: [2, 12], 18: [2, 12] }, { 14: [2, 14], 18: [2, 14] }, { 5: [2, 33] }, { 5: [2, 34] }, { 5: [2, 35] }, { 5: [2, 38] }, { 5: [2, 39] }, { 5: [2, 40] }, { 5: [2, 43] }, { 5: [2, 44] }, { 5: [2, 45] }, { 14: [2, 22], 18: [2, 22] }, { 14: [2, 24], 18: [2, 24] }, { 5: [2, 48] }, { 5: [2, 49] }, { 5: [2, 50] }, { 14: [2, 9], 18: [2, 9] }],
      defaultActions: { 14: [2, 1], 15: [2, 2], 16: [2, 3], 17: [2, 4], 18: [2, 5], 19: [2, 6], 24: [2, 19], 29: [2, 31], 34: [2, 36], 39: [2, 41], 44: [2, 46], 49: [2, 51], 83: [2, 15], 89: [2, 27], 95: [2, 32], 101: [2, 37], 105: [2, 42], 109: [2, 47], 117: [2, 16], 118: [2, 17], 119: [2, 18], 122: [2, 28], 123: [2, 29], 124: [2, 30], 127: [2, 33], 128: [2, 34], 129: [2, 35], 130: [2, 38], 131: [2, 39], 132: [2, 40], 133: [2, 43], 134: [2, 44], 135: [2, 45], 138: [2, 48], 139: [2, 49], 140: [2, 50] },
      parseError: function parseError(str, hash) {
        throw new Error(str);
      },
      parse: function parse(input) {
        var self = this,
            stack = [0],
            vstack = [null],
            lstack = [],
            table = this.table,
            yytext = "",
            yylineno = 0,
            yyleng = 0,
            recovering = 0,
            TERROR = 2,
            EOF = 1;
        this.lexer.setInput(input);
        this.lexer.yy = this.yy;
        this.yy.lexer = this.lexer;
        this.yy.parser = this;
        if (typeof this.lexer.yylloc == "undefined") this.lexer.yylloc = {};
        var yyloc = this.lexer.yylloc;
        lstack.push(yyloc);
        var ranges = this.lexer.options && this.lexer.options.ranges;
        if (typeof this.yy.parseError === "function") this.parseError = this.yy.parseError;
        function popStack(n) {
          stack.length = stack.length - 2 * n;
          vstack.length = vstack.length - n;
          lstack.length = lstack.length - n;
        }
        function lex() {
          var token;
          token = self.lexer.lex() || 1;
          if (typeof token !== "number") {
            token = self.symbols_[token] || token;
          }
          return token;
        }
        var symbol,
            preErrorSymbol,
            state,
            action,
            a,
            r,
            yyval = {},
            p,
            len,
            newState,
            expected;
        while (true) {
          state = stack[stack.length - 1];
          if (this.defaultActions[state]) {
            action = this.defaultActions[state];
          } else {
            if (symbol === null || typeof symbol == "undefined") {
              symbol = lex();
            }
            action = table[state] && table[state][symbol];
          }
          if (typeof action === "undefined" || !action.length || !action[0]) {
            var errStr = "";
            if (!recovering) {
              expected = [];
              for (p in table[state]) {
                if (this.terminals_[p] && p > 2) {
                  expected.push("'" + this.terminals_[p] + "'");
                }
              }if (this.lexer.showPosition) {
                errStr = "Parse error on line " + (yylineno + 1) + ":\n" + this.lexer.showPosition() + "\nExpecting " + expected.join(", ") + ", got '" + (this.terminals_[symbol] || symbol) + "'";
              } else {
                errStr = "Parse error on line " + (yylineno + 1) + ": Unexpected " + (symbol == 1 ? "end of input" : "'" + (this.terminals_[symbol] || symbol) + "'");
              }
              this.parseError(errStr, { text: this.lexer.match, token: this.terminals_[symbol] || symbol, line: this.lexer.yylineno, loc: yyloc, expected: expected });
            }
          }
          if (action[0] instanceof Array && action.length > 1) {
            throw new Error("Parse Error: multiple actions possible at state: " + state + ", token: " + symbol);
          }
          switch (action[0]) {
            case 1:
              stack.push(symbol);
              vstack.push(this.lexer.yytext);
              lstack.push(this.lexer.yylloc);
              stack.push(action[1]);
              symbol = null;
              if (!preErrorSymbol) {
                yyleng = this.lexer.yyleng;
                yytext = this.lexer.yytext;
                yylineno = this.lexer.yylineno;
                yyloc = this.lexer.yylloc;
                if (recovering > 0) recovering--;
              } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
              }
              break;
            case 2:
              len = this.productions_[action[1]][1];
              yyval.$ = vstack[vstack.length - len];
              yyval._$ = { first_line: lstack[lstack.length - (len || 1)].first_line, last_line: lstack[lstack.length - 1].last_line, first_column: lstack[lstack.length - (len || 1)].first_column, last_column: lstack[lstack.length - 1].last_column };
              if (ranges) {
                yyval._$.range = [lstack[lstack.length - (len || 1)].range[0], lstack[lstack.length - 1].range[1]];
              }
              r = this.performAction.call(yyval, yytext, yyleng, yylineno, this.yy, action[1], vstack, lstack);
              if (typeof r !== "undefined") {
                return r;
              }
              if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
              }
              stack.push(this.productions_[action[1]][0]);
              vstack.push(yyval.$);
              lstack.push(yyval._$);
              newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
              stack.push(newState);
              break;
            case 3:
              return true;
          }
        }
        return true;
      }
    };
    undefined;
    var lexer = function () {
      var lexer = { EOF: 1,
        parseError: function parseError(str, hash) {
          if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
          } else {
            throw new Error(str);
          }
        },
        setInput: function setInput(input) {
          this._input = input;
          this._more = this._less = this.done = false;
          this.yylineno = this.yyleng = 0;
          this.yytext = this.matched = this.match = '';
          this.conditionStack = ['INITIAL'];
          this.yylloc = { first_line: 1, first_column: 0, last_line: 1, last_column: 0 };
          if (this.options.ranges) this.yylloc.range = [0, 0];
          this.offset = 0;
          return this;
        },
        input: function input() {
          var ch = this._input[0];
          this.yytext += ch;
          this.yyleng++;
          this.offset++;
          this.match += ch;
          this.matched += ch;
          var lines = ch.match(/(?:\r\n?|\n).*/g);
          if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
          } else {
            this.yylloc.last_column++;
          }
          if (this.options.ranges) this.yylloc.range[1]++;

          this._input = this._input.slice(1);
          return ch;
        },
        unput: function unput(ch) {
          var len = ch.length;
          var lines = ch.split(/(?:\r\n?|\n)/g);

          this._input = ch + this._input;
          this.yytext = this.yytext.substr(0, this.yytext.length - len - 1);

          this.offset -= len;
          var oldLines = this.match.split(/(?:\r\n?|\n)/g);
          this.match = this.match.substr(0, this.match.length - 1);
          this.matched = this.matched.substr(0, this.matched.length - 1);

          if (lines.length - 1) this.yylineno -= lines.length - 1;
          var r = this.yylloc.range;

          this.yylloc = { first_line: this.yylloc.first_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.first_column,
            last_column: lines ? (lines.length === oldLines.length ? this.yylloc.first_column : 0) + oldLines[oldLines.length - lines.length].length - lines[0].length : this.yylloc.first_column - len
          };

          if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
          }
          return this;
        },
        more: function more() {
          this._more = true;
          return this;
        },
        less: function less(n) {
          this.unput(this.match.slice(n));
        },
        pastInput: function pastInput() {
          var past = this.matched.substr(0, this.matched.length - this.match.length);
          return (past.length > 20 ? '...' : '') + past.substr(-20).replace(/\n/g, "");
        },
        upcomingInput: function upcomingInput() {
          var next = this.match;
          if (next.length < 20) {
            next += this._input.substr(0, 20 - next.length);
          }
          return (next.substr(0, 20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
        },
        showPosition: function showPosition() {
          var pre = this.pastInput();
          var c = new Array(pre.length + 1).join("-");
          return pre + this.upcomingInput() + "\n" + c + "^";
        },
        next: function next() {
          if (this.done) {
            return this.EOF;
          }
          if (!this._input) this.done = true;

          var token, match, tempMatch, index, col, lines;
          if (!this._more) {
            this.yytext = '';
            this.match = '';
          }
          var rules = this._currentRules();
          for (var i = 0; i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
              match = tempMatch;
              index = i;
              if (!this.options.flex) break;
            }
          }
          if (match) {
            lines = match[0].match(/(?:\r\n?|\n).*/g);
            if (lines) this.yylineno += lines.length;
            this.yylloc = { first_line: this.yylloc.last_line,
              last_line: this.yylineno + 1,
              first_column: this.yylloc.last_column,
              last_column: lines ? lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + match[0].length };
            this.yytext += match[0];
            this.match += match[0];
            this.matches = match;
            this.yyleng = this.yytext.length;
            if (this.options.ranges) {
              this.yylloc.range = [this.offset, this.offset += this.yyleng];
            }
            this._more = false;
            this._input = this._input.slice(match[0].length);
            this.matched += match[0];
            token = this.performAction.call(this, this.yy, this, rules[index], this.conditionStack[this.conditionStack.length - 1]);
            if (this.done && this._input) this.done = false;
            if (token) return token;else return;
          }
          if (this._input === "") {
            return this.EOF;
          } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), { text: "", token: null, line: this.yylineno });
          }
        },
        lex: function lex() {
          var r = this.next();
          if (typeof r !== 'undefined') {
            return r;
          } else {
            return this.lex();
          }
        },
        begin: function begin(condition) {
          this.conditionStack.push(condition);
        },
        popState: function popState() {
          return this.conditionStack.pop();
        },
        _currentRules: function _currentRules() {
          return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        },
        topState: function topState() {
          return this.conditionStack[this.conditionStack.length - 2];
        },
        pushState: function begin(condition) {
          this.begin(condition);
        } };
      lexer.options = {};
      lexer.performAction = function anonymous(yy, yy_, $avoiding_name_collisions, YY_START) {

        var YYSTATE = YY_START;
        switch ($avoiding_name_collisions) {
          case 0:
            break;
          case 1:
            return 17;
            break;
          case 2:
            return 18;
            break;
          case 3:
            return 12;
            break;
          case 4:
            return 19;
            break;
          case 5:
            return 28;
            break;
          case 6:
            return 29;
            break;
          case 7:
            return 30;
            break;
          case 8:
            return 31;
            break;
          case 9:
            return 32;
            break;
          case 10:
            return 14;
            break;
          case 11:
            return 23;
            break;
          case 12:
            return 22;
            break;
          case 13:
            return 20;
            break;
          case 14:
            return 21;
            break;
          case 15:
            return 5;
            break;
          case 16:
            return "INVALID";
            break;
        }
      };
      lexer.rules = [/^(?:\s+)/, /^(?:\()/, /^(?:\))/, /^(?:-?[0-9]+(\.[0-9]+)?([eE][\-\+]?[0-9]+)?)/, /^(?:POINT\b)/, /^(?:LINESTRING\b)/, /^(?:POLYGON\b)/, /^(?:MULTIPOINT\b)/, /^(?:MULTILINESTRING\b)/, /^(?:MULTIPOLYGON\b)/, /^(?:,)/, /^(?:EMPTY\b)/, /^(?:M\b)/, /^(?:Z\b)/, /^(?:ZM\b)/, /^(?:$)/, /^(?:.)/];
      lexer.conditions = { "INITIAL": { "rules": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16], "inclusive": true } };
      return lexer;
    }();
    parser.lexer = lexer;
    function Parser() {
      this.yy = {};
    }Parser.prototype = parser;parser.Parser = Parser;
    return new Parser();
  }();

  function PointArray(point) {
    this.data = [point];
    this.type = 'PointArray';
  }

  PointArray.prototype.addPoint = function (point) {
    if (point.type === 'PointArray') {
      this.data = this.data.concat(point.data);
    } else {
      this.data.push(point);
    }

    return this;
  };

  PointArray.prototype.toJSON = function () {
    return this.data;
  };

  function Ring(point) {
    this.data = point;
    this.type = 'Ring';
  }

  Ring.prototype.toJSON = function () {
    var data = [];

    for (var i = 0; i < this.data.data.length; i++) {
      data.push(this.data.data[i]);
    }

    return data;
  };

  function RingList(ring) {
    this.data = [ring];
    this.type = 'RingList';
  }

  RingList.prototype.addRing = function (ring) {
    this.data.push(ring);

    return this;
  };

  RingList.prototype.toJSON = function () {
    var data = [];

    for (var i = 0; i < this.data.length; i++) {
      data.push(this.data[i].toJSON());
    }

    if (data.length === 1) {
      return data;
    } else {
      return data;
    }
  };

  function PolygonList(polygon) {
    this.data = [polygon];
    this.type = 'PolygonList';
  }

  PolygonList.prototype.addPolygon = function (polygon) {
    this.data.push(polygon);

    return this;
  };

  PolygonList.prototype.toJSON = function () {
    var data = [];

    for (var i = 0; i < this.data.length; i++) {
      data = data.concat([this.data[i].toJSON()]);
    }

    return data;
  };

  function _parse() {
    return parser.parse.apply(parser, arguments);
  }

  function parse(element) {
    var res, primitive;

    try {
      res = parser.parse(element);
    } catch (err) {
      throw Error("Unable to parse: " + err);
    }

    return Terraformer.Primitive(res);
  }

  function arrayToRing(arr) {
    var parts = [],
        ret = '';

    for (var i = 0; i < arr.length; i++) {
      parts.push(arr[i].join(' '));
    }

    ret += '(' + parts.join(', ') + ')';

    return ret;
  }

  function pointToWKTPoint(primitive) {
    var ret = 'POINT ';

    if (primitive.coordinates === undefined || primitive.coordinates.length === 0) {
      ret += 'EMPTY';

      return ret;
    } else if (primitive.coordinates.length === 3) {
      if (primitive.properties && primitive.properties.m === true) {
        ret += 'M ';
      } else {
        ret += 'Z ';
      }
    } else if (primitive.coordinates.length === 4) {
      ret += 'ZM ';
    }

    ret += '(' + primitive.coordinates.join(' ') + ')';

    return ret;
  }

  function lineStringToWKTLineString(primitive) {
    var ret = 'LINESTRING ';

    if (primitive.coordinates === undefined || primitive.coordinates.length === 0 || primitive.coordinates[0].length === 0) {
      ret += 'EMPTY';

      return ret;
    } else if (primitive.coordinates[0].length === 3) {
      if (primitive.properties && primitive.properties.m === true) {
        ret += 'M ';
      } else {
        ret += 'Z ';
      }
    } else if (primitive.coordinates[0].length === 4) {
      ret += 'ZM ';
    }

    ret += arrayToRing(primitive.coordinates);

    return ret;
  }

  function polygonToWKTPolygon(primitive) {
    var ret = 'POLYGON ';

    if (primitive.coordinates === undefined || primitive.coordinates.length === 0 || primitive.coordinates[0].length === 0) {
      ret += 'EMPTY';

      return ret;
    } else if (primitive.coordinates[0][0].length === 3) {
      if (primitive.properties && primitive.properties.m === true) {
        ret += 'M ';
      } else {
        ret += 'Z ';
      }
    } else if (primitive.coordinates[0][0].length === 4) {
      ret += 'ZM ';
    }

    ret += '(';
    var parts = [];
    for (var i = 0; i < primitive.coordinates.length; i++) {
      parts.push(arrayToRing(primitive.coordinates[i]));
    }

    ret += parts.join(', ');
    ret += ')';

    return ret;
  }

  function multiPointToWKTMultiPoint(primitive) {
    var ret = 'MULTIPOINT ';

    if (primitive.coordinates === undefined || primitive.coordinates.length === 0 || primitive.coordinates[0].length === 0) {
      ret += 'EMPTY';

      return ret;
    } else if (primitive.coordinates[0].length === 3) {
      if (primitive.properties && primitive.properties.m === true) {
        ret += 'M ';
      } else {
        ret += 'Z ';
      }
    } else if (primitive.coordinates[0].length === 4) {
      ret += 'ZM ';
    }

    ret += arrayToRing(primitive.coordinates);

    return ret;
  }

  function multiLineStringToWKTMultiLineString(primitive) {
    var ret = 'MULTILINESTRING ';

    if (primitive.coordinates === undefined || primitive.coordinates.length === 0 || primitive.coordinates[0].length === 0) {
      ret += 'EMPTY';

      return ret;
    } else if (primitive.coordinates[0][0].length === 3) {
      if (primitive.properties && primitive.properties.m === true) {
        ret += 'M ';
      } else {
        ret += 'Z ';
      }
    } else if (primitive.coordinates[0][0].length === 4) {
      ret += 'ZM ';
    }

    ret += '(';
    var parts = [];
    for (var i = 0; i < primitive.coordinates.length; i++) {
      parts.push(arrayToRing(primitive.coordinates[i]));
    }

    ret += parts.join(', ');
    ret += ')';

    return ret;
  }

  function multiPolygonToWKTMultiPolygon(primitive) {
    var ret = 'MULTIPOLYGON ';

    if (primitive.coordinates === undefined || primitive.coordinates.length === 0 || primitive.coordinates[0].length === 0) {
      ret += 'EMPTY';

      return ret;
    } else if (primitive.coordinates[0][0][0].length === 3) {
      if (primitive.properties && primitive.properties.m === true) {
        ret += 'M ';
      } else {
        ret += 'Z ';
      }
    } else if (primitive.coordinates[0][0][0].length === 4) {
      ret += 'ZM ';
    }

    ret += '(';
    var inner = [];
    for (var c = 0; c < primitive.coordinates.length; c++) {
      var it = '(';
      var parts = [];
      for (var i = 0; i < primitive.coordinates[c].length; i++) {
        parts.push(arrayToRing(primitive.coordinates[c][i]));
      }

      it += parts.join(', ');
      it += ')';

      inner.push(it);
    }

    ret += inner.join(', ');
    ret += ')';

    return ret;
  }

  function convert(primitive) {
    switch (primitive.type) {
      case 'Point':
        return pointToWKTPoint(primitive);
      case 'LineString':
        return lineStringToWKTLineString(primitive);
      case 'Polygon':
        return polygonToWKTPolygon(primitive);
      case 'MultiPoint':
        return multiPointToWKTMultiPoint(primitive);
      case 'MultiLineString':
        return multiLineStringToWKTMultiLineString(primitive);
      case 'MultiPolygon':
        return multiPolygonToWKTMultiPolygon(primitive);
      default:
        throw Error("Unknown Type: " + primitive.type);
    }
  }

  exports.parser = parser;
  exports.Parser = parser.Parser;
  exports.parse = parse;
  exports.convert = convert;

  return exports;
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)(module)))

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function (root, factory) {
  if (( false ? 'undefined' : _typeof(module)) === 'object' && _typeof(module.exports) === 'object') {
    exports = module.exports = factory();
  }

  if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === "object") {
    root.Terraformer = factory();
  }
})(undefined, function () {
  var exports = {},
      EarthRadius = 6378137,
      DegreesPerRadian = 57.295779513082320,
      RadiansPerDegree = 0.017453292519943,
      MercatorCRS = {
    "type": "link",
    "properties": {
      "href": "http://spatialreference.org/ref/sr-org/6928/ogcwkt/",
      "type": "ogcwkt"
    }
  },
      GeographicCRS = {
    "type": "link",
    "properties": {
      "href": "http://spatialreference.org/ref/epsg/4326/ogcwkt/",
      "type": "ogcwkt"
    }
  };

  function isArray(obj) {
    return Object.prototype.toString.call(obj) === "[object Array]";
  }

  function warn() {
    var args = Array.prototype.slice.apply(arguments);

    if ((typeof console === 'undefined' ? 'undefined' : _typeof(console)) !== undefined && console.warn) {
      console.warn.apply(console, args);
    }
  }

  function extend(destination, source) {
    for (var k in source) {
      if (source.hasOwnProperty(k)) {
        destination[k] = source[k];
      }
    }
    return destination;
  }

  function calculateBounds(geojson) {
    if (geojson.type) {
      switch (geojson.type) {
        case 'Point':
          return [geojson.coordinates[0], geojson.coordinates[1], geojson.coordinates[0], geojson.coordinates[1]];

        case 'MultiPoint':
          return calculateBoundsFromArray(geojson.coordinates);

        case 'LineString':
          return calculateBoundsFromArray(geojson.coordinates);

        case 'MultiLineString':
          return calculateBoundsFromNestedArrays(geojson.coordinates);

        case 'Polygon':
          return calculateBoundsFromNestedArrays(geojson.coordinates);

        case 'MultiPolygon':
          return calculateBoundsFromNestedArrayOfArrays(geojson.coordinates);

        case 'Feature':
          return geojson.geometry ? calculateBounds(geojson.geometry) : null;

        case 'FeatureCollection':
          return calculateBoundsForFeatureCollection(geojson);

        case 'GeometryCollection':
          return calculateBoundsForGeometryCollection(geojson);

        default:
          throw new Error("Unknown type: " + geojson.type);
      }
    }
    return null;
  }

  function calculateBoundsFromNestedArrays(array) {
    var x1 = null,
        x2 = null,
        y1 = null,
        y2 = null;

    for (var i = 0; i < array.length; i++) {
      var inner = array[i];

      for (var j = 0; j < inner.length; j++) {
        var lonlat = inner[j];

        var lon = lonlat[0];
        var lat = lonlat[1];

        if (x1 === null) {
          x1 = lon;
        } else if (lon < x1) {
          x1 = lon;
        }

        if (x2 === null) {
          x2 = lon;
        } else if (lon > x2) {
          x2 = lon;
        }

        if (y1 === null) {
          y1 = lat;
        } else if (lat < y1) {
          y1 = lat;
        }

        if (y2 === null) {
          y2 = lat;
        } else if (lat > y2) {
          y2 = lat;
        }
      }
    }

    return [x1, y1, x2, y2];
  }

  function calculateBoundsFromNestedArrayOfArrays(array) {
    var x1 = null,
        x2 = null,
        y1 = null,
        y2 = null;

    for (var i = 0; i < array.length; i++) {
      var inner = array[i];

      for (var j = 0; j < inner.length; j++) {
        var innerinner = inner[j];
        for (var k = 0; k < innerinner.length; k++) {
          var lonlat = innerinner[k];

          var lon = lonlat[0];
          var lat = lonlat[1];

          if (x1 === null) {
            x1 = lon;
          } else if (lon < x1) {
            x1 = lon;
          }

          if (x2 === null) {
            x2 = lon;
          } else if (lon > x2) {
            x2 = lon;
          }

          if (y1 === null) {
            y1 = lat;
          } else if (lat < y1) {
            y1 = lat;
          }

          if (y2 === null) {
            y2 = lat;
          } else if (lat > y2) {
            y2 = lat;
          }
        }
      }
    }

    return [x1, y1, x2, y2];
  }

  function calculateBoundsFromArray(array) {
    var x1 = null,
        x2 = null,
        y1 = null,
        y2 = null;

    for (var i = 0; i < array.length; i++) {
      var lonlat = array[i];
      var lon = lonlat[0];
      var lat = lonlat[1];

      if (x1 === null) {
        x1 = lon;
      } else if (lon < x1) {
        x1 = lon;
      }

      if (x2 === null) {
        x2 = lon;
      } else if (lon > x2) {
        x2 = lon;
      }

      if (y1 === null) {
        y1 = lat;
      } else if (lat < y1) {
        y1 = lat;
      }

      if (y2 === null) {
        y2 = lat;
      } else if (lat > y2) {
        y2 = lat;
      }
    }

    return [x1, y1, x2, y2];
  }

  function calculateBoundsForFeatureCollection(featureCollection) {
    var extents = [],
        extent;
    for (var i = featureCollection.features.length - 1; i >= 0; i--) {
      extent = calculateBounds(featureCollection.features[i].geometry);
      extents.push([extent[0], extent[1]]);
      extents.push([extent[2], extent[3]]);
    }

    return calculateBoundsFromArray(extents);
  }

  function calculateBoundsForGeometryCollection(geometryCollection) {
    var extents = [],
        extent;

    for (var i = geometryCollection.geometries.length - 1; i >= 0; i--) {
      extent = calculateBounds(geometryCollection.geometries[i]);
      extents.push([extent[0], extent[1]]);
      extents.push([extent[2], extent[3]]);
    }

    return calculateBoundsFromArray(extents);
  }

  function calculateEnvelope(geojson) {
    var bounds = calculateBounds(geojson);
    return {
      x: bounds[0],
      y: bounds[1],
      w: Math.abs(bounds[0] - bounds[2]),
      h: Math.abs(bounds[1] - bounds[3])
    };
  }

  function radToDeg(rad) {
    return rad * DegreesPerRadian;
  }

  function degToRad(deg) {
    return deg * RadiansPerDegree;
  }

  function eachPosition(coordinates, func) {
    for (var i = 0; i < coordinates.length; i++) {
      if (typeof coordinates[i][0] === "number") {
        coordinates[i] = func(coordinates[i]);
      }

      if (_typeof(coordinates[i]) === "object") {
        coordinates[i] = eachPosition(coordinates[i], func);
      }
    }
    return coordinates;
  }

  function positionToGeographic(position) {
    var x = position[0];
    var y = position[1];
    return [radToDeg(x / EarthRadius) - Math.floor((radToDeg(x / EarthRadius) + 180) / 360) * 360, radToDeg(Math.PI / 2 - 2 * Math.atan(Math.exp(-1.0 * y / EarthRadius)))];
  }

  function positionToMercator(position) {
    var lng = position[0];
    var lat = Math.max(Math.min(position[1], 89.99999), -89.99999);
    return [degToRad(lng) * EarthRadius, EarthRadius / 2.0 * Math.log((1.0 + Math.sin(degToRad(lat))) / (1.0 - Math.sin(degToRad(lat))))];
  }

  function applyConverter(geojson, converter, noCrs) {
    if (geojson.type === "Point") {
      geojson.coordinates = converter(geojson.coordinates);
    } else if (geojson.type === "Feature") {
      geojson.geometry = applyConverter(geojson.geometry, converter, true);
    } else if (geojson.type === "FeatureCollection") {
      for (var f = 0; f < geojson.features.length; f++) {
        geojson.features[f] = applyConverter(geojson.features[f], converter, true);
      }
    } else if (geojson.type === "GeometryCollection") {
      for (var g = 0; g < geojson.geometries.length; g++) {
        geojson.geometries[g] = applyConverter(geojson.geometries[g], converter, true);
      }
    } else {
      geojson.coordinates = eachPosition(geojson.coordinates, converter);
    }

    if (!noCrs) {
      if (converter === positionToMercator) {
        geojson.crs = MercatorCRS;
      }
    }

    if (converter === positionToGeographic) {
      delete geojson.crs;
    }

    return geojson;
  }

  function toMercator(geojson) {
    return applyConverter(geojson, positionToMercator);
  }

  function toGeographic(geojson) {
    return applyConverter(geojson, positionToGeographic);
  }

  function cmp(a, b) {
    if (a < b) {
      return -1;
    } else if (a > b) {
      return 1;
    } else {
      return 0;
    }
  }

  function compSort(p1, p2) {
    if (p1[0] > p2[0]) {
      return -1;
    } else if (p1[0] < p2[0]) {
      return 1;
    } else if (p1[1] > p2[1]) {
      return -1;
    } else if (p1[1] < p2[1]) {
      return 1;
    } else {
      return 0;
    }
  }

  function turn(p, q, r) {
    return cmp((q[0] - p[0]) * (r[1] - p[1]) - (r[0] - p[0]) * (q[1] - p[1]), 0);
  }

  function euclideanDistance(p, q) {
    var dx = q[0] - p[0];
    var dy = q[1] - p[1];

    return dx * dx + dy * dy;
  }

  function nextHullPoint(points, p) {
    var q = p;
    for (var r in points) {
      var t = turn(p, q, points[r]);
      if (t === -1 || t === 0 && euclideanDistance(p, points[r]) > euclideanDistance(p, q)) {
        q = points[r];
      }
    }
    return q;
  }

  function convexHull(points) {

    if (points.length === 0) {
      return [];
    } else if (points.length === 1) {
      return points;
    }

    var hull = [points.sort(compSort)[0]];

    for (var p = 0; p < hull.length; p++) {
      var q = nextHullPoint(points, hull[p]);

      if (q !== hull[0]) {
        hull.push(q);
      }
    }

    return hull;
  }

  function isConvex(points) {
    var ltz;

    for (var i = 0; i < points.length - 3; i++) {
      var p1 = points[i];
      var p2 = points[i + 1];
      var p3 = points[i + 2];
      var v = [p2[0] - p1[0], p2[1] - p1[1]];

      var res = p3[0] * v[1] - p3[1] * v[0] + v[0] * p1[1] - v[1] * p1[0];

      if (i === 0) {
        if (res < 0) {
          ltz = true;
        } else {
          ltz = false;
        }
      } else {
        if (ltz && res > 0 || !ltz && res < 0) {
          return false;
        }
      }
    }

    return true;
  }

  function coordinatesContainPoint(coordinates, point) {
    var contains = false;
    for (var i = -1, l = coordinates.length, j = l - 1; ++i < l; j = i) {
      if ((coordinates[i][1] <= point[1] && point[1] < coordinates[j][1] || coordinates[j][1] <= point[1] && point[1] < coordinates[i][1]) && point[0] < (coordinates[j][0] - coordinates[i][0]) * (point[1] - coordinates[i][1]) / (coordinates[j][1] - coordinates[i][1]) + coordinates[i][0]) {
        contains = !contains;
      }
    }
    return contains;
  }

  function polygonContainsPoint(polygon, point) {
    if (polygon && polygon.length) {
      if (polygon.length === 1) {
        return coordinatesContainPoint(polygon[0], point);
      } else {
        if (coordinatesContainPoint(polygon[0], point)) {
          for (var i = 1; i < polygon.length; i++) {
            if (coordinatesContainPoint(polygon[i], point)) {
              return false;
            }
          }

          return true;
        } else {
          return false;
        }
      }
    } else {
      return false;
    }
  }

  function edgeIntersectsEdge(a1, a2, b1, b2) {
    var ua_t = (b2[0] - b1[0]) * (a1[1] - b1[1]) - (b2[1] - b1[1]) * (a1[0] - b1[0]);
    var ub_t = (a2[0] - a1[0]) * (a1[1] - b1[1]) - (a2[1] - a1[1]) * (a1[0] - b1[0]);
    var u_b = (b2[1] - b1[1]) * (a2[0] - a1[0]) - (b2[0] - b1[0]) * (a2[1] - a1[1]);

    if (u_b !== 0) {
      var ua = ua_t / u_b;
      var ub = ub_t / u_b;

      if (0 <= ua && ua <= 1 && 0 <= ub && ub <= 1) {
        return true;
      }
    }

    return false;
  }

  function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  function arraysIntersectArrays(a, b) {
    if (isNumber(a[0][0])) {
      if (isNumber(b[0][0])) {
        for (var i = 0; i < a.length - 1; i++) {
          for (var j = 0; j < b.length - 1; j++) {
            if (edgeIntersectsEdge(a[i], a[i + 1], b[j], b[j + 1])) {
              return true;
            }
          }
        }
      } else {
        for (var k = 0; k < b.length; k++) {
          if (arraysIntersectArrays(a, b[k])) {
            return true;
          }
        }
      }
    } else {
      for (var l = 0; l < a.length; l++) {
        if (arraysIntersectArrays(a[l], b)) {
          return true;
        }
      }
    }
    return false;
  }

  function closedPolygon(coordinates) {
    var outer = [];

    for (var i = 0; i < coordinates.length; i++) {
      var inner = coordinates[i].slice();
      if (pointsEqual(inner[0], inner[inner.length - 1]) === false) {
        inner.push(inner[0]);
      }

      outer.push(inner);
    }

    return outer;
  }

  function pointsEqual(a, b) {
    for (var i = 0; i < a.length; i++) {

      if (a[i] !== b[i]) {
        return false;
      }
    }

    return true;
  }

  function coordinatesEqual(a, b) {
    if (a.length !== b.length) {
      return false;
    }

    var na = a.slice().sort(compSort);
    var nb = b.slice().sort(compSort);

    for (var i = 0; i < na.length; i++) {
      if (na[i].length !== nb[i].length) {
        return false;
      }
      for (var j = 0; j < na.length; j++) {
        if (na[i][j] !== nb[i][j]) {
          return false;
        }
      }
    }

    return true;
  }

  var excludeFromJSON = ["length"];

  function Primitive(geojson) {
    if (geojson) {
      switch (geojson.type) {
        case 'Point':
          return new Point(geojson);

        case 'MultiPoint':
          return new MultiPoint(geojson);

        case 'LineString':
          return new LineString(geojson);

        case 'MultiLineString':
          return new MultiLineString(geojson);

        case 'Polygon':
          return new Polygon(geojson);

        case 'MultiPolygon':
          return new MultiPolygon(geojson);

        case 'Feature':
          return new Feature(geojson);

        case 'FeatureCollection':
          return new FeatureCollection(geojson);

        case 'GeometryCollection':
          return new GeometryCollection(geojson);

        default:
          throw new Error("Unknown type: " + geojson.type);
      }
    }
  }

  Primitive.prototype.toMercator = function () {
    return toMercator(this);
  };

  Primitive.prototype.toGeographic = function () {
    return toGeographic(this);
  };

  Primitive.prototype.envelope = function () {
    return calculateEnvelope(this);
  };

  Primitive.prototype.bbox = function () {
    return calculateBounds(this);
  };

  Primitive.prototype.convexHull = function () {
    var coordinates = [],
        i,
        j;
    if (this.type === 'Point') {
      return null;
    } else if (this.type === 'LineString' || this.type === 'MultiPoint') {
      if (this.coordinates && this.coordinates.length >= 3) {
        coordinates = this.coordinates;
      } else {
        return null;
      }
    } else if (this.type === 'Polygon' || this.type === 'MultiLineString') {
      if (this.coordinates && this.coordinates.length > 0) {
        for (i = 0; i < this.coordinates.length; i++) {
          coordinates = coordinates.concat(this.coordinates[i]);
        }
        if (coordinates.length < 3) {
          return null;
        }
      } else {
        return null;
      }
    } else if (this.type === 'MultiPolygon') {
      if (this.coordinates && this.coordinates.length > 0) {
        for (i = 0; i < this.coordinates.length; i++) {
          for (j = 0; j < this.coordinates[i].length; j++) {
            coordinates = coordinates.concat(this.coordinates[i][j]);
          }
        }
        if (coordinates.length < 3) {
          return null;
        }
      } else {
        return null;
      }
    } else if (this.type === "Feature") {
      var primitive = new Primitive(this.geometry);
      return primitive.convexHull();
    }

    return new Polygon({
      type: 'Polygon',
      coordinates: closedPolygon([convexHull(coordinates)])
    });
  };

  Primitive.prototype.toJSON = function () {
    var obj = {};
    for (var key in this) {
      if (this.hasOwnProperty(key) && excludeFromJSON.indexOf(key) === -1) {
        obj[key] = this[key];
      }
    }
    obj.bbox = calculateBounds(this);
    return obj;
  };

  Primitive.prototype.contains = function (primitive) {
    return new Primitive(primitive).within(this);
  };

  Primitive.prototype.within = function (primitive) {
    var coordinates, i, contains;

    if (primitive.type === 'Feature') {
      primitive = primitive.geometry;
    }

    if (primitive.type === "Point") {
      if (this.type === "Point") {
        return pointsEqual(this.coordinates, primitive.coordinates);
      }
    }

    if (primitive.type === "MultiLineString") {
      if (this.type === "Point") {
        for (i = 0; i < primitive.coordinates.length; i++) {
          var linestring = { type: "LineString", coordinates: primitive.coordinates[i] };

          if (this.within(linestring)) {
            return true;
          }
        }
      }
    }

    if (primitive.type === "LineString" || primitive.type === "MultiPoint") {
      if (this.type === "Point") {
        for (i = 0; i < primitive.coordinates.length; i++) {
          if (this.coordinates.length !== primitive.coordinates[i].length) {
            return false;
          }

          if (pointsEqual(this.coordinates, primitive.coordinates[i])) {
            return true;
          }
        }
      }
    }

    if (primitive.type === "Polygon") {
      if (this.type === "Polygon") {
        if (primitive.coordinates.length === this.coordinates.length) {
          for (i = 0; i < this.coordinates.length; i++) {
            if (coordinatesEqual(this.coordinates[i], primitive.coordinates[i])) {
              return true;
            }
          }
        }

        if (this.coordinates.length && polygonContainsPoint(primitive.coordinates, this.coordinates[0][0])) {
          return !arraysIntersectArrays(closedPolygon(this.coordinates), closedPolygon(primitive.coordinates));
        } else {
          return false;
        }
      } else if (this.type === "Point") {
        return polygonContainsPoint(primitive.coordinates, this.coordinates);
      } else if (this.type === "LineString" || this.type === "MultiPoint") {
        if (!this.coordinates || this.coordinates.length === 0) {
          return false;
        }

        for (i = 0; i < this.coordinates.length; i++) {
          if (polygonContainsPoint(primitive.coordinates, this.coordinates[i]) === false) {
            return false;
          }
        }

        return true;
      } else if (this.type === "MultiLineString") {
        for (i = 0; i < this.coordinates.length; i++) {
          var ls = new LineString(this.coordinates[i]);

          if (ls.within(primitive) === false) {
            contains++;
            return false;
          }
        }

        return true;
      } else if (this.type === "MultiPolygon") {
        for (i = 0; i < this.coordinates.length; i++) {
          var p1 = new Primitive({ type: "Polygon", coordinates: this.coordinates[i] });

          if (p1.within(primitive) === false) {
            return false;
          }
        }

        return true;
      }
    }

    if (primitive.type === "MultiPolygon") {
      if (this.type === "Point") {
        if (primitive.coordinates.length) {
          for (i = 0; i < primitive.coordinates.length; i++) {
            coordinates = primitive.coordinates[i];
            if (polygonContainsPoint(coordinates, this.coordinates) && arraysIntersectArrays([this.coordinates], primitive.coordinates) === false) {
              return true;
            }
          }
        }

        return false;
      } else if (this.type === "Polygon") {
        for (i = 0; i < this.coordinates.length; i++) {
          if (primitive.coordinates[i].length === this.coordinates.length) {
            for (j = 0; j < this.coordinates.length; j++) {
              if (coordinatesEqual(this.coordinates[j], primitive.coordinates[i][j])) {
                return true;
              }
            }
          }
        }

        if (arraysIntersectArrays(this.coordinates, primitive.coordinates) === false) {
          if (primitive.coordinates.length) {
            for (i = 0; i < primitive.coordinates.length; i++) {
              coordinates = primitive.coordinates[i];
              if (polygonContainsPoint(coordinates, this.coordinates[0][0]) === false) {
                contains = false;
              } else {
                contains = true;
              }
            }

            return contains;
          }
        }
      } else if (this.type === "LineString" || this.type === "MultiPoint") {
        for (i = 0; i < primitive.coordinates.length; i++) {
          var p = { type: "Polygon", coordinates: primitive.coordinates[i] };

          if (this.within(p)) {
            return true;
          }

          return false;
        }
      } else if (this.type === "MultiLineString") {
        for (i = 0; i < this.coordinates.length; i++) {
          var lines = new LineString(this.coordinates[i]);

          if (lines.within(primitive) === false) {
            return false;
          }
        }

        return true;
      } else if (this.type === "MultiPolygon") {
        for (i = 0; i < primitive.coordinates.length; i++) {
          var mpoly = { type: "Polygon", coordinates: primitive.coordinates[i] };

          if (this.within(mpoly) === false) {
            return false;
          }
        }

        return true;
      }
    }

    return false;
  };

  Primitive.prototype.intersects = function (primitive) {
    if (primitive.type === 'Feature') {
      primitive = primitive.geometry;
    }

    var p = new Primitive(primitive);
    if (this.within(primitive) || p.within(this)) {
      return true;
    }

    if (this.type !== 'Point' && this.type !== 'MultiPoint' && primitive.type !== 'Point' && primitive.type !== 'MultiPoint') {
      return arraysIntersectArrays(this.coordinates, primitive.coordinates);
    } else if (this.type === 'Feature') {
      var inner = new Primitive(this.geometry);
      return inner.intersects(primitive);
    }

    warn("Type " + this.type + " to " + primitive.type + " intersection is not supported by intersects");
    return false;
  };

  function Point(input) {
    var args = Array.prototype.slice.call(arguments);

    if (input && input.type === "Point" && input.coordinates) {
      extend(this, input);
    } else if (input && isArray(input)) {
      this.coordinates = input;
    } else if (args.length >= 2) {
      this.coordinates = args;
    } else {
      throw "Terraformer: invalid input for Terraformer.Point";
    }

    this.type = "Point";
  }

  Point.prototype = new Primitive();
  Point.prototype.constructor = Point;

  function MultiPoint(input) {
    if (input && input.type === "MultiPoint" && input.coordinates) {
      extend(this, input);
    } else if (isArray(input)) {
      this.coordinates = input;
    } else {
      throw "Terraformer: invalid input for Terraformer.MultiPoint";
    }

    this.type = "MultiPoint";
  }

  MultiPoint.prototype = new Primitive();
  MultiPoint.prototype.constructor = MultiPoint;
  MultiPoint.prototype.forEach = function (func) {
    for (var i = 0; i < this.coordinates.length; i++) {
      func.apply(this, [this.coordinates[i], i, this.coordinates]);
    }
    return this;
  };
  MultiPoint.prototype.addPoint = function (point) {
    this.coordinates.push(point);
    return this;
  };
  MultiPoint.prototype.insertPoint = function (point, index) {
    this.coordinates.splice(index, 0, point);
    return this;
  };
  MultiPoint.prototype.removePoint = function (remove) {
    if (typeof remove === "number") {
      this.coordinates.splice(remove, 1);
    } else {
      this.coordinates.splice(this.coordinates.indexOf(remove), 1);
    }
    return this;
  };
  MultiPoint.prototype.get = function (i) {
    return new Point(this.coordinates[i]);
  };

  function LineString(input) {
    if (input && input.type === "LineString" && input.coordinates) {
      extend(this, input);
    } else if (isArray(input)) {
      this.coordinates = input;
    } else {
      throw "Terraformer: invalid input for Terraformer.LineString";
    }

    this.type = "LineString";
  }

  LineString.prototype = new Primitive();
  LineString.prototype.constructor = LineString;
  LineString.prototype.addVertex = function (point) {
    this.coordinates.push(point);
    return this;
  };
  LineString.prototype.insertVertex = function (point, index) {
    this.coordinates.splice(index, 0, point);
    return this;
  };
  LineString.prototype.removeVertex = function (remove) {
    this.coordinates.splice(remove, 1);
    return this;
  };

  function MultiLineString(input) {
    if (input && input.type === "MultiLineString" && input.coordinates) {
      extend(this, input);
    } else if (isArray(input)) {
      this.coordinates = input;
    } else {
      throw "Terraformer: invalid input for Terraformer.MultiLineString";
    }

    this.type = "MultiLineString";
  }

  MultiLineString.prototype = new Primitive();
  MultiLineString.prototype.constructor = MultiLineString;
  MultiLineString.prototype.forEach = function (func) {
    for (var i = 0; i < this.coordinates.length; i++) {
      func.apply(this, [this.coordinates[i], i, this.coordinates]);
    }
  };
  MultiLineString.prototype.get = function (i) {
    return new LineString(this.coordinates[i]);
  };

  function Polygon(input) {
    if (input && input.type === "Polygon" && input.coordinates) {
      extend(this, input);
    } else if (isArray(input)) {
      this.coordinates = input;
    } else {
      throw "Terraformer: invalid input for Terraformer.Polygon";
    }

    this.type = "Polygon";
  }

  Polygon.prototype = new Primitive();
  Polygon.prototype.constructor = Polygon;
  Polygon.prototype.addVertex = function (point) {
    this.insertVertex(point, this.coordinates[0].length - 1);
    return this;
  };
  Polygon.prototype.insertVertex = function (point, index) {
    this.coordinates[0].splice(index, 0, point);
    return this;
  };
  Polygon.prototype.removeVertex = function (remove) {
    this.coordinates[0].splice(remove, 1);
    return this;
  };
  Polygon.prototype.close = function () {
    this.coordinates = closedPolygon(this.coordinates);
  };
  Polygon.prototype.hasHoles = function () {
    return this.coordinates.length > 1;
  };
  Polygon.prototype.holes = function () {
    holes = [];
    if (this.hasHoles()) {
      for (var i = 1; i < this.coordinates.length; i++) {
        holes.push(new Polygon([this.coordinates[i]]));
      }
    }
    return holes;
  };

  function MultiPolygon(input) {
    if (input && input.type === "MultiPolygon" && input.coordinates) {
      extend(this, input);
    } else if (isArray(input)) {
      this.coordinates = input;
    } else {
      throw "Terraformer: invalid input for Terraformer.MultiPolygon";
    }

    this.type = "MultiPolygon";
  }

  MultiPolygon.prototype = new Primitive();
  MultiPolygon.prototype.constructor = MultiPolygon;
  MultiPolygon.prototype.forEach = function (func) {
    for (var i = 0; i < this.coordinates.length; i++) {
      func.apply(this, [this.coordinates[i], i, this.coordinates]);
    }
  };
  MultiPolygon.prototype.get = function (i) {
    return new Polygon(this.coordinates[i]);
  };
  MultiPolygon.prototype.close = function () {
    var outer = [];
    this.forEach(function (polygon) {
      outer.push(closedPolygon(polygon));
    });
    this.coordinates = outer;
    return this;
  };

  function Feature(input) {
    if (input && input.type === "Feature") {
      extend(this, input);
    } else if (input && input.type && input.coordinates) {
      this.geometry = input;
    } else {
      throw "Terraformer: invalid input for Terraformer.Feature";
    }

    this.type = "Feature";
  }

  Feature.prototype = new Primitive();
  Feature.prototype.constructor = Feature;

  function FeatureCollection(input) {
    if (input && input.type === "FeatureCollection" && input.features) {
      extend(this, input);
    } else if (isArray(input)) {
      this.features = input;
    } else {
      throw "Terraformer: invalid input for Terraformer.FeatureCollection";
    }

    this.type = "FeatureCollection";
  }

  FeatureCollection.prototype = new Primitive();
  FeatureCollection.prototype.constructor = FeatureCollection;
  FeatureCollection.prototype.forEach = function (func) {
    for (var i = 0; i < this.features.length; i++) {
      func.apply(this, [this.features[i], i, this.features]);
    }
  };
  FeatureCollection.prototype.get = function (id) {
    var found;
    this.forEach(function (feature) {
      if (feature.id === id) {
        found = feature;
      }
    });
    return new Feature(found);
  };

  function GeometryCollection(input) {
    if (input && input.type === "GeometryCollection" && input.geometries) {
      extend(this, input);
    } else if (isArray(input)) {
      this.geometries = input;
    } else if (input.coordinates && input.type) {
      this.type = "GeometryCollection";
      this.geometries = [input];
    } else {
      throw "Terraformer: invalid input for Terraformer.GeometryCollection";
    }

    this.type = "GeometryCollection";
  }

  GeometryCollection.prototype = new Primitive();
  GeometryCollection.prototype.constructor = GeometryCollection;
  GeometryCollection.prototype.forEach = function (func) {
    for (var i = 0; i < this.geometries.length; i++) {
      func.apply(this, [this.geometries[i], i, this.geometries]);
    }
  };
  GeometryCollection.prototype.get = function (i) {
    return new Primitive(this.geometries[i]);
  };

  function createCircle(center, radius, interpolate) {
    var mercatorPosition = positionToMercator(center);
    var steps = interpolate || 64;
    var polygon = {
      type: "Polygon",
      coordinates: [[]]
    };
    for (var i = 1; i <= steps; i++) {
      var radians = i * (360 / steps) * Math.PI / 180;
      polygon.coordinates[0].push([mercatorPosition[0] + radius * Math.cos(radians), mercatorPosition[1] + radius * Math.sin(radians)]);
    }
    polygon.coordinates = closedPolygon(polygon.coordinates);

    return toGeographic(polygon);
  }

  function Circle(center, radius, interpolate) {
    var steps = interpolate || 64;
    var rad = radius || 250;

    if (!center || center.length < 2 || !rad || !steps) {
      throw new Error("Terraformer: missing parameter for Terraformer.Circle");
    }

    extend(this, new Feature({
      type: "Feature",
      geometry: createCircle(center, rad, steps),
      properties: {
        radius: rad,
        center: center,
        steps: steps
      }
    }));
  }

  Circle.prototype = new Primitive();
  Circle.prototype.constructor = Circle;
  Circle.prototype.recalculate = function () {
    this.geometry = createCircle(this.properties.center, this.properties.radius, this.properties.steps);
    return this;
  };
  Circle.prototype.center = function (coordinates) {
    if (coordinates) {
      this.properties.center = coordinates;
      this.recalculate();
    }
    return this.properties.center;
  };
  Circle.prototype.radius = function (radius) {
    if (radius) {
      this.properties.radius = radius;
      this.recalculate();
    }
    return this.properties.radius;
  };
  Circle.prototype.steps = function (steps) {
    if (steps) {
      this.properties.steps = steps;
      this.recalculate();
    }
    return this.properties.steps;
  };

  Circle.prototype.toJSON = function () {
    var output = Primitive.prototype.toJSON.call(this);
    return output;
  };

  exports.Primitive = Primitive;
  exports.Point = Point;
  exports.MultiPoint = MultiPoint;
  exports.LineString = LineString;
  exports.MultiLineString = MultiLineString;
  exports.Polygon = Polygon;
  exports.MultiPolygon = MultiPolygon;
  exports.Feature = Feature;
  exports.FeatureCollection = FeatureCollection;
  exports.GeometryCollection = GeometryCollection;
  exports.Circle = Circle;

  exports.toMercator = toMercator;
  exports.toGeographic = toGeographic;

  exports.Tools = {};
  exports.Tools.positionToMercator = positionToMercator;
  exports.Tools.positionToGeographic = positionToGeographic;
  exports.Tools.applyConverter = applyConverter;
  exports.Tools.toMercator = toMercator;
  exports.Tools.toGeographic = toGeographic;
  exports.Tools.createCircle = createCircle;

  exports.Tools.calculateBounds = calculateBounds;
  exports.Tools.calculateEnvelope = calculateEnvelope;

  exports.Tools.coordinatesContainPoint = coordinatesContainPoint;
  exports.Tools.polygonContainsPoint = polygonContainsPoint;
  exports.Tools.arraysIntersectArrays = arraysIntersectArrays;
  exports.Tools.coordinatesContainPoint = coordinatesContainPoint;
  exports.Tools.coordinatesEqual = coordinatesEqual;
  exports.Tools.convexHull = convexHull;
  exports.Tools.isConvex = isConvex;

  exports.MercatorCRS = MercatorCRS;
  exports.GeographicCRS = GeographicCRS;

  return exports;
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)(module)))

/***/ })
/******/ ]);
});
//# sourceMappingURL=GeomTools.js.map