/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Platform,
  Image,
  Alert,
  Dimensions,
  ActivityIndicator,
  RefreshControl,
} from "react-native";

// Expo imports
import * as Device from "expo-device";
import * as Battery from "expo-battery";
import * as Application from "expo-application";
import * as Notifications from "expo-notifications";
import * as Location from "expo-location";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";
import { Audio } from "expo-av";
import { Accelerometer, Gyroscope } from "expo-sensors";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Network from "expo-network";
import * as Haptics from "expo-haptics";
import * as Clipboard from "expo-clipboard";
import Constants from "expo-constants";
import { JSX } from "react/jsx-runtime";
import useThemeStore from "@/store/themeStore";
import Layout from "@/components/layout/Layout";
import { ThemedView } from "@/components/themed-view";

// Types
interface DeviceInfo {
  brand: string | null;
  modelName: string | null;
  osName: string | null;
  osVersion: string | null;
  appVersion: string | null;
  deviceYearClass: number | null;
}

interface BatteryInfo {
  level: number | null;
  state: Battery.BatteryState | null;
  isCharging: boolean;
}

// Screen dimensions
const { width: screenWidth } = Dimensions.get("window");

// Notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true, // Add this
    shouldShowList: true, // Add this
  }),
});

// -----------------------------
// Main Component
// -----------------------------
export default function ExpoSettingsPlayground(): JSX.Element {
  const { isDark, toggleTheme } = useThemeStore();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    // Simulate refresh delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setRefreshing(false);
  }, []);

  const theme = isDark ? darkTheme : lightTheme;

  return (
    <Layout title="Settings">
      <ThemedView style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.contentContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false}
        >
          <AppearanceSection
            theme={theme}
            isDark={isDark}
            toggleTheme={toggleTheme}
          />
          <DeviceInfoSection theme={theme} />
          <NotificationsSection theme={theme} />
          <LocationSection theme={theme} />
          <MediaSection theme={theme} />
          <SensorsSection theme={theme} />
          <StorageSection theme={theme} />
          <ConnectivitySection theme={theme} />
          <HapticsSection theme={theme} />
          <PermissionsSection theme={theme} />
          <SystemInfoSection theme={theme} />

          <View style={{ height: 32 }} />
        </ScrollView>
      </ThemedView>
    </Layout>
  );
}

// -----------------------------
// Theme Configuration
// -----------------------------
const lightTheme = {
  surface: "#ffffff",
  surfaceSecondary: "#f1f3f4",
  primary: "#007AFF",
  primaryDark: "#0056CC",
  success: "#34C759",
  warning: "#FF9500",
  error: "#FF3B30",
  text: "#1d1d1f",
  textSecondary: "#86868b",
  border: "#d2d2d7",
  shadow: "rgba(0, 0, 0, 0.1)",
};

const darkTheme = {
  surface: "#1c1c1e",
  surfaceSecondary: "#2c2c2e",
  primary: "#0A84FF",
  primaryDark: "#0969DA",
  success: "#32D74B",
  warning: "#FF9F0A",
  error: "#FF453A",
  text: "#ffffff",
  textSecondary: "#8E8E93",
  border: "#38383a",
  shadow: "rgba(0, 0, 0, 0.3)",
};

// -----------------------------
// Appearance Section
// -----------------------------
const AppearanceSection: React.FC<{
  theme: typeof lightTheme;
  isDark: boolean;
  toggleTheme: () => void;
}> = ({ theme, isDark, toggleTheme }) => {
  const [fontScale, setFontScale] = useState<number>(1);
  const [selectedAccent, setSelectedAccent] = useState<string>("#007AFF");

  const accentColors = ["#007AFF", "#FF3B30", "#34C759", "#FF9500", "#AF52DE"];

  return (
    <Section title="Appearance" theme={theme} icon="🎨">
      <SettingRow
        title="Dark Mode"
        subtitle="Toggle between light and dark themes"
        theme={theme}
        rightComponent={
          <Switch
            value={isDark}
            onValueChange={toggleTheme}
            trackColor={{ false: theme.border, true: theme.primary }}
            thumbColor={isDark ? theme.surface : "#f4f3f4"}
          />
        }
      />

      <SettingRow
        title="Font Scale"
        subtitle={`Current scale: ${fontScale.toFixed(1)}x`}
        theme={theme}
        rightComponent={
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={[
                styles.scaleButton,
                { backgroundColor: theme.surfaceSecondary },
              ]}
              onPress={() => setFontScale((s) => Math.max(0.8, s - 0.1))}
            >
              <Text style={[styles.scaleButtonText, { color: theme.text }]}>
                -
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.scaleButton,
                { backgroundColor: theme.surfaceSecondary },
              ]}
              onPress={() => setFontScale((s) => Math.min(2, s + 0.1))}
            >
              <Text style={[styles.scaleButtonText, { color: theme.text }]}>
                +
              </Text>
            </TouchableOpacity>
          </View>
        }
      />

      <SettingRow
        title="Accent Color"
        subtitle="Choose your preferred accent color"
        theme={theme}
        rightComponent={
          <View style={styles.colorPalette}>
            {accentColors.map((color) => (
              <TouchableOpacity
                key={color}
                style={[
                  styles.colorSwatch,
                  { backgroundColor: color },
                  selectedAccent === color && styles.selectedColor,
                ]}
                onPress={() => setSelectedAccent(color)}
              />
            ))}
          </View>
        }
      />
    </Section>
  );
};

