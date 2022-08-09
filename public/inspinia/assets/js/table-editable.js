(function($, window, document, undefined) {
    var pluginName = "editable",
      defaults = {
        keyboard: true,
        dblclick: true,
        button: true,
        buttonSelector: ".edit",
        maintainWidth: true,
        dropdowns: {},
        edit: function() {},
        save: function() {},
        cancel: function() {}
      };
  
    function editable(element, options) {
      this.element = element;
      this.options = $.extend({}, defaults, options);
  
      this._defaults = defaults;
      this._name = pluginName;
  
      this.init();
    }
  
    editable.prototype = {
      init: function() {
        this.editing = false;
  
        if (this.options.dblclick) {
          $(this.element)
            .css('cursor', 'pointer')
            .bind('dblclick', this.toggle.bind(this));
        }
  
        if (this.options.button) {
          $(this.options.buttonSelector, this.element)
            .bind('click', this.toggle.bind(this));
        }
      },
  
      toggle: function(e) {
        e.preventDefault();
  
        this.editing = !this.editing;
  
        if (this.editing) {
          this.edit();
        } else {
          this.save();
        }
      },
  
      edit: function() {
        var instance = this,
          values = {};
  
        $('td[data-field]', this.element).each(function() {
          var input,
            field = $(this).data('field'),
            value = $(this).text(),
            width = $(this).width();
  
          values[field] = value;
  
          $(this).empty();
  
          if (instance.options.maintainWidth) {
            $(this).width(width);
          }
  
          if (field in instance.options.dropdowns) {
            input = $('<select class="form-control selectpicker"></select>');
  
            for (var i = 0; i < instance.options.dropdowns[field].length; i++) {
              $('<option>/option>')
                .text(instance.options.dropdowns[field][i])
                .appendTo(input);
            };
  
            input.val(value)
              .data('old-value', value)
              .dblclick(instance._captureEvent);
          } else {
            input = $('<input type="text" class="form-control" />')
              .val(value)
              .data('old-value', value)
              .dblclick(instance._captureEvent);
          }
  
          input.appendTo(this);
  
          if (instance.options.keyboard) {
            input.keydown(instance._captureKey.bind(instance));
          }
        });
  
        this.options.edit.bind(this.element)(values);
      },
  
      save: function() {
        var instance = this,
          values = {};
  
        $('td[data-field]', this.element).each(function() {
          var value = $(':input', this).val();
  
          values[$(this).data('field')] = value;
  
          $(this).empty()
            .text(value);
        });
  
        this.options.save.bind(this.element)(values);
      },
  
      cancel: function() {
        var instance = this,
          values = {};
  
        $('td[data-field]', this.element).each(function() {
          var value = $(':input', this).data('old-value');
  
          values[$(this).data('field')] = value;
  
          $(this).empty()
            .text(value);
        });
  
        this.options.cancel.bind(this.element)(values);
      },
  
      _captureEvent: function(e) {
        e.stopPropagation();
      },
  
      _captureKey: function(e) {
        if (e.which === 13) {
          this.editing = false;
          this.save();
        } else if (e.which === 27) {
          this.editing = false;
          this.cancel();
        }
      }
    };
  
    $.fn[pluginName] = function(options) {
      return this.each(function() {
        if (!$.data(this, "plugin_" + pluginName)) {
          $.data(this, "plugin_" + pluginName,
            new editable(this, options));
        }
      });
    };
  
  })(jQuery, window, document);
  
  editTable();
  
  //custome editable starts
  function editTable(){
    
    $(function() {
    var pickers = {};
  
    $('table tr').editable({
      dropdowns: {
        posisi: ['PIC A', 'PIC B', 'PIC C']
      },
      edit: function(values) {
        $(".edit i", this)
          .removeClass('fa-edit')
          .addClass('fa-save')
          .attr('title', 'Save');
      },
      save: function(values) {
        $(".edit i", this)
          .removeClass('fa-save')
          .addClass('fa-edit')
          .attr('title', 'Edit');
      },
      cancel: function(values) {
        $(".edit i", this)
          .removeClass('fa-save')
          .addClass('fa-edit')
          .attr('title', 'Edit');
      }
    });
  });
    
  }
  
  $(".add-row").click(function(){
    $("#editableTable").find("tbody tr.no-records-found").hide();
    $("#editableTable").find("tbody tr:first")
        .before(
            "<tr>" +
                "<td class='align-top' data-field='aksi'>" +
                    "<button class='btn btn-xs btn-outline-primary button button-small mr-1' title='Edit'>" +
                        "<i class='fa fa-edit'></i>"+
                    "</button>" +
                    "<button class='btn btn-xs btn-outline-danger button button-small' title='Delete'>"+
                        "<i class='fa fa-trash'></i>" +
                    "</button>" +
                "</td>" +
                "<td class='align-top' data-field='detail'>" + 
                    "<div class='row'>" +
                        "<div class='col-xl-6 pr-0'>" +
                            "<div class=form-group row mb-2'>"+
                                "<label class='col-md-12 col-xs-12 label-style mb-0 p-0'>Kode Komoditi</label>" +
                                "<div class='col-md-12 col-xs-12 p-0'>" +
                                    "<input type='text' class='form-control-plaintext pt-0 pb-0' readonly disabled value='1010000007'/>" +
                                "</div>" +
                            "</div>" +
                            "<div class=form-group row mb-2'>"+
                                "<label class='col-md-12 col-xs-12 label-style mb-0 p-0'>Tipe</label>" +
                                "<div class='col-md-12 col-xs-12 p-0'>" +
                                    "<input type='text' class='form-control-plaintext pt-0 pb-0' readonly disabled value='Barang'/>" +
                                "</div>" +
                            "</div>" +
                            "<div class=form-group row mb-2'>"+
                                "<label class='col-md-12 col-xs-12 label-style mb-0 p-0'>Item</label>" +
                                "<div class='col-md-12 col-xs-12 p-0'>" +
                                    "<input type='text' class='form-control-plaintext pt-0 pb-0' readonly disabled value='Dell Inspiron 7400'/>" +
                                "</div>" +
                            "</div>" +
                        "</div>" +
                        "<div class='col-xl-6 pl-0'>" +
                            "<div class=form-group row mb-2'>"+
                                "<label class='col-md-12 col-xs-12 label-style mb-0 p-0'>Jumlah</label>" +
                                "<div class='col-md-12 col-xs-12 p-0 pr-2'>" +
                                    "<input type='text' class='form-control pt-0 pb-0' value='1,00'/>" +
                                "</div>" +
                            "</div>" +
                            "<div class=form-group row mb-2'>"+
                                "<label class='col-md-12 col-xs-12 label-style mb-0 p-0'>Satuan</label>" +
                                "<div class='col-md-12 col-xs-12 p-0 pr-2'>" +
                                    "<input type='text' class='form-control pt-0 pb-0' value='Unit'/>" +
                                "</div>" +
                            "</div>" +
                            "<div class=form-group row mb-2'>"+
                                "<label class='col-md-12 col-xs-12 label-style mb-0 p-0'>Harga Satuan (Sebelum PPN)</label>" +
                                "<div class='col-md-12 col-xs-12 p-0 pr-2'>" +
                                    "<input type='text' class='form-control pt-0 pb-0 text-right' value='20.000.000,00'/>" +
                                "</div>" +
                            "</div>" +
                        "</div>" +
                    "</div>" + 
                "</td>" +
                "<td class='align-top' data-field='order'>" + 
                    "<div class=form-group row mb-2'>"+
                        "<label class='col-md-12 col-xs-12 label-style mb-0 p-0'>Order Minimum</label>" +
                        "<div class='col-md-12 col-xs-12 p-0'>" +
                            "<input type='text' class='form-control pt-0 pb-0' value='1,00'/>" +
                        "</div>" +
                    "</div>" +
                    "<div class=form-group row mb-2'>"+
                        "<label class='col-md-12 col-xs-12 label-style mb-0 p-0'>Order Maksimum</label>" +
                        "<div class='col-md-12 col-xs-12 p-0'>" +
                            "<input type='text' class='form-control pt-0 pb-0' value='1,00'/>" +
                        "</div>" +
                    "</div>" +
                    "<div class=form-group row mb-2'>"+
                        "<label class='col-md-12 col-xs-12 label-style mb-0 p-0'>Delivery Time</label>" +
                        "<div class='col-md-12 col-xs-12 p-0'>" +
                            "<div class='input-group mb-3'>" +
                                "<input type='text' class='form-control' aria-describedby='basic-addon2'>" +
                                "<div class='input-group-append'>" +
                                    "<span class='input-group-text' id='basic-addon2'>Hari</span>" +
                                "</div>" +
                            "</div>" +
                        "</div>" +
                    "</div>" +
                "</td>" +
                "<td class='align-bottom text-right'>" + 
                    "<h5>Rp 12.000.000,00</h5>" +
                "</td>" +
            "</tr>"
        );   
    editTable();  
    setTimeout(function(){   
      $("#editableTable").find("tbody tr:first td:last button[title='Edit']").click(); 
    }, 200); 
    
    setTimeout(function(){ 
      $("#editableTable").find("tbody tr:first td:first input[type='text']").focus();
        }, 300); 
    
    $("#editableTable").find("button[title='Delete']").unbind('click').click(function(e){
        swal({
            html: true,
            customClass: "modifiedSweetAlerts",
            title: "<span class='text-strong'></span>Are you sure?",
            text: "<strong class='text-strong'>There Rows</strong> will be disappear from Item List.",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#eb1c24",
            confirmButtonText: "Yes, delete it!",
            // closeOnConfirm: false
        }, function (isConfirm) {
            if (isConfirm) {
                var buttonRemove = $("button[title='Delete']");
                buttonRemove.closest("tr").remove();
            }
        });
    });
});
  
  function myFunction() {
      
  }
  
