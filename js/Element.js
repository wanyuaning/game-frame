var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
/**
 * ▇场景元素▇
 * 属性：type/children/name
 * 方法：addChild
 *       update/in/out
 */
var Scene = /** @class */ (function (_super) {
    __extends(Scene, _super);
    function Scene(name) {
        var _this = _super.call(this, 'SCENE') || this;
        delete _this.parent;
        delete _this.data;
        delete _this.appendTo;
        _this.name = name;
        return _this;
    }
    Scene.prototype["in"] = function () { };
    Scene.prototype.out = function () { };
    Scene.prototype.update = function () {
        this.children.forEach(function (e) {
        });
    };
    return Scene;
}(GameElement));
/**
 * ▇精灵元素▇
 * 属性：type/children/parent/data
 * 方法：addChild/appendTo
 *      translate/translateTo/rotate/rotateTo/scale/scaleTo/update
 */
var Sprite = /** @class */ (function (_super) {
    __extends(Sprite, _super);
    function Sprite(x, y, width, height, options, transform, config) {
        var _this = _super.call(this, 'Sprite') || this;
        transform = Object.assign({ x: x, y: y, translateX: 0, translateY: 0, scaleX: 1, scaleY: 1, rotate: 0, alpha: 1, origin: 1 }, transform || {});
        console.log('transform', transform);
        _this.data = { x: x, y: y, width: width, height: height, options: options, transform: transform, config: config };
        //this.data.children = this.children
        _this.TRANSFORM = {
            transform: transform,
            _transform: JSON.parse(JSON.stringify(transform)),
            tween: JSON.parse(JSON.stringify(transform)),
            timerX: 0,
            timerY: 0,
            timerR: 0,
            timerSX: 0,
            timerSY: 0,
            timerA: 0
        };
        return _this;
    }
    Sprite.prototype.translate = function (x, y) {
        var T = this.TRANSFORM, transform = T.transform, _transform = T._transform, tween = T.tween;
        if (x) {
            tween.translateX += x;
            T.timerX = new Date().getTime();
            _transform.translateX = transform.translateX;
        }
        if (y) {
            tween.translateY += y;
            T.timerY = new Date().getTime();
            _transform.translateY = transform.translateY;
        }
    };
    Sprite.prototype.translateX = function (x) { var T = this.TRANSFORM, transform = T.transform, _transform = T._transform, tween = T.tween; if (x) {
        tween.translateX += x;
        T.timerX = new Date().getTime();
        _transform.translateX = transform.translateX;
    } };
    Sprite.prototype.translateY = function (y) { var T = this.TRANSFORM, transform = T.transform, _transform = T._transform, tween = T.tween; if (y) {
        tween.translateY += y;
        T.timerY = new Date().getTime();
        _transform.translateY = transform.translateY;
    } };
    Sprite.prototype.translateTo = function (x, y) { var _a = this.TRANSFORM, transform = _a.transform, _transform = _a._transform, tween = _a.tween; x && (_transform.translateX = transform.translateX = tween.translateX = x); y && (_transform.translateY = transform.translateY = tween.translateY = y); };
    Sprite.prototype.scale = function (x, y) {
        var T = this.TRANSFORM, transform = T.transform, _transform = T._transform, tween = T.tween;
        console.log(transform.scaleX, transform.scaleX, tween.scaleX);
        if (x) {
            tween.scaleX += x;
            T.timerSX = new Date().getTime();
            _transform.scaleX = transform.scaleX;
        }
        if (y) {
            tween.scaleY += y;
            T.timerSY = new Date().getTime();
            _transform.scaleY = transform.scaleY;
        }
        console.log(transform.scaleX, transform.scaleX, tween.scaleX);
    };
    Sprite.prototype.scaleX = function (x) { var T = this.TRANSFORM, transform = T.transform, _transform = T._transform, tween = T.tween; if (x) {
        tween.scaleX += x;
        T.timerSX = new Date().getTime();
        _transform.scaleX = transform.scaleX;
    } };
    Sprite.prototype.scaleY = function (y) { var T = this.TRANSFORM, transform = T.transform, _transform = T._transform, tween = T.tween; if (y) {
        tween.scaleY += y;
        T.timerSY = new Date().getTime();
        _transform.scaleY = transform.scaleY;
    } };
    Sprite.prototype.scaleTo = function (x, y) { var _a = this.TRANSFORM, transform = _a.transform, _transform = _a._transform, tween = _a.tween; x && (_transform.scaleX = transform.scaleX = tween.scaleX = x); y && (_transform.scaleY = transform.scaleY = tween.scaleY = y); };
    Sprite.prototype.alpha = function (a) { var T = this.TRANSFORM, transform = T.transform, _transform = T._transform, tween = T.tween, timerA = T.timerA; tween.alpha += a; T.timerA = new Date().getTime(); _transform.alpha = transform.alpha; };
    Sprite.prototype.rotate = function (deg) { var T = this.TRANSFORM, transform = T.transform, _transform = T._transform, tween = T.tween, timerR = T.timerR; tween.rotate += deg; T.timerR = new Date().getTime(); _transform.rotate = transform.rotate; };
    Sprite.prototype.rotateTo = function (deg) { var _a = this.TRANSFORM, transform = _a.transform, _transform = _a._transform, tween = _a.tween; deg && (_transform.rotate = transform.rotate = tween.rotate = deg); };
    Sprite.prototype.update = function () {
        var T = this.TRANSFORM, transform = T.transform, _transform = T._transform, tween = T.tween, timerX = T.timerX, timerY = T.timerY, timerR = T.timerR, timerSX = T.timerSX, timerSY = T.timerSY, timerA = T.timerA, now = new Date().getTime();
        // 缩放
        if (transform.scaleX < tween.scaleX) {
            transform.scaleX = tweens.runDefault(now - timerSX, _transform.scaleX, tween.scaleX, 2000);
            transform.scaleX > tween.scaleX && (_transform.scaleX = transform.scaleX = tween.scaleX);
        }
        if (transform.scaleX > tween.scaleX) {
            transform.scaleX = tweens.runDefault(now - timerSX, _transform.scaleX, tween.scaleX, 2000);
            transform.scaleX < tween.scaleX && (_transform.scaleX = transform.scaleX = tween.scaleX);
        }
        if (transform.scaleY < tween.scaleY) {
            transform.scaleY = tweens.runDefault(now - timerSY, _transform.scaleY, tween.scaleY, 2000);
            transform.scaleY > tween.scaleY && (_transform.scaleY = transform.scaleY = tween.scaleY);
        }
        if (transform.scaleY > tween.scaleY) {
            transform.scaleY = tweens.runDefault(now - timerSY, _transform.scaleY, tween.scaleY, 2000);
            transform.scaleY < tween.scaleY && (_transform.scaleY = transform.scaleY = tween.scaleY);
        }
        // 位移
        if (transform.translateX < tween.translateX) {
            transform.translateX = tweens.runDefault(now - timerX, _transform.translateX, tween.translateX, 2000);
            transform.translateX > tween.translateX && (_transform.translateX = transform.translateX = tween.translateX);
        }
        if (transform.translateX > tween.translateX) {
            transform.translateX = tweens.runDefault(now - timerX, _transform.translateX, tween.translateX, 2000);
            transform.translateX < tween.translateX && (_transform.translateX = transform.translateX = tween.translateX);
        }
        if (transform.translateY < tween.translateY) {
            transform.translateY = tweens.runDefault(now - timerY, _transform.translateY, tween.translateY, 2000);
            transform.translateY > tween.translateY && (_transform.translateY = transform.translateY = tween.translateY);
        }
        if (transform.translateY > tween.translateY) {
            transform.translateY = tweens.runDefault(now - timerY, _transform.translateY, tween.translateY, 2000);
            transform.translateY < tween.translateY && (_transform.translateY = transform.translateY = tween.translateY);
        }
        // 旋转
        if (transform.rotate < tween.rotate) {
            transform.rotate = tweens.runDefault(now - timerR, _transform.rotate, tween.rotate, 2000);
            transform.rotate > tween.rotate && (_transform.rotate = transform.rotate = tween.rotate %= 360);
        }
        if (transform.rotate > tween.rotate) {
            transform.rotate = tweens.runDefault(now - timerR, _transform.rotate, tween.rotate, 2000);
            transform.rotate < tween.rotate && (_transform.rotate = transform.rotate = tween.rotate %= 360);
        }
        // 透明度
        if (transform.alpha < tween.alpha) {
            transform.alpha = tweens.runDefault(now - timerA, _transform.alpha, tween.alpha, 2000);
            transform.alpha > tween.alpha && (_transform.alpha = transform.alpha = tween.alpha);
        }
        if (transform.alpha > tween.alpha) {
            transform.alpha = tweens.runDefault(now - timerA, _transform.alpha, tween.alpha, 2000);
            transform.alpha < tween.alpha && (_transform.alpha = transform.alpha = tween.alpha);
        }
    };
    return Sprite;
}(GameElement));
/**
 * ▇精灵列表▇
 */
