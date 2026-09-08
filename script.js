// ===============================
// EDIT THESE SETTINGS
// ===============================
const CONFIG = {
  // Minecraft server address shown on the page
  serverIp: "lifestealzsmp.falix.pro",

  // Server status API. mcstatus.io is free for basic public status checks.
  // Example: https://api.mcstatus.io/v2/status/java/play.example.net
  statusApi: "https://api.mcstatus.io/v2/status/java/lifestealzsmp.falix.pro",

  // Replace with your real store URL
  storeUrl: "https://lifestealzsmp0.craftingstore.net/",

  // Replace with your real Discord invite
  discordUrl: "https://discord.gg/fT3yHx7kg"
};

document.getElementById("serverIp").textContent = CONFIG.serverIp;

document.querySelectorAll('a[href*="YOUR-STORE-LINK"]').forEach(a => a.href = CONFIG.storeUrl);
document.querySelectorAll('a[href*="YOURINVITE"]').forEach(a => a.href = CONFIG.discordUrl);

document.getElementById("copyIp").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(CONFIG.serverIp);
    const msg = document.getElementById("copyMessage");
    msg.textContent = "✓ IP address copied!";
    setTimeout(() => msg.textContent = "", 2000);
  } catch {
    alert("Copy failed. Server IP: " + CONFIG.serverIp);
  }
});

async function updateServerStatus() {
  const status = document.getElementById("serverStatus");
  const players = document.getElementById("playerCount");
  const dot = document.getElementById("statusDot");

  try {
    const response = await fetch(CONFIG.statusApi, { cache: "no-store" });
    if (!response.ok) throw new Error("API error");
    const data = await response.json();

    if (data.online) {
      dot.className = "status-dot online";
      status.textContent = "ONLINE";
      players.textContent = data.players?.online ?? 0;
    } else {
      dot.className = "status-dot offline";
      status.textContent = "OFFLINE";
      players.textContent = "0";
    }
  } catch {
    dot.className = "status-dot offline";
    status.textContent = "STATUS UNAVAILABLE";
    players.textContent = "—";
  }
}

updateServerStatus();
setInterval(updateServerStatus, 30000);
