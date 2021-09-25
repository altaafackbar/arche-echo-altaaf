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

**Acceptance Criteria:**

1. Login as a user with correct information
2. Input incorrect information and make sure it doesn’t allow the user to continue or access another individual’s account

### US 01.02.01 - User profile screen and customization

As a user, I want to have a centralized location for all information that is personally related to me (profile picture, children’s sub-profiles, etc.) and also the ability to customize/add/remove from it, so that I can have an experience that feels conducive to myself and my children’s needs.

**Acceptance Criteria:**

1. Changes to my profile picture will be saved
2. Clicking “add a child” will take the user to the “create a child’s profile” screen

### US 01.03.01 - Create and attach a child’s profile to one specific account (only accessible when logged-in)

As a user, I want to create a profile(s) for my child(ren), so that I can store/track relevant information like the: child’s age, weight, height, and medical dosages; I also want to be able to add to/update this information so that I can see a dated and sorted entry log.

**Acceptance Criteria:**

1. Creating a child’s profile should: create an entry in the database and should still exist after reloading the app (with the correct information).
2. Updating a child’s profile should: add a new entry in the database; properly displaying the new information in addition to the old info on the child’s profile page after reloading.

### US 01.03.02 - Display summary statistics for each individual child and their entry logs (height, weight and dosage)

As a user, I want to see my child(ren)’s starting entry, current entry and net change as summary statistics (for each individual category/log), so I can have key information without wasting any needless effort.

**Acceptance Criteria:**

1. “Starting” statistics should be the exact same as the first entry within the entry log.
2. “Current” statistics should be the newest entry in the entry log.
3. “Net change” statistics should be the difference between the “starting” and “current” statistics. 

### US 01.03.03 - Graphically see changes/trends within a certain child’s entry log

As a user, I want to see my child(ren)’s historical data plotted on a graph, so I can see trends/transformations over time in a quick and simple graphical medium.

**Acceptance Criteria:**

1. For every entry within the entry log, there should be an appropriate and accurate plot on the graph.
2. The scale of the graph should be appropriate and automatically modified according to the size of the numbers in the entry log (allowing for a graph without needless blank space).

### US 02.01.01 - Splash Screen(s)

As a user, I want to see a splash screen when I launch the app so that I immediately know what app I am opening and also the organizations/companies behind the app I am using.

**Acceptance Criteria:**

1. Launching the app immediately shows the splash screen(s).
2. The app functions as expected afterwards.

### US 02.02.01 -  App introduction/Onboarding? (first time launching the app only)

As a user, I want to be able to see a brief overview of the app's functionalities and offerings (through simple infographics) so that I can quickly decide if this app is appropriate/suitable for my usage.

**Acceptance Criteria:**

1. Launching the app for the first time shows the app introduction slides.
2. The app will show the user disclaimer afterwards.

### US 02.03.01 - User disclaimer (first time launching the app only)

As a user, I want to see a disclaimer form the first time I use the app so I know the risks and the implications of using this app; I also want to be able to accept or decline the disclaimer form so that my consent dictates whether I can use the app or not.

**Acceptance Criteria:**

1. Accepting the disclaimer form directs you to the language selection screen.
2. Declining the disclaimer form sends you back to the beginning of  app introduction slides.

### US 02.04.01 - Language selection (first time launching the app only)

As a user, I want to be able to select my choice of language (between English and French) the first time I use the app so I am able to use the app in my preferred official language.

**Acceptance Criteria:**

1. Selecting English as my choice of language will display all subsequent app functions in English.
2. Selecting French as my choice of language will display all subsequent app functions in French.

### US 02.05.01 - User Home Screen

As a user, I want to have an intuitive home screen so that I have simple and quick paths of navigation to the major functions/sections of the app.

**Acceptance Criteria:**

1. Clicking each option/shortcut will take me to the corresponding  section of the app.
2. Clicking the back arrow from the subsequent pages will bring me back to the home screen.

### US 03.01.01 - Navigation menu (bottom right hamburger menu)

As a user, I want to have a navigation menu so that I can navigate to different functions more easily.

**Acceptance Criteria:**

1. Clicking each possible menu item will take me to the corresponding app page.

### US 03.01.02 - Call 811 and 911 button (located in navigation menu)

As a user, I want to let the app take me to my phone’s dialpad and pre-enter either 811 or 911 into it, so that I can have an easy way to access further health information (HealthLink in Alberta) or emergency help if deemed necessary.

**Acceptance Criteria:**

1. Clicking the 811 button will take me to my phone’s dialpad with 811 pre-entered into it.
2. Clicking the 911 button will take me to my phone’s dialpad with 911 pre-entered into it.

### US 03.02.01 - Shortcut hotbar (bottom of app)

As a user, I want to have a persistent set of shortcuts so that I can intuitively access the most important parts of the app without wasting needless time.

**Acceptance Criteria:**

1. Clicking each option/shortcut will take me to the corresponding section of the app.
2. The shortcut hotbar is on the bottom of the app within all pages/functions of our app.

### US 04.01.01 - App settings menu

As a user, I want to be able to customize and change the degree of accessibility (login, signup, and logout) and the visual functionality (language, text size, night mode) of the app on my own device so that I can view/use the app in the way that is most convenient and comfortable for me.

**Acceptance Criteria:**

