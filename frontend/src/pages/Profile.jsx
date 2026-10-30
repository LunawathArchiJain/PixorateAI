import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { FiCamera, FiTrash2 } from "react-icons/fi";
import Layout from "../components/layout/Layout";
import PageHeader from "../components/common/PageHeader";
import Avatar from "../components/common/Avatar";
import { useAuth } from "../context/AuthContext";
import { updateProfile } from "../services/userService";
import { createAvatar, validateImageFile } from "../utils/image";
import { errorMessage, formatDate } from "../utils/format";

export default function Profile() {
    const { user, stats, updateUser } = useAuth();
    const [name, setName] = useState(user?.name ?? "");
    const [saving, setSaving] = useState(false);
    const [photoBusy, setPhotoBusy] = useState(false);
    const fileRef = useRef(null);

    const trimmed = name.trim();
    const dirty = trimmed !== user?.name;

    const saveName = async (event) => {
        event.preventDefault();
        if (!trimmed) return toast.error("Name cannot be empty.");
        setSaving(true);
        try {
            const data = await updateProfile({ name: trimmed });
            updateUser(data.user);
            setName(data.user.name);
            toast.success("Profile updated");
        } catch (error) {
            toast.error(errorMessage(error, "Could not update your profile."));
        } finally {
            setSaving(false);
        }
    };

    const changePhoto = async (event) => {
        const file = event.target.files?.[0];
        event.target.value = "";
        if (!file) return;
        const problem = validateImageFile(file);
        if (problem) return toast.error(problem);
        setPhotoBusy(true);
        try {
            const data = await updateProfile({ avatar: await createAvatar(file) });
            updateUser(data.user);
            toast.success("Photo updated");
        } catch (error) {
            toast.error(errorMessage(error, "Could not update your photo."));
        } finally {
            setPhotoBusy(false);
        }
    };

    const removePhoto = async () => {
        setPhotoBusy(true);
        try {
            const data = await updateProfile({ avatar: "" });
            updateUser(data.user);
            toast.success("Photo removed");
        } catch (error) {
            toast.error(errorMessage(error, "Could not remove your photo."));
        } finally {
            setPhotoBusy(false);
        }
    };

    return (
        <Layout>
            <PageHeader title="Profile" description="How you appear in PIXORATE AI." />

            <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
                <section aria-label="Photo and activity">
                    <div className="flex items-center gap-5">
                        <Avatar user={user} size={96} />
                        <div>
                            <h2 className="text-2xl font-bold">{user?.name}</h2>
                            <p className="text-muted">{user?.email}</p>
                            <div className="mt-3 flex flex-wrap gap-2">
                                <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" tabIndex={-1} aria-label="Choose a profile photo" onChange={changePhoto} />
                                <button type="button" className="btn btn-outline" onClick={() => fileRef.current?.click()} disabled={photoBusy}><FiCamera aria-hidden="true" />{user?.avatar ? "Change photo" : "Add photo"}</button>
                                {user?.avatar && <button type="button" className="btn btn-outline" onClick={removePhoto} disabled={photoBusy} aria-label="Remove photo"><FiTrash2 aria-hidden="true" /></button>}
                            </div>
                        </div>
                    </div>

                    <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-line pt-6">
                        <div><dt className="text-sm text-muted">Generations</dt><dd className="mt-1 font-display text-3xl font-bold">{stats?.totalGenerations ?? 0}</dd></div>
                        <div><dt className="text-sm text-muted">Last generated</dt><dd className="mt-1 text-lg font-semibold">{stats?.lastGeneratedAt ? formatDate(stats.lastGeneratedAt) : "Never"}</dd></div>
                        <div><dt className="text-sm text-muted">Member since</dt><dd className="mt-1 text-lg font-semibold">{formatDate(user?.createdAt) || "Today"}</dd></div>
                    </dl>
                </section>

                <form onSubmit={saveName} className="panel space-y-5 p-6 sm:p-8" aria-label="Edit profile">
                    <h2 className="text-xl font-bold">Your details</h2>
                    <div>
                        <label htmlFor="profile-name" className="label">Full name</label>
                        <input id="profile-name" className="input" value={name} onChange={(e) => setName(e.target.value)} maxLength={60} autoComplete="name" required />
                    </div>
                    <div>
                        <label htmlFor="profile-email" className="label">Email</label>
                        <input id="profile-email" className="input" value={user?.email ?? ""} disabled readOnly />
                        <p className="mt-1.5 text-sm text-muted">Your email is your login and cannot be changed.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button type="submit" className="btn btn-primary" disabled={!dirty || saving}>{saving ? "Saving…" : "Save changes"}</button>
                        {dirty && <button type="button" className="btn btn-outline" onClick={() => setName(user?.name ?? "")}>Discard</button>}
                    </div>
                </form>
            </div>
        </Layout>
    );
}
