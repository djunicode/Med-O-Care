// ignore_for_file: camel_case_types

import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:hive/hive.dart';

import 'models/buy.dart';
import 'models/notification.dart';

const List<int> list = <int>[1, 2, 5, 7, 14, 28, 45, 60];
int _selectedindex = 0;

class BuyPill extends StatefulWidget {
  const BuyPill({super.key});

  @override
  State<BuyPill> createState() => _BuyPillState();
}

class _BuyPillState extends State<BuyPill> {
  late final Box box;
  TextEditingController title = TextEditingController();

  @override
  void initState() {
    super.initState();
    box = Hive.box('reminderBox');
    Hive.openBox('reminderBox');
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SingleChildScrollView(
        child: SafeArea(
          child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 15, vertical: 8),
              child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Image.asset(
                          "assets/images/med-o-care.png",
                          height: 65,
                          width: 65,
                        ),
                        IconButton(
                            onPressed: () {},
                            icon: SvgPicture.asset(
                                "assets/icons/icon _menu_.svg"))
                      ],
                    ),
                    const SizedBox(
                      height: 20,
                    ),
                    Row(
                      children: [
                        IconButton(
                            onPressed: Navigator.of(context).pop,
                            icon: const Icon(Icons.arrow_back)),
                        const Text(
                          'Set Reminder',
                          style: TextStyle(
                              fontSize: 16, fontWeight: FontWeight.bold),
                        ),
                      ],
                    ),
                    const SizedBox(
                      height: 14,
                    ),
                    Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 10),
                      child: TextFormField(
                        keyboardType: TextInputType.emailAddress,
                        controller: title,
                        decoration: const InputDecoration(
                          labelText: "Title",
                          hintText: 'Enter title ',
                          border: OutlineInputBorder(
                              borderRadius:
                                  BorderRadius.all(Radius.circular(50))),
                          prefixIcon: Icon(Icons.email),
                          fillColor: Colors.white,
                          filled: true,
                        ),
                      ),
                    ),
                    const SizedBox(
                      height: 15,
                    ),
                    const Padding(
                      padding: EdgeInsets.only(left: 25, bottom: 5),
                      child: Text(
                        "Interval",
                        style: TextStyle(fontSize: 20, color: Colors.black),
                      ),
                    ),
                    Center(
                      child: Container(
                        height: 50,
                        width: 300,
                        decoration: BoxDecoration(
                            borderRadius: BorderRadius.circular(40),
                            color: const Color.fromARGB(255, 169, 202, 230)
                                .withOpacity(0.6)),
                        child: const Center(child: selectInterval()),
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.all(15.0),
                      child: Center(
                        child: InkWell(
                            onTap: () {
                              BuyReminder reminder = BuyReminder(
                                  title.text.toString(),
                                  list.elementAt(_selectedindex));
                              box.add(reminder);
                              //int id = box.get(reminder);
                              int id=0;
                              createBuyPillNotification(title.text.toString(),
                                  list.elementAt(_selectedindex), id);
                              Navigator.pop(context);
                            },
                            child: Container(
                                height: 45,
                                width: 150,
                                decoration: BoxDecoration(
                                  color: const Color(0xFF537FE7),
                                  borderRadius: BorderRadius.circular(50),
                                ),
                                child: const Center(
                                  child: Text("ADD REMINDER",
                                      style: TextStyle(
                                          color: Colors.white, fontSize: 16)),
                                ))),
                      ),
                    ),
                  ])),
        ),
      ),
    );
  }
}

// ignore: must_be_immutable
class selectInterval extends StatefulWidget {
  const selectInterval({super.key});

  @override
  State<selectInterval> createState() => _selectIntervalState();
}

class _selectIntervalState extends State<selectInterval> {
  String dropdown = list.first.toString();
  @override
  Widget build(BuildContext context) {
    return DropdownButton<String>(
      alignment: AlignmentDirectional.center,
      value: dropdown,
      underline: const SizedBox(),
      icon: const Icon(Icons.arrow_drop_down_outlined),
      elevation: 16,
      style: const TextStyle(color: Color(0xff473D3A)),
      onChanged: (String? value) {
        setState(() {
          dropdown = value!;
          _selectedindex = list.indexOf(int.parse(value));
        });
      },
      items: list.map<DropdownMenuItem<String>>((int value) {
        return DropdownMenuItem<String>(
          value: value.toString(),
          child: Text(value.toString()),
        );
      }).toList(),
    );
  }
}
