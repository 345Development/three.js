const PROXY = {
	CTOR: function (cls) {
		return function () {
			console.log("proxy direct class " + cls.name);
			//var args = Array.prototype.slice.call(arguments, 1);
			var inst = new cls(...arguments);
			return inst;
		};
	},
	// internal create
	Owned: function (cls, ctxt) {
		return function (owner) {
			console.log("proxy owned class"); //+cls.name+" owned by "+ctxt,owner);
			var args = Array.prototype.slice.call(arguments, 0);
			var inst = new cls(...args);
			return inst;
		};
	},
};

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
