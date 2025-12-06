-- Seed data for jobs (Malaysian Context)
DO $$
DECLARE
    v_poster_id uuid;
BEGIN
    -- 1. Try to get an existing poster profile, or create a dummy one if none exists
    SELECT id INTO v_poster_id FROM profiles WHERE role = 'poster' LIMIT 1;

    IF v_poster_id IS NULL THEN
        -- Fallback: try any profile
        SELECT id INTO v_poster_id FROM profiles LIMIT 1;
    END IF;

    IF v_poster_id IS NULL THEN
        -- Create a dummy profile if table is empty
        INSERT INTO profiles (role, full_name, impact_hours, onboarding_completed)
        VALUES ('poster', 'Impact Malaysia Admin', 0, true)
        RETURNING id INTO v_poster_id;
    END IF;

    -- 2. Insert 10 mock jobs with rich details localized for Malaysia
    INSERT INTO jobs (
        poster_id, 
        title, 
        description, 
        location, 
        type, 
        cause_tags, 
        status, 
        compensation_amount, 
        start_time, 
        end_time,
        company_name,
        company_description,
        time_commitment,
        application_deadline,
        requirements,
        benefits,
        image_url
    )
    VALUES
    (
        v_poster_id,
        'Urban Kebun Coordinator',
        'We are looking for a passionate individual to lead our "Kebun dalam Kota" initiative in the heart of Kuala Lumpur. As urbanization continues to encroach on green spaces, our mission is to reclaim unused urban pockets and transform them into thriving community gardens. 

In this role, you will be responsible for overseeing the daily operations of our flagship garden in Bangsar. This involves coordinating a team of weekend volunteers, managing the planting calendar suitable for the tropical climate, and organizing monthly harvest sharing events with the local B40 community. You will also act as the primary liaison between the community association and our organization.

This is a hands-on role that requires a love for nature and people. You will be working outdoors, getting your hands dirty, and teaching others the joy of growing their own food (cili padi, kangkung, sawi, etc.). If you believe in food security and community resilience, we want to hear from you.',
        'Pusat Komuniti Bangsar, 366, Lorong Maarof, Bangsar, 59000 Kuala Lumpur',
        'volunteer',
        ARRAY['Environment', 'Community', 'Sustainability'],
        'open',
        NULL,
        NOW() + INTERVAL '5 days',
        NOW() + INTERVAL '3 months',
        'Hijau KL Alliance',
        'Hijau KL Alliance is a non-profit organization dedicated to increasing green cover in Kuala Lumpur through community-led urban farming projects. Established in 2018, we have successfully transformed over 20 idle plots of land into productive gardens.',
        '10-15 hours / week',
        NOW() + INTERVAL '4 days',
        '- Experience in tropical gardening or agriculture
- Strong leadership and communication skills (Bahasa Malaysia & English)
- Ability to work outdoors in Malaysian weather
- Passion for community building',
        '- Fresh organic produce weekly
- Leadership and project management experience
- Networking with sustainability experts in KL
- Certificate of Appreciation',
        'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=800&q=80'
    ),
    (
        v_poster_id,
        'Digital Literacy Tutor for Seniors (Warga Emas)',
        'In an increasingly digital world, many of our seniors are being left behind. Join us at the Pusat Aktiviti Warga Emas in Petaling Jaya to help bridge this digital divide. We are looking for patient volunteers to teach basic smartphone usage, including WhatsApp, MySejahtera, and online banking safety.

Your primary responsibility will be to conduct one-on-one or small group tutoring sessions. You will help seniors navigate their devices, troubleshoot common issues, and build their confidence in using technology to stay connected with their families and access essential services.

This role is incredibly rewarding as you witness the joy of seniors reconnecting with distant relatives or learning to order food online independently. Patience and empathy are key, as learning speeds vary.',
        'Pusat Aktiviti Warga Emas (PAWE), Jalan 6/31, Seksyen 6, 46000 Petaling Jaya, Selangor',
        'volunteer',
        ARRAY['Education', 'Elderly Care', 'Technology'],
        'open',
        NULL,
        NOW() + INTERVAL '1 week',
        NOW() + INTERVAL '6 months',
        'SilverConnect Malaysia',
        'SilverConnect Malaysia is a social enterprise focused on empowering the elderly population through technology and social inclusion programs across the Klang Valley.',
        '4 hours / week (Weekends)',
        NOW() + INTERVAL '6 days',
        '- Patience and empathy towards elderly
- Proficiency with iOS and Android interfaces
- Ability to explain technical concepts simply in BM or English (Mandarin/Tamil is a bonus)
- Fully vaccinated',
        '- Certificate of Service
- Letter of recommendation
- Intergenerational connection and wisdom sharing
- Training on teaching methodologies',
        'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80'
    ),
    (
        v_poster_id,
        'Turtle Conservation Volunteer',
        'Join our team in Cherating, Pahang, for the upcoming nesting season! We are seeking dedicated volunteers to assist in our turtle conservation efforts. This is a critical time for the endangered Green Turtles that come ashore to lay their eggs.

Your duties will include night patrols to identify nesting turtles, relocating eggs to our protected hatchery, and monitoring the hatchery for hatchlings. During the day, you will assist in beach cleanup activities and conduct educational talks for visitors at our conservation center.

Accommodation and meals are provided at the sanctuary. This is a unique opportunity to contribute directly to marine conservation while living by the beautiful East Coast beaches.',
        'Pusat Konservasi dan Penerangan Penyu, Jalan Kuantan - Kemaman, 26080 Cherating, Pahang',
        'volunteer',
        ARRAY['Animals', 'Wildlife', 'Environment'],
        'open',
        NULL,
        NOW() + INTERVAL '2 weeks',
        NOW() + INTERVAL '2 months',
        'Marine Life Sanctuary Malaysia',
        'Dedicated to the protection and rehabilitation of marine life in Malaysia, focusing on sea turtles and coral reef restoration since 2010.',
        'Full-time (2 weeks min)',
        NOW() + INTERVAL '10 days',
        '- Willingness to work night shifts
- Physical fitness for beach patrols
- Passion for marine biology
- Ability to live in basic dormitory accommodation',
        '- Free accommodation and meals
- Hands-on experience with wildlife conservation
- Training in data collection and field research
- Unforgettable experience with sea turtles',
        'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&q=80'
    ),
    (
        v_poster_id,
        'Grant Writer for Arts Education',
        'We are looking for a skilled Grant Writer to help secure funding for our "Seni Untuk Semua" program, which brings art workshops to rural schools in Sabah and Sarawak. 

You will be responsible for researching grant opportunities from government bodies (like CENDANA) and international foundations. You will draft compelling proposals, prepare budget narratives, and collaborate with our program director to gather necessary data.

This is a remote, paid position suitable for someone with strong writing skills and a background in arts administration or fundraising. Your work will directly enable hundreds of children to access creative learning materials.',
        'Remote (Malaysia)',
        'paid',
        ARRAY['Arts', 'Education', 'Fundraising'],
        'open',
        1500.00,
        NOW() + INTERVAL '2 weeks',
        NOW() + INTERVAL '2 months',
        'Borneo Creative Arts',
        'Borneo Creative Arts is a non-profit aiming to preserve indigenous art forms and promote creative education in East Malaysia.',
        '20 hours total project',
        NOW() + INTERVAL '1 week',
        '- Proven grant writing experience
- Excellent English writing skills
- Understanding of the Malaysian arts funding landscape
- Detail-oriented',
        '- Competitive project stipend (RM 1,500)
- Portfolio piece
- Networking with arts leaders
- Flexible working hours',
        'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80'
    ),
    (
        v_poster_id,
        'Soup Kitchen Logistics Assistant',
        'Pertiwi Soup Kitchen needs energetic volunteers to assist with our nightly food distribution in Chow Kit, Kuala Lumpur. We serve hot meals to over 500 homeless and urban poor individuals every night.

Your role will involve setting up the distribution stations, managing the queue to ensure social distancing and order, serving food, and cleaning up afterwards. You may also be asked to help with basic medical screening registration if you have relevant experience.

This is a fast-paced environment that requires teamwork and compassion. It is an eye-opening experience that brings you face-to-face with the realities of urban poverty in KL.',
        'Pusat Gelandangan Medan Tuanku, Lorong Medan Tuanku 2, Chow Kit, 50300 Kuala Lumpur',
        'volunteer',
        ARRAY['Hunger', 'Community', 'Social Service'],
        'open',
        NULL,
        NOW() + INTERVAL '1 day',
        NOW() + INTERVAL '6 months',
        'KL Care Kitchen',
        'KL Care Kitchen has been serving the homeless community in Kuala Lumpur for over a decade, providing medical aid and nutritious meals.',
        '3-4 hours / shift (Night)',
        NOW() + INTERVAL '1 month',
        '- Ability to stand for long periods
- Team player attitude
- Compassion and non-judgmental mindset
- Fully vaccinated',
        '- Direct impact on local hunger
- Community service hours verification
- Meet diverse group of volunteers
- Meal provided after shift',
        'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80'
    ),
    (
        v_poster_id,
        'English Tutor for Refugee Children',
        'Volunteer with us to teach English to Rohingya refugee children at our learning center in Ampang. Education is a pathway to a better future, and for these children, language skills are vital.

We follow a structured curriculum, but we need creative tutors who can make learning fun through games, songs, and storytelling. You will be assigned a small class of 5-8 students aged 7-10 years old.

Consistency is crucial for these children, so we are looking for volunteers who can commit to at least one morning per week for a minimum of 3 months.',
        'Fugee School, No 19, Jalan Damai, 55000 Kuala Lumpur',
        'volunteer',
        ARRAY['Education', 'Refugees', 'Children'],
        'open',
        NULL,
        NOW() + INTERVAL '1 week',
        NOW() + INTERVAL '6 months',
        'Hope Learning Center',
        'A community-based organization providing basic education and healthcare support to refugee communities in the Klang Valley.',
        '3 hours / week (Saturday)',
        NOW() + INTERVAL '2 weeks',
        '- Fluent in English
- Experience working with children is a plus
- Patience and cultural sensitivity
- Commitment to the schedule',
        '- Teaching experience
- Cultural exchange
- Letter of recommendation
- Fulfillment from empowering children',
        'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80'
    ),
    (
        v_poster_id,
        'Social Media Content Creator (Intern)',
        'Are you a TikTok wizard or an Instagram pro? We need a creative intern to help us raise awareness about plastic pollution in Malaysia. You will be working with our communications team to create engaging short-form videos and infographics.

Responsibilities include filming content at our recycling centers, interviewing our eco-warriors, and editing videos for social media. You will also help manage our community engagement online.

This is a great opportunity for mass comm or marketing students looking to build a portfolio in social impact communication.',
        'RekaScape, Block 3730, Persiaran APEC, Cyber 8, 63000 Cyberjaya, Selangor',
        'volunteer',
        ARRAY['Environment', 'Marketing', 'Media'],
        'open',
        NULL,
        NOW() + INTERVAL '1 week',
        NOW() + INTERVAL '3 months',
        'Zero Waste Malaysia',
        'A non-profit advocacy group driving the zero-waste movement in Malaysia through education and policy lobbying.',
        '10 hours / week',
        NOW() + INTERVAL '5 days',
        '- Graphic design skills (Canva/Adobe)
- Video editing skills (CapCut/Premiere)
- Passion for environmental issues
- Own laptop/smartphone',
        '- Portfolio development
- Mentorship from senior marketers
- Flexible schedule
- Internship credit (if applicable)',
        'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80'
    ),
    (
        v_poster_id,
        'Flood Relief Logistics Coordinator',
        'In preparation for the monsoon season, we are setting up a rapid response logistics team in Shah Alam. We are hiring a coordinator to manage the inventory of relief supplies (food, hygiene kits, boats).

You will be responsible for maintaining the warehouse inventory system, coordinating with transport volunteers during emergencies, and ensuring supplies are packed and ready for deployment.

This is a paid contract position for 6 months. Experience in logistics or supply chain management is highly preferred.',
        'Stadium Malawati, Persiaran Sukan, Seksyen 13, 40100 Shah Alam, Selangor',
        'paid',
        ARRAY['Crisis Response', 'Logistics', 'Community'],
        'open',
        2500.00,
        NOW() + INTERVAL '1 month',
        NOW() + INTERVAL '7 months',
        'Malaysia Relief Squad',
        'A volunteer-driven disaster response organization specializing in flood and fire relief operations across Peninsular Malaysia.',
        'Full-time (Contract)',
        NOW() + INTERVAL '3 weeks',
        '- Experience in logistics/warehouse management
- Valid driving license (GDL is a bonus)
- Ability to work under pressure
- Organizational skills',
        '- Monthly salary (RM 2,500)
- Crisis management training
- Opportunity to lead relief missions
- Insurance coverage',
        'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=800&q=80'
    ),
    (
        v_poster_id,
        'Beach Cleanup Team Leader',
        'Lead a team of volunteers during our monthly beach cleanup events at Port Dickson. As a Team Leader, you will be responsible for briefing volunteers, ensuring safety protocols are followed, and managing the waste weighing and data recording process.

We provide all necessary equipment. You just need to bring your energy and leadership skills! This is a great way to spend your Sunday morning making a tangible difference.',
        'Pantai Cahaya Negeri, Batu 4, Jalan Pantai, 71050 Port Dickson, Negeri Sembilan',
        'volunteer',
        ARRAY['Environment', 'Leadership'],
        'open',
        NULL,
        NOW() + INTERVAL '2 weeks',
        NOW() + INTERVAL '1 year',
        'Clean Coast MY',
        'A grassroots movement organizing regular beach and river cleanups to combat marine debris in Malaysia.',
        '5 hours / month (Sunday)',
        NOW() + INTERVAL '1 week',
        '- Passion for environmental protection
- Ability to direct groups of 20+ people
- Reliability and punctuality
- Own transport to PD',
        '- Branded t-shirt and cap
- Volunteer appreciation lunch
- Leadership experience
- Networking with eco-activists',
        'https://images.unsplash.com/photo-1618477461853-5f8dd68aa1fd?auto=format&fit=crop&w=800&q=80'
    ),
    (
        v_poster_id,
        'Coding Mentor for B40 Youth',
        'We are launching a "Coding for Future" bootcamp for teenagers from B40 families in George Town, Penang. We need experienced developers to serve as mentors.

You will assist the lead instructor during weekend workshops, helping students debug their code (Python/HTML), explaining concepts, and guiding them through their capstone projects.

Your mentorship can open doors to high-income careers for these youths. If you are a tech professional wanting to give back, this is for you.',
        'Wisma Yeap Chor Ee, 37, Gat Lebuh China, 10300 George Town, Pulau Pinang',
        'volunteer',
        ARRAY['Education', 'Technology', 'STEM'],
        'open',
        NULL,
        NOW() + INTERVAL '1 month',
        NOW() + INTERVAL '4 months',
        'Penang Tech Youth',
        'An initiative supported by the state government to foster digital talent among underprivileged youth in Penang.',
        '4 hours / Saturday',
        NOW() + INTERVAL '2 weeks',
        '- Professional experience in coding
- Passion for teaching/mentoring
- Patience with beginners
- Laptop required',
        '- Teaching experience
- Certificate of Appreciation from State Gov
- Networking with Penang tech community
- Fulfillment from bridging the digital gap',
        'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80'
    );

END$$;
