import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:med_o_care/Constant/constants.dart';
import 'package:med_o_care/View/Screens/healthscore1.dart';

class score_tracker extends StatefulWidget {
  const score_tracker({super.key});

  @override
  State<score_tracker> createState() => _score_trackerState();
}

class _score_trackerState extends State<score_tracker> {
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
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Container(
                  height: 116,
                  width: 154,
                  child: Image.asset("assets/images/Information carousel.png"),
                )
              ],
            ),
            Row(
              children: [
                Flexible(
                    fit: FlexFit.loose,
                    child: Center(
                      child: Container(
                        decoration: BoxDecoration(
                            color: Color(0XFF82AAE3).withOpacity(0.55),
                            borderRadius: BorderRadius.circular(5)),
                        width: 300,
                        height: 438,
                        child: Column(
                          children: [
                            SizedBox(height: 95),
                            Text('Calculate your Health Score',
                                style: GoogleFonts.poppins(
                                    fontWeight: FontWeight.w500, fontSize: 16)),
                            SizedBox(height: 17),
                            InkWell(
                              onTap: () {
                                Navigator.of(context).push(MaterialPageRoute(
                                    builder: (context) => healthscore_data()));
                              },
                              child: Container(
                                height: 50,
                                width: 230,
                                decoration: BoxDecoration(
                                  color: const Color(0xFF537FE7),
                                  borderRadius: BorderRadius.circular(50),
                                ),
                                child: Center(
                                    child: Text(
                                  "Health Score",
                                  style: GoogleFonts.poppins(
                                      fontSize: 16,
                                      fontWeight: FontWeight.w500,
                                      color: Colors.white),
                                )),
                              ),
                            ),
                            SizedBox(height: 33),
                            Text('OR',
                                style: GoogleFonts.poppins(
                                    fontSize: 18,
                                    fontWeight: FontWeight.w500,
                                    color: Colors.white)),
                            SizedBox(height: 49),
                            Text('Track your periods',
                                style: GoogleFonts.poppins(
                                    fontWeight: FontWeight.w500, fontSize: 16)),
                            SizedBox(height: 15),
                            InkWell(
                              onTap: () {},
                              child: Container(
                                height: 50,
                                width: 230,
                                decoration: BoxDecoration(
                                  color: const Color(0xFF537FE7),
                                  borderRadius: BorderRadius.circular(50),
                                ),
                                child: Center(
                                    child: Text(
                                  "Period tracker",
                                  style: GoogleFonts.poppins(
                                      fontSize: 16,
                                      fontWeight: FontWeight.w500,
                                      color: Colors.white),
                                )),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ))
              ],
            )
          ],
        ),
      ),
    );
  }
}
