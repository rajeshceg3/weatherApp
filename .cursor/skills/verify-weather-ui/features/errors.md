# Weather and location errors

## Sub-features
ActualUI against productionfetchboundaryfixtures:503providererror,malformedpayload,invalidJSON,networkerror,deniedGPS,unsupportedGPS. No false0F or activeunitbutton. ProviderHTML-like textstaysliteral.

## How to get to it (user POV)
Open actualindex.html on an HTTPserver. Production needs PHP and a validproviderconfiguration; boundaryproof doesnotprovideone.

## Driving it with Puppeteer
Run helperfromSKILL.md; controlledgeolocation/fetch fixtures driveactualUI. Inspect screenshotsandresultaftercleanup. Serverfeatureisunverified,notclaimedbyhelper.

## Gotchas
No currentlocation/currentweather/PHP/liveprovideracceptance. Externalicons/fontsblocked. Placeholderkeyisnotusableauthorityorconfiguration.