// -----------------------------
// Device Info Section
// -----------------------------
const DeviceInfoSection: React.FC<{ theme: typeof lightTheme }> = ({
  theme,
}) => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    brand: null,
    modelName: null,
    osName: null,
    osVersion: null,
    appVersion: null,
    deviceYearClass: null,
  });
  const [battery, setBattery] = useState<BatteryInfo>({
    level: null,
    state: null,
    isCharging: false,
  });
  const [loading, setLoading] = useState(false);

  const loadDeviceInfo = useCallback(async () => {
    setLoading(true);
    try {
      const info: DeviceInfo = {
        brand: Device.brand,
        modelName: Device.modelName || Device.modelId,
        osName: Device.osName,
        osVersion: Device.osVersion,
        appVersion: Application.nativeApplicationVersion,
        deviceYearClass: (Device as any).deviceYearClass || null,
      };
      setDeviceInfo(info);

      const level = await Battery.getBatteryLevelAsync();
      const state = await Battery.getBatteryStateAsync();
      setBattery({
        level,
        state,
        isCharging: state === Battery.BatteryState.CHARGING,
      });
    } catch (_error) {
      Alert.alert("Error", "Failed to load device info");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDeviceInfo();
  }, [loadDeviceInfo]);

  const getBatteryIcon = () => {
    if (battery.isCharging) return "⚡";
    if (!battery.level) return "🔋";
    if (battery.level < 0.2) return "🪫";
    if (battery.level < 0.5) return "🔋";
    return "🔋";
  };

  return (
    <Section title="Device & System" theme={theme} icon="📱">
      <InfoRow title="Brand" value={deviceInfo.brand || "-"} theme={theme} />
      <InfoRow
        title="Model"
        value={deviceInfo.modelName || "-"}
        theme={theme}
      />
      {/* <InfoRow
        title="Operating System"
        value={`${deviceInfo.osName || "-"} ${deviceInfo.osVersion || ""}`}
        theme={theme}
      /> */}
      <InfoRow
        title="App Version"
        value={deviceInfo.appVersion || "-"}
        theme={theme}
      />
      <InfoRow
        title="Battery"
        value={
          battery.level !== null ? `${Math.round(battery.level * 100)}%` : "-"
        }
        theme={theme}
        icon={getBatteryIcon()}
      />

      <TouchableOpacity
        style={[styles.refreshButton, { backgroundColor: theme.primary }]}
        onPress={loadDeviceInfo}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color={theme.surface} />
        ) : (
          <Text style={[styles.buttonText, { color: theme.surface }]}>
            Refresh Info
          </Text>
        )}
      </TouchableOpacity>
    </Section>
  );
};

