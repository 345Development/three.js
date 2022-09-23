import fs, { readFileSync, writeFileSync } from "fs";
import path from "path";

// REMINDERS:
// node Test.mjs
// npm install
// npm run build

var count = 1000000;
var walk = function (dir, done) {
  var results = [];
  fs.readdir(dir, function (err, list) {
    if (err) return done(err);
    var i = 0;
    (function next() {
      var file = list[i++];
      if (!file || count-- <= 0) return done(null, results);
      file = path.resolve(dir, file);
      fs.stat(file, function (err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function (err, res) {
            results = results.concat(res);
            next();
          });
        } else {
          results.push(file);
          //console.log(file);
          next();
        }
      });
    })();
  });
};

const HomePath = "C:/WORK/Projects/VergeVT/Test/345-ThreeJS/three.js/";
const SrcPath = HomePath + "src/";
const SystemFilePath = HomePath + "proxy/system.js";
const ImportFilePathRel = "src/345/system.js";
const BuildFile = SrcPath+"Three.js";
//const CreationPrefix = "proxy_";
const FileHeader = "// #PROXY1.0.0 ";
const EOL = "\r\n";

// copy the system file across
const sysStr = readFileSync(SystemFilePath);
writeFileSync(HomePath + ImportFilePathRel,sysStr);

//const WrapFunc = "ProxyCreate";
//const ProxyFileHeader = FileHeader + EOL + "import { " + WrapFunc + ' } from "./system.js"'+EOL;

const ignore = [
  "Array",
  "Error",
  "Set",
  "Map",
  "WeakMap",
  "RegExp",
  "Int8Array",
  "Uint8Array",
  "Int16Array",
  "Uint16Array",
  "Int32Array",
  "Uint32Array",
  "Uint8ClampedArray",
  "Float32Array",
  "Float64Array",
  "BigInt64Array",
  "BigUint64Array",
  "TypeError",
  "ArrayBuffer",
  // ThreeJS types
  "Vector2",
  "Vector3",
  "Quaternion",
  "Matrix3",
  "Matrix4",
  "Node",
  "Float64BufferAttribute",
  "Float32BufferAttribute",
  "Float16BufferAttribute",
  "Uint32BufferAttribute",
  "Int32BufferAttribute",
  "Uint16BufferAttribute",
  "Int16BufferAttribute",
  "Uint8ClampedBufferAttribute",
  "Uint8BufferAttribute",
  "Int8BufferAttribute",
  "BufferAttribute",
];
const replace = {
  Texture: {},
  CanvasTexture: {},
  CompressedTexture: {},
  CubeTexture: {},
  Data3DTexture: {},
  DataArrayTexture: {},
  DataTexture: {},
  DepthTexture: {},
  FramebufferTexture: {},
  VideoTexture: {},
  Material: {},
  LineBasicMaterial: {},
  LineDashedMaterial: {},
  MeshBasicMaterial: {},
  MeshDepthMaterial: {},
  MeshDistanceMaterial: {},
  MeshLambertMaterial: {},
  MeshMatcapMaterial: {},
  MeshNormalMaterial: {},
  MeshPhongMaterial: {},
  MeshStandardMaterial: {},
  MeshPhysicalMaterial: {},
  MeshToonMaterial: {},
  PointsMaterial: {},
  ShadowMaterial: {},
  SpriteMaterial: {},
  ShaderMaterial: {},
  RawShaderMaterial: {},
  Object3D: {},
  Bone: {},
  Group: {},
  Mesh: {},
  Line: {},
  LineLoop: {},
  LineSegments: {},
  LOD: {},
  Points: {},
  Sprite: {},
  Skeleton: {},
  SkinnedMesh: {},
  BufferGeometry: {},
  InstancedBufferGeometry: {},
  BoxGeometry: {},
  CapsuleGeometry: {},
  CircleGeometry: {},
  ConeGeometry: {},
  CylinderGeometry: {},
  EdgesGeometry: {},
  ExtrudeGeometry: {},
  LatheGeometry: {},
  PlaneGeometry: {},
  PolyhedronGeometry: {},
  RingGeometry: {},
  ShapeGeometry: {},
  SphereGeometry: {},
  TorusGeometry: {},
  TorusKnotGeometry: {},
  TubeGeometry: {},
  WireframeGeometry: {},
  DodecahedronGeometry: {},
  IcosahedronGeometry: {},
  OctahedronGeometry: {},
  TetrahedronGeometry: {},
  Light: {},
  AmbientLight: {},
  DirectionalLight: {},
  HemisphereLight: {},
  PointLight: {},
  RectAreaLight: {},
  SpotLight: {},
  LightProbe: {},
  AmbientLightProbe: {},
  HemisphereLightProbe: {},
  // shadows here
  LightShadow: {},
  DirectionalLightShadow: {},
  PointLightShadow: {},
  SpotLightShadow: {},
  Camera: {},
  CubeCamera: {},
  OrthographicCamera: {},
  PerspectiveCamera: {},
  //"StereoCamera":{},
  Scene: {},
  WebGLRenderer: {},
  WebGL1Renderer: {},
  WebGLRenderTarget: {},
  WebGL3DRenderTarget: {},
  WebGLArrayRenderTarget: {},
  WebGLCubeRenderTarget: {},
  WebGLMultipleRenderTargets: {},
  PMREMGenerator: {},
  // helpers
  ArrowHelper: {},
  AxesHelper: {},
  Box3Helper: {},
  BoxHelper: {},
  CameraHelper: {},
  DirectionalLightHelper: {},
  GridHelper: {},
  HemisphereLightHelper: {},
  PlaneHelper: {},
  PointLightHelper: {},
  PolarGridHelper: {},
  SkeletonHelper: {},
  SpotLightHelper: {},
};
const fileRules = {
  "BufferGeometry.js": {
    missingClass: (found, index) => {
      return "STATIC";
    },
  },
  "PMREMGenerator.js": {
    missingClass: (found, index) => {
      return "STATIC";
    },
  },
  "WebGLBackground.js": {
    func: true,
    missingClass: (found, index) => {
      return "WebGLBackground";
    },
  },
  "WebGLCubeMaps.js": {
    func: true,
    missingClass: (found, index) => {
      return "WebGLCubeMaps";
    },
  },
  "WebGLCubeUVMaps.js": {
    func: true,
    missingClass: (found, index) => {
      return "WebGLCubeUVMaps";
    },
  },
  "WebGLMorphtargets.js": {
    func: true,
    missingClass: (found, index) => {
      return "WebGLMorphtargets";
    },
  },
  "WebGLShadowMap.js": {
    func: true,
    missingClass: (found, index) => {
      return "WebGLShadowMap";
    },
  },
  "WebGLUniforms.js": {
    func: true,
    missingClass: (found, index) => {
      return "WebGLUniforms";
    },
  },
  "WebGLRenderer.js": {
    func: true,
    missingClass: (found, index) => {
      return "WebGLRenderer";
    },
  },
};

