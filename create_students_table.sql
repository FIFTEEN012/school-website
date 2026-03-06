-- Create students table for grade level statistics
CREATE TABLE IF NOT EXISTS students (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    grade_level INTEGER NOT NULL, -- 1-6 for primary, 7-9 for junior high, 10-12 for high school
    student_count INTEGER NOT NULL DEFAULT 0,
    academic_year INTEGER NOT NULL, -- e.g., 2025
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(grade_level, academic_year)
);

-- Enable Row Level Security
ALTER TABLE students ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access" ON students
    FOR SELECT USING (true);

-- Create policy to allow authenticated insert/update/delete (for admin)
CREATE POLICY "Allow authenticated full access" ON students
    FOR ALL USING (auth.role() = 'authenticated');

-- Insert sample data for current academic year (2025)
INSERT INTO students (grade_level, student_count, academic_year)
VALUES 
(1, 45, 2025),
(2, 42, 2025),
(3, 48, 2025),
(4, 46, 2025),
(5, 44, 2025),
(6, 43, 2025),
(7, 41, 2025),
(8, 39, 2025),
(9, 38, 2025),
(10, 35, 2025),
(11, 33, 2025),
(12, 30, 2025)
ON CONFLICT (grade_level, academic_year) DO NOTHING;
