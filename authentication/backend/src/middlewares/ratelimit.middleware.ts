import { ApiError, async_handler } from "../libs/handlers.js";
import cache from "../libs/cache.js";
import IP from "ip";

export const maxTry = async_handler(async (req, res, next) => {
  const clientIp = IP.address();
  try {
    const hasTried = (await cache.hget(
      `maxtry:${clientIp}`,
      "request"
    )) as number;

    // login try for first time
    if (hasTried === null) {
      await cache.hset(`maxtry:${clientIp}`, { ip: clientIp, request: 1 });
      await cache.expire(`maxtry:${clientIp}`, 480);
      next();
      return;
    }

    // max try 5 times and 8 minute
    if (hasTried >= 5) {
      throw new Error("You have reached your limit please try again later");
    }

    // after first try every try will increament by 1
    await cache.hincrby(`maxtry:${clientIp}`, "request", 1);
    next();
  } catch (error) {
    res.status(500).end("Something went wrong: maxTry");
  }
});