// -----------------------------
// Notifications Section
// -----------------------------
const NotificationsSection: React.FC<{ theme: typeof lightTheme }> = ({
  theme,
}) => {
  const [token, setToken] = useState<string | null>(null);
  const [permission, setPermission] =
    useState<Notifications.NotificationPermissionsStatus | null>(null);
  const [latestNotification, setLatestNotification] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadPermissions = async () => {
      const p = await Notifications.getPermissionsAsync();
      setPermission(p);
    };
    loadPermissions();

    const receivedSub = Notifications.addNotificationReceivedListener(
      (notification) => {
        setLatestNotification(notification);
      }
    );

    return () => {
      receivedSub.remove();
    };
  }, []);

  const registerForNotifications = async () => {
    setLoading(true);
    try {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      const updatedPermission = await Notifications.getPermissionsAsync();
      setPermission(updatedPermission);

      if (finalStatus !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Notification permissions were not granted"
        );
        return;
      }

      const tokenData = await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig?.extra?.eas?.projectId,
      });
      setToken(tokenData.data);

      if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: theme.primary,
        });
      }

      Alert.alert("Success", "Successfully registered for notifications!");
    } catch (error) {
      Alert.alert("Error", "Failed to register for notifications");
    } finally {
      setLoading(false);
    }
  };

  const scheduleLocalNotification = async () => {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Test Notification 📱",
          body: "This is a local notification scheduled from the app",
          data: { type: "test", timestamp: Date.now() },
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
          seconds: 3,
        },
      });

      Alert.alert("Scheduled", "Local notification will appear in 3 seconds");
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch (error) {
      Alert.alert("Error", "Failed to schedule notification");
    }
  };

  const copyToken = async () => {
    if (token) {
      await Clipboard.setStringAsync(token);
      Alert.alert("Copied", "Push token copied to clipboard");
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const getPermissionStatus = () => {
    if (!permission) return { text: "Unknown", color: theme.textSecondary };

    switch (permission.status) {
      case "granted":
        return { text: "Granted", color: theme.success };
      case "denied":
        return { text: "Denied", color: theme.error };
      default:
        return { text: permission.status, color: theme.warning };
    }
  };

  const permissionStatus = getPermissionStatus();

  return (
    <Section title="Notifications" theme={theme} icon="🔔">
      <InfoRow
        title="Permission Status"
        value={permissionStatus.text}
        theme={theme}
        valueColor={permissionStatus.color}
      />

      {token && (
        <SettingRow
          title="Push Token"
          subtitle="Tap to copy to clipboard"
          theme={theme}
          onPress={copyToken}
          rightComponent={
            <Text style={[styles.tokenPreview, { color: theme.textSecondary }]}>
              {`${token.substring(0, 20)}...`}
            </Text>
          }
        />
      )}

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[
            styles.actionButton,
            { backgroundColor: theme.primary, flex: 1, marginRight: 8 },
          ]}
          onPress={registerForNotifications}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color={theme.surface} />
          ) : (
            <Text style={[styles.buttonText, { color: theme.surface }]}>
              Request Permission
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.actionButton,
            { backgroundColor: theme.success, flex: 1, marginLeft: 8 },
          ]}
          onPress={scheduleLocalNotification}
        >
          <Text style={[styles.buttonText, { color: theme.surface }]}>
            Test Local
          </Text>
        </TouchableOpacity>
      </View>

      {latestNotification && (
        <View
          style={[
            styles.notificationPreview,
            { backgroundColor: theme.surfaceSecondary },
          ]}
        >
          <Text style={[styles.notificationTitle, { color: theme.text }]}>
            Latest Notification:
          </Text>
          <Text
            style={[styles.notificationBody, { color: theme.textSecondary }]}
          >
            {latestNotification.request?.content?.title || "No title"}
          </Text>
        </View>
      )}
    </Section>
  );
};

// -----------------------------
// Location Section
// -----------------------------
const LocationSection: React.FC<{ theme: typeof lightTheme }> = ({ theme }) => {
  const [permission, setPermission] =
    useState<Location.LocationPermissionResponse | null>(null);
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [isWatching, setIsWatching] = useState(false);
  const [loading, setLoading] = useState(false);
  const watchRef = useRef<Location.LocationSubscription | null>(null);

  const requestLocationAndGet = async () => {
    setLoading(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      const permissionResponse = await Location.getForegroundPermissionsAsync();
      setPermission(permissionResponse);

      if (status !== "granted") {
        Alert.alert("Permission Denied", "Location permission is required");
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      setLocation(currentLocation);

      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch (error) {
      Alert.alert("Error", "Failed to get location");
    } finally {
      setLoading(false);
    }
  };

  const startLocationWatch = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Location permission is required");
        return;
      }

      watchRef.current = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          distanceInterval: 10,
        },
        (newLocation) => {
          setLocation(newLocation);
        }
      );

      setIsWatching(true);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } catch (error) {
      Alert.alert("Error", "Failed to start location watch");
    }
  };

  const stopLocationWatch = () => {
    if (watchRef.current) {
      watchRef.current.remove();
      watchRef.current = null;
      setIsWatching(false);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  useEffect(() => {
    return () => {
      if (watchRef.current) {
        watchRef.current.remove();
      }
    };
  }, []);

  const getPermissionStatus = () => {
    if (!permission) return { text: "Unknown", color: theme.textSecondary };

    switch (permission.status) {
      case "granted":
        return { text: "Granted", color: theme.success };
      case "denied":
        return { text: "Denied", color: theme.error };
      default:
        return { text: permission.status, color: theme.warning };
    }
  };

  const permissionStatus = getPermissionStatus();

  return (
    <Section title="Location Services" theme={theme} icon="📍">
      <InfoRow
        title="Permission Status"
        value={permissionStatus.text}
        theme={theme}
        valueColor={permissionStatus.color}
      />

      {location && (
        <>
          <InfoRow
            title="Latitude"
            value={location.coords.latitude.toFixed(6)}
            theme={theme}
          />
          <InfoRow
            title="Longitude"
            value={location.coords.longitude.toFixed(6)}
            theme={theme}
          />
          <InfoRow
            title="Accuracy"
            value={`±${Math.round(location.coords.accuracy || 0)}m`}
            theme={theme}
          />
        </>
      )}

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[
            styles.actionButton,
            { backgroundColor: theme.primary, flex: 1, marginRight: 8 },
          ]}
          onPress={requestLocationAndGet}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color={theme.surface} />
          ) : (
            <Text style={[styles.buttonText, { color: theme.surface }]}>
              Get Current
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.actionButton,
            {
              backgroundColor: isWatching ? theme.error : theme.success,
              flex: 1,
              marginLeft: 8,
            },
          ]}
          onPress={isWatching ? stopLocationWatch : startLocationWatch}
        >
          <Text style={[styles.buttonText, { color: theme.surface }]}>
            {isWatching ? "Stop Watch" : "Start Watch"}
          </Text>
        </TouchableOpacity>
      </View>
    </Section>
  );
};

