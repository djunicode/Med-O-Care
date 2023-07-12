// ignore_for_file: avoid_unnecessary_containers, avoid_print, sized_box_for_whitespace

import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:med_o_care/Constant/constants.dart';
import 'package:med_o_care/Model/profile_model.dart';
import 'package:med_o_care/View/Auth/services/auth_service.dart';
import 'package:med_o_care/View/Auth/services/profile_api.dart';
import 'package:med_o_care/View/Profile/edit_profile.dart';
import 'package:med_o_care/View/Screens/home.dart';

class MyProfile extends StatefulWidget {
  const MyProfile({super.key});

  @override
  State<MyProfile> createState() => _MyProfileState();
}

class _MyProfileState extends State<MyProfile> {
  Data? _profile;
  String? fname;

  Future getProfile() async {
    print('HELLO');
    _profile = await Profiles().getProfileData();
    print(_profile);
  }

  @override
  void initState() {
    getProfile();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    var size = MediaQuery.of(context).size;
    double sizefont = size.width * 0.05;

    return Scaffold(
      resizeToAvoidBottomInset: false,
      body: SingleChildScrollView(
        physics: const NeverScrollableScrollPhysics(),
        child: Column(
          children: [
            FutureBuilder(
                future: getProfile(),
                builder: (context, snapshot) {
                  if (snapshot.connectionState == ConnectionState.waiting) {
                    return const Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Center(
                          child: CircularProgressIndicator(),
                        ),
                      ],
                    );
                  } else if (snapshot.hasError) {
                    return Center(
                      child: Text(snapshot.error.toString()),
                    );
                  } else {
                    return SizedBox(
                      height: size.height,
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.start,
                        children: [
                          Row(
                            children: [
                              SizedBox(width: size.width * 0.05),
                              IconButton(
                                  onPressed: () {
                                    Navigator.of(context).push(
                                        MaterialPageRoute(
                                            builder: (context) =>
                                                const Home()));
                                  },
                                  icon: const Icon(Icons.arrow_back)),
                              SizedBox(width: size.width * 0.03),
                              Container(
                                child: Text('My Profile',
                                    style: GoogleFonts.poppins(
                                      fontSize: sizefont,
                                      fontWeight: FontWeight.bold,
                                    )),
                              ),
                            ],
                          ),
                          SizedBox(height: size.height * 0.05125),
                          Flexible(
                            child: Row(
                              children: [
                                SizedBox(width: size.width * 0.07),
                                Container(
                                  child: Text(_profile?.fName ?? '',
                                      style: GoogleFonts.poppins(
                                        fontSize: sizefont * 1.2,
                                        fontWeight: FontWeight.w700,
                                      )),
                                ),
                                SizedBox(width: size.width * 0.4),
                                InkWell(
                                  child: Text('Edit',
                                      style: GoogleFonts.poppins(
                                          fontSize: sizefont * 0.9,
                                          fontWeight: FontWeight.w700,
                                          color: colorPrimary)),
                                  onTap: () {
                                    Navigator.of(context)
                                        .push(MaterialPageRoute(
                                            builder: (context) => EditProfile(
                                                  name: _profile!.fName,
                                                  weight:
                                                      _profile!.weight == null
                                                          ? 0
                                                          : _profile!.weight!
                                                              .toInt(),
                                                  height:
                                                      _profile!.weight == null
                                                          ? 0
                                                          : _profile!.weight!
                                                              .toInt(),
                                                  phone: _profile!.phone,
                                                  location: _profile!.location,
                                                  dob: _profile!.location,
                                                  gender: _profile!.gender,
                                                )));
                                  },
                                )
                              ],
                            ),
                          ),
                          Row(
                            children: [
                              SizedBox(width: size.width * 0.07),
                              Container(
                                child: Text(_profile?.phone.toString() ?? '',
                                    style: GoogleFonts.poppins(
                                      fontSize: sizefont * 0.85,
                                      fontWeight: FontWeight.w400,
                                    )),
                              ),
                            ],
                          ),
                          Row(
                            children: [
                              SizedBox(width: size.width * 0.07),
                              Container(
                                child: Text(_profile?.email ?? '',
                                    style: GoogleFonts.poppins(
                                      fontSize: sizefont * 0.85,
                                      fontWeight: FontWeight.w400,
                                    )),
                              ),
                            ],
                          ),
                          SizedBox(height: size.height * 0.035),
                          Row(
                            children: [
                              SizedBox(width: size.width * 0.07),
                              Container(
                                child: Text('About you',
                                    style: GoogleFonts.poppins(
                                      fontSize: sizefont * 0.95,
                                      fontWeight: FontWeight.w500,
                                    )),
                              ),
                            ],
                          ),
                          const SizedBox(height: 4),
                          Container(
                            width: double.infinity,
                            child: Row(
                              children: [
                                SizedBox(width: size.width * 0.115),
                                Container(
                                  height: size.height * 0.02275,
                                  width: size.width * 0.145,
                                  child: Text('Gender',
                                      style: GoogleFonts.poppins(
                                        fontSize: 15,
                                        color:
                                            const Color.fromRGBO(0, 0, 0, 0.7),
                                        fontWeight: FontWeight.w500,
                                      )),
                                ),
                                SizedBox(width: size.width * 0.2525),
                                Container(
                                  height: size.height * 0.0275,
                                  width: size.width * 0.2425,
                                  child: Text('Date of Birth',
                                      style: GoogleFonts.poppins(
                                        fontSize: 15,
                                        color:
                                            const Color.fromRGBO(0, 0, 0, 0.7),
                                        fontWeight: FontWeight.w500,
                                      )),
                                ),
                              ],
                            ),
                          ),
                          const SizedBox(height: 4),
                          Container(
                            width: double.infinity,
                            child: Row(
                              children: [
                                SizedBox(width: size.width * 0.0575),
                                Container(
                                  height: size.height * 0.06875,
                                  width: size.width * 0.375,
                                  decoration: BoxDecoration(
                                      border: Border.all(color: colorPrimary),
                                      borderRadius: BorderRadius.circular(50),
                                      color: Colors.white),
                                  child: Center(
                                    child:
                                        Text(_profile?.gender.toString() ?? ' ',
                                            style: GoogleFonts.poppins(
                                              fontSize: sizefont * 0.85,
                                              color: const Color.fromRGBO(
                                                  0, 0, 0, 0.7),
                                              fontWeight: FontWeight.w500,
                                            )),
                                  ),
                                ),
                                SizedBox(width: size.width * 0.08),
                                Container(
                                  height: size.height * 0.06875,
                                  width: size.width * 0.375,
                                  decoration: BoxDecoration(
                                      border: Border.all(color: colorPrimary),
                                      borderRadius: BorderRadius.circular(50),
                                      color: Colors.white),
                                  child: Center(
                                    child: Text(
                                        "${DateTime.parse(_profile!.dob!).day}/${DateTime.parse(_profile!.dob!).month}/${DateTime.parse(_profile!.dob!).year}" ??
                                            '',
                                        style: GoogleFonts.poppins(
                                          fontSize: sizefont * 0.85,
                                          color: const Color.fromRGBO(
                                              0, 0, 0, 0.7),
                                          fontWeight: FontWeight.w500,
                                        )),
                                  ),
                                ),
                              ],
                            ),
                          ),
                          SizedBox(height: size.height * 0.03),
                          Row(
                            children: [
                              SizedBox(width: size.width * 0.115),
                              Flexible(
                                flex: 2,
                                child: Container(
                                  height: size.height * 0.0275,
                                  width: size.width * 0.145,
                                  child: Text('Weight',
                                      style: GoogleFonts.poppins(
                                        fontSize: 15,
                                        color:
                                            const Color.fromRGBO(0, 0, 0, 0.7),
                                        fontWeight: FontWeight.w500,
                                      )),
                                ),
                              ),
                              SizedBox(width: size.width * 0.24),
                              Flexible(
                                flex: 2,
                                child: Container(
                                  height: size.height * 0.0275,
                                  width: size.height * 0.2425,
                                  child: Text('Height',
                                      style: GoogleFonts.poppins(
                                        fontSize: 15,
                                        color:
                                            const Color.fromRGBO(0, 0, 0, 0.7),
                                        fontWeight: FontWeight.w500,
                                      )),
                                ),
                              ),
                            ],
                          ),
                          const SizedBox(height: 4),
                          Container(
                            width: double.infinity,
                            child: Row(
                              children: [
                                SizedBox(width: size.width * 0.0575),
                                Container(
                                  height: size.height * 0.06875,
                                  width: size.width * 0.375,
                                  decoration: BoxDecoration(
                                      border: Border.all(color: colorPrimary),
                                      borderRadius: BorderRadius.circular(50),
                                      color: Colors.white),
                                  child: Center(
                                    child: Text("${_profile?.weight} kg" ?? '',
                                        style: GoogleFonts.poppins(
                                          fontSize: sizefont * 0.85,
                                          color: const Color.fromRGBO(
                                              0, 0, 0, 0.7),
                                          fontWeight: FontWeight.w500,
                                        )),
                                  ),
                                ),
                                SizedBox(width: size.width * 0.0325),
                                Container(
                                  height: size.height * 0.06875,
                                  width: size.width * 0.375,
                                  decoration: BoxDecoration(
                                      border: Border.all(color: colorPrimary),
                                      borderRadius: BorderRadius.circular(50),
                                      color: Colors.white),
                                  child: Center(
                                    child: Text("${_profile?.height} cm" ?? '',
                                        style: GoogleFonts.poppins(
                                          fontSize: sizefont * 0.85,
                                          color: const Color.fromRGBO(
                                              0, 0, 0, 0.7),
                                          fontWeight: FontWeight.w500,
                                        )),
                                  ),
                                ),
                              ],
                            ),
                          ),
                          SizedBox(height: size.height * 0.04625),
                          Container(
                            margin: EdgeInsets.only(
                                left: size.width * 0.0575,
                                right: size.width * 0.0575),
                            height: size.height * 0.06875,
                            width: double.infinity,
                            decoration: BoxDecoration(
                                border: Border.all(color: colorPrimary),
                                borderRadius: BorderRadius.circular(50),
                                color: Colors.white),
                            child: Row(
                              children: [
                                SizedBox(width: size.width * 0.0625),
                                InkWell(
                                  child: Text('Manage address',
                                      style: GoogleFonts.poppins(
                                        fontSize: 16,
                                        fontWeight: FontWeight.w500,
                                      )),
                                ),
                                SizedBox(width: size.width * 0.275),
                                const Icon(Icons.arrow_forward_ios)
                              ],
                            ),
                          ),
                          SizedBox(height: size.height * 0.05),
                          Row(
                            children: [
                              SizedBox(width: size.width * 0.0775),
                              InkWell(
                                child: Text('Logout',
                                    style: GoogleFonts.poppins(
                                        fontSize: sizefont * 1.2,
                                        fontWeight: FontWeight.w700,
                                        color: colorPrimary)),
                                onTap: () {
                                  AuthService().deleteAuthToken();
                                  Navigator.pushReplacementNamed(
                                      context, '/login');
                                },
                              )
                            ],
                          )
                        ],
                      ),
                    );
                  }
                }),
          ],
        ),
      ),
    );
  }
}
