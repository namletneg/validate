/**
 * Created by f on 2015/10/12.
 */
(function ($) {
    var reRules = {
            requisite: /^\s*$/,   // 0 or 多个空格
            user: /^\w+$/,
            number: /^\d+$/,
            phone: /^\d{11}$/
        },
    // 是否匹配
        isMatch = function (el) {
            var $el = $(el),
                value = $el.val(),
                terms = $el.data(),
                rules = reRules,
                key;

            // 判断
            for (key in rules) {
                if (terms[key] === true) {
                    return rules[key].test(value);
                }
            }
            return !rules.requisite.test(value);
        },
    // 获取数据
        getDate = function (url, _date, callback) {
            $.getScript(url, function () {
                if (typeof window[_date] === 'object') {
                    callback && callback(window[_date]);
                }
            });
        };

    /**
     * @description 表单验证
     * arguments[0] object
     * success: function  表单验证成功事件 @param 为 form
     * error: function 表单验证失败事件，@param 为 element
     * elementsSuccess: function element验证成功事件，@param 为 element
     */
    $.fn.validate = function (option) {
        var $self = this,
            rules = reRules,
        // 添加规则
            addRules = function (newR, value) {
                if (typeof newR === 'object') {
                    for (var key in newR) {
                        rules[key] = newR[key];
                    }
                } else if (typeof newR === 'string') {
                    rules[newR] = value;
                }
                return this;
            },
        // 提交表单前检测
            eve = function (successCallback, errorCallback, elementSuccessCallback) {
                var $el = $self.find('.requisite'),
                    isPass;

                $el.each(function () {
                    if (!isMatch(this)) {
                        isPass = false;
                        errorCallback && errorCallback(this);
                        return false;    // 中断循环
                    }
                    // 通过检测
                    isPass = true;
                    elementSuccessCallback && elementSuccessCallback(this);
                });
                isPass && successCallback($self[0]);
            },
            init = function () {
                $self.delegate('.submit', 'click', function () {
                    eve(option.success, option.error, option.elementsSuccess);
                });
            };

        init();
        return{
            addRules: addRules
        }
    };

    // $el绑定接口验证
    $.fn.bindInterface = function (url, _date, func) {
        getDate(url, _date, func);
    };

    // $el绑上事件
    $.fn.bindValidate = function (rule, type, successCallback, errorCallback) {
        var $self = this;

        if (!$self.hasClass('requisite')) {
            $self.addClass('requisite');
        }
        (rule !== 'requisite') && $self.data(rule, true);
        // 添加事件
        if (type) {
            $self.bind(type, function (event) {
                event = event || window.event;
                if (isMatch(event.target)) {
                    successCallback && successCallback(event.target);
                } else {
                    errorCallback && errorCallback(event.target);
                }
            });
        }
    }

})(jQuery);
