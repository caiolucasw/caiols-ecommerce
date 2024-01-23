<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;
use \App\Models\Product;
use \App\Models\ProductImages;
class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        $product1 = new Product();
        $product1->create([
            "id" => Str::uuid(),
            "name" => "WD 2TB Elements Portable External Hard Drive - USB 3.0 ",
            "description" => "USB 3.0 and USB 2.0 Compatibility Fast data transfers Improve PC Performance High Capacity; Compatibility Formatted NTFS for Windows 10, Windows 8.1, Windows 7; Reformatting may be required for other operating systems; Compatibility may vary depending on user’s hardware configuration and operating system",
            "brand" => "Lenovo",
            "category" =>"electronics",
            "price" =>  64.0,
            "image_url" => 'https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg'
        ])->product_images()->saveMany([
            new ProductImages(['image_name' => 'usb_external_hard2_drive2', 'image_url' => 'https://www.lifewire.com/thmb/iYN2TE_OJ5uYqsdd8gsQhStgzs8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/usb-3-0-cable-56a6fa1c3df78cf772913c6b.jpg'])

        ]);
    }
}
