$(document).ready(function() {
    $('.btn-number').click(function(e){
        e.preventDefault();
        fieldName = $(this).attr('data-field');
        type      = $(this).attr('data-type');
        var input = $("input[name='"+fieldName+"']");
        var currentVal = parseInt(input.val());
        if (!isNaN(currentVal)) {
            if(type == 'minus') {
                if(currentVal > input.attr('min')) {
                    input.val(currentVal - 1).change();
                } 
                if(parseInt(input.val()) == input.attr('min')) {
                    $(this).attr('disabled', true);
                }
            } else if(type == 'plus') {
                if(currentVal < input.attr('max')) {
                    input.val(currentVal + 1).change();
                }
                if(parseInt(input.val()) == input.attr('max')) {
                    $(this).attr('disabled', true);
                }
            }
        } else {
            input.val(0);
        }
    });
    $('.input-number').focusin(function(){
       $(this).data('oldValue', $(this).val());
    });
    $('.input-number').change(function() {
        minValue =  parseInt($(this).attr('min'));
        maxValue =  parseInt($(this).attr('max'));
        valueCurrent = parseInt($(this).val());
        name = $(this).attr('name');
        if(valueCurrent >= minValue) {
            $(".btn-number[data-type='minus'][data-field='"+name+"']").removeAttr('disabled')
        } else {
            alert('Sorry, the minimum value was reached');
            $(this).val($(this).data('oldValue'));
        }
        if(valueCurrent <= maxValue) {
            $(".btn-number[data-type='plus'][data-field='"+name+"']").removeAttr('disabled')
        } else {
            alert('Sorry, the maximum value was reached');
            $(this).val($(this).data('oldValue'));
        }
    });
    $(".input-number").keydown(function (e) {
            if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 190]) !== -1 ||
                (e.keyCode == 65 && e.ctrlKey === true) || 
                (e.keyCode >= 35 && e.keyCode <= 39)) {
                     return;
            }
            if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                e.preventDefault();
            }
    });
    let toast = $('.toast');
    $('#add-to-cart, #nego-add-to-cart, #nego-final-add-to-cart, #chatting-add-to-cart').click(function () {
        toast.toast({
            delay: 4000,
            animation: true
        });
        toast.toast('show');
        var $el = $('.cart-notification').addClass('pulsate-notif-cart');
        setTimeout(function() {
            $el.removeClass('pulsate-notif-cart');
        }, 4000);
    });
    $('.carousel').carousel('pause');
    $('.remove-item').click(function () {
        swal({
            html: true,
            customClass:"modifiedSweetAlerts",
            title: "<span class='text-strong'></span>Are you sure?",
            text: "<strong class='text-strong'>Dummy Masker N95</strong> will be disappear from Carts.",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#eb1c24",
            confirmButtonText: "Yes, delete it!",
            closeOnConfirm: false
        }, function () {
            swal({
                html: true,
                customClass:"modifiedSweetAlerts",
                title: "<span class='text-strong'>Deleted!</span>",
                text: "<strong class='text-strong'>Dummy Masker N95</strong> has been deleted.",
                type: "success",
                confirmButtonColor: "#005db5",
            })
        });
    });
    $('.custom-file-input').on('change', function() {
        let fileName = $(this).val().split('\\').pop();
        $(this).next('.custom-file-label').addClass("selected").html(fileName);
    }); 
});
