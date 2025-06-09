import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ParentZone() {
  return (
    <div className="min-h-screen bg-alice-blue">
      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto text-center">
          <h1 className="font-comic text-4xl md:text-6xl font-bold text-[hsl(var(--discovery-blue))] mb-4">
            👨‍👩‍👧‍👦 Parent & Teacher Zone
          </h1>
          <p className="text-xl md:text-2xl text-[hsl(var(--dark-slate))] mb-8 max-w-3xl mx-auto">
            Resources and tools to support your child's learning journey. Find guides, worksheets, and tips for making learning fun!
          </p>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="py-12 px-4 bg-alice-blue">
        <div className="container mx-auto max-w-6xl">
          <Tabs defaultValue="guides" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-white rounded-2xl p-2 mb-8">
              <TabsTrigger value="guides" className="rounded-xl font-bold">Learning Guides</TabsTrigger>
              <TabsTrigger value="worksheets" className="rounded-xl font-bold">Worksheets</TabsTrigger>
              <TabsTrigger value="safety" className="rounded-xl font-bold">Safety Tips</TabsTrigger>
              <TabsTrigger value="progress" className="rounded-xl font-bold">Track Progress</TabsTrigger>
            </TabsList>

            <TabsContent value="guides" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-16 h-16 bg-[hsl(var(--discovery-blue))] rounded-full flex items-center justify-center mb-4">
                      <i className="fas fa-book-open text-2xl text-white"></i>
                    </div>
                    <CardTitle className="font-comic text-2xl">Age-Appropriate Learning</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-[hsl(var(--dark-slate))] opacity-75 mb-4">
                      Our content is carefully designed for different age groups, ensuring your child gets the right level of challenge and engagement.
                    </p>
                    <ul className="space-y-2 text-sm text-[hsl(var(--dark-slate))]">
                      <li>• Ages 6-8: Simple concepts with lots of visuals</li>
                      <li>• Ages 9-11: More detailed explanations and hands-on activities</li>
                      <li>• Ages 12-14: Complex topics with real-world applications</li>
                    </ul>
                    <Button className="w-full mt-4 bg-[hsl(var(--discovery-blue))]">
                      <i className="fas fa-download mr-2"></i>Download Guide
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-16 h-16 bg-[hsl(var(--lime-green))] rounded-full flex items-center justify-center mb-4">
                      <i className="fas fa-lightbulb text-2xl text-white"></i>
                    </div>
                    <CardTitle className="font-comic text-2xl">Learning Outcomes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-[hsl(var(--dark-slate))] opacity-75 mb-4">
                      Understand what your child will learn from each topic and how it connects to their school curriculum.
                    </p>
                    <ul className="space-y-2 text-sm text-[hsl(var(--dark-slate))]">
                      <li>• STEM concepts and critical thinking</li>
                      <li>• Problem-solving and creativity</li>
                      <li>• Scientific method and observation skills</li>
                    </ul>
                    <Button className="w-full mt-4 bg-[hsl(var(--lime-green))]">
                      <i className="fas fa-eye mr-2"></i>View Outcomes
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-16 h-16 bg-[hsl(var(--bright-yellow))] rounded-full flex items-center justify-center mb-4">
                      <i className="fas fa-users text-2xl text-[hsl(var(--dark-slate))]"></i>
                    </div>
                    <CardTitle className="font-comic text-2xl">Family Activities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-[hsl(var(--dark-slate))] opacity-75 mb-4">
                      Ideas for extending learning beyond the screen with fun family activities and discussions.
                    </p>
                    <ul className="space-y-2 text-sm text-[hsl(var(--dark-slate))]">
                      <li>• Nature walks and observation games</li>
                      <li>• Kitchen science experiments</li>
                      <li>• Building and construction projects</li>
                    </ul>
                    <Button className="w-full mt-4 bg-[hsl(var(--bright-yellow))] text-[hsl(var(--dark-slate))]">
                      <i className="fas fa-home mr-2"></i>Get Ideas
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-16 h-16 bg-[hsl(var(--tomato-red))] rounded-full flex items-center justify-center mb-4">
                      <i className="fas fa-chalkboard-teacher text-2xl text-white"></i>
                    </div>
                    <CardTitle className="font-comic text-2xl">Teacher Resources</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-[hsl(var(--dark-slate))] opacity-75 mb-4">
                      Lesson plans, classroom activities, and curriculum alignments for educators using our content.
                    </p>
                    <ul className="space-y-2 text-sm text-[hsl(var(--dark-slate))]">
                      <li>• Detailed lesson plans</li>
                      <li>• Assessment rubrics</li>
                      <li>• Group activity suggestions</li>
                    </ul>
                    <Button className="w-full mt-4 bg-[hsl(var(--tomato-red))]">
                      <i className="fas fa-school mr-2"></i>Classroom Tools
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="worksheets" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { title: "Solar System Coloring Pages", category: "Space", difficulty: "Easy" },
                  { title: "Animal Habitat Matching", category: "Nature", difficulty: "Medium" },
                  { title: "Simple Machine Diagrams", category: "Physics", difficulty: "Medium" },
                  { title: "Human Body Systems", category: "Biology", difficulty: "Advanced" },
                  { title: "Weather Observation Chart", category: "Science", difficulty: "Easy" },
                  { title: "Computer Parts Labeling", category: "Technology", difficulty: "Medium" }
                ].map((worksheet, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="text-center mb-4">
                        <div className="w-12 h-12 bg-[hsl(var(--discovery-blue))] rounded-full flex items-center justify-center mx-auto mb-3">
                          <i className="fas fa-file-alt text-white"></i>
                        </div>
                        <h3 className="font-comic text-lg font-bold">{worksheet.title}</h3>
                      </div>
                      <div className="flex justify-between items-center mb-4">
                        <span className="bg-[hsl(var(--lime-green))] text-white px-3 py-1 rounded-full text-sm">
                          {worksheet.category}
                        </span>
                        <span className="bg-[hsl(var(--bright-yellow))] text-[hsl(var(--dark-slate))] px-3 py-1 rounded-full text-sm">
                          {worksheet.difficulty}
                        </span>
                      </div>
                      <Button className="w-full bg-[hsl(var(--discovery-blue))]">
                        <i className="fas fa-download mr-2"></i>Download PDF
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="safety" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="border-[hsl(var(--tomato-red))] border-2">
                  <CardHeader>
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-[hsl(var(--tomato-red))] rounded-full flex items-center justify-center mr-4">
                        <i className="fas fa-exclamation-triangle text-white"></i>
                      </div>
                      <CardTitle className="font-comic text-2xl text-[hsl(var(--tomato-red))]">Experiment Safety</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-[hsl(var(--dark-slate))]">
                      <li className="flex items-start">
                        <i className="fas fa-check text-[hsl(var(--lime-green))] mr-3 mt-1"></i>
                        Always supervise children during experiments
                      </li>
                      <li className="flex items-start">
                        <i className="fas fa-check text-[hsl(var(--lime-green))] mr-3 mt-1"></i>
                        Read all instructions before starting
                      </li>
                      <li className="flex items-start">
                        <i className="fas fa-check text-[hsl(var(--lime-green))] mr-3 mt-1"></i>
                        Have safety equipment ready (towels, water)
                      </li>
                      <li className="flex items-start">
                        <i className="fas fa-check text-[hsl(var(--lime-green))] mr-3 mt-1"></i>
                        Work in a well-ventilated area
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-[hsl(var(--discovery-blue))] border-2">
                  <CardHeader>
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-[hsl(var(--discovery-blue))] rounded-full flex items-center justify-center mr-4">
                        <i className="fas fa-shield-alt text-white"></i>
                      </div>
                      <CardTitle className="font-comic text-2xl text-[hsl(var(--discovery-blue))]">Online Safety</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-[hsl(var(--dark-slate))]">
                      <li className="flex items-start">
                        <i className="fas fa-check text-[hsl(var(--lime-green))] mr-3 mt-1"></i>
                        Monitor your child's online activity
                      </li>
                      <li className="flex items-start">
                        <i className="fas fa-check text-[hsl(var(--lime-green))] mr-3 mt-1"></i>
                        Our site is ad-free and secure
                      </li>
                      <li className="flex items-start">
                        <i className="fas fa-check text-[hsl(var(--lime-green))] mr-3 mt-1"></i>
                        No personal information required
                      </li>
                      <li className="flex items-start">
                        <i className="fas fa-check text-[hsl(var(--lime-green))] mr-3 mt-1"></i>
                        Report any issues immediately
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="progress" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="font-comic text-3xl text-center text-[hsl(var(--discovery-blue))]">
                    Track Your Child's Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <div className="text-6xl mb-6">📊</div>
                    <h3 className="font-comic text-2xl font-bold mb-4">Coming Soon!</h3>
                    <p className="text-[hsl(var(--dark-slate))] opacity-75 max-w-2xl mx-auto mb-8">
                      We're developing a comprehensive progress tracking system that will help you monitor your child's learning journey, 
                      see their achievements, and identify areas where they excel or might need additional support.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-[hsl(var(--discovery-blue))] rounded-full flex items-center justify-center mx-auto mb-3">
                          <i className="fas fa-chart-line text-white text-xl"></i>
                        </div>
                        <h4 className="font-bold mb-2">Learning Analytics</h4>
                        <p className="text-sm text-[hsl(var(--dark-slate))] opacity-75">See detailed progress across all topics</p>
                      </div>
                      <div className="text-center">
                        <div className="w-16 h-16 bg-[hsl(var(--lime-green))] rounded-full flex items-center justify-center mx-auto mb-3">
                          <i className="fas fa-medal text-white text-xl"></i>
                        </div>
                        <h4 className="font-bold mb-2">Achievement Badges</h4>
                        <p className="text-sm text-[hsl(var(--dark-slate))] opacity-75">Celebrate milestones and accomplishments</p>
                      </div>
                      <div className="text-center">
                        <div className="w-16 h-16 bg-[hsl(var(--bright-yellow))] rounded-full flex items-center justify-center mx-auto mb-3">
                          <i className="fas fa-lightbulb text-[hsl(var(--dark-slate))] text-xl"></i>
                        </div>
                        <h4 className="font-bold mb-2">Personalized Recommendations</h4>
                        <p className="text-sm text-[hsl(var(--dark-slate))] opacity-75">Get suggestions for next learning steps</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
