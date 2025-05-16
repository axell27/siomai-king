<?php
require 'db.php';
$id = $_GET['id'];

$stmt = $pdo->prepare("SELECT * FROM menu_items WHERE id = ?");
$stmt->execute([$id]);
$item = $stmt->fetch();

if (!$item) {
    echo "Item not found.";
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'];
    $price = $_POST['price'];
    $stmt = $pdo->prepare("UPDATE menu_items SET name = ?, price = ? WHERE id = ?");
    $stmt->execute([$name, $price, $id]);
    header('Location: index.php');
    exit;
}
?>
<h2>Edit Menu Item</h2>
<form method="post">
  Name: <input type="text" name="name" value="<?= htmlspecialchars($item['name']) ?>" required><br>
  Price: <input type="number" name="price" step="0.01" value="<?= $item['price'] ?>" required><br>
  <button type="submit">Update</button>
</form>
<a href="index.php">Back</a>
