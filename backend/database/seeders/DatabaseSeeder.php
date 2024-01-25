<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Brand;
use App\Models\Category;
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

        // Brand::create([
        //     'name' => 'Lenovo',
        //     'image_url' => 'https://logodownload.org/wp-content/uploads/2014/09/lenovo-logo-0.png'
        // ]);

        // Brand::create([
        //     'name' => 'Apple',
        //     'image_url' => 'https://www.tailorbrands.com/wp-content/uploads/2021/01/apple_logo_1988.jpg'
        // ]);

        // Category::create([

        //     'label' => 'Computadores',
        //     'value' => 'computers',
        // ]);
        // Category::create([

        //     'label' => 'Notebooks',
        //     'value' => 'laptops',
        // ]);
        // Category::create([

        //     'label' => 'Celulares',
        //     'value' => 'phones',
        // ]);
        // Category::create([

        //     'label' => 'TVs',
        //     'value' => 'tvs',
        // ]);
        // Category::create([

        //     'label' => 'Câmeras',
        //     'value' => 'cameras',
        // ]);



        $product1 = new Product();
        $product1->create([
            "id" => Str::uuid(),
            "name" => 'Apple iMac 27"',
            "description" => "iMac performance is at an all-time high with tenth-generation Intel Core processors, powerful AMD Radeon Pro 5000 series graphics, ultrafast SSD storage, Thunderbolt 3 (USB-C) connectivity. And it all comes to life on a stunning 27-inch Retina 5K display with one billion colors and 500 nits of brightness that delivers vibrant images and razor-sharp text.",
            "category_id" => 1,
            "brand_id" => 2,
            "price" =>  10000,
            "image_url" => 'https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg'
        ])->product_images()->saveMany([
            new ProductImages(['image_name' => 'usb_external_hard2_drive2', 'image_url' => 'https://www.lifewire.com/thmb/iYN2TE_OJ5uYqsdd8gsQhStgzs8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/usb-3-0-cable-56a6fa1c3df78cf772913c6b.jpg'])

        ]);
    }
}
