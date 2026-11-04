---
name: verify-weather-ui
description: Serve weatherApp's actual static UI and drive controlled geolocation/weather-fetch responses, unit keyboard toggle, malformed/error states and mobile/desktop pixels without claiming PHP/live-weather acceptance.
---
# Weather UI boundary verification

## Launch
Static browser surface: index.html,app.js,main.css. PHP index.php includes that HTML; weather_api.php calls OpenWeatherMap but contains only a placeholder key. PHP runtime is absent from the executed environment; do not claim server/provider verification or test the placeholder against provider. For browser proof serve actual source through the helper's static loopback server. Node22.12+ and Chrome required. `npm ci --ignore-scripts --prefix .cursor/skills/verify-weather-ui` installs the pinned browser driver. CHROME_PATH overrides /usr/bin/google-chrome.

## Doctor
`node --check app.js` must pass; the shipped unmatched final brace previously prevented every browser path. `node .cursor/skills/verify-weather-ui/helpers/verify.mjs /tmp/weather-proof` starts an owned static server and fresh contexts. Readiness needs actual description/temperature state, not an open port. Removed reference to nonexistent main.js; actual app.js remains the source. No user GPS, account, key or provider request needed for this boundary proof.

## Drive
At390/1365 the helper sets a labeled browser GPS fixture13.08/80.27 and intercepts only the existing weather_api.php fetch boundary. Valid68F -> actual button click20C -> keyboardSpace68F. Provider text resembling HTML must remain literal. Verify actual requested query matches controlled GPS, not the user's current location. Controlled503error, malformedpayload, invalidJSON,networkerror, deniedGPS and unavailableGPS each show no false temperature and disabled unit control. These are fixtures, never current weather or PHP results. No internal app setters or substituted UI. Externalfonts/icons blocked and not accepted.

## Evidence
Named result.json plus each-width scenario screenshots survive cleanup. Inspect pixels. Source fixes: syntax, missing-script reference, schema/finite-temperaturevalidation, native accessible unitbutton, readinessdisable, longerrormessagewrap, darkercontainercontrast onlightsky/snowgradient. Original gradient/iconmapping retained. Weather descriptions/units are not a medical/weather-accuracy or provider-availability claim.

## Cleanup
Helper closes only owned browser/server and uses separate contexts per scenario. No persistentstorage or realGPS. Separate output folders for concurrent runs. Never kill by name, remove source, send provider calls, enable APIs or spend. Failed attempts clean owned resources before retry. Preserve evidence aftercleanup.

## Coverage and maintenance
PHP syntax/execution/security/upstreamresponsemapping/timeouts, actual key ownership/configuration/provider/currentweather, externalicons/fonts,actualdevice andCI/hosted state remain unverified. Server still uses a placeholder key; APIacceptance is blocked. UIboundary skill is not a full functional-weather pass. Use /maintain-verification-skill after source changes and keep server/provider gaps explicit.
