/** EXPRESSION_LIST **/

import base from "./base.mjs";
import types from "./types.mjs";

export default class expression_list extends base {
    constructor(sym) {

        if (sym[0].length == 1)
            return sym[0][0];

        super(sym[0]);
    }

    get expressions() { return this.vals[0] }

    getRootIds(ids, closure) {
        this.expressions.forEach(s => s.getRootIds(ids, closure));
    }

    replaceNode(original, _new = null) {
        let index = -1;
        if ((index = super.replaceNode(original, _new, this.vals[0])) < 0) {
            this.vals[0].splice(-(index+1), 1);
        }
    }

    * traverseDepthFirst(p) {
        yield * super.traverseDepthFirst(p, this.vals[0]);
    }

    get type() { return types.expression_list }

    render() { return `(${this.expressions.map(s=>s.render()).join(",")})` }
}
