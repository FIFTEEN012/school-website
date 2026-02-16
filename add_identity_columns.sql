-- Add columns for School Identity (Symbols)
ALTER TABLE school_profile 
ADD COLUMN IF NOT EXISTS school_logo_url TEXT,
ADD COLUMN IF NOT EXISTS school_emblem_desc TEXT DEFAULT 'ตราสัญลักษณ์ประจำโรงเรียนสื่อถึงความมุ่งมั่นในการพัฒนาการศึกษา และความเป็นเลิศทางวิชาการ',
ADD COLUMN IF NOT EXISTS school_colors JSONB DEFAULT '[{"name": "สีม่วง (Purple)", "hex": "#9333ea", "meaning": "ความสามัคคี ความเข้มแข็ง"}, {"name": "สีเหลือง (Yellow)", "hex": "#facc15", "meaning": "ความสงบร่มเย็น เจริญรุ่งเรือง"}]'::jsonb,
ADD COLUMN IF NOT EXISTS school_tree_name TEXT DEFAULT 'ต้นตะแบก',
ADD COLUMN IF NOT EXISTS school_tree_sciname TEXT DEFAULT 'Lagerstroemia floribunda',
ADD COLUMN IF NOT EXISTS school_tree_desc TEXT DEFAULT 'ต้นไม้ที่สื่อถึงความอดทน แข็งแกร่ง และความสวยงามที่ยั่งยืน เป็นร่มเงาให้แก่สถานศึกษา',
ADD COLUMN IF NOT EXISTS school_tree_image_url TEXT;
