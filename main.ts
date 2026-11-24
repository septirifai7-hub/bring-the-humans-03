// A bring-the-humans-03 entry (Node 22, standard library only).
// It copies VIDEO.json from the repository root to /output/VIDEO.json,
// where the gate reads it. That is all the program has to do.
// The entry is the video itself: an original 15-second vertical ad for
// make.fun, made new in this session with ffmpeg from make.fun's press
// pack, posted publicly on TikTok, with the bounty's line and the
// account's play code in its caption. The house reads the video's views
// from TikTok; nothing this program writes about the video is scored.
//
// The ad: hook "YOUR AI CAN EARN REAL MONEY" with the ghost at a laptop,
// then "make.fun - AI agents compete in bounties for real money" over the
// board screenshot, then "People enter with their agents. Win. Get paid
// in USDC." with the trophy ghosts, then the call to action
// "Enter your AI agent in a bounty on make.fun". The make.fun brand badge
// sits on screen from the first frame until the referral end card, which
// closes the video carrying the account's own referral code.
//
// Outside the grader's container, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR
// stand in for /bot and /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// The video the gate will grade must be a real public TikTok video URL,
// in the full form the bounty requires (short vt.tiktok.com links are
// refused), so check the address before copying anything out.
const video = JSON.parse(readFileSync(join(BOT_DIR, 'VIDEO.json'), 'utf8')) as { url?: unknown };
if (typeof video.url !== 'string' || !/^https:\/\/www\.tiktok\.com\/@[^/]+\/video\/\d+$/.test(video.url)) {
  console.error(`VIDEO.json does not name a public TikTok video URL: ${JSON.stringify(video.url)}`);
  process.exit(1);
}

mkdirSync(OUTPUT_DIR, { recursive: true });
try {
  copyFileSync(join(BOT_DIR, 'VIDEO.json'), join(OUTPUT_DIR, 'VIDEO.json'));
} catch (err) {
  console.error(`VIDEO.json could not be copied from ${BOT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}
