-- Create courses table
CREATE TABLE IF NOT EXISTS courses (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  instructor VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  level VARCHAR(50) NOT NULL,
  duration VARCHAR(50),
  price DECIMAL(10,2),
  rating DECIMAL(3,2) DEFAULT 0,
  students_count INTEGER DEFAULT 0,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create enrollments table
CREATE TABLE IF NOT EXISTS enrollments (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  course_id INTEGER NOT NULL REFERENCES courses(id),
  enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  progress INTEGER DEFAULT 0,
  completed BOOLEAN DEFAULT FALSE,
  UNIQUE(user_id, course_id)
);

-- Create community_posts table
CREATE TABLE IF NOT EXISTS community_posts (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  user_name VARCHAR(255) NOT NULL,
  user_role VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  category VARCHAR(100) NOT NULL,
  upvotes INTEGER DEFAULT 0,
  downvotes INTEGER DEFAULT 0,
  replies_count INTEGER DEFAULT 0,
  file_url TEXT,
  file_name VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create post_replies table
CREATE TABLE IF NOT EXISTS post_replies (
  id SERIAL PRIMARY KEY,
  post_id INTEGER NOT NULL REFERENCES community_posts(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL,
  user_name VARCHAR(255) NOT NULL,
  user_role VARCHAR(50) NOT NULL,
  content TEXT NOT NULL,
  upvotes INTEGER DEFAULT 0,
  downvotes INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create post_votes table
CREATE TABLE IF NOT EXISTS post_votes (
  id SERIAL PRIMARY KEY,
  post_id INTEGER REFERENCES community_posts(id) ON DELETE CASCADE,
  reply_id INTEGER REFERENCES post_replies(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL,
  vote_type VARCHAR(10) NOT NULL CHECK (vote_type IN ('up', 'down')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(post_id, user_id),
  UNIQUE(reply_id, user_id)
);

-- Insert sample courses
INSERT INTO courses (title, description, instructor, category, level, duration, price, rating, students_count, image_url) VALUES
('Complete Web Development Bootcamp', 'Learn HTML, CSS, JavaScript, React, Node.js and more in this comprehensive course', 'Sarah Johnson', 'Web Development', 'Beginner', '40 hours', 89.99, 4.8, 15420, '/web-development-coding.png'),
('Data Science with Python', 'Master data analysis, visualization, and machine learning with Python', 'Dr. Michael Chen', 'Data Science', 'Intermediate', '35 hours', 79.99, 4.7, 8930, '/data-science-python-analytics.png'),
('Digital Marketing Mastery', 'Complete guide to SEO, social media marketing, and online advertising', 'Emma Rodriguez', 'Marketing', 'Beginner', '25 hours', 69.99, 4.6, 12340, '/digital-marketing-strategy.png'),
('Machine Learning Fundamentals', 'Introduction to ML algorithms, neural networks, and AI applications', 'Prof. David Kim', 'Technology', 'Advanced', '50 hours', 129.99, 4.9, 6780, '/machine-learning-ai.png'),
('UX/UI Design Principles', 'Learn user experience design, prototyping, and interface design', 'Lisa Wang', 'Design', 'Intermediate', '30 hours', 74.99, 4.5, 9560, '/ux-ui-design-interface.png'),
('Mobile App Development', 'Build iOS and Android apps with React Native', 'James Wilson', 'Mobile Development', 'Intermediate', '45 hours', 99.99, 4.7, 7230, '/mobile-app-development.png'),
('Cybersecurity Essentials', 'Protect systems and networks from digital attacks', 'Alex Thompson', 'Security', 'Beginner', '28 hours', 84.99, 4.6, 5670, '/cybersecurity-shield.png')
ON CONFLICT DO NOTHING;

-- Insert sample community posts
INSERT INTO community_posts (user_id, user_name, user_role, title, content, category, upvotes, replies_count) VALUES
('demo-student', 'John Doe', 'student', 'Best practices for learning JavaScript?', 'I''m new to JavaScript and wondering what are the most effective ways to learn and practice. Any recommendations for projects or resources?', 'General Discussion', 15, 8),
('demo-teacher', 'Prof. Smith', 'teacher', 'New Course: Advanced React Patterns', 'I''m excited to announce my new course on advanced React patterns including hooks, context, and performance optimization. Early bird discount available!', 'Course Announcements', 23, 12),
('demo-admin', 'Admin User', 'administrator', 'Community Guidelines Update', 'We''ve updated our community guidelines to ensure a better learning environment for everyone. Please review the new policies in the help section.', 'Announcements', 45, 6)
ON CONFLICT DO NOTHING;
