export interface Course {
  id: string;
  title: string;
  code: string;
  description: string;
  lecturer: string;
  enrolledStudents: number;
  materialCount: number;
}

export interface Material {
  id: string;
  title: string;
  type: string;
  size: string;
  uploadDate: string;
  downloadUrl: string;
}
