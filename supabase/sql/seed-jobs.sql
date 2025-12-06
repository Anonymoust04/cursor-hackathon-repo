-- Seed data for jobs (v2 with new columns)
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
        VALUES ('poster', 'Seed Data Poster', 0, true)
        RETURNING id INTO v_poster_id;
    END IF;

    -- 2. Insert 10 mock jobs with rich details
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
        time_commitment,
        application_deadline,
        requirements,
        benefits,
        image_url
    )
    VALUES
    (
        v_poster_id,
        'Urban Community Garden Coordinator',
        'Lead the initiative to revitalize downtown green spaces. You will coordinate volunteers, manage planting schedules, and organize community harvest events.',
        'Downtown Metro Area',
        'volunteer',
        ARRAY['Environment', 'Community', 'Sustainability'],
        'open',
        NULL,
        NOW() + INTERVAL '5 days',
        NOW() + INTERVAL '3 months',
        'GreenCity Alliance',
        '10-15 hours / week',
        NOW() + INTERVAL '4 days',
        '- Experience in gardening or agriculture
- Strong leadership skills
- Ability to lift 20lbs',
        '- Fresh produce
- Leadership experience
- Community networking',
        'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=800&q=80'
    ),
    (
        v_poster_id,
        'Digital Literacy Tutor for Seniors',
        'Help seniors stay connected by teaching them how to use smartphones, tablets, and video calling software.',
        'Sunnyvale Senior Center',
        'volunteer',
        ARRAY['Education', 'Elderly Care', 'Technology'],
        'open',
        NULL,
        NOW() + INTERVAL '1 week',
        NOW() + INTERVAL '6 months',
        'SilverConnect Foundation',
        '4 hours / week',
        NOW() + INTERVAL '6 days',
        '- Patience and empathy
- Proficiency with iOS and Android
- Clear communication skills',
        '- Certificate of Service
- Letter of recommendation
- Intergenerational connection',
        'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80'
    ),
    (
        v_poster_id,
        'Wildlife Rescue Transport Driver',
        'Transport injured wildlife from discovery sites to our rehabilitation center. Must have own vehicle.',
        'County Wide',
        'volunteer',
        ARRAY['Animals', 'Wildlife', 'Crisis Response'],
        'open',
        NULL,
        NOW() + INTERVAL '2 days',
        NOW() + INTERVAL '1 year',
        'WildCare Rescue',
        'On-call (approx 5 hrs/week)',
        NOW() + INTERVAL '10 days',
        '- Valid Driver''s License
- Reliable vehicle
- Compassion for animals',
        '- Gas mileage reimbursement
- Training in animal handling
- Emotional fulfillment',
        'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&q=80'
    ),
    (
        v_poster_id,
        'Grant Writer for Arts Education',
        'Research and draft grant proposals to secure funding for after-school art programs in underfunded districts.',
        'Remote',
        'paid',
        ARRAY['Arts', 'Education', 'Fundraising'],
        'open',
        1500.00,
        NOW() + INTERVAL '2 weeks',
        NOW() + INTERVAL '2 months',
        'Creative Futures',
        '20 hours total',
        NOW() + INTERVAL '1 week',
        '- Proven grant writing experience
- Excellent writing skills
- Detail-oriented',
        '- Competitive stipend
- Portfolio piece
- Networking with arts leaders',
        'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80'
    ),
    (
        v_poster_id,
        'Youth Basketball Coach',
        'Coach a team of 10-12 year olds for the upcoming spring season. Focus on teamwork, sportsmanship, and fundamentals.',
        'Westside Community Center',
        'volunteer',
        ARRAY['Sports', 'Youth', 'Mentorship'],
        'open',
        NULL,
        NOW() + INTERVAL '3 weeks',
        NOW() + INTERVAL '4 months',
        'City Youth Sports League',
        '6 hours / week (2 practices + 1 game)',
        NOW() + INTERVAL '2 weeks',
        '- Knowledge of basketball rules
- Experience working with kids
- Background check required',
        '- Team jersey
- End-of-season banquet
- Coaching certification support',
        'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&q=80'
    ),
    (
        v_poster_id,
        'Food Pantry Logistics Assistant',
        'Assist with inventory management, sorting donations, and packing food boxes for distribution.',
        'Northside Food Bank',
        'volunteer',
        ARRAY['Hunger', 'Logistics', 'Community'],
        'open',
        NULL,
        NOW() + INTERVAL '1 day',
        NOW() + INTERVAL '6 months',
        'Hope Food Pantry',
        '3-4 hours / shift',
        NOW() + INTERVAL '1 month',
        '- Ability to stand for long periods
- Organizational skills
- Team player',
        '- Free lunch during shifts
- Community service hours
- Direct impact on local hunger',
        'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80'
    ),
    (
        v_poster_id,
        'Social Media Content Creator',
        'Create engaging content for Instagram and TikTok to raise awareness about ocean conservation.',
        'Remote',
        'volunteer',
        ARRAY['Environment', 'Marketing', 'Media'],
        'open',
        NULL,
        NOW() + INTERVAL '1 week',
        NOW() + INTERVAL '3 months',
        'Blue Ocean Initiative',
        '5 hours / week',
        NOW() + INTERVAL '5 days',
        '- Graphic design skills (Canva/Adobe)
- Video editing basics
- Passion for the ocean',
        '- Portfolio development
- Social media shoutouts
- Flexible schedule',
        'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80'
    ),
    (
        v_poster_id,
        'Refugee Mentorship Program Lead',
        'Pair local mentors with newly arrived refugee families to help them navigate their new city.',
        'City Hall / Remote',
        'paid',
        ARRAY['Human Rights', 'Community', 'Social Justice'],
        'open',
        2000.00,
        NOW() + INTERVAL '1 month',
        NOW() + INTERVAL '7 months',
        'New Neighbors Network',
        '15 hours / week',
        NOW() + INTERVAL '3 weeks',
        '- Experience in social work or related field
- Cultural competency
- Second language is a plus',
        '- Monthly stipend
- Professional development training
- Meaningful cross-cultural connections',
        'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=800&q=80'
    ),
    (
        v_poster_id,
        'Beach Cleanup Team Leader',
        'Lead a team of volunteers during our monthly beach cleanup events. Ensure safety and proper waste sorting.',
        'Ocean Beach',
        'volunteer',
        ARRAY['Environment', 'Leadership'],
        'open',
        NULL,
        NOW() + INTERVAL '2 weeks',
        NOW() + INTERVAL '1 year',
        'Coastal Keepers',
        '4 hours / month',
        NOW() + INTERVAL '1 week',
        '- Passion for environmental protection
- Ability to direct groups
- Reliability',
        '- Branded t-shirt and gear
- Volunteer appreciation events
- Leadership experience',
        'https://images.unsplash.com/photo-1618477461853-5f8dd68aa1fd?auto=format&fit=crop&w=800&q=80'
    ),
    (
        v_poster_id,
        'STEM Workshop Facilitator',
        'Run weekend science and coding workshops for elementary school children.',
        'Innovation Library',
        'volunteer',
        ARRAY['Education', 'Technology', 'STEM'],
        'open',
        NULL,
        NOW() + INTERVAL '1 month',
        NOW() + INTERVAL '4 months',
        'Future Scientists Lab',
        '3 hours / Saturday',
        NOW() + INTERVAL '2 weeks',
        '- Background in science or tech
- Experience with children
- Enthusiasm',
        '- Teaching experience
- Letter of recommendation
- Fun and interactive environment',
        'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80'
    );

END$$;
