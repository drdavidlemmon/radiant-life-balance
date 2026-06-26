import { AreaData } from '@/types'

export const areasData: Record<string, AreaData> = {
  mind: {
    key: 'mind',
    name: 'Mind',
    tagline: 'Unlock your full cognitive potential',
    description: 'Your mind is your most powerful asset. From razor-sharp focus to extraordinary memory and accelerated learning, unleashing the full power of your intellect gives you an extraordinary advantage in every area of life.',
    color: '#f97316',
    gradient: 'from-purple-50 to-white',
    emoji: '🧠',
    subcategories: [
      {
        id: 'learning',
        name: 'Learning & Skill Development',
        description: 'Master the science of accelerated learning and rapid skill acquisition to grow faster in any area.',
        icon: '📚',
        articles: [
          { id: 'ul1', title: 'The Science of Accelerated Learning: How to Learn Faster Than You Ever Thought Possible', excerpt: "The way most of us were taught to learn in school is scientifically wrong. Here's what cognitive neuroscience actually says about learning efficiently and permanently.", readTime: '10 min read', tags: ['learning', 'memory', 'cognitive science'] },
          { id: 'ul2', title: 'How to Build a Personal Learning System That Makes Knowledge Stick', excerpt: "Information is not knowledge. Build the capture-process-organize-retrieve system that turns everything you read, hear, and experience into accessible, actionable wisdom.", readTime: '10 min read', tags: ['learning system', 'PKM', 'knowledge management'] },
          { id: 'ul3', title: 'The Feynman Technique: Learn Anything by Teaching It', excerpt: "If you can't explain it simply, you don't understand it yet. Nobel laureate Richard Feynman's four-step technique reveals the gaps in your understanding — and fills them.", readTime: '8 min read', tags: ['Feynman technique', 'deep learning', 'understanding'] },
        ],
        quotes: [
          { text: 'Live as if you were to die tomorrow. Learn as if you were to live forever.', author: 'Mahatma Gandhi' },
          { text: 'An investment in knowledge pays the best interest.', author: 'Benjamin Franklin' },
        ],
        products: [
          { id: 'lp1', name: 'Ultralearning: Master Hard Skills, Outsmart the Competition, and Accelerate Your Career', type: 'book', description: "Scott Young's proven methodology for self-directed, intense learning projects that help you master skills in record time — from programming to languages.", price: '$18.99', affiliateUrl: '#', rating: 4.7 },
          { id: 'lp2', name: 'Learning How to Learn (Coursera)', type: 'course', description: "The world's most popular online course, taught by Dr. Barbara Oakley. Science-backed techniques to improve how you learn anything, forever.", price: 'Free', affiliateUrl: '#', rating: 4.9 },
          { id: 'lp3', name: 'Make It Stick: The Science of Successful Learning', type: 'book', description: 'Cognitive scientists reveal the most effective learning strategies, many of which go against conventional wisdom about studying.', price: '$16.99', affiliateUrl: '#', rating: 4.6 },
        ],
      },
      {
        id: 'memory',
        name: 'Memory & Retention',
        description: 'Build an extraordinary memory using proven techniques from the world\'s greatest memory champions.',
        icon: '🗄️',
        articles: [
          { id: 'mem1', title: 'The Memory Palace: How to Never Forget Anything Again', excerpt: 'The technique used by ancient Greeks and modern memory champions — 2,500 years old and still unbeaten. Learn to convert any information into unforgettable spatial memories.', readTime: '9 min read', tags: ['memory palace', 'mnemonics', 'memory techniques'] },
          { id: 'mem2', title: 'Spaced Repetition: The Science Behind Long-Term Memory', excerpt: 'Hermann Ebbinghaus mapped the forgetting curve in the 1880s. The algorithm built from his research is still the most effective tool for permanent retention ever created.', readTime: '9 min read', tags: ['spaced repetition', 'Anki', 'long-term memory'] },
          { id: 'mem3', title: 'How Nutrition and Sleep Supercharge Your Memory', excerpt: 'Memory consolidation happens during sleep, not while you are awake. Your brain requires specific nutrients to form and strengthen the synaptic connections that are memory.', readTime: '9 min read', tags: ['memory nutrition', 'sleep consolidation', 'omega-3'] },
        ],
        quotes: [
          { text: 'Memory is the treasury and guardian of all things.', author: 'Marcus Tullius Cicero' },
          { text: 'The palest ink is better than the best memory.', author: 'Chinese Proverb' },
        ],
        products: [
          { id: 'mp1', name: 'Moonwalking with Einstein: The Art and Science of Remembering Everything', type: 'book', description: "Joshua Foer's journey from science reporter to US Memory Champion — packed with actionable memory techniques anyone can use.", price: '$16.99', affiliateUrl: '#', rating: 4.5 },
          { id: 'mp2', name: 'Anki — Spaced Repetition Software', type: 'course', description: 'The most powerful free flashcard system using AI-based spaced repetition algorithms to make memory stick for life. Used by medical students and language learners worldwide.', price: 'Free', affiliateUrl: '#', rating: 4.8 },
        ],
      },
      {
        id: 'speed-reading',
        name: 'Speed Reading',
        description: 'Double or triple your reading speed while improving comprehension to consume more knowledge in less time.',
        icon: '⚡',
        articles: [
          { id: 'sr1', title: 'Deep Work: How to Reclaim Your Ability to Think Deeply', excerpt: "Your attention is being systematically fragmented by systems engineered to profit from it. Here's why deep focus is the most valuable cognitive skill of our time — and how to rebuild it.", readTime: '10 min read', tags: ['deep work', 'focus', 'attention'] },
          { id: 'sr2', title: 'How to Eliminate Distraction and Reclaim Your Attention', excerpt: 'Willpower is unreliable. Environmental design is not. Learn the science of attention architecture and the specific protocols that make focus the path of least resistance.', readTime: '9 min read', tags: ['distraction', 'attention', 'productivity'] },
          { id: 'sr3', title: 'Natural Ways to Sharpen Focus and Concentration', excerpt: 'Before reaching for a stimulant, address the upstream causes of poor focus: sleep, blood sugar, nutrients, and dopamine dysregulation. Then add targeted natural support.', readTime: '9 min read', tags: ['focus supplements', 'L-theanine', 'concentration'] },
        ],
        quotes: [
          { text: 'Not all readers are leaders, but all leaders are readers.', author: 'Harry S. Truman' },
          { text: 'Reading is to the mind what exercise is to the body.', author: 'Joseph Addison' },
        ],
        products: [
          { id: 'srp1', name: 'The Speed Reading Book', type: 'book', description: "Tony Buzan's comprehensive guide to doubling or tripling reading speed while maintaining or improving comprehension — the classic in the field.", price: '$15.99', affiliateUrl: '#', rating: 4.3 },
          { id: 'srp2', name: 'Spreeder Speed Reading App', type: 'course', description: 'The most popular speed reading training app, used by over 5 million people. Includes RSVP training, comprehension tests, and progress tracking.', price: '$9.99/month', affiliateUrl: '#', rating: 4.2 },
        ],
      },
      {
        id: 'focus',
        name: 'Focus & Deep Work',
        description: 'Cultivate the superpower of deep, sustained focus in a world ruthlessly designed to distract you.',
        icon: '🎯',
        articles: [
          { id: 'fw1', title: 'The Pomodoro Technique 2.0: How to Use Time Blocks to 10x Your Output', excerpt: 'The classic 25-minute focus block has been refined by modern neuroscience. Here is how to apply time-blocking for maximum deep work output without burning out.', readTime: '8 min read', tags: ['Pomodoro', 'time blocking', 'productivity'] },
          { id: 'fw2', title: 'Flow State: How to Enter the Zone on Demand', excerpt: 'Flow is not luck. It has specific neurological preconditions that can be deliberately engineered. Here is the research on entering the most productive state available to a human mind.', readTime: '10 min read', tags: ['flow state', 'optimal performance', 'focus'] },
          { id: 'fw3', title: 'Digital Minimalism: Reclaiming Your Mind from the Attention Economy', excerpt: 'Social media, notifications, and algorithmic feeds are engineered to colonize your attention permanently. A philosophy of intentional technology use returns it to you.', readTime: '9 min read', tags: ['digital minimalism', 'social media', 'intentional living'] },
        ],
        quotes: [
          { text: 'The successful warrior is the average man, with laser-like focus.', author: 'Bruce Lee' },
          { text: 'Concentrate all your thoughts upon the work at hand. The sun\'s rays do not burn until brought to a focus.', author: 'Alexander Graham Bell' },
        ],
        products: [
          { id: 'fp1', name: 'Deep Work: Rules for Focused Success in a Distracted World', type: 'book', description: "Cal Newport's masterpiece on the power of concentrated focus and how to cultivate it deliberately in our age of endless distraction.", price: '$17.99', affiliateUrl: '#', rating: 4.8 },
          { id: 'fp2', name: 'Focus Factor Brain Health Supplement', type: 'supplement', description: "America's #1 selling brain health supplement — supports memory, concentration, and focus with a clinically studied formula containing 40 key nutrients.", price: '$29.99', affiliateUrl: '#', rating: 4.1 },
          { id: 'fp3', name: 'Brain.fm — AI Music for Focus', type: 'course', description: 'Scientifically designed music that puts your brain into states of deep focus, relaxation, or sleep within minutes using neural phase-locking technology.', price: '$6.99/month', affiliateUrl: '#', rating: 4.5 },
        ],
      },
      {
        id: 'creativity',
        name: 'Creativity',
        description: 'Unlock your creative potential and develop the imaginative thinking that drives innovation and self-expression.',
        icon: '⚖️',
        articles: [
          { id: 'ct1', title: 'How to Unlock the Creative Genius Living Inside You', excerpt: 'Creativity is not a talent distributed at birth to a lucky few. It is a cognitive skill that can be understood, practiced, and systematically cultivated by anyone.', readTime: '10 min read', tags: ['creativity', 'creative thinking', 'innovation'] },
          { id: 'ct2', title: 'The Creative Habit: How to Make Inspiration Show Up on Demand', excerpt: "Professional creatives don't wait for inspiration. They show up on schedule and build the conditions for creativity to emerge.", readTime: '9 min read', tags: ['creative habit', 'creative practice', 'inspiration'] },
          { id: 'ct3', title: 'Thinking Differently: Creative Problem Solving for Everyday Life', excerpt: 'The most important problems you face require creative thought. Six proven techniques to generate better solutions to any challenge you face.', readTime: '9 min read', tags: ['problem solving', 'creative thinking', 'innovation'] },
        ],
        quotes: [
          { text: 'The first principle is that you must not fool yourself — and you are the easiest person to fool.', author: 'Richard Feynman' },
          { text: 'It is the mark of an educated mind to be able to entertain a thought without accepting it.', author: 'Aristotle' },
        ],
        products: [
          { id: 'ctp1', name: 'Thinking, Fast and Slow', type: 'book', description: "Daniel Kahneman's Nobel Prize-winning insights into the two systems that drive the way we think — an essential guide to understanding your own mind.", price: '$17.00', affiliateUrl: '#', rating: 4.6 },
          { id: 'ctp2', name: 'The Great Mental Models Vol. 1', type: 'book', description: "Shane Parrish's collection of the most powerful mental models from across disciplines — a toolkit for better thinking in any situation.", price: '$22.99', affiliateUrl: '#', rating: 4.7 },
        ],
      },
    ],
    featuredQuotes: [
      { text: 'The mind is not a vessel to be filled, but a fire to be kindled.', author: 'Plutarch' },
      { text: 'Change your thoughts and you change your world.', author: 'Norman Vincent Peale' },
      { text: 'Whatever the mind can conceive and believe, it can achieve.', author: 'Napoleon Hill' },
    ],
  },

  body: {
    key: 'body',
    name: 'Body',
    tagline: 'Build your physical foundation',
    description: 'Your body is your vehicle for experiencing life. When you optimize your physical health through sleep, nutrition, and movement, every other area of life improves dramatically. Physical vitality is the foundation everything else rests upon.',
    color: '#ef4444',
    gradient: 'from-green-50 to-white',
    emoji: '💪',
    subcategories: [
      {
        id: 'sleep',
        name: 'Sleep Optimization',
        description: 'Master the science of sleep to wake up refreshed, think clearly, and perform at your peak every day.',
        icon: '😴',
        articles: [
          { id: 'sl1', title: 'Why Sleep Is Your Most Powerful Healing Tool', excerpt: 'Sleep is the single greatest health intervention available — free, with no prescription required. Here is why this matters at the cellular level and what your body does while you sleep.', readTime: '10 min read', tags: ['sleep', 'health', 'healing'] },
          { id: 'sl2', title: 'The Science of Sleep Cycles: How to Wake Up Refreshed Every Morning', excerpt: 'Understanding your 90-minute sleep architecture is the difference between waking up groggy and genuinely restored. Learn how to time your sleep for peak morning energy.', readTime: '8 min read', tags: ['sleep cycles', 'circadian rhythm', 'morning energy'] },
          { id: 'sl3', title: '7 Natural Sleep Remedies That Actually Work Tonight', excerpt: 'Before reaching for a prescription sleep aid, try these seven evidence-backed natural interventions that restore the biological machinery producing sleep in the first place.', readTime: '9 min read', tags: ['natural sleep', 'magnesium', 'supplements'] },
        ],
        quotes: [
          { text: 'Sleep is the best meditation.', author: 'Dalai Lama' },
          { text: "A good laugh and a long sleep are the best cures in the doctor's book.", author: 'Irish Proverb' },
        ],
        products: [
          { id: 'slp1', name: 'Why We Sleep: Unlocking the Power of Sleep and Dreams', type: 'book', description: "Matthew Walker's revolutionary exploration of sleep — the most important book on the topic and a must-read for anyone who wants to understand and transform their sleep.", price: '$16.99', affiliateUrl: '#', rating: 4.7 },
          { id: 'slp2', name: 'Magnesium Glycinate Sleep Support (400mg)', type: 'supplement', description: 'Highly bioavailable magnesium glycinate supports deep, restorative sleep by calming the nervous system — without the grogginess of traditional sleeping aids.', price: '$24.99', affiliateUrl: '#', rating: 4.6 },
          { id: 'slp3', name: 'Manta Sleep Mask Pro', type: 'physical', description: '100% blackout sleep mask with contoured, adjustable eye cups that block all light for dramatically deeper sleep anywhere, any time.', price: '$39.99', affiliateUrl: '#', rating: 4.5 },
        ],
      },
      {
        id: 'nutrition',
        name: 'Nutrition & Diet',
        description: 'Fuel your body and brain with optimal nutrition for energy, mental clarity, vitality, and longevity.',
        icon: '🥗',
        articles: [
          { id: 'nt1', title: 'Food Is Medicine: How to Eat for Energy, Clarity, and Longevity', excerpt: 'Food communicates directly with your genes, modulates your immune system, and shapes your gut microbiome. Every meal is either a step toward health or away from it.', readTime: '9 min read', tags: ['nutrition', 'anti-inflammatory', 'longevity'] },
          { id: 'nt2', title: 'The Anti-Inflammatory Diet: Reducing Pain and Disease Through Food', excerpt: 'Chronic low-grade inflammation is the underlying driver of heart disease, diabetes, and depression. What you eat is the most direct way to turn it off.', readTime: '10 min read', tags: ['anti-inflammatory', 'chronic disease', 'diet'] },
          { id: 'nt3', title: 'Your Gut Is Your Second Brain: How to Heal Your Microbiome', excerpt: '38 trillion microbes inhabit your gut — synthesizing vitamins, training your immune system, producing 90% of your serotonin. Learn how to nurture them.', readTime: '11 min read', tags: ['gut health', 'microbiome', 'probiotics'] },
        ],
        quotes: [
          { text: 'Let food be thy medicine and medicine be thy food.', author: 'Hippocrates' },
          { text: 'The food you eat can be either the safest and most powerful form of medicine or the slowest form of poison.', author: 'Ann Wigmore' },
        ],
        products: [
          { id: 'ntp1', name: 'Eat to Beat Disease', type: 'book', description: "Dr. William Li's groundbreaking research on how the right foods can activate your body's natural defenses to fight illness, lose weight, and maintain optimal health.", price: '$21.99', affiliateUrl: '#', rating: 4.6 },
          { id: 'ntp2', name: 'Athletic Greens AG1 — Daily Health Drink', type: 'supplement', description: 'The comprehensive all-in-one daily drink with 75 vitamins, minerals, and whole food-sourced ingredients for foundational nutrition and energy.', price: '$79.00/month', affiliateUrl: '#', rating: 4.4 },
          { id: 'ntp3', name: 'Omega-3 Fish Oil (Triple Strength)', type: 'supplement', description: 'High-potency EPA/DHA omega-3s for brain health, heart health, reduced inflammation, and improved mood — the most universally recommended supplement.', price: '$34.99', affiliateUrl: '#', rating: 4.7 },
        ],
      },
      {
        id: 'exercise',
        name: 'Exercise & Fitness',
        description: 'Build strength, endurance, and a body you are proud of through effective, sustainable training.',
        icon: '🏋️',
        articles: [
          { id: 'ex1', title: 'Why Movement Is the Most Underrated Medicine on the Planet', excerpt: 'One intervention simultaneously lowers your risk of heart disease, diabetes, depression, cognitive decline, and 13 cancers. It is free, requires no prescription, and it is called movement.', readTime: '8 min read', tags: ['exercise', 'movement', 'health'] },
          { id: 'ex2', title: 'How to Build a Fitness Habit That Actually Sticks', excerpt: 'Most exercise programs fail because they are built on motivation — a feeling that comes and goes. Here is the behavioral science behind habits that outlast willpower.', readTime: '9 min read', tags: ['habit formation', 'fitness', 'consistency'] },
          { id: 'ex3', title: 'The Minimum Effective Dose: How Little Exercise Do You Actually Need?', excerpt: 'The research is clear: the biggest mortality benefits come from going from nothing to something. Discover the evidence-backed minimum that produces maximum health returns.', readTime: '8 min read', tags: ['HIIT', 'minimal exercise', 'efficiency'] },
        ],
        quotes: [
          { text: "Take care of your body. It's the only place you have to live.", author: 'Jim Rohn' },
          { text: 'Exercise is a celebration of what your body can do. Not a punishment for what you ate.', author: 'Unknown' },
        ],
        products: [
          { id: 'exp1', name: 'Strength Training Anatomy (3rd Edition)', type: 'book', description: "Frédéric Delavier's visually stunning guide showing the exact muscles activated in every exercise — the ultimate training reference used by trainers worldwide.", price: '$22.99', affiliateUrl: '#', rating: 4.8 },
          { id: 'exp2', name: 'Creatine Monohydrate (5g/day)', type: 'supplement', description: 'The single most researched performance supplement in existence. Proven to increase strength, muscle mass, and cognitive performance. Safe and highly effective.', price: '$19.99', affiliateUrl: '#', rating: 4.8 },
        ],
      },
      {
        id: 'specific-conditions',
        name: 'Specific Conditions',
        description: 'Address targeted health concerns with evidence-based strategies tailored to specific physical conditions.',
        icon: '⚖️',
        articles: [
          { id: 'wt1', title: 'Inflammation: The Root Cause Behind Most Modern Diseases', excerpt: 'Heart disease, diabetes, depression, autoimmune conditions — chronic inflammation is the single thread running through all of them. Here is what drives it and how to reduce it.', readTime: '10 min read', tags: ['inflammation', 'chronic disease', 'immune system'] },
          { id: 'wt2', title: 'How to Support Your Body Through Chronic Illness Naturally', excerpt: 'Conventional medicine manages symptoms. Integrative medicine asks why the condition developed and what modifiable factors are keeping it active. Here is the framework.', readTime: '11 min read', tags: ['chronic illness', 'integrative medicine', 'natural healing'] },
          { id: 'wt3', title: 'The Hormone Connection: How Balancing Your Hormones Changes Everything', excerpt: 'Exhausted despite sleeping well? Gaining weight without overeating? Foggy thinking and unstable mood? These are hormonal signals and they are remarkably addressable.', readTime: '12 min read', tags: ['hormones', 'thyroid', 'cortisol'] },
        ],
        quotes: [
          { text: 'Your body can stand almost anything. It\'s your mind you have to convince.', author: 'Unknown' },
          { text: 'Take care of your body. It\'s the only home you\'ll ever have to live in.', author: 'Jim Rohn' },
        ],
        products: [
          { id: 'wtp1', name: 'The Obesity Code: Unlocking the Secrets of Weight Loss', type: 'book', description: "Dr. Jason Fung's revolutionary approach to understanding and treating obesity through insulin control and intermittent fasting. Backed by rigorous science.", price: '$16.99', affiliateUrl: '#', rating: 4.7 },
          { id: 'wtp2', name: 'Glucomannan Appetite Control (Konjac Fiber)', type: 'supplement', description: 'Clinically proven natural fiber supplement that expands in the stomach to promote satiety and reduce caloric intake without hunger or deprivation.', price: '$21.99', affiliateUrl: '#', rating: 4.2 },
        ],
      },
      {
        id: 'energy',
        name: 'Energy & Vitality',
        description: 'Optimize your energy systems for all-day vitality, mental sharpness, and consistently peak performance.',
        icon: '⚡',
        articles: [
          { id: 'en1', title: "Why You're Exhausted: The Real Causes of Low Energy", excerpt: 'Fatigue is the most common complaint in primary care. Normal lab results do not mean optimal function. Here are the six real causes of chronic exhaustion and how to address each.', readTime: '10 min read', tags: ['fatigue', 'energy', 'adrenal health'] },
          { id: 'en2', title: 'Adrenal Fatigue: How to Recognize and Restore Your Energy', excerpt: 'HPA axis dysregulation is real, well-documented, and epidemic. Learn the classic pattern of burnout progression and the evidence-backed protocol for full recovery.', readTime: '11 min read', tags: ['adrenal fatigue', 'HPA axis', 'adaptogens'] },
          { id: 'en3', title: 'The Daily Energy Blueprint: 7 Habits That Power Your Day', excerpt: 'Your daily energy is not determined just by last night of sleep alone — it is the accumulation of dozens of small choices. Here are the seven that matter most, backed by science.', readTime: '9 min read', tags: ['daily energy', 'morning routine', 'habits'] },
        ],
        quotes: [
          { text: 'Energy and persistence conquer all things.', author: 'Benjamin Franklin' },
          { text: 'Investing in your health is the best investment you can make.', author: 'Unknown' },
        ],
        products: [
          { id: 'enp1', name: 'CoQ10 + PQQ Advanced Energy Complex', type: 'supplement', description: 'Advanced mitochondrial support formula combining CoQ10 and PQQ for sustained cellular energy production, mental clarity, and cardiovascular protection.', price: '$34.99', affiliateUrl: '#', rating: 4.4 },
          { id: 'enp2', name: 'Boundless: Upgrade Your Brain, Optimize Your Body', type: 'book', description: "Ben Greenfield's comprehensive biohacking guide covering every strategy to maximize physical and mental performance, from sleep to supplements to exercise.", price: '$35.00', affiliateUrl: '#', rating: 4.5 },
        ],
      },
    ],
    featuredQuotes: [
      { text: 'Physical fitness is not only one of the most important keys to a healthy body, it is the basis of dynamic and creative intellectual activity.', author: 'John F. Kennedy' },
      { text: 'The groundwork for all happiness is good health.', author: 'Leigh Hunt' },
      { text: 'A healthy outside starts from the inside.', author: 'Robert Urich' },
    ],
  },

  spirit: {
    key: 'spirit',
    name: 'Spirit',
    tagline: 'Connect with your deepest self',
    description: 'The spiritual dimension gives life its depth, texture, and meaning. When you nurture your inner world through reflection, gratitude, and connection to something greater than yourself, you discover the peace and purpose that makes everything else worthwhile.',
    color: '#eab308',
    gradient: 'from-yellow-50 to-white',
    emoji: '✨',
    subcategories: [
      {
        id: 'meditation',
        name: 'Meditation & Mindfulness',
        description: 'Develop a powerful, consistent meditation practice that reduces stress, enhances focus, and deepens self-awareness.',
        icon: '🧘',
        articles: [
          { id: 'med1', title: 'How 10 Minutes of Daily Meditation Literally Changes Your Brain', excerpt: "Neuroscientists have confirmed that meditation rewires the brain in measurable ways — thickening the prefrontal cortex and shrinking the amygdala. Here's exactly what changes.", readTime: '9 min read', tags: ['meditation', 'neuroscience', 'mindfulness'] },
          { id: 'med2', title: 'The 5 Most Effective Meditation Styles (And Which Is Right for You)', excerpt: "From Vipassana to loving-kindness to transcendental meditation — each style has unique benefits. Here's how to choose the one that fits your goals and personality.", readTime: '11 min read', tags: ['meditation styles', 'beginners', 'practice'] },
        ],
        quotes: [
          { text: "Meditation is not a way of making your mind quiet. It's a way of entering into the quiet that's already there.", author: 'Deepak Chopra' },
          { text: 'The quieter you become, the more you can hear.', author: 'Ram Dass' },
        ],
        products: [
          { id: 'medp1', name: 'Waking Up: A Guide to Spirituality Without Religion', type: 'book', description: 'Sam Harris explores the practice of meditation and mindfulness from a neuroscientific perspective, free from religious dogma. A modern classic.', price: '$17.99', affiliateUrl: '#', rating: 4.6 },
          { id: 'medp2', name: 'Headspace Plus — Guided Meditation App', type: 'course', description: "World-class guided meditation and mindfulness with hundreds of sessions for sleep, focus, stress, anxiety, and relationships. Trusted by 70+ million people.", price: '$12.99/month', affiliateUrl: '#', rating: 4.7 },
        ],
      },
      {
        id: 'happiness',
        name: 'Happiness',
        description: 'True happiness is not a destination — it is a daily practice. Learn the science and the spiritual wisdom behind lasting joy, contentment, and flourishing.',
        icon: '😊',
        articles: [
          { id: 'hap1', title: 'The Science of Happiness: What Actually Makes People Happy', excerpt: 'Decades of positive psychology research have overturned what most people assume brings happiness. The answers are both surprising and immediately actionable.', readTime: '10 min read', tags: ['happiness', 'positive psychology', 'wellbeing'] },
          { id: 'hap2', title: 'The Happiness Habits: 7 Daily Practices That Rewire Your Brain for Joy', excerpt: 'Happiness is not a personality trait — it is a skill. Neuroscience now shows exactly which daily practices produce measurable, lasting increases in wellbeing.', readTime: '9 min read', tags: ['happiness habits', 'neuroscience', 'joy'] },
          { id: 'hap3', title: 'Finding Joy in the Ordinary: How to Stop Waiting to Be Happy', excerpt: 'Most people live in a state of deferred happiness — waiting for conditions to be right. Here is how to access genuine joy in your everyday life, starting today.', readTime: '8 min read', tags: ['joy', 'presence', 'contentment'] },
        ],
        quotes: [
          { text: 'Happiness is not something ready-made. It comes from your own actions.', author: 'Dalai Lama' },
          { text: 'The most important thing is to enjoy your life — to be happy — it is all that matters.', author: 'Audrey Hepburn' },
        ],
        products: [
          { id: 'happ1', name: 'The Happiness Advantage', type: 'book', description: "Shawn Achor's research-backed guide to how a positive brain fuels success in work and life — and the seven principles that activate happiness as a competitive edge.", price: '$16.99', affiliateUrl: '#', rating: 4.7 },
          { id: 'happ2', name: 'The Art of Happiness', type: 'book', description: 'The Dalai Lama and psychiatrist Howard Cutler explore the foundations of enduring happiness — blending ancient wisdom with modern psychology in a timeless conversation.', price: '$15.99', affiliateUrl: '#', rating: 4.7 },
        ],
      },
      {
        id: 'gratitude',
        name: 'Gratitude & Positivity',
        description: 'Harness the transformative power of gratitude to rewire your brain for joy, resilience, and abundance.',
        icon: '🙏',
        articles: [
          { id: 'gr1', title: 'The Science of Gratitude: How Thankfulness Literally Changes Your Brain', excerpt: 'Research in positive psychology confirms that a regular gratitude practice produces measurable changes in brain activity, significantly boosting happiness, health, and relationships.', readTime: '8 min read', tags: ['gratitude', 'positive psychology', 'happiness'] },
          { id: 'gr2', title: '7 Gratitude Practices More Powerful Than a Standard Gratitude Journal', excerpt: "The standard 'three things I'm grateful for' exercise has benefits, but these deeper practices produce dramatically stronger results in happiness research.", readTime: '9 min read', tags: ['gratitude', 'practices', 'happiness'] },
        ],
        quotes: [
          { text: 'Gratitude is not only the greatest of virtues, but the parent of all others.', author: 'Cicero' },
          { text: 'When you are grateful, fear disappears and abundance appears.', author: 'Tony Robbins' },
        ],
        products: [
          { id: 'grp1', name: 'The Five Minute Journal', type: 'physical', description: "The world's most popular gratitude journal — a beautifully designed daily practice proven to increase positivity, reduce anxiety, and start and end every day with intention.", price: '$29.99', affiliateUrl: '#', rating: 4.8 },
          { id: 'grp2', name: 'The Gratitude Diaries', type: 'book', description: "Janice Kaplan's year-long experiment trying to live more gratefully — and the surprising, research-backed ways it transformed her life, relationships, and health.", price: '$15.99', affiliateUrl: '#', rating: 4.4 },
        ],
      },
      {
        id: 'forgiveness',
        name: 'Forgiveness',
        description: 'Release resentment and reclaim your peace through the transformative practice of forgiveness — of others and yourself.',
        icon: '☮️',
        articles: [
          { id: 'ip1', title: 'The Stoic Path to Inner Peace: Ancient Wisdom for Modern Chaos', excerpt: 'Stoic philosophy offers timeless, practical tools for maintaining equanimity in the face of whatever challenges life throws at you. The ancient wisdom is remarkably modern.', readTime: '12 min read', tags: ['stoicism', 'inner peace', 'philosophy'] },
          { id: 'ip2', title: 'Emotional Regulation: The Science of Calming Your Nervous System', excerpt: 'Your nervous system has a fast lane and a slow lane. Learning to shift between them on command is the foundation of emotional intelligence and inner stability.', readTime: '10 min read', tags: ['emotional regulation', 'nervous system', 'calm'] },
        ],
        quotes: [
          { text: 'Peace is the result of retraining your mind to process life as it is, rather than as you think it should be.', author: 'Wayne Dyer' },
          { text: 'You have power over your mind — not outside events. Realize this, and you will find strength.', author: 'Marcus Aurelius' },
        ],
        products: [
          { id: 'ipp1', name: 'The Power of Now: A Guide to Spiritual Enlightenment', type: 'book', description: "Eckhart Tolle's transformational guide to living in the present moment and freeing yourself from the relentless tyranny of the thinking mind. A modern spiritual masterpiece.", price: '$15.99', affiliateUrl: '#', rating: 4.7 },
          { id: 'ipp2', name: 'Meditations by Marcus Aurelius', type: 'book', description: "The private reflections of Rome's philosopher-emperor — written for himself, not for publication — remain the most practical guide to inner peace ever written.", price: '$9.99', affiliateUrl: '#', rating: 4.9 },
        ],
      },
      {
        id: 'service',
        name: 'Service',
        description: 'Find meaning and fulfillment through giving back — acts of service that elevate both the giver and the recipient.',
        icon: '🕯️',
        articles: [
          { id: 'sp1', title: 'Building a Morning Ritual That Feeds Your Soul', excerpt: "The most consistently fulfilled and grounded people often credit a morning ritual as the cornerstone of their inner life. Here's how to build one that truly works.", readTime: '7 min read', tags: ['morning ritual', 'spiritual practice', 'habits'] },
          { id: 'sp2', title: 'Nature as Medicine: The Research on Awe, Wonder, and Transcendence', excerpt: "Science is confirming what mystics always knew: spending time in nature, especially in awe-inspiring settings, produces profound effects on mental health and spiritual well-being.", readTime: '8 min read', tags: ['nature', 'awe', 'well-being'] },
        ],
        quotes: [
          { text: 'Almost everything will work again if you unplug it for a few minutes, including you.', author: 'Anne Lamott' },
          { text: 'Your sacred space is where you can find yourself over and over again.', author: 'Joseph Campbell' },
        ],
        products: [
          { id: 'spp1', name: 'The Untethered Soul: The Journey Beyond Yourself', type: 'book', description: "Michael Singer's profound exploration of consciousness, spiritual awakening, and the path to inner freedom — one of the most beloved spiritual books of the modern era.", price: '$16.99', affiliateUrl: '#', rating: 4.8 },
          { id: 'spp2', name: 'Insight Timer — Free Meditation App', type: 'course', description: "The world's largest free library of guided meditations with over 100,000 sessions, plus a community of 25 million meditators worldwide.", price: 'Free', affiliateUrl: '#', rating: 4.7 },
        ],
      },
    ],
    featuredQuotes: [
      { text: 'The spiritual life does not remove us from the world but leads us deeper into it.', author: 'Henri J.M. Nouwen' },
      { text: 'You are not a drop in the ocean. You are the entire ocean in a drop.', author: 'Rumi' },
      { text: 'The soul always knows what to do to heal itself. The challenge is to silence the mind.', author: 'Caroline Myss' },
    ],
  },

  relationships: {
    key: 'relationships',
    name: 'Relationships',
    tagline: 'Build deep, meaningful connections',
    description: 'At the end of life, relationships are what matter most. The quality of your connections with others determines your happiness, success, and sense of belonging more than virtually any other factor. Invest here wisely.',
    color: '#3b82f6',
    gradient: 'from-red-50 to-white',
    emoji: '❤️',
    subcategories: [
      {
        id: 'romantic',
        name: 'Romantic Partnerships',
        description: 'Build and maintain a deeply fulfilling, passionate, and lasting romantic relationship.',
        icon: '💑',
        articles: [
          { id: 'rom1', title: "The 4 Horsemen: John Gottman's Predictors of Relationship Failure", excerpt: "After studying thousands of couples over 40 years, Dr. John Gottman identified four specific communication patterns that predict relationship breakdown with 93% accuracy.", readTime: '11 min read', tags: ['relationships', 'communication', 'couples'] },
          { id: 'rom2', title: 'The 5 Love Languages: Why Your Partner Feels Unloved (And You Have No Idea)', excerpt: "Gary Chapman's discovery that people express and receive love in five fundamentally different ways explains more relationship friction than almost any other insight.", readTime: '9 min read', tags: ['love languages', 'communication', 'intimacy'] },
        ],
        quotes: [
          { text: 'The best thing to hold onto in life is each other.', author: 'Audrey Hepburn' },
          { text: 'A great marriage is not when the "perfect couple" comes together. It is when an imperfect couple learns to enjoy their differences.', author: 'Dave Meurer' },
        ],
        products: [
          { id: 'romp1', name: 'The Seven Principles for Making Marriage Work', type: 'book', description: "John Gottman's research-based guide to building a lasting, fulfilling partnership — backed by 40 years of scientific study of thousands of couples.", price: '$17.00', affiliateUrl: '#', rating: 4.8 },
          { id: 'romp2', name: 'Hold Me Tight: Seven Conversations for a Lifetime of Love', type: 'book', description: "Dr. Sue Johnson's emotionally focused couples therapy transformed into a powerful self-help guide for understanding and deepening your romantic bond.", price: '$16.99', affiliateUrl: '#', rating: 4.7 },
        ],
      },
      {
        id: 'family',
        name: 'Family Bonds',
        description: 'Strengthen the family connections that form the deepest foundation of your life and legacy.',
        icon: '👨‍👩‍👧‍👦',
        articles: [
          { id: 'fam1', title: 'The Lost Art of Family Dinners: Why Eating Together Matters More Than You Think', excerpt: 'Research consistently shows that families who eat together regularly have children with better academic performance, emotional health, and significantly lower risk of substance abuse.', readTime: '7 min read', tags: ['family', 'connection', 'rituals'] },
          { id: 'fam2', title: 'Family Meetings: The Simple Ritual That Transforms Family Culture', excerpt: "Highly functional families — from the Obamas to top executives — share one surprising habit: a regular family meeting. Here's exactly how to run one.", readTime: '8 min read', tags: ['family', 'communication', 'rituals'] },
        ],
        quotes: [
          { text: "Family is not an important thing. It's everything.", author: 'Michael J. Fox' },
          { text: 'In family life, love is the oil that eases friction, the cement that binds closer together, and the music that brings harmony.', author: 'Friedrich Nietzsche' },
        ],
        products: [
          { id: 'famp1', name: 'The Whole-Brain Child: 12 Revolutionary Strategies to Nurture Your Child\'s Developing Mind', type: 'book', description: "Daniel Siegel and Tina Payne Bryson's neuroscience-based approach to raising emotionally intelligent, resilient children while strengthening your relationship.", price: '$15.99', affiliateUrl: '#', rating: 4.7 },
          { id: 'famp2', name: 'The Power of Moments: Why Certain Experiences Have Extraordinary Impact', type: 'book', description: "Chip and Dan Heath show how to intentionally create the defining moments that deepen family bonds and become treasured memories forever.", price: '$17.00', affiliateUrl: '#', rating: 4.6 },
        ],
      },
      {
        id: 'friendship',
        name: 'Friendship & Social Circle',
        description: 'Cultivate deep, nourishing friendships and a thriving social community that enriches your life.',
        icon: '🤝',
        articles: [
          { id: 'fr1', title: 'The Friendship Recession: Why Adults Are Struggling to Make Friends', excerpt: 'Adult friendship has become remarkably difficult in modern society. Understanding why — and exactly what to do about it — could completely transform your social world.', readTime: '12 min read', tags: ['friendship', 'social life', 'connection'] },
          { id: 'fr2', title: 'The Harvard Study of Adult Development: The #1 Predictor of a Happy Life', excerpt: "After 80 years following hundreds of men from youth to old age, Harvard researchers found one thing predicted happiness and health better than anything else: relationship quality.", readTime: '10 min read', tags: ['friendship', 'happiness', 'research'] },
        ],
        quotes: [
          { text: 'A real friend is one who walks in when the rest of the world walks out.', author: 'Walter Winchell' },
          { text: 'Friendship is the only cement that will ever hold the world together.', author: 'Woodrow Wilson' },
        ],
        products: [
          { id: 'frp1', name: 'Platonic: How the Science of Attachment Can Help You Make—and Keep—Friends', type: 'book', description: "Dr. Marisa Franco's evidence-based guide to forming deep, meaningful friendships as an adult — addressing the specific challenges of modern friendship.", price: '$18.99', affiliateUrl: '#', rating: 4.6 },
          { id: 'frp2', name: 'How to Win Friends and Influence People', type: 'book', description: "Dale Carnegie's classic — still the definitive guide to building genuine rapport, making people feel valued, and creating lasting, meaningful connections.", price: '$15.99', affiliateUrl: '#', rating: 4.8 },
        ],
      },
      {
        id: 'communication',
        name: 'Communication Skills',
        description: 'Master the art and science of human communication to connect more deeply and influence more positively.',
        icon: '💬',
        articles: [
          { id: 'com1', title: 'The Most Important Communication Skill Nobody Teaches You', excerpt: 'Most communication training focuses on speaking persuasively. The actual superpower — deep, active listening — is almost never taught, yet it transforms every relationship it touches.', readTime: '9 min read', tags: ['communication', 'listening', 'social skills'] },
          { id: 'com2', title: 'Nonviolent Communication: How to Say Hard Things Without Starting a War', excerpt: "Marshall Rosenberg's NVC framework — observing without judging, expressing feelings and needs, making requests — is the most powerful communication system ever developed.", readTime: '11 min read', tags: ['NVC', 'communication', 'conflict'] },
        ],
        quotes: [
          { text: 'The biggest communication problem is we do not listen to understand. We listen to reply.', author: 'Stephen Covey' },
          { text: 'Kind words can be short and easy to speak, but their echoes are truly endless.', author: 'Mother Teresa' },
        ],
        products: [
          { id: 'comp1', name: 'Crucial Conversations: Tools for Talking When Stakes Are High', type: 'book', description: 'The definitive guide to high-stakes conversations — how to speak persuasively and caringly about topics that matter most, rather than avoiding them or escalating.', price: '$17.99', affiliateUrl: '#', rating: 4.7 },
          { id: 'comp2', name: 'Never Split the Difference: Negotiating as if Your Life Depended on It', type: 'book', description: "FBI hostage negotiator Chris Voss reveals the communication and negotiation tactics that work in the highest-stakes situations — applicable to every conversation.", price: '$17.00', affiliateUrl: '#', rating: 4.8 },
        ],
      },
      {
        id: 'networking',
        name: 'Networking & Community',
        description: 'Build a powerful, authentic professional network and sense of community that opens doors.',
        icon: '🌐',
        articles: [
          { id: 'net1', title: 'The New Networking: How to Build Genuine Professional Relationships', excerpt: 'Traditional transactional networking is off-putting and ineffective. Here is how to build authentic professional relationships that create real career opportunities.', readTime: '10 min read', tags: ['networking', 'career', 'relationships'] },
          { id: 'net2', title: 'Building Your Personal Board of Directors', excerpt: "High performers do not go it alone. They curate a small, diverse group of mentors, peers, and advisors. Here's how to identify, approach, and maintain your own board.", readTime: '9 min read', tags: ['mentorship', 'networking', 'success'] },
        ],
        quotes: [
          { text: 'Your network is your net worth.', author: 'Porter Gale' },
          { text: 'You are the average of the five people you spend the most time with.', author: 'Jim Rohn' },
        ],
        products: [
          { id: 'netp1', name: 'Never Eat Alone: And Other Secrets to Success, One Relationship at a Time', type: 'book', description: "Keith Ferrazzi's classic guide to building a powerful network of genuine relationships — not shallow contacts — and how generosity is the ultimate competitive advantage.", price: '$16.99', affiliateUrl: '#', rating: 4.5 },
          { id: 'netp2', name: 'The Art of Gathering: How We Meet and Why It Matters', type: 'book', description: "Priya Parker's guide to intentionally creating transformative gatherings — dinners, meetups, events — that forge genuine community and lasting connection.", price: '$17.00', affiliateUrl: '#', rating: 4.5 },
        ],
      },
    ],
    featuredQuotes: [
      { text: 'The quality of your life is the quality of your relationships.', author: 'Tony Robbins' },
      { text: 'Connection is why we\'re here. It is what gives purpose and meaning to our lives.', author: 'Brené Brown' },
      { text: 'We are wired to connect with others — it is what gives life its deepest meaning.', author: 'Matthew D. Lieberman' },
    ],
  },

  money: {
    key: 'money',
    name: 'Money',
    tagline: 'Create financial freedom and abundance',
    description: 'Financial mastery gives you freedom — freedom to live on your terms, support those you love, and pursue what matters most. Build wealth with intention, strategy, and the right mindset and your money works for you forever.',
    color: '#22c55e',
    gradient: 'from-blue-50 to-white',
    emoji: '💰',
    subcategories: [
      {
        id: 'wealth-mindset',
        name: 'Wealth Mindset',
        description: 'Transform your relationship with money by developing the beliefs and psychology of the truly wealthy.',
        icon: '🧠',
        articles: [
          { id: 'wm1', title: 'The Psychology of Money: Why Smart People Make Poor Financial Decisions', excerpt: 'Your relationship with money is shaped more by psychology, emotion, and unconscious beliefs than by mathematics or intelligence. Understanding this changes everything.', readTime: '12 min read', tags: ['wealth mindset', 'psychology', 'money'] },
          { id: 'wm2', title: 'From Scarcity to Abundance: Rewiring Your Money Mindset', excerpt: "Most financial problems trace back to scarcity thinking — the belief that there is never enough. Here's the neuroscience and the practices to fundamentally shift it.", readTime: '10 min read', tags: ['abundance mindset', 'scarcity', 'beliefs'] },
        ],
        quotes: [
          { text: 'Rich people have small TVs and big libraries, and poor people have small libraries and big TVs.', author: 'Zig Ziglar' },
          { text: "It's not your salary that makes you rich, it's your spending habits.", author: 'Charles A. Jaffe' },
        ],
        products: [
          { id: 'wmp1', name: 'The Psychology of Money: Timeless Lessons on Wealth, Greed, and Happiness', type: 'book', description: "Morgan Housel's masterpiece on the strange ways people think about money — widely considered one of the most important financial books of the decade.", price: '$18.99', affiliateUrl: '#', rating: 4.9 },
          { id: 'wmp2', name: 'Secrets of the Millionaire Mind: Mastering the Inner Game of Wealth', type: 'book', description: "T. Harv Eker reveals how your 'money blueprint' — your unconscious conditioning about money — determines your financial life. Practical tools to change it.", price: '$15.99', affiliateUrl: '#', rating: 4.6 },
        ],
      },
      {
        id: 'budgeting',
        name: 'Budgeting & Saving',
        description: 'Take complete control of your finances with proven strategies that make saving effortless.',
        icon: '📊',
        articles: [
          { id: 'bud1', title: 'The 50/30/20 Budget Rule: The Simple Framework That Actually Works', excerpt: 'This powerful budgeting framework allocates income across needs, wants, and savings — eliminating financial stress without requiring perfection or obsessive tracking.', readTime: '8 min read', tags: ['budgeting', 'saving', 'personal finance'] },
          { id: 'bud2', title: 'How to Automate Your Finances and Never Think About Money Again', excerpt: "Ramit Sethi's automated money system means bills get paid, investments get made, and savings grow — completely on autopilot. Here's the exact setup.", readTime: '10 min read', tags: ['automation', 'saving', 'systems'] },
        ],
        quotes: [
          { text: 'Do not save what is left after spending; instead, spend what is left after saving.', author: 'Warren Buffett' },
          { text: 'Beware of little expenses; a small leak will sink a great ship.', author: 'Benjamin Franklin' },
        ],
        products: [
          { id: 'budp1', name: 'You Need a Budget (YNAB) — Annual Subscription', type: 'course', description: 'The most effective budgeting methodology and software available. Users report saving an average of $600 in their first two months and $6,000 in their first year.', price: '$109/year', affiliateUrl: '#', rating: 4.8 },
          { id: 'budp2', name: 'I Will Teach You to Be Rich (2nd Edition)', type: 'book', description: "Ramit Sethi's practical, no-BS guide to automating your finances, eliminating debt, and building wealth — specifically designed for people who don't want to think about money all day.", price: '$19.99', affiliateUrl: '#', rating: 4.7 },
        ],
      },
      {
        id: 'investing',
        name: 'Investing & Growing Wealth',
        description: 'Make your money work for you through smart, evidence-based investing strategies that build lasting wealth.',
        icon: '📈',
        articles: [
          { id: 'inv1', title: 'Index Funds vs. Individual Stocks: What the Data Shows Over 20 Years', excerpt: 'Over any 20-year period, over 90% of actively managed funds underperform simple low-cost index funds. Here is exactly what this means for your investment strategy.', readTime: '11 min read', tags: ['investing', 'index funds', 'wealth'] },
          { id: 'inv2', title: 'The Power of Compound Interest: Why Starting Today Is Worth More Than Starting Smart Tomorrow', excerpt: 'The mathematics of compound interest is so powerful that starting 10 years earlier with half the money dramatically outperforms waiting for the perfect moment.', readTime: '8 min read', tags: ['compound interest', 'long-term investing', 'wealth'] },
        ],
        quotes: [
          { text: 'The stock market is a device for transferring money from the impatient to the patient.', author: 'Warren Buffett' },
          { text: 'Do not look for the needle in the haystack. Just buy the haystack.', author: 'John Bogle' },
        ],
        products: [
          { id: 'invp1', name: 'The Little Book of Common Sense Investing (Updated Edition)', type: 'book', description: "John Bogle's definitive guide to index fund investing — the strategy that consistently beats 90% of professional investors and builds substantial long-term wealth.", price: '$21.99', affiliateUrl: '#', rating: 4.8 },
          { id: 'invp2', name: 'A Random Walk Down Wall Street (Updated Edition)', type: 'book', description: "Burton Malkiel's classic — the book that convinced a generation of investors to use index funds and ignore the noise of Wall Street predictions.", price: '$18.99', affiliateUrl: '#', rating: 4.7 },
        ],
      },
      {
        id: 'income',
        name: 'Income & Career Growth',
        description: 'Strategically grow your income through career advancement, salary negotiation, and high-value skill development.',
        icon: '💼',
        articles: [
          { id: 'inc1', title: 'How to Negotiate Your Salary: The Scripts That Actually Work', excerpt: 'Most people leave tens of thousands of dollars on the table over their careers by not negotiating. Here are the exact scripts and frameworks used by top earners.', readTime: '10 min read', tags: ['salary', 'negotiation', 'career'] },
          { id: 'inc2', title: 'The High-Income Skills Worth Developing in 2024 and Beyond', excerpt: 'Not all skills are created equal. Here are the skills with the highest income ceiling and fastest time-to-income ratio based on current labor market data.', readTime: '12 min read', tags: ['high income skills', 'career development', 'earning'] },
        ],
        quotes: [
          { text: 'The best investment you can make is an investment in yourself. The more you learn, the more you will earn.', author: 'Warren Buffett' },
          { text: 'Your income is directly related to your philosophy, not the economy.', author: 'Jim Rohn' },
        ],
        products: [
          { id: 'incp1', name: 'Earn 1K — Online Business Course', type: 'course', description: "Ramit Sethi's proven system for starting a profitable side business using your existing skills, from validating your idea to landing your first paying client.", price: '$997', affiliateUrl: '#', rating: 4.7 },
          { id: 'incp2', name: 'The $100 Startup', type: 'book', description: "Chris Guillebeau's research into 1,500 micro-entrepreneurs reveals the patterns behind profitable businesses started with $100 or less and no special training.", price: '$16.99', affiliateUrl: '#', rating: 4.5 },
        ],
      },
      {
        id: 'entrepreneurship',
        name: 'Entrepreneurship',
        description: 'Build a business or income stream that gives you freedom, fulfillment, and financial independence.',
        icon: '🚀',
        articles: [
          { id: 'ent1', title: 'The Lean Startup Method: How to Build a Business That Actually Survives', excerpt: 'Most startups fail not because of bad ideas but because they never validate their assumptions. The Lean Startup methodology systematically reduces this risk.', readTime: '14 min read', tags: ['entrepreneurship', 'startups', 'validation'] },
          { id: 'ent2', title: 'Passive Income Streams: What Actually Works (And What Does Not)', excerpt: "Everyone talks about passive income but few achieve it. Here's an honest, research-backed breakdown of which passive income streams are realistic and which are myths.", readTime: '13 min read', tags: ['passive income', 'business models', 'entrepreneurship'] },
        ],
        quotes: [
          { text: 'The way to get started is to quit talking and begin doing.', author: 'Walt Disney' },
          { text: 'You miss 100% of the shots you do not take.', author: 'Wayne Gretzky' },
        ],
        products: [
          { id: 'entp1', name: 'Zero to One: Notes on Startups, or How to Build the Future', type: 'book', description: "Peter Thiel's unconventional framework for creating businesses that build something genuinely new, rather than competing in crowded existing markets.", price: '$18.99', affiliateUrl: '#', rating: 4.6 },
          { id: 'entp2', name: 'The E-Myth Revisited', type: 'book', description: "Michael Gerber reveals why most small businesses fail and what to do about it — how to build a business that runs without you through systems and processes.", price: '$16.99', affiliateUrl: '#', rating: 4.7 },
        ],
      },
    ],
    featuredQuotes: [
      { text: "Wealth is not about having a lot of money; it's about having a lot of options.", author: 'Chris Rock' },
      { text: "Financial peace isn't the acquisition of stuff. It's learning to live on less than you make.", author: 'Dave Ramsey' },
      { text: 'If you do not find a way to make money while you sleep, you will work until you die.', author: 'Warren Buffett' },
    ],
  },

  direction: {
    key: 'direction',
    name: 'Direction',
    tagline: 'Live with clarity, purpose, and momentum',
    description: "Direction is the compass of your life. When you know where you're going, why you're going there, and exactly how to get there, every day becomes intentional, every decision becomes easier, and progress becomes inevitable.",
    color: '#a855f7',
    gradient: 'from-orange-50 to-white',
    emoji: '🧭',
    subcategories: [
      {
        id: 'goal-setting',
        name: 'Goal Setting & Achievement',
        description: 'Master the science and art of setting compelling goals and creating reliable systems to achieve them.',
        icon: '🎯',
        articles: [
          { id: 'gs1', title: 'Why 92% of People Fail Their Goals — And How to Be in the 8%', excerpt: 'Most goal-setting fails not from lack of motivation but from fundamentally flawed strategy. Here is what research consistently shows actually produces results.', readTime: '11 min read', tags: ['goals', 'achievement', 'success'] },
          { id: 'gs2', title: 'OKRs: The Goal System Used by Google, Intel, and Every High-Performing Team', excerpt: "Objectives and Key Results — the goal framework that helped Google grow from 40 to 60,000 employees — can transform your personal productivity and achievement.", readTime: '9 min read', tags: ['OKRs', 'goal system', 'productivity'] },
        ],
        quotes: [
          { text: 'A goal without a plan is just a wish.', author: 'Antoine de Saint-Exupéry' },
          { text: 'People with goals succeed because they know where they are going.', author: 'Earl Nightingale' },
        ],
        products: [
          { id: 'gsp1', name: 'The 12 Week Year: Get More Done in 12 Weeks than Others Do in 12 Months', type: 'book', description: "Brian Moran and Michael Lennington's revolutionary planning system that creates urgency and dramatically accelerates results by compressing your year into 12 weeks.", price: '$18.99', affiliateUrl: '#', rating: 4.7 },
          { id: 'gsp2', name: 'Full Focus Planner (Quarterly)', type: 'physical', description: "Michael Hyatt's beautifully designed quarterly planner specifically engineered for goal achievement, daily intentionality, and building the habits that move you forward.", price: '$49.99', affiliateUrl: '#', rating: 4.6 },
        ],
      },
      {
        id: 'life-vision',
        name: 'Life Vision & Purpose',
        description: "Create a compelling vision for your life that pulls you forward with excitement and energy every single day.",
        icon: '🌅',
        articles: [
          { id: 'lv1', title: 'How to Create a Life Vision That Actually Changes Your Life', excerpt: "A powerful life vision is more than a bucket list. It's a richly detailed, emotionally compelling picture of your ideal future that quietly programs your subconscious mind for success.", readTime: '13 min read', tags: ['vision', 'purpose', 'life design'] },
          { id: 'lv2', title: 'Your Personal Mission Statement: Why Every Great Life Has One', excerpt: 'The most intentional, fulfilled people — from Steve Jobs to Oprah Winfrey — all had or have personal mission statements that guided every major decision they made.', readTime: '8 min read', tags: ['mission statement', 'values', 'purpose'] },
        ],
        quotes: [
          { text: 'Create the highest, grandest vision possible for your life, because you become what you believe.', author: 'Oprah Winfrey' },
          { text: 'The greatest tragedy is not death, but a life without purpose.', author: 'Myles Munroe' },
        ],
        products: [
          { id: 'lvp1', name: 'Designing Your Life: How to Build a Well-Lived, Joyful Life', type: 'book', description: "Stanford professors Bill Burnett and Dave Evans apply design thinking principles to the challenge of building a deeply meaningful, uniquely yours life.", price: '$17.99', affiliateUrl: '#', rating: 4.5 },
          { id: 'lvp2', name: 'Best Self Journal', type: 'physical', description: 'A 13-week guided journal for creating your vision, setting meaningful goals, and building the daily practices that transform your life systematically.', price: '$32.99', affiliateUrl: '#', rating: 4.6 },
        ],
      },
      {
        id: 'time-management',
        name: 'Time Management & Productivity',
        description: 'Reclaim your time and multiply your output through proven productivity systems and powerful habits.',
        icon: '⏱️',
        articles: [
          { id: 'tm1', title: 'Time Blocking: The Productivity Method Used by Every Top Performer', excerpt: 'Time blocking — scheduling specific activities into defined time windows — is the single most impactful productivity technique according to research and practitioner reports.', readTime: '8 min read', tags: ['time management', 'productivity', 'time blocking'] },
          { id: 'tm2', title: 'The Two-Minute Rule and 9 Other GTD Principles That Transform Productivity', excerpt: "David Allen's Getting Things Done system contains several productivity rules so simple and powerful they immediately change how you work. Here are the most essential.", readTime: '11 min read', tags: ['GTD', 'productivity', 'systems'] },
        ],
        quotes: [
          { text: "It's not enough to be busy; so are the ants. The question is: What are we busy about?", author: 'Henry David Thoreau' },
          { text: 'Either you run the day, or the day runs you.', author: 'Jim Rohn' },
        ],
        products: [
          { id: 'tmp1', name: 'Getting Things Done: The Art of Stress-Free Productivity', type: 'book', description: "David Allen's legendary GTD system for capturing, clarifying, organizing, and completing everything on your plate — without the mental overhead of trying to remember it all.", price: '$16.99', affiliateUrl: '#', rating: 4.5 },
          { id: 'tmp2', name: 'Todoist Premium — Task Manager', type: 'course', description: "The most intelligently designed task management app available. Used by 30 million people to capture every task, set priorities, and systematically get things done.", price: '$4/month', affiliateUrl: '#', rating: 4.6 },
        ],
      },
      {
        id: 'career-growth',
        name: 'Career & Professional Growth',
        description: 'Navigate your career with intention to build work that is meaningful, rewarding, and financially fulfilling.',
        icon: '📈',
        articles: [
          { id: 'cg1', title: "The Career Capital Theory: Why 'Follow Your Passion' Is Actually Bad Advice", excerpt: "Cal Newport's counter-intuitive research shows that passion follows mastery, not the other way around. Here is what actually leads to a career you love.", readTime: '10 min read', tags: ['career', 'passion', 'skills'] },
          { id: 'cg2', title: 'How to Get Promoted Faster: The Strategies Most Employees Never Use', excerpt: "Getting promoted is less about working harder and more about strategic visibility, stakeholder management, and delivering the right kind of value. Here's how.", readTime: '9 min read', tags: ['promotion', 'career strategy', 'leadership'] },
        ],
        quotes: [
          { text: 'The only way to do great work is to love what you do.', author: 'Steve Jobs' },
          { text: "Your career is literally your business. You own it as a sole proprietor. You have one employee: yourself.", author: 'Andrew Grove' },
        ],
        products: [
          { id: 'cgp1', name: "So Good They Can't Ignore You: Why Skills Trump Passion", type: 'book', description: "Cal Newport's counterintuitive guide to building a fulfilling career by developing rare and valuable skills — the approach that actually works, backed by real examples.", price: '$16.99', affiliateUrl: '#', rating: 4.6 },
          { id: 'cgp2', name: 'The First 90 Days: Critical Success Strategies for New Leaders', type: 'book', description: "Michael Watkins' guide used by over 1.5 million leaders for accelerating transitions and making a strong impact in any new role, at any level.", price: '$19.99', affiliateUrl: '#', rating: 4.6 },
        ],
      },
      {
        id: 'habits',
        name: 'Making and Breaking Habits',
        description: 'Master the science of habit formation and elimination to build the daily routines that shape your destiny.',
        icon: '🌱',
        articles: [
          { id: 'pd1', title: 'The Compound Effect: Why 1% Better Every Day Leads to Being 37x Better in a Year', excerpt: 'Improving by just 1% each day compounds to a 37-times improvement over one year. The mathematics of the compound effect makes small daily improvements the most powerful force in personal development.', readTime: '9 min read', tags: ['compound effect', 'habits', 'personal development'] },
          { id: 'pd2', title: "The Morning Routine of World-Class Performers: What They All Have in Common", excerpt: "From Tim Cook to Oprah Winfrey to LeBron James — top performers almost universally credit a powerful morning routine as the foundation of their success. Here's the science behind it.", readTime: '12 min read', tags: ['morning routine', 'habits', 'high performance'] },
        ],
        quotes: [
          { text: 'Work harder on yourself than you do on your job.', author: 'Jim Rohn' },
          { text: 'Be not afraid of growing slowly, be afraid only of standing still.', author: 'Chinese Proverb' },
        ],
        products: [
          { id: 'pdp1', name: 'Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones', type: 'book', description: "James Clear's definitive, practical guide to building good habits and breaking bad ones. The single best book on behavior change and the mechanics of self-improvement.", price: '$18.99', affiliateUrl: '#', rating: 4.9 },
          { id: 'pdp2', name: 'The Miracle Morning: The Not-So-Obvious Secret Guaranteed to Transform Your Life', type: 'book', description: "Hal Elrod's SAVERS morning routine framework — Silence, Affirmations, Visualization, Exercise, Reading, Scribing — has helped millions transform their mornings and their lives.", price: '$14.99', affiliateUrl: '#', rating: 4.5 },
        ],
      },
    ],
    featuredQuotes: [
      { text: 'The two most important days in your life are the day you are born and the day you find out why.', author: 'Mark Twain' },
      { text: 'In the absence of clearly defined goals, we become strangely loyal to performing daily acts of trivia.', author: 'Robert Heinlein' },
      { text: 'Your future is created by what you do today, not tomorrow.', author: 'Robert Kiyosaki' },
    ],
  },
}

export const areasList = Object.values(areasData)
export const areaKeys = Object.keys(areasData)
