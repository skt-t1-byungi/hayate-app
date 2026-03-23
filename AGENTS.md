# AGENTS.md

## Tech Stack

- **Core:** Expo, TypeScript, pnpm
- **Styling:** NativeWind v5
- **UI Components:** React Native Reusables

## Development Style

- **KISS:** Zero-config, concise code, simple logic. No unnecessary abstractions.
- **YAGNI:** Implement strictly required features. No overengineering or premature libraries.

## Change Principles

- **Respect Existing Code:** Preserve intent/structure. Refactor ONLY for objective clarity/brevity.
- **Comments:** Keep meaningful comments. Write new comments politely in Korean.

## Styling Principles

- **NativeWind First:** Always use `className`. Fallback to `StyleSheet` only if unsupported.
- **SafeArea:** No `className` on `SafeAreaView`. Use a wrapper `View` for layout/background.
- **Reuse `components/ui`:** Strictly use local primitives (`Text`, `Input`, `Button`). Avoid ad-hoc wrappers.
- **Inline UI:** Build screen UI inline. Extract components only for clear deduplication.

## Icon Principles

- **Library:** Use `phosphor-react-native`. Do not mix families.
- **Naming:** Avoid deprecated names. Use the `*Icon` suffix consistently (e.g., `ListIcon`).
- **Styling:** Use explicit props (`color`, `size`, `weight`) instead of `className`. Keep size (`18~22`) consistent.
- **Space Saving:** Replace text with icons (`Button size="icon"`) where space is tight.
