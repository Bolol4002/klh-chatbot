'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Download, ArrowLeft, Moon, Sun, X, MessageCircle } from 'lucide-react';

type Msg = { role: 'user' | 'bot'; content: string };

type CourseItem = {
  key: string;
  name: { en: string; te: string; hi: string };
  description: { en: string; te: string; hi: string };
  brochureUrl: string;
};

type CourseSubcategory = {
  key: string;
  label: { en: string; te: string; hi: string };
  courses: CourseItem[];
};

const COURSE_DATA: CourseSubcategory[] = [
  {
    key: 'ug-courses',
    label: { en: 'UG Courses', te: 'UG కోర్సులు', hi: 'UG कोर्स' },
    courses: [
      {
        key: 'btech-ece',
        name: { en: 'B.Tech in ECE', te: 'B.Tech ECE', hi: 'B.Tech ECE' },
        description: {
          en: 'Bachelor of Technology in Electronics and Communication Engineering (ECE) is a 4-year undergraduate program focusing on electronic devices, circuits, communication systems, signal processing, and embedded systems. Students gain hands-on experience with modern labs and industry-relevant projects.',
          te: 'ఎలక్ట్రానిక్స్ అండ్ కమ్యూనికేషన్ ఇంజినీరింగ్ (ECE) లో బ్యాచిలర్ ఆఫ్ టెక్నాలజీ అనేది ఎలక్ట్రానిక్ పరికరాలు, సర్క్యూట్లు, కమ్యూనికేషన్ సిస్టమ్స్, సిగ్నల్ ప్రాసెసింగ్ మరియు ఎంబెడెడ్ సిస్టమ్స్‌పై దృష్టి సారించే 4 సంవత్సరాల అండర్‌గ్రాడ్యుయేట్ ప్రోగ్రామ్.',
          hi: 'इलेक्ट्रॉनिक्स एंड कम्युनिकेशन इंजीनियरिंग (ECE) में बैचलर ऑफ टेक्नोलॉजी एक 4 वर्षीय स्नातक कार्यक्रम है जो इलेक्ट्रॉनिक उपकरणों, सर्किट, संचार प्रणालियों, सिग्नल प्रोसेसिंग और एम्बेडेड सिस्टम पर केंद्रित है।',
        },
        brochureUrl: '/brochures/btech-ece.pdf',
      },
      {
        key: 'btech-cse',
        name: { en: 'B.Tech in CSE', te: 'B.Tech CSE', hi: 'B.Tech CSE' },
        description: {
          en: 'Bachelor of Technology in Computer Science and Engineering (CSE) is a 4-year undergraduate program covering programming, algorithms, data structures, databases, software engineering, and emerging technologies like AI and cloud computing.',
          te: 'కంప్యూటర్ సైన్స్ అండ్ ఇంజినీరింగ్ (CSE) లో బ్యాచిలర్ ఆఫ్ టెక్నాలజీ అనేది ప్రోగ్రామింగ్, అల్గారిథమ్స్, డేటా స్ట్రక్చర్స్, డేటాబేస్‌లు, సాఫ్ట్‌వేర్ ఇంజినీరింగ్ మరియు AI, క్లౌడ్ కంప్యూటింగ్ వంటి ఆధునిక టెక్నాలజీలను కవర్ చేసే 4 సంవత్సరాల ప్రోగ్రామ్.',
          hi: 'कंप्यूटर साइंस एंड इंजीनियरिंग (CSE) में बैचलर ऑफ टेक्नोलॉजी एक 4 वर्षीय कार्यक्रम है जो प्रोग्रामिंग, एल्गोरिदम, डेटा स्ट्रक्चर, डेटाबेस, सॉफ्टवेयर इंजीनियरिंग और AI जैसी उभरती तकनीकों को कवर करता है।',
        },
        brochureUrl: '/brochures/btech-cse.pdf',
      },
      {
        key: 'btech-aids',
        name: { en: 'B.Tech in AI & DS', te: 'B.Tech AI & DS', hi: 'B.Tech AI & DS' },
        description: {
          en: 'Bachelor of Technology in Artificial Intelligence and Data Science (AI & DS) is a 4-year program designed for students interested in machine learning, deep learning, big data analytics, and intelligent systems. Includes hands-on projects with real-world datasets.',
          te: 'ఆర్టిఫిషియల్ ఇంటెలిజెన్స్ అండ్ డేటా సైన్స్ (AI & DS) లో బ్యాచిలర్ ఆఫ్ టెక్నాలజీ అనేది మెషిన్ లెర్నింగ్, డీప్ లెర్నింగ్, బిగ్ డేటా అనలిటిక్స్ మరియు ఇంటెలిజెంట్ సిస్టమ్స్‌పై ఆసక్తి ఉన్న విద్యార్థుల కోసం రూపొందించబడిన 4 సంవత్సరాల ప్రోగ్రామ్.',
          hi: 'आर्टिफिशियल इंटेलिजेंस एंड डेटा साइंस (AI & DS) में बैचलर ऑफ टेक्नोलॉजी मशीन लर्निंग, डीप लर्निंग, बिग डेटा एनालिटिक्स और इंटेलिजेंट सिस्टम में रुचि रखने वाले छात्रों के लिए 4 वर्षीय कार्यक्रम है।',
        },
        brochureUrl: '/brochures/btech-aids.pdf',
      },
    ],
  },
  {
    key: 'certifications',
    label: { en: 'Certifications', te: 'సర్టిఫికేషన్లు', hi: 'सर्टिफिकेशन' },
    courses: [
      {
        key: 'aws',
        name: { en: 'AWS Certification', te: 'AWS సర్టిఫికేషన్', hi: 'AWS सर्टिफिकेशन' },
        description: {
          en: 'Amazon Web Services (AWS) certification program covers cloud computing fundamentals, AWS core services, architecture best practices, security, and deployment. Prepares students for AWS Cloud Practitioner and Solutions Architect certifications.',
          te: 'అమెజాన్ వెబ్ సర్వీసెస్ (AWS) సర్టిఫికేషన్ ప్రోగ్రామ్ క్లౌడ్ కంప్యూటింగ్ ఫండమెంటల్స్, AWS కోర్ సర్వీసులు, ఆర్కిటెక్చర్ బెస్ట్ ప్రాక్టీసెస్, సెక్యూరిటీ మరియు డిప్లాయ్‌మెంట్‌ను కవర్ చేస్తుంది.',
          hi: 'अमेज़न वेब सर्विसेज (AWS) सर्टिफिकेशन प्रोग्राम क्लाउड कंप्यूटिंग फंडामेंटल्स, AWS कोर सर्विसेज, आर्किटेक्चर बेस्ट प्रैक्टिसेज, सिक्योरिटी और डिप्लॉयमेंट को कवर करता है।',
        },
        brochureUrl: '/brochures/aws-certification.pdf',
      },
      {
        key: 'redhat',
        name: { en: 'Red Hat Certification', te: 'Red Hat సర్టిఫికేషన్', hi: 'Red Hat सर्टिफिकेशन' },
        description: {
          en: 'Red Hat certification program provides training in Linux system administration, enterprise solutions, containerization with OpenShift, and DevOps practices. Prepares students for RHCSA and RHCE certifications.',
          te: 'Red Hat సర్టిఫికేషన్ ప్రోగ్రామ్ Linux సిస్టమ్ అడ్మినిస్ట్రేషన్, ఎంటర్‌ప్రైజ్ సొల్యూషన్స్, OpenShift తో కంటైనరైజేషన్ మరియు DevOps ప్రాక్టీసెస్‌లో శిక్షణ అందిస్తుంది.',
          hi: 'Red Hat सर्टिफिकेशन प्रोग्राम Linux सिस्टम एडमिनिस्ट्रेशन, एंटरप्राइज सॉल्यूशंस, OpenShift के साथ कंटेनराइजेशन और DevOps प्रैक्टिसेज में प्रशिक्षण प्रदान करता है।',
        },
        brochureUrl: '/brochures/redhat-certification.pdf',
      },
      {
        key: 'mongodb',
        name: { en: 'MongoDB Certification', te: 'MongoDB సర్టిఫికేషన్', hi: 'MongoDB सर्टिफिकेशन' },
        description: {
          en: 'MongoDB certification program covers NoSQL database concepts, document-oriented data modeling, CRUD operations, aggregation framework, indexing, and MongoDB Atlas cloud deployment.',
          te: 'MongoDB సర్టిఫికేషన్ ప్రోగ్రామ్ NoSQL డేటాబేస్ కాన్సెప్ట్‌లు, డాక్యుమెంట్-ఓరియెంటెడ్ డేటా మోడలింగ్, CRUD ఆపరేషన్లు, అగ్రిగేషన్ ఫ్రేమ్‌వర్క్, ఇండెక్సింగ్ మరియు MongoDB Atlas క్లౌడ్ డిప్లాయ్‌మెంట్‌ను కవర్ చేస్తుంది.',
          hi: 'MongoDB सर्टिफिकेशन प्रोग्राम NoSQL डेटाबेस कॉन्सेप्ट्स, डॉक्यूमेंट-ओरिएंटेड डेटा मॉडलिंग, CRUD ऑपरेशंस, एग्रीगेशन फ्रेमवर्क, इंडेक्सिंग और MongoDB Atlas क्लाउड डिप्लॉयमेंट को कवर करता है।',
        },
        brochureUrl: '/brochures/mongodb-certification.pdf',
      },
      {
        key: 'tessolve-vlsi',
        name: { en: 'Tessolve - VLSI', te: 'Tessolve - VLSI', hi: 'Tessolve - VLSI' },
        description: {
          en: 'Tessolve VLSI certification program covers semiconductor design, RTL coding, verification methodologies, ASIC/FPGA design flow, timing analysis, and physical design concepts. Industry-partnered program with hands-on project experience.',
          te: 'Tessolve VLSI సర్టిఫికేషన్ ప్రోగ్రామ్ సెమీకండక్టర్ డిజైన్, RTL కోడింగ్, వెరిఫికేషన్ మెథడాలజీలు, ASIC/FPGA డిజైన్ ఫ్లో, టైమింగ్ అనాలిసిస్ మరియు ఫిజికల్ డిజైన్ కాన్సెప్ట్‌లను కవర్ చేస్తుంది.',
          hi: 'Tessolve VLSI सर्टिफिकेशन प्रोग्राम सेमीकंडक्टर डिजाइन, RTL कोडिंग, वेरिफिकेशन मेथडोलॉजीज, ASIC/FPGA डिजाइन फ्लो, टाइमिंग एनालिसिस और फिजिकल डिजाइन कॉन्सेप्ट्स को कवर करता है।',
        },
        brochureUrl: '/brochures/tessolve-vlsi.pdf',
      },
      {
        key: 'tessolve-embedded',
        name: { en: 'Tessolve - Embedded Systems', te: 'Tessolve - ఎంబెడెడ్ సిస్టమ్స్', hi: 'Tessolve - एम्बेडेड सिस्टम' },
        description: {
          en: 'Tessolve Embedded Systems certification covers microcontroller programming, RTOS concepts, peripheral interfacing, firmware development, and IoT applications. Includes real-time project work with industry-standard development boards.',
          te: 'Tessolve ఎంబెడెడ్ సిస్టమ్స్ సర్టిఫికేషన్ మైక్రోకంట్రోలర్ ప్రోగ్రామింగ్, RTOS కాన్సెప్ట్‌లు, పెరిఫెరల్ ఇంటర్‌ఫేసింగ్, ఫర్మ్‌వేర్ డెవలప్‌మెంట్ మరియు IoT అప్లికేషన్‌లను కవర్ చేస్తుంది.',
          hi: 'Tessolve एम्बेडेड सिस्टम सर्टिफिकेशन माइक्रोकंट्रोलर प्रोग्रामिंग, RTOS कॉन्सेप्ट्स, पेरिफेरल इंटरफेसिंग, फर्मवेयर डेवलपमेंट और IoT एप्लिकेशंस को कवर करता है।',
        },
        brochureUrl: '/brochures/tessolve-embedded.pdf',
      },
      {
        key: 'rpa',
        name: { en: 'RPA Certification', te: 'RPA సర్టిఫికేషన్', hi: 'RPA सर्टिफिकेशन' },
        description: {
          en: 'Robotic Process Automation (RPA) certification covers process automation fundamentals, bot development using UiPath/Automation Anywhere, workflow design, exception handling, and enterprise automation strategies.',
          te: 'రోబోటిక్ ప్రాసెస్ ఆటోమేషన్ (RPA) సర్టిఫికేషన్ ప్రాసెస్ ఆటోమేషన్ ఫండమెంటల్స్, UiPath/Automation Anywhere ఉపయోగించి బాట్ డెవలప్‌మెంట్, వర్క్‌ఫ్లో డిజైన్, ఎక్సెప్షన్ హ్యాండ్లింగ్ మరియు ఎంటర్‌ప్రైజ్ ఆటోమేషన్ స్ట్రాటజీలను కవర్ చేస్తుంది.',
          hi: 'रोबोटिक प्रोसेस ऑटोमेशन (RPA) सर्टिफिकेशन प्रोसेस ऑटोमेशन फंडामेंटल्स, UiPath/Automation Anywhere का उपयोग करके बॉट डेवलपमेंट, वर्कफ्लो डिजाइन, एक्सेप्शन हैंडलिंग और एंटरप्राइज ऑटोमेशन स्ट्रैटेजीज को कवर करता है।',
        },
        brochureUrl: '/brochures/rpa-certification.pdf',
      },
    ],
  },
];

