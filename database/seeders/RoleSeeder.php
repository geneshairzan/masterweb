<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use DB;


class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('users_role')->insert([
            'role_name' => 'admin',
            'id' => 9,

        ]);

        DB::table('users_role')->insert([
            'role_name' => 'user',
            'id' => 1,

        ]);

        DB::table('users_role')->insert([
            'role_name' => 'vendor',
            'id' => 2,

        ]);
    }
}
