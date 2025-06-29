<?php
// Set the Content-Type header for all responses
header('Content-Type: application/json');

// 1. Retrieve lat and long query parameters
$lat = $_GET['lat'] ?? null;
$long = $_GET['long'] ?? null;

// Basic error handling: if lat or long are missing
if ($lat === null || $long === null) {
    http_response_code(400);
    echo json_encode(['error' => 'Latitude and longitude parameters are required.']);
    exit;
}

// 2. Define the OpenWeatherMap API key
// IMPORTANT: Replace 'YOUR_API_KEY_PLACEHOLDER' with your actual OpenWeatherMap API key.
$apiKey = 'YOUR_API_KEY_PLACEHOLDER';

// 3. Construct the API URL for OpenWeatherMap
$apiUrl = "https://api.openweathermap.org/data/2.5/weather?lat={$lat}&lon={$long}&units=imperial&appid={$apiKey}";

// 4. Use file_get_contents to fetch data
// Suppress errors from file_get_contents to handle them manually
$response = @file_get_contents($apiUrl);

// Error handling: If the API call fails
if ($response === false) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to fetch data from OpenWeatherMap API. Network error.']);
    exit;
}

// 5. Parse the JSON response
$data = json_decode($response, true);

// Error handling: If OpenWeatherMap API returns an error (e.g., invalid API key, bad request)
// OpenWeatherMap errors usually have a 'cod' field that is not 200.
if ($data === null || (isset($data['cod']) && $data['cod'] != 200)) {
    http_response_code($data['cod'] ?? 500); // Use OpenWeatherMap's status code if available
    $errorMessage = 'Failed to fetch data from OpenWeatherMap API.';
    if (isset($data['message'])) {
        $errorMessage .= ' Error: ' . $data['message'];
    } elseif (json_last_error() !== JSON_ERROR_NONE) {
        $errorMessage .= ' Error: Invalid JSON response from API.';
    }
    echo json_encode(['error' => $errorMessage]);
    exit;
}

// 6. Adapt the OpenWeatherMap response to the expected structure
$output = [
    'currently' => [
        'temperature' => $data['main']['temp'] ?? null,
        'summary' => $data['weather'][0]['description'] ?? null,
        'icon' => $data['weather'][0]['icon'] ?? null,
    ],
    'timezone' => $data['name'] ?? null, // City name
    'timezone_offset' => $data['timezone'] ?? null, // Raw timezone offset in seconds
];

// 7. Echo the adapted JSON response
echo json_encode($output);

?>
