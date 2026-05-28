# Ronin: The Last Samurai — IAP Bypass Attack Plan
# Prometheus v4.3

## GAME: com.dreamotion.ronin v1.26.493
## ENGINE: Unity 2020.3.22f1 + IL2CPP (no C# DLLs, all native code)

## CURRENCIES
- Gems: Premium (real money)
- Gold: Game currency (earned or bought with gems)
- Onigiri: Stamina

## CRITICAL DISCOVERIES

### 1. BUILT-IN FAKE STORE (Unity IAP Test Harness)
The game ships with Unity IAP's FakeStore compiled into the production build. This is a FULL IAP simulator that processes purchases without payment.

Key class: `LiapStore` (TypeDefIndex 7200) — game's IAP wrapper
- Method: `LiapStore.UseFakeStore()` at RVA 0xB389A8
- Calls into `StandardPurchasingModule` which has:
  - `useFakeStoreAlways` (bool) — if true, ALL purchases bypass Google Play
  - `useFakeStoreUIMode` — sets UI mode (StandardUser or DeveloperUser)

### 2. DEVELOPER COMMAND PANEL
The game has a hidden dev panel (`LDevPanel`) with `LDevCommandAttribute`:
- `UseFakeStore()` at RVA 0x94E074 — Activates fake store from dev console
- `ShopCmd()` at RVA 0x94D608 — Shop debug command
- `Resources()` at RVA 0x94C6C4 — Resource manipulation
- `Equipments()` at RVA 0x94C96C — Equipment commands
- `EssenceDevCommand()` at RVA 0x94CB60 — Essence (currency?) commands
- `ResetOptions()` at RVA 0x94D008 — Reset options
- `TestTutorial()` at RVA 0x94D1FC — Test commands

### 3. PURCHASE FLOW
Game uses layered IAP:
- Unity IAP wrapper → StandardPurchasingModule → GooglePlay/FakeStore
- Facebook IAP integration (`ConsumePurchase`, `OpenAppStore`)
- Google Billing v4 (`GoogleFinishTransactionService`)

Purchase verification: `ProcessPurchase()`, `FinishTransaction()`
On success: item granted. On failure: nothing.

## ATTACK VECTOR #1: Frida Hook (requires root)
```
1. Hook LiapStore to call UseFakeStore() on game start
2. All IAP purchases now route through FakeStore
3. Every purchase completes instantly, no payment
4. Rewards granted normally since FakeStore simulates valid receipts
```

## ATTACK VECTOR #2: libil2cpp.so Binary Patch (no root needed)
```
1. Find StandardPurchasingModule.Instance() — the store factory
2. Patch it to always return FakeStore instead of GooglePlay
3. OR: patch useFakeStoreAlways to always be true
4. Repackage APK, sign, install
5. All purchases bypass payment
```

## ATTACK VECTOR #3: Activate Dev Panel
```
1. Find how LDevPanel is activated (hidden gesture? config flag?)
2. Enable it via Frida or binary patch
3. Use the built-in dev commands to add resources directly
```