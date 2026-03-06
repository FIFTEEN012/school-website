import { createClient } from '@/utils/supabase/server';

interface StudentData {
  grade_level: number;
  male_count: number;
  female_count: number;
  student_count: number;
  academic_year: number;
}

interface StudentStatsProps {
  academicYear?: number;
}

export default async function StudentStats({ academicYear = 2025 }: StudentStatsProps) {
  const supabase = await createClient();
  
  const { data: students, error } = await supabase
    .from('students')
    .select('*')
    .eq('academic_year', academicYear)
    .order('grade_level', { ascending: true });

  if (error) {
    console.error('Error fetching student data:', error);
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-600">ไม่สามารถโหลดข้อมูลนักเรียนได้</p>
      </div>
    );
  }

  const studentData = students || [];
  const totalStudents = studentData.reduce((sum, student) => sum + student.student_count, 0);

  // Group by education levels
  const juniorHigh = studentData.filter(s => s.grade_level >= 7 && s.grade_level <= 9);
  const highSchool = studentData.filter(s => s.grade_level >= 10 && s.grade_level <= 12);

  const juniorHighTotal = juniorHigh.reduce((sum, s) => sum + s.student_count, 0);
  const juniorHighMaleTotal = juniorHigh.reduce((sum, s) => sum + s.male_count, 0);
  const juniorHighFemaleTotal = juniorHigh.reduce((sum, s) => sum + s.female_count, 0);
  
  const highSchoolTotal = highSchool.reduce((sum, s) => sum + s.student_count, 0);
  const highSchoolMaleTotal = highSchool.reduce((sum, s) => sum + s.male_count, 0);
  const highSchoolFemaleTotal = highSchool.reduce((sum, s) => sum + s.female_count, 0);

  const grandTotal = juniorHighTotal + highSchoolTotal;
  const grandMaleTotal = juniorHighMaleTotal + highSchoolMaleTotal;
  const grandFemaleTotal = juniorHighFemaleTotal + highSchoolFemaleTotal;

  const getGradeLabel = (grade: number) => {
    if (grade >= 1 && grade <= 6) return `ป.${grade}`;
    if (grade >= 7 && grade <= 9) return `ม.${grade - 6}`;
    if (grade >= 10 && grade <= 12) return `ม.${grade - 6}`;
    return `ชั้น ${grade}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        📊 สถิติจำนวนนักเรียน ปีการศึกษา {academicYear}
      </h2>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <div className="text-4xl mb-2">👥</div>
          <div className="text-3xl font-bold text-blue-600">{grandTotal}</div>
          <div className="text-sm text-gray-600">รวมทั้งหมด</div>
        </div>
        <div className="bg-green-50 rounded-lg p-4 text-center">
          <div className="text-4xl mb-2">👦</div>
          <div className="text-2xl font-bold text-green-600">{grandMaleTotal}</div>
          <div className="text-sm text-gray-600">ชาย</div>
        </div>
        <div className="bg-pink-50 rounded-lg p-4 text-center">
          <div className="text-4xl mb-2">👧</div>
          <div className="text-2xl font-bold text-pink-600">{grandFemaleTotal}</div>
          <div className="text-sm text-gray-600">หญิง</div>
        </div>
      </div>

      {/* Detailed breakdown by grade */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">📋 รายละเอียดจำนวนนักเรียนแยกตามระดับชั้น</h3>
        
        {/* Junior High School */}
        <div className="border rounded-lg p-4">
          <h4 className="font-semibold text-yellow-700 mb-4">🏫 มัธยมศึกษาตอนต้น</h4>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">📚 ระดับชั้น</th>
                  <th className="border border-gray-300 px-4 py-2 text-center">👦 ชาย</th>
                  <th className="border border-gray-300 px-4 py-2 text-center">👧 หญิง</th>
                  <th className="border border-gray-300 px-4 py-2 text-center">🔢 รวม</th>
                </tr>
              </thead>
              <tbody>
                {juniorHigh.map((student) => (
                  <tr key={student.grade_level} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">📖 ชั้น{getGradeLabel(student.grade_level)}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">{student.male_count}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">{student.female_count}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center font-semibold">{student.student_count}</td>
                  </tr>
                ))}
                <tr className="bg-gray-100 font-semibold">
                  <td className="border border-gray-300 px-4 py-2">รวมมัธยมศึกษาตอนต้น</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{juniorHighMaleTotal}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{juniorHighFemaleTotal}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{juniorHighTotal}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Senior High School */}
        <div className="border rounded-lg p-4">
          <h4 className="font-semibold text-purple-700 mb-4">🎓 มัธยมศึกษาตอนปลาย</h4>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">📚 ระดับชั้น</th>
                  <th className="border border-gray-300 px-4 py-2 text-center">👦 ชาย</th>
                  <th className="border border-gray-300 px-4 py-2 text-center">👧 หญิง</th>
                  <th className="border border-gray-300 px-4 py-2 text-center">🔢 รวม</th>
                </tr>
              </thead>
              <tbody>
                {highSchool.map((student) => (
                  <tr key={student.grade_level} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">📖 ชั้น{getGradeLabel(student.grade_level)}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">{student.male_count}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">{student.female_count}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center font-semibold">{student.student_count}</td>
                  </tr>
                ))}
                <tr className="bg-gray-100 font-semibold">
                  <td className="border border-gray-300 px-4 py-2">รวมมัธยมศึกษาตอนปลาย</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{highSchoolMaleTotal}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{highSchoolFemaleTotal}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{highSchoolTotal}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Grand Total */}
        <div className="border-2 border-blue-300 rounded-lg p-4 bg-blue-50">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <tbody>
                <tr className="font-bold text-lg">
                  <td className="border border-blue-300 px-4 py-3 text-blue-800">🏆 รวมทั้งหมด</td>
                  <td className="border border-blue-300 px-4 py-3 text-center text-blue-800">{grandMaleTotal}</td>
                  <td className="border border-blue-300 px-4 py-3 text-center text-blue-800">{grandFemaleTotal}</td>
                  <td className="border border-blue-300 px-4 py-3 text-center text-blue-800">{grandTotal}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
