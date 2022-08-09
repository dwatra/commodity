<?php

namespace Adw\AdwWorker;

use Adw\AdwWorker\Jobs\SyncCommodity;
use Adw\AdwWorker\Models\ComGroup_m;
use Illuminate\Http\Request;

class Worker
{
    public function commodity(Request $request)
    {
        SyncCommodity::dispatch($request->group_parent, $request->group_parent_text);
    }
}