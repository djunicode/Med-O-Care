import 'dart:convert';
import 'dart:developer';
import 'dart:io';
import 'package:med_o_care/models/user.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import 'package:path/path.dart';

class UploadServices {
  static const String baseUrl = 'https://med-o-care.onrender.com/user';

  Future<bool> uploadFile(File file) async {
    try {
      final userEmail = 'test@gmail.com'; // replace with actual user email
      final bytes = await file.readAsBytes();
      final encodedFile = base64Encode(bytes);
      final prefs = await SharedPreferences.getInstance();
      final token = prefs.getString("auth_token");
      final currentUser =
          user.fromMap(jsonDecode(prefs.getString('current user')!));
      Map<String, dynamic> body = {
        'files': encodedFile,
        'user': currentUser,
      };
      var stream = http.ByteStream(file.openRead());
      stream.cast();
      var length = await file.length();
      var uri = Uri.parse('$baseUrl/uploadMedical');
      var request = http.MultipartRequest("POST", uri);
      var multipartFile = http.MultipartFile("files", stream, length,
          filename: basename(file.path));
      request.fields['email'] = currentUser.email;
      request.headers["Authorization"] = "Token $token";
      request.files.add(multipartFile);
      var response = await request.send();

      if (response.statusCode == 201) {
        log('File uploaded successfully!');
        return true;
      } else {
        log('Failed to upload file. Error code: ${response.statusCode}. Error: ${response.reasonPhrase}');
        return false;
      }
    } catch (e) {
      log('Error occurred while uploading file: $e');
      return false;
    }
  }
}
