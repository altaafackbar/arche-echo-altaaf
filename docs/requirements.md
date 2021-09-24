# Project Requirements

## Executive Summary

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ARCHE and ECHO research programs are focused on improving health outcomes for children by developing arts-based health resources for parents and families about common childhood conditions. The intent of the application is to fully integrate parents when it comes to the healthcare of their children by providing them with knowledge translation(KT) tools which combine the best available scientific evidence with the past experiences of parents in an engaging and informative format.The approach allows parents to feel more involved in the health of their families and feel a heightened degree of confidence when making choices involving the health of their children. The target users of the application will be Albertan parents who are both English and French speaking. There will also be administrative users with experience in the medical field who will be tasked with managing and updating the resources that the parents will be accessing. The product will be used as a mobile application for both iOS and Android. Parents will be able to login to the app and gain access to the various KT tools in formats such as interactive infographics, videos, and eBooks while also providing functionalities such as access to nearby Emergency Departments and access to wait times for selected clinics.

## Project Glossary

+ **Admin** - Admin is a user with administrative access to the app. This user has a medical background where they will be responsible for updating and managing resources for the target users. They will also have the ability to edit user accounts and access data analytics based on usage by the users.
+ **ARCHE** - ARCHE is an acronym for Alberta Research Centre for Health Evidence which is administered by PI Dr. Lisa Hartling from the Department of Pediatrics.
+ **ECHO** - ECHO is an acronym for translating Evidence in Child Health to enhance Outcomes which is administered by PI Dr. Shannon Scott from the Faculty of Nursing.
+ **KT Tools** - KT tools refers to Knowledge Translation tools which are various evidence based tools that combine the best available scientific evidence with experiences of parents to present the best possible resources for parents to gain further knowledge and involvement in the health of their children.
+ **Symptom Checker** - The Symptom Checker is a tool that can be used to determine possible illnesses or conditions that a child may be experiencing depending on what part of the body is causing conflict for the child from their visible symptoms.

## User Stories

### US 01.01.01 - Login and create account

As a user, I want to create a personal account, so that I can have a secure, individualized experience that is appropriate for myself and my family’s needs.

**Acceptance Tests:**

1. Login as a user with correct information
2. Input incorrect information and make sure it doesn’t allow the user to continue or access another individual’s account

### US 01.02.01 - User profile screen and customization

As a user, I want to have a centralized location for all information that is personally related to me (profile picture, children’s sub-profiles, etc.) and also the ability to customize/add/remove from it, so that I can have an experience that feels conducive to myself and my children’s needs.

**Acceptance Tests:**

1. Changes to my profile picture will be saved
2. Clicking “add a child” will take the user to the “create a child’s profile” screen

### US 01.03.01 - Create and attach a child’s profile to one specific account (only accessible when logged-in)

As a user, I want to create a profile(s) for my child(ren), so that I can store/track relevant information like the: child’s age, weight, height, and medical dosages; I also want to be able to add to/update this information so that I can see a dated and sorted entry log.

**Acceptance Tests:**

1. Creating a child’s profile should: create an entry in the database and should still exist after reloading the app (with the correct information).
2. Updating a child’s profile should: add a new entry in the database; properly displaying the new information in addition to the old info on the child’s profile page after reloading.

### US 02.01.01 - Splash Screen(s)

As a user, I want to see a splash screen when I launch the app so that I immediately know what app I am opening and also the organizations/companies behind the app I am using.

**Acceptance Tests:**

1. Launching the app immediately shows the splash screen(s).
2. The app functions as expected afterwards.

### US 02.02.01 -  App introduction/Onboarding? (first time launching the app only)

As a user, I want to be able to see a brief overview of the app's functionalities and offerings (through simple infographics) so that I can quickly decide if this app is appropriate/suitable for my usage.

**Acceptance Tests:**

1. Launching the app for the first time shows the app introduction slides.
2. The app will show the user disclaimer afterwards.

### US 02.03.01 - User disclaimer (first time launching the app only)

As a user, I want to see a disclaimer form the first time I use the app so I know the risks and the implications of using this app; I also want to be able to accept or decline the disclaimer form so that my consent dictates whether I can use the app or not.

**Acceptance Tests:**

1. Accepting the disclaimer form directs you to the language selection screen.
2. Declining the disclaimer form sends you back to the beginning of  app introduction slides.

### US 02.04.01 - Language selection (first time launching the app only)

As a user, I want to be able to select my choice of language (between English and French) the first time I use the app so I am able to use the app in my preferred official language.

**Acceptance Tests:**

1. Selecting English as my choice of language will display all subsequent app functions in English.
2. Selecting French as my choice of language will display all subsequent app functions in French.

### US 02.05.01 - User Home Screen

As a user, I want to have an intuitive home screen so that I have simple and quick paths of navigation to the major functions/sections of the app.

**Acceptance Tests:**

1. Clicking each option/shortcut will take me to the corresponding  section of the app.
2. Clicking the back arrow from the subsequent pages will bring me back to the home screen.

### US 03.01.01 - Navigation menu (bottom right hamburger menu)