var SpriteSheet = /** @class */ (function (_super) {
    __extends(SpriteSheet, _super);
    function SpriteSheet(x, y, width, height, image, transform, config) {
        var _this = _super.call(this, x, y, width, height, {}, transform) || this;
        var _a = config || {}, matrix = _a.matrix, duration = _a.duration, children = _a.children, defaultName = _a.defaultName;
        var img = new Imagee(image, 0, 0, width, height, 0, 0, width, height);
        img.parent = _this;
        _this.children.push(img);
        _this._data = img.data;
        _this.duration = duration || 100;
        _this.startTime = new Date().getTime();
        _this.frames = [];
        _this.group = {
            'MAIN': [],
            'righter': [0, 1, 2],
            'lefter': [3, 4, 5]
        };
        _this.index = 0;
        _this.defaultName = defaultName || 'MAIN';
        if (matrix) {
            var count = 0;
            for (var y_1 = 0; y_1 < matrix.length; y_1++) {
                var col = matrix[y_1];
                for (var x_1 = 0; x_1 < col.length; x_1++) {
                    var cell = col[x_1];
                    if (cell) {
                        _this.frames.push([x_1 * width, y_1 * height]),
                            _this.group['MAIN'].push(count);
                        count++;
                    }
                }
            }
        }
        return _this;
    }
    SpriteSheet.prototype.changeName = function (name) {
        this.defaultName = name || 'MAIN';
    };
    SpriteSheet.prototype.update = function () {
        _super.prototype.update.call(this);
        var now = new Date().getTime();
        if (now - this.startTime > this.duration) {
            this.startTime = now;
            this.index++;
            var currentFrames = this.group[this.defaultName];
            this.index >= currentFrames.length && (this.index = 0);
            var index = currentFrames[this.index], frame = this.frames[index];
            this._data.sx = frame[0];
            this._data.sy = frame[1];
        }
    };
    return SpriteSheet;
}(Sprite));
/**
 * ▇Shape元素▇
 * 属性：type/parent/data/config
 * 方法：appendTo
 */
