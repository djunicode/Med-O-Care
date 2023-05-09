import 'package:flutter/material.dart';
import 'package:form_field_validator/form_field_validator.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:med_o_care/Constant/constants.dart';
import 'package:med_o_care/View/Screens/healthscore2.dart';
import 'package:med_o_care/View/Screens/score_tracker.dart';

class healthscore_data extends StatefulWidget {
  const healthscore_data({super.key});

  @override
  State<healthscore_data> createState() => _healthscore_dataState();
}

class _healthscore_dataState extends State<healthscore_data> {
  final _formkey = GlobalKey<FormState>();
  TextEditingController weightcontroller = TextEditingController();
  TextEditingController heightcontroller = TextEditingController();
  TextEditingController convertcontroller = TextEditingController();
  // TextEditingController heightcontroller = TextEditingController();

  @override
  Widget build(BuildContext context) {
    var size = MediaQuery.of(context).size;

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
                  width: size.width * 0.045,
                ),
                Image.asset(
                  logo,
                  height: size.height * 0.08125,
                  width: size.width * 0.1625,
                ),
              ],
            ),
            SizedBox(height: size.height * 0.01875),
            Row(
              mainAxisAlignment: MainAxisAlignment.start,
              children: [
                SizedBox(width: size.width * 0.0325),
                IconButton(
                    onPressed: () {
                      Navigator.of(context).pop(MaterialPageRoute(
                          builder: (context) => score_tracker()));
                    },
                    icon: Icon(Icons.arrow_back)),
                SizedBox(width: 7.5),
                Container(
                  child: Text('Calculate your Health score',
                      style: GoogleFonts.poppins(
                        fontSize: 16,
                        fontWeight: FontWeight.bold,
                      )),
                ),
              ],
            ),
            SizedBox(height: size.height * 0.03625),
            Row(
              children: [
                SizedBox(width: size.width * 0.1675),
                Text(
                  'Weight',
                  style: GoogleFonts.poppins(
                      fontSize: 13, fontWeight: FontWeight.w500),
                ),
              ],
            ),
            SizedBox(height: 5),

            Padding(
              padding: EdgeInsets.fromLTRB(
                  size.width * 0.12, 0, size.width * 0.12, 0),
              child: TextFormField(
                keyboardType: TextInputType.emailAddress,
                controller: weightcontroller,
                decoration: const InputDecoration(
                  // labelText: "Weight",
                  hintText: 'Enter your weight',
                  border: OutlineInputBorder(
                      borderRadius: BorderRadius.all(Radius.circular(50))),
                  // prefixIcon: Icon(Icons.person),
                  fillColor: Colors.white,
                  filled: true,
                ),
                validator: MultiValidator(
                    [RequiredValidator(errorText: "    " '*Required')]),
              ),
            ),

            // Row(
            //   mainAxisAlignment: MainAxisAlignment.center,
            //   children: [
            //     Container(
            //       height: size.height * 0.06875,
            //       width: size.width * 0.6875,
            //       child: Column(
            //         mainAxisAlignment: MainAxisAlignment.center,
            //         children: [
            //           Row(
            //             mainAxisAlignment: MainAxisAlignment.center,
            //             children: [
            //               Container(
            //                 child: Text(
            //                   'Enter your weight',
            //                   style: GoogleFonts.poppins(
            //                     fontSize: 13,
            //                     fontWeight: FontWeight.w500,
            //                     color: Colors.black.withOpacity(0.45),
            //                   ),
            //                 ),
            //               ),
            //               SizedBox(width: size.width * 0.2125),
            //               IconButton(
            //                 onPressed: () {},
            //                 icon: Icon(Icons.arrow_downward_sharp),
            //               ),
            //             ],
            //           )
            //         ],
            //       ),
            //       decoration: BoxDecoration(
            //           border: Border.all(color: colorPrimary),
            //           borderRadius: BorderRadius.circular(50),
            //           color: Colors.white),
            //     ),
            //   ],
            // ),
            SizedBox(height: size.height * 0.0375),
            Row(
              children: [
                SizedBox(width: size.width * 0.1675),
                Text(
                  'Height',
                  style: GoogleFonts.poppins(
                      fontSize: 13, fontWeight: FontWeight.w500),
                ),
              ],
            ),
            SizedBox(height: 5),

            Padding(
              padding: EdgeInsets.fromLTRB(
                  size.width * 0.12, 0, size.width * 0.12, 0),
              child: TextFormField(
                keyboardType: TextInputType.emailAddress,
                controller: heightcontroller,
                decoration: const InputDecoration(
                  // labelText: "Height",
                  hintText: 'Enter your height',
                  border: OutlineInputBorder(
                      borderRadius: BorderRadius.all(Radius.circular(50))),
                  // prefixIcon: Icon(Icons.person),
                  fillColor: Colors.white,
                  filled: true,
                ),
                validator: MultiValidator(
                    [RequiredValidator(errorText: "    " '*Required')]),
              ),
            ),

            // Row(
            //   mainAxisAlignment: MainAxisAlignment.center,
            //   children: [
            //     Container(
            //       height: size.height * 0.0625,
            //       width: size.width * 0.6875,
            //       child: Column(
            //         mainAxisAlignment: MainAxisAlignment.center,
            //         children: [
            //           Row(
            //             mainAxisAlignment: MainAxisAlignment.center,
            //             children: [
            //               Container(
            //                 child: Text(
            //                   'Enter your height',
            //                   style: GoogleFonts.poppins(
            //                     fontSize: 13,
            //                     fontWeight: FontWeight.w500,
            //                     color: Colors.black.withOpacity(0.45),
            //                   ),
            //                 ),
            //               ),
            //               SizedBox(width: 85),
            //               IconButton(
            //                 onPressed: () {},
            //                 icon: Icon(Icons.arrow_downward_sharp),
            //               ),
            //             ],
            //           )
            //         ],
            //       ),
            //       decoration: BoxDecoration(
            //           border: Border.all(color: colorPrimary),
            //           borderRadius: BorderRadius.circular(50),
            //           color: Colors.white),
            //     ),
            //   ],
            // ),
            SizedBox(height: size.height * 0.03875),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                InkWell(
                  onTap: () {
                    Navigator.of(context).push(MaterialPageRoute(
                        builder: (context) => final_healthscore()));
                  },
                  child: Container(
                    height: size.height * 0.06875,
                    width: size.width * 0.6875,
                    decoration: BoxDecoration(
                      color: const Color(0xFF537FE7),
                      borderRadius: BorderRadius.circular(50),
                    ),
                    child: Center(
                        child: Text(
                      "Check",
                      style: GoogleFonts.poppins(
                          fontSize: 16,
                          fontWeight: FontWeight.w500,
                          color: Colors.white),
                    )),
                  ),
                ),
              ],
            ),
            SizedBox(height: size.height * 0.0625),
            Row(
              children: [
                SizedBox(width: size.width * 0.0975),
                Text(
                  'Convert',
                  style: GoogleFonts.poppins(
                      fontSize: 16, fontWeight: FontWeight.w500),
                ),
              ],
            ),
            SizedBox(
              height: size.height * 0.01,
            ),

            Row(mainAxisAlignment: MainAxisAlignment.center, children: [
              Row(mainAxisAlignment: MainAxisAlignment.start, children: [
                SizedBox(width: 39),
                Container(
                  padding: EdgeInsets.only(left: 13),
                  height: size.height * 0.06875,
                  width: size.width * 0.31,
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Row(
                        children: [
                          Text(
                            'Enter value',
                            style: GoogleFonts.poppins(
                              fontSize: 10,
                              fontWeight: FontWeight.w500,
                              color: Colors.black.withOpacity(0.45),
                            ),
                          ),
                          IconButton(
                            onPressed: () {},
                            icon: Icon(Icons.arrow_downward_sharp),
                            iconSize: 20,
                          ),
                        ],
                      )
                    ],
                  ),
                  decoration: BoxDecoration(
                      border: Border.all(color: colorPrimary),
                      borderRadius: BorderRadius.circular(50),
                      color: Colors.white),
                ),
              ])
            ])

            //     Container(
            //       child: Padding(
            //         padding: EdgeInsets.fromLTRB(
            //             size.width * 0.16, 0, size.width * 0.16, 0),
            //         child: TextFormField(
            //           keyboardType: TextInputType.emailAddress,
            //           controller: weightcontroller,
            //           decoration: const InputDecoration(
            //             // labelText: "Weight",
            //             hintText: 'Enter value',
            //             border: OutlineInputBorder(
            //                 borderRadius:
            //                     BorderRadius.all(Radius.circular(50))),
            //             // prefixIcon: Icon(Icons.person),
            //             fillColor: Colors.white,
            //             filled: true,
            //           ),
            //           validator: MultiValidator([
            //             RequiredValidator(errorText: "    " '*Required')
            //           ]),
            //         ),
            //       ),
            //     ),

            //     SizedBox(width: size.width * 0.05),
            //     Icon(
            //       Icons.compare_arrows,
            //       size: 40,
            //     ),
            //     SizedBox(width: size.width * 0.05),
            //     Container(
            //       padding: EdgeInsets.only(right: 5),
            //       height: size.height * 0.06875,
            //       width: size.width * 0.3,
            //       child: Column(
            //         mainAxisAlignment: MainAxisAlignment.center,
            //         children: [
            //           Row(
            //             mainAxisAlignment: MainAxisAlignment.end,
            //             children: [
            //               IconButton(
            //                 onPressed: () {},
            //                 icon: Icon(Icons.arrow_downward_sharp),
            //                 iconSize: 20,
            //               ),
            //             ],
            //           )
            //         ],
            //       ),
            //       decoration: BoxDecoration(
            //           border: Border.all(color: colorPrimary),
            //           borderRadius: BorderRadius.circular(50),
            //           color: Colors.white),
            // ),
            // ],
            // ),
            // ],
            // )

            // Row(
            //   children: [
            //     Container(
            //       margin: EdgeInsets.fromLTRB(
            //           size.width * 0.12, 0, size.width * 0.12, 0),
            //       child: Row(
            //           mainAxisAlignment: MainAxisAlignment.start,
            //           children: [
            //             TextFormField(
            //               keyboardType: TextInputType.emailAddress,
            //               controller: heightcontroller,
            //               decoration: const InputDecoration(
            //                 labelText: "User Name",
            //                 hintText: 'Enter your name',
            //                 border: OutlineInputBorder(
            //                     borderRadius:
            //                         BorderRadius.all(Radius.circular(50))),
            //                 prefixIcon: Icon(Icons.person),
            //                 fillColor: Colors.white,
            //                 filled: true,
            //               ),
            //               validator: MultiValidator([
            //                 RequiredValidator(errorText: "    " '*Required')
            //               ]),
            //             ),
            //           ]),
            //     )
            //   ],
            // )

            // Row(
            //   children: [
            //     Text('XYZ'),
            //     SizedBox(
            //       width: 10,
            //     ),
            //     // TextFormField(
            //     //   keyboardType: TextInputType.emailAddress,
            //     //   controller: convertcontroller,
            //     //   decoration: const InputDecoration(
            //     //     // labelText: "Height",
            //     //     hintText: 'Enter your height',
            //     //     border: OutlineInputBorder(
            //     //         borderRadius: BorderRadius.all(Radius.circular(50))),
            //     //     // prefixIcon: Icon(Icons.person),
            //     //     fillColor: Colors.white,
            //     //     filled: true,
            //     //   ),
            //     //   // validator: MultiValidator(
            //     //   //     [RequiredValidator(errorText: "    " '*Required')]),
            //     // ),
            //   ],
            // )
          ],
        ),
      ),
    );
  }
}
