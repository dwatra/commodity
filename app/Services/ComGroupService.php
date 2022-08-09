<?php

namespace App\Services;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Adw\Exceptions\FailDBException;
use Adw\Exceptions\InvalidFormException;
use App\Repositories\ComGroupRepository;
use Adw\Http\Response;

class ComGroupService
{
    protected $comGroupRepository,
    $ruleSync = [
        'group_parent'  => 'required',
        'group_parent_text'  => 'required'
    ];

    public function __construct()
    {
        $this->comGroupRepository = new ComGroupRepository;
    }

    public function index(){
        $data = $this->comGroupRepository->getComGroup();
        return $data;
    }

    public function detail($groupCode){
        $data = $this->comGroupRepository->getComGroupById($groupCode);
        return $data;
    }

    public function getParent(){
        $data = $this->comGroupRepository->getComGroupParent();
        return $data;
    }

    public function getDataTable($type = "", $parent = ""){
        $data = $this->comGroupRepository->getComGroupDataTable($type, $parent);
        return $data;
    }

    public function getLevel($level = "", $type = "", $parent = ""){
        $data = $this->comGroupRepository->getComGroupLevel($level, $type, $parent);
        return $data;
    }
}