var Rect = /** @class */ (function (_super) {
    __extends(Rect, _super);
    function Rect(x, y, width, height, options, config) {
        var _this = _super.call(this, 'Rect') || this;
        delete _this.children;
        delete _this.addChild;
        _this.data = { x: x, y: y, width: width, height: height, options: options };
        _this.config = config;
        return _this;
    }
    return Rect;
}(GameElement));
var Circle = /** @class */ (function (_super) {
    __extends(Circle, _super);
    function Circle(x, y, r, options, config) {
        var _this = _super.call(this, 'Circle') || this;
        delete _this.children;
        delete _this.addChild;
        _this.data = { x: x, y: y, r: r, options: options };
        _this.config = config;
        return _this;
    }
    return Circle;
}(GameElement));
var Polygon = /** @class */ (function (_super) {
    __extends(Polygon, _super);
    function Polygon(points, options, config) {
        var _this = _super.call(this, 'Polygon') || this;
        delete _this.children;
        delete _this.addChild;
        _this.data = { points: points, options: options, config: config };
        _this.config = config;
        return _this;
    }
    return Polygon;
}(GameElement));
var Imagee = /** @class */ (function (_super) {
    __extends(Imagee, _super);
    function Imagee(img, sx, sy, swidth, sheight, x, y, width, height) {
        var _this = _super.call(this, 'Imagee') || this;
        delete _this.children;
        delete _this.addChild;
        _this.data = { img: img, sx: sx, sy: sy, swidth: swidth, sheight: sheight, x: x, y: y, width: width, height: height };
        return _this;
    }
    return Imagee;
}(GameElement));
