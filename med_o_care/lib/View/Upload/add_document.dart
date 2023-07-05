import 'dart:developer';
import 'dart:io';

import 'package:file_picker/file_picker.dart';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:med_o_care/Constant/colors.dart';
import 'package:med_o_care/Constant/constants.dart';
import 'package:med_o_care/View/Upload/services/upload_docs_services.dart';

class AddDocument extends StatefulWidget {
  const AddDocument({super.key});

  @override
  State<AddDocument> createState() => _AddDocumentState();
}

class _AddDocumentState extends State<AddDocument> {
  TextEditingController titleController = TextEditingController();
  File? document;
  XFile? image;

  Future<dynamic>? getDocumentFile() async {
    FilePickerResult? result = await FilePicker.platform.pickFiles(
      type: FileType.custom,
      allowedExtensions: [
        "doc",
        "docx",
        "pdf",
      ],
    );
    if (result == null) return null;
    File selectedFile = File(result.files.single.path!);
    return selectedFile;
  }

  Future<dynamic> addImages() async {
    late final XFile? images;
    try {
      final picker = ImagePicker();
      images = await picker.pickImage(source: ImageSource.gallery);
    } on Exception catch (e) {
      log(e.toString());
    }
    if (images == null) return;

    return images;
  }

  @override
  Widget build(BuildContext context) {
    var size = MediaQuery.of(context).size;
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          "Add Document",
          style: TextStyle(
              color: ResourceColors.colorPrimaryLightTheme,
              fontWeight: FontWeight.w900),
        ),
        backgroundColor: Colors.transparent,
        elevation: 0,
        iconTheme:
            const IconThemeData(color: ResourceColors.colorPrimaryLightTheme),
      ),
      persistentFooterButtons: [
        GestureDetector(
          onTap: () async {
            showDialog(
                context: context,
                builder: (context) => const Center(
                      child: CircularProgressIndicator(),
                    ));
            final success = await UploadServices()
                .uploadFile(document!, titleController.text.trim());
            Navigator.pop(context);
            if (success) {
              Navigator.pushReplacementNamed(context, '/navbar');
            } else {
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(
                  content: Text('There seems to be an issue'),
                  duration: Duration(seconds: 3),
                ),
              );
            }
          },
          child: Container(
            padding: const EdgeInsets.symmetric(vertical: 15),
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(50),
              border: Border.all(color: colorPrimary),
              color: colorPrimary,
            ),
            child: const Center(
              child: Text(
                "Submit",
                style: TextStyle(color: Colors.white),
              ),
            ),
          ),
        ),
      ],
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 15),
          child:
              Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            const Text(
              'Title',
              style: TextStyle(fontSize: 20),
            ),
            const SizedBox(
              height: 12,
            ),
            TextFormField(
              keyboardType: TextInputType.emailAddress,
              controller: titleController,
              decoration: const InputDecoration(
                hintText: 'Enter  Title',
                border: OutlineInputBorder(
                    borderRadius: BorderRadius.all(Radius.circular(50))),
                fillColor: Colors.white,
                filled: true,
              ),
            ),
            const SizedBox(
              height: 12,
            ),
            const Text(
              'Upload Document',
              style: TextStyle(fontSize: 20),
            ),
            const SizedBox(
              height: 12,
            ),
            if (document == null)
              GestureDetector(
                onTap: () async {
                  image = await addImages();
                  log("Image added successfully");
                  setState(() {
                    document = File(image!.path);
                  });
                },
                child: Container(
                  padding: const EdgeInsets.symmetric(vertical: 15),
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(50),
                    border: Border.all(color: colorPrimary),
                    color: Colors.white,
                  ),
                  child: const Center(
                    child: Text(
                      "Upload Image",
                      style: TextStyle(color: colorPrimary),
                    ),
                  ),
                ),
              ),
            if (document != null && image != null)
              SizedBox(
                child: Image.file(
                  document!,
                  fit: BoxFit.cover,
                ),
              ),
            const SizedBox(
              height: 60,
            ),
          ]),
        ),
      ),
    );
  }
}
