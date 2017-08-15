function feature (geometry, properties, bbox, id) {
  if (geometry === undefined) throw new Error('geometry is required')
  if (properties && properties.constructor !== Object) throw new Error('properties must be an Object')
  var feat = {
    type: 'Feature',
    properties: properties || {},
    geometry: geometry
  }
  if (bbox) {
    if (bbox.length !== 4) throw new Error('bbox must be an Array of 4 numbers')
    feat.bbox = bbox
  }
  if (id) feat.id = id
  return feat
}

function geometry (type, coordinates, bbox) {
  // Validation
  if (!type) throw new Error('type is required')
  if (!coordinates) throw new Error('coordinates is required')
  if (!Array.isArray(coordinates)) throw new Error('coordinates must be an Array')
  var geom
  switch (type) {
    case 'Point':
      geom = point(coordinates).geometry
      break
    case 'LineString':
      geom = lineString(coordinates).geometry
      break
    case 'Polygon':
      geom = polygon(coordinates).geometry
      break
    case 'MultiPoint':
      geom = multiPoint(coordinates).geometry
      break
    case 'MultiLineString':
      geom = multiLineString(coordinates).geometry
      break
    case 'MultiPolygon':
      geom = multiPolygon(coordinates).geometry
      break
    default:
      throw new Error(type + ' is invalid')
  }
  if (bbox) {
    if (bbox.length !== 4) throw new Error('bbox must be an Array of 4 numbers')
    geom.bbox = bbox
  }
  return geom
}

function point (coordinates, properties, bbox, id) {
  if (!coordinates) throw new Error('No coordinates passed')
  if (coordinates.length === undefined) throw new Error('Coordinates must be an array')
  if (coordinates.length < 2) throw new Error('Coordinates must be at least 2 numbers long')
  if (typeof coordinates[0] !== 'number' || typeof coordinates[1] !== 'number') throw new Error('Coordinates must contain numbers')
  return feature({
    type: 'Point',
    coordinates: coordinates
  }, properties, bbox, id)
}

function polygon (coordinates, properties, bbox, id) {
  if (!coordinates) throw new Error('No coordinates passed')
  for (var i = 0; i < coordinates.length; i++) {
    var ring = coordinates[i]
    if (ring.length < 4) {
      throw new Error('Each LinearRing of a Polygon must have 4 or more Positions.')
    }
    for (var j = 0; j < ring[ring.length - 1].length; j++) {
      if (ring[ring.length - 1][j] !== ring[0][j]) {
        throw new Error('First and last Position are not equivalent.')
      }
    }
  }
  return feature({
    type: 'Polygon',
    coordinates: coordinates
  }, properties, bbox, id)
}

function lineString (coordinates, properties, bbox, id) {
  if (!coordinates) throw new Error('No coordinates passed')
  if (coordinates.length < 2) throw new Error('Coordinates must be an array of two or more positions')
  return feature({
    type: 'LineString',
    coordinates: coordinates
  }, properties, bbox, id)
}

function featureCollection (features, bbox) {
  if (!features) throw new Error('No features passed')
  if (!Array.isArray(features)) throw new Error('features must be an Array')
  var fc = {
    type: 'FeatureCollection',
    features: features
  }
  if (bbox) fc.bbox = bbox
  return fc
}

function multiLineString (coordinates, properties, bbox, id) {
  if (!coordinates) throw new Error('No coordinates passed')
  return feature({
    type: 'MultiLineString',
    coordinates: coordinates
  }, properties, bbox, id)
}

function multiPoint (coordinates, properties, bbox, id) {
  if (!coordinates) throw new Error('No coordinates passed')
  return feature({
    type: 'MultiPoint',
    coordinates: coordinates
  }, properties, bbox, id)
}

function multiPolygon (coordinates, properties, bbox, id) {
  if (!coordinates) throw new Error('No coordinates passed')
  return feature({
    type: 'MultiPolygon',
    coordinates: coordinates
  }, properties, bbox, id)
}

function geometryCollection (geometries, properties, bbox, id) {
  if (!geometries) throw new Error('geometries is required')
  if (!Array.isArray(geometries)) throw new Error('geometries must be an Array')
  return feature({
    type: 'GeometryCollection',
    geometries: geometries
  }, properties, bbox, id)
}

export default {
  feature,
  geometry,
  point,
  polygon,
  lineString,
  featureCollection,
  multiLineString,
  multiPoint,
  multiPolygon,
  geometryCollection
}
