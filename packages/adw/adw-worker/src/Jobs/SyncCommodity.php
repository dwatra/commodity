<?php

namespace Adw\AdwWorker\Jobs;

use Illuminate\Support\Facades\Validator;
use Adw\Exceptions\FailDBException;
use Adw\Exceptions\InvalidFormException;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Services\SyncComGroupService;
use Illuminate\Support\Facades\DB;
use Adw\AdwWorker\Models\ComGroup_m;
use Adw\Http\Response;
use Adw\PDC\ComGroup;

class SyncCommodity implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $group_parent;
    public $group_parent_text;
    public $ruleSync = [
        'group_parent'  => 'required',
        'group_parent_text'  => 'required'
    ];

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($group_parent, $group_parent_text)
    {
        $this->group_parent = $group_parent;
        $this->group_parent_text = $group_parent_text;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $data = ['group_parent' => $this->group_parent, 'group_parent_text' => $this->group_parent_text];
        $validator = Validator::make($data, $this->ruleSync);
        if ($validator->fails()) {
            $error='';
            foreach($validator->errors()->all() as $key => $value){
                $error.=$value;
            }
            throw new InvalidFormException($error);
        }
        ini_set('max_execution_time', 1000);
        $parentGroupCode = $data['group_parent'];
        $comGroupPDC = new ComGroup;
        $dataComGroupPDC = $comGroupPDC->getComGroup('B637C201-5F02-49EC-8167-FA6273FDA583', $parentGroupCode);
        DB::beginTransaction();
        try {
            $limit = 1000;
            $record_com_group = [];
            if ($dataComGroupPDC->resultMessage == 'Ok') {
                // INSERT GROUP PARENT
                $exist = ComGroup_m::where('group_code',$parentGroupCode)->first();
                if(empty($exist)){
                    $data_parent = array(
                        'group_code' => $data['group_parent'],
                        'group_name' => $data['group_parent_text'],
                        'group_parent' => '',
                        'group_status' => 'A',
                        'group_type' => ($data['group_parent'] == 'J' ? 'S' : 'M'),
                        'updated_datetime' => date('Y-m-d H:i:s')
                    );
                    ComGroup_m::insert($data_parent);
                }
                // END INSERT GROUP PARENT
                foreach ($dataComGroupPDC->data->listData as $key => $group) {
                    $group_code = str_replace('.', '', $group->groupCode);
                    $group_parent = str_replace('.', '', $group->comGroupParent);
                    if (!$group_parent && $group_code == $parentGroupCode) {
                        $record_com_group[] = [
                            'group_code' => $group_code,
                            'group_name' => trim($group->groupName),
                            'group_parent' => $group_parent,
                            'group_status' => 'A',
                            'group_type' => ($group_code == 'J' ? 'S' : 'M'),
                            'updated_datetime' => date('Y-m-d H:i:s')
                        ];
                    }
                    $result_commodity_group_by_parent[$group_parent][$group_code] = [
                        'group_code' => $group_code,
                        'group_name' => trim($group->groupName),
                        'group_parent' => $group_parent,
                        'group_status' => 'A',
                        'group_type' => ($group_code == 'J' ? 'S' : 'M'),
                        'updated_datetime' => date('Y-m-d H:i:s')
                    ];
                }//echo '<pre>';print_r($result_commodity_group_by_parent);exit;
                $is_service = FALSE;
                if ($parentGroupCode == 'J') {
                    $is_service = TRUE;
                }
                if (isset($result_commodity_group_by_parent[$parentGroupCode])) {
                    $record_com_group = array_merge($record_com_group, $this->_set_com_group($result_commodity_group_by_parent[$parentGroupCode], $result_commodity_group_by_parent, $is_service));
                }
            }
            if ($record_com_group) {
                $record_group_code = [];
                foreach ($record_com_group as $com_group) {
                    $record_group_code[] = $com_group['group_code'];
                }
                if ($record_group_code) {
                    foreach (array_chunk($record_group_code, $limit) as $group_code) {
                        ComGroup_m::whereIn('group_code',$group_code)->delete();
                    }
                }
                foreach (array_chunk($record_com_group, $limit) as $com_group) {
                    ComGroup_m::insert($com_group);
                }
            }
            DB::commit();
            return Response::success('Sync Success', Response::HTTP_OK);
        } catch (\Exception $e) {
            DB::rollback();
            throw new FailDBException("Sync Failed: ".$e);
        }
    }

    private function _set_com_group($parent_result, $result, $is_service = false, $counting = 1) {
        if ($counting == 999999) {
            exit;
        }
        $final_result = $parent_result;//echo '<pre>';print_r($parent_result);exit;
        if ($parent_result) {
            if ($is_service) {
                foreach ($parent_result as $group_code => $group) {
                    $final_result[$group_code]['group_type'] = 'S';
                }
            }
            foreach ($parent_result as $group_code => $group) {
                if (isset($result[$group_code])) {
                    $final_result = array_merge($final_result, $this->_set_com_group($result[$group_code], $result, $is_service, $counting++));
                }
            }
        }
        return $final_result;
    }
}
