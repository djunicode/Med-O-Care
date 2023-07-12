// ignore_for_file: public_member_api_docs, sort_constructors_first
import 'dart:convert';

class user {
  final String fName;
  final String email;
  final String? lName;
  final String? role;
  final String? pfp;
  final int phone;
  final String? gender;
  final String? password;
  final int? health_score;
  final int? height;
  final int? weight;
  final int? period_how_long;
  final int? period_mc_duration;
  final int? OTP;
  final String? dob;
  final String? location;
  user({
    required this.fName,
    required this.email,
    this.lName,
    this.role,
    this.pfp,
    required this.phone,
    this.gender,
    this.password,
    this.health_score,
    this.height,
    this.weight,
    this.period_how_long,
    this.period_mc_duration,
    this.OTP,
    this.dob,
    this.location,
  });

  user copyWith({
    String? fName,
    String? email,
    String? lName,
    String? role,
    String? pfp,
    int? phone,
    String? gender,
    String? password,
    int? health_score,
    int? height,
    int? weight,
    int? period_how_long,
    int? period_mc_duration,
    int? OTP,
    String? dob,
    String? location,
  }) {
    return user(
      fName: fName ?? this.fName,
      email: email ?? this.email,
      lName: lName ?? this.lName,
      role: role ?? this.role,
      pfp: pfp ?? this.pfp,
      phone: phone ?? this.phone,
      gender: gender ?? this.gender,
      password: password ?? this.password,
      health_score: health_score ?? this.health_score,
      height: height ?? this.height,
      weight: weight ?? this.weight,
      period_how_long: period_how_long ?? this.period_how_long,
      period_mc_duration: period_mc_duration ?? this.period_mc_duration,
      OTP: OTP ?? this.OTP,
      dob: dob ?? this.dob,
      location: location ?? this.location,
    );
  }

  Map<String, dynamic> toMap() {
    return <String, dynamic>{
      'fName': fName,
      'email': email,
      'lName': lName,
      'role': role,
      'pfp': pfp,
      'phone': phone,
      'gender': gender,
      'password': password,
      'health_score': health_score,
      'height': height,
      'weight': weight,
      'period_how_long': period_how_long,
      'period_mc_duration': period_mc_duration,
      'OTP': OTP,
      'dob': dob,
      'location': location,
    };
  }

  factory user.fromMap(Map<String, dynamic> map) {
    return user(
      fName: map['fName'] as String,
      email: map['email'] as String,
      lName: map['lName'] != null ? map['lName'] as String : null,
      role: map['role'] != null ? map['role'] as String : null,
      pfp: map['pfp'] != null ? map['pfp'] as String : null,
      phone: map['phone'] as int,
      gender: map['gender'] != null ? map['gender'] as String : null,
      password: map['password'] != null ? map['password'] as String : null,
      health_score:
          map['health_score'] != null ? map['health_score'] as int : null,
      height: map['height'] != null ? map['height'] as int : null,
      weight: map['weight'] != null ? map['weight'] as int : null,
      period_how_long:
          map['period_how_long'] != null ? map['period_how_long'] as int : null,
      period_mc_duration: map['period_mc_duration'] != null
          ? map['period_mc_duration'] as int
          : null,
      OTP: map['OTP'] != null ? map['OTP'] as int : null,
      dob: map['dob'] != null ? map['dob'] as String : null,
      location: map['location'] != null ? map['location'] as String : null,
    );
  }

  String toJson() => json.encode(toMap());

  factory user.fromJson(String source) =>
      user.fromMap(json.decode(source) as Map<String, dynamic>);

  @override
  String toString() {
    return 'user(fName: $fName, email: $email, lName: $lName, role: $role, pfp: $pfp, phone: $phone, gender: $gender, password: $password, health_score: $health_score, height: $height, weight: $weight, period_how_long: $period_how_long, period_mc_duration: $period_mc_duration, OTP: $OTP, dob: $dob, location: $location)';
  }

  @override
  bool operator ==(covariant user other) {
    if (identical(this, other)) return true;

    return other.fName == fName &&
        other.email == email &&
        other.lName == lName &&
        other.role == role &&
        other.pfp == pfp &&
        other.phone == phone &&
        other.gender == gender &&
        other.password == password &&
        other.health_score == health_score &&
        other.height == height &&
        other.weight == weight &&
        other.period_how_long == period_how_long &&
        other.period_mc_duration == period_mc_duration &&
        other.OTP == OTP &&
        other.dob == dob &&
        other.location == location;
  }

  @override
  int get hashCode {
    return fName.hashCode ^
        email.hashCode ^
        lName.hashCode ^
        role.hashCode ^
        pfp.hashCode ^
        phone.hashCode ^
        gender.hashCode ^
        password.hashCode ^
        health_score.hashCode ^
        height.hashCode ^
        weight.hashCode ^
        period_how_long.hashCode ^
        period_mc_duration.hashCode ^
        OTP.hashCode ^
        dob.hashCode ^
        location.hashCode;
  }
}