1. Using/changing each setting and their options, will bring out the desired outcome while maintaining proper app functionality.

### US 04.01.02 - Night Mode

As a user, I want to be able to enable/disable “night mode” for the app so that I can have a color theme that is less harsh on the eyes.

**Acceptance Criteria:**

1. Toggling night mode on will change every page on the app to a darker color theme.
2. Toggling night mode off will change every page on the app back to a lighter color theme. 
   
### US 04.01.03 - Text Size

As a user, I want to be able to customize the font size of the app so that I can have an easier time discerning text if I’m visually impaired.

**Acceptance Criteria:**

1. Choosing between each of the three levels of text will accordingly adjust the font size of the text used in the app.

### US 04.01.04 - Language and account settings

As an admin, I want users to have the ability to customize their language and modify their account settings (signup, login, logout) even after initial setup, so that users never feel bound by their choices during initial setup.

**Acceptance Criteria:**

1. Choosing between French and English will make all text in the app the corresponding language.
2. Logging out will remove all personal information associated with the account off of the app.
3. Logging in will fill the app with your personal information and saved details.
4. Signing up will properly create an account in the backend in which users can continually reuse.

### US 05.01.01 - Tools and resources menu

As a user, I want to be able to have access to a catalogue of common, but informative and medically-sound media, so that I can confidently find, learn and (potentially) apply information appropriate to my medical situation.

**Acceptance Criteria:**

1. Nature and scope of this functionality of the app is too dynamic and large--no real simple acceptance criteria (too many file types, different file types at the same time, etc.)

### US 05.01.02 - Adding/removing from tools and resources

As an admin, I want to be able to dynamically add/edit/remove media from the catalogue, so that we can keep the informative content on our app relevant and purposeful.

**Acceptance Criteria:**

1. Nature and scope of this functionality of the app is too dynamic and large--no real simple acceptance criteria (too many file types, different file types at the same time, etc.)

### US 06.01.01 - ARCHE-ECHO info page (About us page)

As an admin, I want users to see an info page (that admins can edit) regarding ARCHE | ECHO, so that users can easily access basic information about the application and owners.

**Acceptance Criteria:**

1. Clicking “ARCHE | ECHO” will bring up a page with some simple “about us” information.
2. Editing in admin mode will correctly store edits in the backend and a reload will correctly display the edits.

### US 06.02.01 - Contact us (at ARCHE-ECHO) function

As an admin, I want users to be able to easily find our organization’s contact information, so that they can provide feedback and report issues.

**Acceptance Criteria:**

1. Clicking “Contact Us” will lead to a simple page with labelled contact information.

### US 07.01.01 - Find a Clinic (Interactive Maps)

As a user, I want to be able to access a map with the closest clinics around me and relevant information such as its distance, rating, hours of operation, address and phone number, so that I can decide which hospital is the most convenient and appropriate for my needs.

**Acceptance Criteria:**

1. Clicking the “Find a Clinic” tab will bring me to the interactive map in which I will see pins on the map (that I can select) and also a list of nearby clinics. 

### US 07.01.02 - Sorting/Filtering/Saving of the Clinics

As a user, I want to be able to sort, filter and save clinics, so that my preferences (for which/what clinics) will be remembered and my situational needs can be more accurately addressed.

**Acceptance Criteria:**

1. Selecting “Sort by proximity” will sort the hospitals by distance.
2. Selecting “sort by rating” will sort the clinics by rating.
3. Filtering for a type of clinic will bring up only those types of clinics.
4. Selecting “save location” will keep this clinic at the top of your clinic list.

### US 08.01.01 - Symptom checker with select region of body function (Select symptom, related factors and show list of cause)

As a user, I want to be able to select a body part on the interactive animation and then be able to select multiple symptoms, so that I can get an accurate list of causes and potential ailments.

**Acceptance Criteria:**

1. Selecting a body part and choosing symptoms will bring me to the relevant causes/ailments.

## MoSCoW

### Must Have

- US.01.01.01 - Login and create account
- US 01.02.01 - User profile screen
- US 01.03.01 - Create and attach child account
- US 02.03.01 - User disclaimer
- US 02.04.01 - Language selection
- US 02.05.01 - User Home Screen
- US 03.01.01 - Navigation menu
- US 03.02.01 - Shortcut hotbar
- US 05.01.01 - Tools and resources menu
- US 05.01.02 - Adding/removing from tools and resources
- US 07.01.01 - Find a Clinic (Interactive Maps)
- US 07.01.02 - Sorting/Filtering/Saving of the Clinics
- US 08.01.01 - Symptom checker with select region of body function

### Should Have

- US 02.01.01 - Splash Screen
- US 03.01.02 - Call 811 and 911 button
- US 04.01.01 - App settings menu
- US 04.01.02 - Night Mode
- US 04.01.03 - Text Size
- US 04.01.04 - Language and account settings
- US 06.01.01 - ARCHE-ECHO info page
- US 06.02.01 - Contact us (at ARCHE-ECHO) function


### Could Have

- US 02.02.01 - App introduction/Onboarding
- US 01.03.02 - Display summary statistics for each individual child and their entry logs
- US 01.03.03 - Graphically see changes/trends within a certain child’s entry log

### Would Like But Won't Get

- App usage data
- Exchange Bluetooth token with another phone

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


