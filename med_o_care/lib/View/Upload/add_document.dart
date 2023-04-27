import 'package:flutter/material.dart';
import 'package:med_o_care/Constant/colors.dart';

class AddDocument extends StatefulWidget {
  const AddDocument({super.key});

  @override
  State<AddDocument> createState() => _AddDocumentState();
}

class _AddDocumentState extends State<AddDocument> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          "Add Document",
          style: TextStyle(
              color: ResourceColors.colorPrimaryLightTheme,
              fontWeight: FontWeight.w900),
        ),
        backgroundColor: Colors.transparent,
        elevation: 0,
        iconTheme: IconThemeData(color: ResourceColors.colorPrimaryLightTheme),
      ),
    );
  }
}