// function getProxyMethod(className, context) {
//   const name = CreationPrefix + className + "_in_" + context;
//   return {
//     name: "PROXY."+name,
//     //code: `function ${name}(){return ${WrapFunc}('${className}','${context}',arguments);};\n`,
//     //code: `const ${name} = PROXY.createFn(${className},\"${context}\");` + EOL,
//     //code: `PROXY.prototype.${name} = PROXY.createFn(${className},\"${context}\");` + EOL,
//     code:''
//   };
// }

// note; files seem to encode } with 7E or 7D
const ExportRegex = /[\W\s]?export\s*\{\s*(\w+)\s*[\x7D\x7E]/g;
function FindExport(str, forName){
  let matches = str.matchAll(ExportRegex);
  for(const m of matches){
    if(m[1]===forName) {
      const os = m[0].indexOf("export");
      return {index:m.index+os,length:m[0].length-os};
    }
  }
  return null;
}

const CommentRegex = /\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm;
function BlankComments(str) {
  const wasLen = str.length;
  let updates = [];
  let matches = str.matchAll(CommentRegex);
  for(const m of matches){
    if (!m[1]) m[1] = "";

    const e = {
      index: m.index + m[1].length,
      comment: m[0].substring(m[1].length),
    };
    if (e.comment.length >= 4) updates.push(e);    
  }

  updates.forEach((u) => {
    const r = "/*" + "-".repeat(u.comment.length - 4) + "*/";
    str = str.substring(0, u.index) + r + str.substring(u.index + r.length);
  });

  if (wasLen !== str.length) throw new Error("length of str changed");

  return str;
}

const ClassRegex = /(^|\W)class\s(\w+)\W/gm;
function findClasses(str) {
  const s = []; //new Set();
  // approx comment remover (not 100% guaranteed!)
  str = BlankComments(str);

  let matches = str.matchAll(ClassRegex);
  for(const m of matches){
    const found = m[2];
    //s.add(found);
    s.push({ index: m.index + m[0].indexOf(found), class: found });
  }
  return s;
}
function pickClass(found, beforeIdx) {
  let i = found.length;
  while (i-- > 0) {
    if (found[i].index < beforeIdx) return found[i];
  }
  return null;
}

const stats = {},
  fileStats = [],
  classes = new Set(),
  output = {},
  exports = new Map();    // map => filePath
var fileCount = 0;



// regex to match new usage and the class
const NewRegex = /[\s=]new\s+(\w+)\s*\(/gm;

walk(SrcPath, function (err, results) {
  if (err) throw err;
  //console.log("hello", results);

  results.forEach((file) => {
    if (!file.endsWith(".js")) {
      console.log("IGNORE:", file);
      return;
    }

    // convert \ to / now... helps us to have this
    // format in many places
    file = file.replace(/\\/g, "/");

    fileCount++;

    const fileRel = file.substring(SrcPath.length);
    const fileName = path.basename(fileRel);
    const fileDir = path.dirname(file);

    const fileRule = fileRules[fileName] ?? {};

    const rawData = readFileSync(file);
    let str = rawData.toString();
    //console.log("file: " + file + " len: " + str.length);

    if (str.startsWith(FileHeader)) return; // already processed

    const foundClasses = findClasses(str);
    const classSet = new Set(foundClasses.map((f) => f.class));
    classSet.forEach((c) => classes.add(c));

    const fileStat = {
      file: fileRel,
      classes: [...classSet],
      uses: {},
      //ignored: {},
    };
    fileStats.push(fileStat);

    // check the class we have found..
    // proxy where needed
    const updates = [];
    let extra = "";
    foundClasses.forEach((c) => {
      const def = replace[c.class];
      if (!def) return;
      // the file containing this class def; record this for our info
      def.file = fileRel;
      def.mode = "?";

      // see if we can find the export statement for the class
      const exportInfo = FindExport(str,c.class);
      def.export = !!exportInfo;

      // find the start of class closure
      let startClass = str.indexOf("{",c.index);
      let startConstructor = -1;

      if(startClass<0){
        console.error("File:"+fileRel+" failed to find start of class "+c.class);
      } else {
        // inject our own constructor
        // find the constructor
        let startConstructor = str.indexOf("constructor",startClass);
        if(startConstructor < 0){
          console.error("File:"+fileRel+" failed to find constructor for class "+c.class);
        } else {
          let gap = startConstructor - startClass;
          //console.log("File:"+fileRel+" found constructor for class "+c.class+" in "+gap+" chars");
          if(gap > 20){
            // manually check files if this happens - make sure we dont change the wrong constructor
            // NOTE: add config per file to manage if needed
            console.error("File:"+fileRel+" found constructor for class "+c.class+" in "+gap+" chars (too far maybe)");
            startConstructor = -1;
          } else {
            def.mode = "class";   // class or function implementation

            // // build our replacement constructor
            // let constStr = "constructor() { PROXY.ctor(this,arguments); }"+EOL+"\t__";

            // updates.push({
            //   index: startConstructor,
            //   length: 0,
            //   replace: constStr,
            // });
            // // extra +=
            // //   `const ${c.class} = PROXY.ctor(orig_${c.class},"${c.class}");` + EOL;
          }
        }
      }
      
      // do the export replace
      if(exportInfo){
        let exportStr = "export function wrap_"+c.class+"(){ return PROXY.wrap("+c.class+",arguments); }" + EOL;
        // // export wrap_Class for use elsewhere in Three.js library
        // exportStr += "export { wrap_"+c.class+" }" + EOL;
        // export wrap_Class as Class for final export 
        //exportStr += "export { wrap_"+c.class+" as "+c.class+" }";

        updates.push({
          index:exportInfo.index,
          length:0,//exportInfo.length,
          replace:exportStr
        });

        exports.set(c.class,fileRel);
      }

      // TODO - also find dispose method and replace.. do that with a prototype replace is easiest
      //extra += `${c.class}.prototype.__dispose = ${c.class}.prototype.dispose;` + EOL;
      //extra += `${c.class}.prototype.dispose = PROXY.disposeFn(\"${c.class}\");` + EOL;
      extra += `PROXY.init(${c.class});` + EOL;
    });

    let m;

    const news = new Set();
      //methods = new Map();

    try {
      let matches = str.matchAll(NewRegex);
      for(const m of matches) {
        // // The result can be accessed through the `m`-variable.
        // m.forEach((match, groupIndex) => {
        //   console.log(`Found match, group ${groupIndex}: ${match}`);
        // });

        // FIX HERE.... we can match TheClass in places like this; which we dont want
        // class Blah extends TheClass { }

        const found = m[1],
          nn = m[0].indexOf('new'),
          index = m.index + nn,
          len = m[0].length - nn;
        if (ignore.find((i) => i === found)) {
          //fileStat.ignored[found] = true;
          continue;
        }
        fileStat.uses[found] = true;

        // if (found === "this") {
        //   console.log("new this() used in file", file, classSet);
        // }

        const def = replace[found];

        if (!stats[found]) stats[found] = { count: 0 };

        const stat = stats[found];

        if (!def) {
          stat.unknown = true;
          //console.log("Unmatched: Found", found, "@", index);
          continue;
        }

        // pick the context where this instantiation is happening
        let inClass = pickClass(foundClasses, index)?.class;
        if (!inClass) {
          // console.error(
          //   fileRel + " Failed to find class",
          //   index,
          //   found,
          //   foundClasses
          // );
          inClass = fileRule.missingClass?.(found, index);
          if (!inClass) {
            console.log(
              fileRel + " new " + found + " @" + index + " replace ignored"
            );
            continue;
          }
          console.log(
            fileRel + " new " + found + " @" + index + " treated as " + inClass
          );
        } 

        // // returns { name, code }
        // const method = getProxyMethod(found, inClass);
        // //const method = creationPrefix + found + "_in_" + inClass;

        // //output[method.name] = method.code;
        // methods[method.name] = method.code;
        // //extra += method.code;

        // find the bracket 
        //let os = str.indexOf("(",index);

        const callCode = "new PROXY.internal({c:"+found+",w:'"+inClass+"'},";
        news.add(found);
        //updates.push({ index, length: 0, replace: creationPrefix });
        updates.push({
          index,
          length: len,// os-index,//found.length,
          replace: callCode,// method.name,
        });

        stat.count++;
      }
    } catch (ex) {
      console.log("Exception processing " + fileRel);
      throw ex;
    }
    if (extra.length > 0 || updates.length > 0) {//} || methods.size > 0) {
      //for (const [n, code] of Object.entries(methods)) extra += code;

      // sort updates in reverse order
      updates.sort((a, b) => b.index - a.index);

      console.log("processing: " + fileRel); // updates);

      updates.forEach((u) => {
        str =
          str.substring(0, u.index) +
          u.replace +
          str.substring(u.index + u.length);
      });

      const relPath = path.relative(fileDir, HomePath + ImportFilePathRel).replace(/\\/g, "/");
      let header = "";
      header += "Classes:" + fileStat.classes.join(",");
      header += " Uses:" + [...news].join(",");
      header += EOL + EOL;
      header += 'import { PROXY } from "' + relPath + '";';
      header += EOL;

      let text = FileHeader + header + str + EOL + EOL + extra;

      //console.log("UPDATED:\n" + str);

      //if (fileCount < 30)
      //if (fileName === "WebGLRenderTarget.js") {
      writeFileSync(file, text);
      //}

      //throw new Error("STOP");
    }
  });

  // // build the proxy import file
  // let content = ProxyFileHeader;
  // for (const [n, v] of Object.entries(output)) {
  //   content += v;
  // }
  // writeFileSync(HomePath + ImportFilePathRel, content);

  //console.log("Output:", output);
  //console.log("Statistics:", stats);
  //console.log("Files:", fileCount);

  // set of all the three js classes we found definitions for
  //console.log("Classes:", classes);

  // stats for each file we looked at
  //console.log("Files:", fileStats);

  // NOTE: also need to add this to top of src/Three.js
  // export { PROXY } from "./345/system.js";

  writeFileSync("./classinfo.json", JSON.stringify(replace,null,"\t"));

  

  // do the exports file
  let str = readFileSync(BuildFile).toString();

  // add our header 
  let exportHeader = FileHeader + EOL;
  exportHeader += "export { PROXY } from \"./345/system.js\";"+EOL+EOL;

  // search the exports for those matching ones
  // we will override... change them
  let exportFooter = EOL + FileHeader + " OVERRIDES" + EOL;
  const updates = [];
  exports.forEach((path,n)=>{
    const exp = FindExport(str, n);
    if(exp){
      updates.push({
        index:exp.index,
        length:exp.length,
        replace:"export { wrap_"+n+" as "+n+" }"
      });
    } else {
      exportFooter += "export { wrap_" + n + " as " + n + " } from \"./"+path+"\";" + EOL;
    }
  });

  // sort updates in reverse order
  updates.sort((a, b) => b.index - a.index);
  updates.forEach((u) => {
    str =
      str.substring(0, u.index) +
      u.replace +
      str.substring(u.index + u.length);
  });  

  let exportAll = exportHeader + str + exportFooter;

  // save the exports file
  writeFileSync(BuildFile, exportAll);
});
