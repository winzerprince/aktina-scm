
import React, { useState } from 'react';
import TabNavigation from '../Navigation/TabNavigation';
import MetricCard from './MetricCard';
import ChartCard from './ChartCard';
import AnalyticsCard from './AnalyticsCard';
import ProfileSettings from '../Profile/ProfileSettings';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Home, Users, MapPin, BarChart3, TrendingUp, Settings, User, Clock, Target } from 'lucide-react';

const HRDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');

  const tabs = [
    { id: 'home', label: 'Home', icon: <Home className="w-4 h-4" /> },
    { id: 'workforce', label: 'Workforce', badge: 12, icon: <Users className="w-4 h-4" /> },
    { id: 'distribution', label: 'Distribution', icon: <MapPin className="w-4 h-4" /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'predictions', label: 'Predictions', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'profile', label: 'Profile Settings', icon: <Settings className="w-4 h-4" /> }
  ];

  const workforceData = [
    { name: 'Jan', productivity: 85, attendance: 92, training: 78 },
    { name: 'Feb', productivity: 88, attendance: 94, training: 82 },
    { name: 'Mar', productivity: 92, attendance: 89, training: 85 },
    { name: 'Apr', productivity: 90, attendance: 96, training: 88 },
    { name: 'May', productivity: 94, attendance: 93, training: 91 },
    { name: 'Jun', productivity: 96, attendance: 95, training: 94 }
  ];

  const departmentData = [
    { name: 'Production', value: 45, efficiency: 94 },
    { name: 'Quality Control', value: 18, efficiency: 97 },
    { name: 'Logistics', value: 22, efficiency: 91 },
    { name: 'Maintenance', value: 15, efficiency: 88 }
  ];

  const employees = [
    { id: 'EMP-001', name: 'John Martinez', department: 'Production', shift: 'Day', performance: 94, status: 'active' },
    { id: 'EMP-002', name: 'Sarah Johnson', department: 'Quality Control', shift: 'Day', performance: 97, status: 'active' },
    { id: 'EMP-003', name: 'Mike Chen', department: 'Logistics', shift: 'Night', performance: 89, status: 'training' },
    { id: 'EMP-004', name: 'Lisa Rodriguez', department: 'Production', shift: 'Day', performance: 92, status: 'active' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'training': return 'bg-blue-100 text-blue-800';
      case 'leave': return 'bg-amber-100 text-amber-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderHomeTab = () => (
    <div className="space-y-6 animate-fade-in">
      {/* Workforce Overview */}
      <Card className="bg-gradient-to-r from-aktina-purple/10 to-aktina-blue/10 border-0">
        <CardHeader>
          <CardTitle className="text-xl">Workforce Overview</CardTitle>
          <CardDescription>Real-time workforce status and productivity metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <div className="text-2xl font-bold text-aktina-purple">248</div>
              <div className="text-sm text-muted-foreground">Total Employees</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-aktina-primary">235</div>
              <div className="text-sm text-muted-foreground">Active Today</div>
              <Progress value={95} className="mt-2" />
            </div>
            <div>
              <div className="text-2xl font-bold text-aktina-blue">94%</div>
              <div className="text-sm text-muted-foreground">Avg Productivity</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-aktina-amber">12</div>
              <div className="text-sm text-muted-foreground">Pending Actions</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Team Productivity Score"
          value={94}
          suffix="%"
          icon={<Target className="w-4 h-4" />}
          trend="up"
          trendValue="2% improvement"
          delay={0}
        />
        <MetricCard
          title="Attendance Rate"
          value={95}
          suffix="%"
          icon={<Clock className="w-4 h-4" />}
          trend="up"
          trendValue="Above target"
          delay={100}
        />
        <MetricCard
          title="Training Completion"
          value={88}
          suffix="%"
          icon={<Users className="w-4 h-4" />}
          trend="up"
          trendValue="6 completed today"
          delay={200}
        />
        <MetricCard
          title="Open Positions"
          value={7}
          icon={<User className="w-4 h-4" />}
          trend="down"
          trendValue="3 filled this week"
          delay={300}
        />
      </div>

      {/* Department Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Department Performance</CardTitle>
          <CardDescription>Current staffing and efficiency by department</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {departmentData.map((dept, index) => (
              <Card key={dept.name} className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="font-semibold">{dept.name}</div>
                    <div className="text-sm text-muted-foreground">{dept.value} employees</div>
                  </div>
                  <Badge className="bg-aktina-primary text-white">
                    {dept.efficiency}% Efficient
                  </Badge>
                </div>
                <Progress value={dept.efficiency} className="h-2" />
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Employee Activities */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Employee Activities</CardTitle>
          <CardDescription>Latest updates and status changes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {employees.map((employee, index) => (
              <div key={employee.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-aktina-primary/10 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-aktina-primary" />
                  </div>
                  <div>
                    <div className="font-semibold">{employee.name}</div>
                    <div className="text-sm text-muted-foreground">{employee.department} • {employee.shift} Shift</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className="font-medium">{employee.performance}% Performance</div>
                    <Badge className={getStatusColor(employee.status)}>
                      {employee.status.charAt(0).toUpperCase() + employee.status.slice(1)}
                    </Badge>
                  </div>
                  <Button size="sm" variant="outline">View Profile</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderWorkforceTab = () => (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle>Workforce Management</CardTitle>
          <CardDescription>Comprehensive employee management and workforce optimization</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <AnalyticsCard
              title="Active Employees"
              value={235}
              target={248}
              trend="up"
              trendValue="3 new hires this week"
            />
            <AnalyticsCard
              title="Skills Training"
              value={88}
              unit="%"
              trend="up"
              trendValue="12% above target"
            />
            <AnalyticsCard
              title="Retention Rate"
              value={94}
              unit="%"
              trend="up"
              trendValue="Industry leading"
            />
          </div>
          
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Employee Directory</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {employees.map((employee) => (
                <Card key={employee.id} className="p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-12 h-12 bg-aktina-primary/10 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-aktina-primary" />
                    </div>
                    <div>
                      <div className="font-semibold">{employee.name}</div>
                      <div className="text-sm text-muted-foreground">{employee.id}</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Department:</span>
                      <span className="text-sm font-medium">{employee.department}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Performance:</span>
                      <span className="text-sm font-medium">{employee.performance}%</span>
                    </div>
                    <Badge className={getStatusColor(employee.status)} size="sm">
                      {employee.status.charAt(0).toUpperCase() + employee.status.slice(1)}
                    </Badge>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderDistributionTab = () => (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle>Distribution Management</CardTitle>
          <CardDescription>Workforce allocation across supply centers and locations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Supply Center Staffing</h3>
              <div className="space-y-4">
                {[
                  { location: 'Main Production Facility', staff: 145, capacity: 160, efficiency: 92 },
                  { location: 'Quality Control Center', staff: 38, capacity: 40, efficiency: 97 },
                  { location: 'Logistics Hub', staff: 42, capacity: 45, efficiency: 89 },
                  { location: 'R&D Laboratory', staff: 23, capacity: 25, efficiency: 95 }
                ].map((center) => (
                  <Card key={center.location} className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium">{center.location}</div>
                      <Badge className="bg-aktina-blue text-white">{center.efficiency}% Efficient</Badge>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground mb-2">
                      <span>{center.staff} / {center.capacity} staff</span>
                      <span>{Math.round((center.staff / center.capacity) * 100)}% capacity</span>
                    </div>
                    <Progress value={(center.staff / center.capacity) * 100} className="h-2" />
                  </Card>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Shift Distribution</h3>
              <ChartCard
                title="Staff Distribution by Shift"
                data={[
                  { name: 'Day Shift', value: 145 },
                  { name: 'Evening Shift', value: 68 },
                  { name: 'Night Shift', value: 35 }
                ]}
                type="pie"
                dataKey="value"
                className="h-64"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderAnalyticsTab = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AnalyticsCard
          title="Productivity Trend"
          value={94}
          unit="%"
          trend="up"
          trendValue="5% increase this month"
        />
        <AnalyticsCard
          title="Training ROI"
          value={156}
          unit="%"
          trend="up"
          trendValue="Above industry average"
        />
        <AnalyticsCard
          title="Employee Satisfaction"
          value={87}
          unit="%"
          trend="up"
          trendValue="2% improvement"
        />
      </div>

      <ChartCard
        title="Workforce Performance Trends"
        description="Monthly productivity, attendance, and training metrics"
        data={workforceData}
        type="line"
        dataKey="productivity"
        xAxisKey="name"
        color="hsl(var(--aktina-purple))"
      />

      <Card>
        <CardHeader>
          <CardTitle>Detailed Analytics</CardTitle>
          <CardDescription>Comprehensive workforce analytics and insights</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Performance Metrics</h4>
              <div className="space-y-3">
                {[
                  { metric: 'Overall Productivity', value: 94, change: '+2%' },
                  { metric: 'Quality Score', value: 97, change: '+1%' },
                  { metric: 'Safety Rating', value: 99, change: '0%' },
                  { metric: 'Innovation Index', value: 78, change: '+5%' }
                ].map((item) => (
                  <div key={item.metric} className="flex items-center justify-between">
                    <span className="text-sm">{item.metric}</span>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{item.value}%</span>
                      <Badge variant="secondary" className="text-xs">
                        {item.change}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Resource Allocation</h4>
              <div className="space-y-3">
                {departmentData.map((dept) => (
                  <div key={dept.name} className="flex items-center justify-between">
                    <span className="text-sm">{dept.name}</span>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{dept.value} staff</span>
                      <Badge className="bg-aktina-primary text-white text-xs">
                        {dept.efficiency}%
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderPredictionsTab = () => (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle>Predictive Workforce Analytics</CardTitle>
          <CardDescription>AI-powered insights and future workforce planning</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Demand Forecasting</h3>
              <div className="space-y-4">
                {[
                  { period: 'Next Quarter', demand: 'High', change: '+15%', confidence: 92 },
                  { period: 'Next 6 Months', demand: 'Moderate', change: '+8%', confidence: 87 },
                  { period: 'Next Year', demand: 'Very High', change: '+25%', confidence: 78 }
                ].map((forecast) => (
                  <Card key={forecast.period} className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium">{forecast.period}</div>
                      <Badge className="bg-aktina-primary text-white">{forecast.confidence}% Confidence</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Demand: {forecast.demand}</span>
                      <span className="text-sm font-medium text-green-600">{forecast.change}</span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Skill Gap Analysis</h3>
              <div className="space-y-4">
                {[
                  { skill: 'Advanced Manufacturing', gap: 23, priority: 'High' },
                  { skill: 'Quality Control', gap: 12, priority: 'Medium' },
                  { skill: 'Data Analytics', gap: 18, priority: 'High' },
                  { skill: 'Process Optimization', gap: 8, priority: 'Low' }
                ].map((skill) => (
                  <Card key={skill.skill} className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium">{skill.skill}</div>
                      <Badge className={
                        skill.priority === 'High' ? 'bg-red-100 text-red-800' :
                        skill.priority === 'Medium' ? 'bg-amber-100 text-amber-800' :
                        'bg-green-100 text-green-800'
                      }>
                        {skill.priority} Priority
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Gap: {skill.gap} employees needed
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'home': return renderHomeTab();
      case 'workforce': return renderWorkforceTab();
      case 'distribution': return renderDistributionTab();
      case 'analytics': return renderAnalyticsTab();
      case 'predictions': return renderPredictionsTab();
      case 'profile': return <ProfileSettings />;
      default: return renderHomeTab();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-aktina-purple to-aktina-blue bg-clip-text text-transparent">
          HR Manager Dashboard
        </h1>
      </div>

      <TabNavigation
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        className="w-fit"
      />

      {renderTabContent()}
    </div>
  );
};

export default HRDashboard;
