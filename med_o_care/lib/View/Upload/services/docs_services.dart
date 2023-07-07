import 'dart:convert';

import 'package:med_o_care/View/Upload/models/docs_model.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:http/http.dart' as http;

class DocServices {
  static const String authTokenKey = 'auth_token';
  final List<DocsModel> docs = [];

  Future<List<DocsModel>?> getDocData() async {
    final prefs = await SharedPreferences.getInstance();
    final token = prefs.getString(authTokenKey);
    var headers = {'Authorization': 'Token $token'};

    try {
      final response = await http.get(
          Uri.parse('https://med-o-care-iedj.onrender.com/user/profile'),
          headers: headers);
      print(response.body);
      if (response.statusCode == 200) {
        final extractedBody = json.decode(response.body);
        final data = extractedBody['data']['medicalFiles'];
        data.forEach((x) {
          docs.add(DocsModel.fromMap(x));
        });
        // final docs = DocsModel.fromMap(jsonDecode(response.body)['data']);
        // log(docs.toString());
        return docs;
      } else {
        return null;
      }
    } catch (e) {
      return null;
      print(e);
    }
  }
}
