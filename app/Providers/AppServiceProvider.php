<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Adw\Auth\Config;
use Adw\PDC\Config as configPDC;
use Adw\Theme\Config as ConfigTheme;
use Illuminate\Support\Facades\URL;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        // URL::forceScheme('https');        
        if ($this->app->environment('local')) {
            
        }
        
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {        
        Config::setConfig([
            'defaultLoginPageUrl' => config('param.default_login_page_url'),
            'baseUrlUserService' => config('param.user_service_base_url')
        ]);
        
        ConfigTheme::setConfig(['header' => [
                'profileUrl' => config('param.user_portal_base_url').'profile',
                'changePasswordUrl' => config('param.user_portal_base_url').'change-password',
                'logoutUrl' => config('param.user_portal_base_url').'logout'
            ]
        ]);

        configPDC::setConfig([
            'baseUrlPDC' => config('param.pdc_base_url')
        ]);
    }
}
