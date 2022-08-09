$(function() {
    $('body').buildForm();
    $.extend(true, $.fn.dataTable.defaults, {
        initComplete : function() {
            $('[data-toggle="tooltip"]', this).tooltip();
        }
    });
});

$.fn.buildForm = function() {
    $.fn.modal.Constructor.prototype.enforceFocus = function() {};
    $.each(this, function(key, elem) {
        $('[data-input-type="select2"]', elem).each(function(key, elem) {
            var containerCssClass = '';
            if ($(elem).hasClass('form-control-sm')) {
                containerCssClass = 'select2-sm';
            }
            if ($(elem).parents('.dataTables_filter').length == 0) {
                $(elem).css('width', '100%');
            }
            if ($(elem).parents('.bootbox.modal').length == 1) {
                $(elem).select2({
                    theme: 'bootstrap4',
                    dropdownParent: $('.bootbox.modal'),
                    containerCssClass: containerCssClass,
                    dropdownAutoWidth: true
                });
            } else if ($(elem).parents('.modal').length == 1) {
                $(elem).select2({
                    theme: 'bootstrap4',
                    dropdownParent: $('.modal'),
                    containerCssClass: containerCssClass,
                    dropdownAutoWidth: true
                });
            } else {
                $(elem).select2({
                    theme: 'bootstrap4',
                    containerCssClass: containerCssClass,
                    dropdownAutoWidth: true
                });
            }
        });
        
        $('[data-input-type="autonumeric"]', elem).each(function(key, elem) {
            var thousandSeparator = formatterConfig.thousandSeparator;
            if ($(elem).data('thousand-separator') != undefined) {
                if ($(elem).data('thousand-separator') == false) {
                    thousandSeparator = '';
                } else {
                    thousandSeparator = $(elem).data('thousand-separator');
                    if (thousandSeparator === true) {
                        thousandSeparator = formatterConfig.thousandSeparator;
                    }
                }
            }
            var decimalSeparator = formatterConfig.decimalSeparator;
            if ($(elem).data('decimal-separator') != undefined) {
                if ($(elem).data('decimal-separator') == false) {
                    decimalSeparator = false;
                } else {
                    decimalSeparator = $(elem).data('decimal-separator');
                    if (decimalSeparator === true) {
                        decimalSeparator = formatterConfig.decimalSeparator;
                    }
                }
            }
            var precision = formatterConfig.decimalPrecision;
            if ($(elem).data('precision') != undefined ) {
                precision = parseInt($(elem).data('precision'));
            }
            new AutoNumeric(elem, {
                digitGroupSeparator: thousandSeparator,
                decimalCharacter: decimalSeparator,
                decimalCharacterAlternative: thousandSeparator,
                decimalPlaces: precision,
                minimumValue: formatterConfig.autoNumericMin,
                maximumValue: formatterConfig.autoNumericMax
            });
        });
        
        $('[data-input-type="datepicker"]', elem).each(function(key, elem) {
            if ($(elem).data('end-date')) {
                var endDate = new Date($(elem).data('end-date'));
            } else {
                var endDate = false;
            }

            $(elem).datepicker({
                format : formatterConfig['datepickerFormat'],
                endDate : endDate,
                enableOnReadonly : false
            });
        });
        
        $('[data-input-type="clockpicker"]', elem).each(function(key, elem) {
            $(elem).clockpicker({
                autoclose: true
            });
        });
    });
}

