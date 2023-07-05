import 'dart:math';

import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:med_o_care/Constant/constants.dart';
import 'package:med_o_care/View/Auth/services/auth_service.dart';
import 'package:med_o_care/View/Auth/services/profile_api.dart';
import 'package:med_o_care/View/Profile/editProfile.dart';
import 'package:med_o_care/View/Screens/home.dart';
import 'package:med_o_care/models/profile_model.dart' as data;
import 'package:med_o_care/models/user.dart';

class MyProfile extends StatefulWidget {
  const MyProfile({super.key});

  @override
  State<MyProfile> createState() => _MyProfileState();
}

class _MyProfileState extends State<MyProfile> {
  data.Data? _profile;
  String? fname;

  Future getProfile() async {
    print('HELLO');
    _profile = await Profiles().getProfileData();
    print(_profile);
  }

  @override
  void initState() {
    getProfile();
    // TODO: implement initState
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    var size = MediaQuery.of(context).size;
    double sizefont = size.width * 0.05;

    return Scaffold(
      resizeToAvoidBottomInset: false,
      body: SingleChildScrollView(
        child: Column(
          children: [
            FutureBuilder(
                future: getProfile(),
                builder: (context, snapshot) {
                  if (snapshot.connectionState == ConnectionState.waiting) {
                    return Center(
                      child: CircularProgressIndicator(),
                    );
                  } else {
                    return SizedBox(
                      height: size.height,
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.start,
                        children: [
                          SizedBox(height: size.height * 0.01625),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.start,
                            children: [
                              SizedBox(
                                width: size.width * 0.045,
                              ),
                              Image.asset(
                                logo,
                                height: size.height * 0.08125,
                                width: size.height * 0.08125,
                              ),
                            ],
                          ),
                          SizedBox(height: size.height * 0.015),
                          Row(
                            children: [
                              SizedBox(width: size.width * 0.05),
                              IconButton(
                                  onPressed: () {
                                    Navigator.of(context).pushReplacement(
                                        MaterialPageRoute(
                                            builder: (context) => Home()));
                                  },
                                  icon: Icon(Icons.arrow_back)),
                              SizedBox(width: size.width * 0.03),
                              Container(
                                child: Text('My Profile',
                                    style: GoogleFonts.poppins(
                                      // fontSize: 16,
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
                                  child: Text(_profile!.fName,
                                      style: GoogleFonts.poppins(
                                        // fontSize: 20,
                                        fontSize: sizefont * 1.2,
                                        fontWeight: FontWeight.w700,
                                      )),
                                ),
                                SizedBox(width: size.width * 0.57),
                                InkWell(
                                  child: Text('Edit',
                                      style: GoogleFonts.poppins(
                                          // fontSize: 16,
                                          fontSize: sizefont * 0.9,
                                          fontWeight: FontWeight.w700,
                                          color: colorPrimary)),
                                  onTap: () {
                                    Navigator.of(context)
                                        .pushReplacement(MaterialPageRoute(
                                            builder: (context) => EditProfile(
                                                  name: _profile!.fName,
                                                  weight: _profile!.weight,
                                                  height: _profile!.weight,
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
                                child: Text(_profile!.phone.toString(),
                                    style: GoogleFonts.poppins(
                                      // fontSize: 15,
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
                                child: Text(_profile!.email,
                                    style: GoogleFonts.poppins(
                                      // fontSize: 15,
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
                                      // fontSize: 18,
                                      fontSize: sizefont * 0.95,
                                      fontWeight: FontWeight.w500,
                                    )),
                              ),
                            ],
                          ),
                          SizedBox(height: size.height * 0.025),
                          Container(
                            width: double.infinity,
                            child: Row(
                              children: [
                                SizedBox(width: size.width * 0.115),
                                Text('Gender',
                                    style: GoogleFonts.poppins(
                                      // fontSize: 15,
                                      fontSize: sizefont * 0.85,
                                      color: Color.fromRGBO(0, 0, 0, 0.7),
                                      fontWeight: FontWeight.w500,
                                    )),
                                SizedBox(width: size.width * 0.23),
                                Text('Date of Birth',
                                    style: GoogleFonts.poppins(
                                      // fontSize: 15,
                                      fontSize: sizefont * 0.85,
                                      color: const Color.fromRGBO(0, 0, 0, 0.7),
                                      fontWeight: FontWeight.w500,
                                    )),
                              ],
                            ),
                          ),
                          SizedBox(height: size.height * 0.01),
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
                                    child: Text(_profile!.gender.toString(),
                                        style: GoogleFonts.poppins(
                                          // fontSize: 15,
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
                                    child: Text(_profile!.dob,
                                        style: GoogleFonts.poppins(
                                          // fontSize: 15,
                                          fontSize: sizefont * 0.85,
                                          color: Color.fromRGBO(0, 0, 0, 0.7),
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
                                child: Text('Weight',
                                    style: GoogleFonts.poppins(
                                      // fontSize: 15,
                                      fontSize: sizefont * 0.85,
                                      color: Color.fromRGBO(0, 0, 0, 0.7),
                                      fontWeight: FontWeight.w500,
                                    )),
                              ),
                              SizedBox(width: size.width * 0.24),
                              Flexible(
                                flex: 2,
                                child: Text('Height',
                                    style: GoogleFonts.poppins(
                                      // fontSize: 15,
                                      fontSize: sizefont * 0.85,
                                      color: Color.fromRGBO(0, 0, 0, 0.7),
                                      fontWeight: FontWeight.w500,
                                    )),
                              ),
                            ],
                          ),
                          SizedBox(height: size.height * 0.01),
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
                                    child: Text("${_profile!.weight}  kg",
                                        style: GoogleFonts.poppins(
                                          // fontSize: 15,
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
                                    child: Text("${_profile!.height} cm",
                                        style: GoogleFonts.poppins(
                                          // fontSize: 15,
                                          fontSize: sizefont * 0.85,
                                          color: Color.fromRGBO(0, 0, 0, 0.7),
                                          fontWeight: FontWeight.w500,
                                        )),
                                  ),
                                ),
                              ],
                            ),
                          ),
                          SizedBox(height: size.height * 0.04625),
                          // Container(
                          //   margin: EdgeInsets.only(
                          //       left: size.width * 0.0575,
                          //       right: size.width * 0.0575),
                          //   height: size.height * 0.06875,
                          //   width: double.infinity,
                          //   decoration: BoxDecoration(
                          //       border: Border.all(color: colorPrimary),
                          //       borderRadius: BorderRadius.circular(50),
                          //       color: Colors.white),
                          //   child: Row(
                          //     children: [
                          //       SizedBox(width: size.width * 0.0625),
                          //       InkWell(
                          //         child: Text('Manage address',
                          //             style: GoogleFonts.poppins(
                          //               fontSize: 16,
                          //               fontWeight: FontWeight.w500,
                          //             )),
                          //       ),
                          //       SizedBox(width: size.width * 0.275),
                          //       Icon(Icons.arrow_forward_ios)
                          //     ],
                          //   ),
                          // ),
                          SizedBox(height: size.height * 0.08),
                          Row(
                            children: [
                              SizedBox(width: size.width * 0.0775),
                              InkWell(
                                child: Text('Logout',
                                    style: GoogleFonts.poppins(
                                        // fontSize: 20,
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
