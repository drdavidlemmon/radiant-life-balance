import type { AreaKey } from '@/types'

export interface DeepDiveQuestion {
  id: string
  area: AreaKey
  subcategory: string
  question: string
  dimension: 'behavioral' | 'experiential' | 'obstacle'
}

export const deepDiveQuestions: Record<AreaKey, DeepDiveQuestion[]> = {

  body: [
    // Sleep Optimization
    { id: 'b_sl_1', area: 'body', subcategory: 'sleep', dimension: 'behavioral',   question: 'I follow a consistent sleep and wake schedule seven days a week, including weekends.' },
    { id: 'b_sl_2', area: 'body', subcategory: 'sleep', dimension: 'experiential', question: 'I wake up feeling genuinely refreshed and restored — not reliant on an alarm or caffeine to function.' },
    { id: 'b_sl_3', area: 'body', subcategory: 'sleep', dimension: 'obstacle',     question: 'I fall asleep easily, stay asleep through the night, and rarely feel that my sleep quality is poor.' },
    // Nutrition & Diet
    { id: 'b_nt_1', area: 'body', subcategory: 'nutrition', dimension: 'behavioral',   question: 'I prepare and eat mostly whole, unprocessed foods and limit refined sugar and industrial seed oils.' },
    { id: 'b_nt_2', area: 'body', subcategory: 'nutrition', dimension: 'experiential', question: 'My energy and mood remain stable throughout the day with no significant mid-morning or afternoon crashes.' },
    { id: 'b_nt_3', area: 'body', subcategory: 'nutrition', dimension: 'obstacle',     question: 'I understand which foods cause inflammation in my body and actively reduce them in my daily diet.' },
    // Exercise & Fitness
    { id: 'b_ex_1', area: 'body', subcategory: 'exercise', dimension: 'behavioral',   question: 'I engage in intentional physical exercise — strength training, cardio, or both — at least three times per week.' },
    { id: 'b_ex_2', area: 'body', subcategory: 'exercise', dimension: 'experiential', question: 'I feel physically strong, capable, and comfortable in my body during the demands of everyday life.' },
    { id: 'b_ex_3', area: 'body', subcategory: 'exercise', dimension: 'obstacle',     question: 'I maintain my exercise routine consistently even when life gets busy or I don\'t feel motivated.' },
    // Specific Conditions
    { id: 'b_sc_1', area: 'body', subcategory: 'specific-conditions', dimension: 'behavioral',   question: 'I actively address any chronic health conditions through lifestyle, nutrition, and natural interventions.' },
    { id: 'b_sc_2', area: 'body', subcategory: 'specific-conditions', dimension: 'experiential', question: 'My health conditions or symptoms rarely interfere with my ability to enjoy and fully participate in life.' },
    { id: 'b_sc_3', area: 'body', subcategory: 'specific-conditions', dimension: 'obstacle',     question: 'I have a healthcare provider who supports both conventional and integrative approaches to my specific needs.' },
    // Energy & Vitality
    { id: 'b_en_1', area: 'body', subcategory: 'energy', dimension: 'behavioral',   question: 'I support my energy daily through consistent sleep, adequate hydration, and regular nourishing meals.' },
    { id: 'b_en_2', area: 'body', subcategory: 'energy', dimension: 'experiential', question: 'I have sustained, natural energy from morning through evening without depending heavily on stimulants.' },
    { id: 'b_en_3', area: 'body', subcategory: 'energy', dimension: 'obstacle',     question: 'I recover quickly after physically or emotionally demanding days and wake the next morning feeling restored.' },
  ],

  mind: [
    // Learning & Skill Development
    { id: 'm_ul_1', area: 'mind', subcategory: 'learning', dimension: 'behavioral',   question: 'I dedicate regular time each week to deliberately learning something new — in my field or for personal growth.' },
    { id: 'm_ul_2', area: 'mind', subcategory: 'learning', dimension: 'experiential', question: 'I retain and can apply most of what I learn rather than forgetting it within days of encountering it.' },
    { id: 'm_ul_3', area: 'mind', subcategory: 'learning', dimension: 'obstacle',     question: 'I have a reliable system for capturing, organizing, and reviewing what I learn so I can access it when needed.' },
    // Memory & Retention
    { id: 'm_me_1', area: 'mind', subcategory: 'memory', dimension: 'behavioral',   question: 'I use deliberate techniques — repetition, association, or visualization — to retain important information.' },
    { id: 'm_me_2', area: 'mind', subcategory: 'memory', dimension: 'experiential', question: 'I can recall names, facts, and key details reliably without feeling that my memory regularly lets me down.' },
    { id: 'm_me_3', area: 'mind', subcategory: 'memory', dimension: 'obstacle',     question: 'I support my memory through adequate sleep, good nutrition, and habits I know enhance cognitive function.' },
    // Speed Reading
    { id: 'm_sr_1', area: 'mind', subcategory: 'speed-reading', dimension: 'behavioral',   question: 'I read consistently and actively work to extract and retain the key ideas from books and articles.' },
    { id: 'm_sr_2', area: 'mind', subcategory: 'speed-reading', dimension: 'experiential', question: 'I read and comprehend material quickly enough to stay current with what matters in my work and development.' },
    { id: 'm_sr_3', area: 'mind', subcategory: 'speed-reading', dimension: 'obstacle',     question: 'I can sustain focus through extended reading sessions without losing concentration or re-reading the same passage.' },
    // Focus & Deep Work
    { id: 'm_fw_1', area: 'mind', subcategory: 'focus', dimension: 'behavioral',   question: 'I protect dedicated blocks of uninterrupted time for my most important work and minimize distractions during them.' },
    { id: 'm_fw_2', area: 'mind', subcategory: 'focus', dimension: 'experiential', question: 'I regularly experience states of deep focus or flow where I am fully absorbed and highly productive.' },
    { id: 'm_fw_3', area: 'mind', subcategory: 'focus', dimension: 'obstacle',     question: 'I can resist the pull of my phone, social media, and notifications when concentration matters most.' },
    // Creativity
    { id: 'm_ct_1', area: 'mind', subcategory: 'creativity', dimension: 'behavioral',   question: 'I actively practice creative thinking — through brainstorming, journaling, or novel problem-solving.' },
    { id: 'm_ct_2', area: 'mind', subcategory: 'creativity', dimension: 'experiential', question: 'I regularly generate original ideas and find creative solutions to challenges in my work and personal life.' },
    { id: 'm_ct_3', area: 'mind', subcategory: 'creativity', dimension: 'obstacle',     question: 'I give myself full permission to experiment and create imperfectly without self-criticism shutting the process down.' },
  ],

  spirit: [
    // Meditation & Mindfulness
    { id: 's_md_1', area: 'spirit', subcategory: 'meditation', dimension: 'behavioral',   question: 'I practice some form of meditation, prayer, or intentional stillness on a daily or near-daily basis.' },
    { id: 's_md_2', area: 'spirit', subcategory: 'meditation', dimension: 'experiential', question: 'I can access a genuine sense of inner calm and peace even in the middle of stressful situations.' },
    { id: 's_md_3', area: 'spirit', subcategory: 'meditation', dimension: 'obstacle',     question: 'I can quiet my mind and be fully present rather than being pulled into worry about the past or future.' },
    // Happiness
    { id: 's_ha_1', area: 'spirit', subcategory: 'happiness', dimension: 'behavioral',   question: 'I intentionally practice daily habits that support my happiness — gratitude, meaningful connection, and positive reflection.' },
    { id: 's_ha_2', area: 'spirit', subcategory: 'happiness', dimension: 'experiential', question: 'I experience genuine joy and contentment in my everyday life, not just during vacations or special occasions.' },
    { id: 's_ha_3', area: 'spirit', subcategory: 'happiness', dimension: 'obstacle',     question: 'I have addressed the underlying sources of unhappiness in my life rather than simply coping with or suppressing them.' },
    // Gratitude & Positivity
    { id: 's_gr_1', area: 'spirit', subcategory: 'gratitude', dimension: 'behavioral',   question: 'I regularly practice gratitude — through journaling, prayer, or verbal expression — for the specific blessings in my life.' },
    { id: 's_gr_2', area: 'spirit', subcategory: 'gratitude', dimension: 'experiential', question: 'I genuinely feel grateful on a daily basis and naturally notice the good in ordinary, everyday moments.' },
    { id: 's_gr_3', area: 'spirit', subcategory: 'gratitude', dimension: 'obstacle',     question: 'I focus on what I have rather than what I lack, even when my circumstances are difficult or disappointing.' },
    // Forgiveness
    { id: 's_fo_1', area: 'spirit', subcategory: 'forgiveness', dimension: 'behavioral',   question: 'I have actively worked to release resentment and forgive those who have hurt me — including forgiving myself.' },
    { id: 's_fo_2', area: 'spirit', subcategory: 'forgiveness', dimension: 'experiential', question: 'I carry little unresolved bitterness or anger from past wounds that affects my present relationships or mood.' },
    { id: 's_fo_3', area: 'spirit', subcategory: 'forgiveness', dimension: 'obstacle',     question: 'I understand that forgiveness is for my own freedom and peace, not the other person\'s benefit, and I live by that.' },
    // Service
    { id: 's_sv_1', area: 'spirit', subcategory: 'service', dimension: 'behavioral',   question: 'I regularly contribute my time, energy, or resources to serving others or a cause larger than myself.' },
    { id: 's_sv_2', area: 'spirit', subcategory: 'service', dimension: 'experiential', question: 'Giving to and serving others brings me authentic fulfillment and a deep sense of meaning and connection.' },
    { id: 's_sv_3', area: 'spirit', subcategory: 'service', dimension: 'obstacle',     question: 'I have found ways to serve that are sustainable and that energize rather than deplete me over time.' },
  ],

  relationships: [
    // Romantic Partnerships
    { id: 'r_ro_1', area: 'relationships', subcategory: 'romantic', dimension: 'behavioral',   question: 'I invest consistent quality time and intentional effort into nurturing my most important romantic relationship.' },
    { id: 'r_ro_2', area: 'relationships', subcategory: 'romantic', dimension: 'experiential', question: 'I feel genuinely seen, valued, and emotionally connected in my romantic relationship or partnership.' },
    { id: 'r_ro_3', area: 'relationships', subcategory: 'romantic', dimension: 'obstacle',     question: 'When conflict arises in my romantic relationship, I address it constructively rather than avoiding or escalating it.' },
    // Family Bonds
    { id: 'r_fa_1', area: 'relationships', subcategory: 'family', dimension: 'behavioral',   question: 'I invest meaningful time and attention into my relationships with the family members who matter most to me.' },
    { id: 'r_fa_2', area: 'relationships', subcategory: 'family', dimension: 'experiential', question: 'My family relationships feel warm, supportive, and genuinely nourishing to my wellbeing and sense of belonging.' },
    { id: 'r_fa_3', area: 'relationships', subcategory: 'family', dimension: 'obstacle',     question: 'I have repaired or am actively working to repair any important family relationships that have been damaged.' },
    // Friendship & Social Circle
    { id: 'r_fr_1', area: 'relationships', subcategory: 'friendship', dimension: 'behavioral',   question: 'I regularly invest in my friendships and create opportunities to connect with the people I care most about.' },
    { id: 'r_fr_2', area: 'relationships', subcategory: 'friendship', dimension: 'experiential', question: 'I have at least two or three close friendships where I feel truly known, accepted, and supported.' },
    { id: 'r_fr_3', area: 'relationships', subcategory: 'friendship', dimension: 'obstacle',     question: 'I am the kind of friend I would want to have — showing up with consistency, honesty, and genuine care.' },
    // Communication Skills
    { id: 'r_co_1', area: 'relationships', subcategory: 'communication', dimension: 'behavioral',   question: 'I listen attentively to understand others before focusing on how I want to respond.' },
    { id: 'r_co_2', area: 'relationships', subcategory: 'communication', dimension: 'experiential', question: 'I express my needs, feelings, and boundaries clearly and directly without avoiding difficult conversations.' },
    { id: 'r_co_3', area: 'relationships', subcategory: 'communication', dimension: 'obstacle',     question: 'People in my life would describe me as a thoughtful, trustworthy, and effective communicator.' },
    // Networking & Community
    { id: 'r_nw_1', area: 'relationships', subcategory: 'networking', dimension: 'behavioral',   question: 'I actively build and maintain a professional and social network that opens doors and creates mutual value.' },
    { id: 'r_nw_2', area: 'relationships', subcategory: 'networking', dimension: 'experiential', question: 'I feel a genuine sense of belonging to a community — professional, spiritual, or social — that supports and challenges me.' },
    { id: 'r_nw_3', area: 'relationships', subcategory: 'networking', dimension: 'obstacle',     question: 'I give generously to my network and community rather than approaching it primarily as a resource to draw from.' },
  ],

  money: [
    // Wealth Mindset
    { id: 'mo_wm_1', area: 'money', subcategory: 'wealth-mindset', dimension: 'behavioral',   question: 'I hold a genuinely abundant mindset about money and believe that financial freedom is achievable for me.' },
    { id: 'mo_wm_2', area: 'money', subcategory: 'wealth-mindset', dimension: 'experiential', question: 'I feel calm, confident, and empowered when thinking about my finances — not anxious or avoidant.' },
    { id: 'mo_wm_3', area: 'money', subcategory: 'wealth-mindset', dimension: 'obstacle',     question: 'I have identified and actively worked to replace limiting money beliefs I absorbed in childhood or early life.' },
    // Budgeting & Saving
    { id: 'mo_bu_1', area: 'money', subcategory: 'budgeting', dimension: 'behavioral',   question: 'I track my income and expenses regularly and know exactly where my money goes each month.' },
    { id: 'mo_bu_2', area: 'money', subcategory: 'budgeting', dimension: 'experiential', question: 'I live below my means, save consistently, and have an emergency fund that gives me genuine financial security.' },
    { id: 'mo_bu_3', area: 'money', subcategory: 'budgeting', dimension: 'obstacle',     question: 'My spending is intentional and aligned with my actual values and long-term financial goals.' },
    // Investing & Growing Wealth
    { id: 'mo_in_1', area: 'money', subcategory: 'investing', dimension: 'behavioral',   question: 'I invest a regular portion of my income and have a clear strategy appropriate for my age and goals.' },
    { id: 'mo_in_2', area: 'money', subcategory: 'investing', dimension: 'experiential', question: 'I understand how my money is invested and feel confident making informed financial decisions.' },
    { id: 'mo_in_3', area: 'money', subcategory: 'investing', dimension: 'obstacle',     question: 'I am building assets that produce income and grow in value over time, moving me toward financial independence.' },
    // Income & Career Growth
    { id: 'mo_ic_1', area: 'money', subcategory: 'income', dimension: 'behavioral',   question: 'My current income reflects the full value of my skills, experience, and contribution.' },
    { id: 'mo_ic_2', area: 'money', subcategory: 'income', dimension: 'experiential', question: 'I have a clear strategy for increasing my income over the next one to three years.' },
    { id: 'mo_ic_3', area: 'money', subcategory: 'income', dimension: 'obstacle',     question: 'Financial stress does not significantly affect my health, relationships, or peace of mind.' },
    // Entrepreneurship
    { id: 'mo_en_1', area: 'money', subcategory: 'entrepreneurship', dimension: 'behavioral',   question: 'I have explored or am actively developing income streams beyond a single employer or client.' },
    { id: 'mo_en_2', area: 'money', subcategory: 'entrepreneurship', dimension: 'experiential', question: 'I approach challenges in my work or business with a resourceful, problem-solving mindset rather than fear.' },
    { id: 'mo_en_3', area: 'money', subcategory: 'entrepreneurship', dimension: 'obstacle',     question: 'I have the systems, skills, and support in place to sustain and grow my independent income over time.' },
  ],

  direction: [
    // Goal Setting & Achievement
    { id: 'd_gs_1', area: 'direction', subcategory: 'goal-setting', dimension: 'behavioral',   question: 'I set specific, written goals with clear deadlines and review my progress against them regularly.' },
    { id: 'd_gs_2', area: 'direction', subcategory: 'goal-setting', dimension: 'experiential', question: 'I follow through on the goals I set for myself and have a strong track record of completing what I start.' },
    { id: 'd_gs_3', area: 'direction', subcategory: 'goal-setting', dimension: 'obstacle',     question: 'When I fall short of a goal, I assess honestly what went wrong, adjust, and re-engage rather than abandoning it.' },
    // Life Vision & Purpose
    { id: 'd_lv_1', area: 'direction', subcategory: 'life-vision', dimension: 'behavioral',   question: 'I have a clear, written vision for what my ideal life looks like in 5–10 years across all major areas.' },
    { id: 'd_lv_2', area: 'direction', subcategory: 'life-vision', dimension: 'experiential', question: 'My daily choices and how I spend my time are genuinely aligned with the larger vision I have for my life.' },
    { id: 'd_lv_3', area: 'direction', subcategory: 'life-vision', dimension: 'obstacle',     question: 'I feel a strong sense of meaning and purpose that goes beyond day-to-day tasks and keeps me motivated long-term.' },
    // Time Management & Productivity
    { id: 'd_tm_1', area: 'direction', subcategory: 'time-management', dimension: 'behavioral',   question: 'I plan my days and weeks intentionally and protect time for my highest priorities before lesser demands fill it.' },
    { id: 'd_tm_2', area: 'direction', subcategory: 'time-management', dimension: 'experiential', question: 'I end most days feeling that I made meaningful progress on what matters — not just busy with what felt urgent.' },
    { id: 'd_tm_3', area: 'direction', subcategory: 'time-management', dimension: 'obstacle',     question: 'I am able to say no to requests, distractions, and obligations that conflict with my most important commitments.' },
    // Career & Professional Growth
    { id: 'd_cg_1', area: 'direction', subcategory: 'career-growth', dimension: 'behavioral',   question: 'I am actively developing the skills, relationships, and reputation that position me for where I want to be professionally.' },
    { id: 'd_cg_2', area: 'direction', subcategory: 'career-growth', dimension: 'experiential', question: 'My current career path feels meaningful and aligned with my strengths and the contribution I want to make.' },
    { id: 'd_cg_3', area: 'direction', subcategory: 'career-growth', dimension: 'obstacle',     question: 'I have a clear roadmap for the next stage of my career or professional life and I am executing against it.' },
    // Making and Breaking Habits
    { id: 'd_ha_1', area: 'direction', subcategory: 'habits', dimension: 'behavioral',   question: 'I have successfully built new positive habits and broken old harmful ones through deliberate, systematic effort.' },
    { id: 'd_ha_2', area: 'direction', subcategory: 'habits', dimension: 'experiential', question: 'My daily and weekly habits — across health, work, and relationships — consistently move me toward my goals.' },
    { id: 'd_ha_3', area: 'direction', subcategory: 'habits', dimension: 'obstacle',     question: 'When I slip on a habit, I recover quickly within a day or two rather than abandoning the effort entirely.' },
  ],
}
