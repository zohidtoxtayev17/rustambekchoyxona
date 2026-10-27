<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep scroll entrance motion in the shared Reveal component using one-shot IntersectionObserver and progressive Web Animations; content remains visible when JavaScript, observers or animation APIs are unavailable.
- Separate menu entrance wrappers from card hover transforms so entrance and pointer motion never compete.
- Keep optional product sizes and varieties in the shared menu data and render them through the existing card; drink images use contain fitting so product packaging stays fully visible without changing food cards.
- Keep scheduled opening-hours and favorites parsing/toggling in browser-safe utilities with boundary tests; hydrate clock and local favorites after mount to prevent SSR mismatches.
- Treat reservations as a client-only message composer with temporary React Hook Form state; centralize Telegram destination and validate times with fresh Tashkent clock values at both review and handoff, never simulate site submission.
