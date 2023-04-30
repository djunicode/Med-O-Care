import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:med_o_care/Constant/constants.dart';
import 'package:med_o_care/View/Screens/healthscore1.dart';

class final_healthscore extends StatefulWidget {
  const final_healthscore({super.key});

  @override
  State<final_healthscore> createState() => _final_healthscoreState();
}

class _final_healthscoreState extends State<final_healthscore> {
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
            Row(
              mainAxisAlignment: MainAxisAlignment.start,
              children: [
                SizedBox(width: 13),
                IconButton(
                    onPressed: () {
                      Navigator.of(context).pop(MaterialPageRoute(
                          builder: (context) => healthscore_data()));
                    },
                    icon: Icon(Icons.arrow_back)),
                SizedBox(width: 7.5),
                Container(
                  child: Text('Your Score',
                      style: GoogleFonts.poppins(
                        fontSize: 16,
                        fontWeight: FontWeight.bold,
                      )),
                ),
              ],
            ),
            SizedBox(height: 35),
            Container(
              height: 165,
              width: 165,
              decoration: BoxDecoration(
                color: Color(0XFF82AAE3),
                border: Border.all(color: colorPrimary, width: 3),
                borderRadius: BorderRadius.circular(100),
                boxShadow: [
                  BoxShadow(
                      color: colorPrimary, //New
                      blurRadius: 10.0,
                      offset: Offset(0, 10))
                ],
              ),
              child: Center(
                  child: Text(
                '50',
                style: GoogleFonts.poppins(
                    fontSize: 48,
                    fontWeight: FontWeight.w700,
                    color: Colors.white),
              )),
            ),
            SizedBox(height: 30),
            Container(
              padding: EdgeInsets.only(right: 104),
              child: Column(
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.end,
                    children: [
                      Text(
                        'BMI',
                        style: GoogleFonts.poppins(
                            fontSize: 13,
                            fontWeight: FontWeight.w500,
                            color: Colors.black),
                      ),
                      SizedBox(
                        width: 125,
                      ),
                      Container(
                        height: 45,
                        width: 45,
                        decoration: BoxDecoration(
                          color: Color.fromARGB(255, 246, 242, 215),
                          border: Border.all(
                              color: Color.fromARGB(255, 249, 167, 43),
                              width: 3),
                          borderRadius: BorderRadius.circular(100),
                        ),
                      ),
                    ],
                  ),
                  SizedBox(height: 16),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.end,
                    children: [
                      Text(
                        'Steps',
                        style: GoogleFonts.poppins(
                            fontSize: 13,
                            fontWeight: FontWeight.w500,
                            color: Colors.black),
                      ),
                      SizedBox(
                        width: 120,
                      ),
                      Container(
                        height: 45,
                        width: 45,
                        decoration: BoxDecoration(
                          color: Color.fromARGB(255, 237, 232, 206),
                          border: Border.all(
                              color: Color.fromARGB(255, 247, 232, 151),
                              width: 3),
                          borderRadius: BorderRadius.circular(100),
                        ),
                      ),
                    ],
                  ),
                  SizedBox(height: 16),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.end,
                    children: [
                      Text(
                        'Heart Rate',
                        style: GoogleFonts.poppins(
                            fontSize: 13,
                            fontWeight: FontWeight.w500,
                            color: Colors.black),
                      ),
                      SizedBox(
                        width: 100,
                      ),
                      Container(
                        height: 45,
                        width: 45,
                        decoration: BoxDecoration(
                          color: Color.fromARGB(255, 232, 177, 82),
                          border: Border.all(
                              color: Color.fromARGB(255, 221, 104, 8),
                              width: 3),
                          borderRadius: BorderRadius.circular(100),
                        ),
                      ),
                    ],
                  ),
                  SizedBox(height: 16),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.end,
                    children: [
                      Text(
                        'Oxygen Level',
                        style: GoogleFonts.poppins(
                            fontSize: 13,
                            fontWeight: FontWeight.w500,
                            color: Colors.black),
                      ),
                      SizedBox(
                        width: 93,
                      ),
                      Container(
                        height: 45,
                        width: 45,
                        decoration: BoxDecoration(
                          color: Color.fromARGB(255, 156, 246, 134),
                          border: Border.all(
                              color: Color.fromARGB(255, 0, 147, 20), width: 3),
                          borderRadius: BorderRadius.circular(100),
                        ),
                      ),
                    ],
                  ),
                  SizedBox(height: 16),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.end,
                    children: [
                      Text(
                        'Vlood Pressure',
                        style: GoogleFonts.poppins(
                            fontSize: 13,
                            fontWeight: FontWeight.w500,
                            color: Colors.black),
                      ),
                      SizedBox(
                        width: 88,
                      ),
                      Container(
                        height: 45,
                        width: 45,
                        decoration: BoxDecoration(
                          color: Color.fromARGB(255, 236, 184, 236),
                          border: Border.all(
                              color: Color.fromARGB(255, 235, 0, 247),
                              width: 3),
                          borderRadius: BorderRadius.circular(100),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
            SizedBox(height: 35),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                InkWell(
                  onTap: () {},
                  child: Container(
                    height: 50,
                    width: 275,
                    decoration: BoxDecoration(
                      color: const Color(0xFF537FE7),
                      borderRadius: BorderRadius.circular(50),
                    ),
                    child: Center(
                        child: Text(
                      "Recheck",
                      style: GoogleFonts.poppins(
                          fontSize: 16,
                          fontWeight: FontWeight.w500,
                          color: Colors.white),
                    )),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
