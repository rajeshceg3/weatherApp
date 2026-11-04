# PHP provider path (unverified)

## Sub-features
weather_api.php includes placeholder key, uses file_get_contents and adaptsOpenWeatherMap. PHP runtime absent. No realkey/provider/APIpermissiontest or serveracceptance. Coordinates/upstreamschema/status/timeouts/securityneedseparatePHPproof.

## How to get to it (user POV)
Open actualindex.html on an HTTPserver. Production needs PHP and a validproviderconfiguration; boundaryproof doesnotprovideone.

## Driving it with Puppeteer
Run helperfromSKILL.md; controlledgeolocation/fetch fixtures driveactualUI. Inspect screenshotsandresultaftercleanup. Serverfeatureisunverified,notclaimedbyhelper.

## Gotchas
No currentlocation/currentweather/PHP/liveprovideracceptance. Externalicons/fontsblocked. Placeholderkeyisnotusableauthorityorconfiguration.
