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

$id = $_GET['id'];
$data = json_decode(file_get_contents('php://input'), true);

$name = $data['name'];
$price = $data['price'];

$stmt = $pdo->prepare("UPDATE menu_items SET name = ?, price = ? WHERE id = ?");
$stmt->execute([$name, $price, $id]);

echo json_encode(['message' => 'Item updated']);
?>