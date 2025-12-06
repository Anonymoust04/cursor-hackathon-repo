-- seed-data.sql
-- Mock data for prototyping: applicant_profiles, poster_profiles, and projects
-- Note: This assumes auth.users already exist with corresponding auth_user_id values
-- You may need to create auth users first or use existing ones

-- ============================================================================
-- POSTER PROFILES (Organizations)
-- ============================================================================
-- These will be referenced by projects as poster_id

INSERT INTO poster_profiles (id, auth_user_id, organization_name, full_name, avatar_url, organization_description, organization_data, projects_completed, projects_ongoing, projects_inviting_applications, onboarding_completed) VALUES
('11111111-1111-1111-1111-111111111111', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'GreenCorp Initiative', 'Sarah Johnson', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400', 'Leading environmental sustainability projects and community garden initiatives across urban areas.', '{"website": "https://greencorp.org", "social_links": {"twitter": "@greencorp", "linkedin": "greencorp-org"}}', ARRAY[]::uuid[], ARRAY[]::uuid[], ARRAY[]::uuid[], true),
('22222222-2222-2222-2222-222222222222', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Tech for Good Foundation', 'Michael Chen', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', 'Empowering underserved communities through technology education and digital literacy programs.', '{"website": "https://techforgood.org", "social_links": {"twitter": "@techforgood", "facebook": "techforgoodfoundation"}}', ARRAY[]::uuid[], ARRAY[]::uuid[], ARRAY[]::uuid[], true),
('33333333-3333-3333-3333-333333333333', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'Education First Alliance', 'Emma Rodriguez', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400', 'Bridging educational gaps through tutoring, mentorship, and resource distribution programs.', '{"website": "https://educationfirst.org", "social_links": {"instagram": "@educationfirst", "linkedin": "education-first-alliance"}}', ARRAY[]::uuid[], ARRAY[]::uuid[], ARRAY[]::uuid[], true),
('44444444-4444-4444-4444-444444444444', 'dddddddd-dddd-dddd-dddd-dddddddddddd', 'Health & Wellness Community', 'Dr. James Wilson', 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400', 'Promoting public health awareness and providing free health screenings and wellness workshops.', '{"website": "https://healthwellness.org", "social_links": {"twitter": "@healthwellness", "linkedin": "health-wellness-community"}}', ARRAY[]::uuid[], ARRAY[]::uuid[], ARRAY[]::uuid[], true),
('55555555-5555-5555-5555-555555555555', 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'Arts & Culture Collective', 'Priya Patel', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400', 'Supporting local artists and cultural preservation through exhibitions, workshops, and community events.', '{"website": "https://artsculture.org", "social_links": {"instagram": "@artsculture", "facebook": "artsculturecollective"}}', ARRAY[]::uuid[], ARRAY[]::uuid[], ARRAY[]::uuid[], true),
('66666666-6666-6666-6666-666666666666', 'ffffffff-ffff-ffff-ffff-ffffffffffff', 'Youth Development Network', 'David Kim', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400', 'Mentoring and developing leadership skills in young people through structured programs and activities.', '{"website": "https://youthdev.org", "social_links": {"twitter": "@youthdev", "linkedin": "youth-development-network"}}', ARRAY[]::uuid[], ARRAY[]::uuid[], ARRAY[]::uuid[], true),
('77777777-7777-7777-7777-777777777777', '00000000-0000-0000-0000-000000000001', 'Animal Welfare Society', 'Lisa Anderson', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400', 'Rescuing, rehabilitating, and rehoming animals while promoting responsible pet ownership.', '{"website": "https://animalwelfare.org", "social_links": {"instagram": "@animalwelfare", "facebook": "animalwelfaresociety"}}', ARRAY[]::uuid[], ARRAY[]::uuid[], ARRAY[]::uuid[], true);

-- ============================================================================
-- PROJECTS
-- ============================================================================
-- These projects are created by the poster profiles above

INSERT INTO projects (
  id, poster_id, title, description, location, type, cause_tags, status, 
  compensation_amount, start_time, end_time, company_name, company_description,
  time_commitment, application_deadline, requirements, benefits, image_url,
  is_completed, is_ongoing, is_accepting_applications
) VALUES
-- GreenCorp Projects
('a1000000-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', 
 'Community Garden Revitalization Project', 
 'Transform an underused urban space into a vibrant community garden. This project aims to create a green oasis that provides fresh, local produce, fosters community engagement, and serves as an educational hub for sustainable urban agriculture.',
 'Taman KLCC, Jalan Ampang, Kuala Lumpur City Centre, 50088 Kuala Lumpur', 'volunteer', ARRAY['Environment', 'Community', 'Sustainability'], 'open',
 NULL, '2024-06-01 08:00:00+00', '2024-08-31 18:00:00+00', 'GreenCorp Initiative', 
 'Leading environmental sustainability projects and community garden initiatives.',
 '5-10 hours / week', '2024-05-25 23:59:59+00',
 'No prior gardening experience required. Must be willing to work outdoors in various weather conditions. Commitment to attend weekly work sessions.',
 'Learn sustainable gardening techniques, connect with your community, fresh produce to take home, valuable hands-on experience in environmental conservation.',
 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800',
 false, false, true),

('a1000000-0000-0000-0000-000000000002', '11111111-1111-1111-1111-111111111111',
 'Urban Tree Planting Initiative',
 'Help us plant 500 trees across the city to combat urban heat islands and improve air quality. Volunteers will learn proper tree planting techniques and contribute to a greener urban environment.',
 'Perdana Botanical Gardens, Jalan Kebun Bunga, Tasik Perdana, 55100 Kuala Lumpur', 'volunteer', ARRAY['Environment', 'Climate'], 'open',
 NULL, '2024-07-01 07:00:00+00', '2024-09-30 17:00:00+00', 'GreenCorp Initiative',
 'Leading environmental sustainability projects.',
 '3-6 hours / week', '2024-06-20 23:59:59+00',
 'Ability to lift 20lbs, comfortable working outdoors. No experience necessary.',
 'Make a measurable impact on city environment, learn arboriculture skills, earn community service hours, free t-shirt and refreshments.',
 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800',
 false, false, true),

('a1000000-0000-0000-0000-000000000003', '11111111-1111-1111-1111-111111111111',
 'Beach Cleanup Campaign',
 'Monthly beach cleanup events to protect marine life and coastal ecosystems. Join us for a morning of community service at the local beach.',
 'Pantai Port Dickson, Batu 4, Jalan Pantai, 71000 Port Dickson, Negeri Sembilan', 'volunteer', ARRAY['Environment', 'Marine', 'Community'], 'completed',
 NULL, '2024-03-15 08:00:00+00', '2024-03-15 12:00:00+00', 'GreenCorp Initiative',
 'Leading environmental sustainability projects.',
 '4 hours (one-time event)', '2024-03-10 23:59:59+00',
 'Comfortable walking on sand, bringing your own water bottle. All cleanup supplies provided.',
 'Protect marine ecosystems, meet like-minded environmentalists, certificate of participation, free lunch provided.',
 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800',
 true, false, false),

-- Tech for Good Projects
('a2000000-0000-0000-0000-000000000001', '22222222-2222-2222-2222-222222222222',
 'Digital Literacy Workshop Series',
 'Teach basic computer skills, internet safety, and digital tools to seniors and underserved community members. Help bridge the digital divide in our community.',
 'Pusat Internet Komuniti PPR Pantai Ria, Jalan Pantai Dalam, 59200 Kuala Lumpur', 'volunteer', ARRAY['Education', 'Technology', 'Elderly'], 'ongoing',
 NULL, '2024-05-01 10:00:00+00', '2024-12-31 16:00:00+00', 'Tech for Good Foundation',
 'Empowering underserved communities through technology education.',
 '4-6 hours / week', '2024-04-25 23:59:59+00',
 'Patience and good communication skills. Basic computer knowledge helpful but not required. Background check required.',
 'Make a real difference in people''s lives, improve your teaching and communication skills, meet amazing community members, certification provided.',
 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800',
 false, true, false),

('a2000000-0000-0000-0000-000000000002', '22222222-2222-2222-2222-222222222222',
 'Web Development for Non-Profits',
 'Build and maintain websites for local non-profit organizations. This is a paid gig opportunity for experienced web developers.',
 'Remote / Hybrid (Base: MaGIC, Block 3730, Persiaran APEC, Cyber 8, 63000 Cyberjaya, Selangor)', 'paid', ARRAY['Technology', 'Non-Profit'], 'open',
 5000.00, '2024-06-01 00:00:00+00', '2024-08-31 23:59:59+00', 'Tech for Good Foundation',
 'Empowering underserved communities through technology.',
 '15-20 hours / week', '2024-05-20 23:59:59+00',
 'Experience with HTML, CSS, JavaScript required. React/Next.js experience preferred. Portfolio required.',
 '$5000 stipend for completed project, portfolio piece for non-profit sector, flexible remote work, networking with non-profit leaders.',
 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800',
 false, false, true),

('a2000000-0000-0000-0000-000000000003', '22222222-2222-2222-2222-222222222222',
 'Youth Coding Bootcamp',
 'Mentor high school students learning to code. Teach Python basics and help students build their first projects.',
 '42 Kuala Lumpur, Sunway FutureX, Jalan PJS 11/26, Bandar Sunway, 47500 Subang Jaya, Selangor', 'volunteer', ARRAY['Education', 'Technology', 'Youth'], 'open',
 NULL, '2024-07-08 09:00:00+00', '2024-08-16 15:00:00+00', 'Tech for Good Foundation',
 'Empowering underserved communities through technology.',
 '8 hours / week (6 weeks)', '2024-06-30 23:59:59+00',
 'Proficiency in Python, patience with beginners, teaching experience preferred but not required.',
 'Inspire the next generation of coders, strengthen your teaching skills, certificate of mentorship, potential future interns/employees.',
 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800',
 false, false, true),

-- Education First Projects
('a3000000-0000-0000-0000-000000000001', '33333333-3333-3333-3333-333333333333',
 'After-School Tutoring Program',
 'Provide one-on-one tutoring to elementary and middle school students in math, reading, and science. Help students achieve academic success.',
 'SK Bangsar, Jalan Pantai Baharu, 59200 Kuala Lumpur', 'volunteer', ARRAY['Education', 'Youth', 'Mentoring'], 'ongoing',
 NULL, '2024-09-01 15:00:00+00', '2024-12-20 17:00:00+00', 'Education First Alliance',
 'Bridging educational gaps through tutoring and mentorship.',
 '2-4 hours / week', '2024-08-25 23:59:59+00',
 'Strong knowledge in subject areas, patience, background check required. Teaching experience preferred.',
 'Make a lasting impact on children''s education, develop teaching and communication skills, flexible scheduling, training provided.',
 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800',
 false, true, false),

('a3000000-0000-0000-0000-000000000002', '33333333-3333-3333-3333-333333333333',
 'College Application Workshop',
 'Guide high school seniors through the college application process. Help with essay writing, application forms, and financial aid resources.',
 'Perpustakaan Negara Malaysia, 232, Jalan Tun Razak, Titiwangsa, 50572 Kuala Lumpur', 'volunteer', ARRAY['Education', 'Youth', 'Mentoring'], 'open',
 NULL, '2024-09-15 13:00:00+00', '2024-11-30 16:00:00+00', 'Education First Alliance',
 'Bridging educational gaps.',
 '3-5 hours / week', '2024-09-01 23:59:59+00',
 'College degree preferred, familiarity with college application process, strong writing skills.',
 'Help students achieve their dreams, use your experience to guide others, rewarding experience, networking opportunities.',
 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800',
 false, false, true),

-- Health & Wellness Projects
('a4000000-0000-0000-0000-000000000001', '44444444-4444-4444-4444-444444444444',
 'Free Health Screening Day',
 'Volunteer at our community health fair providing free blood pressure, glucose, and BMI screenings. Help promote preventive health care.',
 'Klinik Kesihatan Cheras, Jalan Yaacob Latif, Bandar Tun Razak, 56000 Kuala Lumpur', 'volunteer', ARRAY['Health', 'Community'], 'open',
 NULL, '2024-07-20 08:00:00+00', '2024-07-20 16:00:00+00', 'Health & Wellness Community',
 'Promoting public health awareness.',
 '8 hours (one-time event)', '2024-07-15 23:59:59+00',
 'Medical training preferred but not required. Will train on basic screening procedures. Friendly and professional demeanor.',
 'Serve your community, learn basic health screening skills, networking with healthcare professionals, certificate of participation.',
 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800',
 false, false, true),

('a4000000-0000-0000-0000-000000000002', '44444444-4444-4444-4444-444444444444',
 'Mental Health Support Group Facilitation',
 'Facilitate weekly support groups for individuals dealing with stress, anxiety, and depression. Training provided by licensed therapists.',
 'The Mind Faculty, 11, Jalan Solaris 4, Solaris Mont Kiara, 50480 Kuala Lumpur', 'volunteer', ARRAY['Health', 'Mental Health', 'Community'], 'ongoing',
 NULL, '2024-06-03 18:00:00+00', '2024-12-31 20:00:00+00', 'Health & Wellness Community',
 'Promoting public health awareness.',
 '2 hours / week', '2024-05-25 23:59:59+00',
 'Empathy, good listening skills, completion of provided training program. Psychology/counseling background helpful.',
 'Make a difference in mental health support, valuable experience in group facilitation, professional development, certificate upon completion.',
 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800',
 false, true, false),

-- Arts & Culture Projects
('a5000000-0000-0000-0000-000000000001', '55555555-5555-5555-5555-555555555555',
 'Community Art Mural Project',
 'Help design and paint a large-scale mural celebrating local culture and diversity. Work with professional artists and community members.',
 'Lorong Panggung, City Centre, 50000 Kuala Lumpur', 'volunteer', ARRAY['Arts', 'Culture', 'Community'], 'open',
 NULL, '2024-07-10 09:00:00+00', '2024-08-15 17:00:00+00', 'Arts & Culture Collective',
 'Supporting local artists and cultural preservation.',
 '6-8 hours / week', '2024-07-01 23:59:59+00',
 'Artistic ability helpful but not required. Willingness to work on ladders/scaffolding. All supplies provided.',
 'Create lasting public art, work with professional artists, learn mural painting techniques, recognition on project plaque.',
 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800',
 false, false, true),

('a5000000-0000-0000-0000-000000000002', '55555555-5555-5555-5555-555555555555',
 'Sustainable Fashion Expo',
 'Organize and run a community fashion show featuring upcycled and sustainable fashion designs. Help promote eco-conscious fashion.',
 'Kuala Lumpur Convention Centre, Jalan Pinang, Kuala Lumpur City Centre, 50088 Kuala Lumpur', 'volunteer', ARRAY['Arts', 'Environment', 'Fashion'], 'completed',
 NULL, '2024-04-20 10:00:00+00', '2024-04-20 20:00:00+00', 'Arts & Culture Collective',
 'Supporting local artists and cultural preservation.',
 '10 hours (event day)', '2024-04-15 23:59:59+00',
 'Event planning experience helpful, organized, good communication skills. Must be available for event day.',
 'Experience in event management, network with fashion industry professionals, fun and creative environment, certificate of participation.',
 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800',
 true, false, false),

-- Youth Development Projects
('a6000000-0000-0000-0000-000000000001', '66666666-6666-6666-6666-666666666666',
 'Summer Leadership Academy',
 'Mentor middle and high school students in a 6-week leadership development program. Teach communication, problem-solving, and team-building skills.',
 'International Youth Centre, Jalan Yaacob Latif, Bandar Tun Razak, 56000 Kuala Lumpur', 'volunteer', ARRAY['Youth', 'Mentoring', 'Leadership'], 'open',
 NULL, '2024-07-01 09:00:00+00', '2024-08-09 15:00:00+00', 'Youth Development Network',
 'Mentoring and developing leadership skills in young people.',
 '10-12 hours / week (6 weeks)', '2024-06-20 23:59:59+00',
 'Leadership experience, patience with youth, background check required. Teaching or mentoring experience preferred.',
 'Develop your leadership and mentoring skills, make a lasting impact on youth, professional development, certificate and reference letter.',
 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800',
 false, false, true),

('a6000000-0000-0000-0000-000000000002', '66666666-6666-6666-6666-666666666666',
 'Sports Coaching for Underprivileged Youth',
 'Coach basketball, soccer, or track teams for children ages 8-14. Provide positive role modeling through sports.',
 'Kompleks Sukan Bangsar, Jalan Terasek 3, Bangsar Baru, 59100 Kuala Lumpur', 'volunteer', ARRAY['Youth', 'Sports', 'Mentoring'], 'ongoing',
 NULL, '2024-09-01 16:00:00+00', '2024-12-15 18:00:00+00', 'Youth Development Network',
 'Mentoring and developing leadership skills.',
 '3-4 hours / week', '2024-08-25 23:59:59+00',
 'Knowledge of sport rules and basic coaching, experience working with children, background check required.',
 'Share your passion for sports, positive impact on youth development, coaching experience, fun and rewarding environment.',
 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800',
 false, true, false),

-- Animal Welfare Projects
('a7000000-0000-0000-0000-000000000001', '77777777-7777-7777-7777-777777777777',
 'Animal Shelter Volunteer',
 'Help care for rescued animals at our shelter. Duties include feeding, walking, cleaning, and socializing with animals to prepare them for adoption.',
 'PAWS Animal Welfare Society, Pilmoor Estate, Subang Airport Road, 47200 Subang Jaya, Selangor', 'volunteer', ARRAY['Animals', 'Community'], 'ongoing',
 NULL, '2024-06-01 08:00:00+00', '2024-12-31 18:00:00+00', 'Animal Welfare Society',
 'Rescuing, rehabilitating, and rehoming animals.',
 '4-6 hours / week', '2024-05-25 23:59:59+00',
 'Love for animals, physical ability to handle dogs of various sizes, commitment to regular schedule. Training provided.',
 'Work with amazing animals, learn animal care skills, contribute to animal welfare, opportunity to adopt with priority.',
 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800',
 false, true, false),

('a7000000-0000-0000-0000-000000000002', '77777777-7777-7777-7777-777777777777',
 'Adoption Event Coordinator',
 'Plan and execute monthly pet adoption events. Coordinate with volunteers, set up event spaces, and help match pets with families.',
 'The Square by Jaya One, 72A, Jalan Universiti, 46200 Petaling Jaya, Selangor', 'volunteer', ARRAY['Animals', 'Events'], 'open',
 NULL, '2024-07-15 10:00:00+00', '2024-12-31 16:00:00+00', 'Animal Welfare Society',
 'Rescuing, rehabilitating, and rehoming animals.',
 '5-8 hours / month', '2024-07-10 23:59:59+00',
 'Event planning experience helpful, organized, good communication skills, love for animals.',
 'Help pets find forever homes, gain event management experience, work with passionate volunteers, rewarding experience.',
 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800',
 false, false, true),

-- Additional Mixed Projects
('a8000000-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111',
 'Food Bank Distribution Volunteer',
 'Assist with sorting, packaging, and distributing food to families in need. Help combat food insecurity in our community.',
 'Kechara Soup Kitchen, 17, Jalan Medan Tuanku, Medan Tuanku, 50300 Kuala Lumpur', 'volunteer', ARRAY['Community', 'Food Security', 'Hunger'], 'open',
 NULL, '2024-06-15 09:00:00+00', '2024-12-31 14:00:00+00', 'GreenCorp Initiative',
 'Leading environmental sustainability projects.',
 '3-5 hours / week', '2024-06-10 23:59:59+00',
 'Ability to lift 25lbs, standing for extended periods, friendly and respectful demeanor.',
 'Directly help families in need, learn about food insecurity, flexible scheduling, community service hours.',
 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800',
 false, false, true),

('a8000000-0000-0000-0000-000000000002', '33333333-3333-3333-3333-333333333333',
 'Book Drive and Library Setup',
 'Collect and organize book donations, then set up a free community library in an underserved neighborhood.',
 'Pusat Kreatif Kanak-kanak Tuanku Bainun, 48, Jalan Tun Mohd Fuad, Taman Tun Dr Ismail, 60000 Kuala Lumpur', 'volunteer', ARRAY['Education', 'Community', 'Literacy'], 'completed',
 NULL, '2024-02-01 10:00:00+00', '2024-03-31 16:00:00+00', 'Education First Alliance',
 'Bridging educational gaps.',
 '6-8 hours / week', '2024-01-25 23:59:59+00',
 'Organizational skills, ability to lift and carry books, passion for literacy.',
 'Promote literacy in your community, organizational experience, meet book lovers, see direct impact of your work.',
 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800',
 true, false, false);

-- ============================================================================
-- APPLICANT PROFILES
-- ============================================================================
-- These applicants have various projects in their arrays (completed, ongoing, applied_to)

INSERT INTO applicant_profiles (
  id, auth_user_id, full_name, avatar_url, impact_hours, characteristics,
  projects_completed, projects_ongoing, projects_applied_to, onboarding_completed
) VALUES
-- Applicant 1: Experienced volunteer with multiple completed projects
('b1000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001',
 'Alex Chen', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
 1240,
 '{"bio": "Connecting social impact with student innovation. Passionate about sustainable development and community building.", "skills": ["Project Management", "Public Speaking", "Environmental Science"], "interests": ["Sustainability", "Education", "Community Development"], "education": "BS Environmental Science, State University"}',
 ARRAY['a1000000-0000-0000-0000-000000000003'::uuid, 'a5000000-0000-0000-0000-000000000002'::uuid, 'a8000000-0000-0000-0000-000000000002'::uuid],
 ARRAY['a1000000-0000-0000-0000-000000000001'::uuid, 'a3000000-0000-0000-0000-000000000001'::uuid],
 ARRAY['a2000000-0000-0000-0000-000000000003'::uuid],
 true),

-- Applicant 2: Tech-focused volunteer
('b1000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000002',
 'Jordan Taylor', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
 850,
 '{"bio": "Software developer passionate about using technology to solve social problems. Love teaching and mentoring.", "skills": ["Web Development", "Python", "Teaching"], "interests": ["Technology", "Education", "Coding"], "education": "BS Computer Science, Tech University"}',
 ARRAY['a2000000-0000-0000-0000-000000000001'::uuid],
 ARRAY['a2000000-0000-0000-0000-000000000002'::uuid],
 ARRAY['a2000000-0000-0000-0000-000000000003'::uuid, 'a6000000-0000-0000-0000-000000000001'::uuid],
 true),

-- Applicant 3: Health and wellness volunteer
('b1000000-0000-0000-0000-000000000003', '10000000-0000-0000-0000-000000000003',
 'Morgan Lee', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
 620,
 '{"bio": "Psychology student interested in mental health advocacy and community wellness programs.", "skills": ["Counseling", "Active Listening", "Mental Health Awareness"], "interests": ["Mental Health", "Community Wellness", "Psychology"], "education": "BA Psychology (in progress), State University"}',
 ARRAY[]::uuid[],
 ARRAY['a4000000-0000-0000-0000-000000000002'::uuid],
 ARRAY['a4000000-0000-0000-0000-000000000001'::uuid, 'a3000000-0000-0000-0000-000000000002'::uuid],
 true),

-- Applicant 4: Youth mentor
('b1000000-0000-0000-0000-000000000004', '10000000-0000-0000-0000-000000000004',
 'Sam Rivera', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
 980,
 '{"bio": "Former teacher now working in non-profits. Dedicated to empowering young people through education and mentorship.", "skills": ["Teaching", "Mentoring", "Curriculum Development"], "interests": ["Youth Development", "Education", "Leadership"], "education": "MEd Education, Teachers College"}',
 ARRAY['a3000000-0000-0000-0000-000000000001'::uuid, 'a8000000-0000-0000-0000-000000000002'::uuid],
 ARRAY['a6000000-0000-0000-0000-000000000001'::uuid],
 ARRAY['a6000000-0000-0000-0000-000000000002'::uuid, 'a3000000-0000-0000-0000-000000000002'::uuid],
 true),

-- Applicant 5: Animal lover
('b1000000-0000-0000-0000-000000000005', '10000000-0000-0000-0000-000000000005',
 'Casey Kim', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
 450,
 '{"bio": "Veterinary student volunteering to gain hands-on experience with animals while helping them find forever homes.", "skills": ["Animal Care", "First Aid", "Event Planning"], "interests": ["Animal Welfare", "Veterinary Medicine", "Rescue"], "education": "DVM (in progress), Veterinary School"}',
 ARRAY[]::uuid[],
 ARRAY['a7000000-0000-0000-0000-000000000001'::uuid],
 ARRAY['a7000000-0000-0000-0000-000000000002'::uuid],
 true),

-- Applicant 6: Arts and culture enthusiast
('b1000000-0000-0000-0000-000000000006', '10000000-0000-0000-0000-000000000006',
 'Riley Johnson', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400',
 720,
 '{"bio": "Art student passionate about using art to bring communities together and celebrate diversity.", "skills": ["Painting", "Design", "Event Coordination"], "interests": ["Public Art", "Community Events", "Cultural Preservation"], "education": "BFA Fine Arts, Art Institute"}',
 ARRAY['a5000000-0000-0000-0000-000000000002'::uuid],
 ARRAY[]::uuid[],
 ARRAY['a5000000-0000-0000-0000-000000000001'::uuid],
 true),

-- Applicant 7: Environmental activist
('b1000000-0000-0000-0000-000000000007', '10000000-0000-0000-0000-000000000007',
 'Taylor Martinez', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
 1100,
 '{"bio": "Climate activist and environmental science major working to make our planet greener, one project at a time.", "skills": ["Environmental Science", "Community Organizing", "Public Speaking"], "interests": ["Climate Change", "Sustainability", "Environmental Policy"], "education": "BS Environmental Science, Green University"}',
 ARRAY['a1000000-0000-0000-0000-000000000003'::uuid],
 ARRAY['a1000000-0000-0000-0000-000000000001'::uuid, 'a1000000-0000-0000-0000-000000000002'::uuid],
 ARRAY['a8000000-0000-0000-0000-000000000001'::uuid],
 true),

-- Applicant 8: Community service focused
('b1000000-0000-0000-0000-000000000008', '10000000-0000-0000-0000-000000000008',
 'Jamie Wang', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
 560,
 '{"bio": "Business student with a passion for social impact. Interested in non-profit management and community development.", "skills": ["Project Management", "Marketing", "Fundraising"], "interests": ["Non-Profit Management", "Community Development", "Social Entrepreneurship"], "education": "BS Business Administration, Business School"}',
 ARRAY[]::uuid[],
 ARRAY['a8000000-0000-0000-0000-000000000001'::uuid],
 ARRAY['a1000000-0000-0000-0000-000000000001'::uuid, 'a6000000-0000-0000-0000-000000000001'::uuid],
 true),

-- Applicant 9: Healthcare volunteer
('b1000000-0000-0000-0000-000000000009', '10000000-0000-0000-0000-000000000009',
 'Avery Brown', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
 380,
 '{"bio": "Pre-med student gaining clinical and community health experience while serving underserved populations.", "skills": ["Basic Medical Skills", "Patient Care", "Health Education"], "interests": ["Public Health", "Medicine", "Community Health"], "education": "BS Biology (pre-med), Medical University"}',
 ARRAY[]::uuid[],
 ARRAY[]::uuid[],
 ARRAY['a4000000-0000-0000-0000-000000000001'::uuid, 'a4000000-0000-0000-0000-000000000002'::uuid],
 true),

-- Applicant 10: Sports coach
('b1000000-0000-0000-0000-000000000010', '10000000-0000-0000-0000-000000000010',
 'Dakota Singh', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
 340,
 '{"bio": "Former college athlete now coaching youth sports. Believe in the power of sports to build character and confidence.", "skills": ["Coaching", "Athletic Training", "Youth Development"], "interests": ["Sports", "Youth Mentoring", "Physical Fitness"], "education": "BA Kinesiology, Sports University"}',
 ARRAY[]::uuid[],
 ARRAY[]::uuid[],
 ARRAY['a6000000-0000-0000-0000-000000000002'::uuid],
 true),

-- Applicant 11: Multi-skilled volunteer
('b1000000-0000-0000-0000-000000000011', '10000000-0000-0000-0000-000000000011',
 'Blake Thompson', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
 890,
 '{"bio": "Engineer by day, volunteer by night. Passionate about using technical skills for social good and mentoring the next generation.", "skills": ["Engineering", "Programming", "Teaching", "Project Management"], "interests": ["STEM Education", "Technology", "Mentoring"], "education": "BS Engineering, Tech Institute"}',
 ARRAY['a2000000-0000-0000-0000-000000000001'::uuid],
 ARRAY['a2000000-0000-0000-0000-000000000002'::uuid],
 ARRAY['a2000000-0000-0000-0000-000000000003'::uuid, 'a3000000-0000-0000-0000-000000000002'::uuid],
 true),

-- Applicant 12: New volunteer
('b1000000-0000-0000-0000-000000000012', '10000000-0000-0000-0000-000000000012',
 'Quinn Davis', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400',
 120,
 '{"bio": "Just starting my volunteer journey! Excited to make a difference in my community.", "skills": ["Communication", "Organization"], "interests": ["Community Service", "Learning"], "education": "High School Senior"}',
 ARRAY[]::uuid[],
 ARRAY[]::uuid[],
 ARRAY['a1000000-0000-0000-0000-000000000001'::uuid, 'a4000000-0000-0000-0000-000000000001'::uuid, 'a7000000-0000-0000-0000-000000000001'::uuid],
 true);

-- ============================================================================
-- UPDATE POSTER PROFILES WITH PROJECT ARRAYS
-- ============================================================================
-- Now that projects are created, update poster profiles with their project IDs

UPDATE poster_profiles SET
  projects_inviting_applications = ARRAY[
    'a1000000-0000-0000-0000-000000000001'::uuid,
    'a1000000-0000-0000-0000-000000000002'::uuid,
    'a2000000-0000-0000-0000-000000000002'::uuid,
    'a2000000-0000-0000-0000-000000000003'::uuid,
    'a3000000-0000-0000-0000-000000000002'::uuid,
    'a4000000-0000-0000-0000-000000000001'::uuid,
    'a5000000-0000-0000-0000-000000000001'::uuid,
    'a6000000-0000-0000-0000-000000000001'::uuid,
    'a7000000-0000-0000-0000-000000000002'::uuid,
    'a8000000-0000-0000-0000-000000000001'::uuid
  ],
  projects_ongoing = ARRAY[
    'a2000000-0000-0000-0000-000000000001'::uuid,
    'a3000000-0000-0000-0000-000000000001'::uuid,
    'a4000000-0000-0000-0000-000000000002'::uuid,
    'a6000000-0000-0000-0000-000000000002'::uuid,
    'a7000000-0000-0000-0000-000000000001'::uuid
  ],
  projects_completed = ARRAY[
    'a1000000-0000-0000-0000-000000000003'::uuid,
    'a5000000-0000-0000-0000-000000000002'::uuid,
    'a8000000-0000-0000-0000-000000000002'::uuid
  ]
WHERE id = '11111111-1111-1111-1111-111111111111';

UPDATE poster_profiles SET
  projects_inviting_applications = ARRAY[
    'a2000000-0000-0000-0000-000000000002'::uuid,
    'a2000000-0000-0000-0000-000000000003'::uuid
  ],
  projects_ongoing = ARRAY[
    'a2000000-0000-0000-0000-000000000001'::uuid
  ],
  projects_completed = ARRAY[]::uuid[]
WHERE id = '22222222-2222-2222-2222-222222222222';

UPDATE poster_profiles SET
  projects_inviting_applications = ARRAY[
    'a3000000-0000-0000-0000-000000000002'::uuid
  ],
  projects_ongoing = ARRAY[
    'a3000000-0000-0000-0000-000000000001'::uuid
  ],
  projects_completed = ARRAY[
    'a8000000-0000-0000-0000-000000000002'::uuid
  ]
WHERE id = '33333333-3333-3333-3333-333333333333';

UPDATE poster_profiles SET
  projects_inviting_applications = ARRAY[
    'a4000000-0000-0000-0000-000000000001'::uuid
  ],
  projects_ongoing = ARRAY[
    'a4000000-0000-0000-0000-000000000002'::uuid
  ],
  projects_completed = ARRAY[]::uuid[]
WHERE id = '44444444-4444-4444-4444-444444444444';

UPDATE poster_profiles SET
  projects_inviting_applications = ARRAY[
    'a5000000-0000-0000-0000-000000000001'::uuid
  ],
  projects_ongoing = ARRAY[]::uuid[],
  projects_completed = ARRAY[
    'a5000000-0000-0000-0000-000000000002'::uuid
  ]
WHERE id = '55555555-5555-5555-5555-555555555555';

UPDATE poster_profiles SET
  projects_inviting_applications = ARRAY[
    'a6000000-0000-0000-0000-000000000001'::uuid
  ],
  projects_ongoing = ARRAY[
    'a6000000-0000-0000-0000-000000000002'::uuid
  ],
  projects_completed = ARRAY[]::uuid[]
WHERE id = '66666666-6666-6666-6666-666666666666';

UPDATE poster_profiles SET
  projects_inviting_applications = ARRAY[
    'a7000000-0000-0000-0000-000000000002'::uuid
  ],
  projects_ongoing = ARRAY[
    'a7000000-0000-0000-0000-000000000001'::uuid
  ],
  projects_completed = ARRAY[]::uuid[]
WHERE id = '77777777-7777-7777-7777-777777777777';

-- ============================================================================
-- NOTES
-- ============================================================================
-- 1. This seed data assumes you have corresponding auth.users records with
--    matching auth_user_id values. You may need to create these first using
--    Supabase Auth or your authentication system.
--
-- 2. Project IDs are hardcoded for reference. In production, these would be
--    generated by the database DEFAULT gen_random_uuid().
--
-- 3. The arrays (projects_completed, projects_ongoing, etc.) reference actual
--    project IDs, creating relationships between profiles and projects.
--
-- 4. Some applicants have projects in multiple arrays (e.g., applied to,
--    ongoing, and completed) to simulate real-world scenarios.
--
-- 5. Image URLs use Unsplash placeholder images. Replace with actual project
--    images when available.

