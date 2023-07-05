import 'dart:convert';
import 'dart:developer';

import 'package:med_o_care/View/Upload/models/docs_model.dart';
import 'package:med_o_care/models/profile_model.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:http/http.dart' as http;

class DocServices {
  static const String authTokenKey = 'auth_token';

  Future getDocData() async {
    final prefs = await SharedPreferences.getInstance();
    final token = prefs.getString(authTokenKey);
    var headers = {'Authorization': 'Token $token'};

    try {
      final response = await http.get(
          Uri.parse('https://med-o-care.onrender.com/user/profile'),
          headers: headers);
      if (response.statusCode == 200) {
        //final docs = DocModel.fromMap(jsonDecode(response.body)['data']);
        //log(docs.toString());
        //return docs;
      }
    } catch (e) {
      print(e);
    }
  }
}
