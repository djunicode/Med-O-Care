import 'package:hive/hive.dart';
part 'take.g.dart';

@HiveType(typeId: 0)
class TakeReminder {
  @HiveField(0)
  final String title;
  @HiveField(1)
  final String day;
  @HiveField(2)
  final DateTime timer;
  @HiveField(3)
  final bool everyday;
  TakeReminder(this.day, this.everyday, this.timer, this.title);
}
