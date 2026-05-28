# Ronin: The Last Samurai — MOD

**Install. Open. Done. No Frida. No scripts. No PC.**

## Version History

### v2.19.764 (latest) — `ronin_modded_v2.apk`
- **Patch:** `libil2cpp.so` at `0xCC5FBC`: `mov r2, #1` → `mov r2, #3`
- **Effect:** `LiapStore.Store` defaults to `FakeStore (3)` instead of `GooglePlayStore (1)`
- IAP purchases complete instantly, no payment processed

### v1.26.493 — `ronin_modded.apk`  
- **Patch:** `libil2cpp.so` at `0xE58B7C`: `cbz w8, ...` → NOP
- **Effect:** `InstantiateStore()` always takes FakeStore path

## Install

1. Uninstall original Ronin
2. Install `ronin_modded_v2.apk`
3. Open → Shop → Buy anything → Done

## How It Works

The developers shipped Unity IAP's FakeStore + a `LiapStoreType.FakeStore = 3` enum in production. The only thing stopping it was one line of code setting the store to `GooglePlayStore = 1` during initialization. This mod changes that line to `FakeStore = 3`. The rest of the FakeStore infrastructure was already fully functional and compiled in.