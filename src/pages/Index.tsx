import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const [showScrollTop, setShowScrollTop] = useState(false);
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Спасибо! Мы свяжемся с вами в ближайшее время.');
    setFormData({ name: '', phone: '', message: '' });
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const menuItems = [
    { id: 'about', label: 'О студии' },
    { id: 'directions', label: 'Направления' },
    { id: 'schedule', label: 'Расписание' },
    { id: 'teachers', label: 'Преподаватели' },
    { id: 'gallery', label: 'Галерея' },
    { id: 'contact', label: 'Контакты' },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );

    Object.values(sectionRefs.current).forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const setSectionRef = (id: string) => (el: HTMLElement | null) => {
    sectionRefs.current[id] = el;
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-primary">Студия танца</h1>
            
            <div className="hidden md:flex gap-6">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>

            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Icon name="Menu" size={24} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px]">
                <div className="flex flex-col gap-6 mt-8">
                  <h2 className="text-xl font-bold text-primary mb-4">Меню</h2>
                  {menuItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className="text-left text-lg font-medium hover:text-primary transition-colors py-2 border-b border-border"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-muted via-background to-accent/10">
        <div className="container mx-auto text-center animate-fade-in">
          <h2 className="text-5xl md:text-7xl font-bold mb-6 text-foreground">
            Танцуй с <span className="text-primary">грацией</span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Профессиональная студия танца для детей и подростков. Развиваем талант, уверенность и любовь к движению.
          </p>
          <Button size="lg" className="text-lg px-8" onClick={() => scrollToSection('contact')}>
            Записаться на пробное занятие
          </Button>
        </div>
      </section>

      <section 
        id="about" 
        ref={setSectionRef('about')}
        className={`py-20 px-4 transition-all duration-700 ${
          visibleSections.has('about') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container mx-auto">
          <h3 className="text-4xl font-bold text-center mb-12">О студии</h3>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-muted-foreground mb-6">
                Наша студия танца — это пространство, где каждый ребёнок и подросток может раскрыть свой потенциал. Мы создали атмосферу поддержки, где танец становится способом самовыражения и уверенности в себе.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                С 2015 года мы помогаем более 200 ученикам развивать координацию, пластику и артистизм. Наши выпускники участвуют в городских и международных конкурсах, но главное — они любят танцевать!
              </p>
              <div className="grid grid-cols-3 gap-4 mt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">10+</div>
                  <div className="text-sm text-muted-foreground">лет опыта</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">200+</div>
                  <div className="text-sm text-muted-foreground">учеников</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">15+</div>
                  <div className="text-sm text-muted-foreground">наград</div>
                </div>
              </div>
            </div>
            <div className="bg-muted rounded-2xl h-96 flex items-center justify-center">
              <Icon name="Music" size={80} className="text-primary/30" />
            </div>
          </div>
        </div>
      </section>

      <section 
        id="directions" 
        ref={setSectionRef('directions')}
        className={`py-20 px-4 bg-muted/30 transition-all duration-700 ${
          visibleSections.has('directions') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container mx-auto">
          <h3 className="text-4xl font-bold text-center mb-12">Направления</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: 'Sparkles', title: 'Классический танец', desc: 'Основа для всех направлений. Развиваем осанку, координацию и грацию.' },
              { icon: 'Zap', title: 'Современные танцы', desc: 'Hip-hop, jazz-funk, contemporary — современные стили для самовыражения.' },
              { icon: 'Heart', title: 'Бальные танцы', desc: 'Вальс, танго, ча-ча-ча — элегантность и работа в паре.' },
            ].map((direction, index) => (
              <Card key={index} className="hover-lift border-none shadow-lg">
                <CardHeader>
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Icon name={direction.icon} size={32} className="text-primary" />
                  </div>
                  <CardTitle className="text-2xl">{direction.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{direction.desc}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section 
        id="schedule" 
        ref={setSectionRef('schedule')}
        className={`py-20 px-4 transition-all duration-700 ${
          visibleSections.has('schedule') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container mx-auto max-w-4xl">
          <h3 className="text-4xl font-bold text-center mb-12">Расписание</h3>
          <div className="space-y-4">
            {[
              { day: 'Понедельник', time: '16:00 - 17:30', group: 'Классический танец (7-10 лет)' },
              { day: 'Понедельник', time: '18:00 - 19:30', group: 'Hip-hop (11-14 лет)' },
              { day: 'Среда', time: '16:00 - 17:30', group: 'Современные танцы (7-10 лет)' },
              { day: 'Среда', time: '18:00 - 19:30', group: 'Бальные танцы (11-16 лет)' },
              { day: 'Пятница', time: '16:00 - 17:30', group: 'Классический танец (11-14 лет)' },
              { day: 'Пятница', time: '18:00 - 19:30', group: 'Jazz-funk (14-17 лет)' },
            ].map((item, index) => (
              <Card key={index} className="hover-lift">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="flex items-center gap-4">
                    <Icon name="Calendar" className="text-primary" size={24} />
                    <div>
                      <CardTitle className="text-lg">{item.day}</CardTitle>
                      <CardDescription>{item.time}</CardDescription>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-muted-foreground">{item.group}</div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section 
        id="teachers" 
        ref={setSectionRef('teachers')}
        className={`py-20 px-4 bg-muted/30 transition-all duration-700 ${
          visibleSections.has('teachers') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container mx-auto">
          <h3 className="text-4xl font-bold text-center mb-12">Преподаватели</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Анна Смирнова', role: 'Классический танец', exp: '15 лет опыта' },
              { name: 'Дмитрий Волков', role: 'Современные танцы', exp: '10 лет опыта' },
              { name: 'Елена Петрова', role: 'Бальные танцы', exp: '12 лет опыта' },
            ].map((teacher, index) => (
              <Card key={index} className="text-center hover-lift">
                <CardHeader>
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-secondary mx-auto mb-4 flex items-center justify-center">
                    <Icon name="User" size={64} className="text-white" />
                  </div>
                  <CardTitle className="text-2xl">{teacher.name}</CardTitle>
                  <CardDescription className="text-base">{teacher.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{teacher.exp}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section 
        id="gallery" 
        ref={setSectionRef('gallery')}
        className={`py-20 px-4 transition-all duration-700 ${
          visibleSections.has('gallery') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container mx-auto">
          <h3 className="text-4xl font-bold text-center mb-12">Галерея</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              'https://cdn.poehali.dev/projects/3f683e6a-410b-43b6-8579-324579363b06/files/119243bd-8cc2-47ba-a754-ccf80faf3003.jpg',
              'https://cdn.poehali.dev/projects/3f683e6a-410b-43b6-8579-324579363b06/files/24d9eeb6-9e59-4c95-bbaf-425bd4445bae.jpg',
              'https://cdn.poehali.dev/projects/3f683e6a-410b-43b6-8579-324579363b06/files/4ef9395a-0bb4-4a11-b383-fc0ee4bf24d3.jpg',
            ].map((img, index) => (
              <div
                key={index}
                className="aspect-square rounded-2xl hover-lift overflow-hidden"
              >
                <img src={img} alt={`Галерея ${index + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
            {[1, 2, 3].map((item, index) => (
              <div
                key={`placeholder-${item}`}
                className="aspect-square bg-gradient-to-br from-muted to-accent/20 rounded-2xl hover-lift flex items-center justify-center"
              >
                <Icon name="Image" size={48} className="text-muted-foreground/30" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section 
        id="faq" 
        ref={setSectionRef('faq')}
        className={`py-20 px-4 bg-muted/30 transition-all duration-700 ${
          visibleSections.has('faq') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container mx-auto max-w-3xl">
          <h3 className="text-4xl font-bold text-center mb-12">Часто задаваемые вопросы</h3>
          <Accordion type="single" collapsible className="space-y-4">
            {[
              {
                q: 'С какого возраста можно заниматься?',
                a: 'Мы принимаем детей с 7 лет. Группы формируются по возрастам для максимального комфорта обучения.',
              },
              {
                q: 'Нужна ли специальная форма?',
                a: 'На первом занятии достаточно удобной спортивной одежды. Далее мы порекомендуем специальную форму для каждого направления.',
              },
              {
                q: 'Как проходит пробное занятие?',
                a: 'Пробное занятие длится 60 минут, проходит в группе по расписанию. Это бесплатно и ни к чему не обязывает!',
              },
              {
                q: 'Участвуют ли ученики в конкурсах?',
                a: 'Да! Мы регулярно участвуем в городских и международных конкурсах. Это опционально и зависит от желания ученика и родителей.',
              },
            ].map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-6 bg-background">
                <AccordionTrigger className="text-lg font-medium hover:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section 
        id="contact" 
        ref={setSectionRef('contact')}
        className={`py-20 px-4 transition-all duration-700 ${
          visibleSections.has('contact') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container mx-auto max-w-2xl">
          <h3 className="text-4xl font-bold text-center mb-12">Контакты</h3>
          <Card className="shadow-2xl">
            <CardHeader>
              <CardTitle className="text-2xl">Запишитесь на пробное занятие</CardTitle>
              <CardDescription>Заполните форму, и мы свяжемся с вами в течение дня</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Input
                    placeholder="Ваше имя"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Input
                    placeholder="Телефон"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Textarea
                    placeholder="Сообщение (необязательно)"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                  />
                </div>
                <Button type="submit" className="w-full text-lg" size="lg">
                  Отправить заявку
                </Button>
              </form>
              <div className="mt-8 pt-8 border-t space-y-4">
                <div className="flex items-center gap-3">
                  <Icon name="Phone" className="text-primary" size={20} />
                  <span>+7 (495) 123-45-67</span>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="Mail" className="text-primary" size={20} />
                  <span>info@dancestudio.ru</span>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="MapPin" className="text-primary" size={20} />
                  <span>Москва, ул. Танцевальная, д. 15</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="py-8 px-4 bg-foreground/5 border-t">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>© 2024 Студия танца. Все права защищены.</p>
        </div>
      </footer>

      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg hover:scale-110 transition-all duration-300 flex items-center justify-center ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        aria-label="Наверх"
      >
        <Icon name="ArrowUp" size={24} />
      </button>
    </div>
  );
};

export default Index;