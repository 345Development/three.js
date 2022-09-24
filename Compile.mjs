import fs, { readFileSync, writeFileSync } from "fs";
import path from "path";
import { BuildDef } from "./proxy/defs.js";

// REMINDERS:
// # to "compile" our 345 version of ThreeJS from original src
// node Compile.mjs
//
// # to build into module/minified etc
// npm run build
//
//
// npm install

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

const WriteFiles = true;
const HomePath = "C:/WORK/Projects/VergeVT/Test/345-ThreeJS/three.js/";
const SrcPath = HomePath + "src/";
const SystemFilePath = HomePath + "proxy/system.js";
const ImportFilePathRel = "src/345/system.js";
const BuildFile = SrcPath+"Three.js";
//const CreationPrefix = "proxy_";
const FileHeader = "// #PROXY1.0.0 ";
const EOL = "\r\n";

// copy the system file across
if(WriteFiles){
  const sysStr = readFileSync(SystemFilePath);
  writeFileSync(HomePath + ImportFilePathRel,sysStr);
}

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

const fileRules = {
  "BufferGeometry.js": {
    newContext: (cls, idx, loc) => {
      return loc ? null : `{c:${cls},w:'STATIC'}`;
    },
  },
  "Mesh.js":{
    newContext: (cls, idx, loc) => {
      // Mesh instatiates in constructor args... 
      // need to leave out 'this'
      return idx < 1500 ? `{c:${cls},w:'${loc}'}` : null;
    },
  },
  "InstancedMesh.js": {
    newContext: (cls, idx, loc) => {
      return loc ? null : `{c:${cls},w:'STATIC'}`;
    },
  },  
  "Line.js":{
    newContext: (cls, idx, loc) => {
      // Mesh instatiates in constructor args... 
      // need to leave out 'this'
      return idx < 800 ? `{c:${cls},w:'${loc}'}` : null;
    },
  },
  "Points.js":{
    newContext: (cls, idx, loc) => {
      // Mesh instatiates in constructor args... 
      // need to leave out 'this'
      return idx < 700 ? `{c:${cls},w:'${loc}'}` : null;
    },
  },
  "CameraHelper.js": {
    newContext: (cls, idx, loc) => {
      return loc ? null : `{c:${cls},w:'STATIC'}`;
    },
  },  
  "PMREMGenerator.js": {
    newContext: (cls, idx, loc) => {
      return loc ? null : `{c:${cls},w:'STATIC'}`;
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
  exports = new Map();    // map => filePath

// aggregate defs by file
const FileDefs = {};
for(const [name,def] of Object.entries(BuildDef)){
  const fn = def.file.toLowerCase(),
    a = FileDefs[fn] ?? {};
  def.name = name;
  a[name] = def;
  FileDefs[fn] = a;
}

// regex to match new usage and the class
const NewRegex = /[\s=]new\s+(\w+)\s*\(/gm;

walk(SrcPath, function (err, results) {
  if (err) throw err;
  //console.log("hello", results);

  results.forEach((file) => {
    if (!file.endsWith(".js")||file.indexOf("system.js")>=0) {
      console.log("IGNORE:", file);
      return;
    }

    // convert \ to / now... helps us to have this
    // format in many places
    file = file.replace(/\\/g, "/");

    //fileCount++;

    const fileRel = file.substring(SrcPath.length);
    const fileName = path.basename(fileRel);
    const fileNameOnly = path.parse(fileRel).name;
    const fileDir = path.dirname(file);

    const fileRule = fileRules[fileName] ?? {};

    const rawData = readFileSync(file);
    let str = rawData.toString();
    //console.log("file: " + file + " len: " + str.length);

    // already processed; we can redo ; must revert
    if (str.startsWith(FileHeader)) return; 

    // get the build defs for this file
    const fileDefs = FileDefs[fileRel.toLowerCase()];

    if(!fileDefs){
      console.log("No build def for "+fileRel);
      return;
    }

    const updates = [];
    let extra = "";
    
    const fileStat = {
      file: fileRel,
      classes: [],
      uses: {},
      //ignored: {},
    };
    fileStats.push(fileStat);

    ////////////////////////////////////////////////////
    ///////////// INIT & EXPORT of CLASSES /////////////

    // find classes defined in this file
    const foundClasses = findClasses(str);
    const classSet = new Set(foundClasses.map((f) => f.class));
    fileStat.classes = [...classSet];
    
    // check the class definitions we expect in this file
    for(const [,def] of Object.entries(fileDefs)){
   
      if(def.mode === "class"){
        // any class specific changes
      } else if(def.mode === "func") {
        // any function specific changes
      } else {
        console.warn("No mode for "+def.name);
      }

      extra += `PROXY.init(${def.name});` + EOL;

      if(def.export){
        // do the export replace
        // see if we can find the export statement for the class/func
        const exportInfo = FindExport(str,def.name);       
        if(exportInfo){
          let exportStr = "export function wrap_"+def.name+"(){ return PROXY.wrap("+def.name+",arguments); }" + EOL;
          updates.push({
            index:exportInfo.index,
            length:0,//exportInfo.length,
            replace:exportStr
          });

          exports.set(def.name,fileRel);
        } else if(def.export){
          console.warn("Failed to find expected export for "+def.name);
          throw "export missing";
        }      
      }
    }
   
    ////////////////////////////////////////////////////
    ////////////// WRAP NEW INSTANTIATES ///////////////

    const news = new Set();

    try {
      // find all the new instatiations of classes
      // modify them for classes we want to wrap
      let matches = str.matchAll(NewRegex);
      for(const m of matches) {
        const found = m[1],
          nn = m[0].indexOf('new'),
          index = m.index + nn,
          len = m[0].length - nn;
        if (ignore.find((i) => i === found)) {
          //fileStat.ignored[found] = true;
          continue;
        }
        fileStat.uses[found] = true;

        if (!stats[found]) stats[found] = { count: 0 };

        const stat = stats[found];
        // if (found === "this") {
        //   console.log("new this() used in file", file, classSet);
        // }

        const def = BuildDef[found];

        if (!def) {
          stat.unknown = true;
          //console.log("Unmatched: Found", found, "@", index);
          continue;
        }

        function defaultNewContext(cls,index){
          // try to 'guess' the class the new is located in
          let loc = pickClass(foundClasses, index)?.class;
          let ctxt = fileRule.newContext?.(cls, index, loc);
          if(ctxt) return ctxt;
          if(!loc) loc = fileNameOnly;
          //return `{c:${cls},t:this,w:${loc}}`;// too many this problems..
          return `{c:${cls},w:'${loc}'}`;
        }

        const ctxtCode = defaultNewContext(found,index);
        const callCode = "new PROXY.internal("+ctxtCode+",";
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

    ///////////////////////////////////////////////////////
    ////////////////// MODIFY THE FILE ////////////////////

    if (extra.length > 0 || updates.length > 0) {
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
      if(WriteFiles)
        writeFileSync(file, text);
      //}

      //throw new Error("STOP");
    }
  });

  //console.log("Output:", output);
  //console.log("Statistics:", stats);
  //console.log("Files:", fileCount);

  // set of all the three js classes we found definitions for
  //console.log("Classes:", classes);

  // stats for each file we looked at
  //console.log("Files:", fileStats);

  // NOTE: also need to add this to top of src/Three.js
  // export { PROXY } from "./345/system.js";


  //////////////////////////////////////////////////////////
  ///////////// MODIFY EXPORT/BUILD FILE ///////////////////

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
  if(WriteFiles)
    writeFileSync(BuildFile, exportAll);
});
