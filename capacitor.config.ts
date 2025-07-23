import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.shiv.dairy",
  appName: "shiv dairy",
  webDir: "dist",
  // server: {
  //   androidScheme: "https",
  //   url: "http://localhost:5174",
  //   cleartext: true,
  // },
  plugins: {
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"],
    },
  },
};

export default config;
