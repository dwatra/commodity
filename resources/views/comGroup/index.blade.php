<?php // print_r($data); ?>
@extends('layout.main')

@section('title')
    {{ $title }}
@endsection

@section('breadcrumb')
    <li class="breadcrumb-item">
        <a>Commodity</a>
    </li>
    <li class="breadcrumb-item active">
        <strong>Grup</strong>
    </li>
@endsection

@section('action')
    <button class="btn btn-sm btn-outline-secondary expandcollapse float-right" id="expandCollapseAll">Expand/Collapse All Cards</button>
@endsection

@section('sidebarRight')
    <nav class="section-nav" id="taskList">
        <ul class="nav flex-column">
            <li class="nav-item"><a class="nav-link" href="#inputFormulir">Input Formulir</a></li>
            <li class="nav-item"><a class="nav-link" href="#komentar">Komentar</a></li>
        </ul>
    </nav>
@endsection

@section('content')
    <div class="wrapper wrapper-content animated fadeInRight scrollspybehavior">
        <div class="row">
            <div class="col-lg-12">
                <form class="form-horizontal ng-pristine ng-valid">
                    <div class="ibox float-e-margins" id="synchronizeData">
                        <div class="ibox-title">
                            <h5>Synchronize Data</h5>
                            <div class="ibox-tools">
                                <a class="collapse-link">
                                    <i class="fa fa-chevron-up"></i>
                                </a>
                                <a class="fullscreen-link">
                                    <i class="fa fa-expand"></i>
                                </a>
                            </div>
                        </div>
                        <div class="ibox-content">
                            <div class="form-group row">
                                <label class="col-md-1 offset-md-1 col-xs-12 label-style text-right-responsive">Parent</label>
                                <div class="col-md-9 col-xs-12">
                                    <div class="input-group mb-3">
                                        <select class="form-control" id="group_parent">
                                            <option value="A" data-name="Raw Materials, Chemicals, Paper, Fuel">A - Raw Materials, Chemicals, Paper, Fuel</option>
                                            <option value="B" data-name="Industrial Equipment & Tools">B - Industrial Equipment & Tools</option>
                                            <option value="C" data-name="Components & Supplies">C - Components & Supplies</option>
                                            <option value="D" data-name="Construction, Transportation & Facility Equipment & Supplies">D - Construction, Transportation & Facility Equipment & Supplies</option>
                                            <option value="E" data-name="Medical, Laboratory & Test Equipment & Supplies & Pharmaceuticals">E - Medical, Laboratory & Test Equipment & Supplies & Pharmaceuticals</option>
                                            <option value="F" data-name="Food, Cleaning & Service Industry Equipment & Supplies">F - Food, Cleaning & Service Industry Equipment & Supplies</option>
                                            <option value="G" data-name="Business, Communication & Technology Equipment & Supplies">G - Business, Communication & Technology Equipment & Supplies</option>
                                            <option value="H" data-name="Defense, Security & Safety Equipment & Supplies">H - Defense, Security & Safety Equipment & Supplies</option>
                                            <option value="I" data-name="Personal, Domestic & Consumer Equipment & Supplies">I - Personal, Domestic & Consumer Equipment & Supplies</option>
                                            <option value="J" data-name="Service">J - Service</option>
                                            <option value="Z" data-name="Covid-19">Z - Covid-19</option>
                                        </select>
                                        <div class="input-group-append">
                                            <button type="button" id="btn-synchronize" class="btn btn-primary"><span class="fa fa-refresh"></span> {{ __('app.synchronize') }}</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="ibox float-e-margins" id="inputData">
                        <div class="ibox-title">
                            <h5>Input Data</h5>
                            <div class="ibox-tools">
                                <a class="collapse-link">
                                    <i class="fa fa-chevron-up"></i>
                                </a>
                                <a class="fullscreen-link">
                                    <i class="fa fa-expand"></i>
                                </a>
                            </div>
                        </div>
                        <div class="ibox-content">
                            <div class="form-group row">
                                <label class="col-md-3 offset-md-1 col-xs-12 label-style text-right-responsive">Tipe</label>
                                <div class="col-md-6 col-xs-12">
                                    <select class="form-control" id="type">
                                        <option value="">Pilih</option>
                                        <option value="M">Material</option>
                                        <option value="S">Service</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-md-3 offset-md-1 col-xs-12 label-style text-right-responsive">Level 1</label>
                                <div class="col-md-6 col-xs-12">
                                    <select class="form-control" data-input-type="select2" id="level_1" onchange="loadParent(this, 1)">
                                        <option value="">Pilih</option>
                                        <?php foreach ($dataParent as $com_group) { ?>
                                            <option value="<?= $com_group->group_code ?>"><?= $com_group->group_code ?> - <?= $com_group->group_name ?></option>
                                        <?php } ?>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-md-3 offset-md-1 col-xs-12 label-style text-right-responsive">Level 2</label>
                                <div class="col-md-6 col-xs-12">
                                    <select class="form-control" data-input-type="select2" id="level_2" onchange="loadParent(this, 2)" disabled>
                                        <option value="">Pilih</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-md-3 offset-md-1 col-xs-12 label-style text-right-responsive">Level 3</label>
                                <div class="col-md-6 col-xs-12">
                                    <select class="form-control" data-input-type="select2" id="level_3" onchange="loadParent(this, 3)" disabled>
                                        <option value="">Pilih</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-md-3 offset-md-1 col-xs-12 label-style text-right-responsive">Level 4</label>
                                <div class="col-md-6 col-xs-12">
                                    <select class="form-control" data-input-type="select2" id="level_4" onchange="loadParent(this, 4)" disabled>
                                        <option value="">Pilih</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group row mt-4">
                                <div class="col-md-12">
                                    <table id="tableCom" class="no-filter right-action" data-search="true" data-pagination="true" data-detail-formatter="detailFormatter"
                                        data-response-handler="responseHandler" data-show-refresh="true" data-sort-order="asc" data-page-list="[5, 10, 25, 50, 100, ALL]" data-page-size="7">
                                        <thead>
                                            <tr>
                                                <th data-field="Kode" data-sortable="true">Kode</th>
                                                <th data-field="Sub Kategori" data-sortable="true">Sub Kategori</th>
                                                <th data-field="Kategori" data-sortable="true">Kategori</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table> 
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>


