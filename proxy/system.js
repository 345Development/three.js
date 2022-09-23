// const PROXY = {
// 	CTOR: function (cls) {
// 		return function () {
// 			console.log("proxy direct class " + cls.name);
// 			//var args = Array.prototype.slice.call(arguments, 1);
// 			var inst = new cls(...arguments);
// 			return inst;
// 		};
// 	},
// 	// internal create
// 	Owned: function (cls, ctxt) {
// 		return function (owner) {
// 			console.log("proxy owned class"); //+cls.name+" owned by "+ctxt,owner);
// 			var args = Array.prototype.slice.call(arguments, 0);
// 			var inst = new cls(...args);
// 			return inst;
// 		};
// 	},
// };

const PROXY = {
	// // called during class instantiate; we take over process
	// ctor: function(self,args){
	// 	const inst = self.__constructor.apply(self,args);
	// 	return inst;
	// },
	disposeFn: function() {
		// call the original dispose 
		this.__dispose?.();
	},

	createFn: function(cls, ctxt) {
		return function () {
			console.log("proxy create "+cls.name); //+cls.name+" owned by "+ctxt,owner);
			var args = Array.prototype.slice.call(arguments, 0);
			var inst = new cls(...args);
			return inst;
		};
	},

	wrap:function(cls, args) {
		console.log("wrapped create "+cls.name);
		let inst = new cls(...args);
		return inst;
	},

	internal:function(info){
		var args = Array.prototype.slice.call(arguments, 1);
		console.log("internal create "+info.c.name);
		let inst = new info.c(...args);
		return inst;
	},

	init: function (cls) {
		const pt = cls.prototype;

		if(pt.dispose === PROXY.disposeFn)
			return;
		if (pt.__dispose) {
			// we have already messed with dispose (from a base class)
			pt.__dispose = pt.dispose;
		} else if(pt.dispose)
				pt.__dispose = pt.dispose;
		pt.dispose = PROXY.disposeFn;
	}
}
// // temporary constructor
// const ProxyTemp = function () {};

// export function ProxyCreate(cls, ctxt, args) {
// 	//var args = Array.prototype.slice.call(arguments, 2);
// 	return function () {
// 		var inst, ret; // other vars

// 		// Give the Temp constructor the Constructor's prototype
// 		const constructr = THREE[cls];
// 		ProxyTemp.prototype = constructr.prototype;

// 		// Create a new instance
// 		inst = new ProxyTemp();

// 		// Call the original Constructor with the temp
// 		// instance as its context (i.e. its 'this' value)
// 		ret = constructr.apply(inst, args);

// 		// If an object has been returned then return it otherwise
// 		// return the original instance.
// 		// (consistent with behaviour of the new operator)
// 		return Object(ret) === ret ? ret : inst;
// 	};
// }

export { PROXY };
