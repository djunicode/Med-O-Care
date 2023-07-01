// ignore_for_file: camel_case_types

import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import 'package:hive/hive.dart';
import 'package:med_o_care/Constant/colors.dart';
import 'package:med_o_care/View/Reminders/models/take.dart';

const List<String> list = <String>[
  'MONDAY',
  'TUESDAY',
  'WEDNESDAY',
  'THURSDAY',
  'FRIDAY',
  'SATURDAY',
  'SUNDAY'
];
int _selectedindex=0;
class TakePill extends StatefulWidget {
  const TakePill({super.key});

  @override
  State<TakePill> createState() => _TakePillState();
}

class _TakePillState extends State<TakePill> {
  late final Box box;
  TextEditingController title = TextEditingController();
  String? _selectedhour = '0';
  String? _selectedmin = '0';
  String? _selectedphase = 'AM';
  TimeOfDay? result = TimeOfDay.now();
  bool checked = false;
  Future<void> _show() async {
    TimeOfDay? result =
        await showTimePicker(context: context, initialTime: TimeOfDay.now());
    if (result != null) {
      setState(() {
        _selectedhour = result?.hour.toString();
        _selectedmin = result?.minute.toString();
        _selectedphase = result?.period.name.toUpperCase();
      });
    } else {
      result = TimeOfDay.now();
      _selectedhour = '0';
      _selectedmin = '0';
      _selectedphase = 'AM';
    }
  }

  @override
  void initState() {
    result = TimeOfDay.now();
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
              child:
                  Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
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
                        icon: SvgPicture.asset("assets/icons/icon _menu_.svg"))
                  ],
                ),
                const SizedBox(
                  height: 20,
                ),
                const Padding(
                  padding: EdgeInsets.only(left: 38.0),
                  child: Text(
                    'Set Reminder',
                    style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                  ),
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
                          borderRadius: BorderRadius.all(Radius.circular(50))),
                      prefixIcon: Icon(Icons.email),
                      fillColor: Colors.white,
                      filled: true,
                    ),
                  ),
                ),
                const SizedBox(
                  height: 14,
                ),
                Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 10),
                    child: GestureDetector(
                      onTap: _show,
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const Text(
                            "Timer",
                            style: TextStyle(fontSize: 20, color: Colors.grey),
                          ),
                          const SizedBox(
                            height: 10,
                          ),
                          Row(
                            children: [
                              Container(
                                height: 80,
                                width: 80,
                                decoration: BoxDecoration(
                                    borderRadius: BorderRadius.circular(20),
                                    color: Colors.white),
                                child: Center(
                                  child: Text(
                                    _selectedhour!,
                                    style: const TextStyle(
                                        fontSize: 40,
                                        fontWeight: FontWeight.bold),
                                  ),
                                ),
                              ),
                              const SizedBox(
                                width: 15,
                              ),
                              Container(
                                height: 80,
                                width: 80,
                                decoration: BoxDecoration(
                                    borderRadius: BorderRadius.circular(20),
                                    color: Colors.white),
                                child: Center(
                                  child: Text(
                                    _selectedmin!,
                                    style: const TextStyle(
                                        fontSize: 40,
                                        fontWeight: FontWeight.bold),
                                  ),
                                ),
                              ),
                              const SizedBox(
                                width: 15,
                              ),
                              Container(
                                height: 80,
                                width: 80,
                                decoration: BoxDecoration(
                                    borderRadius: BorderRadius.circular(20),
                                    color: Colors.white),
                                child: Center(
                                  child: Text(
                                    _selectedphase!,
                                    style: const TextStyle(
                                        fontSize: 40,
                                        fontWeight: FontWeight.bold),
                                  ),
                                ),
                              ),
                              const SizedBox(
                                width: 15,
                              ),
                            ],
                          ),
                        ],
                      ),
                    )),
                const SizedBox(height: 15),
                Row(
                  mainAxisAlignment: MainAxisAlignment.end,
                  children: [
                    const Text('Everyday?',style: TextStyle(color: ResourceColors.colorPrimaryLightTheme),),
                    Checkbox(
                      value: checked,
                      onChanged: (bool? value) {
                        setState(() {
                          checked = value!;
                        });
                      },
                      checkColor: Colors.blue,
                    ),
                  ],
                ),
                const SizedBox(
                  height: 15,
                ),
                Container(
                  height: 50,
                  width: 340,
                  decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(40),
                      color: const Color.fromARGB(255, 169, 202, 230)
                          .withOpacity(0.6)),
                  child: const Center(child: selectDay()),
                ),
                ElevatedButton(
                    onPressed: () {
                      TakeReminder reminder = TakeReminder(list.elementAt(_selectedindex),
                          checked, convertTimeOfDayToDateTime(result!), title.text.toString());
                      box.add(reminder);
                      Navigator.pop(context);
                    },
                    child: const Text("ADD REMINDER"))
              ])),
        ),
      ),
    );
  }
}

class selectDay extends StatefulWidget {
  const selectDay({super.key});

  @override
  State<selectDay> createState() => _selectDayState();
}

class _selectDayState extends State<selectDay> {
  String dropdownValue = list.first;
  @override
  Widget build(BuildContext context) {
    return DropdownButton<String>(
      alignment: AlignmentDirectional.center,
      value: dropdownValue,
      underline: const SizedBox(),
      icon: const Icon(Icons.arrow_drop_down_outlined),
      elevation: 16,
      style: const TextStyle(color: Color(0xff473D3A)),
      onChanged: (String? value) {
        // This is called when the user selects an item.
        setState(() {
          dropdownValue = value!;
          _selectedindex = list.indexOf(value);
        });
      },
      items: list.map<DropdownMenuItem<String>>((String value) {
        return DropdownMenuItem<String>(
          value: value,
          child: Text(value),
        );
      }).toList(),
    );
  }
}
DateTime convertTimeOfDayToDateTime(TimeOfDay timeOfDay) {
  final now = DateTime.now();
  return DateTime(
    now.year,
    now.month,
    now.day,
    timeOfDay.hour,
    timeOfDay.minute,
  );
}