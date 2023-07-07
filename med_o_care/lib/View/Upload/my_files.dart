import 'package:flutter/material.dart';
import 'package:med_o_care/Constant/colors.dart';
import 'package:med_o_care/View/Auth/services/profile_api.dart';
import 'package:med_o_care/View/Upload/models/docs_model.dart';
import 'package:med_o_care/View/Upload/services/docs_services.dart';
import 'package:med_o_care/View/Upload/widgets.dart';

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
            FutureBuilder<List<DocsModel>?>(
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
                          itemCount: snapshot.data!.length,
                          itemBuilder: (context, index) {
                            return UploadFileWidget(
                              title: snapshot.data![index].name!,
                              base64String: snapshot.data![index].file!,
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
