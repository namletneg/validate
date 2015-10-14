/**
 * Created by f on 2015/10/12.
 */
(function ($) {
    $.fn.validate = function () {
        var $self = this,
            rules = {
                requisite: /^\s*$/,   // 0 or 多个空格
                user: /^\w+$/,
                number: /^\d+$/
            },
        // 添加规则
            addRules = function (key, value) {
                rules[key] = value;
                return $self;
            },
        // el绑上验证规则
            bindRule = function () {

            },
        // 是否匹配
            isMatch = function (el) {
                var $el = $(el),
                    value = $el.val(),
                    terms = $el.data();

                // 判断
                for(var key in rules){
                    if(terms[key] === true){
                        return rules[key].test(value);
                    }
                }
                return !rules.requisite.test(value);
            },
        // 提交表单前检测
            eve = function (successCallback, errorCallback) {
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
                });
                isPass && successCallback();
            },
            init = function () {
                eve(function () {
                    console.log('success')
                }, function () {
                    console.log('error')
                });
            };

        init();
        return {
            addRules: addRules
        }
    };
})(jQuery);
