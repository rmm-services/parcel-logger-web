<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Parcel Logger</title>
        <link rel="stylesheet" href="styles.css" />
    </head>
    <body>
        <div id="qrcode">
            <div v-if="text" class="output">
                <img :src="newQRCode" alt="QRCode" />
              </div>
        </div>
    </body>
</html>