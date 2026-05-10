# Xamox Academy — App nativa (Android + iOS)

Wrapper Capacitor que carga `https://campus.xamoxacademy.com` dentro de una app
nativa real, lista para Google Play y App Store.

Una sola base de código (la Next.js del portal) → dos apps nativas + web.

## Comandos clave

```bash
# Sincronizar plugins y config en ambas plataformas
npx cap sync

# Abrir Android Studio
npx cap open android

# Abrir Xcode (requiere macOS)
npx cap open ios

# Build de release Android (.aab para Play Store)
cd android && ./gradlew bundleRelease

# Build iOS — desde Xcode: Product → Archive → Distribute App
```

## Requisitos locales

- **Android**: JDK 17+, Android Studio + Android SDK 34, gradle 8+
- **iOS**: macOS, Xcode 15+, CocoaPods

## Configuración

Editar `capacitor.config.ts` para cambiar:

- `server.url` (URL del portal en producción)
- `appId` y `appName`
- splash, status bar, plugins…

## Publicación rápida

| Tienda | Coste | Tiempo review | Bundle |
|---|---|---|---|
| Google Play | $25 una vez | 1-3 días | `.aab` desde `gradlew bundleRelease` |
| App Store | $99/año | 1-7 días | archive desde Xcode + TestFlight |

Splash, iconos adaptativos y assets de cada tienda viven en
`android/app/src/main/res/` y `ios/App/App/Assets.xcassets/`.
