<?php
namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Services\SyncComGroupService;
use App\Jobs\SyncCommodityJob;
use Adw\Http\Response;
use Illuminate\Http\Request;

class SyncComGroupController extends Controller
{
    public $SyncComGroupService;

    public function __construct()
    {
        $this->SyncComGroupService = new SyncComGroupService;
    }

    public function sync(Request $request){
        try {
            SyncCommodityJob::dispatch($request->group_parent, $request->group_parent_text);
            return Response::success(null, 'Success sync commodity group');
        } catch (FailDBException $e) {
            return Response::error($e->getMessage());
        } catch (\Exception $e) {
            return Response::error($e->getMessage());
        }
    }
}
