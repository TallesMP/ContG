import cron from 'node-cron'
import client from "./connection";

cron.schedule('00 00 * * *', () => {
  client.query(`DELETE FROM awaiting_verification
                WHERE expires_at < now()`);
});
