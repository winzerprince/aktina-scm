
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '../../context/AuthContext';
import { User, Mail, Phone, Building, Shield, Bell, Eye, Lock } from 'lucide-react';

const ProfileSettings: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);

  const profileTabs = [
    { id: 'profile', label: 'Profile Information', icon: <User className="w-4 h-4" /> },
    { id: 'company', label: 'Company Details', icon: <Building className="w-4 h-4" /> },
    { id: 'security', label: 'Security', icon: <Shield className="w-4 h-4" /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell className="w-4 h-4" /> },
    { id: 'privacy', label: 'Privacy', icon: <Eye className="w-4 h-4" /> }
  ];

  const renderProfileTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your personal details and contact information</CardDescription>
            </div>
            <Button
              variant={isEditing ? "outline" : "default"}
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                defaultValue={user?.name}
                disabled={!isEditing}
                className={!isEditing ? 'bg-muted' : ''}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                defaultValue={user?.email}
                disabled={!isEditing}
                className={!isEditing ? 'bg-muted' : ''}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+1 (555) 123-4567"
                disabled={!isEditing}
                className={!isEditing ? 'bg-muted' : ''}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <div className="flex items-center space-x-2">
                <Badge className="bg-aktina-primary text-white">
                  {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}
                </Badge>
              </div>
            </div>
          </div>
          {isEditing && (
            <div className="flex justify-end space-x-2 mt-6">
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button className="bg-aktina-primary hover:bg-aktina-primary/90">
                Save Changes
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );

  const renderCompanyTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Company Information</CardTitle>
          <CardDescription>Manage your company details and business information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="company">Company Name</Label>
              <Input id="company" defaultValue={user?.company} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Input id="industry" placeholder="Technology, Manufacturing, etc." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="size">Company Size</Label>
              <Input id="size" placeholder="1-50, 51-200, 201-1000, etc." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="founded">Year Founded</Label>
              <Input id="founded" type="number" placeholder="2020" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="address">Business Address</Label>
              <Textarea id="address" placeholder="Enter your complete business address" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description">Company Description</Label>
              <Textarea id="description" placeholder="Brief description of your company and services" />
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <Button className="bg-aktina-primary hover:bg-aktina-primary/90">
              Update Company Info
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderSecurityTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Password & Security</CardTitle>
          <CardDescription>Manage your account security settings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" type="password" />
              </div>
              <Button className="bg-aktina-primary hover:bg-aktina-primary/90">
                Update Password
              </Button>
            </div>
            
            <div className="border-t pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Two-Factor Authentication</h4>
                  <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                </div>
                <Switch />
              </div>
            </div>
            
            <div className="border-t pt-6">
              <h4 className="font-medium mb-4">Login History</h4>
              <div className="space-y-3">
                {[
                  { device: 'Chrome on Windows', location: 'San Francisco, CA', time: '2 hours ago', current: true },
                  { device: 'Safari on iPhone', location: 'San Francisco, CA', time: '1 day ago', current: false },
                  { device: 'Firefox on Windows', location: 'New York, NY', time: '3 days ago', current: false }
                ].map((session, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">{session.device}</div>
                      <div className="text-sm text-muted-foreground">{session.location} • {session.time}</div>
                    </div>
                    {session.current ? (
                      <Badge className="bg-green-100 text-green-800">Current Session</Badge>
                    ) : (
                      <Button variant="outline" size="sm">Revoke</Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
          <CardDescription>Choose how you want to be notified about updates and activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {[
              { title: 'Email Notifications', description: 'Receive notifications via email', enabled: true },
              { title: 'SMS Alerts', description: 'Get critical alerts via SMS', enabled: false },
              { title: 'Push Notifications', description: 'Browser push notifications', enabled: true },
              { title: 'Order Updates', description: 'Notifications about order status changes', enabled: true },
              { title: 'System Maintenance', description: 'Alerts about system maintenance', enabled: true },
              { title: 'Weekly Reports', description: 'Receive weekly performance reports', enabled: false },
              { title: 'Marketing Updates', description: 'Product updates and company news', enabled: false }
            ].map((setting, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{setting.title}</div>
                  <div className="text-sm text-muted-foreground">{setting.description}</div>
                </div>
                <Switch defaultChecked={setting.enabled} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderPrivacyTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Privacy Settings</CardTitle>
          <CardDescription>Control your privacy and data sharing preferences</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {[
              { title: 'Profile Visibility', description: 'Make your profile visible to other users', enabled: true },
              { title: 'Activity Status', description: 'Show when you were last active', enabled: false },
              { title: 'Data Analytics', description: 'Allow data collection for analytics', enabled: true },
              { title: 'Third-party Integrations', description: 'Allow data sharing with integrated services', enabled: false },
              { title: 'Marketing Communications', description: 'Receive marketing communications', enabled: false }
            ].map((setting, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{setting.title}</div>
                  <div className="text-sm text-muted-foreground">{setting.description}</div>
                </div>
                <Switch defaultChecked={setting.enabled} />
              </div>
            ))}
            
            <div className="border-t pt-6">
              <h4 className="font-medium mb-4 text-red-600">Danger Zone</h4>
              <div className="space-y-4">
                <div className="p-4 border border-red-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Export Data</div>
                      <div className="text-sm text-muted-foreground">Download all your account data</div>
                    </div>
                    <Button variant="outline">Export</Button>
                  </div>
                </div>
                <div className="p-4 border border-red-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Delete Account</div>
                      <div className="text-sm text-muted-foreground">Permanently delete your account and data</div>
                    </div>
                    <Button variant="destructive">Delete</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile': return renderProfileTab();
      case 'company': return renderCompanyTab();
      case 'security': return renderSecurityTab();
      case 'notifications': return renderNotificationsTab();
      case 'privacy': return renderPrivacyTab();
      default: return renderProfileTab();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Profile Settings</h2>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </div>
      
      <div className="flex space-x-1 bg-muted p-1 rounded-lg w-fit">
        {profileTabs.map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 ${
              activeTab === tab.id 
                ? 'bg-aktina-primary text-white' 
                : 'hover:bg-card'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </Button>
        ))}
      </div>
      
      <div className="animate-fade-in">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default ProfileSettings;
