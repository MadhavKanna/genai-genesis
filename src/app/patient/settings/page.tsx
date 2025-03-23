"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/src/components/ui/card";
import { Switch } from "@/src/components/ui/switch";
import { Label } from "@/src/components/ui/label";
import { Input } from "@/src/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/src/components/ui/select";
import {
    LucideArrowLeft,
    LucideBell,
    LucideGlobe,
    LucideLock,
    LucideUser,
    LucideShield,
    LucideMonitor,
    LucideHeart,
} from "lucide-react";

export default function PatientSettings() {
    const [notifications, setNotifications] = useState({
        caseUpdates: true,
        healthReminders: true,
        weeklyDigest: false,
    });

    const [privacy, setPrivacy] = useState({
        shareHealthData: true,
        anonymousStatistics: true,
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
            <header className="bg-white border-b">
                <div className="container py-4">
                    <div className="flex justify-between items-center mb-2">
                        <Link
                            href="/patient/dashboard"
                            className="inline-flex items-center gap-1 text-sm"
                        >
                            <LucideArrowLeft className="h-4 w-4" />
                            Back to Dashboard
                        </Link>
                    </div>
                    <h1 className="text-2xl font-bold">Settings</h1>
                </div>
            </header>

            <main className="container py-6">
                <div className="max-w-4xl space-y-6">
                    {/* Notifications */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <LucideBell className="h-5 w-5 text-primary" />
                                <CardTitle>Notifications</CardTitle>
                            </div>
                            <CardDescription>
                                Manage how you receive updates about your cases
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>Case Updates</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Receive notifications about your case status
                                    </p>
                                </div>
                                <Switch
                                    checked={notifications.caseUpdates}
                                    onCheckedChange={(checked) =>
                                        setNotifications({ ...notifications, caseUpdates: checked })
                                    }
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>Health Reminders</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Receive medication and follow-up reminders
                                    </p>
                                </div>
                                <Switch
                                    checked={notifications.healthReminders}
                                    onCheckedChange={(checked) =>
                                        setNotifications({ ...notifications, healthReminders: checked })
                                    }
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>Weekly Health Summary</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Get a weekly digest of your health activities
                                    </p>
                                </div>
                                <Switch
                                    checked={notifications.weeklyDigest}
                                    onCheckedChange={(checked) =>
                                        setNotifications({ ...notifications, weeklyDigest: checked })
                                    }
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Privacy */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <LucideShield className="h-5 w-5 text-primary" />
                                <CardTitle>Privacy & Data</CardTitle>
                            </div>
                            <CardDescription>
                                Control how your health information is shared
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>Share Health Data</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Allow clinicians to view your health history
                                    </p>
                                </div>
                                <Switch
                                    checked={privacy.shareHealthData}
                                    onCheckedChange={(checked) =>
                                        setPrivacy({ ...privacy, shareHealthData: checked })
                                    }
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>Anonymous Statistics</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Contribute anonymously to health research
                                    </p>
                                </div>
                                <Switch
                                    checked={privacy.anonymousStatistics}
                                    onCheckedChange={(checked) =>
                                        setPrivacy({ ...privacy, anonymousStatistics: checked })
                                    }
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Security */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <LucideLock className="h-5 w-5 text-primary" />
                                <CardTitle>Security</CardTitle>
                            </div>
                            <CardDescription>
                                Manage your account security settings
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Two-Factor Authentication</Label>
                                <div className="flex items-center gap-4">
                                    <Button variant="outline">Enable 2FA</Button>
                                    <p className="text-sm text-muted-foreground">
                                        Add an extra layer of security to your account
                                    </p>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Change Password</Label>
                                <div className="flex items-center gap-4">
                                    <Button variant="outline">Update Password</Button>
                                    <p className="text-sm text-muted-foreground">
                                        Regularly update your password to keep your account secure
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Interface */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <LucideMonitor className="h-5 w-5 text-primary" />
                                <CardTitle>Interface</CardTitle>
                            </div>
                            <CardDescription>
                                Customize your interface preferences
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Language</Label>
                                <Select defaultValue="en">
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select language" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="en">English</SelectItem>
                                        <SelectItem value="es">Español</SelectItem>
                                        <SelectItem value="fr">Français</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>High Contrast Mode</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Increase contrast for better visibility
                                    </p>
                                </div>
                                <Switch defaultChecked={false} />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>Large Text</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Increase text size throughout the app
                                    </p>
                                </div>
                                <Switch defaultChecked={false} />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
} 