var Formatter = {
    date : function(date, format) {
        var timestamp = new Date(date);
        var d = ('00'+(timestamp.getDate()));
        d = d.substring(d.length-2, d.length);
        var m = ('00'+(timestamp.getMonth()+1));
        m = m.substring(m.length-2, m.length);
        var Y = timestamp.getFullYear();
        if (!format) {
            format = formatterConfig.formatDate;
        }
        format = format.replace('{d}', d);
        format = format.replace('{m}', m);
        format = format.replace('{Y}', Y);
        return format;
    },
    time : function(date, format) {
        var timestamp = new Date(date);
        var H = ('00'+timestamp.getHours());
        H = H.substring(H.length-2, H.length);
        var i = ('00'+timestamp.getMinutes()).substring(-2);
        i = i.substring(i.length-2, i.length);
        var s = ('00'+timestamp.getSeconds()).substring(-2);
        s = s.substring(s.length-2, s.length);
        if (!format) {
            format = formatterConfig.formatTime;
        }
        format = format.replace('{H}', H);
        format = format.replace('{i}', i);
        format = format.replace('{s}', s);
        return format;
    },
    dateTime : function(date, format) {
        var timestamp = new Date(date);
        var d = ('00'+timestamp.getDate());
        d = d.substring(d.length-2, d.length);
        var m = ('00'+(timestamp.getMonth()+1));
        m = m.substring(m.length-2, m.length);
        var Y = timestamp.getFullYear();
        var H = ('00'+timestamp.getHours());
        H = H.substring(H.length-2, H.length);
        var i = ('00'+timestamp.getMinutes()).substring(-2);
        i = i.substring(i.length-2, i.length);
        var s = ('00'+timestamp.getSeconds()).substring(-2);
        s = s.substring(s.length-2, s.length);
        if (!format) {
            format = formatterConfig.formatDateTime;
        }
        format = format.replace('{d}', d);
        format = format.replace('{m}', m);
        format = format.replace('{Y}', Y);
        format = format.replace('{H}', H);
        format = format.replace('{i}', i);
        format = format.replace('{s}', s);
        return format;
    },
    humanDate : function(date, format) {
        var timestamp = new Date(date);
        var d = ('00'+timestamp.getDate());
        d = d.substring(d.length-2, d.length);
        var m = ('00'+(timestamp.getMonth()+1));
        m = m.substring(m.length-2, m.length);
        m = lang['month_'+m];
        var Y = timestamp.getFullYear();
        var H = ('00'+timestamp.getHours());
        H = H.substring(H.length-2, H.length);
        var i = ('00'+timestamp.getMinutes()).substring(-2);
        i = i.substring(i.length-2, i.length);
        var s = ('00'+timestamp.getSeconds()).substring(-2);
        s = s.substring(s.length-2, s.length);
        var l = lang['day_'+timestamp.getDay()];
        if (!format) {
            format = formatterConfig.formatHumanDate;
        }
        format = format.replace('{d}', d);
        format = format.replace('{m}', m);
        format = format.replace('{Y}', Y);
        format = format.replace('{H}', H);
        format = format.replace('{i}', i);
        format = format.replace('{s}', s);
        format = format.replace('{l}', l);
        return format;
    },
    humanDateTime : function(date, format) {
        var timestamp = new Date(date);
        var d = ('00'+timestamp.getDate());
        d = d.substring(d.length-2, d.length);
        var m = ('00'+(timestamp.getMonth()+1));
        m = m.substring(m.length-2, m.length);
        m = lang['month_'+m];
        var Y = timestamp.getFullYear();
        var H = ('00'+timestamp.getHours());
        H = H.substring(H.length-2, H.length);
        var i = ('00'+timestamp.getMinutes()).substring(-2);
        i = i.substring(i.length-2, i.length);
        var s = ('00'+timestamp.getSeconds()).substring(-2);
        s = s.substring(s.length-2, s.length);
        var l = lang['day_'+timestamp.getDay()];
        if (!format) {
            format = formatterConfig.formatHumanDateTime;
        }
        format = format.replace('{d}', d);
        format = format.replace('{m}', m);
        format = format.replace('{Y}', Y);
        format = format.replace('{H}', H);
        format = format.replace('{i}', i);
        format = format.replace('{s}', s);
        format = format.replace('{l}', l);
        return format;
    },
    number : function(data, decimals, thousandSeparator, decimalSeparator) {
        if (typeof(thousandSeparator) == 'undefined') {
            thousandSeparator = formatterConfig.thousandSeparator;
        }

        if (typeof(decimalSeparator) == 'undefined') {
            decimalSeparator = formatterConfig.decimalSeparator;
        }

        if (typeof(decimals) == 'undefined') {
            decimals = formatterConfig.decimalPrecision;
        }
        data = parseFloat(data);
        if (!Number(data)) {
            data = 0;
        }
        data = $.number(data, decimals, decimalSeparator, thousandSeparator);
        return data;
    },
    numberValue : function(str, return_as_zero = true) {
        var parse = str.split(formatterConfig.decimalSeparator);
        var result = parse[0].split(formatterConfig.thousandSeparator).join('');
        if (!Number(str)) {
            if (parse[1]) {
                result += '.' + parse[1];
            }
            return parseFloat(result);
        } else {
            if (return_as_zero) {
                return 0;
            } else {
                return result;
            }
        }
    },
    toFloat: function(value) {
        value = parseFloat(value);
        if (Number(value)) {
            return 0;
        } else {
            return value;
        }
    },
    boolean : function(data, true_result, false_result) {
        if (data == 1 || data == 'true' || data == 't') {
            if (true_result) {
                return true_result;
            } else {
                return '<i class="fa fa-check text-success"></i>';
            }
        }

        if (data == 0 || data == 'false' || data == 'f') {
            if (true_result) {
                return false_result;
            } else {
                return '<i class="fa fa-times text-danger"></i>';
            }
        }
    }
}

function bootboxConfirm(msg, action) {
    bootbox.confirm({
        title: 'Confirmation',
        message: msg,        
        callback: function (result) {
            if (result) {
                if (typeof action === 'function') {
                    action();
                } else {
                    document.location.href=action;
                }
            }
        }
    });
}