import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    MapPin, Mail, Users, Camera, Check, X, ChevronRight,
    Shield, LogOut, Trash2, KeyRound, Pencil
} from "lucide-react";
import linkedinIcon from "../../assets/linkedin@1x.svg";
import twitterIcon  from "../../assets/twitter@1x.svg";
import videoIcon    from "../../assets/video@1x.svg";
import { useCoach } from "../../context/CoachContext";
import { useAuth }  from "../../context/AuthContext";

/* ── Modal wrapper ─────────────────────────────────────────────────── */
const ModalOverlay = ({ onClose, children }) => (
    <AnimatePresence>
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 8 }}
                transition={{ type: 'spring', stiffness: 340, damping: 28 }}
                className="bg-[#1a1a1a] border border-[#483C32]/50 rounded-2xl w-full max-w-md shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </motion.div>
        </motion.div>
    </AnimatePresence>
);

/* ── Small info row ────────────────────────────────────────────────── */
const InfoRow = ({ icon: Icon, value, editing, children }) => (
    <div className="flex items-center gap-3 text-sm text-[#F5F5DC]/75">
        <Icon size={15} className="text-[#a38b82] flex-shrink-0" />
        {editing ? children : <span className="truncate">{value}</span>}
    </div>
);

/* ── Stat row (profile stats) ──────────────────────────────────────── */
const StatRow = ({ label, value, editing, onChange }) => (
    <div className="flex justify-between items-center bg-[#262626] border border-[#483C32]/25 px-4 py-3 rounded-xl">
        <span className="text-sm text-[#F5F5DC]/70">{label}</span>
        {editing ? (
            <input
                type="number"
                value={value}
                onChange={onChange}
                className="text-sm text-[#F5F5DC] bg-[#1a1a1a] border border-[#483C32]/50 rounded-lg px-2 py-1 w-16 text-center outline-none focus:border-[#a38b82] transition-colors"
            />
        ) : (
            <span className="text-sm font-semibold text-[#c9a896]">{value}</span>
        )}
    </div>
);

