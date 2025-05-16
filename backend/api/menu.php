<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// For preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Rest of your PHP code...

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
