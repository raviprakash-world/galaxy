# GALAXY — a little window into the universe

Interactive universe explorer: Earth → Solar System → Milky Way → deep space, in real-time WebGL.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build
```

Preview flags (query string): `?reduced` forces reduced motion, `?nowebgl` shows the 2D fallback.

## What's in it

| Area | Where | Notes |
|---|---|---|
| Hero | `three/PlanetScene.tsx`, `ui/Hero.tsx` | Earth with day/night, clouds, atmosphere, city lights, terminator, pointer parallax |
| Solar System | `three/SolarSystem.tsx` | Orbiting planets, orbit paths, asteroid belt, hover, click, keyboard-focusable labels, "not to scale" badge |
| Planet detail | `ui/PlanetInfo.tsx`, `ui/PlanetData.tsx` | Compact readout on select; "Open planet data" zooms in with six tabbed sections. Earth adds layer toggles |
| Camera | `three/CameraController.tsx` | One controller: eased fly-to, follows moving bodies, view-offset so subjects clear the panels, reset, scale-change pull-back |
| Milky Way | `three/GalaxyMap.tsx` | ~50k stars on a log-spiral model with bar + bulge, "You are here" marker that zooms into the Solar System |
| Deep space | `three/DeepSpace.tsx`, `ui/DeepPanel.tsx` | 12 real objects at their true RA/Dec on a log distance scale, with distance rings |
| Scale journey | `store.ts` (`startJourney`) | Earth → Solar System → Interstellar → Milky Way → Deep space, skippable |
| Discover / Search | `ui/DiscoveryCard.tsx`, `ui/SearchOverlay.tsx` | Daily pick + random; ⌘/Ctrl+K or `/`, arrow keys, Enter flies there |
| Fallbacks | `ui/Fallback2D.tsx`, `App.tsx` | No WebGL → 2D atlas. 3D failure or context loss → "Celestial visualization unavailable", panels keep working |
| Audio | `lib/audio.ts` | Optional synthesized ambience. Muted by default, nothing is created until the toggle is used |

Content lives in `src/data/` (planets, deep space, search index), separate from components.

## Keyboard

Tab reaches every object label, dock chip and panel control. `Ctrl/⌘+K` or `/` search · `←` `→` cycle bodies · `Esc` back/close · tabs support arrow keys.

## Assets (the honest version)

**No image textures are used, and nothing is downloaded at runtime.** Every surface is procedural:

- **Planet surfaces**: GLSL fragment shaders (`src/shaders/planet.ts`). Bump mapping is derived from the same height field on screen (`dFdx/dFdy`), craters are cellular noise, Jupiter/Saturn/Neptune bands use latitude-dependent differential rotation, Saturn's ring density (C/B/A rings, Cassini division, Encke gap) is shared by the ring shader and the planet's ring-shadow test, and the ring gets a planet shadow.
- **Earth's continents** come from ~35 hand-simplified lon/lat outlines (`src/lib/painters.ts`), softened into a small mask and then given fractal coastlines, biomes, ice caps, mountains and night lights in the shader. It is recognisably Earth, but it is not satellite imagery.
- **Deep-space illustrations** (galaxy, nebulae, black hole, etc.) are canvas-2D paintings, not photographs. They are labelled as procedural in the UI.
- **Fonts**: Manrope via `@fontsource-variable/manrope` (SIL OFL), bundled locally.

Facts come from NASA's Planetary Fact Sheet and NASA/ESA/ESO/Hubble/Webb science releases; measurements are rounded and moon counts (IAU Minor Planet Center, 2025) keep changing. If you want photographic textures, NASA imagery (e.g. Blue Marble, Solar System Exploration maps) is public domain and can replace the Earth mask/albedo, but it wasn't added here because that means downloading third-party files.

## Known limitations

- Solar System sizes, distances and speeds are compressed (badge says so). Deep space uses real sky directions with logarithmic distance.
- Milky Way is a simplified four-arm model.
- Quality tier (mobile vs desktop) is chosen at load; it does not re-evaluate on resize.
- Deep-space objects are billboards, not volumetric.
- Sound cannot be auto-tested; it needs a user gesture and ears.

## QA status

See the final report in the conversation for what was and wasn't verified.
