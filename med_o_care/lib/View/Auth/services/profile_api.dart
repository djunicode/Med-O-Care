import 'dart:convert';
import 'dart:developer';
import 'package:http/http.dart' as http;
import 'package:med_o_care/models/profile_model.dart';
import 'package:shared_preferences/shared_preferences.dart';

class Profiles {
  Profile? getProfile;
  Data? _profileData;
  static const String authTokenKey = 'auth_token';

    getProfileData() async {
    final prefs = await SharedPreferences.getInstance();
    final token = prefs.getString(authTokenKey);
    var headers = {'Authorization': 'Token $token'};
    var request = http.Request(
        'GET', Uri.parse('https://med-o-care.onrender.com/user/profile'));
    request.body = '''''';
    request.headers.addAll(headers);

    http.StreamedResponse response = await request.send();
    http.Response streamResponse = await http.Response.fromStream(response);

    if (response.statusCode == 200) {
      var data = jsonDecode(streamResponse.body);
      print(data);
      log(response.statusCode.toString());
      var getProfile = Profile.fromJson(data);
      _profileData = getProfile.data;
      return _profileData;
    } else {
      print(response.reasonPhrase);
    }
  }

  editProfileData(
    String? fname,
    String? height,
    String? weight,
    String? email,
    String? location,
  ) async {
    final prefs = await SharedPreferences.getInstance();
    final token = prefs.getString(authTokenKey);
    var headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Token $token'
    };
    var request = http.Request('PUT',
        Uri.parse('https://med-o-care-hps4.onrender.com/user/editUserInfo'));
    request.body = json.encode({
      "fName": "$fname",
      "height": "$height",
      "weight": "$weight",
      "email": "$email"
    });
    request.headers.addAll(headers);

    http.StreamedResponse response = await request.send();

    if (response.statusCode == 200) {
      print(await response.stream.bytesToString());
    } else {
      print(response.reasonPhrase);
    }
  }
}
