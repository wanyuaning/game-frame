(function (factory) {
    console.log('factory',this);
    
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }else{
        this.umdModule = factory();
    }
})(function (require, exports) {
    "use strict";
    console.log('exports', exports);
    
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GameElement = void 0;
    /**
     * ▇元素基类▇
     * 属性：type/children/parent/data
     * 方法：addChild/appendTo
     */
    var GameElement = /** @class */ (function () {
        function GameElement(type) {
            this.type = type;
            this.data = {};
            this.parent = null;
            this.children = [];
        }
        GameElement.prototype.addChild = function (child) {
            if (!(child instanceof GameElement)) {
                console.error(' Unknown parameter: child');
                return;
            }
            child.parent = this;
            this.children.push(child);
        };
        GameElement.prototype.appendTo = function (parent) {
            this.parent = parent;
            parent.children.push(this);
        };
        return GameElement;
    }());
    exports.GameElement = GameElement;
});
