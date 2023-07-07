// ignore_for_file: camel_case_types, avoid_unnecessary_containers

import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:form_field_validator/form_field_validator.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:med_o_care/Constant/constants.dart';
import 'package:med_o_care/View/Screens/bmi.dart';
import 'package:med_o_care/View/Screens/healthscore2.dart';
import 'package:med_o_care/View/Screens/score_tracker.dart';

class healthscore_data extends StatefulWidget {
  const healthscore_data({super.key});

  @override
  State<healthscore_data> createState() => _healthscore_dataState();
}

class _healthscore_dataState extends State<healthscore_data> {
  //final _formkey = GlobalKey<FormState>();
  TextEditingController weightcontroller = TextEditingController();
  TextEditingController heightcontroller = TextEditingController();
  TextEditingController convertcontroller = TextEditingController();
  // TextEditingController heightcontroller = TextEditingController();
  late double bmi;
  //  late int? height;
  //  late int? weight;

  @override
  void initState() {
    super.initState();
  }

  // double BMI() {
  //   String? heightText = heightcontroller.text;
  //   double? height = heightText != null ? double.tryParse(heightText) : 1;
  //   String? weightText = weightcontroller.text;
  //   double? weight = weightText != null ? double.tryParse(weightText) : 1;
  //   late double bmi = ((weight!) / (height! * height));
  //   return bmi;
  // }
  double BMI() {
    String? heightText = heightcontroller.text;
    double height = heightText != null ? double.tryParse(heightText) ?? 1 : 1;
    String? weightText = weightcontroller.text;
    double weight = weightText != null ? double.tryParse(weightText) ?? 1 : 1;
    double bmi = (weight * 10000) / (height * height);
    return double.parse(bmi.toStringAsFixed(2));
  }

  @override
  Widget build(BuildContext context) {
    var size = MediaQuery.of(context).size;

    String getBMIStatus() {
      double bmi = BMI();
      if (bmi <= 10) {
        return "Severely underweight";
      } else if (bmi < 18.5 && bmi > 10) {
        return "Underweight";
      } else if (bmi >= 18.5 && bmi <= 24.9) {
        return "Normal weight";
      } else if (bmi >= 25 && bmi <= 29.9) {
        return "Overweight";
      } else if (bmi >= 30 && bmi <= 34.9) {
        return "Obesity - Class I";
      } else if (bmi >= 35 && bmi <= 39.9) {
        return "Obesity - Class II";
      } else if (bmi > 39.9) {
        return "Obesity - Class III";
      } else {
        return "Invalid input";
      }
    }

    String getBMITips() {
      double bmi = BMI();
      if (bmi > 10 && bmi <= 18.5) {
        return "If you find yourself in the severely underweight category, it's important to consult a healthcare professional who can provide personalized guidance. Focus on consuming a balanced diet with nutrient-dense foods, including whole grains, lean proteins, fruits, and vegetables, and aim for frequent, smaller meals to increase calorie intake. Incorporate calorie-dense foods such as nuts, nut butter, avocados, and healthy oils into your diet. Engaging in regular strength training exercises can help build muscle mass. It's crucial to monitor your progress and regularly follow up with healthcare professionals to ensure you're on the right track and making healthy strides towards achieving a balanced weight.";
      } else if (bmi < 18.5) {
        return "Ensure you're consuming enough calories to meet your daily energy needs. Focus on nutrient-dense foods to support healthy weight gain. Consider incorporating resistance training exercises to build muscle mass.";
      } else if (bmi >= 18.5 && bmi <= 24.9) {
        return "Maintain a balanced and nutritious diet. Engage in regular physical activity to stay active and maintain overall health. Practice portion control and avoid excessive calorie intake.";
      } else if (bmi >= 25 && bmi <= 29.9) {
        return "Aim for gradual and sustainable weight loss through a combination of diet and exercise. Choose whole foods, lean proteins, fruits, vegetables, and whole grains. Increase your physical activity level, incorporating both cardiovascular exercises and strength training.";
      } else if (bmi >= 30 && bmi <= 34.9) {
        return "Seek guidance from a healthcare professional or a registered dietitian for personalized weight loss strategies. Focus on portion control and reducing calorie intake. Engage in regular exercise to promote weight loss and improve overall fitness.";
      } else if (bmi >= 35 && bmi <= 39.9) {
        return "Consult with a healthcare professional to develop a comprehensive weight loss plan. Consider medical interventions or weight loss surgery, depending on individual circumstances. Implement lifestyle changes, including diet modifications and increased physical activity, under professional supervision.";
      } else {
        return "Consult with a healthcare professional to develop a comprehensive weight loss plan. Consider medical interventions or weight loss surgery, depending on individual circumstances. Implement lifestyle changes, including diet modifications and increased physical activity, under professional supervision.";
      }
    }

    void showToast(String message) {
      Fluttertoast.showToast(
        msg: message,
        toastLength: Toast.LENGTH_SHORT,
        gravity: ToastGravity.CENTER,
        backgroundColor: Colors.grey[700],
        timeInSecForIosWeb: 1,
      );
    }

    return Scaffold(
      resizeToAvoidBottomInset: false,
      body: Padding(
        padding: const EdgeInsets.all(0.5),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.start,
          children: [
            const SizedBox(height: 13),
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
                          builder: (context) => const ScoreTracker()));
                    },
                    icon: const Icon(Icons.arrow_back)),
                const SizedBox(width: 7.5),
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
                  'Weight   (in kg)',
                  style: GoogleFonts.poppins(
                      fontSize: 13, fontWeight: FontWeight.w500),
                ),
              ],
            ),
            const SizedBox(height: 5),

            Padding(
              padding: EdgeInsets.fromLTRB(
                  size.width * 0.12, 0, size.width * 0.12, 0),
              child: TextFormField(
                keyboardType: TextInputType.number,
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
                  'Height   (in cm)',
                  style: GoogleFonts.poppins(
                      fontSize: 13, fontWeight: FontWeight.w500),
                ),
              ],
            ),
            const SizedBox(height: 5),

            Padding(
              padding: EdgeInsets.fromLTRB(
                  size.width * 0.12, 0, size.width * 0.12, 0),
              child: TextFormField(
                keyboardType: TextInputType.number,
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
                        builder: (context) => const FinalHeathscore()));
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
            SizedBox(height: size.height * 0.015),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                InkWell(
                  onTap: () {
                    double height = heightcontroller.text != null
                        ? double.tryParse(heightcontroller.text) ?? 1
                        : 1;
                    double weight = weightcontroller.text != null
                        ? double.tryParse(weightcontroller.text) ?? 1
                        : 1;
                    double bmi = (weight * 10000) / (height * height);
                    if (height == 1 && weight == 1) {
                      showToast("Enter input");
                    } else if (bmi > 50 || bmi < 5) {
                      showToast("Enter valid values");
                    } else {
                      Navigator.of(context).push(MaterialPageRoute(
                          builder: (context) => BMI_screen(
                                bmi: BMI().toString() == '10000.00'
                                    ? 'Enter values'
                                    : BMI().toString(),
                              )));
                    }
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
                      "BMI",
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
