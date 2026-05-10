import type { CapacitorConfig } from "@capacitor/cli";

/**
 * App nativa Xamox Academy.
 *
 * Estrategia: la app móvil es un wrapper nativo (Android + iOS) que carga
 * la web de producción (campus.xamoxacademy.com) directamente. Esto nos
 * permite:
 *   - Mantener una sola base de código (Next.js + Prisma + Stripe + Auth.js).
 *   - Que cualquier deploy del portal aparezca instantáneamente en la app.
 *   - Usar APIs nativas (push, biometría, deep links, etc.) cuando hagan falta.
 *   - Distribuir como app real en Google Play y App Store.
 */
const config: CapacitorConfig = {
  appId: "com.xamoxacademy.app",
  appName: "Xamox Academy",
  webDir: "www",
  bundledWebRuntime: false,

  server: {
    // Producción: cambia a tu dominio definitivo cuando esté el DNS.
    url: "https://campus.xamoxacademy.com",
    cleartext: false,
    androidScheme: "https",
    allowNavigation: [
      "campus.xamoxacademy.com",
      "*.xamoxacademy.com",
      "buy.stripe.com",
      "checkout.stripe.com",
      "*.stripe.com",
    ],
  },

  ios: {
    contentInset: "always",
    backgroundColor: "#060B17",
  },

  android: {
    backgroundColor: "#060B17",
    allowMixedContent: false,
    captureInput: true,
    webContentsDebuggingEnabled: false,
  },

  plugins: {
    SplashScreen: {
      launchShowDuration: 1500,
      launchAutoHide: true,
      backgroundColor: "#060B17",
      androidScaleType: "CENTER_CROP",
      showSpinner: false,
      splashImmersive: true,
    },
    StatusBar: {
      style: "DARK",
      backgroundColor: "#060B17",
    },
  },
};

export default config;
