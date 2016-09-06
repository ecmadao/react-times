module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(2);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _ConstValue = __webpack_require__(3);

	var _utils = __webpack_require__(4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var HourPicker = function (_React$Component) {
	  _inherits(HourPicker, _React$Component);

	  function HourPicker(props) {
	    _classCallCheck(this, HourPicker);

	    var _this = _possibleConstructorReturn(this, (HourPicker.__proto__ || Object.getPrototypeOf(HourPicker)).call(this, props));

	    _this.startX = 0;
	    _this.startY = 0;
	    _this.originX = null;
	    _this.originY = null;

	    var hour = _this.props.hour;

	    var pointerRotate = 0;
	    _ConstValue.HOURS.map(function (h, index) {
	      if (hour === index + 1) {
	        pointerRotate = index < 12 ? 360 * (index + 1) / 12 : 360 * (index + 1 - 12) / 12;
	      }
	    });
	    var height = hour < 12 ? _ConstValue.MIN_ABSOLUTE_POSITION - _ConstValue.POINTER_RADIUS : _ConstValue.MAX_ABSOLUTE_POSITION - _ConstValue.POINTER_RADIUS;
	    var top = hour < 12 ? _ConstValue.PICKER_RADIUS - _ConstValue.MIN_ABSOLUTE_POSITION + _ConstValue.POINTER_RADIUS : _ConstValue.PICKER_RADIUS - _ConstValue.MAX_ABSOLUTE_POSITION + _ConstValue.POINTER_RADIUS;
	    _this.state = {
	      top: top,
	      height: height,
	      pointerRotate: pointerRotate,
	      draging: false,
	      radian: (0, _utils.degree2Radian)(pointerRotate)
	    };

	    _this.handleMouseDown = _this.handleMouseDown.bind(_this);
	    _this.handleMouseMove = _this.handleMouseMove.bind(_this);
	    _this.handleMouseUp = _this.handleMouseUp.bind(_this);
	    return _this;
	  }

	  _createClass(HourPicker, [{
	    key: 'handleHourChange',
	    value: function () {
	      function handleHourChange(hour, angle) {
	        var handleHourChange = this.props.handleHourChange;

	        handleHourChange && handleHourChange(hour);
	        var height = hour > 12 ? _ConstValue.MAX_ABSOLUTE_POSITION - _ConstValue.POINTER_RADIUS : _ConstValue.MIN_ABSOLUTE_POSITION - _ConstValue.POINTER_RADIUS;
	        var top = hour > 12 ? _ConstValue.PICKER_RADIUS - _ConstValue.MAX_ABSOLUTE_POSITION + _ConstValue.POINTER_RADIUS : _ConstValue.PICKER_RADIUS - _ConstValue.MIN_ABSOLUTE_POSITION + _ConstValue.POINTER_RADIUS;
	        this.setState({
	          height: height,
	          top: top,
	          pointerRotate: angle,
	          radian: (0, _utils.degree2Radian)(angle)
	        });
	      }

	      return handleHourChange;
	    }()
	  }, {
	    key: 'getRadian',
	    value: function () {
	      function getRadian(x, y) {
	        var sRad = Math.atan2(y - this.originY, x - this.originX);
	        sRad -= Math.atan2(this.startY - this.originY, this.startX - this.originX);
	        sRad += this.state.radian;
	        return sRad;
	      }

	      return getRadian;
	    }()
	  }, {
	    key: 'getAbsolutePosition',
	    value: function () {
	      function getAbsolutePosition(x, y) {
	        return Math.sqrt(Math.pow(x - this.originX, 2) + Math.pow(y - this.originY, 2));
	      }

	      return getAbsolutePosition;
	    }()
	  }, {
	    key: 'getStandardAbsolutePosition',
	    value: function () {
	      function getStandardAbsolutePosition(absolutePosition) {
	        if (absolutePosition < _ConstValue.MIN_ABSOLUTE_POSITION) {
	          absolutePosition = _ConstValue.MIN_ABSOLUTE_POSITION;
	        }
	        if (absolutePosition > _ConstValue.MAX_ABSOLUTE_POSITION) {
	          absolutePosition = _ConstValue.MAX_ABSOLUTE_POSITION;
	        }
	        return absolutePosition;
	      }

	      return getStandardAbsolutePosition;
	    }()
	  }, {
	    key: 'handleMouseDown',
	    value: function () {
	      function handleMouseDown(e) {
	        var event = e || window.event;
	        event.preventDefault();
	        event.stopPropagation();
	        this.setState({
	          draging: true
	        });
	        var pos = (0, _utils.mousePosition)(event);
	        this.startX = pos.x;
	        this.startY = pos.y;
	        if (!this.originX) {
	          var centerPoint = _reactDom2['default'].findDOMNode(this.refs.pickerCenter);
	          var centerPointPos = centerPoint.getBoundingClientRect();
	          this.originX = centerPointPos.left;
	          this.originY = centerPointPos.top;
	        }
	      }

	      return handleMouseDown;
	    }()
	  }, {
	    key: 'handleMouseMove',
	    value: function () {
	      function handleMouseMove(e) {
	        if (this.state.draging) {
	          var pos = (0, _utils.mousePosition)(e);
	          var dragX = pos.x;
	          var dragY = pos.y;
	          if (this.originX !== dragX && this.originY !== dragY) {
	            var sRad = this.getRadian(dragX, dragY);
	            var degree = sRad * (360 / (2 * Math.PI));

	            var absolutePosition = this.getAbsolutePosition(dragX, dragY);
	            absolutePosition = this.getStandardAbsolutePosition(absolutePosition);
	            var height = absolutePosition - _ConstValue.POINTER_RADIUS;
	            var top = _ConstValue.PICKER_RADIUS - height;
	            this.setState({
	              top: top,
	              height: height,
	              pointerRotate: degree
	            });
	          }
	        }
	      }

	      return handleMouseMove;
	    }()
	  }, {
	    key: 'handleMouseUp',
	    value: function () {
	      function handleMouseUp(e) {
	        if (this.state.draging) {
	          var pos = (0, _utils.mousePosition)(e);
	          var endX = pos.x;
	          var endY = pos.y;

	          var sRad = this.getRadian(endX, endY);
	          var degree = sRad * (360 / (2 * Math.PI));

	          if (degree < 0) {
	            degree = 360 + degree;
	          }
	          var cacheHour = Math.round(degree / (360 / 12));
	          var pointerRotate = cacheHour * (360 / 12);

	          var absolutePosition = this.getAbsolutePosition(endX, endY);
	          var _state = this.state;
	          var height = _state.height;
	          var top = _state.top;

	          absolutePosition = this.getStandardAbsolutePosition(absolutePosition);
	          if (_ConstValue.MIN_ABSOLUTE_POSITION < absolutePosition && absolutePosition < _ConstValue.MAX_ABSOLUTE_POSITION) {
	            if (absolutePosition - _ConstValue.MIN_ABSOLUTE_POSITION > (_ConstValue.MAX_ABSOLUTE_POSITION - _ConstValue.MIN_ABSOLUTE_POSITION) / 2) {
	              absolutePosition = _ConstValue.MAX_ABSOLUTE_POSITION;
	            } else {
	              absolutePosition = _ConstValue.MIN_ABSOLUTE_POSITION;
	            }
	            height = absolutePosition - _ConstValue.POINTER_RADIUS;
	            top = _ConstValue.PICKER_RADIUS - height;
	          }

	          this.setState({
	            top: top,
	            height: height,
	            pointerRotate: pointerRotate,
	            draging: false,
	            radian: (0, _utils.degree2Radian)(pointerRotate)
	          });

	          if (cacheHour > 12) {
	            cacheHour = cacheHour - 12;
	          }
	          var hour = absolutePosition === _ConstValue.MIN_ABSOLUTE_POSITION ? cacheHour : cacheHour + 12;
	          var handleHourChange = this.props.handleHourChange;

	          handleHourChange && handleHourChange(hour);
	        }
	      }

	      return handleMouseUp;
	    }()
	  }, {
	    key: 'renderHourPointes',
	    value: function () {
	      function renderHourPointes() {
	        var _this2 = this;

	        return _ConstValue.HOURS.map(function (h, index) {
	          var pointClass = index < 12 ? "picker_point point_inner" : "picker_point point_outter";
	          var angle = index < 12 ? 360 * (index + 1) / 12 : 360 * (index + 1 - 12) / 12;
	          var inlineStyle = (0, _utils.getInlineRotateStyle)(angle);
	          return _react2['default'].createElement(
	            'div',
	            {
	              key: index,
	              className: pointClass,
	              style: inlineStyle,
	              onClick: _this2.handleHourChange.bind(_this2, index + 1, angle),
	              onMouseDown: _utils.disableMouseDown },
	            index + 1
	          );
	        });
	      }

	      return renderHourPointes;
	    }()
	  }, {
	    key: 'render',
	    value: function () {
	      function render() {
	        var hour = this.props.hour;
	        var _state2 = this.state;
	        var pointerRotate = _state2.pointerRotate;
	        var draging = _state2.draging;
	        var height = _state2.height;
	        var top = _state2.top;

	        var pickerPointerClass = 'picker_pointer';
	        if (!draging) {
	          pickerPointerClass = pickerPointerClass + ' animation';
	        }

	        return _react2['default'].createElement(
	          'div',
	          {
	            className: 'picker_container hour_picker_container',
	            onMouseMove: this.handleMouseMove,
	            onMouseUp: this.handleMouseUp },
	          this.renderHourPointes(),
	          _react2['default'].createElement(
	            'div',
	            {
	              ref: 'dragPointer',
	              className: pickerPointerClass,
	              style: (0, _utils.getInitialPointerStyle)(height, top, pointerRotate) },
	            _react2['default'].createElement(
	              'div',
	              {
	                className: 'pointer_drag',
	                onMouseDown: this.handleMouseDown },
	              hour
	            )
	          ),
	          _react2['default'].createElement('div', {
	            className: 'picker_center',
	            ref: 'pickerCenter' })
	        );
	      }

	      return render;
	    }()
	  }]);

	  return HourPicker;
	}(_react2['default'].Component);

	exports['default'] = HourPicker;

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("react-dom");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("../ConstValue.js");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("../utils.js");

/***/ }
/******/ ]);