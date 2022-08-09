<?php

namespace App\Repositories;

use App\Models\ComGroup;
use Illuminate\Support\Facades\DB;

class ComGroupRepository{

    public $model;

    public function __construct() {
        $this->model = new ComGroup();
    }

    public function getComGroup()
    {
        $data = $this->model::get();
        return $data;
    }

    public function getComGroupById($groupCode)
    {
        $data = $this->model::where('group_code',$groupCode)->first();
        return $data;
    }

    public function createComGroup( $collection = [] )
    {
        $data = $this->model::insert($collection);
        return $data;
    }

    public function insertBatchComGroup( $collection = [] )
    {
        $data = $this->model::insert($collection);
        return $data;
    }

    public function updateComGroup( $collection = [], $groupCode)
    {
        $data = $this->model::where('group_code',$groupCode)->update($collection);
        return $data;
    }

    public function deleteComGroup($groupCode)
    {
        if(is_array($groupCode)){
            $data = $this->model::whereIn('group_code',$groupCode)->delete();
        }else{
            $data = $this->model::where('group_code',$groupCode)->delete();
        }
        return $data;
    }

    public function deleteComGroupAll()
    {
        $data = $this->model::truncate();
        return $data;
    }

    public function getComGroupParent()
    {
        $data = $this->model::whereNull('group_parent')->orderBy('group_code','asc')->get();
        return $data;
    }

    public function getComGroupDataTable($type = "M", $parent = "")
    {
        $model = $this->model->selectRaw("com_group.group_code, com_group.group_name, com_group.group_parent, com_group.group_status, com_group.updated_datetime, com_group.group_code as code_group, com_group.group_name as name_group, com_group.group_type as type_group, (select c.group_name from com_group c where c.group_code = com_group.group_parent) as name_group_parent")
            ->where("com_group.group_type", $type)
            ->where("com_group.group_parent", $parent);
        $data = $model->orderBy('group_code','asc')->get();
        return $data;
    }

    public function getComGroupLevel($level = "", $type = "", $parent = "")
    {
        $model = $this->model->selectRaw("group_code, group_name, com_group.group_parent, group_status, updated_datetime, group_code as code_group, group_name as name_group, group_type as type_group, COALESCE(child.count, 0) AS child_count")
            ->leftJoin(DB::raw("(SELECT group_parent, COUNT ( group_code ) AS count FROM com_group GROUP BY group_parent) child"), 'child.group_parent', '=', 'com_group.group_code')
            ->where("com_group.group_type", $type);
        if(!empty($parent)){
            $model->where("com_group.group_parent", $parent);
        }else{
            $model->whereNull("com_group.group_parent");
        }

        if(!empty($level)){          
            $model->where(function($query) {
                $query->where("length(com_group.group_code)", $level*2)
                    ->orWhere("length(com_group.group_code)", ($level*2)+1);
            });
            if($level == 4){
                $model->orWhere("length(com_group.group_code)", ($level*2)+2);
            }
        }

        $data = $model->orderBy('group_code','asc')->get();
        return $data;
    }
}
