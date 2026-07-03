/**
 * IndexNow auto-ping — runs after every `vite build` via postbuild hook.
 * Notifies Bing and Yandex of all site URLs instantly after each deployment.
 */

const KEY = 'c8ed494a1ea488be66b10b21eef9200a';
const HOST = 'faisalorakzai.com';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

const URLS = [
  'https://faisalorakzai.com/',
  'https://faisalorakzai.com/founder',
  'https://faisalorakzai.com/ecosystem',
  'https://faisalorakzai.com/benchmarks',
  'https://faisalorakzai.com/research',
  'https://faisalorakzai.com/press',
  'https://faisalorakzai.com/learning',
  'https://faisalorakzai.com/media',
  'https://faisalorakzai.com/investment',
  'https://faisalorakzai.com/contact',
  'https://faisalorakzai.com/research/blockchain-basic',
  'https://faisalorakzai.com/research/blockchain-infra',
  'https://faisalorakzai.com/research/blockchain-types',
  'https://faisalorakzai.com/research/smart-contracts',
  'https://faisalorakzai.com/research/rwa-tokenization',
  'https://faisalorakzai.com/research/blockchain-security',
  'https://faisalorakzai.com/research/future-of-web3',
  'https://faisalorakzai.com/research/blockchain-digital-identity',
  'https://faisalorakzai.com/research/cross-chain-technology',
  'https://faisalorakzai.com/research/enterprise-blockchain-ecosystems-guide',
  'https://faisalorakzai.com/papers/wp-01',
  'https://faisalorakzai.com/papers/wp-02',
  'https://faisalorakzai.com/papers/wp-03',
  'https://faisalorakzai.com/papers/wp-04',
  'https://faisalorakzai.com/papers/mk-01',
  'https://faisalorakzai.com/papers/mk-02',
];

const ENDPOINTS = [
  'https://api.indexnow.org/indexnow',
  'https://www.bing.com/indexnow',
];

const payload = JSON.stringify({
  host: HOST,
  key: KEY,
  keyLocation: KEY_LOCATION,
  urlList: URLS,
});

console.log(`\n🔔 IndexNow: pinging ${URLS.length} URLs to Bing + Yandex...`);

let success = 0;
for (const endpoint of ENDPOINTS) {
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: payload,
    });
    if (res.status === 200 || res.status === 202) {
      console.log(`  ✅ ${endpoint} → HTTP ${res.status}`);
      success++;
    } else {
      const text = await res.text().catch(() => '');
      console.log(`  ⚠️  ${endpoint} → HTTP ${res.status} ${text.slice(0, 80)}`);
    }
  } catch (err) {
    console.log(`  ❌ ${endpoint} → ${err.message}`);
  }
}

console.log(`IndexNow complete: ${success}/${ENDPOINTS.length} endpoints notified.\n`);