// -----------------------------
// Media Section
// -----------------------------
const MediaSection: React.FC<{ theme: typeof lightTheme }> = ({ theme }) => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [hasPermissions, setHasPermissions] = useState({
    camera: false,
    mediaLibrary: false,
  });
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const checkPermissions = async () => {
      const cameraStatus = await Camera.getCameraPermissionsAsync();
      const libraryStatus = await ImagePicker.getMediaLibraryPermissionsAsync();

      setHasPermissions({
        camera: cameraStatus.status === "granted",
        mediaLibrary: libraryStatus.status === "granted",
      });
    };

    checkPermissions();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  const pickImageFromLibrary = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Media library access is required");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets?.[0]) {
        setImageUri(result.assets[0].uri);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to pick image");
    }
  };

  const takePhotoWithCamera = async () => {
    try {
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Camera access is required");
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets?.[0]) {
        setImageUri(result.assets[0].uri);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to take photo");
    }
  };

  const playTestSound = async () => {
    try {
      if (sound && isPlaying) {
        await sound.pauseAsync();
        setIsPlaying(false);
        return;
      }

      // Using a web-accessible sound for demo
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav" },
        { shouldPlay: true }
      );

      setSound(newSound);
      setIsPlaying(true);

      newSound.setOnPlaybackStatusUpdate((status) => {
        if ("didJustFinish" in status && status.didJustFinish) {
          setIsPlaying(false);
        }
      });

      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch (error) {
      // Fallback for when sound fails to load
      Alert.alert(
        "Audio",
        "Test sound playback attempted (file may not be available)"
      );
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  return (
    <Section title="Media & Camera" theme={theme} icon="📸">
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[
            styles.actionButton,
            { backgroundColor: theme.primary, flex: 1, marginRight: 8 },
          ]}
          onPress={pickImageFromLibrary}
        >
          <Text style={[styles.buttonText, { color: theme.surface }]}>
            Pick Image
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.actionButton,
            { backgroundColor: theme.success, flex: 1, marginLeft: 8 },
          ]}
          onPress={takePhotoWithCamera}
        >
          <Text style={[styles.buttonText, { color: theme.surface }]}>
            Take Photo
          </Text>
        </TouchableOpacity>
      </View>

      {imageUri && (
        <View style={styles.imagePreviewContainer}>
          <Image source={{ uri: imageUri }} style={styles.imagePreview} />
          <TouchableOpacity
            style={[styles.removeImageButton, { backgroundColor: theme.error }]}
            onPress={() => setImageUri(null)}
          >
            <Text style={[styles.buttonText, { color: theme.surface }]}>✕</Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity
        style={[
          styles.actionButton,
          {
            backgroundColor: isPlaying ? theme.error : theme.warning,
            marginTop: 16,
          },
        ]}
        onPress={playTestSound}
      >
        <Text style={[styles.buttonText, { color: theme.surface }]}>
          {isPlaying ? "Stop Audio" : "Play Test Sound"}
        </Text>
      </TouchableOpacity>
    </Section>
  );
};

