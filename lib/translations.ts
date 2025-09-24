"use client"

import { useEffect } from "react"

import { useState } from "react"

export const translations = {
  en: {
    // Navigation
    reportHazard: "Report Hazard",
    dashboard: "Dashboard",
    mediaGallery: "Media Gallery",
    analytics: "Analytics",
    community: "Community",
    admin: "Admin",
    login: "Login",
    getStarted: "Get Started",

    // Home Page
    heroTitle: "Protecting India's Coastal Heritage",
    heroSubtitle:
      "SAMUDRASETU is a comprehensive platform for monitoring and preserving India's coastal ecosystems through community participation and advanced technology.",
    reportHazardBtn: "Report Hazard",
    learnMoreBtn: "Learn More",

    // Features
    featuresTitle: "Key Features",
    realTimeMonitoring: "Real-time Monitoring",
    realTimeDesc:
      "Track coastal changes and environmental hazards in real-time using satellite imagery and IoT sensors.",
    communityReporting: "Community Reporting",
    communityDesc:
      "Enable local communities to report coastal hazards and environmental concerns directly through the platform.",
    dataAnalytics: "Data Analytics",
    dataDesc: "Advanced analytics and visualization tools to understand coastal trends and make informed decisions.",

    // Stats
    hazardsReported: "Hazards Reported",
    communitiesEngaged: "Communities Engaged",
    coastlineMonitored: "Coastline Monitored",

    // Footer
    copyright: "© 2025 SAMUDRASETU. A Government of India Initiative.",

    // Report Page
    reportTitle: "Report Coastal Hazard",
    reportSubtitle: "Help us protect India's coastline by reporting environmental hazards and concerns.",
    hazardType: "Hazard Type",
    selectHazardType: "Select hazard type",
    erosion: "Erosion",
    pollution: "Pollution",
    flooding: "Flooding",
    wildlifeDisturbance: "Wildlife Disturbance",
    other: "Other",
    location: "Location",
    enterLocation: "Enter location or coordinates",
    description: "Description",
    describeHazard: "Describe the hazard in detail",
    severity: "Severity",
    selectSeverity: "Select severity level",
    low: "Low",
    medium: "Medium",
    high: "High",
    critical: "Critical",
    uploadPhotos: "Upload Photos",
    submitReport: "Submit Report",

    // Dashboard
    dashboardTitle: "Coastal Monitoring Dashboard",
    recentReports: "Recent Reports",
    environmentalMetrics: "Environmental Metrics",
    waterQuality: "Water Quality",
    airQuality: "Air Quality",
    biodiversityIndex: "Biodiversity Index",

    // Community
    communityTitle: "Community Hub",
    joinCommunity: "Join the Community",
    discussionForums: "Discussion Forums",
    volunteerPrograms: "Volunteer Programs",

    // Analytics
    analyticsTitle: "Coastal Analytics",
    trendAnalysis: "Trend Analysis",
    hazardDistribution: "Hazard Distribution",

    // Media
    mediaTitle: "Media Gallery",
    photos: "Photos",
    videos: "Videos",
    documents: "Documents",

    // Admin
    adminTitle: "Admin Dashboard",
    userManagement: "User Management",
    reportManagement: "Report Management",
    systemSettings: "System Settings",
  },

  hi: {
    // Navigation
    reportHazard: "खतरे की रिपोर्ट करें",
    dashboard: "डैशबोर्ड",
    mediaGallery: "मीडिया गैलरी",
    analytics: "विश्लेषण",
    community: "समुदाय",
    admin: "प्रशासन",
    login: "लॉगिन",
    getStarted: "शुरू करें",

    // Home Page
    heroTitle: "भारत की तटीय विरासत की सुरक्षा",
    heroSubtitle:
      "समुद्रसेतु सामुदायिक भागीदारी और उन्नत तकनीक के माध्यम से भारत के तटीय पारिस्थितिकी तंत्र की निगरानी और संरक्षण के लिए एक व्यापक मंच है।",
    reportHazardBtn: "खतरे की रिपोर्ट करें",
    learnMoreBtn: "और जानें",

    // Features
    featuresTitle: "मुख्य विशेषताएं",
    realTimeMonitoring: "रियल-टाइम निगरानी",
    realTimeDesc: "उपग्रह इमेजरी और IoT सेंसर का उपयोग करके तटीय परिवर्तन और पर्यावरणीय खतरों को रियल-टाइम में ट्रैक करें।",
    communityReporting: "सामुदायिक रिपोर्टिंग",
    communityDesc: "स्थानीय समुदायों को प्लेटफॉर्म के माध्यम से सीधे तटीय खतरों और पर्यावरणीय चिंताओं की रिपोर्ट करने में सक्षम बनाएं।",
    dataAnalytics: "डेटा विश्लेषण",
    dataDesc: "तटीय रुझानों को समझने और सूचित निर्णय लेने के लिए उन्नत विश्लेषण और विज़ुअलाइज़ेशन उपकरण।",

    // Stats
    hazardsReported: "रिपोर्ट किए गए खतरे",
    communitiesEngaged: "शामिल समुदाय",
    coastlineMonitored: "निगरानी की गई तटरेखा",

    // Footer
    copyright: "© 2025 समुद्रसेतु। भारत सरकार की एक पहल।",

    // Report Page
    reportTitle: "तटीय खतरे की रिपोर्ट करें",
    reportSubtitle: "पर्यावरणीय खतरों और चिंताओं की रिपोर्ट करके भारत की तटरेखा की सुरक्षा में हमारी मदद करें।",
    hazardType: "खतरे का प्रकार",
    selectHazardType: "खतरे का प्रकार चुनें",
    erosion: "कटाव",
    pollution: "प्रदूषण",
    flooding: "बाढ़",
    wildlifeDisturbance: "वन्यजीव व्यवधान",
    other: "अन्य",
    location: "स्थान",
    enterLocation: "स्थान या निर्देशांक दर्ज करें",
    description: "विवरण",
    describeHazard: "खतरे का विस्तार से वर्णन करें",
    severity: "गंभीरता",
    selectSeverity: "गंभीरता का स्तर चुनें",
    low: "कम",
    medium: "मध्यम",
    high: "उच्च",
    critical: "गंभीर",
    uploadPhotos: "फोटो अपलोड करें",
    submitReport: "रिपोर्ट जमा करें",

    // Dashboard
    dashboardTitle: "तटीय निगरानी डैशबोर्ड",
    recentReports: "हाल की रिपोर्टें",
    environmentalMetrics: "पर्यावरणीय मेट्रिक्स",
    waterQuality: "पानी की गुणवत्ता",
    airQuality: "हवा की गुणवत्ता",
    biodiversityIndex: "जैव विविधता सूचकांक",

    // Community
    communityTitle: "समुदायिक केंद्र",
    joinCommunity: "समुदाय में शामिल हों",
    discussionForums: "चर्चा मंच",
    volunteerPrograms: "स्वयंसेवक कार्यक्रम",

    // Analytics
    analyticsTitle: "तटीय विश्लेषण",
    trendAnalysis: "रुझान विश्लेषण",
    hazardDistribution: "खतरे का वितरण",

    // Media
    mediaTitle: "मीडिया गैलरी",
    photos: "फोटो",
    videos: "वीडियो",
    documents: "दस्तावेज़",

    // Admin
    adminTitle: "प्रशासन डैशबोर्ड",
    userManagement: "उपयोगकर्ता प्रबंधन",
    reportManagement: "रिपोर्ट प्रबंधन",
    systemSettings: "सिस्टम सेटिंग्स",
  },

  gu: {
    // Navigation
    reportHazard: "જોખમની જાણ કરો",
    dashboard: "ડેશબોર્ડ",
    mediaGallery: "મીડિયા ગેલેરી",
    analytics: "વિશ્લેષણ",
    community: "સમુદાય",
    admin: "વહીવટ",
    login: "લોગિન",
    getStarted: "શરૂ કરો",

    // Home Page
    heroTitle: "ભારતના દરિયાકાંઠાના વારસાનું રક્ષણ",
    heroSubtitle:
      "સમુદ્રસેતુ સામુદાયિક સહભાગિતા અને અદ્યતન તકનીક દ્વારા ભારતના દરિયાકાંઠાના ઇકોસિસ્ટમની દેખરેખ અને સંરક્ષણ માટેનું એક વ્યાપક પ્લેટફોર્મ છે।",
    reportHazardBtn: "જોખમની જાણ કરો",
    learnMoreBtn: "વધુ જાણો",

    // Features
    featuresTitle: "મુખ્ય લક્ષણો",
    realTimeMonitoring: "રીઅલ-ટાઇમ મોનિટરિંગ",
    realTimeDesc: "સેટેલાઇટ ઇમેજરી અને IoT સેન્સરનો ઉપયોગ કરીને દરિયાકાંઠાના ફેરફારો અને પર્યાવરણીય જોખમોને રીઅલ-ટાઇમમાં ટ્રેક કરો।",
    communityReporting: "સામુદાયિક રિપોર્ટિંગ",
    communityDesc: "સ્થાનિક સમુદાયોને પ્લેટફોર્મ દ્વારા સીધા દરિયાકાંઠાના જોખમો અને પર્યાવરણીય ચિંતાઓની જાણ કરવામાં સક્ષમ બનાવો।",
    dataAnalytics: "ડેટા એનાલિટિક્સ",
    dataDesc: "દરિયાકાંઠાના વલણોને સમજવા અને માહિતીગત નિર્ણયો લેવા માટે અદ્યતન વિશ્લેષણ અને વિઝ્યુઅલાઇઝેશન ટૂલ્સ।",

    // Stats
    hazardsReported: "જાણ કરાયેલા જોખમો",
    communitiesEngaged: "સંલગ્ન સમુદાયો",
    coastlineMonitored: "દેખરેખ હેઠળની દરિયાકાંઠા",

    // Footer
    copyright: "© 2025 સમુદ્રસેતુ। ભારત સરકારની એક પહેલ।",

    // Report Page
    reportTitle: "દરિયાકાંઠાના જોખમની જાણ કરો",
    reportSubtitle: "પર્યાવરણીય જોખમો અને ચિંતાઓની જાણ કરીને ભારતની દરિયાકાંઠાના રક્ષણમાં અમારી મદદ કરો।",
    hazardType: "જોખમનો પ્રકાર",
    selectHazardType: "જોખમનો પ્રકાર પસંદ કરો",
    erosion: "ધોવાણ",
    pollution: "પ્રદૂષણ",
    flooding: "પૂર",
    wildlifeDisturbance: "વન્યજીવ વિક્ષેપ",
    other: "અન્ય",
    location: "સ્થાન",
    enterLocation: "સ્થાન અથવા કોઓર્ડિનેટ્સ દાખલ કરો",
    description: "વર્ણન",
    describeHazard: "જોખમનું વિગતવાર વર્ણન કરો",
    severity: "ગંભીરતા",
    selectSeverity: "ગંભીરતાનું સ્તર પસંદ કરો",
    low: "ઓછું",
    medium: "મધ્યમ",
    high: "ઊંચું",
    critical: "ગંભીર",
    uploadPhotos: "ફોટા અપલોડ કરો",
    submitReport: "રિપોર્ટ સબમિટ કરો",

    // Dashboard
    dashboardTitle: "દરિયાકાંઠાની દેખરેખ ડેશબોર્ડ",
    recentReports: "તાજેતરની રિપોર્ટ્સ",
    environmentalMetrics: "પર્યાવરણીય મેટ્રિક્સ",
    waterQuality: "પાણીની ગુણવત્તા",
    airQuality: "હવાની ગુણવત્તા",
    biodiversityIndex: "જૈવવિવિધતા સૂચકાંક",

    // Community
    communityTitle: "સામુદાયિક કેન્દ્ર",
    joinCommunity: "સમુદાયમાં જોડાઓ",
    discussionForums: "ચર્ચા મંચો",
    volunteerPrograms: "સ્વયંસેવક કાર્યક્રમો",

    // Analytics
    analyticsTitle: "દરિયાકાંઠાના વિશ્લેષણ",
    trendAnalysis: "વલણ વિશ્લેષણ",
    hazardDistribution: "જોખમનું વિતરણ",

    // Media
    mediaTitle: "મીડિયા ગેલેરી",
    photos: "ફોટા",
    videos: "વીડિયો",
    documents: "દસ્તાવેજો",

    // Admin
    adminTitle: "વહીવટી ડેશબોર્ડ",
    userManagement: "વપરાશકર્તા વ્યવસ્થાપન",
    reportManagement: "રિપોર્ટ વ્યવસ્થાપન",
    systemSettings: "સિસ્ટમ સેટિંગ્સ",
  },

  mr: {
    // Navigation
    reportHazard: "धोक्याची तक्रार करा",
    dashboard: "डॅशबोर्ड",
    mediaGallery: "मीडिया गॅलरी",
    analytics: "विश्लेषण",
    community: "समुदाय",
    admin: "प्रशासन",
    login: "लॉगिन",
    getStarted: "सुरुवात करा",

    // Home Page
    heroTitle: "भारताच्या किनारपट्टीच्या वारशाचे संरक्षण",
    heroSubtitle:
      "समुद्रसेतु हे सामुदायिक सहभाग आणि प्रगत तंत्रज्ञानाद्वारे भारताच्या किनारपट्टीच्या पर्यावरणीय प्रणालींचे निरीक्षण आणि संरक्षण करण्यासाठी एक व्यापक व्यासपीठ आहे।",
    reportHazardBtn: "धोक्याची तक्रार करा",
    learnMoreBtn: "अधिक जाणून घ्या",

    // Features
    featuresTitle: "मुख्य वैशिष्ट्ये",
    realTimeMonitoring: "रिअल-टाइम निरीक्षण",
    realTimeDesc: "उपग्रह प्रतिमा आणि IoT सेन्सर वापरून किनारपट्टीचे बदल आणि पर्यावरणीय धोके रिअल-टाइममध्ये ट्रॅक करा।",
    communityReporting: "सामुदायिक अहवाल",
    communityDesc: "स्थानिक समुदायांना व्यासपीठाद्वारे थेट किनारपट्टीचे धोके आणि पर्यावरणीय चिंता नोंदवण्यास सक्षम करा।",
    dataAnalytics: "डेटा विश्लेषण",
    dataDesc: "किनारपट्टीचे ट्रेंड समजून घेण्यासाठी आणि माहितीपूर्ण निर्णय घेण्यासाठी प्रगत विश्लेषण आणि व्हिज्युअलायझेशन साधने।",

    // Stats
    hazardsReported: "नोंदवलेले धोके",
    communitiesEngaged: "सहभागी समुदाय",
    coastlineMonitored: "निरीक्षण केलेली किनारपट्टी",

    // Footer
    copyright: "© 2025 समुद्रसेतु। भारत सरकारचा एक उपक्रम।",

    // Report Page
    reportTitle: "किनारपट्टीच्या धोक्याची तक्रार करा",
    reportSubtitle: "पर्यावरणीय धोके आणि चिंता नोंदवून भारताच्या किनारपट्टीच्या संरक्षणात आमची मदत करा।",
    hazardType: "धोक्याचा प्रकार",
    selectHazardType: "धोक्याचा प्रकार निवडा",
    erosion: "धूप",
    pollution: "प्रदूषण",
    flooding: "पूर",
    wildlifeDisturbance: "वन्यजीव व्यत्यय",
    other: "इतर",
    location: "स्थान",
    enterLocation: "स्थान किंवा निर्देशांक प्रविष्ट करा",
    description: "वर्णन",
    describeHazard: "धोक्याचे तपशीलवार वर्णन करा",
    severity: "तीव्रता",
    selectSeverity: "तीव्रतेची पातळी निवडा",
    low: "कमी",
    medium: "मध्यम",
    high: "उच्च",
    critical: "गंभीर",
    uploadPhotos: "फोटो अपलोड करा",
    submitReport: "अहवाल सबमिट करा",

    // Dashboard
    dashboardTitle: "किनारपट्टी निरीक्षण डॅशबोर्ड",
    recentReports: "अलीकडील अहवाल",
    environmentalMetrics: "पर्यावरणीय मेट्रिक्स",
    waterQuality: "पाण्याची गुणवत्ता",
    airQuality: "हवेची गुणवत्ता",
    biodiversityIndex: "जैवविविधता निर्देशांक",

    // Community
    communityTitle: "सामुदायिक केंद्र",
    joinCommunity: "समुदायात सामील व्हा",
    discussionForums: "चर्चा मंच",
    volunteerPrograms: "स्वयंसेवक कार्यक्रम",

    // Analytics
    analyticsTitle: "किनारपट्टी विश्लेषण",
    trendAnalysis: "ट्रेंड विश्लेषण",
    hazardDistribution: "धोक्याचे वितरण",

    // Media
    mediaTitle: "मीडिया गॅलरी",
    photos: "फोटो",
    videos: "व्हिडिओ",
    documents: "दस्तऐवज",

    // Admin
    adminTitle: "प्रशासन डॅशबोर्ड",
    userManagement: "वापरकर्ता व्यवस्थापन",
    reportManagement: "अहवाल व्यवस्थापन",
    systemSettings: "सिस्टम सेटिंग्स",
  },

  bn: {
    // Navigation
    reportHazard: "বিপদের রিপোর্ট করুন",
    dashboard: "ড্যাশবোর্ড",
    mediaGallery: "মিডিয়া গ্যালারি",
    analytics: "বিশ্লেষণ",
    community: "সম্প্রদায়",
    admin: "প্রশাসন",
    login: "লগইন",
    getStarted: "শুরু করুন",

    // Home Page
    heroTitle: "ভারতের উপকূলীয় ঐতিহ্য রক্ষা করা",
    heroSubtitle:
      "সমুদ্রসেতু সামুদায়িক অংশগ্রহণ এবং উন্নত প্রযুক্তির মাধ্যমে ভারতের উপকূলীয় বাস্তুতন্ত্র পর্যবেক্ষণ এবং সংরক্ষণের জন্য একটি ব্যাপক প্ল্যাটফর্ম।",
    reportHazardBtn: "বিপদের রিপোর্ট করুন",
    learnMoreBtn: "আরও জানুন",

    // Features
    featuresTitle: "মূল বৈশিষ্ট্য",
    realTimeMonitoring: "রিয়েল-টাইম পর্যবেক্ষণ",
    realTimeDesc: "স্যাটেলাইট ইমেজারি এবং IoT সেন্সর ব্যবহার করে উপকূলীয় পরিবর্তন এবং পরিবেশগত বিপদগুলি রিয়েল-টাইমে ট্র্যাক করুন।",
    communityReporting: "সামুদায়িক রিপোর্টিং",
    communityDesc: "স্থানীয় সম্প্রদায়গুলিকে প্ল্যাটফর্মের মাধ্যমে সরাসরি উপকূলীয় বিপদ এবং পরিবেশগত উদ্বেগ রিপোর্ট করতে সক্ষম করুন।",
    dataAnalytics: "ডেটা বিশ্লেষণ",
    dataDesc: "উপকূলীয় প্রবণতা বুঝতে এবং তথ্যপূর্ণ সিদ্ধান্ত নিতে উন্নত বিশ্লেষণ এবং ভিজ্যুয়ালাইজেশন সরঞ্জাম।",

    // Stats
    hazardsReported: "রিপোর্ট করা বিপদ",
    communitiesEngaged: "জড়িত সম্প্রদায়",
    coastlineMonitored: "পর্যবেক্ষিত উপকূলরেখা",

    // Footer
    copyright: "© ২০২৫ সমুদ্রসেতু। ভারত সরকারের একটি উদ্যোগ।",

    // Report Page
    reportTitle: "উপকূলীয় বিপদের রিপোর্ট করুন",
    reportSubtitle: "পরিবেশগত বিপদ এবং উদ্বেগ রিপোর্ট করে ভারতের উপকূলরেখা রক্ষায় আমাদের সাহায্য করুন।",
    hazardType: "বিপদের ধরন",
    selectHazardType: "বিপদের ধরন নির্বাচন করুন",
    erosion: "ক্ষয়",
    pollution: "দূষণ",
    flooding: "বন্যা",
    wildlifeDisturbance: "বন্যপ্রাণী বিঘ্ন",
    other: "অন্যান্য",
    location: "অবস্থান",
    enterLocation: "অবস্থান বা স্থানাঙ্ক প্রবেশ করুন",
    description: "বর্ণনা",
    describeHazard: "বিপদের বিস্তারিত বর্ণনা করুন",
    severity: "তীব্রতা",
    selectSeverity: "তীব্রতার স্তর নির্বাচন করুন",
    low: "কম",
    medium: "মাঝারি",
    high: "উচ্চ",
    critical: "সংকটজনক",
    uploadPhotos: "ছবি আপলোড করুন",
    submitReport: "রিপোর্ট জমা দিন",

    // Dashboard
    dashboardTitle: "উপকূলীয় পর্যবেক্ষণ ড্যাশবোর্ড",
    recentReports: "সাম্প্রতিক রিপোর্ট",
    environmentalMetrics: "পরিবেশগত মেট্রিক্স",
    waterQuality: "পানির গুণমান",
    airQuality: "বাতাসের গুণমান",
    biodiversityIndex: "জীববৈচিত্র্য সূচক",

    // Community
    communityTitle: "সম্প্রদায় কেন্দ্র",
    joinCommunity: "সম্প্রদায়ে যোগ দিন",
    discussionForums: "আলোচনা ফোরাম",
    volunteerPrograms: "স্বেচ্ছাসেবক কর্মসূচি",

    // Analytics
    analyticsTitle: "উপকূলীয় বিশ্লেষণ",
    trendAnalysis: "প্রবণতা বিশ্লেষণ",
    hazardDistribution: "বিপদের বিতরণ",

    // Media
    mediaTitle: "মিডিয়া গ্যালারি",
    photos: "ছবি",
    videos: "ভিডিও",
    documents: "নথি",

    // Admin
    adminTitle: "প্রশাসন ড্যাশবোর্ড",
    userManagement: "ব্যবহারকারী ব্যবস্থাপনা",
    reportManagement: "রিপোর্ট ব্যবস্থাপনা",
    systemSettings: "সিস্টেম সেটিংস",
  },

  ta: {
    // Navigation
    reportHazard: "ஆபத்தை புகாரளிக்கவும்",
    dashboard: "டாஷ்போர்டு",
    mediaGallery: "மீடியா கேலரி",
    analytics: "பகுப்பாய்வு",
    community: "சமூகம்",
    admin: "நிர்வாகம்",
    login: "உள்நுழைவு",
    getStarted: "தொடங்குங்கள்",

    // Home Page
    heroTitle: "இந்தியாவின் கடலோர பாரம்பரியத்தைப் பாதுகாத்தல்",
    heroSubtitle:
      "சமுத்ரசேது சமூக பங்கேற்பு மற்றும் மேம்பட்ட தொழில்நுட்பத்தின் மூலம் இந்தியாவின் கடலோர சுற்றுச்சூழல் அமைப்புகளை கண்காணித்து பாதுகாப்பதற்கான ஒரு விரிவான தளமாகும்।",
    reportHazardBtn: "ஆபத்தை புகாரளிக்கவும்",
    learnMoreBtn: "மேலும் அறிக",

    // Features
    featuresTitle: "முக்கிய அம்சங்கள்",
    realTimeMonitoring: "நிகழ்நேர கண்காணிப்பு",
    realTimeDesc:
      "செயற்கைக்கோள் படங்கள் மற்றும் IoT சென்சார்களைப் பயன்படுத்தி கடலோர மாற்றங்கள் மற்றும் சுற்றுச்சூழல் ஆபத்துகளை நிகழ்நேரத்தில் கண்காணிக்கவும்।",
    communityReporting: "சமூக புகாரளிப்பு",
    communityDesc: "உள்ளூர் சமூகங்கள் தளத்தின் மூலம் நேரடியாக கடலோர ஆபத்துகள் மற்றும் சுற்றுச்சூழல் கவலைகளை புகாரளிக்க உதவுங்கள்।",
    dataAnalytics: "தரவு பகுப்பாய்வு",
    dataDesc: "கடலோர போக்குகளைப் புரிந்துகொள்ளவும் தகவலறிந்த முடிவுகளை எடுக்கவும் மேம்பட்ட பகுப்பாய்வு மற்றும் காட்சிப்படுத்தல் கருவிகள்।",

    // Stats
    hazardsReported: "புகாரளிக்கப்பட்ட ஆபத்துகள்",
    communitiesEngaged: "ஈடுபட்ட சமூகங்கள்",
    coastlineMonitored: "கண்காணிக்கப்பட்ட கடற்கரை",

    // Footer
    copyright: "© 2025 சமுத்ரசேது। இந்திய அரசின் ஒரு முயற்சி।",

    // Report Page
    reportTitle: "கடலோர ஆபத்தை புகாரளிக்கவும்",
    reportSubtitle: "சுற்றுச்சூழல் ஆபத்துகள் மற்றும் கவலைகளை புகாரளிப்பதன் மூலம் இந்தியாவின் கடற்கரையைப் பாதுகாக்க எங்களுக்கு உதவுங்கள்।",
    hazardType: "ஆபத்து வகை",
    selectHazardType: "ஆபத்து வகையைத் தேர்ந்தெடுக்கவும்",
    erosion: "அரிப்பு",
    pollution: "மாசுபாடு",
    flooding: "வெள்ளம்",
    wildlifeDisturbance: "வனவிலங்கு இடையூறு",
    other: "மற்றவை",
    location: "இடம்",
    enterLocation: "இடம் அல்லது ஆயத்தொலைவுகளை உள்ளிடவும்",
    description: "விளக்கம்",
    describeHazard: "ஆபத்தை விரிவாக விவரிக்கவும்",
    severity: "தீவிரம்",
    selectSeverity: "தீவிர நிலையைத் தேர்ந்தெடுக்கவும்",
    low: "குறைவு",
    medium: "நடுத்தர",
    high: "அதிக",
    critical: "முக்கியமான",
    uploadPhotos: "புகைப்படங்களை பதிவேற்றவும்",
    submitReport: "அறிக்கையை சமர்ப்பிக்கவும்",

    // Dashboard
    dashboardTitle: "கடலோர கண்காணிப்பு டாஷ்போர்டு",
    recentReports: "சமீபத்திய அறிக்கைகள்",
    environmentalMetrics: "சுற்றுச்சூழல் அளவீடுகள்",
    waterQuality: "நீரின் தரம்",
    airQuality: "காற்றின் தரம்",
    biodiversityIndex: "பல்லுயிர் குறியீடு",

    // Community
    communityTitle: "சமூக மையம்",
    joinCommunity: "சமூகத்தில் சேரவும்",
    discussionForums: "விவாத மன்றங்கள்",
    volunteerPrograms: "தன்னார்வ திட்டங்கள்",

    // Analytics
    analyticsTitle: "கடலோர பகுப்பாய்வு",
    trendAnalysis: "போக்கு பகுப்பாய்வு",
    hazardDistribution: "ஆபத்து விநியோகம்",

    // Media
    mediaTitle: "மீடியா கேலரி",
    photos: "புகைப்படங்கள்",
    videos: "வீடியோக்கள்",
    documents: "ஆவணங்கள்",

    // Admin
    adminTitle: "நிர்வாக டாஷ்போர்டு",
    userManagement: "பயனர் மேலாண்மை",
    reportManagement: "அறிக்கை மேலாண்மை",
    systemSettings: "கணினி அமைப்புகள்",
  },
}

export function getTranslation(key: string, language = "en"): string {
  const lang = translations[language as keyof typeof translations] || translations.en
  return lang[key as keyof typeof lang] || translations.en[key as keyof typeof translations.en] || key
}

export function useTranslation() {
  const [currentLanguage, setCurrentLanguage] = useState("en")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("selectedLanguage") || "en"
    setCurrentLanguage(savedLanguage)

    // Listen for language changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "selectedLanguage" && e.newValue) {
        setCurrentLanguage(e.newValue)
      }
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  const t = (key: string) => getTranslation(key, currentLanguage)

  return { t, currentLanguage }
}
