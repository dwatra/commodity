$(document).ready(function() {
    $(".selectpicker-pengiriman").select2({
        theme: 'bootstrap4',
        placeholder: "Pilih Jasa Pengiriman",
        allowClear: true
    });
    $(".selectpicker-alamat").select2({
        theme: 'bootstrap4',
        placeholder: "Pilih Alamat Pengiriman",
        allowClear: true
    });             
    $(".selectpicker-aksi").select2({
        theme: 'bootstrap4',
        placeholder: "Pilih Aksi",
        allowClear: true
    });
    $(".selectpicker").select2({
        theme: 'bootstrap4',
        allowClear: true
    });
    $(".selectpicker-only").select2({
        theme: 'bootstrap4',
    });
});