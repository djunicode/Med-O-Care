// ignore_for_file: avoid_unnecessary_containers

import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:med_o_care/Constant/constants.dart';
import 'package:med_o_care/View/Screens/healthscore1.dart';

class FinalHeathscore extends StatefulWidget {
  const FinalHeathscore({super.key});

  @override
  State<FinalHeathscore> createState() => _FinalHeathscoreState();
}

class _FinalHeathscoreState extends State<FinalHeathscore> {
  @override
  Widget build(BuildContext context) {
    var size = MediaQuery.of(context).size;

    return Scaffold(
      body: Padding(
        padding: const EdgeInsets.all(0.5),
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
            Row(
              mainAxisAlignment: MainAxisAlignment.start,
              children: [
                SizedBox(width: size.width * 0.045),
                IconButton(
                    onPressed: () {
                      Navigator.of(context).pop(MaterialPageRoute(
                          builder: (context) => const healthscore_data()));
                    },
                    icon: const Icon(Icons.arrow_back)),
                SizedBox(width: size.width * 0.01875),
                Container(
                  child: Text('Your Score',
                      style: GoogleFonts.poppins(
                        fontSize: 16,
                        fontWeight: FontWeight.bold,
                      )),
                ),
              ],
            ),
            SizedBox(height: size.height * 0.04375),
            Container(
              height: size.height * 0.20625,
              width: size.height * 0.20625,
              decoration: BoxDecoration(
                color: const Color(0XFF82AAE3),
                border: Border.all(color: colorPrimary, width: 3),
                borderRadius: BorderRadius.circular(100),
                boxShadow: const [
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
            SizedBox(height: size.height * 0.0375),
            Container(
              padding: EdgeInsets.only(right: size.width * 0.26),
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
                        width: size.width * 0.3125,
                      ),
                      Container(
                        height: size.height * 0.05625,
                        width: size.height * 0.05625,
                        decoration: BoxDecoration(
                          color: const Color.fromARGB(255, 246, 242, 215),
                          border: Border.all(
                              color: const Color.fromARGB(255, 249, 167, 43),
                              width: 3),
                          borderRadius: BorderRadius.circular(100),
                        ),
                      ),
                    ],
                  ),
                  SizedBox(height: size.height * 0.02),
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
                        width: size.width * 0.3,
                      ),
                      Container(
                        height: size.height * 0.05625,
                        width: size.height * 0.05625,
                        decoration: BoxDecoration(
                          color: const Color.fromARGB(255, 237, 232, 206),
                          border: Border.all(
                              color: const Color.fromARGB(255, 247, 232, 151),
                              width: 3),
                          borderRadius: BorderRadius.circular(100),
                        ),
                      ),
                    ],
                  ),
                  SizedBox(height: size.height * 0.02),
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
                        width: size.width * 0.25,
                      ),
                      Container(
                        height: size.height * 0.05625,
                        width: size.height * 0.05625,
                        decoration: BoxDecoration(
                          color: const Color.fromARGB(255, 232, 177, 82),
                          border: Border.all(
                              color: const Color.fromARGB(255, 221, 104, 8),
                              width: 3),
                          borderRadius: BorderRadius.circular(100),
                        ),
                      ),
                    ],
                  ),
                  SizedBox(height: size.height * 0.02),
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
                        width: size.width * 0.2325,
                      ),
                      Container(
                        height: size.height * 0.05625,
                        width: size.height * 0.05625,
                        decoration: BoxDecoration(
                          color: const Color.fromARGB(255, 156, 246, 134),
                          border: Border.all(
                              color: const Color.fromARGB(255, 0, 147, 20), width: 3),
                          borderRadius: BorderRadius.circular(100),
                        ),
                      ),
                    ],
                  ),
                  SizedBox(height: size.height * 0.02),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.end,
                    children: [
                      Text(
                        'Blood Pressure',
                        style: GoogleFonts.poppins(
                            fontSize: 13,
                            fontWeight: FontWeight.w500,
                            color: Colors.black),
                      ),
                      const SizedBox(
                        width: 88,
                      ),
                      Container(
                        height: size.height * 0.05625,
                        width: size.height * 0.05625,
                        decoration: BoxDecoration(
                          color: const Color.fromARGB(255, 236, 184, 236),
                          border: Border.all(
                              color: const Color.fromARGB(255, 235, 0, 247),
                              width: 3),
                          borderRadius: BorderRadius.circular(100),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
            SizedBox(height: size.height * 0.04375),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                InkWell(
                  onTap: () {},
                  child: Container(
                    height: size.height * 0.0625,
                    width: size.width * 0.6875,
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