<div class="modal fade" id="loading" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-hidden="true" style="padding-top:10%; overflow-y:visible;">
    <div class="modal-dialog modal-m" style="width: 30%;">
        <div class="modal-content">
            <div class="modal-header">
                <h3 style="margin:0;">Synchronize</h3>
            </div>
            <div class="modal-body">
                <div class="progress progress-striped active" style="margin-bottom:0;">
                    <div class="progress-bar" style="width: 100%"></div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection

@section('js')
    <script>
        document.getElementById("commodity-menu").classList.add("active");
        document.getElementById("menu-datakomoditi").classList.add("active");
        document.getElementById("data-list-grup").classList.add("active");
    </script>
@endsection

@section('jsPage')
    <script>

        var $table = $('#tableCom');
        var dataTable;

        $(function () {

            $('#type').change(function () {
                loadType();
            });

            $('#type').val('');
            $('#level_1').html('<option value="">Pilih</option>').change();

            dataTable =  $('#tableCom').DataTable({
                serverSide: true,
                scrollX: true,
                ajax: '<?= url()->current() ?>?type=M',
                // autoWidth: false,
                pageLength: 10,
                columns:[
                    {data: 'group_code', name: 'group_code', render: function(data, key, row) {
                        html = '<b>'+row.group_code+'</b>';
                        return html;
                    }, width: '6%'},
                    {data: 'group_name', name:'group_name', class: 'nowrap', width: '47%'},
                    {data: 'name_group_parent', name: 'name_group_parent', class: 'nowrap', width: '47%'},
                ],
            });

            $('#btn-synchronize').click(function () {
                if (confirm('Apakah Anda yakin akan melakukan sinkron data?')) {
                    $('#loading').modal('show');
                    $('.modal-header h3').html('Synchronize ('+$('#group_parent option:selected').text()+')');
                    var text = $('#group_parent option:selected').attr('data-name');
                    var group_parent = $('#group_parent').val();
                    $.ajax({
                        url: '<?= url('commodity/sync-com-group') ?>?group_parent='+group_parent+'&group_parent_text='+text,
                        success: function (response) {
                            // if (response.success) {
                                toastr.success(response.message, 'Success');
                            // } else {
                            //     toastr.error('Failed sync Commodity!', 'Error');
                            // }
                            $('#loading').modal('hide');
                            setTimeout(function(){ location.reload(); }, 3000);
                        }
                    });
                }
            });

        });

        function loadDatatable(type, parent = '') {
            dataTable.ajax.url('<?= url()->current() ?>?type='+type+'&parent='+parent).load();
        }

        function loadType() {
            $.ajax({
                url: '<?= url('commodity/json/get-level-group') ?>?type='+$('#type').val(),
                type: "get",
                dataType: "json",
                success: function (response) {
                    $('#level_1').html('<option value="">Pilih</option>').change();
                    for (let i=2; i<=4; i++) {
                        $('#level_'+(i)).html('<option value="">Pilih</option>').prop('disabled', true).change();
                    }
                    if (response.success) {
                        $.each(response.data, function (index, row) {
                            $("#level_1").append("<option value='"+row.group_code+"'>"+row.group_code+" - "+row.group_name+"</option>");
                        });
                    }
                    loadDatatable($('#type').val());
                }
            });
        }
    
        function loadParent(parent, level) {
            var group_parent = '';
            if ($(parent).val()!==undefined) {
                group_parent = $(parent).val();
            }
            for (let i=(level+1); i<=4; i++) {
                $('#level_'+(i)).html('<option value="">Pilih</option>').prop('disabled', true);
            }
            if (group_parent !== '') {
                $.ajax({
                    url: '<?= url('commodity/json/get-level-group') ?>?type='+$('#type').val()+'&parent='+group_parent,
                    success: function (response) {
                        var html = '';
                        if (response.success) {
                            html += '<option value="">Pilih</option>';
                            $.each(response.data, function (i, row) {
                                html += '<option value="'+row.group_code+'">'+row.group_code+' - '+row.group_name+'</option>';
                            });
                            $('#level_'+(level+1)).html(html).prop('disabled', false);
                        }
                    }
                });
                var type = $('#type').val();
                loadDatatable(type, group_parent);
            }
        }
    </script>
@endsection