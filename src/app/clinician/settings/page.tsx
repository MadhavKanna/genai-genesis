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
} from "lucide-react";

export default function ClinicianSettings() {
    const [notifications, setNotifications] = useState({
        newCases: true,
        caseUpdates: true,
        criticalAlerts: true,
        weeklyDigest: false,
    });

    const [availability, setAvailability] = useState({
        status: "available",
        autoAccept: false,
        maxCases: "10",
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
            <header className="bg-white border-b">
                <div className="container py-4">
                    <div className="flex justify-between items-center mb-2">
                        <Link
                            href="/clinician/dashboard"
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
                                Manage how you receive notifications and updates
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>New Case Alerts</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Receive notifications when new cases are assigned to you
                                    </p>
                                </div>
                                <Switch
                                    checked={notifications.newCases}
                                    onCheckedChange={(checked) =>
                                        setNotifications({ ...notifications, newCases: checked })
                                    }
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>Case Updates</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Get notified about updates to your active cases
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
                                    <Label>Critical Alerts</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Immediate notifications for urgent cases
                                    </p>
                                </div>
                                <Switch
                                    checked={notifications.criticalAlerts}
                                    onCheckedChange={(checked) =>
                                        setNotifications({ ...notifications, criticalAlerts: checked })
                                    }
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>Weekly Digest</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Receive a summary of your impact and activities
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

                    {/* Availability */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <LucideUser className="h-5 w-5 text-primary" />
                                <CardTitle>Availability</CardTitle>
                            </div>
                            <CardDescription>
                                Manage your availability and case load
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Status</Label>
                                <Select
                                    value={availability.status}
                                    onValueChange={(value) =>
                                        setAvailability({ ...availability, status: value })
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="available">Available</SelectItem>
                                        <SelectItem value="busy">Busy</SelectItem>
                                        <SelectItem value="away">Away</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>Auto-accept New Cases</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Automatically accept new cases when available
                                    </p>
                                </div>
                                <Switch
                                    checked={availability.autoAccept}
                                    onCheckedChange={(checked) =>
                                        setAvailability({ ...availability, autoAccept: checked })
                                    }
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Maximum Active Cases</Label>
                                <Input
                                    type="number"
                                    value={availability.maxCases}
                                    onChange={(e) =>
                                        setAvailability({ ...availability, maxCases: e.target.value })
                                    }
                                    min="1"
                                    max="50"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Security */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <LucideShield className="h-5 w-5 text-primary" />
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
                                    <Label>Compact View</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Show more information in less space
                                    </p>
                                </div>
                                <Switch defaultChecked={false} />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>Auto-refresh Dashboard</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Keep your dashboard updated in real-time
                                    </p>
                                </div>
                                <Switch defaultChecked={true} />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
} 