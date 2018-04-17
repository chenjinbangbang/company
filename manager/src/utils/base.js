
exports.install = function(Vue,options){

    //time为时间格式，返回2018-19-10 10:10:10的格式
    Vue.prototype.timeFormatFn = function(time){
        time = new Date(time);
        let getFullYear = time.getFullYear(),
            getMonth = time.getMonth()+1 < 10 ? '0'+(time.getMonth()+1) : time.getMonth()+1,
            getDate = time.getDate() < 10 ? '0'+time.getDate() : time.getDate(),
            getHours = time.getHours() < 10 ? '0'+time.getHours() : time.getHours(),
            getMinutes = time.getMinutes() < 10 ? '0'+time.getMinutes() : time.getMinutes(),
            getSeconds = time.getSeconds() < 10 ? '0'+time.getSeconds() : time.getSeconds();
        return `${getFullYear}-${getMonth}-${getDate} ${getHours}:${getMinutes}:${getSeconds}`;
    };

    //time为时间格式，返回2018年19月10日 10时10分10秒的格式
    Vue.prototype.timeFormatFn1 = function(time){
        time = new Date(time);
        let getFullYear = time.getFullYear(),
            getMonth = time.getMonth()+1 < 10 ? '0'+(time.getMonth()+1) : time.getMonth()+1,
            getDate = time.getDate() < 10 ? '0'+time.getDate() : time.getDate(),
            getHours = time.getHours() < 10 ? '0'+time.getHours() : time.getHours(),
            getMinutes = time.getMinutes() < 10 ? '0'+time.getMinutes() : time.getMinutes(),
            getSeconds = time.getSeconds() < 10 ? '0'+time.getSeconds() : time.getSeconds();
        return `${getFullYear}年${getMonth}月${getDate}日 ${getHours}时${getMinutes}分${getSeconds}秒`;
    };

    //time为时间格式，返回2018-19-10的格式
    Vue.prototype.timeFormatFn2 = function(time){
        time = new Date(time);
        let getFullYear = time.getFullYear(),
            getMonth = time.getMonth()+1 < 10 ? '0'+(time.getMonth()+1) : time.getMonth()+1,
            getDate = time.getDate() < 10 ? '0'+time.getDate() : time.getDate();
        return `${getFullYear}-${getMonth}-${getDate}`;
    };

};
