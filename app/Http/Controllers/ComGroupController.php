<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Services\ComGroupService;
use Illuminate\Http\Request;
use Adw\Http\Response;
use DataTables;

class ComGroupController extends Controller
{

    public function __construct()
    {
        $this->comGroupService = new ComGroupService;
    }

    public function index(Request $request){
        if($request->ajax()){
            $type = request('type');
            $parent = request('parent');
            $model = $this->comGroupService->getDataTable($type, $parent);
            return DataTables::of($model)
                ->make(true);
        }
        $title = 'Grup / Sub Grup';
        // dd(auth()->user());
        $dataParent = $this->comGroupService->getParent();
        return view('comGroup.index', compact('dataParent', 'title'));
    }

    public function getLevel(Request $request) {
        $get = $request->all();
        $level = (isset($get['level']) && !empty($get['level'])) ? $get['level'] : "";
        $type = (isset($get['type']) && !empty($get['type'])) ? $get['type'] : "M";
        $parent = (isset($get['parent']) && !empty($get['parent'])) ? $get['parent'] : "";
        $result = [];
        $com_group = $this->comGroupService->getLevel($level, $type, $parent);
        if ($com_group) {
            foreach ($com_group as $group) {
                $result[] = $group;
            }
        }

        if ($result) {
            $response = [
                'success' => TRUE,
                'data' => $result
            ];
        } else {
            $response = [
                'success' => FALSE,
                'data' => NULL
            ];
        }
        return response()->json($response,200);
    }
}
