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

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _moment = __webpack_require__(5);

	var _moment2 = _interopRequireDefault(_moment);

	var _OutsideClickHandler = __webpack_require__(6);

	var _OutsideClickHandler2 = _interopRequireDefault(_OutsideClickHandler);

	var _TimePickerModal = __webpack_require__(7);

	var _TimePickerModal2 = _interopRequireDefault(_TimePickerModal);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var TimePicker = function (_React$Component) {
	  _inherits(TimePicker, _React$Component);

	  function TimePicker(props) {
	    _classCallCheck(this, TimePicker);

	    var _this = _possibleConstructorReturn(this, (TimePicker.__proto__ || Object.getPrototypeOf(TimePicker)).call(this, props));

	    var defaultTime = props.defaultTime;

	    var _moment$format$split = (0, _moment2.default)().format("HH:mm").split(':');

	    var _moment$format$split2 = _slicedToArray(_moment$format$split, 2);

	    var hour = _moment$format$split2[0];
	    var minute = _moment$format$split2[1];

	    if (defaultTime) {
	      var _defaultTime$split = defaultTime.split(':');

	      var _defaultTime$split2 = _slicedToArray(_defaultTime$split, 2);

	      hour = _defaultTime$split2[0];
	      minute = _defaultTime$split2[1];
	    }
	    _this.state = {
	      hour: hour,
	      minute: minute,
	      focused: false
	    };
	    _this.onFocus = _this.onFocus.bind(_this);
	    _this.onClearFocus = _this.onClearFocus.bind(_this);
	    _this.handleHourChange = _this.handleHourChange.bind(_this);
	    _this.handleMinuteChange = _this.handleMinuteChange.bind(_this);
	    return _this;
	  }

	  _createClass(TimePicker, [{
	    key: 'onFocus',
	    value: function onFocus() {
	      this.setState({
	        focused: true
	      });
	      var onFocusChange = this.props.onFocusChange;

	      onFocusChange && onFocusChange(true);
	    }
	  }, {
	    key: 'onClearFocus',
	    value: function onClearFocus() {
	      this.setState({
	        focused: false
	      });
	      var onFocusChange = this.props.onFocusChange;

	      onFocusChange && onFocusChange(false);
	    }
	  }, {
	    key: 'handleHourChange',
	    value: function handleHourChange(hour) {
	      if (hour < 10) {
	        hour = '0' + hour;
	      }
	      this.setState({ hour: hour });
	      var onHourChange = this.props.onHourChange;

	      onHourChange && onHourChange(hour);
	    }
	  }, {
	    key: 'handleMinuteChange',
	    value: function handleMinuteChange(minute) {
	      if (minute < 10) {
	        minute = '0' + minute;
	      }
	      this.setState({ minute: minute });
	      var onMinuteChange = this.props.onMinuteChange;

	      onMinuteChange && onMinuteChange(minute);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var placeholder = this.props.placeholder;
	      var _state = this.state;
	      var hour = _state.hour;
	      var minute = _state.minute;
	      var focused = _state.focused;

	      var times = hour + ' : ' + minute;
	      return _react2.default.createElement(
	        'div',
	        { className: 'time_picker_container' },
	        _react2.default.createElement(
	          'div',
	          {
	            onClick: this.onFocus,
	            className: 'time_picker_preview' },
	          placeholder || times
	        ),
	        _react2.default.createElement(
	          _OutsideClickHandler2.default,
	          { onOutsideClick: this.onClearFocus },
	          _react2.default.createElement(_TimePickerModal2.default, {
	            hour: hour,
	            minute: minute,
	            focused: focused,
	            handleHourChange: this.handleHourChange,
	            handleMinuteChange: this.handleMinuteChange
	          })
	        )
	      );
	    }
	  }]);

	  return TimePicker;
	}(_react2.default.Component);

	exports.default = TimePicker;

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/***/ function(module, exports) {

	module.exports = require("moment");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("./OutsideClickHandler");

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("./TimePickerModal");

/***/ }
/******/ ]);