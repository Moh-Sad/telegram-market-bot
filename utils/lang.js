const WELCOME_MSG = `✨ Welcome to Jimma Garment ✨

We are a marketplace connecting buyers and sellers in Jimma.

🛍️ Clothes | Shoes | Electronics | and more

We help people showcase their products and find buyers easily.`;

const WELCOME_MSG_AM = `✨ እንኳን ወደ ጅማ ጋርመንት በደህና መጡ ✨

እኛ በጅማ ውስጥ ገዢዎችን እና ሻጮችን የምናገናኝ የገበያ ቦታ ነን።

🛍️ ልብሶች | ጫማዎች | ኤሌክትሮኒክስ | እና ሌሎችም

ሰዎች ምርቶቻቸውን እንዲያሳዩ እና ገዢዎችን በቀላሉ እንዲያገኙ እንረዳለን።`;

const WELCOME_MSG_AR = `✨ مرحباً بكم في جيما جارمنت ✨

نحن سوق يربط بين المشترين والبائعين في جيما.

🛍️ ملابس | أحذية | إلكترونيات | والمزيد

نساعد الناس في عرض منتجاتهم والعثور على مشترين بسهولة.`;

const POST_INSTRUCTIONS_EN = `📋 To post your item, please follow our guided steps.

━━━━━━━━━━━━━━━━━━━━
📌 Posting Fee: 70 Birr per item
📌 Commission: 2% after the item is sold
━━━━━━━━━━━━━━━━━━━━

💬 For more information, feel free to message us 🤍

📞 0962269105
📞 0973165132`;

const POST_INSTRUCTIONS_AM = `📋 ዕቃዎን ለመለጠፍ እባክዎ የእኛን መመሪያዎች ይከተሉ።

━━━━━━━━━━━━━━━━━━━━
📌 የመለጠፊያ ክፍያ: 70 ብር ለእያንዳንዱ ዕቃ
📌 ኮሚሽን: ዕቃው ከተሸጠ በኋላ 2%
━━━━━━━━━━━━━━━━━━━━

💬 ለተጨማሪ መረጃ መልእክት ይላኩልን 🤍

📞 0962269105
📞 0973165132`;

const POST_INSTRUCTIONS_AR = `📋 لنشر منتجك، يرجى اتباع خطواتنا الإرشادية.

━━━━━━━━━━━━━━━━━━━━
📌 رسوم النشر: 70 بر لكل منتج
📌 العمولة: 2% بعد بيع المنتج
━━━━━━━━━━━━━━━━━━━━

💬 لمزيد من المعلومات، لا تتردد في مراسلتنا 🤍

📞 0962269105
📞 0973165132`;

const CONTACT_INFO = `━━━━━━━━━━━━━━━━━━━━
     📞  Contact Us  📞
━━━━━━━━━━━━━━━━━━━━

👤  @melumelii
👤  @rew_ane

━━━━━━━━━━━━━━━━━━━━

📱  0962269105
📱  0973165132

━━━━━━━━━━━━━━━━━━━━
💬  Feel free to reach out anytime!
     We're happy to help 🤍
━━━━━━━━━━━━━━━━━━━━`;

const CONTACT_INFO_AM = `━━━━━━━━━━━━━━━━━━━━
     📞  ያግኙን  📞
━━━━━━━━━━━━━━━━━━━━

👤  @melumelii
👤  @rew_ane

━━━━━━━━━━━━━━━━━━━━

📱  0962269105
📱  0973165132

━━━━━━━━━━━━━━━━━━━━
💬  በማንኛውም ጊዜ ያናግሩን!
     ለመርዳት ዝግጁ ነን 🤍
━━━━━━━━━━━━━━━━━━━━`;

const CONTACT_INFO_AR = `━━━━━━━━━━━━━━━━━━━━
     📞  تواصل معنا  📞
━━━━━━━━━━━━━━━━━━━━

👤  @melumelii
👤  @rew_ane

━━━━━━━━━━━━━━━━━━━━

📱  0962269105
📱  0973165132

━━━━━━━━━━━━━━━━━━━━
💬  لا تتردد في التواصل معنا!
     يسعدنا مساعدتك 🤍
━━━━━━━━━━━━━━━━━━━━`;

