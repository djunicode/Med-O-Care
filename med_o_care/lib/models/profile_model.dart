class Profile {
  Profile({
    required this.success,
    required this.data,
  });
  late final bool success;
  late final Data data;

  Profile.fromJson(Map<String, dynamic> json) {
    success = json['success'];
    data = Data.fromJson(json['data']);
  }

  Map<String, dynamic> toJson() {
    final _data = <String, dynamic>{};
    _data['success'] = success;
    _data['data'] = data.toJson();
    return _data;
  }
}

class Data {
  Data({
    required this.id,
    required this.fName,
    this.lName,
    required this.role,
    this.pfp,
    required this.email,
    required this.phone,
    required this.dob,
    required this.gender,
    required this.location,
    required this.password,
    required this.medicalFiles,
    required this.medicalFileCount,
    required this.insuranceFiles,
    required this.insuranceFileCount,
    this.height,
    this.weight,
    this.healthScore,
    this.periodHowLong,
    this.periodMcDuration,
    required this.periodDates,
    this.OTP,
    required this.pillReminder,
    required this.createdAt,
    required this.updatedAt,
    required this.V,
  });
  late final String id;
  late final String fName;
  late final Null lName;
  late final String role;
  late final Null pfp;
  late final String email;
  late final int phone;
  late final String dob;
  late final String gender;
  late final String location;
  late final String password;
  late final List<dynamic> medicalFiles;
  late final int medicalFileCount;
  late final List<dynamic> insuranceFiles;
  late final int insuranceFileCount;
  late final Null height;
  late final Null weight;
  late final Null healthScore;
  late final Null periodHowLong;
  late final Null periodMcDuration;
  late final List<dynamic> periodDates;
  late final Null OTP;
  late final List<dynamic> pillReminder;
  late final String createdAt;
  late final String updatedAt;
  late final int V;

  Data.fromJson(Map<String, dynamic> json) {
    id = json['_id'];
    fName = json['fName'];
    lName = null;
    role = json['role'];
    pfp = null;
    email = json['email'];
    phone = json['phone'];
    dob = json['dob'];
    gender = json['gender'];
    location = json['location'];
    password = json['password'];
    medicalFiles = List.castFrom<dynamic, dynamic>(json['medicalFiles']);
    medicalFileCount = json['medicalFileCount'];
    insuranceFiles = List.castFrom<dynamic, dynamic>(json['insuranceFiles']);
    insuranceFileCount = json['insuranceFileCount'];
    height = null;
    weight = null;
    healthScore = null;
    periodHowLong = null;
    periodMcDuration = null;
    periodDates = List.castFrom<dynamic, dynamic>(json['period_dates']);
    OTP = null;
    pillReminder = List.castFrom<dynamic, dynamic>(json['pill_reminder']);
    createdAt = json['createdAt'];
    updatedAt = json['updatedAt'];
    V = json['__v'];
  }

  Map<String, dynamic> toJson() {
    final _data = <String, dynamic>{};
    _data['_id'] = id;
    _data['fName'] = fName;
    _data['lName'] = lName;
    _data['role'] = role;
    _data['pfp'] = pfp;
    _data['email'] = email;
    _data['phone'] = phone;
    _data['dob'] = dob;
    _data['gender'] = gender;
    _data['location'] = location;
    _data['password'] = password;
    _data['medicalFiles'] = medicalFiles;
    _data['medicalFileCount'] = medicalFileCount;
    _data['insuranceFiles'] = insuranceFiles;
    _data['insuranceFileCount'] = insuranceFileCount;
    _data['height'] = height;
    _data['weight'] = weight;
    _data['health_score'] = healthScore;
    _data['period_how_long'] = periodHowLong;
    _data['period_mc_duration'] = periodMcDuration;
    _data['period_dates'] = periodDates;
    _data['OTP'] = OTP;
    _data['pill_reminder'] = pillReminder;
    _data['createdAt'] = createdAt;
    _data['updatedAt'] = updatedAt;
    _data['__v'] = V;
    return _data;
  }
}
