// ignore_for_file: avoid_unnecessary_containers

import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:med_o_care/Constant/constants.dart';
import 'package:med_o_care/View/Screens/healthscore1.dart';

class BMI_screen extends StatefulWidget {
  final String? bmi;
  const BMI_screen({super.key, this.bmi});

  @override
  State<BMI_screen> createState() => _BMI_screenState();
}

class _BMI_screenState extends State<BMI_screen> {
  @override
  Widget build(BuildContext context) {
    var size = MediaQuery.of(context).size;

    double bmi = double.parse(widget.bmi!);

    String getBMIStatus() {
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

    // String getBMITips() {
    //   if (bmi > 10 && bmi <= 18.5) {
    //     return "If you find yourself in the severely underweight category, it's important to consult a healthcare professional who can provide personalized guidance.\n Focus on consuming a balanced diet with nutrient-dense foods, including whole grains, lean proteins, fruits, and vegetables, and aim for frequent, smaller meals to increase calorie intake.\n Incorporate calorie-dense foods such as nuts, nut butter, avocados, and healthy oils into your diet.\n Engaging in regular strength training exercises can help build muscle mass.\n It's crucial to monitor your progress and regularly follow up with healthcare professionals to ensure you're on the right track and making healthy strides towards achieving a balanced weight.";
    //   } else if (bmi < 18.5) {
    //     return "Ensure you're consuming enough calories to meet your daily energy needs.\n Focus on nutrient-dense foods to support healthy weight gain.\n Consider incorporating resistance training exercises to build muscle mass.";
    //   } else if (bmi >= 18.5 && bmi <= 24.9) {
    //     return " ";
    //   } else if (bmi >= 25 && bmi <= 29.9) {
    //     return "Aim for gradual and sustainable weight loss through a combination of diet and exercise. Choose whole foods, lean proteins, fruits, vegetables, and whole grains. Increase your physical activity level, incorporating both cardiovascular exercises and strength training.";
    //   } else if (bmi >= 30 && bmi <= 34.9) {
    //     return "Seek guidance from a healthcare professional or a registered dietitian for personalized weight loss strategies. Focus on portion control and reducing calorie intake. Engage in regular exercise to promote weight loss and improve overall fitness.";
    //   } else if (bmi >= 35 && bmi <= 39.9) {
    //     return "Consult with a healthcare professional to develop a comprehensive weight loss plan. Consider medical interventions or weight loss surgery, depending on individual circumstances. Implement lifestyle changes, including diet modifications and increased physical activity, under professional supervision.";
    //   } else {
    //     return "Consult with a healthcare professional to develop a comprehensive weight loss plan. Consider medical interventions or weight loss surgery, depending on individual circumstances. Implement lifestyle changes, including diet modifications and increased physical activity, under professional supervision.";
    //   }
    // }

    String getBMITips() {
      if (bmi <= 10) {
        return '''
        If you find yourself in the severely underweight category, it's important to consult a healthcare professional who can provide personalized guidance.
        Focus on consuming a balanced diet with nutrient-dense foods, including whole grains, lean proteins, fruits, and vegetables, and aim for frequent, smaller meals to increase calorie intake.
        Consider incorporating healthy fats, such as avocados and nuts, into your diet.
        Avoid excessive physical activity that can further burn calories.
        Seek support from a registered dietitian or nutritionist for a customized meal plan.
        ''';
      } else if (bmi < 18.5 && bmi > 10) {
        return '''
        Maintain a well-balanced diet with a variety of food groups.
        Ensure you're consuming enough calories to meet your energy needs.
        Include protein-rich foods like lean meats, eggs, dairy, and legumes.
        Incorporate healthy fats from sources like nuts, seeds, and olive oil.
        Consume plenty of fruits, vegetables, and whole grains for essential nutrients.
        Consider resistance training to build muscle mass and improve strength.
        Discuss any concerns with a healthcare professional to rule out underlying issues.
        ''';
      } else if (bmi >= 18.5 && bmi <= 24.9) {
        return '''
        Continue practicing healthy eating habits and maintaining a balanced diet.
        Engage in regular physical activity for overall health and well-being.
        Aim for a variety of nutrient-dense foods from all food groups.
        Stay hydrated by drinking an adequate amount of water throughout the day.
        Monitor portion sizes to ensure you're not overeating.
        Prioritize sleep and manage stress levels for optimal health.
        Regularly check in with your healthcare provider for preventive check-ups.
        ''';
      } else if (bmi >= 25 && bmi <= 29.9) {
        return '''
        Focus on gradual weight loss by making sustainable lifestyle changes.
        Increase physical activity to burn calories and improve fitness.
        Include more fruits, vegetables, and whole grains in your meals.
        Limit processed and high-sugar foods and beverages.
        Control portion sizes and practice mindful eating.
        Seek support from a registered dietitian for personalized meal planning.
        Stay motivated by setting realistic goals and tracking your progress.
        ''';
      } else if (bmi >= 30 && bmi <= 34.9) {
        return '''
        Seek professional guidance from a healthcare provider or registered dietitian.
        Implement a comprehensive weight management plan.
        Follow a well-balanced, calorie-controlled diet tailored to your needs.
        Engage in regular physical activity, including both cardiovascular exercise and strength training.
        Monitor your progress and adjust your plan accordingly.
        Consider joining a support group or seeking counseling for emotional support.
        Stay committed and focus on long-term health improvement rather than quick fixes.
        ''';
      } else if (bmi >= 35 && bmi <= 39.9) {
        return '''
        Consult with a healthcare professional to address obesity-related health risks.
        Follow a structured weight loss program supervised by a medical professional.
        Incorporate a combination of aerobic exercise and strength training.
        Emphasize portion control and choose nutrient-dense foods.
        Consider behavioral therapy or counseling for emotional support and behavior modification.
        Explore surgical options if recommended by your healthcare provider.
        Engage in ongoing monitoring and support to maintain weight loss.
        ''';
      } else if (bmi > 39.9) {
        return '''
        Seek immediate medical attention and comprehensive care.
        Work closely with a team of healthcare professionals, including doctors, dietitians, and therapists.
        Consider bariatric surgery as a treatment option, if appropriate.
        Implement significant lifestyle changes, including diet and exercise, under medical supervision.
        Engage in ongoing support and monitoring to manage obesity-related health risks.
        Prioritize self-care, mental well-being, and seek support from a support network.
        Stay committed to long-term health and weight management goals.
        ''';
      } else {
        return "Invalid input";
      }
    }

    return Scaffold(
      body: Padding(
        padding: const EdgeInsets.all(0.5),
        child: SingleChildScrollView(
          physics: NeverScrollableScrollPhysics(),
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
                    child: Text('Your BMI',
                        style: GoogleFonts.poppins(
                          fontSize: 16,
                          fontWeight: FontWeight.bold,
                        )),
                  ),
                ],
              ),
              SizedBox(height: size.height * 0.02375),
              Column(
                children: [
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
                      widget.bmi ?? '',
                      style: GoogleFonts.poppins(
                          fontSize: 35,
                          fontWeight: FontWeight.w700,
                          color: Colors.white),
                    )),
                  ),
                  SizedBox(height: size.height * 0.04),
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 20),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          children: [
                            Text('Category :',
                                style: GoogleFonts.poppins(
                                  fontSize: 20,
                                  color: Colors.blue[900],
                                  fontWeight: FontWeight.normal,
                                )),
                            const SizedBox(
                              width: 20,
                            ),
                            Flexible(
                              child: Text(
                                getBMIStatus(),
                                style: GoogleFonts.poppins(
                                  fontSize: 18,
                                  // letterSpacing: 0,
                                  fontWeight: FontWeight.bold,
                                ),
                                overflow: TextOverflow.visible,
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(
                          height: 10,
                        ),
                        Text('Tips :',
                            style: GoogleFonts.poppins(
                              fontSize: 20,
                              color: Colors.blue[900],
                              fontWeight: FontWeight.normal,
                            )),
                        const SizedBox(
                          height: 10,
                        ),
                        Text(getBMITips(),
                            style: GoogleFonts.notoSans(
                              fontSize: 16,
                              fontWeight: FontWeight.w500,
                            )),
                      ],
                    ),
                  )
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
