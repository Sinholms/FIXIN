import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.fixin.app',
  appName: 'FIXIN',
  webDir: 'dist',
  bundledWebRuntime: false,
  android: {
    backgroundColor: '#002556',
  },
}

export default config
