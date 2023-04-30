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
    return Scaffold(
      body: Padding(
        padding: EdgeInsets.all(0.5),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.start,
          children: [
            SizedBox(height: 13),
            Row(
              mainAxisAlignment: MainAxisAlignment.start,
              children: [
                SizedBox(
                  width: 18,
                ),
                Image.asset(
                  logo,
                  height: 65,
                  width: 65,
                ),
              ],
            ),
            SizedBox(height: 12),
            Row(
              children: [
                SizedBox(width: 20),
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
            SizedBox(height: 41),
            Flexible(
              child: Row(
                children: [
                  SizedBox(width: 28),
                  Container(
                    child: Text('xyz',
                        style: GoogleFonts.poppins(
                          fontSize: 20,
                          fontWeight: FontWeight.w700,
                        )),
                  ),
                  SizedBox(width: 228),
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
                SizedBox(width: 28),
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
                SizedBox(width: 28),
                Container(
                  child: Text('abc@gmail.com',
                      style: GoogleFonts.poppins(
                        fontSize: 15,
                        fontWeight: FontWeight.w400,
                      )),
                ),
              ],
            ),
            SizedBox(height: 18),
            Row(
              children: [
                SizedBox(width: 28),
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
                  SizedBox(width: 46),
                  Container(
                    height: 22,
                    width: 58,
                    child: Text('Gender',
                        style: GoogleFonts.poppins(
                          fontSize: 15,
                          color: Color.fromRGBO(0, 0, 0, 0.7),
                          fontWeight: FontWeight.w500,
                        )),
                  ),
                  SizedBox(width: 101),
                  Container(
                    height: 22,
                    width: 97,
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
                  SizedBox(width: 23),
                  Container(
                    height: 55,
                    width: 150,
                    decoration: BoxDecoration(
                        border: Border.all(color: colorPrimary),
                        borderRadius: BorderRadius.circular(50),
                        color: Colors.white),
                  ),
                  SizedBox(width: 13),
                  Container(
                    height: 55,
                    width: 150,
                    decoration: BoxDecoration(
                        border: Border.all(color: colorPrimary),
                        borderRadius: BorderRadius.circular(50),
                        color: Colors.white),
                  ),
                ],
              ),
            ),
            SizedBox(height: 18),
            Container(
              width: double.infinity,
              child: Row(
                children: [
                  SizedBox(width: 46),
                  Container(
                    height: 22,
                    width: 58,
                    child: Text('Weight',
                        style: GoogleFonts.poppins(
                          fontSize: 15,
                          color: Color.fromRGBO(0, 0, 0, 0.7),
                          fontWeight: FontWeight.w500,
                        )),
                  ),
                  SizedBox(width: 101),
                  Container(
                    height: 22,
                    width: 97,
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
                  SizedBox(width: 23),
                  Container(
                    height: 55,
                    width: 150,
                    decoration: BoxDecoration(
                        border: Border.all(color: colorPrimary),
                        borderRadius: BorderRadius.circular(50),
                        color: Colors.white),
                  ),
                  SizedBox(width: 13),
                  Container(
                    height: 55,
                    width: 150,
                    decoration: BoxDecoration(
                        border: Border.all(color: colorPrimary),
                        borderRadius: BorderRadius.circular(50),
                        color: Colors.white),
                  ),
                ],
              ),
            ),
            SizedBox(height: 37),
            Container(
              margin: EdgeInsets.only(left: 23, right: 24),
              height: 55,
              width: double.infinity,
              decoration: BoxDecoration(
                  border: Border.all(color: colorPrimary),
                  borderRadius: BorderRadius.circular(50),
                  color: Colors.white),
              child: Row(
                children: [
                  SizedBox(width: 25),
                  InkWell(
                    child: Text('Manage address',
                        style: GoogleFonts.poppins(
                          fontSize: 16,
                          fontWeight: FontWeight.w500,
                        )),
                  ),
                  SizedBox(width: 110),
                  Icon(Icons.arrow_forward_ios)
                ],
              ),
            ),
            SizedBox(height: 130),
            Row(
              children: [
                SizedBox(width: 31),
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
