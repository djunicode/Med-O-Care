import 'dart:convert';

import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:med_o_care/Constant/colors.dart';

class UploadFileWidget extends StatefulWidget {
  final String title;
  final String? base64String;
  const UploadFileWidget({super.key, required this.title, this.base64String});

  @override
  State<UploadFileWidget> createState() => _UploadFileWidgetState();
}

class _UploadFileWidgetState extends State<UploadFileWidget> {
  @override
  Widget build(BuildContext context) {
    Uint8List? bytes;
    if (widget.base64String != null) {
      bytes = base64Decode(widget.base64String!);
    }

    return Container(
      //height: MediaQuery.of(context).size.height * 0.14,
      margin: const EdgeInsets.only(top: 20),
      decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(20),
          color: Colors.white,
          border: Border.all(color: ResourceColors.colorTertiaryLightTheme)),
      padding: const EdgeInsets.all(19),
      child: Column(
        children: [
          if (bytes != null) Image.memory(bytes),
          Text(
            widget.title,
            style: const TextStyle(fontSize: 18),
          ),
        ],
      ),
    );
  }
}
