<?php

require 'vendor/autoload.php';

Flight::route('POST /add', function () {
    $data = Flight::request()->data;

    $db = new mysqli("localhost", "root", "axell", "siomai_king"); // Change to your actual DB name

    $stmt = $db->prepare("INSERT INTO menu_items (name, price) VALUES (?, ?)");
    $stmt->bind_param("sd", $data->name, $data->price);
    $stmt->execute();

    Flight::json(["message" => "Item added successfully"]);
});

Flight::start();
