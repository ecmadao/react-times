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

	var MinutePicker = function (_React$Component) {
	  _inherits(MinutePicker, _React$Component);

	  function MinutePicker(props) {
	    _classCallCheck(this, MinutePicker);

	    var _this = _possibleConstructorReturn(this, (MinutePicker.__proto__ || Object.getPrototypeOf(MinutePicker)).call(this, props));

	    _this.startX = 0;
	    _this.startY = 0;
	    _this.originX = null;
	    _this.originY = null;

	    var minute = _this.props.minute;

	    var pointerRotate = 0;
	    _ConstValue.MINUTES.map(function (h, index) {
	      if (minute === index + 1) {
	        pointerRotate = 360 * (index + 1) / 60;
	      }
	    });
	    _this.state = {
	      pointerRotate: pointerRotate,
	      draging: false,
	      radian: (0, _utils.degree2Radian)(pointerRotate),
	      height: _ConstValue.MAX_ABSOLUTE_POSITION - _ConstValue.POINTER_RADIUS,
	      top: _ConstValue.PICKER_RADIUS - _ConstValue.MAX_ABSOLUTE_POSITION + _ConstValue.POINTER_RADIUS
	    };

	    _this.handleMouseDown = _this.handleMouseDown.bind(_this);
	    _this.handleMouseMove = _this.handleMouseMove.bind(_this);
	    _this.handleMouseUp = _this.handleMouseUp.bind(_this);
	    return _this;
	  }

	  _createClass(MinutePicker, [{
	    key: 'handleMinuteChange',
	    value: function () {
	      function handleMinuteChange(minute, angle) {
	        var handleMinuteChange = this.props.handleMinuteChange;

	        handleMinuteChange && handleMinuteChange(minute);
	        this.setState({
	          pointerRotate: angle,
	          radian: (0, _utils.degree2Radian)(angle)
	        });
	      }

	      return handleMinuteChange;
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
	            this.setState({
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
	          var minute = Math.round(degree / (360 / 12));
	          var pointerRotate = minute * (360 / 12);

	          this.setState({
	            pointerRotate: pointerRotate,
	            draging: false,
	            radian: (0, _utils.degree2Radian)(pointerRotate)
	          });

	          if (minute > 12) {
	            minute = minute - 12;
	          }
	          var handleMinuteChange = this.props.handleMinuteChange;

	          handleMinuteChange && handleMinuteChange(minute * 5);
	        }
	      }

	      return handleMouseUp;
	    }()
	  }, {
	    key: 'renderMinutePointes',
	    value: function () {
	      function renderMinutePointes() {
	        var _this2 = this;

	        return _ConstValue.MINUTES.map(function (m, index) {
	          var angle = 360 * index / 60;
	          var inlineStyle = (0, _utils.getInlineRotateStyle)(angle);
	          if (index % 5 === 0) {
	            return _react2['default'].createElement(
	              'div',
	              {
	                key: index,
	                className: 'picker_point point_outter',
	                style: inlineStyle,
	                onClick: _this2.handleMinuteChange.bind(_this2, index, angle),
	                onMouseDown: _utils.disableMouseDown },
	              index
	            );
	          }
	        });
	      }

	      return renderMinutePointes;
	    }()
	  }, {
	    key: 'render',
	    value: function () {
	      function render() {
	        var minute = this.props.minute;
	        var _state = this.state;
	        var pointerRotate = _state.pointerRotate;
	        var draging = _state.draging;
	        var height = _state.height;
	        var top = _state.top;

	        var pickerPointerClass = 'picker_pointer';
	        if (!draging) {
	          pickerPointerClass = pickerPointerClass + ' animation';
	        }

	        return _react2['default'].createElement(
	          'div',
	          {
	            className: 'picker_container minute_picker_container',
	            onMouseMove: this.handleMouseMove,
	            onMouseUp: this.handleMouseUp },
	          this.renderMinutePointes(),
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
	              minute
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

	  return MinutePicker;
	}(_react2['default'].Component);

	exports['default'] = MinutePicker;

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