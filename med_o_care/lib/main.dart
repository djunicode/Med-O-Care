import 'package:awesome_notifications/awesome_notifications.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:hive_flutter/hive_flutter.dart';
import 'package:med_o_care/View/Auth/login.dart';
import 'package:med_o_care/View/Auth/services/auth_service.dart';
import 'package:med_o_care/View/Screens/home.dart';
import 'package:med_o_care/View/Upload/add_document.dart';
import 'package:path_provider/path_provider.dart' as path_provider;
import 'View/Reminders/models/buy.dart';
import 'View/Reminders/models/take.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  AwesomeNotifications().initialize(
    null,
    [
      NotificationChannel(
          channelKey: 'scheduled_channel',
          channelName: 'Scheduled Notifications',
          defaultColor: Colors.teal,
          locked: true,
          importance: NotificationImportance.High,
),
    ],
  );
  final appDocumentDir = await path_provider.getApplicationDocumentsDirectory();
  Hive.init(appDocumentDir.path);
  await Hive.initFlutter();
  Hive.registerAdapter(TakeReminderAdapter());
  Hive.registerAdapter(BuyReminderAdapter());
  runApp(const MyApp());
  await Hive.openBox('reminderBox');
}

class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  @override
  void initState() {
    super.initState();
    AwesomeNotifications().isNotificationAllowed().then(
      (isAllowed) {
        if (!isAllowed) {
          showDialog(
            context: context,
            builder: (context) => AlertDialog(
              title: const Text('Allow Notifications'),
              content:
                  const Text('Our app would like to send you notifications'),
              actions: [
                TextButton(
                  onPressed: () {
                    Navigator.pop(context);
                  },
                  child: const Text(
                    'Don\'t Allow',
                    style: TextStyle(color: Colors.grey, fontSize: 18),
                  ),
                ),
                TextButton(
                  onPressed: () => AwesomeNotifications()
                      .requestPermissionToSendNotifications()
                      .then((_) => Navigator.pop(context)),
                  child: const Text(
                    'Allow',
                    style: TextStyle(
                      color: Colors.teal,
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
              ],
            ),
          );
        }
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'MedOCare',
      theme: ThemeData(
          fontFamily: GoogleFonts.poppins().fontFamily,
          scaffoldBackgroundColor: const Color(0xFFE9F8F9),
          inputDecorationTheme: const InputDecorationTheme(
            enabledBorder: OutlineInputBorder(
                borderSide: BorderSide(color: Color(0xFF82AAE3)),
                borderRadius: BorderRadius.all(Radius.circular(50))),
            focusedBorder: OutlineInputBorder(
                borderSide: BorderSide(color: Color(0xFF537FE7)),
                borderRadius: BorderRadius.all(Radius.circular(50))),
            errorBorder: OutlineInputBorder(
                borderSide: BorderSide(color: Color(0xA6AF0D0D)),
                borderRadius: BorderRadius.all(Radius.circular(50))),
          )),
      home: FutureBuilder<String>(
        future: AuthService().getAuthToken(),
        builder: (context, snapshot) {
          if (snapshot.hasData &&
              snapshot.data!.isNotEmpty &&
              snapshot.data != 'no_token') {
            // User is logged in, navigate to home page
            return const Home();
          } else {
            // User is not logged in, navigate to login page
            return const LoginScreen();
          }
        },
      ),
      routes: {
        '/add_files': (context) => const AddDocument(),
        '/navbar': (context) => const Home(),
        '/login': (context) => const LoginScreen(),
      },
    );
  }
}
