<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;

use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;
use Ramsey\Uuid\Uuid;
use File;


class AuthController extends Controller
{

    public function redirectToProvider($provider)
    {
        return Socialite::driver($provider)->redirect();
    }

    /**
     * Obtain the user information from provider.  Check if the user already exists in our
     * database by looking up their provider_id in the database.
     * If the user exists, log them in. Otherwise, create a new user then log them in. After that
     * redirect them to the authenticated users homepage.
     *
     * @return Response
     */
    public function handleProviderCallback($provider)
    {
        $user = Socialite::driver($provider)->stateless()->user();
        $authUser = $this->findOrCreateUser($user, $provider);
        Auth::login($authUser, true);
        // return redirect('/user');

        if (is_null($authUser->password)) {
            return redirect('sociallogin');
        } else {

            if (session()->exists('prev_url')) {
                $temp = session('prev_url');
                session()->forget('prev_url');
                return redirect()->route('login');;
            } else {
                return redirect()->intended('/');
            }
        }
    }

    /**
     * If a user has registered before using social auth, return the user
     * else, create a new user object.
     * @param  $user Socialite user object
     * @param $provider Social auth provider
     * @return  User
     */

    public function findOrCreateUser($user, $provider)
    {

        $authUser = User::where('email', $user->email)->first();
        if ($authUser) {
            return $authUser;
        } else {

            $uuid = Uuid::uuid1()->getHex();

            if ($user->avatar != null) {
                $image = file_get_contents($user->avatar);
                $name =  $uuid . ".png";
                $image_path = "uploads/img/profile_picture/";
                // File::put(public_path('assets/' . $image_path . $name), $image);
            }

            // Restricts it to only 2 values, for names like Billy Bob Jones
            $splitName = explode(' ', $user->name, 2);

            $first_name = $splitName[0];
            // If last name doesn't exist, make it empty
            $last_name = !empty($splitName[1]) ? $splitName[1] : '';

            // print_r($first_name);
            // print_r("then");

            // print_r($last_name);
            // dd($user->user['family_name']);


            $data = User::create([
                'id'       => $uuid,
                'name'     => $user->name,
                'first_name'     => $first_name,
                'last_name'     =>  $last_name,
                'email'    => !empty($user->email) ? $user->email : '',
                'provider' => $provider,
                'img_path' => $image_path . $name,
                'provider_id' => $user->id
            ]);

            return $data;
        }
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect(url(''));
    }
}
