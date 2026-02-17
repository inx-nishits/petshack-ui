"use client";

import { useState } from "react";
import { MessageSquareText, ThumbsUp, Frown, CheckCircle } from "lucide-react";

export default function FeedbackPage() {
    const [topic, setTopic] = useState("feature");
    const [message, setMessage] = useState("");
    const [rating, setRating] = useState<number | null>(null);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <div className="min-h-screen bg-surface py-12 sm:py-20 flex items-center justify-center">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                <div className="bg-white rounded-2xl sm:rounded-[3rem] shadow-xl border border-border overflow-hidden relative">
                    {!submitted ? (
                        <div className="grid grid-cols-1 lg:grid-cols-2">
                            <div className="p-8 sm:p-12 lg:p-16 bg-primary/5 border-r border-border/50 text-center lg:text-left">
                                <MessageSquareText className="w-12 h-12 sm:w-16 sm:h-16 text-primary mb-6 sm:mb-8 mx-auto lg:mx-0" />
                                <h1 className="text-3xl sm:text-4xl font-black text-foreground mb-4 sm:mb-6">We Value Your Bark!</h1>
                                <p className="text-muted text-sm sm:text-base font-medium leading-relaxed mb-6 sm:mb-8">
                                    Your feedback helps us make PetShack better for every paw in Australia. Tell us what you love or what needs fetching.
                                </p>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4 justify-center lg:justify-start">
                                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                                            <ThumbsUp className="w-5 h-5 text-green-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-foreground">Tell us what works</h3>
                                            <p className="text-xs text-muted-light">We love compliments!</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 justify-center lg:justify-start">
                                        <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                                            <Frown className="w-5 h-5 text-red-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-foreground">Report a bug</h3>
                                            <p className="text-xs text-muted-light">Help us squash them.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-8 sm:p-12 lg:p-16">
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label className="block text-xs font-black text-muted-light uppercase tracking-widest mb-2">How would you rate us?</label>
                                        <div className="flex items-center gap-2">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <button
                                                    key={star}
                                                    type="button"
                                                    onClick={() => setRating(star)}
                                                    className={`w-10 h-10 rounded-full flex items-center justify-center font-black transition-all border ${rating === star ? 'bg-primary text-white border-primary shadow-lg shadow-primary/30 scale-110' : 'bg-surface text-gray-400 border-border hover:border-primary/50 hover:text-primary'}`}
                                                >
                                                    {star}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-black text-muted-light uppercase tracking-widest mb-2">Topic</label>
                                        <select
                                            value={topic}
                                            onChange={(e) => setTopic(e.target.value)}
                                            className="w-full bg-surface border border-border rounded-xl px-4 py-3 sm:px-5 sm:py-4 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-bold text-xs sm:text-sm min-h-[44px]"
                                        >
                                            <option value="feature">Feature Request</option>
                                            <option value="bug">Report a Bug</option>
                                            <option value="general">General Feedback</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-black text-muted-light uppercase tracking-widest mb-2">Message</label>
                                        <textarea
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            className="w-full bg-surface border border-border rounded-xl px-4 py-3 sm:px-5 sm:py-4 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-medium text-sm min-h-[120px]"
                                            placeholder="What's on your mind?"
                                            required
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full bg-primary text-white py-3 sm:py-5 rounded-xl font-black text-lg shadow-xl shadow-primary/20 hover:bg-primary-dark transition-all hover:-translate-y-1 active:translate-y-0 min-h-[44px]"
                                    >
                                        Send Feedback
                                    </button>
                                </form>
                            </div>
                        </div>
                    ) : (
                        <div className="p-12 sm:p-20 text-center animate-in fade-in zoom-in duration-500">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
                                <CheckCircle className="w-10 h-10 text-green-600" />
                            </div>
                            <h2 className="text-3xl sm:text-4xl font-black mb-4">Feedback Sent!</h2>
                            <p className="text-muted text-lg font-medium max-w-lg mx-auto mb-10">
                                Thank you for taking the time to help us improve. We've received your feedback and will review it shortly.
                            </p>
                            <button
                                onClick={() => setSubmitted(false)}
                                className="px-8 py-4 bg-surface border border-border text-foreground hover:bg-white hover:border-primary hover:text-primary rounded-xl font-bold transition-all shadow-sm"
                            >
                                Send Another
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
