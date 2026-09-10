import * as THREE from 'three';

/**
 * Creates a dynamic gradient canvas texture representing the authentic
 * ObliqueTech brand spectrum: Electric Blue (#00D2FF) -> Purple (#7C3AED) -> Magenta (#EC4899)
 */
export function createObliqueBrandGradientTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    // 45-degree linear gradient matching the oblique brand angle
    const grad = ctx.createLinearGradient(0, 512, 512, 0);
    grad.addColorStop(0.0, '#00D2FF');  // Electric Blue
    grad.addColorStop(0.25, '#0095FF'); // Cyan-Blue
    grad.addColorStop(0.55, '#7C3AED'); // Deep Purple
    grad.addColorStop(0.82, '#C026D3'); // Orchid Magenta
    grad.addColorStop(1.0, '#EC4899');  // Hot Magenta Pink

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 512);

    // Subtle satin metallic sheen line across the top edge
    const sheen = ctx.createLinearGradient(0, 0, 512, 512);
    sheen.addColorStop(0.0, 'rgba(255, 255, 255, 0.25)');
    sheen.addColorStop(0.4, 'rgba(255, 255, 255, 0.05)');
    sheen.addColorStop(1.0, 'rgba(0, 0, 0, 0.2)');
    ctx.fillStyle = sheen;
    ctx.fillRect(0, 0, 512, 512);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

/**
 * Generates the authentic 2D vector shapes corresponding to the 3 distinct
 * elements of the ObliqueTech logo mark:
 * 1. Left 'O' crescent arc
 * 2. Center 45-degree diagonal slash beam
 * 3. Right 'T' crossbar and downward loop
 */
export function createObliqueLogoShapes(): {
  shapeO: THREE.Shape;
  shapeSlash: THREE.Shape;
  shapeT: THREE.Shape;
} {
  // Scale reference: normalized ~3.0 units wide, ~2.0 units high, centered at origin
  
  // ---------------------------------------------------------------------------
  // 1. LEFT 'O' CRESCENT ARC
  // Outer ellipse curve + inner ellipse curve sliced at 45-degree oblique angle
  // ---------------------------------------------------------------------------
  const shapeO = new THREE.Shape();
  // Start at top-right oblique cut
  shapeO.moveTo(-0.16, 0.96);
  // Outer arc curving counter-clockwise around the left
  shapeO.bezierCurveTo(-0.75, 0.98, -1.55, 0.65, -1.58, -0.05);
  shapeO.bezierCurveTo(-1.60, -0.62, -1.25, -0.92, -0.96, -0.92);
  // Bottom oblique cut
  shapeO.lineTo(-0.72, -0.62);
  // Inner arc curving clockwise back to top
  shapeO.bezierCurveTo(-1.08, -0.58, -1.24, -0.38, -1.22, -0.04);
  shapeO.bezierCurveTo(-1.20, 0.44, -0.64, 0.68, -0.36, 0.68);
  // Close along top oblique cut
  shapeO.lineTo(-0.16, 0.96);

  // ---------------------------------------------------------------------------
  // 2. CENTER 45° DIAGONAL SLASH BEAM
  // Clean rectangular beam slicing from bottom-left to top-center
  // ---------------------------------------------------------------------------
  const shapeSlash = new THREE.Shape();
  // Bottom-left flat horizontal base
  shapeSlash.moveTo(-1.22, -1.02);
  shapeSlash.lineTo(-0.84, -1.02);
  // Right diagonal edge at 45 degrees
  shapeSlash.lineTo(0.48, 0.30);
  // Angled pointed tip at top
  shapeSlash.lineTo(0.48, 0.66);
  shapeSlash.lineTo(0.32, 0.66);
  // Left diagonal edge at 45 degrees
  shapeSlash.lineTo(-1.22, -0.88);
  shapeSlash.closePath();

  // ---------------------------------------------------------------------------
  // 3. RIGHT 'T' CROSSBAR & DOWNWARD LOOP
  // Top horizontal crossbar with 45° angled right cut and downward sweeping loop
  // ---------------------------------------------------------------------------
  const shapeT = new THREE.Shape();
  // Start at inner top crossbar junction
  shapeT.moveTo(0.04, 0.72);
  shapeT.lineTo(0.24, 0.98);
  // Top horizontal bar extending right
  shapeT.lineTo(1.52, 0.98);
  // Right angled cut at 45 degrees
  shapeT.lineTo(1.24, 0.70);
  // Outer contour of the downward stem / loop
  shapeT.lineTo(0.96, 0.70);
  shapeT.bezierCurveTo(0.98, 0.42, 0.96, 0.12, 0.92, -0.15);
  shapeT.bezierCurveTo(0.85, -0.65, 0.48, -0.96, -0.12, -0.96);
  // Bottom oblique cut
  shapeT.lineTo(-0.32, -0.70);
  // Inner contour of the loop curving back up
  shapeT.bezierCurveTo(0.16, -0.70, 0.52, -0.48, 0.58, -0.10);
  shapeT.bezierCurveTo(0.64, 0.18, 0.64, 0.48, 0.64, 0.70);
  shapeT.lineTo(0.04, 0.72);
  shapeT.closePath();

  return { shapeO, shapeSlash, shapeT };
}

