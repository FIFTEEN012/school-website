-- Insert Director
INSERT INTO personnel (name, position, position_en, rank, department, is_active)
VALUES 
('นางสาวสมหญิง รักเรียน', 'ผู้อำนวยการโรงเรียน', 'School Director', 1, 'admin', true);

-- Insert Deputy Directors
INSERT INTO personnel (name, position, position_en, rank, department, is_active)
VALUES 
('นายสมชาย ใจดี', 'รองผู้อำนวยการฝ่ายวิชาการ', 'Deputy Director of Academic Affairs', 2, 'admin', true),
('นางสาววิไล งามตา', 'รองผู้อำนวยการฝ่ายบริหารทั่วไป', 'Deputy Director of General Administration', 3, 'admin', true),
('นายประสิทธิ์ กิจการ', 'รองผู้อำนวยการฝ่ายกิจการนักเรียน', 'Deputy Director of Student Affairs', 4, 'admin', true),
('นางสมศรี มีทรัพย์', 'รองผู้อำนวยการฝ่ายแผนงานและงบประมาณ', 'Deputy Director of Planning and Budget', 5, 'admin', true);

-- Insert School Board Members
INSERT INTO personnel (name, position, position_en, rank, department, is_active)
VALUES 
('นายประธาน ยิ่งใหญ่', 'ประธานคณะกรรมการสถานศึกษา', 'Chairman of the School Board', 6, 'board', true),
('นายชุมชน สัมพันธ์', 'ผู้แทนชุมชน', 'Community Representative', 7, 'board', true),
('นางผู้ปกครอง ห่วงใย', 'ผู้แทนผู้ปกครอง', 'Parent Representative', 8, 'board', true),
('นายศิษย์เก่า ภูมิใจ', 'ผู้แทนศิษย์เก่า', 'Alumni Representative', 9, 'board', true),
('นางครู สอนดี', 'ผู้แทนครู', 'Teacher Representative', 10, 'board', true);
