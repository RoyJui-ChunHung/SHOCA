const { onCall, HttpsError } = require('firebase-functions/v2/https');
const { initializeApp }      = require('firebase-admin/app');
const { getFirestore, FieldValue } = require('firebase-admin/firestore');

initializeApp();

const PRIZES = [
  { tier: 'ssr',     chance: 1,  icon: '💎', name: 'RARE Grand Prize',  sub: 'Diamond / Jade Jewelry',       msg: 'Congratulations! You won the RARE Grand Prize!',  particles: { color: '#FFD700', count: 28 } },
  { tier: 'sr-plus', chance: 5,  icon: '🏆', name: 'RARE Runner-up',    sub: 'Semi-precious Designer Piece', msg: "You're so lucky — RARE Runner-up is yours!",      particles: { color: '#B8A0FF', count: 20 } },
  { tier: 'sr',      chance: 15, icon: '🎁', name: 'Bonus Blind Box',   sub: 'One random jewelry blind box', msg: 'Bonus blind box! The surprises keep coming!',     particles: { color: '#80CFFF', count: 12 } },
  { tier: 'r',       chance: 30, icon: '✨', name: '10% Off Coupon',    sub: 'Valid on your next order',     msg: '10% off coupon sent to your account!',            particles: null },
  { tier: 'n',       chance: 49, icon: '🃏', name: 'Thank-You Card',    sub: 'SHOCA limited-edition design', msg: 'Thank you! Hope to see you again soon.',          particles: null },
];

const SSR_MONTHLY_CAP = 5;
const RATE_LIMIT_SECONDS = 60; // 每位用戶每 60 秒只能抽一次

exports.cardDraw = onCall(async (request) => {
  // ① 必須登入才能抽卡
  if (!request.auth) {
    throw new HttpsError('unauthenticated', 'You must be signed in to draw.');
  }

  const uid = request.auth.uid;
  const db  = getFirestore();
  const now = new Date();

  // ② Rate limiting — 檢查最近 60 秒內是否已抽過
  const recentSnap = await db.collection('draws')
    .where('userId', '==', uid)
    .where('timestamp', '>=', new Date(now.getTime() - RATE_LIMIT_SECONDS * 1000))
    .limit(1)
    .get();

  if (!recentSnap.empty) {
    throw new HttpsError('resource-exhausted', 'Please wait before drawing again.');
  }

  // ③ 先檢查本月 SSR 上限，再決定獎池
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const ssrSnap = await db.collection('draws')
    .where('tier', '==', 'ssr')
    .where('timestamp', '>=', monthStart)
    .get();

  const ssrCapped = ssrSnap.size >= SSR_MONTHLY_CAP;

  // ④ 若 SSR 已達上限，把 SSR 機率分配給 SR+
  let pool = ssrCapped
    ? [
        { ...PRIZES[0], chance: 0  },   // SSR   → 0%
        { ...PRIZES[1], chance: 6  },   // SR+   → 原 5% + 上移 1%
        { ...PRIZES[2], chance: 15 },
        { ...PRIZES[3], chance: 30 },
        { ...PRIZES[4], chance: 49 },
      ]
    : PRIZES;

  // ⑤ 在伺服器執行亂數（使用者無法干預）
  const roll = Math.random() * 100;
  let cumulative = 0;
  let prize = pool[pool.length - 1];
  for (const p of pool) {
    cumulative += p.chance;
    if (roll < cumulative) { prize = p; break; }
  }

  // ⑥ 寫入抽卡紀錄
  await db.collection('draws').add({
    userId:    uid,
    tier:      prize.tier,
    prizeName: prize.name,
    orderId:   request.data?.orderId || null,
    timestamp: FieldValue.serverTimestamp(),
  });

  return prize;
});
