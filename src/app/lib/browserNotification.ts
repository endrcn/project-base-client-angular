import { Injectable } from '@angular/core';


@Injectable()
export class BrowserNotification {

  constructor() {
  }

  check() {
    if ("Notification" in window) {

      var permission = Notification.permission;
      if (permission === "granted") {
        this.showNotification();
      } else if (permission === "default") {
        this.requestAndShowPermission();
      }
    }
  }

  showNotification(title = "", body = "") {
    if ("Notification" in window) {

      if (document.visibilityState === "visible") {
        return false;
      }

      let icon = "/assets/images/user.png";

      var notification = new Notification(title, { body: body, icon: icon });

      notification.addEventListener('click', () => {
        notification.close();
        window.parent.focus();
      });

      return true;
    }
    return false;
  }
  requestAndShowPermission() {
    Notification.requestPermission((permission) => {
      if (permission === "granted") {
        this.showNotification();
      }
    });
  }


}
