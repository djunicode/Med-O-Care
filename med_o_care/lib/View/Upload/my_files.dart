import 'package:flutter/material.dart';
import 'package:med_o_care/Constant/colors.dart';
import 'package:med_o_care/View/Auth/services/profile_api.dart';
import 'package:med_o_care/View/Upload/models/docs_model.dart';
import 'package:med_o_care/View/Upload/services/docs_services.dart';
import 'package:med_o_care/View/Upload/widgets.dart';
import 'package:med_o_care/models/profile_model.dart';

class UploadFiles extends StatefulWidget {
  const UploadFiles({super.key});

  @override
  State<UploadFiles> createState() => _UploadFilesState();
}

class _UploadFilesState extends State<UploadFiles> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 15),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              "Uploads",
              style: TextStyle(fontSize: 22, fontWeight: FontWeight.w900),
            ),
            FutureBuilder(
                future: DocServices().getDocData(),
                builder: (context, snapshot) {
                  if (snapshot.connectionState == ConnectionState.waiting) {
                    return Center(
                      child: CircularProgressIndicator(),
                    );
                  }
                  if (snapshot.hasError) {
                    return Center(
                      child: Text(snapshot.error.toString()),
                    );
                  }
                  if (!snapshot.hasData) {
                    return Text("No data");
                  }
                  return Expanded(
                    child: SingleChildScrollView(
                      physics: const BouncingScrollPhysics(),
                      child: ListView.builder(
                          physics: const NeverScrollableScrollPhysics(),
                          shrinkWrap: true,
                          itemCount: snapshot.data!.medicalFileCount,
                          itemBuilder: (context, index) {
                            return const UploadFileWidget(
                              title: "Title",
                              type: "type",
                            );
                          }),
                    ),
                  );
                })
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        backgroundColor: ResourceColors.colorPrimaryLightTheme,
        onPressed: () {
          Navigator.pushNamed(context, '/add_files');
        },
        child: const Icon(
          Icons.add,
          color: Colors.white,
        ),
      ),
    );
  }
}
