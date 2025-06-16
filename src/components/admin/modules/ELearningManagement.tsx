
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Plus, Users, Clock, Play, FileText, Award } from "lucide-react";
import { useState } from "react";

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  status: "active" | "draft" | "archived";
  enrollments: number;
  completions: number;
  createdDate: string;
}

interface LearningResource {
  id: string;
  title: string;
  type: "PDF" | "Video" | "Article" | "Quiz";
  category: string;
  uploadDate: string;
  downloads: number;
  size: string;
}

const mockCourses: Course[] = [
  {
    id: "1",
    title: "Fundamentals of Urban Planning",
    description: "Introduction to basic principles of urban planning and development",
    instructor: "Dr. Adebayo Johnson",
    duration: "6 weeks",
    level: "Beginner",
    status: "active",
    enrollments: 245,
    completions: 180,
    createdDate: "2024-05-01"
  },
  {
    id: "2",
    title: "Advanced GIS Applications",
    description: "Advanced Geographic Information Systems for town planners",
    instructor: "Prof. Sarah Okafor",
    duration: "8 weeks",
    level: "Advanced",
    status: "active",
    enrollments: 78,
    completions: 45,
    createdDate: "2024-04-15"
  },
  {
    id: "3",
    title: "Environmental Impact Assessment",
    description: "Comprehensive guide to conducting environmental assessments",
    instructor: "Eng. Michael Ibrahim",
    duration: "4 weeks",
    level: "Intermediate",
    status: "draft",
    enrollments: 0,
    completions: 0,
    createdDate: "2024-06-01"
  }
];

const mockResources: LearningResource[] = [
  {
    id: "1",
    title: "NITP Professional Practice Guidelines",
    type: "PDF",
    category: "Professional Practice",
    uploadDate: "2024-06-01",
    downloads: 456,
    size: "2.3 MB"
  },
  {
    id: "2",
    title: "Introduction to Urban Planning Video Series",
    type: "Video",
    category: "Education",
    uploadDate: "2024-05-15",
    downloads: 234,
    size: "850 MB"
  },
  {
    id: "3",
    title: "Planning Law and Regulations Quiz",
    type: "Quiz",
    category: "Assessment",
    uploadDate: "2024-05-20",
    downloads: 167,
    size: "0.5 MB"
  }
];

