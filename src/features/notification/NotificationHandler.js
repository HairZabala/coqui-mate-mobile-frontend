import PushNotification from 'react-native-push-notification';

class NotificationHandler {
  scheduleNotificationQueue = [];
  onNotificationQueue = [];

  onNotification(notification) {
    console.debug('Notification received: ', notification);

    if (typeof this._onNotification === 'function') {
      // Dispatch to handler
      this._onNotification(notification);
    } else {
      // Queue notification for when handler is added (can take a second or two to register on Android)
      this.onNotificationQueue.push(notification);
    }
  }

  onRegister(token) {
    console.debug('Registered for notifications: ', token);

    if (typeof this._onRegister === 'function') {
      this._onRegister(token);
    }
  }

  onAction(notification) {
    console.debug('Notification action received: ', notification);

    if (notification.action === 'Yes') {
      PushNotification.invokeApp(notification);
    }
  }

  // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  onRegistrationError(err) {
    console.error(err);
  }

  attachRegister(handler) {
    this._onRegister = handler;
  }

  attachNotification(handler) {
    this._onNotification = handler;

    // Handle any queued notifications
    while (this.onNotificationQueue.length > 0) {
      const queuedNotification = this.onNotificationQueue.shift();

      this._onNotification(queuedNotification);
    }
  }

  requestPermissions = async () => {
    return PushNotification.requestPermissions();
  };

  checkPermissions = async () => {
    const promise = new Promise((resolve) => {
      PushNotification.checkPermissions((permissions) => {
        resolve(permissions);
      });
    });

    return promise;
  };

  getScheduledLocalNotifications = async () => {
    const promise = new Promise((resolve) => {
      PushNotification.getScheduledLocalNotifications((notifications) => {
        resolve(notifications);
      });
    });

    return promise;
  };

  cancelLocalNotification = (id) => {
    PushNotification.cancelLocalNotifications({ id: `${id}` });
  };

  cancelAllLocalNotifications = () => {
    PushNotification.cancelAllLocalNotifications();
  };
}

const handler = new NotificationHandler();

PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: handler.onRegister.bind(handler),

  // (required) Called when a remote or local notification is opened or received
  onNotification: handler.onNotification.bind(handler),

  // (optional) Called when Action is pressed (Android)
  onAction: handler.onAction.bind(handler),

  // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  onRegistrationError: handler.onRegistrationError.bind(handler),

  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: true,

  /**
   * (optional) default: true
   * - Specified if permissions (ios) and token (android and ios) will requested or not,
   * - if not, you must call PushNotificationsHandler.requestPermissions() later
   */
  requestPermissions: false,
});

export default handler;
