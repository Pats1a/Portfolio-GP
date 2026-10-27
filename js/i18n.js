// English / Georgian switch.
// The English text lives in the html, so it gets read from the page on load.
// Georgian is below. Anything marked with data-i18n="key" gets swapped.

const KA = {
  'skip': 'მთავარ შინაარსზე გადასვლა',
  'curtain.name': 'გიორგი ფაცია',

  'nav.about': 'ჩემ შესახებ',
  'nav.services': 'სერვისები',
  'nav.work': 'ნამუშევრები',
  'nav.skills': 'უნარები',
  'nav.experience': 'ჩემი გზა',
  'nav.contact': 'კონტაქტი',
  'hire': 'დამიკავშირდით',

  'hero.tag': 'ღია ვარ ახალი პროექტებისთვის',
  'hero.city': 'თბილისი',
  'hero.first': 'გიორგი',
  'hero.last': 'ფაცია',
  'hero.intro': 'ვქმნი სწრაფ, სუფთა ვებსაიტებსა და React-აპლიკაციებს და ყველა დეტალზე ვზრუნავ.',
  'hero.work': 'ნახეთ ნამუშევრები',
  'hero.hello': 'მომწერეთ',
  'hero.scroll': 'ჩასქროლეთ',

  'tldr.label': 'მოკლედ, 10 წამში',
  'tldr.1.k': 'რას ვაკეთებ',
  'tldr.1.v': 'ფრონტენდი და საბაზისო ბექენდი',
  'tldr.2.k': 'სად ვარ',
  'tldr.2.v': 'თბილისი, ვმუშაობ დისტანციურად',
  'tldr.3.k': 'პასუხის დრო',
  'tldr.3.v': '24 საათის განმავლობაში',
  'tldr.4.k': 'ამჟამად',
  'tldr.4.v': 'ვიღებ ახალ პროექტებს',

  'about.label': 'ჩემ შესახებ',
  'about.statement': 'კოდის პირველი ხაზი 2022 წელს, ყოველგვარი გამოცდილების გარეშე დავწერე. დღეს ვქმნი იმას, რაც ოდესღაც <em>შეუძლებლად</em> მეჩვენებოდა, და ეს მხოლოდ <em>დასაწყისია</em>.',
  'about.stat1': 'პირველი კოდი დავწერე',
  'about.stat2': 'წელია, რაც კოდს ვწერ',
  'about.stat3': 'კიდევ ბევრი რამ მაქვს სასწავლი',
  'about.p1': 'ძირითადად თვითნასწავლი ვარ. <mark>ფრონტენდს</mark> HTML-ით, CSS-ით, JavaScript-ითა და <mark>React-ით</mark> ვაწყობ, ბექენდის საბაზისო ამოცანებსაც ვართმევ თავს.',
  'about.p2': 'ამჟამად ინფორმაციულ ტექნოლოგიებსა და კომპიუტერულ მეცნიერებას ვსწავლობ და პირველ რეალურ პროექტებს ვეძებ. მომეცით შანსი და მთელ ძალას ჩავდებ.',

  'services.label': 'რას ვაკეთებ',
  'services.title': 'რისი შექმნა<br>შემიძლია თქვენთვის',
  'services.start': 'პროექტის დაწყება',
  'services.web.title': 'ვებსაიტები',
  'services.web.text': 'სწრაფი საიტები ბიზნესებისთვის, მაღაზიებისა და პირადი ბრენდებისთვის, ნებისმიერ ეკრანზე მორგებული.',
  'services.web.1': 'ლენდინგ-გვერდები',
  'services.web.2': 'ბიზნეს-საიტები',
  'services.web.3': 'პორტფოლიოები',
  'services.app.title': 'ვებ-აპლიკაციები',
  'services.app.text': 'React-აპლიკაციები, საჭიროების შემთხვევაში მარტივი ბექენდით. დეშბორდები, ხელსაწყოები და ყველაფერი, რაც სტატიკურ გვერდზე მეტია.',
  'services.app.1': 'დეშბორდები',
  'services.app.2': 'ინტერაქტიული ხელსაწყოები',
  'services.app.3': 'ერთგვერდიანი აპლიკაციები',
  'services.design.title': 'დიზაინიდან კოდამდე',
  'services.design.text': 'გამომიგზავნეთ დიზაინი და მიიღებთ მოქმედ გვერდებს, რომლებიც მას პიქსელის სიზუსტით ემთხვევა.',
  'services.design.1': 'დიზაინიდან საიტამდე',
  'services.design.2': 'ადაპტირებადი განლაგება',
  'services.design.3': 'ანიმაციები',

  'work.label': 'ნამუშევრები',
  'work.title': 'ერთი პროექტი.<br>შემდეგი თქვენია.',
  'work.code': 'კოდი ↗',
  'work.open': 'თავისუფალი ადგილი',
  'work.claim': 'შევქმნათ ერთად',
  'work.1.title': 'ეს საიტი',
  'work.1.text': 'ჩემი პორტფოლიო, ნულიდან აწყობილი. არანაირი შაბლონი, არანაირი ფრეიმვორკი, ყველა ანიმაცია ხელით დაწერილი.',
  'work.2.title': 'თქვენი პროექტი',
  'work.2.text': 'ვებსაიტი, ვებ-აპლიკაცია თუ ონლაინ მაღაზია. ეს ადგილი თავისუფალია და მას ყველაფერს მოვახმარ, რაც შემიძლია.',

  'skills.label': 'უნარები',
  'skills.title': 'ჩემი ყოველდღიური<br>ხელსაწყოები',
  'skills.html': 'სუფთა, სემანტიკური კოდი, რომელიც ყველასთვის ხელმისაწვდომია',
  'skills.css': 'განლაგება, ადაპტირებადი დიზაინი და ანიმაციები',
  'skills.js': 'ინტერაქტიულობა, ლოგიკა და ყველაფერი მათ შორის',
  'skills.react': 'კომპონენტები, მდგომარეობის მართვა და ერთგვერდიანი აპლიკაციები',

  'process.label': 'როგორ ვმუშაობ',
  'process.title': 'პირველი შეტყობინებიდან<br>გაშვების დღემდე',
  'process.1.title': 'ვსაუბრობთ',
  'process.1.text': 'მოკლე ზარი ან რამდენიმე შეტყობინება. ზედმეტი ტერმინების გარეშე.',
  'process.2.title': 'ვგეგმავ',
  'process.2.text': 'მკაფიო გეგმა და ვადები, ჯერ კიდევ კოდის დაწერამდე.',
  'process.3.title': 'ვქმნი',
  'process.3.text': 'რეგულარულად გიზიარებთ პროგრესს. არანაირი სიურპრიზი.',
  'process.4.title': 'ვუშვებთ',
  'process.4.text': 'საიტი ეშვება, ხარვეზებს ვასწორებ და ყველაფერი მზადაა.',

  'exp.label': 'ჩემი გზა',
  'exp.next': 'შემდეგი',
  'exp.1.title': 'ჩემი პირველი სამსახური',
  'exp.1.where': 'შესაძლოა, თქვენთან',
  'exp.1.text': 'სამუშაო გამოცდილება ჯერ არ მაქვს, ამიტომ თავის გამოჩენის დიდი სურვილი მაქვს. მთელ ენერგიას საქმეს მოვახმარ.',
  'exp.2.title': 'ინფორმაციული ტექნოლოგიები / კომპიუტერული მეცნიერება',
  'exp.2.where': 'ქართულ-ამერიკული უნივერსიტეტი',
  'exp.2.text': 'ბაკალავრიატი, ამჟამად ვსწავლობ. დღისით თეორია, ღამით საკუთარი პროექტები.',
  'exp.3.title': 'ფრონტენდ React-დეველოპერის კურსი',
  'exp.3.text': 'აქედან დაიწყო ყველაფერი. კურსმა საფუძვლები მომცა, დანარჩენი კი დამოუკიდებლად ვისწავლე: ვქმნიდი, ვაფუჭებდი და ვასწორებდი.',

  'site.intro': 'იზომება ახლავე, თქვენს ბრაუზერში',
  'site.size': 'გვერდის ზომა',
  'site.load': 'ჩატვირთვის დრო',
  'site.els': 'ელემენტები',
  'site.fps': 'კადრების სიხშირე',

  'contact.label': 'კონტაქტი',
  'contact.talk': 'ვისაუბროთ',
  'contact.lead': 'გაქვთ პროექტი ან იდეა? მომწერეთ, სიამოვნებით გიპასუხებთ.',
  'contact.reply': 'როგორც წესი, 24 საათში გპასუხობთ',
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
    away: 'აქ დაგელოდებით, როცა მზად იქნებით 👋',
    copied: 'ელფოსტა დაკოპირდა!',
    toLight: 'ღია თემაზე გადართვა',
    toDark: 'მუქ თემაზე გადართვა',
    openMenu: 'მენიუს გახსნა',
    closeMenu: 'მენიუს დახურვა',
    mailSubject: 'შეტყობინება საიტიდან:',
    langBtn: 'ენის შეცვლა ინგლისურზე',
    online: 'ალბათ ონლაინ ვარ',
    asleep: 'ალბათ მძინავს 😴',
    secret: 'საიდუმლო იპოვეთ! ვისაუბროთ 👀',
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
