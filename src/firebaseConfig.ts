import firebase from "firebase/app";
import "firebase/messaging";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FCM_API_KEY,
  authDomain: import.meta.env.VITE_FCM_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FCM_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FCM_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FCM_APP_ID,
  measurementId: import.meta.env.VITE_FCM_MEASUREMENT_ID,
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // 이미 초기화되었다면, 초기화 된 것을 사용함
}

const messaging = firebase.messaging();

export function requestPermission() {
  void Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      messaging
        .getToken({
          vapidKey: import.meta.env.VITE_FCM_VAPID_KEY,
        })
        .then((token: string) => {
          console.log(`푸시 토큰 발급 완료 : ${token}`);
          localStorage.setItem("fcmToken", token);
        })
        .catch((e) => {
          console.log("푸시 토큰 가져오는 중에 에러 발생", e);
        });
    } else if (permission === "denied") {
      console.log("푸시 권한 차단");
    }
  });
}
