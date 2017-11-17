function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from "react";
import PropTypes from "prop-types";
import jsonp from "jsonp";

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
        return jsonp(url, {
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
        msg = _state.msg;

    return React.createElement(
      "div",
      { className: className, style: style },
      React.createElement(
        "form",
        { action: action, method: "post", noValidate: true },
        React.createElement(
          "div",
          null,
          React.createElement("input", {
            ref: function ref(node) {
              return _this2.input = node;
            },
            type: "email",
            defaultValue: "",
            name: "EMAIL",
            required: true,
            placeholder: messages.inputPlaceholder
          }),
          React.createElement(
            "button",
            {
              disabled: this.state.status === "sending" || this.state.status === "success",
              onClick: this.onSubmit,
              type: "submit"
            },
            messages.btnLabel
          )
        ),
        status === "sending" && React.createElement("p", { style: styles.sending, dangerouslySetInnerHTML: { __html: messages.sending } }),
        status === "success" && React.createElement("p", { style: styles.success, dangerouslySetInnerHTML: { __html: messages.success } }),
        status === "error" && React.createElement("p", { style: styles.error, dangerouslySetInnerHTML: { __html: msg } })
      )
    );
  };

  return SubscribeForm;
}(React.Component);

SubscribeForm.propTypes = process.env.NODE_ENV !== "production" ? {
  messages: PropTypes.object,
  styles: PropTypes.object
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

export default SubscribeForm;