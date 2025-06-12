<?php
// 1. Retrieve lat and long query parameters
$lat = $_GET['lat'] ?? null;
$long = $_GET['long'] ?? null;

// 7. Basic error handling: if lat or long are missing
if ($lat === null || $long === null) {
    http_response_code(400);
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Latitude and longitude parameters are required.']);
    exit;
}

// 2. Define the Dark Sky API key
$apiKey = '83223a78a86f77f0073c5a481897669a';

// 3. Construct the API URL
$apiUrl = "https://api.darksky.net/forecast/{$apiKey}/{$lat},{$long}";

// 4. Use file_get_contents to fetch data
// Suppress errors from file_get_contents to handle them manually
$response = @file_get_contents($apiUrl);

// 7. Basic error handling: If the API call fails
if ($response === false) {
    http_response_code(500);
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Failed to fetch data from the weather API.']);
    exit;
}

// 5. Set the Content-Type header
header('Content-Type: application/json');

// 6. Echo the fetched JSON response
echo $response;
?>
