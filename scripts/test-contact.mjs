// Sends one test brief through every configured delivery channel and reports each
// result, so you can verify production settings before deploying.
//
//   npm run test:contact        (reads .env)
import contact from "../lib/contact.js";

const channels = contact.configuredChannels();

if (!channels.length) {
  console.error("No delivery channel is configured, so production briefs would NOT be delivered.");
  console.error("Copy .env.example to .env and fill in at least one channel (Telegram is quickest).");
  process.exit(1);
}

console.log(`Testing: ${channels.join(", ")}`);

const brief = contact.normalize({
  nom: "Test PixelWaves",
  email: process.env.TEST_EMAIL || process.env.CONTACT_TO?.split(",")[0] || "test@example.com",
  projet: "Test",
  message: "Test brief sent by `npm run test:contact`. If you can read this, delivery works.",
  source: "test-script-en",
});

const outcome = await contact.deliver(brief);

for (const result of outcome.results) {
  console.log(`${result.ok ? "✓" : "✗"} ${result.channel}${result.ok ? "" : ` — ${result.error}`}`);
}
if (outcome.autoReply) console.log(`✓ confirmation email via ${outcome.autoReply} (to ${brief.email})`);

if (!outcome.delivered) {
  console.error("\nEvery channel failed: visitors would be offered WhatsApp instead.");
  process.exit(1);
}
console.log("\nDelivery works.");
