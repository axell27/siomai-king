<?php
require 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'];
    $price = $_POST['price'];
    $stmt = $pdo->prepare("INSERT INTO menu_items (name, price) VALUES (?, ?)");
    $stmt->execute([$name, $price]);
    header('Location: index.php');
    exit;
}
?>
<h2>Add New Menu Item</h2>
<form method="post">
  Name: <input type="text" name="name" required><br>
  Price: <input type="number" name="price" step="0.01" required><br>
  <button type="submit">Add</button>
</form>
<a href="index.php">Back</a>
