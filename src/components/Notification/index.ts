import { remote } from 'electron'

export interface NotificationOptions {
  title: string;
  subtitle: string;
  body: string
}
const Notification = (options: NotificationOptions): void => {
  const notification = new remote.Notification(options)

  notification.show()
}

export default Notification
