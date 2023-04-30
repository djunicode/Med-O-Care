import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:med_o_care/Constant/constants.dart';

class MyProfile extends StatefulWidget {
  const MyProfile({super.key});

  @override
  State<MyProfile> createState() => _MyProfileState();
}

class _MyProfileState extends State<MyProfile> {
  @override
  Widget build(BuildContext context) {
    var size = MediaQuery.of(context).size;

    return Scaffold(
      body: Padding(
        padding: EdgeInsets.all(0.5),
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
                IconButton(onPressed: () {}, icon: Icon(Icons.arrow_back)),
                SizedBox(width: 7.5),
                Container(
                  child: Text('My Profile',
                      style: GoogleFonts.poppins(
                        fontSize: 16,
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
                    child: Text('xyz',
                        style: GoogleFonts.poppins(
                          fontSize: 20,
                          fontWeight: FontWeight.w700,
                        )),
                  ),
                  SizedBox(width: size.width * 0.57),
                  InkWell(
                    child: Text('Edit',
                        style: GoogleFonts.poppins(
                            fontSize: 16,
                            fontWeight: FontWeight.w700,
                            color: colorPrimary)),
                    onTap: () {},
                  )
                ],
              ),
            ),
            Row(
              children: [
                SizedBox(width: size.width * 0.07),
                Container(
                  child: Text('816458426',
                      style: GoogleFonts.poppins(
                        fontSize: 15,
                        fontWeight: FontWeight.w400,
                      )),
                ),
              ],
            ),
            Row(
              children: [
                SizedBox(width: size.width * 0.07),
                Container(
                  child: Text('abc@gmail.com',
                      style: GoogleFonts.poppins(
                        fontSize: 15,
                        fontWeight: FontWeight.w400,
                      )),
                ),
              ],
            ),
            SizedBox(height: size.height * 0.0225),
            Row(
              children: [
                SizedBox(width: size.width * 0.07),
                Container(
                  child: Text('About you',
                      style: GoogleFonts.poppins(
                        fontSize: 18,
                        fontWeight: FontWeight.w500,
                      )),
                ),
              ],
            ),
            SizedBox(height: 4),
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
                          color: Color.fromRGBO(0, 0, 0, 0.7),
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
                          color: Color.fromRGBO(0, 0, 0, 0.7),
                          fontWeight: FontWeight.w500,
                        )),
                  ),
                ],
              ),
            ),
            SizedBox(height: 4),
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
                  ),
                  SizedBox(width: size.width * 0.0325),
                  Container(
                    height: size.height * 0.06875,
                    width: size.width * 0.375,
                    decoration: BoxDecoration(
                        border: Border.all(color: colorPrimary),
                        borderRadius: BorderRadius.circular(50),
                        color: Colors.white),
                  ),
                ],
              ),
            ),
            SizedBox(height: size.height * 0.0225),
            Container(
              width: double.infinity,
              child: Row(
                children: [
                  SizedBox(width: size.width * 0.115),
                  Container(
                    height: size.height * 0.0275,
                    width: size.width * 0.145,
                    child: Text('Weight',
                        style: GoogleFonts.poppins(
                          fontSize: 15,
                          color: Color.fromRGBO(0, 0, 0, 0.7),
                          fontWeight: FontWeight.w500,
                        )),
                  ),
                  SizedBox(width: size.width * 0.24),
                  Container(
                    height: size.height * 0.0275,
                    width: size.height * 0.2425,
                    child: Text('Height',
                        style: GoogleFonts.poppins(
                          fontSize: 15,
                          color: Color.fromRGBO(0, 0, 0, 0.7),
                          fontWeight: FontWeight.w500,
                        )),
                  ),
                ],
              ),
            ),
            SizedBox(height: 4),
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
                  ),
                  SizedBox(width: size.width * 0.0325),
                  Container(
                    height: size.height * 0.06875,
                    width: size.width * 0.375,
                    decoration: BoxDecoration(
                        border: Border.all(color: colorPrimary),
                        borderRadius: BorderRadius.circular(50),
                        color: Colors.white),
                  ),
                ],
              ),
            ),
            SizedBox(height: size.height * 0.04625),
            Container(
              margin: EdgeInsets.only(
                  left: size.width * 0.0575, right: size.width * 0.0575),
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
                  Icon(Icons.arrow_forward_ios)
                ],
              ),
            ),
            SizedBox(height: size.height * 0.14),
            Row(
              children: [
                SizedBox(width: size.width * 0.0775),
                InkWell(
                  child: Text('Logout',
                      style: GoogleFonts.poppins(
                          fontSize: 20,
                          fontWeight: FontWeight.w700,
                          color: colorPrimary)),
                  onTap: () {},
                )
              ],
            )
          ],
        ),
      ),
    );
  }
}