export const ELearningManagement = () => {
  const [courses, setCourses] = useState(mockCourses);
  const [resources, setResources] = useState(mockResources);
  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
    instructor: "",
    duration: "",
    level: "Beginner" as const
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "draft": return "bg-yellow-100 text-yellow-800";
      case "archived": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner": return "bg-blue-100 text-blue-800";
      case "Intermediate": return "bg-orange-100 text-orange-800";
      case "Advanced": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "PDF": return <FileText className="h-4 w-4" />;
      case "Video": return <Play className="h-4 w-4" />;
      case "Quiz": return <Award className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const handleCreateCourse = () => {
    if (newCourse.title && newCourse.description) {
      const course: Course = {
        id: (courses.length + 1).toString(),
        ...newCourse,
        status: "draft",
        enrollments: 0,
        completions: 0,
        createdDate: new Date().toISOString().split('T')[0]
      };
      setCourses([...courses, course]);
      setNewCourse({
        title: "",
        description: "",
        instructor: "",
        duration: "",
        level: "Beginner"
      });
    }
  };

  const getTotalStats = () => {
    return {
      totalCourses: courses.length,
      activeCourses: courses.filter(c => c.status === "active").length,
      totalEnrollments: courses.reduce((sum, course) => sum + course.enrollments, 0),
      totalCompletions: courses.reduce((sum, course) => sum + course.completions, 0)
    };
  };

  const stats = getTotalStats();

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <BookOpen className="h-8 w-8 text-[#073B4C]" />
        <h1 className="text-3xl font-bold text-[#073B4C]">E-Learning Management</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5 text-[#073B4C]" />
              <div>
                <div className="text-2xl font-bold text-[#073B4C]">{stats.totalCourses}</div>
                <div className="text-sm text-gray-600">Total Courses</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Play className="h-5 w-5 text-green-600" />
              <div>
                <div className="text-2xl font-bold text-green-600">{stats.activeCourses}</div>
                <div className="text-sm text-gray-600">Active Courses</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-600" />
              <div>
                <div className="text-2xl font-bold text-blue-600">{stats.totalEnrollments}</div>
                <div className="text-sm text-gray-600">Total Enrollments</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Award className="h-5 w-5 text-orange-600" />
              <div>
                <div className="text-2xl font-bold text-orange-600">{stats.totalCompletions}</div>
                <div className="text-sm text-gray-600">Completions</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="courses" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="courses" className="space-y-6">
          {/* Create New Course */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Create New Course
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  placeholder="Course title..."
                  value={newCourse.title}
                  onChange={(e) => setNewCourse({...newCourse, title: e.target.value})}
                />
                <Input
                  placeholder="Instructor name..."
                  value={newCourse.instructor}
                  onChange={(e) => setNewCourse({...newCourse, instructor: e.target.value})}
                />
              </div>
              <Textarea
                placeholder="Course description..."
                value={newCourse.description}
                onChange={(e) => setNewCourse({...newCourse, description: e.target.value})}
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  placeholder="Duration (e.g., 6 weeks)..."
                  value={newCourse.duration}
                  onChange={(e) => setNewCourse({...newCourse, duration: e.target.value})}
                />
                <select
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={newCourse.level}
                  onChange={(e) => setNewCourse({...newCourse, level: e.target.value as any})}
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
              <Button onClick={handleCreateCourse} className="bg-[#118AB2] hover:bg-[#073B4C]">
                Create Course
              </Button>
            </CardContent>
          </Card>

          {/* Courses Table */}
          <Card>
            <CardHeader>
              <CardTitle>Courses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Course</TableHead>
                      <TableHead>Instructor</TableHead>
                      <TableHead>Level</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Enrollments</TableHead>
                      <TableHead>Completion Rate</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {courses.map((course) => (
                      <TableRow key={course.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{course.title}</div>
                            <div className="text-sm text-gray-500">{course.description}</div>
                          </div>
                        </TableCell>
                        <TableCell>{course.instructor}</TableCell>
                        <TableCell>
                          <Badge className={getLevelColor(course.level)}>
                            {course.level}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {course.duration}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(course.status)}>
                            {course.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {course.enrollments}
                          </div>
                        </TableCell>
                        <TableCell>
                          {course.enrollments > 0 
                            ? `${Math.round((course.completions / course.enrollments) * 100)}%`
                            : "N/A"
                          }
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              Edit
                            </Button>
                            <Button size="sm" variant="outline">
                              View
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="space-y-6">
          {/* Upload New Resource */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Upload New Resource
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Input placeholder="Resource title..." />
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                  <option value="">Select type...</option>
                  <option value="PDF">PDF Document</option>
                  <option value="Video">Video</option>
                  <option value="Article">Article</option>
                  <option value="Quiz">Quiz</option>
                </select>
              </div>
              <div className="mt-4">
                <Input type="file" className="cursor-pointer" />
              </div>
              <Button className="mt-4 bg-[#118AB2] hover:bg-[#073B4C]">
                Upload Resource
              </Button>
            </CardContent>
          </Card>

          {/* Resources Table */}
          <Card>
            <CardHeader>
              <CardTitle>Learning Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Resource</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Upload Date</TableHead>
                      <TableHead>Downloads</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {resources.map((resource) => (
                      <TableRow key={resource.id}>
                        <TableCell>
                          <div className="font-medium">{resource.title}</div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getTypeIcon(resource.type)}
                            {resource.type}
                          </div>
                        </TableCell>
                        <TableCell>{resource.category}</TableCell>
                        <TableCell>{resource.uploadDate}</TableCell>
                        <TableCell>{resource.downloads}</TableCell>
                        <TableCell>{resource.size}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              Download
                            </Button>
                            <Button size="sm" variant="outline">
                              Edit
                            </Button>
                            <Button size="sm" variant="outline" className="text-red-600">
                              Delete
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Learning Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Learning analytics dashboard will be implemented here.
                Features include course performance metrics, learner progress tracking, and engagement statistics.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
