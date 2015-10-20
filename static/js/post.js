/**
 * Created by f on 2015/10/19.
 */
(function ($) {
    var //提示框  接口
        showTips = function (msg, type, cbk) {
            var obj = {
                'el': null,
                'type': type || 'success',
                'msg': msg || '发布成功',
                'position': 'midCenter',
                'time': 2000,
                'callback': function () {
                    cbk && cbk();
                }
            };

            TY.loader('TY.ui.tips', function () {
                new TY.ui.tips(obj);
            });
        };

    $('#myForm').validate({
        success: function(el){
            $(el).bindInterface('./date.js', '_date', function(date){
                if(typeof date === 'object'){
                    if(date.status === 1){
                        console.log(date.message)
                    }
                }
            });
        },
        error: function(el){
            $(el).css('border', '#f00 solid 1px').focus();
        },
        elementsSuccess: function(el){
            $(el).css('border', '#ccc solid 1px').blur();
        }
    }).addRules({
        at: /^at$/,
        aa: /^aa$/
    });

    $('.inter').on('blur', function(){
       $(this).bindInterface('./date.js', '_date', function(date){
            console.log(1);
       });
    });
})(jQuery);