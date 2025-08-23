<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $name = $_POST["name"];
  $email = $_POST["email"];
  $message = $_POST["message"];
  
  // Email configuration
  $to = "ahmed.shehata.360@gmail.com";
  $subject = "New Message from Contact Form";
  $body = "Name: " . $name . "\n\nEmail: " . $email . "\n\nMessage: " . $message;
  $headers = "From: " . $email . "\r\n" . "Reply-To: " . $email . "\r\n";
  
  // Send email
  $success = mail($to, $subject, $body, $headers);
  
  if ($success) {
    $response = array("status" => "success", "message" => "Email sent successfully.");
  } else {
    $response = array("status" => "error", "message" => "Failed to send email.");
  }
  
  header("Content-type: application/json");
  echo json_encode($response);
} else {
  header("HTTP/1.1 405 Method Not Allowed");
  exit();
}
?>
