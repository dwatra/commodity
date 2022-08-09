<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Services\SyncComGroupService;

class SyncCommodityJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $group_parent;
    public $group_parent_text;
    public $SyncComGroupService;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($group_parent, $group_parent_text)
    {
        $this->group_parent = $group_parent;
        $this->group_parent_text = $group_parent_text;
        $this->SyncComGroupService = new SyncComGroupService;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $this->SyncComGroupService->sync($this->group_parent, $this->group_parent_text);
    }
}
