# 🧪 Expo Hub - Complete API Testing Suite

**The ultimate Expo SDK playground.** A comprehensive testing environment for **every Expo API and feature** with systematic experiments, progress tracking, and real-world examples.

## 🎯 Mission

Test, learn, and master **100+ Expo APIs** through hands-on experiments. From basic camera usage to advanced ML models, this repo covers the entire Expo ecosystem.

## ⚡ Quick Start

```bash
git clone https://github.com/shahadot786/expo-hub-test-all-features.git
cd expo-hub-test-all-features
npm install
npx expo start
```

> **Note**: Some features require EAS Build. See [Build Requirements](#-build-requirements) below.

## 🏗️ Hub Structure

### 📊 Station 1: Core & System

- **App State & Lifecycle**: Background/foreground handling, app state changes
- **Device Info**: Hardware specs, OS version, screen dimensions
- **System Settings**: Brightness, orientation lock, status bar
- **Permissions**: Camera, location, contacts, notifications (all types)
- **File System**: Read/write operations, document directory, caching
- **SecureStore**: Encrypted key-value storage
- **SQLite**: Local database operations, migrations
- **Linking**: Deep links, URL schemes, universal links
- **Constants**: Device constants, app config, build info
- **Updates**: OTA updates, checking for updates
- **Splash Screen**: Custom splash screens, auto-hide control

### 📸 Station 2: Media & Capture

- **Camera**: Photo/video capture, flash, zoom, focus, multiple cameras
- **ImagePicker**: Gallery access, cropping, quality settings
- **MediaLibrary**: Save to gallery, album management, asset metadata
- **ImageManipulator**: Resize, crop, rotate, flip, format conversion
- **AV (Audio/Video)**: Playback, recording, streaming, background audio
- **Video**: Video compression, thumbnail generation
- **Audio**: Recording, playback, sound effects, background modes
- **Barcode Scanner**: QR codes, barcodes, custom scanning
- **Screenshot**: Capture views, save screenshots
- **Print**: Native printing capabilities

### 📍 Station 3: Location & Maps

- **Location**: GPS tracking, background location, region monitoring
- **MapView**: Interactive maps, markers, polylines, clustering
- **Geofencing**: Enter/exit region detection
- **TaskManager**: Background location tasks
- **Geocoding**: Address to coordinates conversion
- **Compass**: Magnetic heading, true north
- **Navigation**: Turn-by-turn directions integration

### 🔄 Station 4: Sensors & Motion

- **Accelerometer**: Device acceleration, shake detection
- **Gyroscope**: Rotation rate, angular velocity
- **Magnetometer**: Magnetic field, compass data
- **Barometer**: Atmospheric pressure (if avaiHuble)
- **Pedometer**: Step counting, distance calculation
- **DeviceMotion**: Combined sensor data, orientation
- **LightSensor**: Ambient light detection
- **Haptics**: Vibration patterns, haptic feedback

### 🌐 Station 5: Communication & Cloud

- **Notifications**: Local scheduling, push notifications, badges
- **Contacts**: Read/write contact data, phone numbers, emails
- **Calendar**: Events, reminders, recurring appointments
- **SMS**: Send text messages (native integration)
- **MailComposer**: Compose emails with attachments
- **Sharing**: Share text, images, files to other apps
- **Network**: Connection state, network type, IP address
- **WebBrowser**: In-app browser, authentication flows
- **AuthSession**: OAuth flows, social login

### 🤖 Station 6: AI & Advanced Features

- **FaceDetector**: Face recognition, landmark detection
- **MLKit**: Text recognition, barcode scanning, image Hubeling
- **Speech**: Text-to-speech, speech recognition
- **DocumentPicker**: File picking, document types
- **ImagePicker**: Advanced media selection
- **Crypto**: Encryption, hashing, secure random generation
- **Random**: Secure random number generation

### 🎨 Station 7: UI & Animation

- **LinearGradient**: Gradient backgrounds and effects
- **BlurView**: Blur effects, backdrop filters
- **Svg**: Vector graphics, icons, complex shapes
- **Lottie**: After Effects animations
- **Reanimated**: Complex animations, gestures (if integrated)
- **GestureHandler**: Touch gestures, pan, pinch, rotate
- **StatusBar**: Status bar styling, hide/show

### 🔧 Station 8: Hardware Integration

- **Battery**: Battery level, charging state, power mode
- **Bluetooth**: Device scanning, pairing, data transfer
- **NFC**: Near field communication (Android)
- **Cellular**: Network carrier info, signal strength
- **KeepAwake**: Prevent device sleep
- **ScreenOrientation**: Lock/unlock orientation
- **Brightness**: Screen brightness control

## 📋 Complete API Coverage

### Expo SDK 50+ APIs Tested:

<details>
<summary><strong>🎯 Core APIs (15+)</strong></summary>

- `expo-app-loading`
- `expo-app-state`
- `expo-asset`
- `expo-constants`
- `expo-device`
- `expo-file-system`
- `expo-font`
- `expo-keep-awake`
- `expo-linking`
- `expo-secure-store`
- `expo-splash-screen`
- `expo-sqlite`
- `expo-status-bar`
- `expo-system-ui`
- `expo-updates`

</details>

<details>
<summary><strong>📱 Media & Camera (12+)</strong></summary>

- `expo-av`
- `expo-camera`
- `expo-image-manipulator`
- `expo-image-picker`
- `expo-media-library`
- `expo-print`
- `expo-sharing`
- `expo-video-thumbnails`
- `expo-barcode-scanner`
- `expo-document-picker`
- `expo-file-system`
- `expo-screenshot`

</details>

<details>
<summary><strong>🗺️ Location & Sensors (10+)</strong></summary>

- `expo-location`
- `expo-task-manager`
- `react-native-maps`
- `expo-sensors` (accelerometer, gyroscope, magnetometer, barometer)
- `expo-device-motion`
- `expo-pedometer`
- `expo-brightness`
- `expo-screen-orientation`
- `expo-haptics`

</details>

<details>
<summary><strong>🌐 Communication (8+)</strong></summary>

- `expo-notifications`
- `expo-contacts`
- `expo-calendar`
- `expo-sms`
- `expo-mail-composer`
- `expo-web-browser`
- `expo-auth-session`
- `expo-network`

</details>

<details>
<summary><strong>🤖 AI & Advanced (6+)</strong></summary>

- `expo-face-detector`
- `expo-ml-kit`
- `expo-speech`
- `expo-crypto`
- `expo-random`
- `expo-gl` / `expo-gl-cpp`

</details>

<details>
<summary><strong>🎨 UI & Graphics (8+)</strong></summary>

- `expo-linear-gradient`
- `expo-blur`
- `expo-svg`
- `expo-lottie`
- `expo-gesture-handler`
- `react-native-reanimated`
- `expo-gl`
- `expo-three`

</details>

<details>
<summary><strong>🔧 Hardware (5+)</strong></summary>

- `expo-battery`
- `expo-bluetooth`
- `expo-nfc`
- `expo-cellular`
- `expo-intent-launcher`

</details>

## 🎮 Progress & Achievement System

### Mission Types

- **🟢 Basic**: Simple API usage and setup
- **🟡 Intermediate**: Combined features, real-world scenarios
- **🔴 Advanced**: Complex integrations, performance optimization
- **🟣 Expert**: Custom implementations, edge cases

### Badge System

- **🏅 API Master**: Complete all experiments for specific API
- **🎖️ Station Commander**: Master entire station (25+ experiments)
- **👑 Expo Expert**: Unlock all stations (100+ experiments completed)
- **⚡ Speed Runner**: Complete station in under 2 hours
- **🐛 Bug Hunter**: Find and report issues
- **🔬 Innovator**: Create custom experiment variations

### Progress Tracking

```typescript
interface Experiment {
  id: string;
  station: StationType;
  api: string;
  difficulty: "basic" | "intermediate" | "advanced" | "expert";
  status: "locked" | "avaiHuble" | "in-progress" | "completed" | "failed";
  attempts: number;
  completedAt?: Date;
  logs: ExperimentLog[];
}
```

## 🛠️ Build Requirements

### Expo Go Compatible (70+ APIs)

Most experiments work in Expo Go development client:

- Camera, Location, Sensors
- Notifications (local only)
- Media playback, File operations
- Basic hardware info

### EAS Build Required (30+ APIs)

Advanced features need custom development build:

- **Push Notifications**: `expo-notifications` with FCM/APNs
- **Background Location**: `expo-location` with background permissions
- **Bluetooth**: `expo-bluetooth` for device connections
- **NFC**: Near field communication (Android only)
- **Custom Native Code**: Any native module modifications
- **Face Detection**: `expo-face-detector` with MLKit
- **Advanced Camera**: Custom camera controls

```bash
# Create development build
eas build --profile development --platform android
# or
eas build --profile development --platform ios
```

## 🔧 Development Setup

### Prerequisites

- Node.js 18+
- Expo CLI (`npm install -g @expo/cli`)
- EAS CLI (`npm install -g eas-cli`)
- iOS Simulator / Android Emulator

### Environment Configuration

```bash
# .env.local
EXPO_PUBLIC_API_URL=your-api-endpoint
EXPO_PUBLIC_GOOGLE_MAPS_API_KEY=your-maps-key
EXPO_PUBLIC_FIREBASE_CONFIG=your-firebase-config
```

### Testing Strategy

Each experiment includes:

- **Permission checks**: Proper permission handling
- **Error states**: Network offline, hardware unavaiHuble
- **Edge cases**: Empty responses, invalid inputs
- **Performance**: Memory usage, battery impact
- **Accessibility**: Screen reader support, high contrast

## 📚 Learning Resources

### Experiment Documentation

Each API experiment includes:

- **📖 Concept**: What the API does
- **🔧 Setup**: Installation and configuration
- **💡 Use Cases**: Real-world applications
- **⚠️ Gotchas**: Common pitfalls and limitations
- **🔗 References**: Official docs and examples

### Interactive Examples

```typescript
// Example: Camera with custom controls
export const CameraExperiment = () => {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>(CameraType.back);

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 1,
        base64: true,
        exif: false,
      });
      // Process photo...
    }
  };

  return (
    <ExperimentContainer
      title="Camera Capture"
      description="Take photos with custom quality settings"
      permission={permission}
      onRequestPermission={requestPermission}
    >
      <Camera
        ref={cameraRef}
        style={styles.camera}
        type={facing}
        flashMode={Camera.Constants.FlashMode.auto}
      >
        <CameraControls onCapture={takePicture} />
      </Camera>
    </ExperimentContainer>
  );
};
```

## 📱 Platform Coverage

| Feature Category  | iOS        | Android | Web        |
| ----------------- | ---------- | ------- | ---------- |
| **Core APIs**     | ✅ Full    | ✅ Full | ✅ Full    |
| **Camera/Media**  | ✅ Full    | ✅ Full | 🟡 Limited |
| **Location/Maps** | ✅ Full    | ✅ Full | 🟡 Limited |
| **Sensors**       | ✅ Full    | ✅ Full | ❌ None    |
| **Notifications** | ✅ Full    | ✅ Full | 🟡 Limited |
| **Hardware**      | 🟡 Limited | ✅ Full | ❌ None    |
| **Bluetooth/NFC** | 🟡 Limited | ✅ Full | ❌ None    |

## 🤝 Contributing

### Adding New Experiments

1. Create experiment in appropriate station
2. Add to experiment registry
3. Include tests and documentation
4. Update progress tracking

### Experiment Template

```typescript
import { ExperimentScreen } from "../components/ExperimentScreen";
import { useExperimentTracking } from "../hooks/useExperimentTracking";

export const NewAPIExperiment = () => {
  const { startExperiment, completeExperiment, logStep } =
    useExperimentTracking("new-api-experiment");

  return (
    <ExperimentScreen
      title="New API Test"
      description="Testing new Expo API functionality"
      difficulty="intermediate"
      estimatedTime="15 min"
      requirements={["Camera permission", "Network access"]}
    >
      {/* Your experiment UI */}
    </ExperimentScreen>
  );
};
```

## 📊 Current Status

- **🎯 Total APIs Covered**: 80+ (targeting 100+)
- **📱 Experiments Built**: 200+
- **🏗️ Stations Completed**: 5/8
- **🧪 Test Coverage**: 85%
- **📚 Documentation**: 90%

## 🔮 Roadmap

### Phase 1 (Current)

- ✅ Core navigation and experiment framework
- ✅ Basic API coverage for all stations
- 🔄 Advanced experiment implementations

### Phase 2 (Next)

- [ ] Web platform experiments
- [ ] Performance benchmarking tools
- [ ] Automated testing suite
- [ ] Community experiment submissions

### Phase 3 (Future)

- [ ] AI-powered experiment suggestions
- [ ] Real-time collaboration features
- [ ] Advanced analytics dashboard
- [ ] Expo SDK version compatibility matrix

## 📄 License

MIT License - feel free to use this project for learning, teaching, or building your own Expo applications.

---

**🚀 Ready to master every Expo API?**
_Built with ❤️ by the React Native community_
