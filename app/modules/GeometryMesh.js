const THREE = require('THREE')


class Geometry {
  geometry = null

  constructor() {
    this.init()
  }

  init() {
    let planeGeometery1 = new THREE.PlaneGeometry(500, 500, 10, 10)
    let planeGeometery2 = new THREE.PlaneGeometry(500, 500, 10, 10)
    let plane1 = new THREE.Mesh(planeGeometery1)
    let plane2 = new THREE.Mesh(planeGeometery2)

    plane1.position.x = -125
    plane1.position.y = -125
    plane1.updateMatrix()
    plane2.position.x = 125
    plane2.position.y = 125
    plane2.updateMatrix()

    planeGeometery2.faces.splice(100, 10)
    planeGeometery2.faces.splice(110, 10)
    planeGeometery2.faces.splice(120, 10)
    planeGeometery2.faces.splice(130, 10)
    planeGeometery2.faces.splice(140, 10)

    let geometry = new THREE.Geometry()
    geometry.merge(plane1.geometry, plane1.matrix)
    geometry.merge(plane2.geometry, plane2.matrix)
    geometry.mergeVertices()

    let faces = geometry.faces
    let vertices = geometry.vertices

    this.geometry = new THREE.BufferGeometry();

    var positions = new Float32Array(faces.length * 3 * 3);
    var normals = new Float32Array(faces.length * 3 * 3);
    var colors = new Float32Array(faces.length * 3 * 3);
    var uvs = new Float32Array(faces.length * 3 * 2);

    var color = new THREE.Color();


    var max = 0,
      min = 0
    var pA = new THREE.Vector3();
    var pB = new THREE.Vector3();
    var pC = new THREE.Vector3();

    var cb = new THREE.Vector3();
    var ab = new THREE.Vector3();

    let k = 0
    for (var i = 0; i < positions.length; i += 9) {

      // positions
      let face = faces[k]

      var ax = vertices[face.a].x;
      var ay = vertices[face.a].y;
      var az = vertices[face.a].z;

      var bx = vertices[face.b].x;
      var by = vertices[face.b].y;
      var bz = vertices[face.b].z;

      var cx = vertices[face.c].x;
      var cy = vertices[face.c].y;
      var cz = vertices[face.c].z;

      max = Math.max(max, Math.max(ax, Math.max(bx, cx)))
      min = Math.min(min, Math.min(ax, Math.min(bx, cx)))
      positions[i] = ax;
      positions[i + 1] = ay;
      positions[i + 2] = az;

      positions[i + 3] = bx;
      positions[i + 4] = by;
      positions[i + 5] = bz;

      positions[i + 6] = cx;
      positions[i + 7] = cy;
      positions[i + 8] = cz;

      uvs[k * 6 + 0] = (ax + 375) / 750
      uvs[k * 6 + 1] = (ay + 375) / 750
      uvs[k * 6 + 2] = (bx + 375) / 750
      uvs[k * 6 + 3] = (by + 375) / 750
      uvs[k * 6 + 4] = (cx + 375) / 750
      uvs[k * 6 + 5] = (cy + 375) / 750

      // flat face normals

      pA.set(ax, ay, az);
      pB.set(bx, by, bz);
      pC.set(cx, cy, cz);

      cb.subVectors(pC, pB);
      ab.subVectors(pA, pB);
      cb.cross(ab);

      cb.normalize();

      var nx = cb.x;
      var ny = cb.y;
      var nz = cb.z;

      normals[i] = nx;
      normals[i + 1] = ny;
      normals[i + 2] = nz;

      normals[i + 3] = nx;
      normals[i + 4] = ny;
      normals[i + 5] = nz;

      normals[i + 6] = nx;
      normals[i + 7] = ny;
      normals[i + 8] = nz;

      // colors
      color.setRGB(Math.random(), Math.random(), Math.random());

      colors[i] = color.r;
      colors[i + 1] = color.g;
      colors[i + 2] = color.b;

      colors[i + 3] = color.r;
      colors[i + 4] = color.g;
      colors[i + 5] = color.b;

      colors[i + 6] = color.r;
      colors[i + 7] = color.g;
      colors[i + 8] = color.b;
      k++
    }
    this.geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));
    this.geometry.addAttribute('normal', new THREE.BufferAttribute(normals, 3));
    this.geometry.addAttribute('uv', new THREE.BufferAttribute(uvs, 2));
    this.geometry.computeBoundingSphere();
  }


}

export default Geometry;
