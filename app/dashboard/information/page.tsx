"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Award, Users, Rocket, FileText } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function InformationPage() {
  const [searchQuery, setSearchQuery] = useState("")

  // Filter function for search
  const filterContent = (content: string) => {
    if (!searchQuery) return true
    return content.toLowerCase().includes(searchQuery.toLowerCase())
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Organization Information</h2>
      </div>

      <div className="flex items-center space-x-2 mb-6">
        <Search className="h-4 w-4 text-slate-500" />
        <Input
          placeholder="Search information..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <Tabs defaultValue="mission" className="space-y-4">
        <TabsList>
          <TabsTrigger value="mission">Mission & Vision</TabsTrigger>
          <TabsTrigger value="departments">Departments & Roles</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="mission" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Mission Statement</CardTitle>
              <CardDescription>Our purpose and goals</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {filterContent(
                "Empowering communities and organizations through technology-driven information sharing",
              ) && (
                <div className="space-y-2">
                  <p className="text-slate-600 dark:text-slate-400">
                    Empowering communities and organizations through technology-driven information sharing, ensuring
                    accessibility, engagement, and efficiency.
                  </p>
                  <p className="text-slate-600 dark:text-slate-400">
                    At VisionBoard, we believe in the power of information to transform organizations and communities.
                    Our mission is to provide a platform that makes critical information accessible to all stakeholders,
                    regardless of their technical expertise or role within the organization.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Vision</CardTitle>
              <CardDescription>Our long-term aspirations</CardDescription>
            </CardHeader>
            <CardContent>
              {filterContent("To become the leading platform for organizational information sharing") && (
                <div className="space-y-2">
                  <p className="text-slate-600 dark:text-slate-400">
                    To become the leading platform for organizational information sharing, fostering transparency,
                    collaboration, and informed decision-making across all levels of society.
                  </p>
                  <p className="text-slate-600 dark:text-slate-400">
                    We envision a future where information silos are eliminated, and every member of an organization has
                    access to the information they need, when they need it, in a format that is engaging and easy to
                    understand.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Core Values</CardTitle>
              <CardDescription>Principles that guide our work</CardDescription>
            </CardHeader>
            <CardContent>
              {filterContent("Accessibility, Innovation, Integrity, Collaboration, User-Centric Design") && (
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <h3 className="font-medium">Accessibility</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Ensuring information is available to all, regardless of role or technical ability.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium">Innovation</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Continuously improving our platform with cutting-edge technologies and creative solutions.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium">Integrity</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Maintaining honesty, transparency, and ethical standards in all our operations.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium">Collaboration</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Fostering teamwork and partnership within our organization and with our clients.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium">User-Centric Design</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Prioritizing user experience and needs in every aspect of our platform.
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="departments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Departments & Roles</CardTitle>
              <CardDescription>Organizational structure and responsibilities</CardDescription>
            </CardHeader>
            <CardContent>
              {filterContent("Public Relations, Event Management, Technical Development, Administration") && (
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-slate-600 dark:text-slate-400 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Public Relations</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Handles external communications and press releases.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-slate-600 dark:text-slate-400 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Event Management</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Plans and organizes community and corporate events.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-slate-600 dark:text-slate-400 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Technical Development</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Oversees VisionBoard's system updates and innovation.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-slate-600 dark:text-slate-400 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Administration</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Manages user access levels, announcements, and security.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Team Structure</CardTitle>
              <CardDescription>Leadership and reporting hierarchy</CardDescription>
            </CardHeader>
            <CardContent>
              {filterContent("CEO, Department Heads, Team Leads, Staff Members") && (
                <div className="space-y-4">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>Executive Leadership</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-medium">CEO - Sarah Johnson</p>
                              <p className="text-sm text-slate-600 dark:text-slate-400">
                                Overall strategic direction and leadership
                              </p>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-medium">CTO - Michael Chen</p>
                              <p className="text-sm text-slate-600 dark:text-slate-400">
                                Technical strategy and innovation
                              </p>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-medium">COO - David Rodriguez</p>
                              <p className="text-sm text-slate-600 dark:text-slate-400">
                                Day-to-day operations and efficiency
                              </p>
                            </div>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger>Department Heads</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-medium">PR Director - Emily Watson</p>
                              <p className="text-sm text-slate-600 dark:text-slate-400">
                                Leads the Public Relations department
                              </p>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-medium">Events Manager - Carlos Mendez</p>
                              <p className="text-sm text-slate-600 dark:text-slate-400">
                                Oversees all event planning and execution
                              </p>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-medium">Lead Developer - Aisha Patel</p>
                              <p className="text-sm text-slate-600 dark:text-slate-400">
                                Manages the technical development team
                              </p>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-medium">Admin Director - Robert Kim</p>
                              <p className="text-sm text-slate-600 dark:text-slate-400">
                                Heads the administrative functions
                              </p>
                            </div>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notable Achievements</CardTitle>
              <CardDescription>Our milestones and recognition</CardDescription>
            </CardHeader>
            <CardContent>
              {filterContent("Top Digital Innovation Project, 10,000+ active users") && (
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Award className="h-5 w-5 text-slate-600 dark:text-slate-400 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Recognized as a Top Digital Innovation Project (2024)</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        VisionBoard was recognized for its innovative approach to information sharing and user
                        engagement.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-slate-600 dark:text-slate-400 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Over 10,000+ active users engaging through VisionBoard</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Our platform has grown to serve thousands of users across multiple organizations.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Rocket className="h-5 w-5 text-slate-600 dark:text-slate-400 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Successfully implemented in 50+ organizations</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        VisionBoard has been adopted by diverse organizations, from educational institutions to
                        corporations.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Growth Metrics</CardTitle>
              <CardDescription>Key performance indicators</CardDescription>
            </CardHeader>
            <CardContent>
              {filterContent("User growth, Engagement metrics, Client satisfaction") && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-medium">User Growth</h3>
                    <div className="h-4 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 w-[85%]" style={{ width: "85%" }}></div>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      85% increase in user base over the past year
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium">Engagement Metrics</h3>
                    <div className="h-4 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500" style={{ width: "72%" }}></div>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      72% of users engage with the platform daily
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium">Client Satisfaction</h3>
                    <div className="h-4 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500" style={{ width: "94%" }}></div>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">94% client satisfaction rate</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Important Documents</CardTitle>
              <CardDescription>Policies, guidelines, and resources</CardDescription>
            </CardHeader>
            <CardContent>
              {filterContent("Employee Handbook, Code of Conduct, Brand Guidelines, Security Policy") && (
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <FileText className="h-5 w-5 text-slate-600 dark:text-slate-400 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Employee Handbook</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Comprehensive guide to company policies and procedures.
                      </p>
                      <Button variant="link" size="sm" className="px-0 h-auto">
                        Download PDF
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <FileText className="h-5 w-5 text-slate-600 dark:text-slate-400 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Code of Conduct</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Guidelines for professional behavior and ethics.
                      </p>
                      <Button variant="link" size="sm" className="px-0 h-auto">
                        Download PDF
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <FileText className="h-5 w-5 text-slate-600 dark:text-slate-400 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Brand Guidelines</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Standards for using the VisionBoard brand assets.
                      </p>
                      <Button variant="link" size="sm" className="px-0 h-auto">
                        Download PDF
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <FileText className="h-5 w-5 text-slate-600 dark:text-slate-400 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Security Policy</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Information security protocols and best practices.
                      </p>
                      <Button variant="link" size="sm" className="px-0 h-auto">
                        Download PDF
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Forms & Templates</CardTitle>
              <CardDescription>Standardized documents for common processes</CardDescription>
            </CardHeader>
            <CardContent>
              {filterContent("Expense Report, Time Off Request, Project Proposal, Feedback Form") && (
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="border rounded-md p-3">
                    <h3 className="font-medium">Expense Report</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                      Template for submitting business expenses
                    </p>
                    <Button variant="outline" size="sm">
                      Download
                    </Button>
                  </div>

                  <div className="border rounded-md p-3">
                    <h3 className="font-medium">Time Off Request</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                      Form for requesting vacation or personal time
                    </p>
                    <Button variant="outline" size="sm">
                      Download
                    </Button>
                  </div>

                  <div className="border rounded-md p-3">
                    <h3 className="font-medium">Project Proposal</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                      Template for submitting new project ideas
                    </p>
                    <Button variant="outline" size="sm">
                      Download
                    </Button>
                  </div>

                  <div className="border rounded-md p-3">
                    <h3 className="font-medium">Feedback Form</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                      Standard form for providing feedback
                    </p>
                    <Button variant="outline" size="sm">
                      Download
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
