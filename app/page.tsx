'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { ArrowRight, BarChart3, Shield, Zap, Users, TrendingUp, Sparkles, Star, ChevronDown } from 'lucide-react'

// Simple loading screen
function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 200),
      setTimeout(() => setStep(2), 600),
      setTimeout(() => setStep(3), 1000),
      setTimeout(onComplete, 1400),
    ]
    return () => timers.forEach(clearTimeout)
  }, [onComplete])

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-[#030303] flex flex-col items-center justify-center overflow-hidden"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="relative z-10"
        initial={{ scale: 0, rotate: -90 }}
        animate={{ scale: step >= 1 ? 1 : 0, rotate: step >= 1 ? 0 : -90 }}
        transition={{ type: 'spring', damping: 12, stiffness: 200 }}
      >
        <div className="w-32 h-32 rounded-3xl bg-[#0a1929] flex items-center justify-center shadow-glow border border-cyan-400/20 overflow-hidden">
          <motion.img 
            src="/logo.jpg" 
            alt="Influenta" 
            className="w-20 h-20 object-contain"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: step >= 2 ? 1 : 0, scale: step >= 2 ? 1 : 0.5 }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: step >= 3 ? 1 : 0, y: step >= 3 ? 0 : 20 }}
        className="mt-8 text-4xl font-bold text-white"
      >
        Influenta
      </motion.h1>

      <p className="absolute bottom-8 text-white/20 text-xs">🪚 by YNCHQ</p>
    </motion.div>
  )
}

