///////////////////////////////////////////////////////////////////////
// MEMORY MANAGEMENT

let mmc = 0;
const mmSet = new Set();

function mmNew(inst){
	inst.__mmc = mmc;
	mmSet.add(inst);
}

function mmScan(){
	mmc++;
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
	return {marked,unmarked};
}

function mmMark(o){
	o.__mmc = mmc;
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
		o.dispose?.();
	mmSet.clear();
}


const reset = mmReset;
const scan = mmScan;


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
	if (pt.dispose === PROXY.disposeFn) return;

	if (pt.__dispose) {
		// we have already messed with dispose (from a base class)
		pt.__dispose = pt.dispose;
	} else if (pt.dispose) pt.__dispose = pt.dispose;

	pt.dispose = PROXY.disposeFn;
}

const PROXY = {
	stack: [[]],
	// stack of scopes; initial one is global
	scope: function (cb, usr) {
		if (usr) PROXY.stack.unshift([]); // create a new scopes array on stack

		const scope = PROXY.stack[0];
		let inst = cb(); // after the instantiate..

		if (usr) {
			//
			if (scope.length > 0) {
				console.log(inst.constructor.name + " owns " + scope.map(i => i.constructor.name).join(","));
			} // remove usr scope
			PROXY.stack.shift();
		} else {
			scope.push(inst);
		}

		mmNew(inst);

		return inst;
	},
	disposeFn: function () {
		// call the original dispose 
		console.log("dispose " + this.constructor.name);
		this.__dispose?.();
	},
	wrap: function (cls, args) {
		console.log("user create " + cls.name);
		return PROXY.scope(() => {
			return new cls(...args);
		}, true);
	},
	internal: function (info) {
		var args = Array.prototype.slice.call(arguments, 1);
		const name = info.c.name;
		console.log("internal create " + name + " in " + info.w);
		return PROXY.scope(() => {
			return new info.c(...args);
		}, false);
	},
	init: function (cls,attrs) {
		initClass(cls,attrs);
	}
};

export { PROXY }