// -----------------------------
// Sensors Section
// -----------------------------
const SensorsSection: React.FC<{ theme: typeof lightTheme }> = ({ theme }) => {
  const [sensorData, setSensorData] = useState({
    accelerometer: { x: 0, y: 0, z: 0 },
    gyroscope: { x: 0, y: 0, z: 0 },
  });
  const [sensorsActive, setSensorsActive] = useState({
    accelerometer: false,
    gyroscope: false,
  });

  useEffect(() => {
    let accSubscription: any;
    let gyroSubscription: any;

    if (sensorsActive.accelerometer) {
      Accelerometer.setUpdateInterval(100);
      accSubscription = Accelerometer.addListener((data) => {
        setSensorData((prev) => ({ ...prev, accelerometer: data }));
      });
    }

    if (sensorsActive.gyroscope) {
      Gyroscope.setUpdateInterval(100);
      gyroSubscription = Gyroscope.addListener((data) => {
        setSensorData((prev) => ({ ...prev, gyroscope: data }));
      });
    }

    return () => {
      if (accSubscription) accSubscription.remove();
      if (gyroSubscription) gyroSubscription.remove();
    };
  }, [sensorsActive]);

  const toggleSensor = (sensor: "accelerometer" | "gyroscope") => {
    setSensorsActive((prev) => ({
      ...prev,
      [sensor]: !prev[sensor],
    }));
    Haptics.selectionAsync();
  };

  const formatSensorValue = (value: number): string => {
    return value.toFixed(3);
  };

  return (
    <Section title="Motion Sensors" theme={theme} icon="📳">
      <SettingRow
        title="Accelerometer"
        subtitle={
          sensorsActive.accelerometer
            ? `X:${formatSensorValue(
                sensorData.accelerometer.x
              )} Y:${formatSensorValue(
                sensorData.accelerometer.y
              )} Z:${formatSensorValue(sensorData.accelerometer.z)}`
            : "Tap to activate"
        }
        theme={theme}
        rightComponent={
          <Switch
            value={sensorsActive.accelerometer}
            onValueChange={() => toggleSensor("accelerometer")}
            trackColor={{ false: theme.border, true: theme.success }}
          />
        }
      />

      <SettingRow
        title="Gyroscope"
        subtitle={
          sensorsActive.gyroscope
            ? `X:${formatSensorValue(
                sensorData.gyroscope.x
              )} Y:${formatSensorValue(
                sensorData.gyroscope.y
              )} Z:${formatSensorValue(sensorData.gyroscope.z)}`
            : "Tap to activate"
        }
        theme={theme}
        rightComponent={
          <Switch
            value={sensorsActive.gyroscope}
            onValueChange={() => toggleSensor("gyroscope")}
            trackColor={{ false: theme.border, true: theme.success }}
          />
        }
      />
    </Section>
  );
};