As a user, I want to have a navigation menu so that I can navigate to different functions more easily.

**Acceptance Tests:**

1. Clicking each possible menu item will take me to the corresponding app page.

### US 03.01.02 - Call 811 and 911 button (located in navigation menu)

As a user, I want to let the app take me to my phone’s dialpad and pre-enter either 811 or 911 into it, so that I can have an easy way to access further health information (HealthLink in Alberta) or emergency help if deemed necessary.

**Acceptance Tests:**

1. Clicking the 811 button will take me to my phone’s dialpad with 811 pre-entered into it.
2. Clicking the 911 button will take me to my phone’s dialpad with 911 pre-entered into it.

### US 03.02.01 - Shortcut hotbar (bottom of app)

As a user, I want to have a persistent set of shortcuts so that I can intuitively access the most important parts of the app without wasting needless time.

**Acceptance Tests:**

1. Clicking each option/shortcut will take me to the corresponding section of the app.
2. The shortcut hotbar is on the bottom of the app within all pages/functions of our app.


## MoSCoW

### Must Have

- US.01.01.01 - Login and create account
- US 01.02.01 - User profile screen
- US 01.03.01 - Create and attach child account
- US 02.03.01 - User disclaimer
- US 02.04.01 - Language selection
- US 02.05.01 - User Home Screen
- US 03.01.01 - Navigation menu

### Should Have

- US 02.01.01 - Splash Screen
- US 03.01.02 - Call 811 and 911 button

### Could Have

- US 02.02.01 - App introduction/Onboarding

### Would Like But Won't Get

- 

## Similar Products

+ [First Aid: American Red Cross](https://apps.apple.com/us/app/first-aid-by-american-red-cross/id529160691)
    + App administered by the American Red Cross that gives people access to expert resources and advice regarding everyday emergencies in various formats such as videos, interactive quizzes, and step-by-step guides.
    + **Language Toggle functionality** - This functionality allows the user to switch between English and Spanish by simply pressing a toggle button. This is a feature that our client has requested for our project albeit with French instead of Spanish, so this feature can be drawn upon as inspiration to determine the best way to integrate the language toggle.
    + **9-1-1 Call Integration functionality** - This feature allows the user to call 9-1-1 directly through the application which is also a feature that our client has requested be included in our project. Since we need this exact feature, the means in which the American Red Cross implemented this feature can be drawn upon for inspiration.
+ [KidsDoc](https://apps.apple.com/us/app/kidsdoc-from-the-aap/id373964536)
    + App administered by the American Academy of Pediatrics that helps parents determine the degree of care their children may require based on their symptoms.
    + **Symptom Checker functionality** - Very similar functionality to what we are planning to implement with the Symptom Checker. Allows users to click on the body part of a child body model to see symptoms associated with that body part. This functionality will be partially used as inspiration as to the style in which we should implement the symptom checker into the application.
    + **‘Immediate Connections’ functionality** - This is similar in premise to a client requested feature where the user is able to quickly access a phone call to 911 or call nearby Emergency Departments. This feature can be used as inspiration since the client’s requested feature follows the same general premise with a slight variation in the approach.
    + **‘Home Care Advice’ functionality** - This is similar to the Knowledge Translation(KT) tools integrated into the client app where the parent is able to access clear and up-to-date information and resources for the parents to treat their children’s symptoms from home.

## Open Source Products

+ [Flutter Translate](https://github.com/bratan/flutter_translate)
    + Open source library for implementing other languages in Flutter.
    + Allows the user to toggle between different languages seamlessly. Using this library would be an efficient means of integrating French and English translation options in the app.
+ [Geolocator API](https://pub.dev/packages/geolocator)
    + API used to access geolocation of device and pinpoint exact location.
    + Finds the location of the user which we can subsequently use along with the Google Maps SDK to find nearby clinics based on user location.
+ [Google Maps SDK](https://pub.dev/packages/google_maps_flutter)
    + Software Development Kit for integrating Google Maps into applications.
    + Implements Google Maps into the application which can be used to pinpoint nearby clinics for users to find based on their geographic location.

## Technical Resources

### Backend: Firebase + Firestore

+ [Firebase Documentation](https://firebase.google.com/docs)
+ [Firestore Documentation](https://firebase.google.com/docs/firestore)
+ [Flutter Firebase Tutorial](https://www.youtube.com/watch?v=sfA3NWDBPZ4&list=PL4cUxeGkcC9j--TKIdkb3ISfRbJeJYQwC&ab_channel=TheNetNinja)

### Deployment: Cybera + Travis CI

+ [Cybera](https://www.cybera.ca/)
+ [Travis CI](https://docs.travis-ci.com/)
+ [Flutter Deployment Documentation](https://flutter.dev/docs/deployment/cd)

### Frontend: Flutter

+ [Flutter Documentation](https://flutter.dev/docs)
+ [Flutter Tutorial](https://www.youtube.com/watch?v=x0uinJvhNxI&ab_channel=Academind)
+ [Flutter Resources](https://github.com/Solido/awesome-flutter)


