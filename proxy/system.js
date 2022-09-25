///////////////////////////////////////////////////////////////////////
// MEMORY MANAGEMENT

let mmc = 0, mmGuard = false;
const mmSet = new Set();

function mmNew(inst){
  inst.__mmc = mmc;
  mmSet.add(inst);
}

function mmScan(){
  mmGuard = true; // for when we make this fn a generator
  mmc++;
  // do the static scope objects (whatever is left on stack)
  PROXY.stack.forEach(o=>mmMark(o));
  for(const o of mmSet){
    // look for token (without creating)
    if(o.__token?.deref()){
      // held object
      mmMark(o);
    }
  }
  // no check which things were not marked
  let marked=0, unmarked=0;
  for(const o of mmSet){
    if(o.__mmc === mmc)
      marked++;
    else
      unmarked++;
  }
  mmGuard = false;
  return {marked,unmarked};
}

function mmClean(){
  if(mmGuard) return -1;
  // dispose on anything not up to latest mark
  let c = 0;
  for(const o of mmSet){
    if(o.__mmc !== mmc) {
      o.__dispose?.();
      mmSet.delete(o);
      c++;
    }
  }  
  return c;
}

function mmMark(o){
  o.__mmc = mmc;
  o.__owned?.forEach(e=>mmMark(e));
  o.__attrs?.forEach(a=>mmMarkA(o,a))
}

function mmMarkA(o,a){
  if(a in o) mmMarkQ(o[a]);
}

function mmMarkQ(o){
  if(typeof o === 'object'){
    // arrays must be iterated
    if(Array.isArray(o)){
      o.forEach(e=>mmMarkQ(e));
    } else if(o && '__mmc' in o) {
      // needs to have an mmc (or def)
      mmMark(o);
    }
  }
}

function mmReset(){
  // dispose of all
  for(const o of mmSet)
    o.__dispose?.();
  mmSet.clear();
}

const MM = { reset:mmReset, scan:mmScan, clean:mmClean, mmSet };

export { MM };



//////////////
// TOKENS

const fr = new FinalizationRegistry(res => {
	console.log("finalise on", res.constructor.name);
	//res?.dispose?.(true);
});

class Token {
	get ref() {
		return this.__ref;
	}

	get token() {
		return this;
	}

	constructor(inst) {
		inst.__token = new WeakRef(this);
		this.__ref = inst;
		fr.register(this, inst);    
	}

	static create(inst) {
		if (inst.__token) throw "token already done";
		return new Token(inst);
	}
}

//////////////////
// PROXY & INIT

function disposeIgnore(){
  //console.log("ignore user dispose " + this.constructor.name);
}

function initClass(cls,attrs) {
	const pt = cls.prototype; // three js classes need to have properties added for token & ref

	if(Array.isArray(attrs)){
		// add def to prototype
		Object.defineProperty(pt, "__attrs", {value: attrs});
	}
	Object.defineProperty(pt, "token", {
		get: function () {
			return this.__token?.deref() ?? Token.create(this);
		},
		enumerable: true,
		configurable: true
	});
	Object.defineProperty(pt, "ref", {
		get: function () {
			return this;
		},
		enumerable: true,
		configurable: true
	});
	if (pt.dispose === disposeIgnore) return;
	if (pt.__dispose) {
		// we have already messed with dispose (from a base class)
		pt.__dispose = pt.dispose;
	} else if (pt.dispose) pt.__dispose = pt.dispose;

	pt.dispose = disposeIgnore;
}

const PROXY = {
	stack: [],
  before(n=false){
    const s=PROXY.stack;
    //if(n) s.splice(0);  // clear 
    return {n,i:s.length};
  },
  after(b,inst){
    // take above i off stack into owned
    const s=PROXY.stack;
    inst.__owned = [...(inst.__owned??[]),...(s.splice(b.i))]
    if(!b.n)
      s.push(inst); 
    mmNew(inst);
    return inst;
  },
	wrapF: function (cls, args) {
    const b=PROXY.before(true),
      inst = new cls(...args);
    console.log("user create " + cls.name);      
    return PROXY.after(b,inst);
	},
  wrapC: function (cb){
    const b=PROXY.before(true),
      inst = cb();
    console.log("user create " + inst.constructor.name);
    return PROXY.after(b,inst);    
  },
	internal: function (info) {
		var args = Array.prototype.slice.call(arguments, 1);
		const name = info.c.name;
    const b=PROXY.before(false),
      inst = new info.c(...args);
    console.log("internal create " + name);      
    return PROXY.after(b,inst);
	},
	init: function (cls,attrs) {
		initClass(cls,attrs);
	}
};

export { PROXY }