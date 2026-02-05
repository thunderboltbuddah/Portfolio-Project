import { useState, useCallback, useEffect } from "react";

export default function Gyro() {
  const [permissionGranted, setPermissionGranted] = useState(false);

  const handleDeviceOrientation = useCallback((e: DeviceOrientationEvent) => {
    console.log("Alpha:", e.alpha, "Beta:", e.beta, "Gamma:", e.gamma);
  }, []);

  useEffect(() => {
    // Only attach listener if permission is granted or not iOS
    const isiOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (!permissionGranted && isiOS) return;

    window.addEventListener("deviceorientation", handleDeviceOrientation);

    return () => {
      window.removeEventListener("deviceorientation", handleDeviceOrientation);
    };
  }, [handleDeviceOrientation, permissionGranted]);

  return (
    <div>
      {/* iOS permission button */}
      {!permissionGranted && /iPhone|iPad|iPod/i.test(navigator.userAgent) && (
        <button
          onClick={async () => {
            if (
              typeof DeviceOrientationEvent !== "undefined" &&
              typeof (DeviceOrientationEvent as any).requestPermission === "function"
            ) {
              const response = await (DeviceOrientationEvent as any).requestPermission();
              if (response === "granted") {
                setPermissionGranted(true);
                alert("Gyro permission granted!");
              } else {
                alert("Permission denied!");
              }
            } else {
              // Non-iOS: allow automatically
              setPermissionGranted(true);
            }
          }}
        >
          Enable Gyro
        </button>
      )}
    </div>
  );
}