// -----------------------------
// Storage Section
// -----------------------------
const StorageSection: React.FC<{ theme: typeof lightTheme }> = ({ theme }) => {
  const [secureValue, setSecureValue] = useState<string | null>(null);
  const [asyncValue, setAsyncValue] = useState<string | null>(null);
  const [keyInput, setKeyInput] = useState<string>("demo_key");
  const [valueInput, setValueInput] = useState<string>("test_value");
  const [loading, setLoading] = useState(false);

  const saveToSecureStore = async () => {
    setLoading(true);
    try {
      const value = `secure_${Date.now()}`;
      await SecureStore.setItemAsync("demo_secure_key", value);
      const retrievedValue = await SecureStore.getItemAsync("demo_secure_key");
      setSecureValue(retrievedValue);

      Alert.alert("Success", "Value saved to SecureStore");
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch (error) {
      Alert.alert("Error", "Failed to save to SecureStore");
    } finally {
      setLoading(false);
    }
  };

  const saveToAsyncStorage = async () => {
    setLoading(true);
    try {
      const key = keyInput || "demo_key";
      const value = valueInput || `async_${Date.now()}`;

      await AsyncStorage.setItem(key, value);
      const retrievedValue = await AsyncStorage.getItem(key);
      setAsyncValue(retrievedValue);

      Alert.alert("Success", "Value saved to AsyncStorage");
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch (error) {
      Alert.alert("Error", "Failed to save to AsyncStorage");
    } finally {
      setLoading(false);
    }
  };

  const clearStorage = async () => {
    Alert.alert(
      "Clear Storage",
      "Are you sure you want to clear all test data?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear",
          style: "destructive",
          onPress: async () => {
            try {
              await SecureStore.deleteItemAsync("demo_secure_key");
              await AsyncStorage.removeItem(keyInput || "demo_key");
              setSecureValue(null);
              setAsyncValue(null);
              Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Success
              );
            } catch (error) {
              Alert.alert("Error", "Failed to clear storage");
            }
          },
        },
      ]
    );
  };

  return (
    <Section title="Data Storage" theme={theme} icon="💾">
      <View style={styles.inputContainer}>
        <Text style={[styles.inputLabel, { color: theme.text }]}>
          Storage Key:
        </Text>
        <TextInput
          style={[
            styles.textInput,
            {
              backgroundColor: theme.surfaceSecondary,
              color: theme.text,
              borderColor: theme.border,
            },
          ]}
          value={keyInput}
          onChangeText={setKeyInput}
          placeholder="Enter key name"
          placeholderTextColor={theme.textSecondary}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={[styles.inputLabel, { color: theme.text }]}>
          Storage Value:
        </Text>
        <TextInput
          style={[
            styles.textInput,
            {
              backgroundColor: theme.surfaceSecondary,
              color: theme.text,
              borderColor: theme.border,
            },
          ]}
          value={valueInput}
          onChangeText={setValueInput}
          placeholder="Enter value to store"
          placeholderTextColor={theme.textSecondary}
        />
      </View>

      {secureValue && (
        <InfoRow
          title="SecureStore Value"
          value={secureValue}
          theme={theme}
          icon="🔒"
        />
      )}

      {asyncValue && (
        <InfoRow
          title="AsyncStorage Value"
          value={asyncValue}
          theme={theme}
          icon="📦"
        />
      )}

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[
            styles.actionButton,
            { backgroundColor: theme.primary, flex: 1, marginRight: 4 },
          ]}
          onPress={saveToSecureStore}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color={theme.surface} />
          ) : (
            <Text
              style={[
                styles.buttonText,
                { color: theme.surface, fontSize: 12 },
              ]}
            >
              Save Secure
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.actionButton,
            { backgroundColor: theme.success, flex: 1, marginHorizontal: 4 },
          ]}
          onPress={saveToAsyncStorage}
          disabled={loading}
        >
          <Text
            style={[styles.buttonText, { color: theme.surface, fontSize: 12 }]}
          >
            Save Async
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.actionButton,
            { backgroundColor: theme.error, flex: 1, marginLeft: 4 },
          ]}
          onPress={clearStorage}
        >
          <Text
            style={[styles.buttonText, { color: theme.surface, fontSize: 12 }]}
          >
            Clear All
          </Text>
        </TouchableOpacity>
      </View>
    </Section>
  );
};

// -----------------------------
// Connectivity Section
// -----------------------------
const ConnectivitySection: React.FC<{ theme: typeof lightTheme }> = ({
  theme,
}) => {
  const [networkState, setNetworkState] = useState<Network.NetworkState | null>(
    null
  );
  const [loading, setLoading] = useState(false);

  const refreshNetworkInfo = useCallback(async () => {
    setLoading(true);
    try {
      const state = await Network.getNetworkStateAsync();
      setNetworkState(state);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch (error) {
      Alert.alert("Error", "Failed to get network information");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshNetworkInfo();
  }, [refreshNetworkInfo]);

  const getConnectionIcon = () => {
    if (!networkState) return "❓";
    if (!networkState.isConnected) return "❌";

    switch (networkState.type) {
      case Network.NetworkStateType.WIFI:
        return "📶";
      case Network.NetworkStateType.CELLULAR:
        return "📱";
      case Network.NetworkStateType.ETHERNET:
        return "🌐";
      default:
        return "🔗";
    }
  };

  const getConnectionStatus = () => {
    if (!networkState) return { text: "Unknown", color: theme.textSecondary };

    return {
      text: networkState.isConnected ? "Connected" : "Disconnected",
      color: networkState.isConnected ? theme.success : theme.error,
    };
  };

  const connectionStatus = getConnectionStatus();

  return (
    <Section title="Network & Connectivity" theme={theme} icon="🌐">
      <InfoRow
        title="Connection Status"
        value={connectionStatus.text}
        theme={theme}
        valueColor={connectionStatus.color}
        icon={getConnectionIcon()}
      />

      {networkState && (
        <>
          <InfoRow
            title="Network Type"
            value={networkState.type || "Unknown"}
            theme={theme}
          />

          {networkState.isConnected &&
            networkState.isInternetReachable !== undefined && (
              <InfoRow
                title="Internet Reachable"
                value={networkState.isInternetReachable ? "Yes" : "No"}
                theme={theme}
                valueColor={
                  networkState.isInternetReachable
                    ? theme.success
                    : theme.warning
                }
              />
            )}
        </>
      )}

      <TouchableOpacity
        style={[styles.actionButton, { backgroundColor: theme.primary }]}
        onPress={refreshNetworkInfo}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color={theme.surface} />
        ) : (
          <Text style={[styles.buttonText, { color: theme.surface }]}>
            Refresh Network Info
          </Text>
        )}
      </TouchableOpacity>
    </Section>
  );
};

