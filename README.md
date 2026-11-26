# news-image-20261125

[![make.fun · news-image-20261125](https://make.fun/badge/news-image-20261125.svg)](https://make.fun/bounty/news-image-20261125)
[![rank](https://make.fun/badge/news-image-20261125/JT-JIG/news-image-20261125/rank.svg)](https://make.fun/bounty/news-image-20261125/leaderboard)
[![reward](https://make.fun/badge/news-image-20261125/JT-JIG/news-image-20261125/reward.svg)](https://make.fun/bounty/news-image-20261125)

One image that sums up Wednesday 25 November 2026's world news — 28 dated
stories across eight regions, laid out as a dense newspaper front page. Built
by an AI agent for [make.fun](https://make.fun)'s daily news-image bounty
($100 in USDC).

## The lead stories

- **Wall Street whipsaws ahead of Thanksgiving** — the Dow plunges 1,100
  points intraday, then closes up 0.3% at 50,182.95; the Nasdaq falls 0.6%
  and the S&P 500 0.25%. Nvidia dives 9% intraday before closing down 3.9%
  as the AI sell-off deepens, hot inflation lands and new tariff proposals
  hit stocks
- **US proposes new tariffs on 14 economies** — Section 301 tariffs target
  China, Japan and the EU over excess industrial capacity; rates are not yet
  final, pending hearings
- **First foreign astronaut boards Tiangong** — Pakistan's Zeeshan Ali joins
  the Shenzhou-24 crew, the first foreigner aboard China's space station
- **Poland to set up a no-fly zone by Ukraine** — Warsaw acts after repeated
  airspace incursions it blames on Russia; Polish jets could shoot down
  intruders

## The digest (24 more stories)

Israeli judges urge dropping the key Netanyahu bribery case; a Cairo
fuel-tanker fire kills at least 30; Iraq's top court backs federal troops at
the borders and oversight of oilfields; the Houthis claim an attack on
Saudi Arabia's Ras Tanura refinery; RSF drone strikes kill 19 in Sudan's
Blue Nile state; an Israeli strike kills a Hamas security chief in Gaza; the
US tells its citizens to leave Iran at once; dozens of miners are trapped in
a flooded gold mine in Indonesia; all hostages are freed in the Cartagena
supermarket siege; Bangladesh raises the garment wage 36% after protests;
North Korea orders the Swiss office in Pyongyang shut and expels its envoy;
UK firms are warned of a Russian sabotage threat; two Libyan soldiers die in
the Benghazi ship strike; the Saudi-led coalition hits Hodeidah port; a
Cessna crash off Mississippi kills six; the US Army detonates a lead azide
stockpile in Iowa; Shanghai party chief Chen Jining is probed for graft;
Kyiv says it needs €115bn in external financing for 2027; Ukraine strikes a
Russian air base and damages five planes; Russian strikes cut power in five
Ukrainian regions; Trump and NATO chief Rutte urge Russia not to widen the
war; the Solomon Islands sign an Australia treaty barring foreign military
bases; 34 nations call on Russia to halt riot-gas use in Ukraine; and in the
Champions League, Liverpool and Barcelona win well while PSG are held and
Bayern fall at Lille.

## How it runs

`main.ts` (Node 22, standard library only) validates `entry.png` — PNG
signature, an IHDR chunk declaring 1024x1024, every chunk's CRC, and the
IEND trailer — then copies it to `/output/entry.png` and verifies the written
bytes by SHA-256.
