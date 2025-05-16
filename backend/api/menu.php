<?php
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Origin: http://localhost:5173");
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    exit(0);
}

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");


require 'db.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $stmt = $pdo->query("SELECT * FROM menu_items");
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true);
        if (isset($data['name'], $data['price'])) {
            $stmt = $pdo->prepare("INSERT INTO menu_items (name, price) VALUES (?, ?)");
            $stmt->execute([$data['name'], $data['price']]);
            echo json_encode(["message" => "Item added successfully"]);
        } else {
            http_response_code(400);
            echo json_encode(["error" => "Invalid input"]);
        }
        break;

    case 'PUT':
        parse_str(file_get_contents("php://input"), $data);
        if (isset($_GET['id'], $data['name'], $data['price'])) {
            $stmt = $pdo->prepare("UPDATE menu_items SET name = ?, price = ? WHERE id = ?");
            $stmt->execute([$data['name'], $data['price'], $_GET['id']]);
            echo json_encode(["message" => "Item updated"]);
        } else {
            http_response_code(400);
            echo json_encode(["error" => "Missing fields"]);
        }
        break;

    case 'DELETE':
        if (isset($_GET['id'])) {
            $stmt = $pdo->prepare("DELETE FROM menu_items WHERE id = ?");
            $stmt->execute([$_GET['id']]);
            echo json_encode(["message" => "Item deleted"]);
        } else {
            http_response_code(400);
            echo json_encode(["error" => "ID required"]);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(["error" => "Method not allowed"]);
        break;
}
