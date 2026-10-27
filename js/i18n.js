// English / Georgian switch.
// The English text lives in the html, so it gets read from the page on load.
// Georgian is below. Anything marked with data-i18n="key" gets swapped.

const KA = {
  'skip': 'კონტენტზე გადასვლა',
  'curtain.name': 'გიორგი ფაცია',

  'nav.about': 'ჩემ შესახებ',
  'nav.services': 'სერვისები',
  'nav.work': 'ნამუშევრები',
  'nav.skills': 'უნარები',
  'nav.experience': 'გამოცდილება',
  'nav.contact': 'კონტაქტი',
  'hire': 'დამიქირავეთ',

  'hero.tag': 'ღია ვარ ახალი პროექტებისთვის',
  'hero.city': 'თბილისი',
  'hero.first': 'გიორგი',
  'hero.last': 'ფაცია',
  'hero.intro': 'ვქმნი სწრაფ, სუფთა ვებსაიტებსა და React-აპლიკაციებს. წვრილმანების ჩათვლით.',
  'hero.work': 'ნახეთ ნამუშევრები',
  'hero.hello': 'დამიკავშირდით',
  'hero.scroll': 'ქვემოთ',

  'tldr.label': 'მოკლედ, 10 წამში',
  'tldr.1.k': 'რას ვაკეთებ',
  'tldr.1.v': 'საიტები და React-აპლიკაციები',
  'tldr.2.k': 'სად',
  'tldr.2.v': 'თბილისი, ვმუშაობ დისტანციურად',
  'tldr.3.k': 'პასუხი',
  'tldr.3.v': '24 საათის განმავლობაში',
  'tldr.4.k': 'ახლა',
  'tldr.4.v': 'ვიღებ ახალ პროექტებს',

  'about.label': 'ჩემ შესახებ',
  'about.statement': 'ვქმნი <em>სწრაფ</em>, სუფთა საიტებს, რომლებიც ადამიანებს მართლა <em>მოსწონთ</em>. ცნობისმოყვარეობით დავიწყე და დღემდე ასეთი ვარ.',
  'about.stat1': 'წელი პროგრამირებაში',
  'about.stat2': 'დასრულებული პროექტი',
  'about.stat3': 'კმაყოფილი კლიენტი',
  'about.p1': 'ყველაფერი, რასაც ვქმნი, <mark>ფრონტენდია</mark>: HTML, CSS, JavaScript, ხოლო დიდი პროექტებისთვის <mark>React</mark>.',
  'about.p2': 'თავისუფალ დროს ან რამე ახალს ვსწავლობ, ან ყურსასმენებით თბილისში დავსეირნობ.',

  'services.label': 'რას ვაკეთებ',
  'services.title': 'რისი შექმნა<br>შემიძლია თქვენთვის',
  'services.start': 'პროექტის დაწყება',
  'services.web.title': 'ვებსაიტები',
  'services.web.text': 'სწრაფი საიტები ბიზნესებისთვის, მაღაზიებისა და პირადი ბრენდებისთვის. ნებისმიერ ეკრანზე კარგად გამოიყურება.',
  'services.web.1': 'ლენდინგ გვერდები',
  'services.web.2': 'ბიზნეს საიტები',
  'services.web.3': 'პორტფოლიოები',
  'services.app.title': 'ვებ-აპლიკაციები',
  'services.app.text': 'React-აპლიკაციები: დაშბორდები, ხელსაწყოები და ყველაფერი, რაც სტატიკურ გვერდზე მეტია.',
  'services.app.1': 'დაშბორდები',
  'services.app.2': 'ინტერაქტიული ხელსაწყოები',
  'services.app.3': 'ერთგვერდიანი აპლიკაციები',
  'services.design.title': 'დიზაინიდან კოდამდე',
  'services.design.text': 'გამომიგზავნეთ დიზაინი და მიიღებთ მოქმედ გვერდებს, რომლებიც მას პიქსელამდე ემთხვევა.',
  'services.design.1': 'დიზაინიდან საიტამდე',
  'services.design.2': 'ადაპტირებადი განლაგება',
  'services.design.3': 'ანიმაციები',

  'work.label': 'შერჩეული ნამუშევრები',
  'work.live': 'საიტი ↗',
  'work.code': 'კოდი ↗',
  'work.1.title': 'პირველი პროექტი',
  'work.1.text': 'დავალებების დაფა პატარა გუნდებისთვის. ცვლილებებს ყველა მაშინვე ხედავს.',
  'work.2.title': 'მეორე პროექტი',
  'work.2.text': 'საიტი ადგილობრივი საცხობისთვის: მენიუ, სამუშაო საათები და ონლაინ შეკვეთები.',
  'work.3.title': 'მესამე პროექტი',
  'work.3.text': 'პატარა ხელსაწყო ბრაუზერისთვის, რომელიც ჩემ ნაცვლად დღის მოსაწყენ, განმეორებად საქმეებს აკეთებს.',
  'work.4.title': 'მეოთხე პროექტი',
  'work.4.text': 'ონლაინ მაღაზია კალათით, პროდუქტების ფილტრებითა და მარტივი გადახდის პროცესით.',

  'skills.label': 'უნარები',
  'skills.title': 'ჩემი ყოველდღიური<br>ხელსაწყოები',
  'skills.html': 'სუფთა, სემანტიკური კოდი, რომელიც ყველასთვის ხელმისაწვდომია',
  'skills.css': 'განლაგება, ადაპტირებადი დიზაინი და ანიმაციები',
  'skills.js': 'ინტერაქტიულობა, ლოგიკა და ყველაფერი მათ შორის',
  'skills.react': 'კომპონენტები, მდგომარეობის მართვა და ერთგვერდიანი აპლიკაციები',

  'process.label': 'როგორ ვმუშაობ',
  'process.title': 'პირველი მესიჯიდან<br>გაშვების დღემდე',
  'process.1.title': 'ვსაუბრობთ',
  'process.1.text': 'მოკლე ზარი ან რამდენიმე მესიჯი. ზედმეტი ტერმინების გარეშე.',
  'process.2.title': 'ვგეგმავ',
  'process.2.text': 'მკაფიო გეგმა და ვადები, ჯერ კიდევ კოდის დაწერამდე.',
  'process.3.title': 'ვქმნი',
  'process.3.text': 'რეგულარული განახლებები. არანაირი სიურპრიზი.',
  'process.4.title': 'ვუშვებთ',
  'process.4.text': 'საიტი ეშვება, ხარვეზებს ვასწორებ და ყველაფერი მზადაა.',

  'exp.label': 'გამოცდილება',
  'exp.now': '2024 – დღემდე',
  'exp.1.title': 'ფრონტენდ დეველოპერი',
  'exp.1.where': 'კომპანიის სახელი',
  'exp.1.text': 'ვქმნი და ვუვლი ვებ-აპლიკაციებს, რომლებსაც მომხმარებლები ყოველდღე იყენებენ.',
  'exp.2.title': 'ფრილანსერი ვებ-დეველოპერი',
  'exp.2.where': 'თვითდასაქმებული',
  'exp.2.text': 'საიტები და ონლაინ მაღაზიები მცირე ბიზნესებისთვის მთელ საქართველოში.',
  'exp.3.title': 'კომპიუტერული მეცნიერება',
  'exp.3.where': 'უნივერსიტეტის სახელი',
  'exp.3.text': 'ალგორითმები, მონაცემთა სტრუქტურები და ბევრი უძილო ღამე.',

  'site.label': 'ეს საიტი',
  'site.intro': 'ხელით დაწერილი HTML, CSS და JavaScript, ფრეიმვორკების გარეშე. იზომება პირდაპირ თქვენს ბრაუზერში:',
  'site.size': 'გვერდის ზომა',
  'site.load': 'ჩატვირთვის დრო',
  'site.els': 'ელემენტები',
  'site.fps': 'კადრების სიხშირე',

  'contact.label': 'კონტაქტი',
  'contact.talk': 'ვისაუბროთ',
  'contact.lead': 'გაქვთ პროექტი ან იდეა? მომწერეთ, სიამოვნებით გიპასუხებთ.',
  'contact.reply': 'ჩვეულებრივ 24 საათში გპასუხობთ',
  'contact.name': 'თქვენი სახელი',
  'contact.email': 'თქვენი ელფოსტა',
  'contact.msg': 'მომიყევით თქვენი პროექტის შესახებ',
  'contact.send': 'გაგზავნა',
  'contact.note': 'გაიხსნება თქვენი ფოსტის აპლიკაცია, უკვე შევსებული შეტყობინებით.',

  'footer.name': 'გიორგი ფაცია',
  'footer.thanks': 'მადლობა, რომ ბოლომდე ჩამოხვედით',
  'footer.keys': 'დააჭირეთ <kbd>T</kbd>-ს თემისთვის, <kbd>L</kbd>-ს ენისთვის',
}

