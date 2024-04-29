<?php
// Process form submission
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve form data
    $title = $_POST["title"];
    $author = $_POST["author"];
    $synopsis = $_POST["synopsis"];
    
    // Handle uploaded manga image
    $targetDir = "uploads/";
    $targetFile = $targetDir . basename($_FILES["image"]["name"]);
    move_uploaded_file($_FILES["image"]["tmp_name"], $targetFile);
    
    // Store manga information in database (you'll need to implement this)
    // Insert SQL query or use ORM to store manga data in your database
    // Example: INSERT INTO manga (title, author, synopsis, image_path) VALUES ('$title', '$author', '$synopsis', '$targetFile')
    
    // Redirect to landing page after successful upload
    header("Location: index.html");
    exit();
}
?>
