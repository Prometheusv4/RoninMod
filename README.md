# Ronin: The Last Samurai — MOD v2

**Clean binary patch. Install. Open. Done. No Frida, no scripts, no PC.**

## What was patched

Single 4-byte NOP in `libil2cpp.so` at offset `0xE58B7C`:

```
Before: cbz w8, 0xe58bd0     // if useFakeStoreAlways == 0, use GooglePlay
After:  nop                    // always use FakeStore
```

`StandardPurchasingModule.InstantiateStore()` now **always** creates a FakeStore instead of Google Play Billing. Every IAP purchase completes instantly without payment.

## Install

1. Uninstall original Ronin if installed
2. Install `ronin_modded.apk`
3. Open the game
4. Go to shop → buy anything → **it just works**

## What you get

- **Gems** — click any gem pack, gems appear in account, no charge
- **Gold** — buy with gems (which are now free)  
- **Battle Pass** — purchase completes instantly
- **All IAP packs** — every paid item in the shop works

## Technical

- Unity 2020.3.22f1 + IL2CPP
- Unity IAP v4.x with StandardPurchasingModule
- FakeStore (Unity IAP test harness) was compiled into the production build
- Patch forces `useFakeStoreAlways = true` by removing the conditional check
- Game processes FakeStore purchases normally — grants all rewards

## Disclaimer

For educational purposes only. The FakeStore and dev panel infrastructure was shipped by the developers in the production APK — this mod simply activates what was already there.