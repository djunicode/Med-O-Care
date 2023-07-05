import 'package:hive/hive.dart';
part 'buy.g.dart';

@HiveType(typeId: 1)
class BuyReminder{
  @HiveField(0)
  late String title;
  @HiveField(1)
  late int interval;
  BuyReminder(this.title,this.interval);
}