const FAQ_CATEGORIES = [
  {
    key: 'admissions',
    labels: {
      en: 'Admissions',
      te: 'అడ్మిషన్స్',
      hi: 'प्रवेश',
    },
    questions: [
      {
        key: 'how-admissions',
        en: 'How are admissions done at KLH?',
        te: 'KLH లో అడ్మిషన్స్ ఎలా జరుగుతాయి?',
        hi: 'KLH में एडमिशन कैसे होते हैं?',
      },
      {
        key: 'which-exams',
        en: 'What entrance exams are accepted?',
        te: 'ఏ ఎంట్రెన్స్ ఎగ్జామ్స్‌ను అంగీకరిస్తారు?',
        hi: 'कौन-कौन से प्रवेश परीक्षा स्वीकार की जाती हैं?',
      },
      {
        key: 'btech-eligibility',
        en: 'What is the eligibility for B.Tech?',
        te: 'B.Tech కోసం అర్హత ఏమిటి?',
        hi: 'B.Tech के लिए पात्रता क्या है?',
      },
      {
        key: 'lateral-entry',
        en: 'What is the admission process for lateral entry?',
        te: 'లాటరల్ ఎంట్రీ అడ్మిషన్ ప్రక్రియ ఏమిటి?',
        hi: 'लेटरल एंट्री के लिए एडमिशन प्रक्रिया क्या है?',
      },
    ],
  },
  {
    key: 'browse-courses',
    labels: {
      en: 'Browse Courses',
      te: 'కోర్సులు చూడండి',
      hi: 'कोर्स देखें',
    },
    isBrowseCourses: true,
    questions: [],
  },
  {
    key: 'fees',
    labels: {
      en: 'Fees & Scholarships',
      te: 'ఫీజులు & స్కాలర్‌షిప్స్',
      hi: 'फीस और छात्रवृत्ति',
    },
    questions: [
      {
        key: 'fee-structure',
        en: 'How can I know the fee structure?',
        te: 'ఫీజు స్ట్రక్చర్‌ను ఎలా తెలుసుకోవచ్చు?',
        hi: 'मैं फीस संरचना कैसे जान सकता/सकती हूँ?',
      },
      {
        key: 'scholarships',
        en: 'Are there any scholarships or fee waivers?',
        te: 'ఏమైనా స్కాలర్‌షిప్స్ లేదా ఫీ వేవర్స్ ఉన్నాయా?',
        hi: 'क्या कोई छात्रवृत्ति या फीस में छूट है?',
      },
      {
        key: 'hostel-fee',
        en: 'Is hostel fee separate from tuition fee?',
        te: 'హాస్టల్ ఫీజు ట్యూషన్ ఫీజు నుండి వేరుగా ఉందా?',
        hi: 'क्या हॉस्टल फीस ट्यूशन फीस से अलग है?',
      },
      {
        key: 'nri-mgmt',
        en: 'Are fees different for NRI or management quota?',
        te: 'NRI లేదా మేనేజ్‌మెంట్ కోటా కోసం ఫీజులు వేరుగా ఉంటాయా?',
        hi: 'क्या NRI या मैनेजमेंट कोटा के लिए फीस अलग होती है?',
      },
    ],
  },
  {
    key: 'hostel-transport',
    labels: {
      en: 'Hostel & Transport',
      te: 'హాస్టల్ & ట్రాన్స్‌పోర్ట్',
      hi: 'हॉस्टल और ट्रांसपोर्ट',
    },
    questions: [
      {
        key: 'hostel-available',
        en: 'Is hostel facility available at KLH Hyderabad?',
        te: 'KLH హైదరాబాద్‌లో హాస్టల్ సౌకర్యం ఉందా?',
        hi: 'क्या KLH हैदराबाद में हॉस्टल सुविधा उपलब्ध है?',
      },
      {
        key: 'hostel-rules',
        en: 'What are the hostel facilities and rules?',
        te: 'హాస్టల్ సౌకర్యాలు మరియు రూల్స్ ఏమిటి?',
        hi: 'हॉस्टल की सुविधाएँ और नियम क्या हैं?',
      },
      {
        key: 'bus-facility',
        en: 'Is college transport/bus facility available?',
        te: 'కళాశాల బస్/ట్రాన్స్‌పోర్ట్ సౌకర్యం ఉందా?',
        hi: 'क्या कॉलेज ट्रांसपोर्ट/बस सुविधा उपलब्ध है?',
      },
      {
        key: 'distance-city',
        en: 'How far is the campus from main city areas?',
        te: 'క్యాంపస్ ప్రధాన సిటీ ప్రాంతాల నుండి ఎంత దూరంలో ఉంది?',
        hi: 'कैंपस मुख्य शहर क्षेत्रों से कितनी दूर है?',
      },
    ],
  },
  {
    key: 'placements',
    labels: {
      en: 'Placements & Internships',
      te: 'ప్లేస్‌మెంట్స్ & ఇంటర్న్‌షిప్స్',
      hi: 'प्लेसमेंट और इंटर्नशिप',
    },
    questions: [
      {
        key: 'how-placements',
        en: 'How are the placements at KLH?',
        te: 'KLH లో ప్లేస్‌మెంట్స్ ఎలా ఉన్నాయి?',
        hi: 'KLH में प्लेसमेंट कैसे हैं?',
      },
      {
        key: 'companies-visit',
        en: 'Which companies visit KLH for placements?',
        te: 'ప్లేస్‌మెంట్స్ కోసం KLH కి ఏ కంపెనీలు వస్తాయి?',
        hi: 'प्लेसमेंट के लिए KLH में कौन-कौन सी कंपनियाँ आती हैं?',
      },
      {
        key: 'internships-support',
        en: 'Are internships supported by the college?',
        te: 'కాలేజ్ ఇంటర్న్‌షిప్స్‌కి సపోర్ట్ చేస్తుందా?',
        hi: 'क्या कॉलेज इंटर्नशिप में सहायता करता है?',
      },
      {
        key: 'avg-highest-package',
        en: 'What is the average and highest package?',
        te: 'యావరేజ్ మరియు హయ్యెస్ట్ ప్యాకేజ్ ఎంత?',
        hi: 'औसत और सबसे अधिक पैकेज कितना है?',
      },
    ],
  },
  {
    key: 'campus-life',
    labels: {
      en: 'Campus Life',
      te: 'క్యాంపస్ లైఫ్',
      hi: 'कैंपस लाइफ',
    },
    questions: [
      {
        key: 'clubs-activities',
        en: 'What clubs and activities are available?',
        te: 'ఏ క్లబ్బులు మరియు కార్యక్రమాలు ఉన్నాయి?',
        hi: 'कौन-कौन से क्लब और गतिविधियाँ उपलब्ध हैं?',
      },
      {
        key: 'fests',
        en: 'Are there technical and cultural fests?',
        te: 'టెక్నికల్ మరియు కల్చరల్ ఫెస్టులు ఉన్నాయా?',
        hi: 'क्या टेक्निकल और कल्चरल फेस्ट होते हैं?',
      },
      {
        key: 'labs-library',
        en: 'What are the lab and library facilities?',
        te: 'లాబ్ మరియు లైబ్రరీ సౌకర్యాలు ఏమిటి?',
        hi: 'लैब और लाइब्रेरी की सुविधाएँ क्या हैं?',
      },
      {
        key: 'daily-schedule',
        en: 'What is the daily college schedule like?',
        te: 'కాలేజ్ రోజువారీ షెడ్యూల్ ఎలా ఉంటుంది?',
        hi: 'कॉलेज का दैनिक शेड्यूल कैसा होता है?',
      },
    ],
  },
];