$("#editableTable").find("button[title='Delete']").click(function(e){  
    swal({
        html: true,
        customClass: "modifiedSweetAlerts",
        title: "<span class='text-strong'></span>Are you sure?",
        text: "<strong class='text-strong'>There Rows</strong> will be disappear from Item List.",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#eb1c24",
        confirmButtonText: "Yes, delete it!",
        // closeOnConfirm: false
    }, function (isConfirm) {
        if (isConfirm) {
            var buttonRemove = $("button[title='Delete']");
            buttonRemove.closest("tr").remove();
        }
    });
});

// 2
$(".add-row-peserta").click(function(){
  $("#editableTable2").find("tbody tr.no-records-found").hide();
  $("#editableTable2").find("tbody tr:first")
    .before(
      "<tr>"+
          "<td><input type='text' class='form-control' value='Kisaki' disabled /></td>"+
          "<td>"+
              "<select class='form-control selectpicker'>" +
                "<option selected>PIC A</option>"+
                "<option>PIC B</option>"+
                "<option>PIC C</option>"+
              "</select>"+
          "</td>"+
          "<td><input type='text' class='form-control' value='Logistik' disabled /></td>"+
          "<td>"+
              "<button type='button' class='btn btn-xs btn-outline-primary button button-small mr-1 edit' title='Edit'>"+
                  "<i class='fa fa-edit'></i>"+
              "</button>"+
              "<button type='button' class='btn btn-xs btn-outline-danger button button-small mr-1' title='Delete'>"+
                  "<i class='fa fa-trash'></i>"+
              "</button>"+
          "</td>"+
      "</tr>"
    );   
  editTable();  
  setTimeout(function(){   
    $("#editableTable2").find("tbody tr:first td:last button[title='Edit']").click(); 
  }, 200); 
  
   $("#editableTable2").find("button[title='Delete']").unbind('click').click(function(e){
        swal({
          html: true,
          customClass: "modifiedSweetAlerts",
          title: "<span class='text-strong'></span>Are you sure?",
          text: "<strong class='text-strong'>There Rows</strong> will be disappear from Item List.",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#eb1c24",
          confirmButtonText: "Yes, delete it!",
          // closeOnConfirm: false
      }, function (isConfirm) {
          if (isConfirm) {
              var buttonRemove = $("button[title='Delete']");
              buttonRemove.closest("tr").remove();
          }
      });
    });
   
});

function myFunction() {
    
}

$("#editableTable2").find("button[title='Delete']").click(function(e){  
    swal({
      html: true,
      customClass: "modifiedSweetAlerts",
      title: "<span class='text-strong'></span>Are you sure?",
      text: "<strong class='text-strong'>There Rows</strong> will be disappear from Item List.",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#eb1c24",
      confirmButtonText: "Yes, delete it!",
      // closeOnConfirm: false
  }, function (isConfirm) {
      if (isConfirm) {
          var buttonRemove = $("button[title='Delete']");
          buttonRemove.closest("tr").remove();
      }
  });
});