import 'dart:convert';

// // ignore_for_file: public_member_api_docs, sort_constructors_first
// import 'dart:convert';
// import 'dart:io';

// import 'package:collection/collection.dart';
// import 'package:flutter/foundation.dart';

// class FileWithName {
//   final String name;
//   final File file;
//   FileWithName({
//     required this.name,
//     required this.file,
//   });

//   factory FileWithName.fromMap(Map<String, dynamic> map) {
//     final tempFile =
//     return FileWithName(
//       name: map['name'] as String,
//       file: File.fromMap(map['file'] as Map<String,dynamic>),
//     );
//   }

// }

// class DocModel {
//   final int insuranceFileCount;
//   final int medicalFileCount;
//   final List<FileWithName> medicalFiles;
//   final List<FileWithName> insuranceFiles;

//   DocModel({
//     required this.insuranceFileCount,
//     required this.medicalFileCount,
//     required this.medicalFiles,
//     required this.insuranceFiles,
//   });

//   Future<DocModel> fromMap(Map<String, dynamic> map) async {
//     List<FileWithName> medicalFiles = [];
//     List<FileWithName> insuranceFiles = [];
//     if (map['medicalFiles'] != null) {
//       List<Map<String, dynamic>> medicalFileList =
//           List<Map<String, dynamic>>.from(map['medicalFiles']);
//           for(int i=0; i<medicalFileList.length; i++){
//             final fileBytes = Uint8List.fromList(medicalFileList[i]['file']['data']);
//             final file = await File('${directory.path}/${medicalFileList[i]['name']}').writeAsBytes(fileBytes);
//             medicalFiles.add(FileWithName(name: medicalFileList[i]['name'], file: file));
//           }
//       medicalFiles = medicalFileList
//           .map((Map<String, dynamic> fileMap) {
//             final fileBytes = Uint8List.fromList(response.data[0]['file']['data']);
//             return FileWithName(name: fileMap['name'], )})
//           .toList();
//     }
//     if (map['insuranceFiles'] != null) {
//       List<Map<String, dynamic>> insuranceFileList =
//           List<Map<String, dynamic>>.from(map['insuranceFiles']);
//       insuranceFiles = insuranceFileList
//           .map((Map<String, dynamic> fileMap) => FileWithName())
//           .toList();
//     }
//     return DocModel(
//       insuranceFileCount: map['insuranceFileCount'] as int,
//       medicalFileCount: map['medicalFileCount'] as int,
//       medicalFiles: medicalFiles,
//       insuranceFiles: insuranceFiles,
//     );
//   }
// }

class DocsModel {
  final String? name;
  final int? viewCount;
  final String? file;
  DocsModel({
    this.name,
    this.viewCount,
    this.file,
  });

  DocsModel copyWith({
    String? name,
    int? viewCount,
    String? file,
  }) {
    return DocsModel(
      name: name ?? this.name,
      viewCount: viewCount ?? this.viewCount,
      file: file ?? this.file,
    );
  }

  Map<String, dynamic> toMap() {
    return <String, dynamic>{
      'name': name,
      'viewCount': viewCount,
      'file': file,
    };
  }

  factory DocsModel.fromMap(Map<String, dynamic> map) {
    return DocsModel(
      name: map['name'] != null ? map['name'] as String : null,
      viewCount: map['viewCount'] != null ? map['viewCount'] as int : null,
      file: map['file'] != null ? map['file'] as String : null,
    );
  }

  String toJson() => json.encode(toMap());

  factory DocsModel.fromJson(String source) =>
      DocsModel.fromMap(json.decode(source) as Map<String, dynamic>);

  @override
  String toString() =>
      'DocsModel(name: $name, viewCount: $viewCount, file: $file)';

  @override
  bool operator ==(covariant DocsModel other) {
    if (identical(this, other)) return true;

    return other.name == name &&
        other.viewCount == viewCount &&
        other.file == file;
  }

  @override
  int get hashCode => name.hashCode ^ viewCount.hashCode ^ file.hashCode;
}