export default function Home() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [language, setLanguage] = useState<'en' | 'te' | 'hi'>('en');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessageWithText = async (text: string) => {
    const userMsg: Msg = { role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: text, language }),
      });

      const data = await res.json();
      setMessages(prev => [...prev, { role: 'bot', content: data.answer }]);
    } catch {
      setMessages(prev => [
        ...prev,
        { role: 'bot', content: 'Error talking to server. Try again.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    const text = input;
    setInput('');
    await sendMessageWithText(text);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(o => !o)}
        className={`fixed bottom-4 right-4 w-14 h-14 rounded-full bg-gradient-to-br from-red-600 to-red-700 text-white flex items-center justify-center shadow-xl z-50 hover:scale-105 transition-all ${isOpen ? 'rotate-0' : 'rotate-0'}`}
      >
        {isOpen ? <X size={22} /> : <MessageCircle size={22} />}
      </button>

      {/* Chat Widget */}
      {isOpen && (
        <div className={`fixed bottom-20 right-4 w-[420px] max-w-[calc(100vw-2rem)] h-[600px] max-h-[calc(100vh-6rem)] rounded-2xl shadow-2xl flex flex-col border z-40 transition-colors duration-300 overflow-hidden ${
          darkMode 
            ? 'bg-gray-900 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          
          {/* Header */}
          <div className={`px-4 py-3 border-b flex items-center justify-between ${
            darkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-100 bg-gray-50/50'
          }`}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center text-white font-bold shadow-md">
                KL
              </div>
              <div>
                <h1 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  KLH Chatbot
                </h1>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {language === 'en' ? 'Ask me anything' : language === 'te' ? 'ఏమైనా అడగండి' : 'कुछ भी पूछें'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setDarkMode(d => !d)}
              className={`p-2 rounded-lg transition-colors ${
                darkMode 
                  ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

          {/* Language Selector */}
          <div className={`px-4 py-2 border-b flex items-center gap-2 ${
            darkMode ? 'border-gray-700 bg-gray-800/30' : 'border-gray-100 bg-gray-50/30'
          }`}>
            {[
              { code: 'en' as const, label: 'English' },
              { code: 'te' as const, label: 'తెలుగు' },
              { code: 'hi' as const, label: 'हिन्दी' }
            ].map(lang => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`flex-1 px-3 py-1.5 text-xs rounded-lg transition-all ${
                  language === lang.code
                    ? 'bg-red-600 text-white font-medium'
                    : darkMode 
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>

          {/* Chat Content Area */}
          <div className={`flex-1 overflow-y-auto p-4 space-y-3 ${
            darkMode ? 'bg-gray-900' : 'bg-white'
          }`}>
            {/* Messages */}
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-red-600 text-white rounded-br-sm'
                      : darkMode 
                        ? 'bg-gray-800 text-gray-100 rounded-bl-sm border border-gray-700'
                        : 'bg-gray-100 text-gray-800 rounded-bl-sm'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            
            {/* Loading indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className={`px-4 py-3 rounded-2xl rounded-bl-sm ${
                  darkMode ? 'bg-gray-800' : 'bg-gray-100'
                }`}>
                  <div className="flex gap-1.5">
                    <span className={`w-2 h-2 rounded-full animate-bounce ${darkMode ? 'bg-gray-500' : 'bg-gray-400'}`} style={{ animationDelay: '0ms' }}></span>
                    <span className={`w-2 h-2 rounded-full animate-bounce ${darkMode ? 'bg-gray-500' : 'bg-gray-400'}`} style={{ animationDelay: '150ms' }}></span>
                    <span className={`w-2 h-2 rounded-full animate-bounce ${darkMode ? 'bg-gray-500' : 'bg-gray-400'}`} style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              </div>
            )}

            {/* FAQ Categories */}
            {!selectedCategory && (
              <div className="space-y-3">
                <p className={`text-xs font-semibold uppercase tracking-wide ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                  {language === 'en' ? 'Choose a topic' : language === 'te' ? 'ఒక టాపిక్ ఎంచుకోండి' : 'एक विषय चुनें'}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {FAQ_CATEGORIES.map(cat => (
                    <button
                      key={cat.key}
                      onClick={() => {
                        setSelectedCategory(cat.key);
                        setSelectedSubcategory(null);
                        setSelectedCourse(null);
                      }}
                      className={`p-3 rounded-xl text-left text-sm font-medium transition-all hover:scale-[1.02] ${
                        darkMode 
                          ? 'bg-gray-800 hover:bg-gray-700 text-gray-200 border border-gray-700' 
                          : 'bg-gray-50 hover:bg-red-50 hover:border-red-200 text-gray-700 border border-gray-200'
                      }`}
                    >
                      {cat.labels[language]}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Browse Courses Flow */}
            {selectedCategory === 'browse-courses' && (
              <div className="space-y-3">
                {/* Back & Title */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      if (selectedCourse) {
                        setSelectedCourse(null);
                      } else if (selectedSubcategory) {
                        setSelectedSubcategory(null);
                      } else {
                        setSelectedCategory(null);
                      }
                    }}
                    className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium transition-colors ${
                      darkMode 
                        ? 'bg-gray-800 text-red-400 hover:bg-gray-700' 
                        : 'bg-red-50 text-red-600 hover:bg-red-100'
                    }`}
                  >
                    <ArrowLeft size={14} />
                    {language === 'en' ? 'Back' : language === 'te' ? 'వెనుకకు' : 'वापस'}
                  </button>
                  <span className={`text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {selectedCourse
                      ? (() => {
                          const subcat = COURSE_DATA.find(s => s.key === selectedSubcategory);
                          const course = subcat?.courses.find(c => c.key === selectedCourse);
                          return course?.name[language] || '';
                        })()
                      : selectedSubcategory
                      ? COURSE_DATA.find(s => s.key === selectedSubcategory)?.label[language]
                      : FAQ_CATEGORIES.find(c => c.key === 'browse-courses')?.labels[language]}
                  </span>
                </div>

                {/* Subcategories (UG Courses / Certifications) */}
                {!selectedSubcategory && (
                  <div className="grid grid-cols-1 gap-2">
                    {COURSE_DATA.map(subcat => (
                      <button
                        key={subcat.key}
                        onClick={() => setSelectedSubcategory(subcat.key)}
                        className={`p-4 rounded-xl text-left transition-all hover:scale-[1.01] ${
                          darkMode 
                            ? 'bg-gray-800 hover:bg-gray-700 border border-gray-700' 
                            : 'bg-gray-50 hover:bg-red-50 border border-gray-200 hover:border-red-200'
                        }`}
                      >
                        <div className={`font-semibold text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {subcat.label[language]}
                        </div>
                        <div className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {subcat.courses.length} {language === 'en' ? 'courses' : language === 'te' ? 'కోర్సులు' : 'कोर्स'}
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {/* Courses in selected subcategory */}
                {selectedSubcategory && !selectedCourse && (
                  <div className="grid grid-cols-1 gap-2">
                    {COURSE_DATA.find(s => s.key === selectedSubcategory)?.courses.map(course => (
                      <button
                        key={course.key}
                        onClick={() => setSelectedCourse(course.key)}
                        className={`p-3 rounded-xl text-left transition-all hover:scale-[1.01] ${
                          darkMode 
                            ? 'bg-gray-800 hover:bg-gray-700 border border-gray-700' 
                            : 'bg-gray-50 hover:bg-red-50 border border-gray-200 hover:border-red-200'
                        }`}
                      >
                        <div className={`font-medium text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {course.name[language]}
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {/* Course Details */}
                {selectedCourse && (
                  <div className={`rounded-xl p-4 ${
                    darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-gray-50 border border-gray-200'
                  }`}>
                    {(() => {
                      const subcat = COURSE_DATA.find(s => s.key === selectedSubcategory);
                      const course = subcat?.courses.find(c => c.key === selectedCourse);
                      if (!course) return null;

                      return (
                        <>
                          <div className={`inline-block px-2 py-0.5 rounded text-xs font-medium mb-2 ${
                            darkMode ? 'bg-red-900/50 text-red-300' : 'bg-red-100 text-red-700'
                          }`}>
                            {subcat?.label[language]}
                          </div>
                          <p className={`text-sm leading-relaxed mb-4 ${
                            darkMode ? 'text-gray-300' : 'text-gray-600'
                          }`}>
                            {course.description[language]}
                          </p>
                          <a
                            href={course.brochureUrl}
                            download
                            className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
                          >
                            <Download size={16} />
                            {language === 'en' ? 'Download Brochure' : language === 'te' ? 'బ్రోచర్ డౌన్‌లోడ్' : 'ब्रोशर डाउनलोड'}
                          </a>
                        </>
                      );
                    })()}
                  </div>
                )}
              </div>
            )}

            {/* FAQ Questions for selected category */}
            {selectedCategory && selectedCategory !== 'browse-courses' && (
              <div className="space-y-3">
                {/* Back & Title */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium transition-colors ${
                        darkMode 
                          ? 'bg-gray-800 text-red-400 hover:bg-gray-700' 
                          : 'bg-red-50 text-red-600 hover:bg-red-100'
                      }`}
                    >
                      <ArrowLeft size={14} />
                      {language === 'en' ? 'Back' : language === 'te' ? 'వెనుకకు' : 'वापस'}
                    </button>
                    <span className={`text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {FAQ_CATEGORIES.find(c => c.key === selectedCategory)?.labels[language]}
                    </span>
                  </div>
                </div>

                {/* Questions Grid */}
                <div className="grid grid-cols-1 gap-2">
                  {FAQ_CATEGORIES.find(c => c.key === selectedCategory)?.questions.map(q => (
                    <button
                      key={q.key}
                      onClick={() => sendMessageWithText(q.en)}
                      className={`p-3 rounded-xl text-left text-sm transition-all hover:scale-[1.01] ${
                        darkMode 
                          ? 'bg-gray-800 hover:bg-gray-700 text-gray-200 border border-gray-700' 
                          : 'bg-gray-50 hover:bg-red-50 text-gray-700 border border-gray-200 hover:border-red-200'
                      }`}
                    >
                      {q[language]}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Helper to go back to FAQs */}
            {messages.length > 0 && !selectedCategory && (
              <button
                onClick={() => setSelectedCategory(null)}
                className={`text-xs font-medium underline ${darkMode ? 'text-red-400' : 'text-red-600'}`}
              >
                {language === 'en' ? 'Browse more topics' : language === 'te' ? 'మరిన్ని టాపిక్స్ చూడండి' : 'और विषय देखें'}
              </button>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className={`p-3 border-t ${
            darkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-100 bg-gray-50/50'
          }`}>
            <div className="flex gap-2">
              <input
                className={`flex-1 border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition-all ${
                  darkMode 
                    ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'
                }`}
                placeholder={language === 'en' ? 'Type your question...' : language === 'te' ? 'మీ ప్రశ్న టైప్ చేయండి...' : 'अपना प्रश्न टाइप करें...'}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && !isLoading && sendMessage()}
                disabled={isLoading}
              />
              <button
                onClick={sendMessage}
                disabled={isLoading || !input.trim()}
                className="bg-red-600 text-white px-4 py-2.5 rounded-xl hover:bg-red-700 flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

