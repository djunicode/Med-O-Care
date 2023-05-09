import 'package:flutter/material.dart';
import 'package:med_o_care/Constant/colors.dart';

class UploadFileWidget extends StatefulWidget {
  final String title;
  final String type;
  const UploadFileWidget({super.key, required this.title, required this.type});

  @override
  State<UploadFileWidget> createState() => _UploadFileWidgetState();
}

class _UploadFileWidgetState extends State<UploadFileWidget> {
  @override
  Widget build(BuildContext context) {
    return Container(
      //height: MediaQuery.of(context).size.height * 0.14,
      margin: const EdgeInsets.only(top: 20),
      decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(20),
          color: Colors.white,
          border: Border.all(color: ResourceColors.colorTertiaryLightTheme)),
      padding: const EdgeInsets.all(19),
      child: Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
        Column(
          children: [
            Text(
              widget.title,
              style: const TextStyle(fontSize: 18),
            ),
            Text(
              widget.type,
              style: const TextStyle(color: Colors.grey),
            )
          ],
        ),
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
          decoration: BoxDecoration(
              color: ResourceColors.colorPrimaryLightTheme,
              borderRadius: BorderRadius.circular(30)),
          child: const Center(
              child: Text(
            "Edit",
            style: TextStyle(color: Colors.white),
          )),
        )
      ]),
    );
  }
}