// -----------------------------
// Haptics Section
// -----------------------------
const HapticsSection: React.FC<{ theme: typeof lightTheme }> = ({ theme }) => {
  const hapticOptions = [
    {
      title: "Selection",
      subtitle: "Light feedback for UI selections",
      action: () => Haptics.selectionAsync(),
      color: theme.primary,
    },
    {
      title: "Impact Light",
      subtitle: "Light impact feedback",
      action: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light),
      color: theme.success,
    },
    {
      title: "Impact Medium",
      subtitle: "Medium impact feedback",
      action: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium),
      color: theme.warning,
    },
    {
      title: "Impact Heavy",
      subtitle: "Heavy impact feedback",
      action: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy),
      color: theme.error,
    },
    {
      title: "Success",
      subtitle: "Success notification feedback",
      action: () =>
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success),
      color: theme.success,
    },
    {
      title: "Error",
      subtitle: "Error notification feedback",
      action: () =>
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error),
      color: theme.error,
    },
  ];

  return (
    <Section title="Haptics & Vibration" theme={theme} icon="📳">
      <View style={styles.hapticGrid}>
        {hapticOptions.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.hapticButton,
              {
                backgroundColor: option.color,
                marginBottom: 8,
              },
            ]}
            onPress={option.action}
          >
            <Text style={[styles.hapticButtonTitle, { color: theme.surface }]}>
              {option.title}
            </Text>
            <Text
              style={[
                styles.hapticButtonSubtitle,
                { color: theme.surface, opacity: 0.8 },
              ]}
            >
              {option.subtitle}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </Section>
  );
};

// -----------------------------
// Permissions Section
// -----------------------------
const PermissionsSection: React.FC<{ theme: typeof lightTheme }> = ({
  theme,
}) => {
  const [permissions, setPermissions] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(false);

  const checkAllPermissions = async () => {
    setLoading(true);
    try {
      const [notifications, location, camera, mediaLibrary] = await Promise.all(
        [
          Notifications.getPermissionsAsync(),
          Location.getForegroundPermissionsAsync(),
          Camera.getCameraPermissionsAsync(),
          ImagePicker.getMediaLibraryPermissionsAsync(),
        ]
      );

      setPermissions({
        notifications: notifications.status,
        location: location.status,
        camera: camera.status,
        mediaLibrary: mediaLibrary.status,
      });

      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch (error) {
      Alert.alert("Error", "Failed to check permissions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAllPermissions();
  }, []);

  const getPermissionColor = (status: string) => {
    switch (status) {
      case "granted":
        return theme.success;
      case "denied":
        return theme.error;
      case "undetermined":
        return theme.warning;
      default:
        return theme.textSecondary;
    }
  };

  const getPermissionIcon = (status: string) => {
    switch (status) {
      case "granted":
        return "✅";
      case "denied":
        return "❌";
      case "undetermined":
        return "❓";
      default:
        return "❓";
    }
  };

  return (
    <Section title="App Permissions" theme={theme} icon="🔐">
      {Object.entries(permissions).map(([key, status]) => (
        <InfoRow
          key={key}
          title={key.charAt(0).toUpperCase() + key.slice(1)}
          value={status}
          theme={theme}
          valueColor={getPermissionColor(status)}
          icon={getPermissionIcon(status)}
        />
      ))}

      <TouchableOpacity
        style={[styles.actionButton, { backgroundColor: theme.primary }]}
        onPress={checkAllPermissions}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color={theme.surface} />
        ) : (
          <Text style={[styles.buttonText, { color: theme.surface }]}>
            Refresh Permissions
          </Text>
        )}
      </TouchableOpacity>
    </Section>
  );
};

// -----------------------------
// System Info Section
// -----------------------------
const SystemInfoSection: React.FC<{ theme: typeof lightTheme }> = ({
  theme,
}) => {
  const [systemInfo, setSystemInfo] = useState<any>({});

  useEffect(() => {
    const loadSystemInfo = async () => {
      try {
        const info = {
          expoVersion: Constants.expoVersion,
          platform: Platform.OS,
          platformVersion: Platform.Version,
          isDevice: Device.isDevice,
          screenWidth: screenWidth,
          screenHeight: Dimensions.get("window").height,
        };
        setSystemInfo(info);
      } catch (error) {
        console.error("Failed to load system info:", error);
      }
    };

    loadSystemInfo();
  }, []);

  return (
    <Section title="System Information" theme={theme} icon="⚙️">
      <InfoRow
        title="Expo Version"
        value={systemInfo.expoVersion || "-"}
        theme={theme}
      />
      <InfoRow
        title="Platform"
        value={systemInfo.platform || "-"}
        theme={theme}
      />
      <InfoRow
        title="Platform Version"
        value={String(systemInfo.platformVersion || "-")}
        theme={theme}
      />
      <InfoRow
        title="Is Physical Device"
        value={systemInfo.isDevice ? "Yes" : "No"}
        theme={theme}
      />
      <InfoRow
        title="Screen Size"
        value={`${systemInfo.screenWidth}×${systemInfo.screenHeight}`}
        theme={theme}
      />
    </Section>
  );
};

