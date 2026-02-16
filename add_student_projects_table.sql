-- Create student_projects table
CREATE TABLE IF NOT EXISTS student_projects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    student_names TEXT NOT NULL, -- Comma separated names
    description TEXT,
    category TEXT, -- e.g., 'Short Film', 'Science Project', 'Coding App'
    image_url TEXT,
    video_url TEXT, -- YouTube embed URL or link
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE student_projects ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access" ON student_projects
    FOR SELECT USING (true);

-- Create policy to allow authenticated insert/update/delete (for admin)
CREATE POLICY "Allow authenticated full access" ON student_projects
    FOR ALL USING (auth.role() = 'authenticated');

-- Insert some sample data
INSERT INTO student_projects (title, student_names, description, category, image_url, video_url)
VALUES 
(
    'หนังสั้น "ความทรงจำสีจาง"', 
    'ด.ช. รักเรียน เพียรศึกษา, ด.ญ. ใจดี มีน้ำใจ', 
    'หนังสั้นสะท้อนสังคมเรื่องราวความรักและความผูกพันในวัยเรียน ที่ได้รับรางวัลชนะเลิศระดับจังหวัด', 
    'Short Film', 
    'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2525&auto=format&fit=crop',
    'https://www.youtube.com/embed/dQw4w9WgXcQ'
),
(
    'โครงงานวิทยาศาสตร์ "เครื่องกรองน้ำพลังงานแสงอาทิตย์"', 
    'นาย สมชาย ขายดี, นางสาว สมหญิง จริงใจ', 
    'นวัตกรรมเครื่องกรองน้ำที่ใช้พลังงานแสงอาทิตย์ในการฆ่าเชื้อโรค เหมาะสำหรับพื้นที่ห่างไกล', 
    'Science Project', 
    'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=2670&auto=format&fit=crop',
    'https://www.youtube.com/embed/dQw4w9WgXcQ'
),
(
    'แอปพลิเคชัน "School Mate"', 
    'ด.ช. เก่งกาจ ฉลาดล้ำ', 
    'แอปพลิเคชันช่วยจัดการตารางเรียนและการบ้านสำหรับนักเรียน ใช้งานง่ายและมีฟังก์ชันแจ้งเตือน', 
    'Coding App', 
    'https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=2574&auto=format&fit=crop',
    'https://www.youtube.com/embed/dQw4w9WgXcQ'
);
