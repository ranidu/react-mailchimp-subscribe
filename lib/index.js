"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _jsonp = require("jsonp");

var _jsonp2 = _interopRequireDefault(_jsonp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var getAjaxUrl = function getAjaxUrl(url) {
  return url.replace('/post?', '/post-json?');
};

var SubscribeForm = function (_React$Component) {
  _inherits(SubscribeForm, _React$Component);

  function SubscribeForm(props) {
    _classCallCheck(this, SubscribeForm);

    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this, props].concat(args)));

    _this.onSubmit = function (e) {
      e.preventDefault();
      if (!_this.input.value || _this.input.value.length < 5 || _this.input.value.indexOf("@") === -1) {
        _this.setState({
          status: "error"
        });
        return;
      }
      var url = getAjaxUrl(_this.props.action) + ("&EMAIL=" + encodeURIComponent(_this.input.value));
      _this.setState({
        status: "sending",
        msg: null
      }, function () {
        return (0, _jsonp2.default)(url, {
          param: "c"
        }, function (err, data) {
          if (err) {
            _this.setState({
              status: 'error',
              msg: err
            });
          } else if (data.result !== 'success') {
            _this.setState({
              status: 'error',
              msg: data.msg
            });
          } else {
            _this.setState({
              status: 'success',
              msg: data.msg
            });
          }
        });
      });
    };

    _this.state = {
      status: null,
      msg: null
    };
    return _this;
  }

  SubscribeForm.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props,
        action = _props.action,
        messages = _props.messages,
        className = _props.className,
        style = _props.style,
        styles = _props.styles;
    var _state = this.state,
        status = _state.status,
        response = _state.response;

    return _react2.default.createElement(
      "div",
      { className: className, style: style },
      _react2.default.createElement(
        "form",
        { action: action, method: "post", noValidate: true },
        _react2.default.createElement(
          "div",
          null,
          _react2.default.createElement("input", {
            ref: function ref(node) {
              return _this2.input = node;
            },
            type: "email",
            defaultValue: "",
            name: "EMAIL",
            required: true,
            placeholder: messages.inputPlaceholder
          }),
          _react2.default.createElement(
            "button",
            {
              disabled: this.state.status === "sending" || this.state.status === "success",
              onClick: this.onSubmit,
              type: "submit"
            },
            messages.btnLabel
          )
        ),
        status === "sending" && _react2.default.createElement("p", { style: styles.sending, dangerouslySetInnerHTML: { __html: messages.sending } }),
        status === "success" && _react2.default.createElement("p", { style: styles.success, dangerouslySetInnerHTML: { __html: messages.success } }),
        status === "error" && _react2.default.createElement("p", { style: styles.error, dangerouslySetInnerHTML: { __html: response } })
      )
    );
  };

  return SubscribeForm;
}(_react2.default.Component);

SubscribeForm.propTypes = process.env.NODE_ENV !== "production" ? {
  messages: _propTypes2.default.object,
  styles: _propTypes2.default.object
} : {};

SubscribeForm.defaultProps = {
  messages: {
    inputPlaceholder: "Votre email",
    btnLabel: "Envoyer",
    sending: "Envoi en cours...",
    success: "Merci de votre intérêt!<p>Nous devons confirmer votre adresse e-mail. Pour compléter le processus d'abonnement, veuillez cliquer sur le lien contenu dans l'e-mail que nous venons de vous envoyer.</p>",
    error: "Oops, impossible d'enregistrer cette adresse"
  },
  styles: {
    sending: {
      fontSize: 18,
      color: "auto"
    },
    success: {
      fontSize: 18,
      color: "green"
    },
    error: {
      fontSize: 18,
      color: "red"
    }
  }
};

exports.default = SubscribeForm;
module.exports = exports["default"];