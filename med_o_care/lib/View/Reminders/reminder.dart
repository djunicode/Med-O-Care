import 'package:flutter/material.dart';
import 'package:flutter_speed_dial/flutter_speed_dial.dart';
import 'package:med_o_care/View/Reminders/buypill.dart';
import 'package:med_o_care/View/Reminders/takepill.dart';

class MyReminders extends StatefulWidget {
  const MyReminders({super.key});

  @override
  State<MyReminders> createState() => _MyRemindersState();
}

class _MyRemindersState extends State<MyReminders> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(children: []),
      floatingActionButton: SpeedDial(
          icon: Icons.add,
          backgroundColor: Color(0xFF537FE7),
          overlayColor: Color.fromARGB(255, 162, 189, 226).withOpacity(0.04),
          children: [
            SpeedDialChild(
              child: const Icon(Icons.medication, color: Colors.white),
              label: 'Take Pill',
              backgroundColor: Colors.blueAccent,
              onTap: () {
                Navigator.push(context,
                    MaterialPageRoute(builder: (context) => TakePill()));
              },
            ),
            SpeedDialChild(
              child: const Icon(Icons.shopping_cart, color: Colors.white),
              label: 'Buy Pill',
              backgroundColor: Colors.blueAccent,
              onTap: () {
                Navigator.push(context,
                    MaterialPageRoute(builder: (context) => buyPill()));
              },
            ),
          ]),
    );
  }
}
