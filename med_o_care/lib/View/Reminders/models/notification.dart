// ignore_for_file: avoid_print

import 'package:awesome_notifications/awesome_notifications.dart';

Future<void> createBuyPillNotification(
    String body, int interval, int id) async {
  print("Buy Pill Notification Added");
  final scheduleTime = DateTime.now().add(Duration(days: interval));
  await AwesomeNotifications().createNotification(
      content: NotificationContent(
        id: id, //generate id using index in the database
        channelKey: 'basic_channel',
        title: "It's time to buy medicines",
        body: "You have to order your supllies of $body",
      ),
      schedule: NotificationCalendar.fromDate(
        date: scheduleTime,
        allowWhileIdle: true,
      ));
}

Future<void> createTakePillNotification(
    String body, DateTime time, String day, bool checked, int id) async {
  print("Take Pill Notification Added");
  await AwesomeNotifications().createNotification(
      content: NotificationContent(
        id: id,
        channelKey: 'scheduled_channel',
        title: 'It\'s time to take your pills',
        body: 'You have to take the dose of $body',
        notificationLayout: NotificationLayout.Default,
      ),
      actionButtons: [
        NotificationActionButton(
          key: 'MARK_DONE',
          label: 'Mark Done',
        )
      ],
      schedule: checked
          ? NotificationCalendar(
              weekday: DateTime.daysPerWeek,
              hour: time.hour,
              minute: time.minute,
              second: 0,
              millisecond: 0,
              repeats: true,
            )
          : NotificationCalendar(
              weekday: DateTime.daysPerWeek,
              hour: time.hour,
              minute: time.minute,
              second: 0,
              millisecond: 0,
              repeats: false,
            ));
}
