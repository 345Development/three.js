///////////////////////////////////////////////////////////////////////
// MEMORY MANAGEMENT

let mmc = 0,
	mmGuard = false;
const mmSet = new Set();

function mmNew(inst) {
	inst.__mmc = mmc;
	mmSet.add(inst);
}

function* mmScan(dbg) {
	mmGuard = true; // for when we make this fn a generator
	mmc++;
	// do the static scope objects (whatever is left on stack)
	PROXY.stack.forEach((o) => mmMark(o));
	yield;
	for (const o of mmSet) {
		// look for token (without creating)
		if (o.__token?.deref()) {
			// held object
			mmMark(o);
		}
		yield;
	}
	mmGuard = false;
	if (!dbg) return;
	// no check which things were not marked
	let marked = 0,
		unmarked = 0;
	for (const o of mmSet) {
		if (o.__mmc === mmc) marked++;
		else unmarked++;
	}
	return { marked, unmarked };
}

function* mmClean() {
	if (mmGuard) return -1;
	// dispose on anything not up to latest mark
	let c = 0;
	for (const o of mmSet) {
		if (o.__mmc !== mmc) {
			o.__disposeFinal?.();
			mmSet.delete(o);
			c++;
		}
		yield;
	}
	return c;
}

function mmMark(o) {
	o.__mmc = mmc;
	o.__owned?.forEach((e) => mmMark(e));
	o.__attrs?.forEach((a) => mmMarkA(o, a));
}

function mmMarkA(o, a) {
	if (a in o) mmMarkQ(o[a]);
}

function mmMarkQ(o) {
	if (typeof o === "object") {
		// arrays must be iterated
		if (Array.isArray(o)) {
			o.forEach((e) => mmMarkQ(e));
		} else if (o && "__mmc" in o) {
			// needs to have an mmc (or def)
			mmMark(o);
		}
	}
}

function mmReset() {
	// dispose of all
	for (const o of mmSet) o.__disposeFinal?.();
	mmSet.clear();
}

/////////////// MEM DEBUG ////////////////

function mmTree() {
	// root items found from stack
	const s = [];
	PROXY.stack.forEach((o) => s.push(mmDebug(o)));

	const t = [];
	for (const o of mmSet) {
		// look for token (without creating)
		if (o.__token?.deref()) {
			// held object
			t.push(mmDebug(o));
		}
	}
	return { static: s, held: t };
}

function mmDebug(o) {
	const d = { item: o };
	if (o.__owned && o.__owned.length > 0) {
		d.owns = [];
		o.__owned?.forEach((e) => d.owns.push(mmDebug(e)));
	}
	if (o.__attrs && o.__attrs.length > 0) {
		d.attrs = {};
		o.__attrs?.forEach((a) => (d.attrs[a] = mmDebugA(o, a)));
	}
	return d;
}

function mmDebugA(o, a) {
	if (a in o) return mmDebugQ(o[a]);
}

function mmDebugQ(o) {
	if (typeof o === "object") {
		// arrays must be iterated
		if (Array.isArray(o)) {
			const d = [];
			o.forEach((e) => d.push(mmDebugQ(e)));
			return d;
		} else if (o && "__mmc" in o) {
			// needs to have an mmc (or def)
			return mmDebug(o);
		}
	}
}
//////////////////////////////////////////

const MM = {
	reset: mmReset,
	scan: mmScan,
	clean: mmClean,
	tree: mmTree,
	mmSet,
};

export { MM };

//////////////
// TOKENS

const fr = new FinalizationRegistry((res) => {
	if (PROXY.debug) console.log("finalise on", res.constructor.name);
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

function disposeIgnore() {
	//console.log("ignore user dispose " + this.constructor.name);
}

function disposeFinal() {
	if (this.dispose !== disposeIgnore) {
		// user code executed here... unsafe so try/catch
		try {
			this.dispose();
		} catch (e) {
			console.error(e);
		}
	}
	this.__disposeWas?.();
}

function initClass(cls, attrs) {
	const pt = cls.prototype; // three js classes need to have properties added for token & ref

	// // make a static property with the original class
	// Object.defineProperty(cls, "__3class", {
	// 	value: cls,
	// 	writable: false,
	// 	enumerable: true,
	// 	configurable: false,
	// });

	if (Array.isArray(attrs)) {
		// add def to prototype
		Object.defineProperty(pt, "__attrs", { value: attrs });
	}
	Object.defineProperty(pt, "token", {
		get: function () {
			return this.__token?.deref() ?? Token.create(this);
		},
		enumerable: true,
		configurable: true,
	});
	Object.defineProperty(pt, "ref", {
		get: function () {
			return this;
		},
		enumerable: true,
		configurable: true,
	});
	if (pt.dispose === disposeIgnore) return;
	if (pt.__disposeWas) {
		// we have already messed with dispose (from a base class)
		pt.__disposeWas = pt.dispose;
	} else if (pt.dispose) pt.__disposeWas = pt.dispose;

	pt.dispose = disposeIgnore;
	pt.__disposeFinal = disposeFinal;
}

const PROXY = {
	debug: false,
	stack: [],
	before(n = false) {
		const s = PROXY.stack;
		//if(n) s.splice(0);  // clear
		return { n, i: s.length };
	},
	after(b, inst) {
		// take above i off stack into owned
		const s = PROXY.stack;
		inst.__owned = [...(inst.__owned ?? []), ...s.splice(b.i)];
		if (!b.n) s.push(inst);
		mmNew(inst);
		// extensible... after construction method can be implemented
		//inst.constructor.__after?.(inst);
		return inst;
	},
	wrapF: function (cls, args) {
		const b = PROXY.before(true),
			inst = new cls(...args);
		if (PROXY.debug) console.log("user create " + cls.name);
		return PROXY.after(b, inst);
	},
	wrapC: function (cb) {
		const b = PROXY.before(true),
			inst = cb();
		if (PROXY.debug) console.log("user create " + inst.constructor.name);
		return PROXY.after(b, inst);
	},
	internal: function (info) {
		var args = Array.prototype.slice.call(arguments, 1);
		const name = info.c.name;
		const b = PROXY.before(false),
			inst = new info.c(...args);
		if (PROXY.debug) console.log("internal create " + name);
		return PROXY.after(b, inst);
	},
	init: function (cls, attrs) {
		initClass(cls, attrs);
	},
};

export { PROXY };