// -----------------------------
// Reusable Components
// -----------------------------
const Section: React.FC<{
  title: string;
  theme: typeof lightTheme;
  icon?: string;
  children: React.ReactNode;
}> = ({ title, theme, icon, children }) => (
  <View style={[styles.section, { backgroundColor: theme.surface }]}>
    <View style={styles.sectionHeader}>
      {icon && <Text style={styles.sectionIcon}>{icon}</Text>}
      <Text style={[styles.sectionTitle, { color: theme.text }]}>{title}</Text>
    </View>
    <View style={styles.sectionContent}>{children}</View>
  </View>
);

const SettingRow: React.FC<{
  title: string;
  subtitle?: string;
  theme: typeof lightTheme;
  rightComponent?: React.ReactNode;
  onPress?: () => void;
}> = ({ title, subtitle, theme, rightComponent, onPress }) => (
  <TouchableOpacity
    style={[
      styles.settingRow,
      { borderBottomColor: theme.border },
      onPress && styles.pressable,
    ]}
    onPress={onPress}
    disabled={!onPress}
  >
    <View style={styles.settingContent}>
      <Text style={[styles.settingTitle, { color: theme.text }]}>{title}</Text>
      {subtitle && (
        <Text style={[styles.settingSubtitle, { color: theme.textSecondary }]}>
          {subtitle}
        </Text>
      )}
    </View>
    {rightComponent && (
      <View style={styles.settingRight}>{rightComponent}</View>
    )}
  </TouchableOpacity>
);

const InfoRow: React.FC<{
  title: string;
  value: string;
  theme: typeof lightTheme;
  valueColor?: string;
  icon?: string;
}> = ({ title, value, theme, valueColor, icon }) => (
  <View style={[styles.infoRow, { borderBottomColor: theme.border }]}>
    <View style={styles.infoLeft}>
      {icon && <Text style={styles.infoIcon}>{icon}</Text>}
      <Text style={[styles.infoTitle, { color: theme.text }]}>{title}</Text>
    </View>
    <Text
      style={[styles.infoValue, { color: valueColor || theme.textSecondary }]}
    >
      {value}
    </Text>
  </View>
);

// -----------------------------
// Styles
// -----------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  header: {
    marginBottom: 24,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
  },
  section: {
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    paddingBottom: 12,
  },
  sectionIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  sectionContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  pressable: {
    opacity: 0.7,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 14,
    opacity: 0.8,
  },
  settingRight: {
    marginLeft: 16,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  infoLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  infoIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  infoTitle: {
    fontSize: 15,
    fontWeight: "500",
  },
  infoValue: {
    fontSize: 15,
    fontWeight: "400",
    textAlign: "right",
    marginLeft: 16,
  },
  buttonGroup: {
    flexDirection: "row",
    gap: 8,
  },
  scaleButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  scaleButtonText: {
    fontSize: 18,
    fontWeight: "600",
  },
  colorPalette: {
    flexDirection: "row",
    gap: 8,
  },
  colorSwatch: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  selectedColor: {
    borderWidth: 2,
    borderColor: "#ffffff",
  },
  refreshButton: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  tokenPreview: {
    fontSize: 14,
    fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace",
  },
  buttonRow: {
    flexDirection: "row",
    marginTop: 12,
  },
  actionButton: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 44,
  },
  notificationPreview: {
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
  },
  notificationTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  notificationBody: {
    fontSize: 14,
  },
  imagePreviewContainer: {
    position: "relative",
    marginTop: 12,
    alignItems: "center",
  },
  imagePreview: {
    width: 200,
    height: 150,
    borderRadius: 8,
    resizeMode: "cover",
  },
  removeImageButton: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    marginBottom: 12,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 6,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  hapticGrid: {
    marginTop: 8,
  },
  hapticButton: {
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
  },
  hapticButtonTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 2,
  },
  hapticButtonSubtitle: {
    fontSize: 12,
    textAlign: "center",
  },
});
