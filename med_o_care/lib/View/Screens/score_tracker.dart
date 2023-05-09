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
  final _formkey = GlobalKey<FormState>();
  TextEditingController weightcontroller = TextEditingController();
  TextEditingController heightcontroller = TextEditingController();
  TextEditingController repasscontroller = TextEditingController();

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
            // Row(
            //   mainAxisAlignment: MainAxisAlignment.start,
            //   children: [
            //     SizedBox(
            //       width: size.width * 0.045,
            //     ),
            //     Image.asset(
            //       logo,
            //       height: size.height * 0.08125,
            //       width: size.height * 0.08125,
            //     ),
            //   ],
            // ),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Container(
                  height: size.height * 0.145,
                  width: size.width * 0.385,
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
                        width: size.width * 0.75,
                        height: size.height * 0.5475,
                        child: Column(
                          children: [
                            SizedBox(height: size.height * 0.11875),
                            Text('Calculate your Health Score',
                                style: GoogleFonts.poppins(
                                    fontWeight: FontWeight.w500, fontSize: 16)),
                            SizedBox(height: size.height * 0.02125),
                            InkWell(
                              onTap: () {
                                Navigator.of(context).push(MaterialPageRoute(
                                    builder: (context) => healthscore_data()));
                              },
                              child: Container(
                                height: size.height * 0.0625,
                                width: size.width * 0.575,
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
                            SizedBox(height: size.height * 0.04125),
                            Text('OR',
                                style: GoogleFonts.poppins(
                                    fontSize: 18,
                                    fontWeight: FontWeight.w500,
                                    color: Colors.white)),
                            SizedBox(height: size.height * 0.06125),
                            Text('Track your periods',
                                style: GoogleFonts.poppins(
                                    fontWeight: FontWeight.w500, fontSize: 16)),
                            SizedBox(height: size.height * 0.01875),
                            InkWell(
                              onTap: () {},
                              child: Container(
                                height: size.height * 0.0625,
                                width: size.width * 0.575,
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
