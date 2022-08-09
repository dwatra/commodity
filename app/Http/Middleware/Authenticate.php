<?php

namespace App\Http\Middleware;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Closure;
use Adw\Auth\User;

class Authenticate
{
    public function handle(Request $request, Closure $next)
    {   try {
            if (!Auth::check()) {
                $user = new User();
                if ($user->authenticated()) {
                    $token = $user->getCookieToken();
                    if ($token) {
                        $user->setToken($token);
                        $userInfo = $user->info();
                        if (!Auth::loginUsingId($userInfo->id)) {
                            throw new \Exception('User not found');
                        }
                    } else {
                        throw new \Exception('Unknow Token');
                    }
                } else {
                    throw new \Exception('Unathorized');
                }            
            }
            return $next($request);
        } catch (\Exception $e) {echo $e;exit();
            return redirect()->to(config('param.default_login_page_url'));
        }
    }
}
