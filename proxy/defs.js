
// Note: dispose:true only when class has its own local dispose (ignore base class)


// TODOs
// more in core, extras, animation

export const BuildDef = {
  ////////////////////////// TEXTURES //////////////////////////
	"Texture": {
		file: "textures/Texture.js",
		mode: "class",
    extends: "EventDispatcher",
		export: true,
    dispose: true,
    attrs:[]
	},
	"CanvasTexture": {
		file: "textures/CanvasTexture.js",
		mode: "class",
    extends: "Texture",
		export: true,
    dispose: false,
    attrs:[]
	},
	"CompressedTexture": {
		file: "textures/CompressedTexture.js",
		mode: "class",
    extends: "Texture",
		export: true,
    dispose: false,
    attrs:[]
	},
	"CubeTexture": {
		file: "textures/CubeTexture.js",
		mode: "class",
    extends: "Texture",
		export: true,
    dispose: false,
    attrs:[]
	},
	"Data3DTexture": {
		file: "textures/Data3DTexture.js",
		mode: "class",
    extends: "Texture",
		export: true,
    dispose: false,
    attrs:[]
	},
	"DataArrayTexture": {
		file: "textures/DataArrayTexture.js",
		mode: "class",
    extends: "Texture",
		export: true,
    dispose: false,
    attrs:[]
	},
	"DataTexture": {
		file: "textures/DataTexture.js",
		mode: "class",
    extends: "Texture",
		export: true,
    dispose: false,
    attrs:[]
	},
	"DepthTexture": {
		file: "textures/DepthTexture.js",
		mode: "class",
    extends: "Texture",
		export: true,
    dispose: false,
    attrs:[]
	},
	"FramebufferTexture": {
		file: "textures/FramebufferTexture.js",
		mode: "class",
    extends: "Texture",
		export: true,
    dispose: false,
    attrs:[]
	},
	"VideoTexture": {
		file: "textures/VideoTexture.js",
		mode: "class",
    extends: "Texture",
		export: true,
    dispose: false,
    attrs:[]
	},
  ////////////////////////// MATERIALS //////////////////////////
	"Material": {
		file: "materials/Material.js",
		mode: "class",
    extends: "EventDispatcher",
		export: true,
    dispose: true,
    attrs:[]
	},
	"LineBasicMaterial": {
		file: "materials/LineBasicMaterial.js",
		mode: "class",
    extends: "Material",
		export: true,
    dispose: false,
    attrs:[]
	},
	"LineDashedMaterial": {
		file: "materials/LineDashedMaterial.js",
		mode: "class",
    extends: "LineBasicMaterial",
		export: true,
    dispose: false,
    attrs:[]
	},
	"MeshBasicMaterial": {
		file: "materials/MeshBasicMaterial.js",
		mode: "class",
    extends: "Material",
		export: true,
    dispose: false,
    attrs:[
      "map",
      "lightMap",
      "aoMap",
      "specularMap",
      "alphaMap",
      "envMap",
    ]
	},
	"MeshDepthMaterial": {
		file: "materials/MeshDepthMaterial.js",
		mode: "class",
    extends: "Material",
		export: true,
    dispose: false,
    attrs:[
      "map",
      "alphaMap",
      "displacementMap",
    ]
	},
	"MeshDistanceMaterial": {
		file: "materials/MeshDistanceMaterial.js",
		mode: "class",
    extends: "Material",
		export: true,
    dispose: false,
    attrs:[
      "map",
      "alphaMap",
      "displacementMap",
    ]
	},
	"MeshLambertMaterial": {
		file: "materials/MeshLambertMaterial.js",
		mode: "class",
    extends: "Material",
		export: true,
    dispose: false,
    attrs: [
      "map",
      "lightMap",
      "aoMap",
      "emissiveMap",
      "bumpMap",
      "normalMap",
      "displacementMap",
      "specularMap",
      "alphaMap",
      "envMap",
    ]
	},
	"MeshMatcapMaterial": {
		file: "materials/MeshMatcapMaterial.js",
		mode: "class",
    extends: "Material",
		export: true,
    dispose: false,
    attrs:[
      "map",
      "bumpMap",
      "normalMap",
      "displacementMap",
      "alphaMap",
    ]
	},
	"MeshNormalMaterial": {
		file: "materials/MeshNormalMaterial.js",
		mode: "class",
    extends: "Material",
		export: true,
    dispose: false,
    attrs:[
      "bumpMap",
      "normalMap",
      "displacementMap",
    ]
	},
	"MeshPhongMaterial": {
		file: "materials/MeshPhongMaterial.js",
		mode: "class",
    extends: "Material",
		export: true,
    dispose: false,
    attrs:[
      "map",
      "lightMap",
      "aoMap",
      "emissiveMap",
      "bumpMap",
      "normalMap",
      "displacementMap",
      "specularMap",
      "alphaMap",
      "envMap",
    ]
	},
	"MeshStandardMaterial": {
		file: "materials/MeshStandardMaterial.js",
		mode: "class",
    extends: "Material",
		export: true,
    dispose: false,
    attrs:[
      "map",
      "lightMap",
      "aoMap",
      "emissiveMap",
      "bumpMap",
      "normalMap",
      "displacementMap",
      "roughnessMap",
      "metalnessMap",
      "alphaMap",
      "envMap",
    ]
	},
	"MeshPhysicalMaterial": {
		file: "materials/MeshPhysicalMaterial.js",
		mode: "class",
    extends: "MeshStandardMaterial",
		export: true,
    dispose: false,
    attrs:[
      "clearcoatMap",
      "clearcoatRoughnessMap",
      "clearcoatNormalMap",
      "iridescenceMap",
      "iridescenceThicknessMap",
      "sheenColorMap",
      "sheenRoughnessMap",
      "transmissionMap",
      "thicknessMap",
      "specularIntensityMap",
      "specularColorMap",
    ]
	},
	"MeshToonMaterial": {
		file: "materials/MeshToonMaterial.js",
		mode: "class",
    extends: "Material",
		export: true,
    dispose: false,
    attrs:[
      "map",
      "gradientMap",
      "lightMap",
      "lightMapIntensity",
      "aoMap",
      "aoMapIntensity",
      "emissiveMap",
      "bumpMap",
      "normalMap",
      "displacementMap",
      "alphaMap",
    ]
	},
	"PointsMaterial": {
		file: "materials/PointsMaterial.js",
		mode: "class",
    extends: "Material",
		export: true,
    dispose: false,
    attrs:[
      "map",
      "alphaMap",
    ]
	},
	"ShadowMaterial": {
		file: "materials/ShadowMaterial.js",
		mode: "class",
    extends: "Material",
		export: true,
    dispose: false,
    attrs:[]
	},
	"SpriteMaterial": {
		file: "materials/SpriteMaterial.js",
		mode: "class",
    extends: "Material",
		export: true,
    dispose: false,
    attrs:[
      "map",
      "alphaMap",
    ]
	},
	"ShaderMaterial": {
		file: "materials/ShaderMaterial.js",
		mode: "class",
    extends: "Material",
		export: true,
    dispose: false,
    attrs:[]  // ? vertexShader, fragmentShader, uniforms, uniformsGroups
	},
	"RawShaderMaterial": {
		file: "materials/RawShaderMaterial.js",
		mode: "class",
    extends: "ShaderMaterial",
		export: true,
    dispose: false,
    attrs:[]
	},
  ////////////////////////// OBJECTS //////////////////////////
	"Object3D": {
		file: "core/Object3D.js",
		mode: "class",
    extends: "EventDispatcher",
		export: true,
    dispose: false,
    attrs:["children"]  // ? "parent"
	},
	"Bone": {
		file: "objects/Bone.js",
		mode: "class",
    extends: "Object3D",
		export: true,
    dispose: false,
    attrs:[]
	},
	"Group": {
		file: "objects/Group.js",
		mode: "class",
    extends: "Object3D",
		export: true,
    dispose: false,
    attrs:[]
	},
	"Mesh": {
		file: "objects/Mesh.js",
		mode: "class",
    extends: "Object3D",
		export: true,
    dispose: false,
    attrs:["geometry", "material"]
	},
  "InstancedMesh": {
		file: "objects/InstancedMesh.js",
		mode: "class",
    extends: "Mesh",
		export: true,
    dispose: true,
    attrs:[]
	},
	"Line": {
		file: "objects/Line.js",
		mode: "class",
    extends: "Object3D",
		export: true,
    dispose: false,
    attrs:["geometry", "material"]
	},
	"LineLoop": {
		file: "objects/LineLoop.js",
		mode: "class",
    extends: "Line",
		export: true,
    dispose: false,
    attrs:[]
	},
	"LineSegments": {
		file: "objects/LineSegments.js",
		mode: "class",
    extends: "Line",
		export: true,
    dispose: false,
    attrs:[]
	},
	"LOD": {
		file: "objects/LOD.js",
		mode: "class",
    extends: "Object3D",
		export: true,
    dispose: false,
    attrs:["levels"]
	},
	"Points": {
		file: "objects/Points.js",
		mode: "class",
    extends: "Object3D",
		export: true,
    dispose: false,
    attrs:["geometry", "material"]
	},
	"Sprite": {
		file: "objects/Sprite.js",
		mode: "class",
    extends: "Object3D",
		export: true,
    dispose: false,
    attrs:["geometry", "material"]
	},
	"Skeleton": {
		file: "objects/Skeleton.js",
		mode: "class",
    extends: undefined,
		export: true,
    dispose: true,
    attrs:["boneTexture"]
	},
	"SkinnedMesh": {
		file: "objects/SkinnedMesh.js",
		mode: "class",
    extends: "Mesh",
		export: true,
    dispose: false,
    attrs:[]
	},
  ////////////////////////// GEOMETRY //////////////////////////
	"BufferGeometry": {
		file: "core/BufferGeometry.js",
		mode: "class",
    extends: "EventDispatcher",
		export: true,
    dispose: true,
    attrs:[]
	},
	"InstancedBufferGeometry": {
		file: "core/InstancedBufferGeometry.js",
		mode: "class",
    extends:"BufferGeometry",
		export: true,
    dispose: false,
    attrs:[]
	},
	"BoxGeometry": {
		file: "geometries/BoxGeometry.js",
		mode: "class",
    extends:"BufferGeometry",
		export: true,
    dispose: false,
    attrs:[]
	},
	"CapsuleGeometry": {
		file: "geometries/CapsuleGeometry.js",
		mode: "class",
    extends:"LatheGeometry",
		export: true,
    dispose: false,
    attrs:[]
	},
	"CircleGeometry": {
		file: "geometries/CircleGeometry.js",
		mode: "class",
    extends:"BufferGeometry",
		export: true,
    dispose: false,
    attrs:[]
	},
	"ConeGeometry": {
		file: "geometries/ConeGeometry.js",
		mode: "class",
    extends:"CylinderGeometry",
		export: true,
    dispose: false,
    attrs:[]
	},
	"CylinderGeometry": {
		file: "geometries/CylinderGeometry.js",
		mode: "class",
    extends:"BufferGeometry",
		export: true,
    dispose: false,
    attrs:[]
	},
	"EdgesGeometry": {
		file: "geometries/EdgesGeometry.js",
		mode: "class",
    extends:"BufferGeometry",
		export: true,
    dispose: false,
    attrs:[]
	},
	"ExtrudeGeometry": {
		file: "geometries/ExtrudeGeometry.js",
		mode: "class",
    extends:"BufferGeometry",
		export: true,
    dispose: false,
    attrs:[]
	},
	"LatheGeometry": {
		file: "geometries/LatheGeometry.js",
		mode: "class",
    extends:"BufferGeometry",
		export: true,
    dispose: false,
    attrs:[]
	},
	"PlaneGeometry": {
		file: "geometries/PlaneGeometry.js",
		mode: "class",
    extends:"BufferGeometry",
		export: true,
    dispose: false,
    attrs:[]
	},
	"PolyhedronGeometry": {
		file: "geometries/PolyhedronGeometry.js",
		mode: "class",
    extends:"BufferGeometry",
		export: true,
    dispose: false,
    attrs:[]
	},
	"RingGeometry": {
		file: "geometries/RingGeometry.js",
		mode: "class",
    extends:"BufferGeometry",
		export: true,
    dispose: false,
    attrs:[]
	},
	"ShapeGeometry": {
		file: "geometries/ShapeGeometry.js",
		mode: "class",
    extends:"BufferGeometry",
		export: true,
    dispose: false,
    attrs:[]
	},
	"SphereGeometry": {
		file: "geometries/SphereGeometry.js",
		mode: "class",
    extends:"BufferGeometry",
		export: true,
    dispose: false,
    attrs:[]
	},
	"TorusGeometry": {
		file: "geometries/TorusGeometry.js",
		mode: "class",
    extends:"BufferGeometry",
		export: true,
    dispose: false,
    attrs:[]
	},
	"TorusKnotGeometry": {
		file: "geometries/TorusKnotGeometry.js",
		mode: "class",
    extends:"BufferGeometry",
		export: true,
    dispose: false,
    attrs:[]
	},
	"TubeGeometry": {
		file: "geometries/TubeGeometry.js",
		mode: "class",
    extends:"BufferGeometry",
		export: true,
    dispose: false,
    attrs:[]
	},
	"WireframeGeometry": {
		file: "geometries/WireframeGeometry.js",
		mode: "class",
    extends:"BufferGeometry",
		export: true,
    dispose: false,
    attrs:[]
	},
	"DodecahedronGeometry": {
		file: "geometries/DodecahedronGeometry.js",
		mode: "class",
    extends: "PolyhedronGeometry",
		export: true,
    dispose: false,
    attrs:[]
	},
	"IcosahedronGeometry": {
		file: "geometries/IcosahedronGeometry.js",
		mode: "class",
    extends: "PolyhedronGeometry",
		export: true,
    dispose: false,
    attrs:[]
	},
	"OctahedronGeometry": {
		file: "geometries/OctahedronGeometry.js",
		mode: "class",
    extends: "PolyhedronGeometry",
		export: true,
    dispose: false,
    attrs:[]
	},
	"TetrahedronGeometry": {
		file: "geometries/TetrahedronGeometry.js",
		mode: "class",
    extends: "PolyhedronGeometry",
		export: true,
    dispose: false,
    attrs:[]
	},
  ////////////////////////// LIGHTS //////////////////////////
	"Light": {
		file: "lights/Light.js",
		mode: "class",
    extends: "Object3D",
		export: true,
    dispose: true,
    attrs:[]
	},
	"AmbientLight": {
		file: "lights/AmbientLight.js",
		mode: "class",
    extends: "Light",
		export: true,
    dispose: false,
    attrs:[]
	},
	"DirectionalLight": {
		file: "lights/DirectionalLight.js",
		mode: "class",
    extends: "Light",
		export: true,
    dispose: true,
    attrs:["target","shadow"]
	},
	"HemisphereLight": {
		file: "lights/HemisphereLight.js",
		mode: "class",
    extends: "Light",
		export: true,
    dispose: false,
    attrs:[]
	},
	"PointLight": {
		file: "lights/PointLight.js",
		mode: "class",
    extends: "Light",
		export: true,
    dispose: true,
    attrs:["shadow"]
	},
	"RectAreaLight": {
		file: "lights/RectAreaLight.js",
		mode: "class",
    extends: "Light",
		export: true,
    dispose: false,
    attrs:[]
	},
	"SpotLight": {
		file: "lights/SpotLight.js",
		mode: "class",
    extends: "Light",
		export: true,
    dispose: true,
    attrs:["target","map","shadow"]
	},
	"LightProbe": {
		file: "lights/LightProbe.js",
		mode: "class",
    extends: "Light",
		export: true,
    dispose: false,
    attrs:[]
	},
	"AmbientLightProbe": {
		file: "lights/AmbientLightProbe.js",
		mode: "class",
    extends: "LightProbe",
		export: true,
    dispose: false,
    attrs:[]
	},
	"HemisphereLightProbe": {
		file: "lights/HemisphereLightProbe.js",
		mode: "class",
    extends: "LightProbe",
		export: true,
    dispose: false,
    attrs:[]
	},
	"LightShadow": {
		file: "lights/LightShadow.js",
		mode: "class",
    extends: undefined,
		export: true,
    dispose: true,
    attrs:["camera","map","mapPass"]
	},
	"DirectionalLightShadow": {
		file: "lights/DirectionalLightShadow.js",
		mode: "class",
    extends: "LightShadow",
		export: true,
    dispose: false,
    attrs:[]
	},
	"PointLightShadow": {
		file: "lights/PointLightShadow.js",
		mode: "class",
    extends: "LightShadow",
		export: true,
    dispose: false,
    attrs:[]
	},
	"SpotLightShadow": {
		file: "lights/SpotLightShadow.js",
		mode: "class",
    extends: "LightShadow",
		export: true,
    dispose: false,
    attrs:[]
	},
  ////////////////////////// CAMERAS //////////////////////////
	"Camera": {
		file: "cameras/Camera.js",
		mode: "class",
    extends: "Object3D",
		export: true,
    dispose: false,
    attrs:[]    
	},
	"CubeCamera": {
		file: "cameras/CubeCamera.js",
		mode: "class",
    extends: "Object3D",
		export: true,
    dispose: false,
    attrs:["renderTarget"]
	},
	"OrthographicCamera": {
		file: "cameras/OrthographicCamera.js",
		mode: "class",
    extends: "Camera",
		export: true,
    dispose: false,
    attrs:[]
	},
	"PerspectiveCamera": {
		file: "cameras/PerspectiveCamera.js",
		mode: "class",
    extends: "Camera",
		export: true,
    dispose: false,
    attrs:[]
	},
	"ArrayCamera": {
		file: "cameras/ArrayCamera.js",
		mode: "class",
    extends: "PerspectiveCamera",
		export: true,
    dispose: false,
    attrs:["cameras"]
	},  
	"StereoCamera": {
		file: "cameras/StereoCamera.js",
		mode: "class",
    extends: undefined,
		export: true,
    dispose: false,
    attrs:["cameraL","cameraR"]
	},
  ////////////////////////// SCENES //////////////////////////
	"Scene": {
		file: "scenes/Scene.js",
		mode: "class",
    extends:"Object3D",
		export: true,
    dispose: false,
    attrs:[
      "background",
      "environment",
      "overrideMaterial",
    ]
	},
  ////////////////////////// RENDERERS //////////////////////////
  // TODO... more webgl etc
  // internal class; creates many internal objects
  // need to find a way to bind to the parent
	"WebGLRenderer": {
    file: "renderers/WebGLRenderer.js",
    mode: "func",
    extends: undefined,
    export: true,
    dispose: true,
    // attrs: ??
  },
	"WebGL1Renderer": {
		file: "renderers/WebGL1Renderer.js",
		mode: "class",  // but extends WebGLRenderer which is a func
    extends:"WebGLRenderer",
		export: true,
    dispose: false,
    // attrs: ??
	},
	"WebGLRenderTarget": {
		file: "renderers/WebGLRenderTarget.js",
		mode: "class",
    extends:"EventDispatcher",
		export: true,
    dispose: true,
    attrs:["texture"]
	},
	"WebGL3DRenderTarget": {
		file: "renderers/WebGL3DRenderTarget.js",
		mode: "class",
    extends:"WebGLRenderTarget",
		export: true,
    dispose: false,
    attrs:[]
	},
	"WebGLArrayRenderTarget": {
		file: "renderers/WebGLArrayRenderTarget.js",
		mode: "class",
    extends:"WebGLRenderTarget",
		export: true,
    dispose: false,
    attrs:[]    
	},
	"WebGLCubeRenderTarget": {
		file: "renderers/WebGLCubeRenderTarget.js",
		mode: "class",
    extends:"WebGLRenderTarget",
		export: true,
    dispose: false,
    attrs:[]    
	},
	"WebGLMultipleRenderTargets": {
		file: "renderers/WebGLMultipleRenderTargets.js",
		mode: "class",
    extends:"WebGLRenderTarget",
		export: true,
    dispose: false,
	},
	"WebXRManager": {
		file: "renderers/webxr/WebXRManager.js",
		mode: "class",
    extends:"EventDispatcher",
		export: true,
    dispose: true,
    attrs:[]  // ???? todo..
	},  
  //////////////////// OTHERS //////////////////////////
	"UniformsGroup": {
		file: "core/UniformsGroup.js",
		mode: "class",
    extends:"EventDispatcher",
		export: true,
    dispose: true,
    attrs:[]
	},
  //////////////////// EXTRAS //////////////////////////
  // intended to be used as a static ?? todo handle better
	"PMREMGenerator": {
		file: "extras/PMREMGenerator.js",
		mode: "class",
		export: true,
    dispose: true,
    attrs:["_renderer","_pingPongRenderTarget","_lodPlanes","_blurMaterial","_cubemapMaterial","_equirectMaterial"]
	},
  //////////////////// HELPERS //////////////////////////
	"ArrowHelper": {
		file: "helpers/ArrowHelper.js",
		mode: "class",
    "extends":"Object3D",
		export: true,
    dispose: false,       
    attrs:["line","cone"]
	},
	"AxesHelper": {
		file: "helpers/AxesHelper.js",
		mode: "class",
    "extends":"LineSegments",
		export: true,
    dispose: true,
    attrs:[],
	},
	"Box3Helper": {
		file: "helpers/Box3Helper.js",
		mode: "class",
    "extends":"LineSegments",
		export: true,
    dispose: false,
    attrs:["box"]
	},
	"BoxHelper": {
		file: "helpers/BoxHelper.js",
		mode: "class",
    "extends":"LineSegments",
		export: true,
    dispose: false,
    attrs:["object"]    
	},
	"CameraHelper": {
		file: "helpers/CameraHelper.js",
		mode: "class",
    "extends":"LineSegments",
		export: true,
    dispose: true,
    attrs:["camera"]    
	},
	"DirectionalLightHelper": {
		file: "helpers/DirectionalLightHelper.js",
		mode: "class",
    "extends":"Object3D",
    export: true,
    dispose: false,
    attrs:["light","lightPlane","targetLine"] 
	},
	"GridHelper": {
		file: "helpers/GridHelper.js",
		mode: "class",
    "extends":"LineSegments",
    export: true,
    dispose: false,
    attrs:[]
	},
	"HemisphereLightHelper": {
		file: "helpers/HemisphereLightHelper.js",
		mode: "class",
    "extends":"Object3D",
    export: true,
    dispose: true,
    attrs:["light"]
	},
	"PlaneHelper": {
		file: "helpers/PlaneHelper.js",
		mode: "class",
    "extends":"Line",
    export: true,
    dispose: false,
    attrs:[]
	},
	"PointLightHelper": {
		file: "helpers/PointLightHelper.js",
		mode: "class",
    "extends":"Mesh",
		export: true,
    dispose:true,
    attr:["light"]
	},
	"PolarGridHelper": {
		file: "helpers/PolarGridHelper.js",
		mode: "class",
		export: true,
    dispose: false,
    attrs:[]
	},
	"SkeletonHelper": {
		file: "helpers/SkeletonHelper.js",
		mode: "class",
		export: true,
    dispose: false,
    attrs:["root"]
	},
	"SpotLightHelper": {
		file: "helpers/SpotLightHelper.js",
		mode: "class",
		export: true,
    dispose:true,
    attr:["light"]
	},
  // //////////////////// ANIMATIONS //////////////////////////
	// "AnimationMixer": {
	// 	file: "animation/AnimationMixer.js",
	// 	mode: "class",
  //   extends:"EventDispatcher",
	// 	export: true,
  //   dispose: false,
  //   attrs:[]
	// },  
}