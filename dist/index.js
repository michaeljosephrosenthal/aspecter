module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(10);


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("bufflehead/dist/for/node_development");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("tcomb-form");

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	exports.default = _react2.default.createClass({
	    displayName: 'EditButton',
	    getDefaultProps: function getDefaultProps() {
	        return {
	            editing: false,
	            editingIcon: 'save',
	            icon: 'pencil'
	        };
	    },
	
	    propTypes: {
	        editing: _react.PropTypes.bool.isRequired,
	        onClick: _react.PropTypes.func
	    },
	    render: function render() {
	        var _props = this.props;
	        var editing = _props.editing;
	        var editingIcon = _props.editingIcon;
	        var icon = _props.icon;
	
	        var actions = _objectWithoutProperties(_props, ['editing', 'editingIcon', 'icon']);
	
	        return _react2.default.createElement(
	            'button',
	            _extends({}, actions, {
	                className: 'circular ui icon button top left corner edit', type: 'button' }),
	            _react2.default.createElement('i', { className: "icon " + (editing ? editingIcon : icon) }),
	            'edit'
	        );
	    }
	});

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.shadowParent = exports.SubtlyEditableItem = exports.List = undefined;
	
	var _List2 = __webpack_require__(18);
	
	var _List3 = _interopRequireDefault(_List2);
	
	var _SubtlyEditableItem2 = __webpack_require__(19);
	
	var _SubtlyEditableItem3 = _interopRequireDefault(_SubtlyEditableItem2);
	
	var _shadowParent2 = __webpack_require__(21);
	
	var _shadowParent3 = _interopRequireDefault(_shadowParent2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.List = _List3.default;
	exports.SubtlyEditableItem = _SubtlyEditableItem3.default;
	exports.shadowParent = _shadowParent3.default;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.toTitle = toTitle;
	exports.Persistable = Persistable;
	exports.serializer = serializer;
	exports.expandType = expandType;
	
	var _tcomb = __webpack_require__(9);
	
	var _tcomb2 = _interopRequireDefault(_tcomb);
	
	var _slug = __webpack_require__(30);
	
	var _slug2 = _interopRequireDefault(_slug);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function toTitle(str) {
	    return str.replace(/([a-z][A-Z])/g, function (g) {
	        return g[0] + ' ' + g[1];
	    }).replace(/^([a-zA-Z])| ([a-zA-Z])/g, function (g) {
	        return g.toUpperCase();
	    });
	}
	
	function Persistable(BaseType, name) {
	    var Identified = BaseType.extend([_tcomb2.default.struct({ _id: _tcomb2.default.String })]);
	    var Persisted = Identified.extend([_tcomb2.default.struct({ _rev: _tcomb2.default.String })]);
	    var Type = _tcomb2.default.union([BaseType, Identified, Persisted], name);
	    Type.dispatch = function dispatch(doc) {
	        return doc._rev && doc._id ? Persisted : doc._id ? Identified : BaseType;
	    };
	    return Type;
	}
	
	function serializer(Type, type, fields, sluggify) {
	    sluggify = sluggify || function (doc) {
	        return fields.map(function (f) {
	            return (0, _slug2.default)(doc[f].toString().toLowerCase());
	        }).join('&');
	    };
	    return function (doc) {
	        return Type(Object.assign({}, doc, { _id: type + '/' + sluggify(doc) }));
	    };
	}
	
	function expandType(_ref) {
	    var Type = _ref.Type;
	    var name = _ref.name;
	    var _ref$serialize = _ref.serialize;
	    _ref$serialize = _ref$serialize === undefined ? {} : _ref$serialize;
	    var _ref$serialize$fields = _ref$serialize.fields;
	    var fields = _ref$serialize$fields === undefined ? ['id'] : _ref$serialize$fields;
	    var sluggify = _ref$serialize.sluggify;
	
	    var persistable = Persistable(Type, name);
	    return {
	        name: name,
	        BaseType: Type,
	        Persistable: persistable,
	        serialize: serializer(persistable, name, fields, sluggify)
	    };
	}

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("deep-equal");

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = require("react-router");

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = require("tcomb");

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(28);
	
	var _polypackBufflehead = __webpack_require__(2);
	
	var bufflehead = _interopRequireWildcard(_polypackBufflehead);
	
	var _posts = __webpack_require__(14);
	
	var _posts2 = _interopRequireDefault(_posts);
	
	var _root = __webpack_require__(27);
	
	var _root2 = _interopRequireDefault(_root);
	
	var _reactRouter = __webpack_require__(8);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	var root = (0, _root2.default)({ posts: _posts2.default });
	
	var settings = bufflehead.settings({
	    "db": {
	        "name": "aspecter",
	        "uri": "http://127.0.0.1:5984",
	        "credentials": {
	            "admin": {
	                "name": "server",
	                "password": "server"
	            }
	        }
	    }
	});
	
	var app = new bufflehead.default({
	    title: 'Bufflehead • Aspecter',
	    domains: { root: root, posts: _posts2.default, settings: settings }
	});
	
	app.main();

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Post = function (_React$Component) {
	    _inherits(Post, _React$Component);
	
	    function Post() {
	        _classCallCheck(this, Post);
	
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Post).apply(this, arguments));
	    }
	
	    _createClass(Post, [{
	        key: "render",
	        value: function render() {
	            var _props = this.props;
	            var title = _props.title;
	            var text = _props.text;
	
	            return _react2.default.createElement(
	                "div",
	                { className: "post" },
	                _react2.default.createElement(
	                    "h4",
	                    null,
	                    title
	                ),
	                _react2.default.createElement(
	                    "div",
	                    { className: "description" },
	                    text
	                )
	            );
	        }
	    }]);
	
	    return Post;
	}(_react2.default.Component);
	
	exports.default = Post;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;
	
	var _Post = __webpack_require__(11);
	
	var _Post2 = _interopRequireDefault(_Post);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = _Post2.default;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _relational = __webpack_require__(22);
	
	var _type = __webpack_require__(15);
	
	var _type2 = _interopRequireDefault(_type);
	
	var _components = __webpack_require__(12);
	
	var _components2 = _interopRequireDefault(_components);
	
	var _polypackBufflehead = __webpack_require__(2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = new _relational.RelationDomain({
	    plural: 'posts',
	    singular: 'post',
	    type: {
	        Type: _type2.default,
	        serialize: {
	            fields: ['title']
	        }
	    },
	    components: {
	        ItemView: _components2.default
	    }
	});

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;
	
	var _domain = __webpack_require__(13);
	
	var _domain2 = _interopRequireDefault(_domain);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = _domain2.default;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _tcomb = __webpack_require__(9);
	
	var _tcomb2 = _interopRequireDefault(_tcomb);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = _tcomb2.default.struct({
	    title: _tcomb2.default.String,
	    text: _tcomb2.default.String
	});

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _polypackBufflehead = __webpack_require__(2);
	
	var _utils = __webpack_require__(6);
	
	var _relationRoute = __webpack_require__(23);
	
	var _relationRoute2 = _interopRequireDefault(_relationRoute);
	
	var _components = __webpack_require__(5);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var ddataFlows = Object.assign({}, _polypackBufflehead.persister.defaultDataFlows, {
	    UPDATE: function UPDATE(state, payload) {
	        console.log(payload);
	        return state.map(function (doc) {
	            return doc._id == payload._id ? payload : doc;
	        });
	    }
	});
	
	var RelationDomain = function (_Domain) {
	    _inherits(RelationDomain, _Domain);
	
	    function RelationDomain(_ref) {
	        var type = _ref.type;
	        var singular = _ref.singular;
	        var plural = _ref.plural;
	        var _ref$dataFlows = _ref.dataFlows;
	        var dataFlows = _ref$dataFlows === undefined ? ddataFlows : _ref$dataFlows;
	        var _ref$components = _ref.components;
	        var ItemView = _ref$components.ItemView;
	        var _ref$components$ItemW = _ref$components.ItemWrapper;
	        var ItemWrapper = _ref$components$ItemW === undefined ? _components.SubtlyEditableItem : _ref$components$ItemW;
	        var SetView = _ref$components.SetView;
	        var _ref$components$SetWr = _ref$components.SetWrapper;
	        var SetWrapper = _ref$components$SetWr === undefined ? _components.List : _ref$components$SetWr;
	
	        _classCallCheck(this, RelationDomain);
	
	        SetView = SetView || ItemView;
	        type = (0, _utils.expandType)(Object.assign({ name: (0, _utils.toTitle)(singular) }, type));
	        var route = (0, _relationRoute2.default)({
	            type: type, singular: singular, plural: plural,
	            ItemView: ItemView, SetView: SetView,
	            ItemWrapper: ItemWrapper, SetWrapper: SetWrapper
	        });
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(RelationDomain).call(this, {
	            name: plural,
	            dbPrefix: singular,
	            type: type,
	            dataFlows: dataFlows,
	            route: route
	        }));
	    }
	
	    return RelationDomain;
	}(_polypackBufflehead.Domain);
	
	exports.default = RelationDomain;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _tcombForm = __webpack_require__(3);
	
	var _tcombForm2 = _interopRequireDefault(_tcombForm);
	
	var _EditButton = __webpack_require__(4);
	
	var _EditButton2 = _interopRequireDefault(_EditButton);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var EditableFieldGenerator = function EditableFieldGenerator() {
	  _classCallCheck(this, EditableFieldGenerator);
	
	  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }
	
	  var props = args[0];
	  var options = _extends({}, props.options, {
	    factory: null // avoid circular reference
	  });
	
	  var Inliner = function (_t$form$getComponent) {
	    _inherits(Inliner, _t$form$getComponent);
	
	    function Inliner() {
	      var _Object$getPrototypeO;
	
	      var _temp, _this, _ret;
	
	      _classCallCheck(this, Inliner);
	
	      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	        args[_key2] = arguments[_key2];
	      }
	
	      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Inliner)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = { editing: false }, _temp), _possibleConstructorReturn(_this, _ret);
	    }
	
	    _createClass(Inliner, [{
	      key: 'toggle',
	      value: function toggle(evt) {
	        evt.preventDefault();
	        this.state.editing = !this.state.editing;
	        this.forceUpdate(); // overrides the default shouldComponentUpdate
	      }
	    }, {
	      key: 'getTemplate',
	      value: function getTemplate() {
	        var _this2 = this;
	
	        var editing = this.state.editing;
	
	        var template = _get(Object.getPrototypeOf(Inliner.prototype), 'getTemplate', this).call(this);
	        return function (locals) {
	          return _react2.default.createElement(
	            'div',
	            null,
	            _react2.default.createElement(_EditButton2.default, { onClick: _this2.toggle.bind(_this2), editing: editing }),
	            _react2.default.createElement('div', { className: 'corner-border top left' }),
	            _react2.default.createElement(
	              'a',
	              { href: '#', style: { color: locals.hasError ? '#a94442' : 'normal' } },
	              editing ? template(locals) : locals.value || '...'
	            )
	          );
	        };
	      }
	    }]);
	
	    return Inliner;
	  }(_tcombForm2.default.form.getComponent(props.type, options));
	
	  return new (Function.prototype.bind.apply(Inliner, [null].concat(args)))();
	};
	
	exports.default = EditableFieldGenerator;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _utils = __webpack_require__(6);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	function AddButton(_ref) {
	    var singular = _ref.singular;
	
	    return _react2.default.createElement(
	        'a',
	        { className: 'add-new', href: '/' + singular + '/new?editing=true' },
	        ' Add '
	    );
	}
	
	var List = function (_React$Component) {
	    _inherits(List, _React$Component);
	
	    function List() {
	        _classCallCheck(this, List);
	
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(List).apply(this, arguments));
	    }
	
	    _createClass(List, [{
	        key: 'render',
	        value: function render() {
	            var _props = this.props;
	            var _props$listControls = _props.listControls;
	            var listControls = _props$listControls === undefined ? [AddButton] : _props$listControls;
	            var _props$items = _props.items;
	            var items = _props$items === undefined ? [] : _props$items;
	            var ItemView = _props.ItemView;
	            var plural = _props.plural;
	            var children = _props.children;
	            var actions = _props.actions;
	
	            var controlProps = _objectWithoutProperties(_props, ['listControls', 'items', 'ItemView', 'plural', 'children', 'actions']);
	
	            return children ? _react2.default.cloneElement(children, { actions: actions }) : _react2.default.createElement(
	                'div',
	                { className: plural.toLowerCase() + ' relational list' },
	                _react2.default.createElement(
	                    'div',
	                    { className: 'header' },
	                    _react2.default.createElement(
	                        'h1',
	                        { className: 'title' },
	                        (0, _utils.toTitle)(plural)
	                    ),
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'controls' },
	                        listControls.map(function (Control) {
	                            return _react2.default.createElement(Control, _extends({ key: Control.name, actions: actions }, controlProps));
	                        })
	                    )
	                ),
	                _react2.default.createElement(
	                    'div',
	                    { className: 'items' },
	                    items.map(function (i) {
	                        return _react2.default.createElement(
	                            'div',
	                            { key: i._id, className: singular.toLowerCase() + ' item' },
	                            _react2.default.createElement(ItemView, i)
	                        );
	                    })
	                )
	            );
	        }
	    }]);
	
	    return List;
	}(_react2.default.Component);
	
	List.propTypes = {
	    ItemView: _react2.default.PropTypes.func.isRequired,
	    type: _react2.default.PropTypes.object.isRequired,
	    plural: _react2.default.PropTypes.string,
	    listControls: _react2.default.PropTypes.array,
	    items: _react2.default.PropTypes.array
	};
	exports.default = List;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _tcombForm = __webpack_require__(3);
	
	var _tcombForm2 = _interopRequireDefault(_tcombForm);
	
	var _deepEqual = __webpack_require__(7);
	
	var _deepEqual2 = _interopRequireDefault(_deepEqual);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _TypedCommitableForm = __webpack_require__(20);
	
	var _TypedCommitableForm2 = _interopRequireDefault(_TypedCommitableForm);
	
	var _EditButton = __webpack_require__(4);
	
	var _EditButton2 = _interopRequireDefault(_EditButton);
	
	var _EditableFieldGenerator = __webpack_require__(17);
	
	var _EditableFieldGenerator2 = _interopRequireDefault(_EditableFieldGenerator);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	function toTcombFormTemplate(Template) {
	    if (Template.constructor) {
	        return function (locals) {
	            return _react2.default.createElement(Template, locals.inputs);
	        };
	    } else {
	        return function (locals) {
	            return Template(locals.inputs);
	        };
	    }
	}
	
	function generateSubtleOptions(type) {
	    return {
	        fields: Object.keys(type.meta.props).reduce(function (fields, prop) {
	            fields[prop] = {
	                factory: _EditableFieldGenerator2.default
	            };
	            return fields;
	        }, {})
	    };
	}
	
	function optionsFromProps(_ref) {
	    var BaseType = _ref.type.BaseType;
	    var Template = _ref.Template;
	
	    return _extends({
	        template: toTcombFormTemplate(Template)
	    }, generateSubtleOptions(BaseType));
	}
	
	var ToggleableEditableSubtleForm = function (_React$Component) {
	    _inherits(ToggleableEditableSubtleForm, _React$Component);
	
	    function ToggleableEditableSubtleForm(props) {
	        _classCallCheck(this, ToggleableEditableSubtleForm);
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ToggleableEditableSubtleForm).call(this, props));
	
	        _this.componentWillReceiveProps = function (_ref2) {
	            var value = _ref2.value;
	
	            if (!(0, _deepEqual2.default)(value, _this.state.value)) _this.setState({ value: value });
	        };
	
	        _this.save = function (event) {
	            var _this$props = _this.props;
	            var value = _this$props.value;
	            var _this$props$type = _this$props.type;
	            var serialize = _this$props$type.serialize;
	
	            var rest = _objectWithoutProperties(_this$props$type, ['serialize']);
	
	            var _this$props$actions = _this$props.actions;
	            _this$props$actions = _this$props$actions === undefined ? {} : _this$props$actions;
	            var update = _this$props$actions.update;
	
	            event.preventDefault();
	            var formValue = _this.refs.form.getValue();
	            if (formValue) {
	                update(serialize(Object.assign({}, value, formValue)));
	                _this.setState({ editing: false });
	            }
	        };
	
	        _this.onChange = function (value) {
	            return _this.setState({ value: value });
	        };
	
	        var _props$location = props.location;
	        _props$location = _props$location === undefined ? {} : _props$location;
	        var _props$location$query = _props$location.query;
	        _props$location$query = _props$location$query === undefined ? {} : _props$location$query;
	        var _props$location$query2 = _props$location$query.editing;
	        var editing = _props$location$query2 === undefined ? false : _props$location$query2;
	
	        _this.state = {
	            editing: editing,
	            value: _this.props.value,
	            options: optionsFromProps(_this.props)
	        };
	        return _this;
	    }
	
	    _createClass(ToggleableEditableSubtleForm, [{
	        key: 'render',
	        value: function render() {
	            var _this2 = this;
	
	            var _props = this.props;
	            var _props$type = _props.type;
	            var name = _props$type.name;
	            var Type = _props$type.Type;
	            var BaseType = _props$type.BaseType;
	            var serialize = _props$type.serialize;
	            var Template = _props.Template;
	            var _props$actions = _props.actions;
	            _props$actions = _props$actions === undefined ? {} : _props$actions;
	            var remove = _props$actions.remove;
	            var _state = this.state;
	            var editing = _state.editing;
	            var options = _state.options;
	            var deleting = _state.deleting;
	            var value = _state.value;
	
	            return _react2.default.createElement(
	                'div',
	                { className: name.toLowerCase() + ' item-view' },
	                _react2.default.createElement(_EditButton2.default, { onClick: function onClick(_) {
	                        return _this2.setState({ editing: !editing });
	                    }, editing: editing != false }),
	                editing ? _react2.default.createElement(_tcombForm2.default.form.Form, { ref: 'form',
	                    onChange: this.onChange,
	                    type: BaseType,
	                    options: options,
	                    value: value }) : _react2.default.createElement(Template, value),
	                _react2.default.createElement(
	                    'div',
	                    { className: 'actions' },
	                    deleting && remove ? _react2.default.createElement(
	                        'div',
	                        { className: 'deleting group' },
	                        _react2.default.createElement(
	                            'div',
	                            { className: 'alert deleting', role: 'alert' },
	                            'Are you sure you want to delete this ',
	                            name,
	                            '?'
	                        ),
	                        _react2.default.createElement(
	                            'a',
	                            { onClick: function onClick(_) {
	                                    return remove(value);
	                                }, className: 'delete' },
	                            ' Yes, Delete '
	                        ),
	                        _react2.default.createElement(
	                            'a',
	                            { onClick: function onClick(_) {
	                                    return isDeleting(false);
	                                }, className: 'cancel' },
	                            ' Cancel '
	                        )
	                    ) : _react2.default.createElement(
	                        'div',
	                        { className: 'default group' },
	                        _react2.default.createElement(
	                            'button',
	                            { className: 'save', onClick: this.save },
	                            'Save'
	                        ),
	                        _react2.default.createElement(
	                            'a',
	                            { onClick: function onClick(_) {
	                                    return _this2.setState({ editing: false });
	                                }, className: 'cancel' },
	                            'Cancel'
	                        ),
	                        remove && _react2.default.createElement(
	                            'a',
	                            { onClick: function onClick(_) {
	                                    return isDeleting(true);
	                                }, className: 'delete' },
	                            'delete'
	                        )
	                    )
	                )
	            );
	        }
	    }]);
	
	    return ToggleableEditableSubtleForm;
	}(_react2.default.Component);
	
	ToggleableEditableSubtleForm.propTypes = {
	    Template: _react2.default.PropTypes.func.isRequired,
	    type: _react2.default.PropTypes.object,
	    value: _react2.default.PropTypes.object
	};
	exports.default = ToggleableEditableSubtleForm;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _tcombForm = __webpack_require__(3);
	
	var _tcombForm2 = _interopRequireDefault(_tcombForm);
	
	var _deepEqual = __webpack_require__(7);
	
	var _deepEqual2 = _interopRequireDefault(_deepEqual);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var defaultOptions = {
	    config: {
	        horizontal: {
	            md: [2, 10],
	            sm: [2, 10]
	        }
	    }
	};
	
	var TypedCommitableForm = function (_React$Component) {
	    _inherits(TypedCommitableForm, _React$Component);
	
	    function TypedCommitableForm() {
	        var _Object$getPrototypeO;
	
	        var _temp, _this, _ret;
	
	        _classCallCheck(this, TypedCommitableForm);
	
	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	            args[_key] = arguments[_key];
	        }
	
	        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(TypedCommitableForm)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = { value: _this.props.value, deleting: false }, _this.componentWillReceiveProps = function (_ref) {
	            var value = _ref.value;
	
	            if (!(0, _deepEqual2.default)(value, _this.state.value)) _this.setState({ value: value });
	        }, _this.onSubmit = function (event) {
	            var _this$props = _this.props;
	            var value = _this$props.value;
	            var hide = _this$props.hide;
	            var commit = _this$props.commit;
	            var serialize = _this$props.serialize;
	
	            event.preventDefault();
	            var formValue = _this.refs.form.getValue();
	            if (formValue) {
	                commit(serialize(Object.assign({}, value, formValue)));
	                hide();
	            }
	        }, _this.onChange = function (value) {
	            return _this.setState({ value: value });
	        }, _temp), _possibleConstructorReturn(_this, _ret);
	    }
	
	    _createClass(TypedCommitableForm, [{
	        key: 'render',
	        value: function render() {
	            var _this2 = this;
	
	            var isDeleting = function isDeleting(bool) {
	                return _this2.setState({ deleting: bool });
	            };
	            var _state = this.state;
	            var value = _state.value;
	            var deleting = _state.deleting;
	            var _props = this.props;
	            var hide = _props.hide;
	            var remove = _props.remove;
	            var baseType = _props.baseType;
	            var name = _props.name;
	            var _props$options = _props.options;
	            var options = _props$options === undefined ? {} : _props$options;
	
	            return _react2.default.createElement(
	                'form',
	                { onSubmit: this.onSubmit, className: 'form-horizontal' },
	                _react2.default.createElement(_tcombForm2.default.form.Form, { ref: 'form', type: baseType, options: Object.assign(defaultOptions, options), value: value,
	                    onChange: this.onChange
	                }),
	                deleting && remove ? _react2.default.createElement(
	                    'div',
	                    { className: 'form-group' },
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'alert alert-danger', role: 'alert' },
	                        'Are you sure you want to delete this ',
	                        name,
	                        '?'
	                    ),
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'btn-group btn-group-justified' },
	                        _react2.default.createElement(
	                            'a',
	                            { onClick: function onClick(_) {
	                                    return remove(value);
	                                }, className: 'btn btn-danger' },
	                            ' Yes, Delete '
	                        ),
	                        _react2.default.createElement(
	                            'a',
	                            { onClick: function onClick(_) {
	                                    return isDeleting(false);
	                                }, className: 'btn btn-default' },
	                            ' Cancel '
	                        )
	                    )
	                ) : _react2.default.createElement(
	                    'div',
	                    { className: 'form-group' },
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'btn-group pull-right' },
	                        _react2.default.createElement(
	                            'button',
	                            { type: 'submit', className: 'btn btn-primary' },
	                            'Save'
	                        ),
	                        _react2.default.createElement(
	                            'a',
	                            { onClick: hide, className: 'btn btn-warning' },
	                            'cancel'
	                        ),
	                        remove && _react2.default.createElement(
	                            'a',
	                            { onClick: function onClick(_) {
	                                    return isDeleting(true);
	                                }, className: 'btn btn-danger' },
	                            'delete'
	                        )
	                    )
	                )
	            );
	        }
	    }]);
	
	    return TypedCommitableForm;
	}(_react2.default.Component);
	
	TypedCommitableForm.propTypes = {
	    baseType: _react2.default.PropTypes.func.isRequired,
	    name: _react2.default.PropTypes.string,
	    serialize: _react2.default.PropTypes.func.isRequired,
	    commit: _react2.default.PropTypes.func.isRequired,
	    options: _react2.default.PropTypes.object
	};
	exports.default = TypedCommitableForm;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.default = shadowParent;
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function shadowParent(_ref) {
	    var Child = _ref.child;
	    var shadowProps = _ref.props;
	
	    return function (props) {
	        return _react2.default.createElement(Child, _extends({}, props, shadowProps));
	    };
	}

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.RelationDomain = undefined;
	
	var _RelationDomain2 = __webpack_require__(16);
	
	var _RelationDomain3 = _interopRequireDefault(_RelationDomain2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.RelationDomain = _RelationDomain3.default;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = relationRoute;
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRouter = __webpack_require__(8);
	
	var _components = __webpack_require__(5);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function relationRoute(_ref) {
	    var type = _ref.type;
	    var singular = _ref.singular;
	    var plural = _ref.plural;
	    var ItemView = _ref.ItemView;
	    var ItemWrapper = _ref.ItemWrapper;
	    var SetView = _ref.SetView;
	    var SetWrapper = _ref.SetWrapper;
	
	    var pluralComponent = (0, _components.shadowParent)({
	        child: SetWrapper,
	        props: { type: type, plural: plural, singular: singular, ItemView: SetView }
	    });
	    var singularComponent = (0, _components.shadowParent)({
	        child: ItemWrapper,
	        props: { type: type, singular: singular, plural: plural, Template: ItemView }
	    });
	    return {
	        path: plural,
	        route: _react2.default.createElement(
	            _reactRouter.Route,
	            { path: '' + plural, component: pluralComponent },
	            _react2.default.createElement(_reactRouter.Route, { path: '/' + singular + '/:' + singular + 'id', component: singularComponent })
	        )
	    };
	}

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Nav = function (_React$Component) {
	    _inherits(Nav, _React$Component);
	
	    function Nav() {
	        _classCallCheck(this, Nav);
	
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Nav).apply(this, arguments));
	    }
	
	    _createClass(Nav, [{
	        key: "render",
	        value: function render() {
	            var _props = this.props;
	            var brand = _props.brand;
	            var paths = _props.paths;
	
	            var props = _objectWithoutProperties(_props, ["brand", "paths"]);
	
	            return _react2.default.createElement(
	                "nav",
	                props,
	                _react2.default.createElement(
	                    "div",
	                    { className: "container" },
	                    _react2.default.createElement(
	                        "a",
	                        { className: "brand", href: "/" },
	                        " ",
	                        brand,
	                        " "
	                    ),
	                    _react2.default.createElement(
	                        "ul",
	                        { className: "nav items" },
	                        paths.map(function (path) {
	                            return _react2.default.createElement(
	                                "li",
	                                { key: path },
	                                _react2.default.createElement(
	                                    "a",
	                                    { href: path },
	                                    path
	                                )
	                            );
	                        })
	                    )
	                )
	            );
	        }
	    }]);
	
	    return Nav;
	}(_react2.default.Component);
	
	exports.default = Nav;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = generateDomain;
	
	var _polypackBufflehead = __webpack_require__(2);
	
	var _polypackDomainDrivenReduxReact = __webpack_require__(29);
	
	var _generateRoot = __webpack_require__(26);
	
	var _generateRoot2 = _interopRequireDefault(_generateRoot);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function generateDomain(domains) {
	    return new _polypackBufflehead.Domain({
	        name: 'root',
	        route: {
	            path: '/',
	            component: (0, _generateRoot2.default)({ paths: _polypackDomainDrivenReduxReact.utils.filterDomainsForType(domains, 'route').map(_polypackDomainDrivenReduxReact.utils.extractPath) })
	        }
	    });
	}

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	exports.default = generateRoot;
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Nav = __webpack_require__(24);
	
	var _Nav2 = _interopRequireDefault(_Nav);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	if (false) require('./root.scss');
	
	function generateRoot(_ref) {
	    var paths = _ref.paths;
	
	    return function (_React$Component) {
	        _inherits(Root, _React$Component);
	
	        function Root() {
	            _classCallCheck(this, Root);
	
	            return _possibleConstructorReturn(this, Object.getPrototypeOf(Root).apply(this, arguments));
	        }
	
	        _createClass(Root, [{
	            key: 'render',
	            value: function render() {
	                return _react2.default.createElement(
	                    'div',
	                    null,
	                    _react2.default.createElement(_Nav2.default, { paths: paths }),
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'container' },
	                        this.props.children
	                    )
	                );
	            }
	        }]);
	
	        return Root;
	    }(_react2.default.Component);
	}

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;
	
	var _generateDomain = __webpack_require__(25);
	
	var _generateDomain2 = _interopRequireDefault(_generateDomain);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = _generateDomain2.default;

/***/ },
/* 28 */
/***/ function(module, exports) {

	module.exports = require("babel-polyfill");

/***/ },
/* 29 */
/***/ function(module, exports) {

	module.exports = require("domain-driven-redux-react/dist/for/node_development");

/***/ },
/* 30 */
/***/ function(module, exports) {

	module.exports = require("slug");

/***/ }
/******/ ]);
//# sourceMappingURL=index.js.map