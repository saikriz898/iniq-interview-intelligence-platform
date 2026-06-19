import React, { useState, useEffect } from 'react';
import {
    User, Mail, MapPin, Globe, Linkedin, Github,
    ExternalLink, Save, ArrowLeft, Camera,
    ShieldCheck, Target, FileText, Image, Loader2, Briefcase
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useGlobalContext } from '../../context/GlobalContext';
import UserAppShell from '../../layouts/UserAppShell';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import CustomToaster from '../../components/common/CustomToaster';

const EditProfilePage = () => {
    const { theme, toggleTheme, user, setUser } = useGlobalContext();
    const navigate = useNavigate();
    const [pageLoading, setPageLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [formData, setFormData] = useState({
        name: '', email: '', location: '', domain: '', bio: '',
        linkedin: '', github: '', portfolio: '', profilePicture: '', resume: ''
    });

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        setPageLoading(true);
        const token = localStorage.getItem('iniq_token');
        try {
            const res = await fetch('http://localhost:5000/api/users/profile', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            if (res.ok) {
                setFormData({
                    name: data.name || '', email: data.email || '', location: data.location || '',
                    domain: data.domain || '', bio: data.bio || '', linkedin: data.linkedin || '',
                    github: data.github || '', portfolio: data.portfolio || '', profilePicture: data.profilePicture || '',
                    resume: data.resume || ''
                });
            }
        } catch (err) {
            toast.error('Failed to load profile');
        } finally {
            setPageLoading(false);
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.size > 3 * 1024 * 1024) {
            toast.error("Image size must be less than 3MB");
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setFormData({ ...formData, profilePicture: reader.result });
            toast.success("Avatar preview updated. Don't forget to save!");
        };
        reader.readAsDataURL(file);
    };

    const handleSave = async (e, overrideData = null) => {
        if (e) e.preventDefault();
        setSaving(true);
        const token = localStorage.getItem('iniq_token');
        const dataToSave = overrideData || formData;

        try {
            const res = await fetch('http://localhost:5000/api/users/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(dataToSave)
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Update failed');

            const updatedUser = {
                ...user,
                name: data.name,
                email: data.email,
                profilePicture: data.profilePicture
            };
            setUser(updatedUser);

            const storageUser = { ...updatedUser };
            if (storageUser.profilePicture && storageUser.profilePicture.length > 500000) {
                delete storageUser.profilePicture;
            }
            localStorage.setItem('iniq_user', JSON.stringify(storageUser));

            toast.success('Profile successfully updated!');
            navigate('/profile');
        } catch (err) {
            toast.error(err.message);
        } finally {
            setSaving(false);
        }
    };

    return (
        <UserAppShell theme={theme} toggleTheme={toggleTheme} isLoading={false} noPadding={true}>
            <CustomToaster />
            {pageLoading && (
                <div className="absolute inset-0 z-[100] bg-background/60 backdrop-blur-sm flex items-center justify-center">
                    <div className="flex flex-col items-center gap-4">
                        <div className="size-12 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
                        <span className="text-sm font-bold text-primary">Loading Profile Data...</span>
                    </div>
                </div>
            )}

            <form onSubmit={handleSave} className="h-full w-full flex flex-col bg-background overflow-y-auto custom-scrollbar pb-24 lg:pb-0 relative">

                {/* 1. HERO BANNER */}
                <div className="w-full h-40 sm:h-64 md:h-72 bg-gradient-to-tr from-primary/30 via-primary/10 to-surface relative shrink-0 border-b border-border/40 overflow-hidden">
                    {/* Header Strip with Back & Save */}
                    <div className="absolute top-0 left-0 w-full p-4 sm:p-6 z-20 flex justify-between items-center">
                        <button
                            onClick={() => navigate(-1)}
                            type="button"
                            className="size-10 rounded-xl bg-background/50 backdrop-blur-md border border-border/40 flex items-center justify-center text-text-muted hover:text-primary hover:border-primary/40 transition-all active:scale-95 shadow-sm"
                        >
                            <ArrowLeft className="size-5" />
                        </button>
                        <button
                            type="submit"
                            disabled={saving}
                            className="btn-primary px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 shadow-lg shadow-primary/20"
                        >
                            {saving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
                            {saving ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
                    <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-transparent to-background/90" />
                </div>

                {/* 2. PROFILE HEADER */}
                <div className="max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 -mt-16 sm:-mt-20 md:-mt-24 relative z-10 shrink-0">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 sm:gap-6">

                        {/* Avatar Upload */}
                        <div className="flex flex-col items-center sm:flex-row sm:items-end gap-4 sm:gap-6 text-center sm:text-left">
                            <div className="relative group shrink-0">
                                <div className="size-32 sm:size-36 md:size-40 rounded-3xl sm:rounded-2xl bg-surface border-[4px] sm:border-[6px] border-background shadow-xl sm:shadow-2xl relative z-10 overflow-hidden">
                                    <div className="size-full bg-background flex items-center justify-center relative">
                                        {formData.profilePicture ? (
                                            <img src={formData.profilePicture} alt="Avatar" className="size-full object-cover relative z-10" />
                                        ) : (
                                            <span className="text-5xl font-bold text-primary relative z-10">
                                                {formData.name?.charAt(0) || '?'}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <label htmlFor="avatar-upload" className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 size-10 sm:size-12 rounded-full bg-primary border-[4px] border-background shadow-lg flex items-center justify-center text-white hover:bg-primary-hover transition-transform active:scale-95 z-20 cursor-pointer">
                                    <Camera className="size-4 sm:size-5" />
                                </label>
                                <input
                                    type="file"
                                    id="avatar-upload"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleImageUpload}
                                />
                            </div>

                            <div className="flex flex-col pb-2">
                                <h1 className="text-2xl sm:text-3xl font-black text-content tracking-tight">{formData.name || 'Your Name'}</h1>
                                <span className="text-sm sm:text-base font-bold text-primary flex items-center justify-center sm:justify-start gap-1.5 mt-1">
                                    <Briefcase className="size-4" />
                                    {formData.domain || 'Set your Domain'}
                                </span>
                            </div>
                        </div>

                        {/* Remove Action */}
                        <div className="flex items-center justify-center gap-3 pb-2 w-full sm:w-auto mt-2 sm:mt-0">
                            {formData.profilePicture && (
                                <button
                                    type="button"
                                    disabled={saving}
                                    onClick={() => {
                                        const newData = { ...formData, profilePicture: '' };
                                        setFormData(newData);
                                        handleSave(null, newData);
                                    }}
                                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-danger/10 text-danger border border-danger/20 text-sm font-bold hover:bg-danger hover:text-white transition-all text-center disabled:opacity-50"
                                >
                                    Remove Avatar
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* 3. MAIN FORM GRID */}
                <div className="max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 flex-1 shrink-0">
                    <div className="flex flex-col gap-10">

                        {/* SECTION I */}
                        <div className="flex flex-col gap-6">
                            <div className="flex items-center gap-2 border-b border-border/40 pb-4">
                                <User className="size-5 text-text-muted" />
                                <h3 className="text-lg font-bold text-content">Basic Information</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <EditField
                                    label="Full Name"
                                    value={formData.name}
                                    icon={User}
                                    onChange={(v) => setFormData({ ...formData, name: v })}
                                />
                                <EditField
                                    label="Email Address"
                                    value={formData.email}
                                    icon={Mail}
                                    onChange={(v) => setFormData({ ...formData, email: v })}
                                    disabled={true}
                                />
                                <EditField
                                    label="Professional Title / Domain"
                                    value={formData.domain}
                                    icon={Globe}
                                    onChange={(v) => setFormData({ ...formData, domain: v })}
                                    placeholder="e.g. Full Stack Developer"
                                />
                                <EditField
                                    label="Location"
                                    value={formData.location}
                                    icon={MapPin}
                                    onChange={(v) => setFormData({ ...formData, location: v })}
                                    placeholder="e.g. San Francisco, CA"
                                />
                            </div>
                        </div>

                        {/* SECTION II */}
                        <div className="flex flex-col gap-6">
                            <div className="flex items-center gap-2 border-b border-border/40 pb-4">
                                <Target className="size-5 text-text-muted" />
                                <h3 className="text-lg font-bold text-content">About You</h3>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-bold text-text-muted">Bio</label>
                                <textarea
                                    value={formData.bio}
                                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                    className="w-full min-h-[140px] p-4 rounded-xl bg-background border border-border/40 focus:border-primary outline-none transition-all text-sm font-semibold text-content leading-relaxed placeholder:text-text-muted/40 resize-none shadow-sm"
                                    placeholder="Briefly describe your background, skills, and current professional goals..."
                                ></textarea>
                            </div>
                        </div>

                        {/* SECTION III */}
                        <div className="flex flex-col gap-6 pb-10">
                            <div className="flex items-center gap-2 border-b border-border/40 pb-4">
                                <Linkedin className="size-5 text-text-muted" />
                                <h3 className="text-lg font-bold text-content">External Links & Documents</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <EditField
                                    label="LinkedIn URL"
                                    value={formData.linkedin}
                                    icon={Linkedin}
                                    onChange={(v) => setFormData({ ...formData, linkedin: v })}
                                    placeholder="https://linkedin.com/in/username"
                                />
                                <EditField
                                    label="GitHub URL"
                                    value={formData.github}
                                    icon={Github}
                                    onChange={(v) => setFormData({ ...formData, github: v })}
                                    placeholder="https://github.com/username"
                                />
                                <EditField
                                    label="Portfolio Website"
                                    value={formData.portfolio}
                                    icon={ExternalLink}
                                    onChange={(v) => setFormData({ ...formData, portfolio: v })}
                                    placeholder="https://username.dev"
                                />
                                <EditField
                                    label="Google Drive Resume URL"
                                    value={formData.resume}
                                    icon={FileText}
                                    onChange={(v) => setFormData({ ...formData, resume: v })}
                                    placeholder="https://drive.google.com/..."
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </form>

        </UserAppShell>
    );
};

const EditField = ({ label, value, icon: Icon, onChange, disabled = false, placeholder = '' }) => (
    <div className="flex flex-col gap-2">
        <label className="text-xs font-bold text-text-muted">{label}</label>
        <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 size-5 flex items-center justify-center transition-colors">
                <Icon className={`size-4 ${disabled ? 'text-text-muted/40' : 'text-text-muted group-focus-within:text-primary'}`} />
            </div>
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                disabled={disabled}
                placeholder={placeholder}
                className={`w-full py-3.5 pl-12 pr-4 rounded-xl border outline-none transition-all text-sm font-semibold shadow-sm
                    ${disabled
                        ? 'bg-surface/50 border-border/20 text-text-muted/50 cursor-not-allowed'
                        : 'bg-background border-border/40 focus:border-primary text-content placeholder:text-text-muted/40 hover:border-border/80'
                    }
                `}
            />
        </div>
    </div>
);

export default EditProfilePage;