export default function Profile() {
    const navigate = useNavigate();
    const { user }  = useAuth();
    const {
        isNewUser, profileData, statsData, contactsData, profileImage,
        events, activities,
        setProfileImage, setEvents, setActivities,
        updateProfileData, updateStatsData, updateContactsData,
        isProfileComplete, completeProfileSetup, saveProfileToBackend, resetToNewUser,
    } = useCoach();

    const { sendPasswordOTP, verifyPasswordOTP, changePasswordWithOTP, deleteAccount, logout } = useAuth();

    // ── Password modal state ──
    const [showPasswordModal,  setShowPasswordModal]  = useState(false);
    const [otpStep,            setOtpStep]            = useState(1);
    const [otpCode,            setOtpCode]            = useState('');
    const [newPassword,        setNewPassword]        = useState('');
    const [confirmPassword,    setConfirmPassword]    = useState('');
    const [otpLoading,         setOtpLoading]         = useState(false);
    const [debugOtpBanner,     setDebugOtpBanner]     = useState(null);

    // ── Delete modal state ──
    const [showDeleteModal,         setShowDeleteModal]         = useState(false);
    const [deleteConfirmationInput, setDeleteConfirmationInput] = useState('');
    const [deleteLoading,           setDeleteLoading]           = useState(false);

    // ── OTP handlers ──
    const handleSendOTP = async () => {
        setOtpLoading(true);
        const res = await sendPasswordOTP();
        setOtpLoading(false);
        if (res.success) {
            setOtpStep(2);
            // Dev-only convenience: never surface the OTP in the UI outside local development.
            if (import.meta.env.DEV && res.debugOtp) setDebugOtpBanner(res.debugOtp);
            alert(res.message);
        } else {
            alert(res.message || 'Failed to send OTP');
        }
    };

    const handleVerifyOTP = async () => {
        if (!otpCode || otpCode.length !== 6) { alert('Please enter the 6-digit OTP code'); return; }
        setOtpLoading(true);
        const res = await verifyPasswordOTP(otpCode);
        setOtpLoading(false);
        if (res.success) { setOtpStep(3); alert('OTP verified! Enter your new password.'); }
        else alert(res.message || 'Invalid OTP code');
    };

    const handleChangePassword = async () => {
        if (!newPassword || newPassword.length < 6) { alert('New password must be at least 6 characters'); return; }
        if (newPassword !== confirmPassword) { alert('Passwords do not match'); return; }
        setOtpLoading(true);
        const res = await changePasswordWithOTP(otpCode, newPassword);
        setOtpLoading(false);
        if (res.success) {
            setShowPasswordModal(false); setOtpStep(1); setOtpCode(''); setNewPassword(''); setConfirmPassword('');
            alert(res.message);
        } else alert(res.message || 'Failed to update password');
    };

    // ── Delete handler ──
    const handleDeleteAccountConfirm = async () => {
        if (deleteConfirmationInput !== 'DELETE MY ACCOUNT') { alert('Type "DELETE MY ACCOUNT" exactly to confirm.'); return; }
        setDeleteLoading(true);
        const res = await deleteAccount();
        setDeleteLoading(false);
        if (res.success) { alert('Account deleted. Redirecting...'); navigate('/signup'); }
        else alert(res.message || 'Failed to delete account');
    };

    // ── Edit state ──
    const [isEditing,   setIsEditing]   = useState(isNewUser || !isProfileComplete());
    const [editSection, setEditSection] = useState('profile');

    // ── Event / Activity state ──
    const [showAddEvent,    setShowAddEvent]    = useState(false);
    const [newEvent,        setNewEvent]        = useState({ title: '', date: '', status: '' });
    const [showAddActivity, setShowAddActivity] = useState(false);
    const [newActivity,     setNewActivity]     = useState({ title: '', date: '' });

    const today = new Date(); today.setHours(0, 0, 0, 0);
    const upcomingEvents     = events.filter(e => new Date(e.date) >= today).sort((a,b) => new Date(a.date)-new Date(b.date)).slice(0,3);
    const upcomingActivities = activities.filter(a => new Date(a.date) >= today).sort((a,b) => new Date(a.date)-new Date(b.date)).slice(0,3);

    const handleAddEvent    = () => { if (!newEvent.title || !newEvent.date) return; setEvents([...events, newEvent]); setShowAddEvent(false); setNewEvent({ title:'', date:'', status:'' }); };
    const handleAddActivity = () => { if (!newActivity.title || !newActivity.date) return; setActivities([...activities, newActivity]); setShowAddActivity(false); setNewActivity({ title:'', date:'' }); };

    useEffect(() => { if (isNewUser || !isProfileComplete()) setIsEditing(true); }, [isNewUser, isProfileComplete]);

    const isFieldValid = (fieldName) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        switch (fieldName) {
            case 'name':     return profileData.name     && profileData.name.trim()     !== '';
            case 'title':    return profileData.title    && profileData.title.trim()    !== '';
            case 'email':    return profileData.email    && emailRegex.test(profileData.email.trim());
            case 'location': return profileData.location && profileData.location.trim() !== '';
            default:         return true;
        }
    };

    const getFieldBorder = (field) => {
        if (!isNewUser) return 'border-[#483C32]/50';
        return isFieldValid(field) ? 'border-green-500/70' : 'border-red-500/60';
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => setProfileImage(e.target.result);
            reader.readAsDataURL(file);
        }
    };

    const handleSave = async () => {
        if (isNewUser) {
            const missing = [];
            if (!profileData.name     || !profileData.name.trim())     missing.push('Name');
            if (!profileData.title    || !profileData.title.trim())     missing.push('Title');
            if (!profileData.email    || !profileData.email.trim())     missing.push('Email');
            if (!profileData.location || !profileData.location.trim()) missing.push('Location');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (profileData.email && !emailRegex.test(profileData.email.trim())) { alert('Please enter a valid email address.'); return; }
            if (missing.length > 0) { alert(`Please fill in the following required fields: ${missing.join(', ')}`); return; }
            if (profileData.sport && profileData.sport !== user?.sport) await updateProfileData({ sport: profileData.sport });
            const saveRes = await saveProfileToBackend();
            if (saveRes && saveRes.success === false) {
                alert(saveRes.message || 'Failed to save profile');
                return;
            }
            await completeProfileSetup();
            alert('Profile completed successfully! Welcome to Taktikal!');
            navigate('/dashboard');
        } else {
            const saveRes = await saveProfileToBackend();
            if (saveRes && saveRes.success === false) {
                alert(saveRes.message || 'Failed to save profile changes');
                return;
            }
            setIsEditing(false);
            setEditSection('profile');
            alert('Profile updated successfully!');
        }
    };

    const handleCancel = () => {
        if (isNewUser) return;
        setIsEditing(false);
        setEditSection('profile');
    };

    /* ── Shared field class ── */
    const fieldCls = (extraBorder = '') =>
        `w-full bg-[#262626] border ${extraBorder || 'border-[#483C32]/50'} focus:border-[#a38b82] text-[#F5F5DC] placeholder-[#F5F5DC]/30 rounded-xl px-3.5 py-2.5 outline-none text-sm transition-colors`;

    const completedFields = ['name', 'title', 'email', 'location'].filter(f => isFieldValid(f)).length;

    return (
        <div className="flex-1 p-4 md:p-6 lg:p-8 bg-[#212121] min-h-screen space-y-5">

            {/* ── Welcome Banner (New Users) ─────────────────────────────── */}
            {isNewUser && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-[#1a1a1a] border border-[#483C32]/45 rounded-xl p-5 md:p-6"
                >
                    <h2 className="text-xl font-bold text-[#F5F5DC] mb-1">Welcome to Taktikal! 🎉</h2>
                    <p className="text-[#F5F5DC]/60 text-sm mb-4">
                        Let's set up your coach profile. Fill in your details below to get started.
                    </p>
                    <div className="bg-[#262626] rounded-xl p-3">
                        <div className="flex justify-between text-xs text-[#F5F5DC]/50 mb-2">
                            <span>Profile completion</span>
                            <span className="font-semibold text-[#c9a896]">{completedFields}/4</span>
                        </div>
                        <div className="w-full bg-[#1a1a1a] rounded-full h-2">
                            <div
                                className="h-2 rounded-full bg-gradient-to-r from-[#c9a896] to-[#a38b82] transition-all duration-500"
                                style={{ width: `${(completedFields / 4) * 100}%` }}
                            />
                        </div>
                    </div>
                </motion.div>
            )}

            {/* ── Profile Card ───────────────────────────────────────────── */}
            <div className="bg-[#1a1a1a] border border-[#483C32]/45 rounded-xl p-5 md:p-6 shadow-lg">
                <div className="flex flex-col sm:flex-row items-start gap-5">
                    {/* Avatar */}
                    <div className="relative mx-auto sm:mx-0 flex-shrink-0">
                        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-[#483C32] bg-gradient-to-br from-[#483C32] to-[#c9a896]/20 overflow-hidden shadow-xl">
                            {profileImage ? (
                                <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-[#F5F5DC] font-bold text-2xl">
                                    {profileData.name.split(' ').map(n => n[0]).join('')}
                                </div>
                            )}
                        </div>
                        {isEditing && editSection === 'profile' && (
                            <label className="absolute -bottom-1 -right-1 bg-[#483C32] hover:bg-[#5a4a3e] text-[#F5F5DC] rounded-full w-8 h-8 flex items-center justify-center cursor-pointer transition-colors shadow-md border border-[#F5F5DC]/15">
                                <Camera size={14} />
                                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                            </label>
                        )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 w-full min-w-0">
                        {/* Name + title row */}
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                            {isEditing && editSection === 'profile' ? (
                                <>
                                    <input
                                        type="text" value={profileData.name}
                                        onChange={(e) => updateProfileData({ name: e.target.value })}
                                        placeholder="Full name"
                                        className={`text-xl font-bold text-[#F5F5DC] bg-[#262626] border ${getFieldBorder('name')} rounded-xl px-3 py-1.5 outline-none focus:border-[#a38b82] transition-colors flex-1 min-w-0`}
                                    />
                                    <input
                                        type="text" value={profileData.title}
                                        onChange={(e) => updateProfileData({ title: e.target.value })}
                                        placeholder="e.g. Head Coach"
                                        className={`text-xs bg-[#262626] border ${getFieldBorder('title')} rounded-full px-3 py-1.5 text-[#F5F5DC] outline-none focus:border-[#a38b82] transition-colors`}
                                    />
                                </>
                            ) : (
                                <>
                                    <h2 className="text-xl md:text-2xl font-bold text-[#F5F5DC] truncate">{profileData.name || 'Your Name'}</h2>
                                    <span className="text-xs px-3 py-1 rounded-full bg-[#483C32]/50 border border-[#483C32] text-[#c9a896] font-medium">
                                        {profileData.title || 'Your Title'}
                                    </span>
                                </>
                            )}
                        </div>

                        {/* Sport selector */}
                        <div className="mb-3">
                            {isEditing && editSection === 'profile' ? (
                                <select
                                    value={profileData.sport || user?.sport || 'Football'}
                                    onChange={(e) => updateProfileData({ sport: e.target.value })}
                                    className="text-xs bg-[#262626] border border-[#483C32]/50 rounded-xl px-3 py-1.5 text-[#F5F5DC] outline-none focus:border-[#a38b82] transition-colors appearance-none"
                                >
                                    {['Football','Cricket','Volleyball','Handball','Rugby'].map(s => (
                                        <option key={s} value={s}>{s}</option>
                                    ))}
                                </select>
                            ) : (
                                <span className="text-xs px-3 py-1 rounded-xl bg-[#262626] border border-[#483C32]/35 text-[#F5F5DC]/60">
                                    {profileData.sport || user?.sport || 'Football'}
                                </span>
                            )}
                        </div>

                        {/* Description */}
                        {isEditing && editSection === 'profile' ? (
                            <input
                                type="text" value={profileData.description}
                                onChange={(e) => updateProfileData({ description: e.target.value })}
                                placeholder="Brief description about yourself"
                                className={`${fieldCls()} mb-3`}
                            />
                        ) : (
                            <p className="text-sm text-[#F5F5DC]/60 mb-3 leading-relaxed">
                                {profileData.description || 'Add a brief description about yourself'}
                            </p>
                        )}

                        {/* Email + Location */}
                        <div className="space-y-2">
                            <InfoRow icon={Mail} value={profileData.email} editing={isEditing && editSection === 'profile'}>
                                <input
                                    type="email" value={profileData.email}
                                    onChange={(e) => updateProfileData({ email: e.target.value })}
                                    placeholder="your.email@example.com"
                                    className={`${fieldCls(getFieldBorder('email'))} flex-1`}
                                />
                            </InfoRow>
                            <InfoRow icon={MapPin} value={profileData.location} editing={isEditing && editSection === 'profile'}>
                                <input
                                    type="text" value={profileData.location}
                                    onChange={(e) => updateProfileData({ location: e.target.value })}
                                    placeholder="City, Country"
                                    className={`${fieldCls(getFieldBorder('location'))} flex-1`}
                                />
                            </InfoRow>
                            {(isEditing && editSection === 'profile') ? (
                                <div className="flex items-center gap-2">
                                    <Users size={15} className="text-[#a38b82] flex-shrink-0" />
                                    <input
                                        type="text" value={profileData.athletes}
                                        onChange={(e) => updateProfileData({ athletes: e.target.value })}
                                        className="bg-[#262626] border border-[#483C32]/50 focus:border-[#a38b82] rounded-xl px-3 py-1.5 text-[#F5F5DC] text-sm w-24 text-center outline-none transition-colors"
                                        placeholder="# Athletes"
                                    />
                                    <span className="text-sm text-[#F5F5DC]/50">Athletes</span>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2 text-sm text-[#F5F5DC]/70">
                                    <Users size={15} className="text-[#a38b82]" />
                                    <span className="font-semibold">{profileData.athletes}</span>
                                    <span className="text-[#F5F5DC]/45">Athletes</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-col gap-2 w-full sm:w-auto flex-shrink-0">
                        {isEditing ? (
                            <>
                                <button
                                    onClick={handleSave}
                                    disabled={isNewUser && !isProfileComplete()}
                                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
                                        isNewUser && !isProfileComplete()
                                            ? 'bg-[#262626] text-[#F5F5DC]/40 cursor-not-allowed border border-[#483C32]/30'
                                            : 'bg-green-700 hover:bg-green-600 text-white border border-green-600'
                                    }`}
                                >
                                    <Check size={14} />
                                    {isNewUser ? 'Complete Profile' : 'Save'}
                                </button>
                                {isNewUser && !isProfileComplete() && (
                                    <p className="text-xs text-red-400 text-center">
                                        Missing: {['name','title','email','location'].filter(f => !isFieldValid(f)).join(', ')}
                                    </p>
                                )}
                                {!isNewUser && (
                                    <button
                                        onClick={handleCancel}
                                        className="px-4 py-2 bg-[#262626] border border-[#483C32]/40 rounded-xl text-[#F5F5DC]/70 hover:text-[#F5F5DC] text-sm font-medium transition-all flex items-center gap-2"
                                    >
                                        <X size={14} /> Cancel
                                    </button>
                                )}
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="px-4 py-2 bg-[#262626] border border-[#483C32]/45 hover:border-[#a38b82]/60 rounded-xl text-[#F5F5DC]/80 hover:text-[#F5F5DC] text-sm font-medium transition-all flex items-center gap-2"
                                >
                                    <Pencil size={14} /> Edit
                                </button>
                                <button className="px-4 py-2 bg-[#483C32] hover:bg-[#5a4a3e] rounded-xl text-[#F5F5DC] text-sm font-medium transition-all border border-[#483C32]">
                                    Share
                                </button>
                                {import.meta.env.DEV && (
                                    <button
                                        onClick={resetToNewUser}
                                        className="px-4 py-2 bg-yellow-700 hover:bg-yellow-600 rounded-xl text-[#F5F5DC] text-sm font-medium transition-all"
                                        title="Reset to new user (dev only)"
                                    >
                                        Reset
                                    </button>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* ── Edit Section Tabs ──────────────────────────────────────── */}
            {isEditing && (
                <div className="bg-[#1a1a1a] border border-[#483C32]/40 rounded-xl p-4">
                    <p className="text-xs font-semibold text-[#F5F5DC]/45 uppercase tracking-wide mb-3">Edit Sections</p>
                    <div className="flex gap-2 flex-wrap">
                        {[
                            { id: 'profile',  label: 'Profile Info',  badge: '* Required' },
                            { id: 'stats',    label: 'Stats',         badge: 'Optional' },
                            { id: 'contacts', label: 'Contacts',      badge: 'Optional' },
                        ].map(({ id, label, badge }) => (
                            <button
                                key={id}
                                onClick={() => setEditSection(id)}
                                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-1.5 ${
                                    editSection === id
                                        ? 'bg-[#483C32] text-[#F5F5DC] border border-[#a38b82]/30'
                                        : 'bg-[#262626] text-[#F5F5DC]/55 border border-[#483C32]/25 hover:bg-[#2e2e2e] hover:text-[#F5F5DC]'
                                }`}
                            >
                                {label}
                                <span className={`text-[10px] ${id === 'profile' ? 'text-red-400' : 'text-green-400'}`}>{badge}</span>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* ── Activity ───────────────────────────────────────────────── */}
            <div className="bg-[#1a1a1a] border border-[#483C32]/40 rounded-xl p-5">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-base font-bold text-[#F5F5DC]">Activity</h3>
                    <button
                        onClick={() => setShowAddActivity(!showAddActivity)}
                        className="text-xs bg-[#483C32] hover:bg-[#5a4a3e] text-[#F5F5DC] px-3 py-1.5 rounded-xl transition-colors font-medium"
                    >
                        {showAddActivity ? 'Cancel' : '+ Add Activity'}
                    </button>
                </div>
                {showAddActivity && (
                    <div className="mb-4 bg-[#262626] border border-[#483C32]/30 p-3 rounded-xl flex flex-col sm:flex-row gap-2">
                        <input type="text" placeholder="Activity Title" className={fieldCls()} value={newActivity.title} onChange={e => setNewActivity({...newActivity, title: e.target.value})} />
                        <input type="date" className={fieldCls()} value={newActivity.date} onChange={e => setNewActivity({...newActivity, date: e.target.value})} />
                        <button onClick={handleAddActivity} className="bg-green-700 hover:bg-green-600 text-white text-xs px-4 py-2.5 rounded-xl font-medium transition-colors">Save</button>
                    </div>
                )}
                <div className="space-y-2">
                    {upcomingActivities.length > 0 ? upcomingActivities.map((act, i) => (
                        <div key={i} className="flex justify-between items-center bg-[#262626] border border-[#483C32]/25 p-3 rounded-xl">
                            <div>
                                <p className="text-sm font-semibold text-[#F5F5DC]">{act.title}</p>
                                <p className="text-xs text-[#F5F5DC]/45 mt-0.5">
                                    {new Date(act.date).toLocaleDateString('en-US', { month:'short', day:'numeric', year:'numeric' })}
                                </p>
                            </div>
                        </div>
                    )) : <p className="text-sm text-[#F5F5DC]/40">No upcoming activities.</p>}
                </div>
                <button className="mt-4 w-full bg-[#262626] border border-[#483C32]/30 hover:border-[#a38b82]/50 text-[#F5F5DC]/65 hover:text-[#F5F5DC] text-sm py-2.5 rounded-xl transition-all">
                    View All Activity
                </button>
            </div>

            {/* ── Events, Stats, Contacts Grid ───────────────────────────── */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {/* Events */}
                <div className="bg-[#1a1a1a] border border-[#483C32]/40 rounded-xl p-5">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-base font-bold text-[#F5F5DC]">Events</h3>
                        <button onClick={() => setShowAddEvent(!showAddEvent)} className="text-xs bg-[#483C32] hover:bg-[#5a4a3e] text-[#F5F5DC] px-3 py-1.5 rounded-xl transition-colors font-medium">
                            {showAddEvent ? 'Cancel' : '+ Add Event'}
                        </button>
                    </div>
                    {showAddEvent && (
                        <div className="mb-4 bg-[#262626] border border-[#483C32]/30 p-3 rounded-xl flex flex-col gap-2">
                            <input type="text" placeholder="Event Title" className={fieldCls()} value={newEvent.title} onChange={e => setNewEvent({...newEvent, title: e.target.value})} />
                            <input type="date" className={fieldCls()} value={newEvent.date} onChange={e => setNewEvent({...newEvent, date: e.target.value})} />
                            <input type="text" placeholder="Status (e.g. Live)" className={fieldCls()} value={newEvent.status} onChange={e => setNewEvent({...newEvent, status: e.target.value})} />
                            <button onClick={handleAddEvent} className="bg-green-700 hover:bg-green-600 text-white text-xs py-2.5 rounded-xl font-medium transition-colors">Save Event</button>
                        </div>
                    )}
                    <div className="space-y-2">
                        {upcomingEvents.length > 0 ? upcomingEvents.map((evt, i) => (
                            <div key={i} className="flex justify-between items-center bg-[#262626] border border-[#483C32]/25 p-3 rounded-xl">
                                <span className="text-sm text-[#F5F5DC]/85 truncate">
                                    {evt.title}{evt.status && <span className="text-green-400 ml-2 text-xs">{evt.status}</span>}
                                </span>
                                <span className="text-xs text-[#F5F5DC]/45 flex-shrink-0 ml-2">
                                    {new Date(evt.date).toLocaleDateString('en-US', { month:'short', day:'numeric' })}
                                </span>
                            </div>
                        )) : <p className="text-sm text-[#F5F5DC]/40">No upcoming events.</p>}
                    </div>
                    <button className="mt-4 w-full bg-[#262626] border border-[#483C32]/30 hover:border-[#a38b82]/50 text-[#F5F5DC]/65 hover:text-[#F5F5DC] text-sm py-2.5 rounded-xl transition-all">
                        View Calendar
                    </button>
                </div>

                {/* Stats */}
                <div className="bg-[#1a1a1a] border border-[#483C32]/40 rounded-xl p-5">
                    <h3 className="text-base font-bold text-[#F5F5DC] mb-4">Stats</h3>
                    <div className="space-y-2">
                        <StatRow label="Teams Coached"    value={statsData.teamsCoached}    editing={isEditing && editSection==='stats'} onChange={e => updateStatsData({teamsCoached: e.target.value})} />
                        <StatRow label="Current Athletes" value={statsData.currentAthletes}  editing={isEditing && editSection==='stats'} onChange={e => updateStatsData({currentAthletes: e.target.value})} />
                        <StatRow label="Championships"    value={statsData.championships}    editing={isEditing && editSection==='stats'} onChange={e => updateStatsData({championships: e.target.value})} />
                        <StatRow label="Years Active"     value={statsData.yearsActive}      editing={isEditing && editSection==='stats'} onChange={e => updateStatsData({yearsActive: e.target.value})} />
                    </div>
                </div>

                {/* Contacts */}
                <div className="bg-[#1a1a1a] border border-[#483C32]/40 rounded-xl p-5">
                    <h3 className="text-base font-bold text-[#F5F5DC] mb-4">Contacts</h3>
                    <div className="space-y-3">
                        {[
                            { key: 'linkedin',     src: linkedinIcon, label: 'LinkedIn', placeholder: 'https://linkedin.com/in/yourprofile', btnText: 'Connect' },
                            { key: 'twitter',      src: twitterIcon,  label: 'Twitter',  placeholder: 'https://twitter.com/yourhandle',      btnText: 'Follow' },
                            { key: 'videoChannel', src: videoIcon,    label: 'Video Channel', placeholder: 'https://youtube.com/...',        btnText: 'Subscribe' },
                        ].map(({ key, src, label, placeholder, btnText }) => (
                            <div key={key} className="bg-[#262626] border border-[#483C32]/25 p-3 rounded-xl">
                                <div className="flex items-center gap-2 mb-2">
                                    <img src={src} alt={label} className="w-5 h-5" />
                                    <span className="text-sm text-[#F5F5DC]/75 font-medium">{label}</span>
                                </div>
                                {isEditing && editSection === 'contacts' ? (
                                    <input
                                        type="url" value={contactsData[key]}
                                        onChange={(e) => updateContactsData({ [key]: e.target.value })}
                                        placeholder={placeholder}
                                        className={`${fieldCls()} mb-0`}
                                    />
                                ) : (
                                    <>
                                        {contactsData[key] && <p className="text-xs text-[#F5F5DC]/45 mb-2 break-all">{contactsData[key]}</p>}
                                        <button
                                            onClick={() => contactsData[key] && window.open(contactsData[key], '_blank')}
                                            disabled={!contactsData[key]}
                                            className={`w-full text-xs py-1.5 rounded-xl font-medium transition-all ${
                                                contactsData[key]
                                                    ? 'bg-[#1a1a1a] border border-[#483C32]/40 hover:border-[#a38b82]/60 text-[#F5F5DC]/70 hover:text-[#F5F5DC]'
                                                    : 'bg-[#1a1a1a] border border-[#483C32]/20 text-[#F5F5DC]/25 cursor-not-allowed'
                                            }`}
                                        >
                                            {contactsData[key] ? btnText : 'No URL Set'}
                                        </button>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Account Security ───────────────────────────────────────── */}
            <div className="bg-[#1a1a1a] border border-[#483C32]/40 rounded-xl p-5 md:p-6">
                <h3 className="font-bold text-[#F5F5DC] text-base mb-1 flex items-center gap-2">
                    <Shield size={16} className="text-[#a38b82]" />
                    Account Security &amp; Danger Zone
                </h3>
                <p className="text-xs text-[#F5F5DC]/45 mb-5">
                    Manage password reset via Email OTP, sign out, or permanently delete your account.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Change Password */}
                    <div className="bg-[#262626] border border-[#483C32]/30 p-4 rounded-xl flex flex-col justify-between gap-3">
                        <div>
                            <div className="flex items-center gap-2 mb-1.5">
                                <KeyRound size={14} className="text-[#c9a896]" />
                                <h4 className="font-bold text-[#F5F5DC] text-sm">Change Password</h4>
                            </div>
                            <p className="text-xs text-[#F5F5DC]/45 leading-relaxed">
                                Receive a 6-digit OTP code to your email to update your password.
                            </p>
                        </div>
                        <button
                            onClick={() => { setShowPasswordModal(true); setOtpStep(1); }}
                            className="w-full bg-[#483C32] hover:bg-[#5a4a3e] text-[#F5F5DC] py-2 rounded-xl text-xs font-semibold transition-colors border border-[#483C32]"
                        >
                            Send Email OTP
                        </button>
                    </div>

                    {/* Logout */}
                    <div className="bg-[#262626] border border-[#483C32]/30 p-4 rounded-xl flex flex-col justify-between gap-3">
                        <div>
                            <div className="flex items-center gap-2 mb-1.5">
                                <LogOut size={14} className="text-amber-400" />
                                <h4 className="font-bold text-[#F5F5DC] text-sm">Log Out Session</h4>
                            </div>
                            <p className="text-xs text-[#F5F5DC]/45 leading-relaxed">
                                Safely end your current session and clear auth cookies.
                            </p>
                        </div>
                        <button
                            onClick={() => { logout(); navigate('/login'); }}
                            className="w-full bg-amber-700/80 hover:bg-amber-600 text-white py-2 rounded-xl text-xs font-semibold transition-colors"
                        >
                            Logout Account
                        </button>
                    </div>

                    {/* Delete Account */}
                    <div className="bg-red-950/20 border border-red-800/40 p-4 rounded-xl flex flex-col justify-between gap-3">
                        <div>
                            <div className="flex items-center gap-2 mb-1.5">
                                <Trash2 size={14} className="text-red-400" />
                                <h4 className="font-bold text-red-300 text-sm">Delete Account</h4>
                            </div>
                            <p className="text-xs text-red-200/50 leading-relaxed">
                                Permanently remove coach profile and athlete roster data from MongoDB.
                            </p>
                        </div>
                        <button
                            onClick={() => setShowDeleteModal(true)}
                            className="w-full bg-red-700 hover:bg-red-600 text-white py-2 rounded-xl text-xs font-semibold transition-colors"
                        >
                            Delete Account
                        </button>
                    </div>
                </div>
            </div>

            {/* ── Password OTP Modal ─────────────────────────────────────── */}
            {showPasswordModal && (
                <ModalOverlay onClose={() => setShowPasswordModal(false)}>
                    <div className="p-6">
                        {/* Header */}
                        <div className="flex items-center justify-between pb-4 border-b border-[#483C32]/30 mb-5">
                            <div className="flex items-center gap-2">
                                <KeyRound size={16} className="text-[#c9a896]" />
                                <h4 className="font-bold text-[#F5F5DC]">Email OTP Password Change</h4>
                            </div>
                            <button onClick={() => setShowPasswordModal(false)} className="text-[#F5F5DC]/40 hover:text-[#F5F5DC] transition-colors">
                                <X size={18} />
                            </button>
                        </div>

                        {/* Step indicator */}
                        <div className="flex items-center gap-2 mb-6">
                            {[1,2,3].map(s => (
                                <div key={s} className="flex items-center gap-2">
                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                                        otpStep >= s ? 'bg-[#c9a896] text-[#1a1a1a]' : 'bg-[#262626] text-[#F5F5DC]/30 border border-[#483C32]/30'
                                    }`}>
                                        {otpStep > s ? <Check size={12} /> : s}
                                    </div>
                                    {s < 3 && <div className={`flex-1 h-0.5 w-6 ${otpStep > s ? 'bg-[#c9a896]' : 'bg-[#483C32]/30'}`} />}
                                </div>
                            ))}
                        </div>

                        {otpStep === 1 && (
                            <div className="space-y-4 text-center">
                                <p className="text-sm text-[#F5F5DC]/65">
                                    We will send a 6-digit OTP to:{' '}
                                    <strong className="text-[#F5F5DC]/90">{profileData.email || user?.email}</strong>
                                </p>
                                <button
                                    onClick={handleSendOTP}
                                    disabled={otpLoading}
                                    className="w-full bg-gradient-to-r from-[#c9a896] to-[#a38b82] hover:from-[#d4b5a2] hover:to-[#b09590] text-[#1a1a1a] py-3 rounded-xl font-bold text-sm transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    {otpLoading ? <><span className="w-4 h-4 border-2 border-[#1a1a1a]/30 border-t-[#1a1a1a] rounded-full animate-spin" /> Sending...</> : 'Send Verification OTP'}
                                </button>
                            </div>
                        )}

                        {otpStep === 2 && (
                            <div className="space-y-4">
                                {debugOtpBanner && (
                                    <div className="bg-amber-500/15 border border-amber-500/35 text-amber-200 p-3 rounded-xl text-xs text-center font-mono">
                                        🔑 Dev OTP: <strong>{debugOtpBanner}</strong>
                                    </div>
                                )}
                                <p className="text-xs text-[#F5F5DC]/55 text-center">Enter the 6-digit code received in email:</p>
                                <input
                                    type="text" value={otpCode}
                                    onChange={(e) => setOtpCode(e.target.value)}
                                    placeholder="1 2 3 4 5 6"
                                    maxLength={6}
                                    className="w-full text-center font-mono text-2xl tracking-[0.5em] bg-[#262626] border border-[#483C32]/50 focus:border-[#a38b82] p-3 rounded-xl text-[#F5F5DC] outline-none transition-colors"
                                />
                                <button
                                    onClick={handleVerifyOTP}
                                    disabled={otpLoading}
                                    className="w-full bg-gradient-to-r from-[#c9a896] to-[#a38b82] text-[#1a1a1a] py-3 rounded-xl font-bold text-sm disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    {otpLoading ? <><span className="w-4 h-4 border-2 border-[#1a1a1a]/30 border-t-[#1a1a1a] rounded-full animate-spin" /> Verifying...</> : 'Verify OTP'}
                                </button>
                            </div>
                        )}

                        {otpStep === 3 && (
                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs font-semibold text-[#F5F5DC]/55 uppercase tracking-wide block mb-1.5">New Password (min 6 chars)</label>
                                    <input
                                        type="password" value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className={fieldCls()}
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-[#F5F5DC]/55 uppercase tracking-wide block mb-1.5">Confirm New Password</label>
                                    <input
                                        type="password" value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className={fieldCls()}
                                    />
                                </div>
                                <button
                                    onClick={handleChangePassword}
                                    disabled={otpLoading}
                                    className="w-full bg-gradient-to-r from-[#c9a896] to-[#a38b82] text-[#1a1a1a] py-3 rounded-xl font-bold text-sm disabled:opacity-50 flex items-center justify-center gap-2 mt-2"
                                >
                                    {otpLoading ? <><span className="w-4 h-4 border-2 border-[#1a1a1a]/30 border-t-[#1a1a1a] rounded-full animate-spin" /> Updating...</> : 'Save New Password'}
                                </button>
                            </div>
                        )}
                    </div>
                </ModalOverlay>
            )}

            {/* ── Delete Account Modal ───────────────────────────────────── */}
            {showDeleteModal && (
                <ModalOverlay onClose={() => setShowDeleteModal(false)}>
                    <div className="p-6">
                        <div className="flex items-center justify-between pb-4 border-b border-red-800/30 mb-5">
                            <div className="flex items-center gap-2">
                                <Trash2 size={16} className="text-red-400" />
                                <h4 className="font-bold text-red-400">Confirm Account Deletion</h4>
                            </div>
                            <button onClick={() => setShowDeleteModal(false)} className="text-[#F5F5DC]/40 hover:text-[#F5F5DC] transition-colors">
                                <X size={18} />
                            </button>
                        </div>
                        <div className="space-y-4">
                            <p className="text-xs text-red-200/70 bg-red-950/30 border border-red-800/30 p-3 rounded-xl leading-relaxed">
                                ⚠️ <strong>Warning:</strong> Deleting your account will permanently wipe your profile, team athletes, and performance metrics from the database.
                            </p>
                            <div>
                                <label className="text-xs text-[#F5F5DC]/55 block mb-1.5">
                                    Type <strong className="text-red-400">DELETE MY ACCOUNT</strong> to confirm:
                                </label>
                                <input
                                    type="text" value={deleteConfirmationInput}
                                    onChange={(e) => setDeleteConfirmationInput(e.target.value)}
                                    placeholder="DELETE MY ACCOUNT"
                                    className="w-full font-mono text-sm bg-[#262626] border border-red-600/40 focus:border-red-500 p-2.5 rounded-xl text-[#F5F5DC] outline-none transition-colors"
                                />
                            </div>
                            <div className="flex justify-end gap-3 pt-1">
                                <button
                                    onClick={() => setShowDeleteModal(false)}
                                    className="px-5 py-2.5 bg-[#262626] hover:bg-[#2e2e2e] border border-[#483C32]/40 rounded-xl text-sm font-semibold text-[#F5F5DC]/70 transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDeleteAccountConfirm}
                                    disabled={deleteConfirmationInput !== 'DELETE MY ACCOUNT' || deleteLoading}
                                    className="px-5 py-2.5 bg-red-700 hover:bg-red-600 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl text-sm font-semibold text-white transition-all"
                                >
                                    {deleteLoading ? 'Deleting...' : 'Delete Permanently'}
                                </button>
                            </div>
                        </div>
                    </div>
                </ModalOverlay>
            )}
        </div>
    );
}