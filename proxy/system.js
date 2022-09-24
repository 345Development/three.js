
	class Token {

		get ref(){
			return this.__ref;
		}
		get token(){
			return this;
		}
		constructor(inst){
			inst.__token = new WeakRef(this);
			this.__ref = inst;
		}
		static create(inst){
			if(inst.__token) throw "token already done";
			return new Token(inst);
		}
	}

	function initClass(cls){
		const pt = cls.prototype;
		// three js classes need to have properties added for token & ref
		Object.defineProperty(
			pt, 
			"token", {
				get: function() {
					return this.__token?.deref() ?? Token.create(this);
				},
				enumerable: true,
				configurable: true,
			});
		Object.defineProperty(
			pt, 
			"ref", {
				get: function() {
					return this;
				},
				enumerable: true,
				configurable: true,
			});
			
		if (pt.dispose === PROXY.disposeFn) return;

		if (pt.__dispose) {
			// we have already messed with dispose (from a base class)
			pt.__dispose = pt.dispose;
		} else if (pt.dispose) pt.__dispose = pt.dispose;
		pt.dispose = PROXY.disposeFn;			
	}

	const PROXY = {
		stack:[[]],	// stack of scopes; initial one is global
		scope: function(cb,usr){
			if(usr) PROXY.stack.unshift([]);	// create a new scopes array on stack
			const scope = PROXY.stack[0];
			let inst = cb();
			// after the instantiate..
			//const mi = mmAdd(inst,usr);
			if(usr){
				//
				if(scope.length>0){
					console.log(inst.constructor.name+" owns " + scope.map(i=>i.constructor.name).join(","));
				}
				// remove usr scope
				PROXY.stack.shift();
			} else {
				scope.push(inst);
			}
			return inst;
		},
		disposeFn: function () {
			// call the original dispose 
			console.log("dispose "+this.constructor.name);
			this.__dispose?.();
		},
		wrap: function (cls, args) {
			console.log("user create " + cls.name);
			return PROXY.scope(()=>{
				return new cls(...args)
			},true);
		},
		internal: function (info) {
			var args = Array.prototype.slice.call(arguments, 1);
      const name = info.c.name;
			console.log("internal create " + name + " in " + info.w);
			return PROXY.scope(()=>{
				return new info.c(...args);
			},false);
		},
		init: function (cls) {
			initClass(cls);
		}
	}; 

	export { PROXY };