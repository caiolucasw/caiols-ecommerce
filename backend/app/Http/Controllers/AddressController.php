<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Address;
use Illuminate\Http\Request;

class AddressController extends Controller
{
    //

    public function getUserAddress() {
        $user = auth()->user();
        if (!isset($user)) return;

        $addresses = Address::where('user_id', '=',$user->id)->get();
        return response()->json($addresses);
    }

    public function createUserAddress(Request $request) {

        $validated = $request->validate([
            'person_name' => 'required|max:255|min:2',
            'last_name' => 'max:255|min:2',
            'zip_code' => 'required|max:8|min:8',
            'street' => 'required|max:255',
            'number' => 'required|max:20',
            'district' => 'required|max:255',
            'city' => 'required|max:255',
            'state' => 'required|max:2|min:2'
        ]);

        $user = auth()->user();

        $allAddressInfo = array_merge($request->all(), ['user_id' => $user->id]);

        $address = Address::create($allAddressInfo);

        return response()->json($address);
        


    }

    public function updateUserAddress(Request $request, string $id) {

        $validated = $request->validate([
            'person_name' => 'required|max:255|min:2',
            'last_name' => 'max:255|min:2',
            'zip_code' => 'required|max:8|min:8',
            'street' => 'required|max:255',
            'number' => 'required|max:20',
            'district' => 'required|max:255',
            'city' => 'required|max:255',
            'state' => 'required|max:2|min:2'
        ]);

        $user = auth()->user();


        $addressUpdatedId = Address::where('id', '=', $id)->where('user_id', '=', $user->id)->update($request->all());
        if ($id === $addressUpdatedId) {
            $address = Address::where('id', '=', $id)->where('user_id', '=', $user->id)->first();
            return response()->json($address);
        }

        return response(404);
        


    }

    public function deleteUserAddress(Request $request, string $id) {
        $user = auth()->user();

        $addressDeleted = Address::where('id', '=', $id)->where('user_id', '=', $user->id)->delete();

        if ($addressDeleted > 0) {
            return response()->json(['deleted' => $addressDeleted]);
        }

        return response(404);
       
        


    }
}
