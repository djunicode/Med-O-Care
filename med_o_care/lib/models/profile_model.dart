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
    this.dob,
    this.gender,
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
  late final String? lName;
  late final String role;
  late final String? pfp;
  late final String email;
  late final int phone;
  late final String? dob;
  late final String? gender;
  late final String? location;
  late final String password;
  late final List<dynamic> medicalFiles;
  late final int medicalFileCount;
  late final List<dynamic> insuranceFiles;
  late final int insuranceFileCount;
  late final int? height;
  late final int? weight;
  late final int? healthScore;
  late final int? periodHowLong;
  late final int? periodMcDuration;
  late final List<dynamic> periodDates;
  late final int? OTP;
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
    height = json['height'];
    weight = json['weight'];
    healthScore = json['health_score'];
    periodHowLong = json['period_how_long'];
    periodMcDuration = json['period_mc_duration'];
    periodDates = List.castFrom<dynamic, dynamic>(json['period_dates']);
    OTP = json['OTP'];
    pillReminder = List.castFrom<dynamic, dynamic>(json['pill_reminder']);
    createdAt = json['createdAt'];
    updatedAt = json['updatedAt'];
    V = json['__v'];
  }

  Map<String, dynamic> toJson() {
    final data = <String, dynamic>{};
    data['_id'] = id;
    data['fName'] = fName;
    data['lName'] = lName;
    data['role'] = role;
    data['pfp'] = pfp;
    data['email'] = email;
    data['phone'] = phone;
    data['dob'] = dob;
    data['gender'] = gender;
    data['location'] = location;
    data['password'] = password;
    data['medicalFiles'] = medicalFiles;
    data['medicalFileCount'] = medicalFileCount;
    data['insuranceFiles'] = insuranceFiles;
    data['insuranceFileCount'] = insuranceFileCount;
    data['height'] = height;
    data['weight'] = weight;
    data['health_score'] = healthScore;
    data['period_how_long'] = periodHowLong;
    data['period_mc_duration'] = periodMcDuration;
    data['period_dates'] = periodDates;
    data['OTP'] = OTP;
    data['pill_reminder'] = pillReminder;
    data['createdAt'] = createdAt;
    data['updatedAt'] = updatedAt;
    data['__v'] = V;
    return data;
  }
}