// strings that only live in javascript (toasts, tab title, button labels for screen readers)
const STRINGS = {
  en: {
    title: 'Giorgi Patsia · Web Developer',
    away: 'Still here when you\'re ready 👋',
    copied: 'Copied! Talk soon',
    toLight: 'Switch to light mode',
    toDark: 'Switch to dark mode',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    mailSubject: 'Message from',
    langBtn: 'switch language to Georgian',
    online: 'probably online',
    asleep: 'probably asleep 😴',
    secret: 'You found the secret. Let\'s talk 👀',
  },
  ka: {
    title: 'გიორგი ფაცია · ვებ-დეველოპერი',
    away: 'აქ ვარ, როცა მზად იქნებით 👋',
    copied: 'ელფოსტა დაკოპირდა!',
    toLight: 'ღია თემაზე გადართვა',
    toDark: 'მუქ თემაზე გადართვა',
    openMenu: 'მენიუს გახსნა',
    closeMenu: 'მენიუს დახურვა',
    mailSubject: 'შეტყობინება საიტიდან:',
    langBtn: 'ენის შეცვლა ინგლისურზე',
    online: 'ალბათ ონლაინ ვარ',
    asleep: 'ალბათ მძინავს 😴',
    secret: 'საიდუმლო იპოვეთ. ვისაუბროთ 👀',
  },
}

// grab the english from the page before anything else touches it
const translatable = document.querySelectorAll('[data-i18n]')
const EN = {}
translatable.forEach(el => { EN[el.dataset.i18n] = el.innerHTML.trim() })

let lang = 'en'
const say = key => STRINGS[lang][key]

function applyLang(next) {
  lang = next
  document.documentElement.lang = next == 'ka' ? 'ka' : 'en'
  translatable.forEach(el => {
    const key = el.dataset.i18n
    el.innerHTML = next == 'ka' ? (KA[key] ?? EN[key]) : EN[key]
    // buttons keep a copy of their label for the roll effect, labels keep one for the scramble
    if (el.hasAttribute('data-text')) el.dataset.text = el.textContent
  })
  document.title = say('title')
  document.getElementById('lang-btn-label').textContent = say('langBtn')
  document.getElementById('lang-btn').dataset.active = next
  try { localStorage.lang = next } catch (e) {}
}

// use the saved choice, otherwise Georgian if the browser is set to Georgian
let startLang = 'en'
try { startLang = localStorage.lang || (navigator.language.startsWith('ka') ? 'ka' : 'en') } catch (e) {}
applyLang(startLang)
