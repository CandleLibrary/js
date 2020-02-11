/** EXPRESSION STATEMENT **/

import {statement} from "./base.mjs";
import types from "./types.mjs";

export default class expression_statement extends statement {

    constructor(sym = []) {
        super(sym[0]);
    }

    get expression() { return this.vals[0] }

    getRootIds(ids, closure) {
        this.expression.getRootIds(ids, closure);
    }

    replaceNode(original, _new = null) {
        if(super.replaceNode(original, _new, this.vals) < 0)
            this.replace();
    }

    get type() { return types.expression_statement }

    render() { return this.expression.render() + ";" }
}