// Scroll-triggered section
function ScrollSection({ children, className = '', delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const features = [
    { icon: BarChart3, title: 'Прозрачная аналитика', desc: 'Реальные данные об охватах и вовлеченности в реальном времени.', gradient: 'from-blue-500 to-cyan-500' },
    { icon: Shield, title: 'Безопасная сделка', desc: 'Эскроу-система защищает средства до выполнения условий.', gradient: 'from-purple-500 to-pink-500' },
    { icon: Zap, title: 'Мгновенный запуск', desc: 'Создайте кампанию за 2 минуты. AI подберет блогеров.', gradient: 'from-orange-500 to-yellow-500' },
  ]

  const stats = [
    { value: '500+', label: 'Блогеров', icon: Users },
    { value: '1.2M+', label: 'Охват', icon: TrendingUp },
    { value: '0%', label: 'Комиссия', icon: Sparkles },
  ]

  return (
    <>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      <main className={`min-h-screen bg-[#030303] text-white transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        {/* Background - pure CSS */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="blob blob-1" />
            <div className="blob blob-2" />
            <div className="blob blob-3" />
          </div>
          <div className="absolute inset-0 bg-grid opacity-[0.015]" />
          <div className="absolute inset-0 bg-gradient-radial" />
        </div>

        {/* Navbar */}
        <motion.nav
          className="fixed top-0 left-0 right-0 z-50 bg-[#030303]/80 backdrop-blur-lg border-b border-white/5"
          initial={{ y: -80 }}
          animate={{ y: isLoading ? -80 : 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="max-w-6xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
            <div 
              className="flex items-center gap-2 md:gap-3 font-bold text-base md:text-lg cursor-pointer hover-lift"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <div className="w-8 h-8 md:w-9 md:h-9 rounded-xl bg-[#0a1929] flex items-center justify-center shadow-glow-sm border border-cyan-400/10 overflow-hidden">
                <img src="/logo.jpg" alt="Influenta" className="w-5 h-5 md:w-6 md:h-6 object-contain" />
              </div>
              <div className="flex flex-col leading-tight">
                <span>Influenta</span>
                <span className="text-[10px] text-white/40 font-normal">© 2025 by YNCHQ</span>
              </div>
            </div>
            
            <div className="hidden md:flex items-center gap-8 text-sm text-white/60">
              <button onClick={() => scrollTo('features')} className="hover:text-white transition-colors">Преимущества</button>
              <button onClick={() => scrollTo('app')} className="hover:text-white transition-colors">Приложение</button>
              <button onClick={() => scrollTo('faq')} className="hover:text-white transition-colors">FAQ</button>
            </div>
            
            <Link 
              href="https://t.me/influenta_bot" 
              target="_blank"
              className="bg-white text-black px-4 md:px-5 py-2 rounded-full text-xs md:text-sm font-semibold hover:bg-white/90 transition-all hover-lift"
            >
              Открыть
            </Link>
          </div>
        </motion.nav>

        {/* Hero */}
        <section ref={heroRef} className="relative min-h-screen flex items-center justify-center pt-20 md:pt-16 overflow-hidden px-4">
          <motion.div 
            className="max-w-4xl mx-auto text-center relative z-10"
            style={{ y: heroY, opacity: heroOpacity }}
          >
            <motion.div 
              className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs md:text-sm text-blue-400 mb-6 md:mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 20 : 0 }}
              transition={{ delay: 0.3 }}
            >
              <span className="w-2 h-2 bg-blue-500 rounded-full pulse" />
              Платформа №1 в Telegram
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6 leading-tight px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 20 : 0 }}
              transition={{ delay: 0.4 }}
            >
              Биржа рекламы
              <br />
              <span className="text-gradient">
                нового поколения
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-base md:text-lg lg:text-xl text-white/50 max-w-2xl mx-auto mb-8 md:mb-10 px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 20 : 0 }}
              transition={{ delay: 0.5 }}
            >
              Автоматизированная платформа для блогеров и рекламодателей. 
              Прозрачная статистика, безопасные сделки, моментальные выплаты.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 md:gap-4 mb-12 md:mb-16 px-4 max-w-lg mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 20 : 0 }}
              transition={{ delay: 0.6 }}
            >
              <Link 
                href="https://t.me/influenta_bot" 
                target="_blank"
                className="flex-1 sm:flex-none px-6 md:px-8 py-3 md:py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-semibold text-base md:text-lg text-center transition-all hover-lift shadow-lg shadow-blue-600/20"
              >
                <span className="flex items-center justify-center gap-2">
                  Начать работу
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                </span>
              </Link>
              
              <button
                onClick={() => scrollTo('features')}
                className="px-6 md:px-8 py-3 md:py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-2xl font-semibold text-base md:text-lg transition-all hover-lift"
              >
                Узнать больше
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div 
              className="grid grid-cols-3 gap-2 md:gap-4 max-w-xl mx-auto px-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 30 : 0 }}
              transition={{ delay: 0.7 }}
            >
              {stats.map((stat, i) => (
                <div 
                  key={i} 
                  className="text-center p-3 md:p-4 rounded-xl md:rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm hover-lift"
                >
                  <stat.icon className="w-5 h-5 md:w-6 md:h-6 text-blue-400 mx-auto mb-2" />
                  <div className="text-xl md:text-2xl lg:text-3xl font-bold">{stat.value}</div>
                  <div className="text-white/40 text-xs md:text-sm">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
          
          {/* Scroll indicator */}
          <motion.button 
            onClick={() => scrollTo('features')}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center text-white/30 hover:text-white/50 transition-colors"
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoading ? 0 : 1 }}
            transition={{ delay: 0.8 }}
          >
            <span className="text-xs mb-2">Листайте</span>
            <ChevronDown className="w-5 h-5 bounce" />
          </motion.button>
        </section>

        {/* Features */}
        <section id="features" className="py-20 md:py-32 relative">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <ScrollSection className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 px-4">
                Всё для <span className="text-blue-400">эффективной</span> рекламы
              </h2>
              <p className="text-white/50 max-w-lg mx-auto text-sm md:text-base px-4">
                Мы убрали рутину. Выбирайте блогеров и получайте результат.
              </p>
            </ScrollSection>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {features.map((f, i) => (
                <ScrollSection key={i} delay={i * 0.1}>
                  <div className="p-6 md:p-8 rounded-2xl md:rounded-3xl bg-white/[0.02] border border-white/5 h-full hover-lift-card">
                    <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-gradient-to-br ${f.gradient} flex items-center justify-center mb-4 md:mb-6 shadow-lg`}>
                      <f.icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
                    </div>
                    <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">{f.title}</h3>
                    <p className="text-white/50 text-sm md:text-base">{f.desc}</p>
                  </div>
                </ScrollSection>
              ))}
            </div>
          </div>
        </section>

        {/* App preview */}
        <section id="app" className="py-20 md:py-32 relative overflow-hidden">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <div className="flex flex-col lg:flex-row items-center gap-10 md:gap-16">
              <ScrollSection className="flex-1 text-center lg:text-left px-4">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
                  Управление в <span className="text-cyan-400">Telegram</span>
                </h2>
                <p className="text-base md:text-lg text-white/50 mb-6 md:mb-8">
                  Mini App внутри Telegram. Не нужно скачивать приложения или регистрироваться.
                </p>
                
                <ul className="space-y-4 mb-8">
                  {['Встроенный мессенджер', 'Уведомления о заявках', 'Проверка постов', 'Календарь публикаций'].map((item, i) => (
                    <ScrollSection key={i} delay={i * 0.1}>
                      <li className="flex items-center gap-3 justify-center lg:justify-start">
                        <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                          <Star className="w-3 h-3 text-green-400" />
                        </div>
                        <span className="text-white/70">{item}</span>
                      </li>
                    </ScrollSection>
                  ))}
                </ul>

                <Link
                  href="https://t.me/influenta_bot"
                  target="_blank"
                  className="inline-flex px-8 py-4 bg-white text-black rounded-2xl font-semibold hover:bg-white/90 transition-all hover-lift"
                >
                  Открыть в Telegram
                </Link>
              </ScrollSection>

              {/* Phone mockup */}
              <ScrollSection className="flex-1 flex justify-center">
                <div className="w-[240px] md:w-[280px] bg-zinc-900 rounded-[2.5rem] md:rounded-[3rem] p-2 md:p-3 border border-white/10 shadow-2xl shadow-blue-500/10 float">
                  <div className="w-24 h-6 bg-black rounded-full mx-auto mb-2" />
                  <div className="aspect-[9/18] bg-gradient-to-b from-[#0a0a0a] to-[#050505] rounded-[2rem] md:rounded-[2.5rem] p-4 space-y-3 overflow-hidden">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500" />
                      <div>
                        <div className="w-20 h-3 bg-white/20 rounded" />
                        <div className="w-14 h-2 bg-white/10 rounded mt-1" />
                      </div>
                    </div>
                    
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                      <div className="flex items-end gap-1 h-16">
                        {[40, 65, 45, 80, 55, 70, 90].map((h, i) => (
                          <div key={i} className="flex-1 bg-gradient-to-t from-blue-600 to-cyan-400 rounded-t" style={{ height: `${h}%` }} />
                        ))}
                      </div>
                    </div>
                    
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                        <div className="w-10 h-10 rounded-lg bg-white/10" />
                        <div className="flex-1">
                          <div className="w-20 h-2.5 bg-white/20 rounded" />
                          <div className="w-14 h-2 bg-white/10 rounded mt-1" />
                        </div>
                        <span className="text-green-400 text-xs font-bold">+{i * 4}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollSection>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-20 md:py-32">
          <div className="max-w-2xl mx-auto px-4 md:px-6">
            <ScrollSection className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Частые вопросы</h2>
            </ScrollSection>
            
            <div className="space-y-4">
              {[
                { q: 'Как начать работу?', a: 'Откройте бота @influenta_bot в Telegram. Регистрация меньше минуты.' },
                { q: 'Какая комиссия?', a: 'На старте 0%. Мы зарабатываем только когда зарабатываете вы.' },
                { q: 'Как работает безопасная сделка?', a: 'Средства замораживаются до подтверждения публикации.' },
              ].map((item, i) => (
                <ScrollSection key={i} delay={i * 0.1}>
                  <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover-lift-card">
                    <h3 className="font-semibold mb-2">{item.q}</h3>
                    <p className="text-white/50 text-sm">{item.a}</p>
                  </div>
                </ScrollSection>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            <ScrollSection>
              <div className="relative rounded-3xl overflow-hidden cta-gradient">
                <div className="absolute inset-0 bg-grid-small opacity-[0.03]" />
                
                <div className="relative p-12 md:p-16 text-center">
                  <h2 className="text-4xl md:text-5xl font-bold mb-6">Готовы начать?</h2>
                  <p className="text-xl text-white/70 mb-10 max-w-lg mx-auto">
                    Присоединяйтесь к блогерам и брендам, которые уже используют Influenta.
                  </p>
                  <Link 
                    href="https://t.me/influenta_bot" 
                    target="_blank"
                    className="inline-flex px-10 py-4 bg-white text-black rounded-full font-bold text-lg hover:bg-white/90 transition-all hover-lift"
                  >
                    Запустить бесплатно
                  </Link>
                </div>
              </div>
            </ScrollSection>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative py-12 border-t border-white/10 bg-white/[0.02] backdrop-blur-sm mt-20">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-900/5 pointer-events-none" />
          
          <div className="relative max-w-6xl mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
              {/* Brand */}
              <div className="flex flex-col items-center md:items-start gap-3">
                <div className="flex items-center gap-3 font-bold text-xl">
                  <div className="w-10 h-10 rounded-xl bg-[#0a1929] flex items-center justify-center border border-cyan-400/20 overflow-hidden shadow-glow-sm">
                    <img src="/logo.jpg" alt="Influenta" className="w-6 h-6 object-contain" />
                  </div>
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">Influenta</span>
                </div>
                <p className="text-white/50 text-sm text-center md:text-left max-w-xs">
                  Автоматизированная платформа для эффективной рекламы в Telegram.
                </p>
              </div>

              {/* Links */}
              <div className="flex flex-wrap justify-center gap-8 text-sm font-medium text-white/60">
                <a href="#" className="hover:text-white transition-colors hover-lift">О сервисе</a>
                <a href="#" className="hover:text-white transition-colors hover-lift">Блогерам</a>
                <a href="#" className="hover:text-white transition-colors hover-lift">Рекламодателям</a>
                <a href="#" className="hover:text-white transition-colors hover-lift">Помощь</a>
              </div>
            </div>
            
            {/* Bottom bar */}
            <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/40">
              <div className="flex gap-6">
                <span>© 2025 Influenta</span>
                <a href="#" className="hover:text-white transition-colors">Terms</a>
                <a href="#" className="hover:text-white transition-colors">Privacy</a>
              </div>
              
              <div className="flex items-center gap-2 group cursor-default">
                <span className="group-hover:text-white/60 transition-colors">Design & Dev</span>
                <span className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-white/60 group-hover:bg-blue-500/10 group-hover:border-blue-500/20 group-hover:text-blue-400 transition-all">
                  🪚 by YNCHQ
                </span>
              </div>
            </div>
          </div>
        </footer>
      </main>

      {/* Pure CSS animations */}
      <style jsx global>{`
        .blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          mix-blend-mode: screen;
        }
        .blob-1 {
          top: 0;
          left: 25%;
          width: 400px;
          height: 400px;
          background: #3b82f6;
          animation: float 20s ease-in-out infinite;
        }
        .blob-2 {
          bottom: 25%;
          right: 25%;
          width: 350px;
          height: 350px;
          background: #8b5cf6;
          animation: float 25s ease-in-out infinite reverse;
        }
        .blob-3 {
          top: 50%;
          left: 50%;
          width: 300px;
          height: 300px;
          background: #06b6d4;
          animation: float 30s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -30px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        
        .bg-grid {
          background-image: 
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 60px 60px;
        }
        .bg-grid-small {
          background-image: 
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px);
          background-size: 32px 32px;
        }
        .bg-gradient-radial {
          background: radial-gradient(ellipse at center, transparent 0%, #030303 70%);
        }
        
        .text-gradient {
          background: linear-gradient(135deg, #60a5fa 0%, #22d3ee 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .cta-gradient {
          background: linear-gradient(135deg, #1e3a8a 0%, #581c87 100%);
        }
        
        .pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        .bounce {
          animation: bounce 1.5s ease-in-out infinite;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(8px); }
        }
        
        .float {
          animation: float-simple 6s ease-in-out infinite;
        }
        @keyframes float-simple {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        .shadow-glow {
          box-shadow: 0 0 60px rgba(34, 211, 238, 0.4);
        }
        .shadow-glow-sm {
          box-shadow: 0 0 20px rgba(34, 211, 238, 0.2);
        }
        
        .hover-lift {
          transition: transform 0.2s ease;
        }
        .hover-lift:hover {
          transform: translateY(-2px);
        }
        
        .hover-lift-card {
          transition: all 0.3s ease;
        }
        .hover-lift-card:hover {
          transform: translateY(-8px);
          border-color: rgba(59, 130, 246, 0.3);
          background: rgba(255, 255, 255, 0.03);
        }
      `}</style>
    </>
  )
}