export interface Oblique3DMarkInstance {
  group: THREE.Group;
  meshO: THREE.Mesh;
  meshSlash: THREE.Mesh;
  meshT: THREE.Mesh;
  frontMaterial: THREE.MeshPhysicalMaterial;
  sideMaterial: THREE.MeshPhysicalMaterial;
  gradientTexture: THREE.CanvasTexture;
  dispose: () => void;
}

/**
 * Constructs the complete 3D extruded and beveled ObliqueTech brand symbol
 * ready to be placed in any Three.js scene (Opening, Hero, CTA, or Detail).
 */
export function createOblique3DMark(depth = 0.22): Oblique3DMarkInstance {
  const group = new THREE.Group();
  group.name = 'Oblique3DMarkGroup';

  const gradientTexture = createObliqueBrandGradientTexture();

  // Premium Satin Metallic Front Material
  const frontMaterial = new THREE.MeshPhysicalMaterial({
    map: gradientTexture,
    metalness: 0.88,
    roughness: 0.16,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
    reflectivity: 0.9,
    emissive: new THREE.Color(0x0a1020),
    emissiveIntensity: 0.2,
  });

  // Dark Satin Metallic Bevel and Side Material
  const sideMaterial = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(0x13161c),
    metalness: 0.92,
    roughness: 0.22,
    clearcoat: 0.8,
    clearcoatRoughness: 0.15,
    reflectivity: 0.85,
    emissive: new THREE.Color(0x05070a),
  });

  // Multi-material array: [0: front/back caps, 1: extruded bevel sides]
  const materials = [frontMaterial, sideMaterial];

  const extrudeSettings: THREE.ExtrudeGeometryOptions = {
    depth,
    bevelEnabled: true,
    bevelSegments: 5,
    steps: 2,
    bevelSize: 0.035,
    bevelThickness: 0.035,
    curveSegments: 36,
  };

  const { shapeO, shapeSlash, shapeT } = createObliqueLogoShapes();

  const geoO = new THREE.ExtrudeGeometry(shapeO, extrudeSettings);
  const geoSlash = new THREE.ExtrudeGeometry(shapeSlash, extrudeSettings);
  const geoT = new THREE.ExtrudeGeometry(shapeT, extrudeSettings);

  // Center geometries along Z so rotation occurs about natural center
  geoO.center();
  geoSlash.center();
  geoT.center();

  // Fine-tuned relative positions to preserve perfect brand silhouette alignment
  const meshO = new THREE.Mesh(geoO, materials);
  meshO.position.set(-0.78, 0.02, 0);
  meshO.castShadow = true;
  meshO.receiveShadow = true;

  const meshSlash = new THREE.Mesh(geoSlash, materials);
  meshSlash.position.set(-0.35, -0.20, 0.015); // Slight depth offset for layered crispness
  meshSlash.castShadow = true;
  meshSlash.receiveShadow = true;

  const meshT = new THREE.Mesh(geoT, materials);
  meshT.position.set(0.62, 0.06, 0);
  meshT.castShadow = true;
  meshT.receiveShadow = true;

  group.add(meshO);
  group.add(meshSlash);
  group.add(meshT);

  // Center the whole group
  const box = new THREE.Box3().setFromObject(group);
  const center = box.getCenter(new THREE.Vector3());
  meshO.position.sub(center);
  meshSlash.position.sub(center);
  meshT.position.sub(center);

  const dispose = () => {
    geoO.dispose();
    geoSlash.dispose();
    geoT.dispose();
    gradientTexture.dispose();
    frontMaterial.dispose();
    sideMaterial.dispose();
  };

  return {
    group,
    meshO,
    meshSlash,
    meshT,
    frontMaterial,
    sideMaterial,
    gradientTexture,
    dispose,
  };
}