const translations = {
  en: {
    welcome: WELCOME_MSG,
    chooseLang: "🌍 Choose your language:",
    langSaved: "✅ Language set to English!",
    mainMenu: "What would you like to do?",
    btnPost: "📦 Post Product",
    btnContact: "📞 Contact Us",
    btnMenu: "📋 Main Menu",
    btnCancel: "❌ Cancel / Reset",
    postInstructions: POST_INSTRUCTIONS_EN,
    contactInfo: CONTACT_INFO,
    msgForwarded: "✅ Your message has been sent to our team! We'll get back to you soon. 🤍",
    postSuccess: "✅ Thank you! Your product details have been sent to the admins for review. 🤍",

    // Step prompts
    promptPhoto: "📸 Step 1: Please send clear photos of the item.",
    promptName: "🏷️ Step 2: What is the item name?",
    promptPrice: "💰 Step 3: What is the price?",
    promptLocation: "📍 Step 4: Where is the location in Jimma?",
    promptCondition: "📦 Step 5: What is the condition? (New / Used)",
    promptSize: "📏 Step 6: What is the size? (If clothes/shoes, otherwise type 'N/A')",
    promptDescription: "📝 Step 7: Enter a short description (color, brand, details):",
    promptPhone: "📞 Step 8: Enter your contact info/phone number:",

    // Product labels for group message
    labelName: "🏷️ Name",
    labelPrice: "💰 Price",
    labelLocation: "📍 Location",
    labelCondition: "📦 Condition",
    labelSize: "📏 Size",
    labelDescription: "📝 Description",
    labelPhone: "📞 Phone",
    labelUser: "👤 From",

    // Order actions
    btnOrder: "🛒 Order",
    btnContactProduct: "📞 Contact",
    orderMsg: "📦 Send your full name and delivery location to place your order.",
    noProducts: "😕 No products available right now. Check back later!",
  },

  am: {
    welcome: WELCOME_MSG_AM,
    chooseLang: "🌍 ቋንቋዎን ይምረጡ:",
    langSaved: "✅ ቋንቋ ወደ አማርኛ ተቀይሯል!",
    mainMenu: "ምን ማድረግ ይፈልጋሉ?",
    btnPost: "📦 ምርት ለጥፍ",
    btnContact: "📞 ያግኙን",
    btnMenu: "📋 ዋና ምናሌ",
    btnCancel: "❌ ሰርዝ / እንደገና ጀምር",
    postInstructions: POST_INSTRUCTIONS_AM,
    contactInfo: CONTACT_INFO_AM,
    msgForwarded: "✅ መልእክትዎ ለቡድናችን ተልኳል! በቅርቡ እንመልሳለን። 🤍",
    postSuccess: "✅ እናመሰግናለን! የምርትዎ ዝርዝር ለባለሙያዎቻችን ተልኳል። 🤍",

    // Step prompts
    promptPhoto: "📸 ደረጃ 1: እባክዎ የዕቃውን ግልጽ ፎቶዎች ይላኩ።",
    promptName: "🏷️ ደረጃ 2: የዕቃው ስም ምንድነው?",
    promptPrice: "💰 ደረጃ 3: ዋጋው ስንት ነው?",
    promptLocation: "📍 ደረጃ 4: በጅማ ውስጥ ቦታው የት ነው?",
    promptCondition: "📦 ደረጃ 5: ሁኔታው እንዴት ነው? (አዲስ / ያገለገለ)",
    promptSize: "📏 ደረጃ 6: መጠኑ ስንት ነው? (ልብስ/ጫማ ከሆነ፣ ካልሆነ 'የለም' ብለው ይፃፉ)",
    promptDescription: "📝 ደረጃ 7: አጭር መግለጫ ያስገቡ (ቀለም፣ ብራንድ፣ ዝርዝሮች):",
    promptPhone: "📞 ደረጃ 8: የመገኛ ስልክ ቁጥርዎን ያስገቡ:",

    // Product labels for group message
    labelName: "🏷️ ስም",
    labelPrice: "💰 ዋጋ",
    labelLocation: "📍 ቦታ",
    labelCondition: "📦 ሁኔታ",
    labelSize: "📏 መጠን",
    labelDescription: "📝 መግለጫ",
    labelPhone: "📞 ስልክ",
    labelUser: "👤 ከ",

    // Order actions
    btnOrder: "🛒 ትዕዛዝ",
    btnContactProduct: "📞 አግኝ",
    orderMsg: "📦 ለማዘዝ ሙሉ ስምዎን እና የመድረሻ ቦታዎን ያስገቡ።",
    noProducts: "😕 አሁን ምንም ምርቶች የሉም። በኋላ ይመልሱ!",
  },

  ar: {
    welcome: WELCOME_MSG_AR,
    chooseLang: "🌍 اختر لغتك:",
    langSaved: "✅ تم تعيين اللغة إلى العربية!",
    mainMenu: "ماذا تريد أن تفعل؟",
    btnPost: "📦 نشر منتج",
    btnContact: "📞 تواصل معنا",
    btnMenu: "📋 القائمة الرئيسية",
    btnCancel: "❌ إلغاء / إعادة تعيين",
    postInstructions: POST_INSTRUCTIONS_AR,
    contactInfo: CONTACT_INFO_AR,
    msgForwarded: "✅ تم إرسال رسالتك إلى فريقنا! سنرد عليك قريباً. 🤍",
    postSuccess: "✅ شكراً لك! تم إرسال تفاصيل منتجك إلى المسؤولين للمراجعة. 🤍",

    // Step prompts
    promptPhoto: "📸 الخطوة 1: يرجى إرسال صور واضحة للمنتج.",
    promptName: "🏷️ الخطوة 2: ما هو اسم المنتج؟",
    promptPrice: "💰 الخطوة 3: ما هو السعر؟",
    promptLocation: "📍 الخطوة 4: أين الموقع في جيما؟",
    promptCondition: "📦 الخطوة 5: ما هي الحالة؟ (جديد / مستعمل)",
    promptSize: "📏 الخطوة 6: ما هو المقاس؟ (إذا كان ملابس/أحذية، وإلا اكتب 'لا يوجد')",
    promptDescription: "📝 الخطوة 7: أدخل وصفاً قصيراً (اللون، العلامة التجارية، التفاصيل):",
    promptPhone: "📞 الخطوة 8: أدخل معلومات الاتصال/رقم الهاتف الخاص بك:",

    // Product labels for group message
    labelName: "🏷️ الاسم",
    labelPrice: "💰 السعر",
    labelLocation: "📍 الموقع",
    labelCondition: "📦 الحالة",
    labelSize: "📏 المقاس",
    labelDescription: "📝 الوصف",
    labelPhone: "📞 الهاتف",
    labelUser: "👤 من",

    // Order actions
    btnOrder: "🛒 اطلب",
    btnContactProduct: "📞 تواصل",
    orderMsg: "📦 أرسل اسمك الكامل وموقع التوصيل لتقديم طلبك.",
    noProducts: "😕 لا توجد منتجات متاحة حالياً. تحقق لاحقاً!",
  },
};

function t(lang, key) {
  if (translations[lang] && translations[lang][key]) {
    return translations[lang][key];
  }
  return translations.en[key] || key;
}

module.exports = { translations, t };