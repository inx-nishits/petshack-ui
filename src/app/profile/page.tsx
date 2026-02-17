"use client";

import { User, Mail, Phone, MapPin, ShieldCheck, Bell, CreditCard, LogOut, Camera, Lock, Save, X, Edit2 } from "lucide-react";
import Link from "next/link";
import { useState, useRef } from "react";

export default function ProfilePage() {
    const [user, setUser] = useState({
        firstName: "Jarryd",
        lastName: "Smith",
        email: "jarryd@example.com",
        phone: "+61 400 000 000",
        location: "Sydney, NSW",
        memberSince: "Jan 2024",
        membershipLevel: "Pet Lover",
        bio: "Passionate dog lover and owner of 2 wonderful Golden Retrievers.",
        avatar: ""
    });

    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({ ...user });

    const [passwordForm, setPasswordForm] = useState({
        current: "",
        new: "",
        confirm: ""
    });

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleSaveProfile = () => {
        setUser({ ...editForm });
        setIsEditing(false);
    };

    const handleAvatarClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Mock upload - in real app, would upload to server
            const url = URL.createObjectURL(file);
            setUser(prev => ({ ...prev, avatar: url }));
        }
    };

    return (
        <div className="min-h-screen bg-surface">
            {/* Header / Banner */}
            <div className="bg-primary/5 border-b border-primary/10 pb-20 pt-10 sm:pt-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8">
                        {/* Avatar Upload */}
                        <div className="relative group cursor-pointer" onClick={handleAvatarClick}>
                            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-white p-2 shadow-xl shadow-primary/10 transition-transform group-hover:scale-105">
                                <div className="w-full h-full rounded-full bg-surface border-2 border-dashed border-primary/30 flex items-center justify-center overflow-hidden relative">
                                    {user.avatar ? (
                                        <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
                                    ) : (
                                        <User className="w-10 h-10 sm:w-12 sm:h-12 text-primary/40" />
                                    )}
                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Camera className="w-6 h-6 text-white" />
                                    </div>
                                </div>
                            </div>
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                            <div className="absolute bottom-2 right-2 bg-primary text-white p-1.5 rounded-full shadow-lg border-2 border-white">
                                <Edit2 className="w-3 h-3" />
                            </div>
                        </div>

                        <div className="text-center md:text-left">
                            <h1 className="text-2xl sm:text-4xl font-black text-foreground mb-2">{user.firstName} {user.lastName}</h1>
                            <div className="flex flex-wrap justify-center md:justify-start gap-3 sm:gap-4 text-xs sm:text-sm font-bold text-muted-light uppercase tracking-widest">
                                <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-primary" /> {user.membershipLevel}</span>
                                <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {user.location}</span>
                            </div>
                        </div>
                        <div className="md:ml-auto flex gap-3">
                            <button
                                onClick={() => setIsEditing(!isEditing)}
                                className={`px-6 py-3 border rounded-xl text-sm font-bold transition-all shadow-sm flex items-center gap-2 ${isEditing ? 'bg-primary text-white border-primary' : 'bg-white border-border text-foreground hover:border-primary/50'}`}
                            >
                                {isEditing ? <><X className="w-4 h-4" /> Cancel Editing</> : <><Edit2 className="w-4 h-4" /> Edit Profile</>}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-12 sm:-mt-16 pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                    {/* Sidebar Nav */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-border overflow-hidden sticky top-24">
                            <div className="p-2 sm:p-3 space-y-1">
                                <Link href="#" className="flex items-center gap-3 px-4 py-3 sm:px-5 sm:py-4 bg-primary/5 text-primary rounded-xl font-bold text-sm sm:text-base border border-primary/10 transition-all">
                                    <User className="w-5 h-5" /> My Profile
                                </Link>
                                <Link href="#" className="flex items-center gap-3 px-4 py-3 sm:px-5 sm:py-4 text-gray-500 hover:text-foreground hover:bg-surface rounded-xl font-bold text-sm sm:text-base transition-all">
                                    <Bell className="w-5 h-5" /> Data Alerts
                                </Link>
                                <Link href="#" className="flex items-center gap-3 px-4 py-3 sm:px-5 sm:py-4 text-gray-500 hover:text-foreground hover:bg-surface rounded-xl font-bold text-sm sm:text-base transition-all">
                                    <CreditCard className="w-5 h-5" /> Subscription
                                </Link>
                                <div className="h-px bg-border/50 my-2" />
                                <button className="w-full flex items-center gap-3 px-4 py-3 sm:px-5 sm:py-4 text-red-500 hover:bg-red-50 rounded-xl font-bold text-sm sm:text-base transition-all">
                                    <LogOut className="w-5 h-5" /> Sign Out
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="lg:col-span-2 space-y-6 sm:space-y-8">
                        {/* Personal Info Card */}
                        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-border p-6 sm:p-10">
                            <div className="flex items-center justify-between mb-6 sm:mb-8">
                                <h2 className="text-xl font-black text-foreground flex items-center gap-3">
                                    <User className="w-6 h-6 text-primary" /> Personal Information
                                </h2>
                                {isEditing && (
                                    <button
                                        onClick={handleSaveProfile}
                                        className="text-xs sm:text-sm font-bold bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary-dark transition-colors"
                                    >
                                        <Save className="w-4 h-4" /> Save Changes
                                    </button>
                                )}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                                <div>
                                    <label className="block text-[10px] sm:text-xs font-black text-muted-light uppercase tracking-widest mb-2">First Name</label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={editForm.firstName}
                                            onChange={(e) => setEditForm({ ...editForm, firstName: e.target.value })}
                                            className="w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 font-bold"
                                        />
                                    ) : (
                                        <div className="text-base sm:text-lg font-bold text-foreground border-b border-border pb-2">{user.firstName}</div>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-[10px] sm:text-xs font-black text-muted-light uppercase tracking-widest mb-2">Last Name</label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={editForm.lastName}
                                            onChange={(e) => setEditForm({ ...editForm, lastName: e.target.value })}
                                            className="w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 font-bold"
                                        />
                                    ) : (
                                        <div className="text-base sm:text-lg font-bold text-foreground border-b border-border pb-2">{user.lastName}</div>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-[10px] sm:text-xs font-black text-muted-light uppercase tracking-widest mb-2">Phone Number</label>
                                    {isEditing ? (
                                        <input
                                            type="tel"
                                            value={editForm.phone}
                                            onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                                            className="w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 font-bold"
                                        />
                                    ) : (
                                        <div className="flex items-center gap-3 text-base sm:text-lg font-bold text-foreground border-b border-border pb-2">
                                            <Phone className="w-4 h-4 text-primary" /> {user.phone}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-[10px] sm:text-xs font-black text-muted-light uppercase tracking-widest mb-2">Location</label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={editForm.location}
                                            onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                                            className="w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 font-bold"
                                        />
                                    ) : (
                                        <div className="flex items-center gap-3 text-base sm:text-lg font-bold text-foreground border-b border-border pb-2">
                                            <MapPin className="w-4 h-4 text-primary" /> {user.location}
                                        </div>
                                    )}
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="block text-[10px] sm:text-xs font-black text-muted-light uppercase tracking-widest mb-2">Bio</label>
                                    {isEditing ? (
                                        <textarea
                                            value={editForm.bio}
                                            onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                                            className="w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 font-medium min-h-[100px]"
                                        />
                                    ) : (
                                        <div className="text-sm sm:text-base font-medium text-muted leading-relaxed">{user.bio || "No bio added yet."}</div>
                                    )}

                                </div>
                                <div className="sm:col-span-2">
                                    <label className="block text-[10px] sm:text-xs font-black text-muted-light uppercase tracking-widest mb-2">Email Address</label>
                                    <div className="flex items-center gap-3 text-base sm:text-lg font-bold text-foreground border-b border-border pb-2 opacity-70">
                                        <Mail className="w-4 h-4 text-primary" /> {user.email} <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded text-gray-500 ml-auto">Verified</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Change Password Card */}
                        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-border p-6 sm:p-10">
                            <h2 className="text-xl font-black text-foreground mb-6 sm:mb-8 flex items-center gap-3">
                                <Lock className="w-6 h-6 text-primary" /> Change Password
                            </h2>
                            <div className="grid grid-cols-1 gap-4 max-w-lg">
                                <div>
                                    <label className="block text-[10px] sm:text-xs font-black text-muted-light uppercase tracking-widest mb-2">Current Password</label>
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 bg-surface font-bold"
                                        value={passwordForm.current}
                                        onChange={e => setPasswordForm({ ...passwordForm, current: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] sm:text-xs font-black text-muted-light uppercase tracking-widest mb-2">New Password</label>
                                    <input
                                        type="password"
                                        placeholder="Enter new password"
                                        className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 bg-surface font-bold"
                                        value={passwordForm.new}
                                        onChange={e => setPasswordForm({ ...passwordForm, new: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] sm:text-xs font-black text-muted-light uppercase tracking-widest mb-2">Confirm New Password</label>
                                    <input
                                        type="password"
                                        placeholder="Confirm new password"
                                        className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 bg-surface font-bold"
                                        value={passwordForm.confirm}
                                        onChange={e => setPasswordForm({ ...passwordForm, confirm: e.target.value })}
                                    />
                                </div>
                                <div className="mt-2">
                                    <button className="px-6 py-3 bg-white border border-border rounded-xl font-bold text-sm hover:bg-surface hover:border-primary/50 transition-all">
                                        Update Password
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Mock Stats */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                            <div className="bg-white p-6 rounded-2xl border border-border shadow-sm text-center">
                                <div className="text-3xl font-black text-primary mb-1">2</div>
                                <div className="text-xs font-bold text-muted-light uppercase tracking-widest">Active Alerts</div>
                            </div>
                            <div className="bg-white p-6 rounded-2xl border border-border shadow-sm text-center">
                                <div className="text-3xl font-black text-primary mb-1">5</div>
                                <div className="text-xs font-bold text-muted-light uppercase tracking-widest">Saved Items</div>
                            </div>
                            <div className="bg-white p-6 rounded-2xl border border-border shadow-sm text-center">
                                <div className="text-3xl font-black text-primary mb-1">FREE</div>
                                <div className="text-xs font-bold text-muted-light uppercase tracking-widest">Current Plan</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
