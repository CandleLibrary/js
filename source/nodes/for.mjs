/** FOR **/

import base from "./base.mjs";
import types from "./types.mjs";
export default class for_statement extends base {

    get init() { return this.vals[0] }
    get bool() { return this.vals[1] }
    get iter() { return this.vals[2] }
    get body() { return this.vals[3] }

    getRootIds(ids, closure) {  
        if (this.init) this.init.getRootIds(ids, closure);
        if (this.bool) this.bool.getRootIds(ids, closure);
        if (this.iter) this.iter.getRootIds(ids, closure);        
        if (this.body) this.body.getRootIds(ids, new Set);
    }

    * traverseDepthFirst(p) {
        this.parent = p;
        yield this;
        if (this.init) yield* this.init.traverseDepthFirst(this);
        if (this.bool) yield* this.bool.traverseDepthFirst(this);
        if (this.iter) yield* this.iter.traverseDepthFirst(this);
        if (this.body) yield* this.body.traverseDepthFirst(this);
        yield this;
    }

    get type() { return types.for_statement }

    render() {
        let init, bool, iter, body;

        if (this.init) init = this.init.render();
        if (this.bool) bool = this.bool.render();
        if (this.iter) iter = this.iter.render();
        if (this.body) body = this.body.render();

        const init_simicolon = init[init.length-1] == ";";

        return `for(${init}${init_simicolon ? "" : ";"}${bool};${iter})${body}`;
    }
}
