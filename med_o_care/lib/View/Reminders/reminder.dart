// ignore_for_file: deprecated_member_use

import 'package:flutter/material.dart';
import 'package:flutter_speed_dial/flutter_speed_dial.dart';
import 'package:hive_flutter/hive_flutter.dart';
import 'package:intl/intl.dart';
import 'package:med_o_care/View/Reminders/buypill.dart';
import 'package:med_o_care/View/Reminders/takepill.dart';
import 'models/buy.dart';
import 'models/take.dart';

class MyReminders extends StatefulWidget {
  const MyReminders({super.key});

  @override
  State<MyReminders> createState() => _MyRemindersState();
}

class _MyRemindersState extends State<MyReminders> {
  late final Box box;

  @override
  void initState() {
    super.initState();
    box = Hive.box('reminderBox');
    Hive.openBox('reminderBox');
  }

  @override
  void dispose() {
    // Hive.close();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(children: [
        Row(
          children: [
            IconButton(
                onPressed: Navigator.of(context).pop,
                icon: const Icon(Icons.arrow_back)),
            const Text(
              'Reminders',
              style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
            ),
          ],
        ),
        const SizedBox(
          height: 14,
        ),
        _buildListView(),
      ]),
      floatingActionButton: SpeedDial(
          icon: Icons.add,
          backgroundColor: const Color(0xFF537FE7),
          overlayColor:
              const Color.fromARGB(255, 162, 189, 226).withOpacity(0.04),
          children: [
            SpeedDialChild(
              child: const Icon(Icons.medication, color: Colors.white),
              label: 'Take Pill',
              backgroundColor: Colors.blueAccent,
              onTap: () {
                Navigator.push(context,
                    MaterialPageRoute(builder: (context) => const TakePill()));
              },
            ),
            SpeedDialChild(
              child: const Icon(Icons.shopping_cart, color: Colors.white),
              label: 'Buy Pill',
              backgroundColor: Colors.blueAccent,
              onTap: () {
                Navigator.push(context,
                    MaterialPageRoute(builder: (context) => const BuyPill()));
              },
            ),
          ]),
    );
  }
}

Widget _buildListView() {
  return WatchBoxBuilder(
    box: Hive.box('reminderBox'),
    builder: (context, reminderBox) {
      return ListView.builder(
        shrinkWrap: true,
        itemCount: reminderBox.length,
        itemBuilder: (context, index) {
          final reminder = reminderBox.getAt(index);
          if (reminder is TakeReminder) {
            return Padding(
                padding:
                    const EdgeInsets.symmetric(horizontal: 20.0, vertical: 5),
                child: Container(
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(10),
                    border:
                        Border.all(color: const Color(0xFF537FE7), width: 0.8),
                  ),
                  child: ListTile(
                    title: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              reminder.title,
                              style: const TextStyle(
                                  fontSize: 16, fontWeight: FontWeight.bold),
                            ),
                            Text(
                              DateFormat.Hm().format(reminder.timer).toString(),
                            )
                          ],
                        ),
                        Text(
                          reminder.day.toString(),
                          style: const TextStyle(fontSize: 14),
                        )
                      ],
                    ),
                    trailing: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        IconButton(
                          icon: const Icon(Icons.delete),
                          onPressed: () {
                            reminderBox.deleteAt(index);
                          },
                          color: Colors.red[300],
                        )
                      ],
                    ),
                  ),
                ));
          } else {
            return Padding(
              padding:
                  const EdgeInsets.symmetric(horizontal: 20.0, vertical: 5),
              child: Container(
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(10),
                  border:
                      Border.all(color: const Color(0xFF537FE7), width: 0.8),
                ),
                child: ListTile(
                  title: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        reminder.title,
                        style: const TextStyle(
                            fontSize: 16, fontWeight: FontWeight.bold),
                      ),
                      Text(
                        reminder.interval.toString(),
                        style: TextStyle(color: Colors.grey[700]),
                      )
                    ],
                  ),
                  trailing: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: <Widget>[
                      IconButton(
                        icon: const Icon(Icons.refresh),
                        onPressed: () {
                          reminderBox.putAt(
                            index,
                            BuyReminder(reminder.title, reminder.interval),
                          );
                        },
                      ),
                      IconButton(
                        icon: const Icon(Icons.delete),
                        onPressed: () {
                          reminderBox.deleteAt(index);
                        },
                        color: Colors.red[300],
                      )
                    ],
                  ),
                ),
              ),
            );
          }
        },
      );
    },
  );
}
