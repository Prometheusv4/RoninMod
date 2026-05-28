# Ronin: The Last Samurai — MOD

**Install. Open. Done. No Frida. No scripts. No PC.**

## Download

Download `ronin_v2.19.764_mod.apk` from the repo, install it directly on your phone.

## Version History

### v2.19.764 (current) — `ronin_v2.19.764_mod.apk`
- **Method:** Native IAP hooks via libNotlib.so + Play Integrity stripped (no libpairipcore.so)
- **Arch:** ARM64 only (arm64-v8a)
- **IAP:** Enter shop → tap any purchase → completes instantly, no payment
- **Mod menu:** Floating icon (tap for extra toggles — god mode, damage, etc.)
- **Source:** Based on AN1 mod engine, re-signed under Prometheus keystore

### v2 (broken) — `ronin_modded_v2.apk`
- **Patch:** `libil2cpp.so` at `0xCC5FBC`: `mov r2, #1` → `mov r2, #3`
- **Why it failed:** LiapStore/FakeStore infrastructure was removed by devs in v2.19.764
- **Also broken:** ARM32-only, kept libpairipcore.so (Play Integrity detects mods)

### v1.26.493 — `ronin_modded.apk`
- **Patch:** `libil2cpp.so` at `0xE58B7C`: `cbz w8, ...` → NOP
- **Effect:** `InstantiateStore()` always takes FakeStore path
- **Status:** Obsolete — different game version

## Technical Notes

v2.19.764 removed the Unity IAP FakeStore infrastructure that v1.26.493 shipped. The AN1 mod works by injecting `libNotlib.so` (native hook library) via a modified `UnityPlayerActivity.onCreate()`, combined with stripping `libpairipcore.so` (Google Play Integrity API). The mod menu is a WindowManager overlay — the IAP bypass works automatically when the library loads, no toggle needed.