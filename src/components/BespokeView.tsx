import React, { useState } from 'react';
import { Product, BespokeRequest } from '../types';
import { 
  Scissors, 
  Crown, 
  Sparkles, 
  Ruler, 
  ShieldCheck, 
  Check, 
  Calendar, 
  ArrowLeft,
  Clock,
  Send,
  User,
  Mail,
  Phone,
  FileText
} from 'lucide-react';

interface BespokeViewProps {
  targetProduct?: Product | null;
  onSubmitBespoke: (payload: any) => Promise<void> | void;
  onBackToHome: () => void;
  onExploreCollections: () => void;
}

export const BespokeView: React.FC<BespokeViewProps> = ({
  targetProduct,
  onSubmitBespoke,
  onBackToHome,
  onExploreCollections,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [garmentType, setGarmentType] = useState(targetProduct ? targetProduct.name : 'Royal Habesha Kemis Gown');
  const [fabricGrade, setFabricGrade] = useState<'Superfine Hand-spun Cotton' | 'Royal Silk Blend' | 'Heavy Gold Thread Shemma'>('Royal Silk Blend');
  const [tibebPatternColor, setTibebPatternColor] = useState(targetProduct?.tibebPattern || 'Imperial Gold & Crimson');
  
  // Measurements
  const [bustChest, setBustChest] = useState('');
  const [waist, setWaist] = useState('');
  const [hips, setHips] = useState('');
  const [shoulderToFloor, setShoulderToFloor] = useState('');
  const [sleeveLength, setSleeveLength] = useState('');
  
  const [eventDate, setEventDate] = useState('');
  const [specialNotes, setSpecialNotes] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!customerName.trim() || !email.trim() || !phone.trim()) {
      setErrorMsg('Please provide your name, email, and phone number so our master weavers can reach you.');
      return;
    }

    setIsSubmitting(true);

    const payload = {
      customerName: customerName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      garmentType: garmentType.trim(),
      fabricGrade,
      tibebPatternColor: tibebPatternColor.trim(),
      measurements: {
        bustChest: bustChest.trim() || 'Standard Fit',
        waist: waist.trim() || 'Standard Fit',
        hips: hips.trim() || 'Standard Fit',
        shoulderToFloor: shoulderToFloor.trim() || 'Floor Length',
        sleeveLength: sleeveLength.trim() || 'Full Length'
      },
      eventDate: eventDate.trim() || undefined,
      specialNotes: specialNotes.trim() || undefined
    };

    try {
      await onSubmitBespoke(payload);
      setIsSubmitted(true);
    } catch (err) {
      setErrorMsg('Failed to commission bespoke piece. Please try again or reach our concierge directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-6 animate-fade-in text-[#231B15]">
        <div className="w-20 h-20 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 flex items-center justify-center mx-auto shadow-inner">
          <Check className="w-10 h-10" />
        </div>
        
        <div className="space-y-3">
          <span className="text-xs font-serif font-bold uppercase tracking-widest text-[#B8860B]">
            Shiro Meda Master Loom Guild
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#231B15]">
            Bespoke Commission Received
          </h1>
          <p className="text-sm text-gray-700 max-w-lg mx-auto leading-relaxed">
            Thank you, <strong>{customerName}</strong>. Your custom fitting consultation request for <em>{garmentType}</em> has been lodged with the Yared Tibeb Atelier. A master artisan will review your specifications and contact you within 24 hours.
          </p>
        </div>

        <div className="pt-4 flex items-center justify-center gap-4">
          <button
            onClick={onBackToHome}
            className="px-6 py-3 bg-[#231B15] text-[#D4AF37] font-serif text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-black transition cursor-pointer shadow-md"
          >
            Return to Home
          </button>
          <button
            onClick={onExploreCollections}
            className="px-6 py-3 bg-white text-[#231B15] border border-[#231B15] font-serif text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-amber-50 transition cursor-pointer"
          >
            Explore Ready Pieces
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF8F3] text-[#1A1817] min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
        
        {/* Back navigation & header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5DFD3] pb-6">
          <div>
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-2 text-xs font-serif font-bold uppercase text-[#B8860B] hover:text-black transition mb-2 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Storefront</span>
            </button>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1817] flex items-center gap-3">
              <span>Bespoke Atelier Commission</span>
              <Crown className="w-7 h-7 text-[#B8860B]" />
            </h1>
          </div>
          <div className="flex items-center gap-2 text-xs font-serif text-gray-600 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-200">
            <Clock className="w-3.5 h-3.5 text-[#B8860B]" />
            <span>Handmade Loom Production: ~14-21 Days</span>
          </div>
        </div>

        {/* Narrative / Context Card */}
        <div className="bg-[#1A1817] text-[#FAF0D7] p-6 sm:p-8 rounded-3xl border border-[#D4AF37]/40 shadow-xl space-y-3 relative overflow-hidden">
          <div className="flex items-center gap-2 text-[#D4AF37]">
            <Sparkles className="w-4 h-4" />
            <span className="text-xs font-serif font-bold uppercase tracking-widest">Master Loom Craftsmanship</span>
          </div>
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-white">
            Custom Tailored to Your Exact Proportions
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 font-sans leading-relaxed max-w-2xl">
            Each bespoke Yared Tibeb garment is individually handwoven on traditional wooden looms in Addis Ababa using pure Ethiopian hand-spun cotton, metallic gold thread, and custom Tibeb motifs. Provide your dimensions below for a bespoke bridal or formal ensemble.
          </p>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="bg-white border border-[#E5DFD3] rounded-3xl p-6 sm:p-10 shadow-sm space-y-8">
          
          {errorMsg && (
            <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-serif">
              {errorMsg}
            </div>
          )}

          {/* Section 1: Client Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-[#E5DFD3] pb-2 text-[#1A1817]">
              <User className="w-4 h-4 text-[#B8860B]" />
              <h3 className="font-serif font-bold text-base uppercase tracking-wider">1. Client Contact Details</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-serif">
              <div>
                <label className="block font-bold text-[#1A1817] mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sifan Tadesse"
                  value={customerName}
                  onChange={e => setCustomerName(e.target.value)}
                  className="w-full p-3 rounded-xl border border-[#E5DFD3] bg-white font-sans text-xs focus:ring-2 focus:ring-[#B8860B] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-[#1A1817] mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. sifan@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full p-3 rounded-xl border border-[#E5DFD3] bg-white font-sans text-xs focus:ring-2 focus:ring-[#B8860B] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-[#1A1817] mb-1">Phone / WhatsApp *</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +251 91 123 4567"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="w-full p-3 rounded-xl border border-[#E5DFD3] bg-white font-sans text-xs focus:ring-2 focus:ring-[#B8860B] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Garment & Fabric Specification */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-[#E5DFD3] pb-2 text-[#1A1817]">
              <Scissors className="w-4 h-4 text-[#B8860B]" />
              <h3 className="font-serif font-bold text-base uppercase tracking-wider">2. Garment & Loom Selection</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-serif">
              <div>
                <label className="block font-bold text-[#1A1817] mb-1">Garment Style / Silhouette</label>
                <input
                  type="text"
                  value={garmentType}
                  onChange={e => setGarmentType(e.target.value)}
                  placeholder="e.g. Traditional Wedding Kemis Gown"
                  className="w-full p-3 rounded-xl border border-[#E5DFD3] bg-white font-sans text-xs focus:ring-2 focus:ring-[#B8860B] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-[#1A1817] mb-1">Tibeb Motif Palette</label>
                <input
                  type="text"
                  value={tibebPatternColor}
                  onChange={e => setTibebPatternColor(e.target.value)}
                  placeholder="e.g. Royal Gold, Deep Emerald & Crimson"
                  className="w-full p-3 rounded-xl border border-[#E5DFD3] bg-white font-sans text-xs focus:ring-2 focus:ring-[#B8860B] focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-bold text-[#1A1817] mb-1">Fabric Grade</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'Superfine Hand-spun Cotton', desc: '100% Ethiopian Shemma Cotton' },
                    { id: 'Royal Silk Blend', desc: 'Hand-woven Silk-Shemma Fusion' },
                    { id: 'Heavy Gold Thread Shemma', desc: 'Metallic Gold Thread & Royal Weave' }
                  ].map(grade => (
                    <button
                      key={grade.id}
                      type="button"
                      onClick={() => setFabricGrade(grade.id as any)}
                      className={`p-3 rounded-xl border text-left transition cursor-pointer ${
                        fabricGrade === grade.id
                          ? 'bg-[#1A1817] text-[#D4AF37] border-[#1A1817] shadow-sm'
                          : 'bg-white text-gray-700 border-[#E5DFD3] hover:border-[#B8860B]'
                      }`}
                    >
                      <p className="font-bold text-xs">{grade.id}</p>
                      <p className="text-[10px] text-gray-400 mt-0.5">{grade.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Measurements */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-[#E5DFD3] pb-2 text-[#1A1817]">
              <Ruler className="w-4 h-4 text-[#B8860B]" />
              <h3 className="font-serif font-bold text-base uppercase tracking-wider">3. Measurements (Inches or CM)</h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs font-serif">
              <div>
                <label className="block font-bold text-[#1A1817] mb-1">Bust / Chest</label>
                <input
                  type="text"
                  placeholder="e.g. 36 in"
                  value={bustChest}
                  onChange={e => setBustChest(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#E5DFD3] bg-white font-sans text-xs focus:ring-2 focus:ring-[#B8860B] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-[#1A1817] mb-1">Waist</label>
                <input
                  type="text"
                  placeholder="e.g. 28 in"
                  value={waist}
                  onChange={e => setWaist(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#E5DFD3] bg-white font-sans text-xs focus:ring-2 focus:ring-[#B8860B] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-[#1A1817] mb-1">Hips</label>
                <input
                  type="text"
                  placeholder="e.g. 38 in"
                  value={hips}
                  onChange={e => setHips(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#E5DFD3] bg-white font-sans text-xs focus:ring-2 focus:ring-[#B8860B] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-[#1A1817] mb-1">Shoulder-to-Floor</label>
                <input
                  type="text"
                  placeholder="e.g. 58 in"
                  value={shoulderToFloor}
                  onChange={e => setShoulderToFloor(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#E5DFD3] bg-white font-sans text-xs focus:ring-2 focus:ring-[#B8860B] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-[#1A1817] mb-1">Sleeve Length</label>
                <input
                  type="text"
                  placeholder="e.g. 24 in"
                  value={sleeveLength}
                  onChange={e => setSleeveLength(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#E5DFD3] bg-white font-sans text-xs focus:ring-2 focus:ring-[#B8860B] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section 4: Event Date & Special Notes */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-[#E5DFD3] pb-2 text-[#1A1817]">
              <Calendar className="w-4 h-4 text-[#B8860B]" />
              <h3 className="font-serif font-bold text-base uppercase tracking-wider">4. Timeline & Special Requests</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-serif">
              <div>
                <label className="block font-bold text-[#1A1817] mb-1">Event / Wedding Date (Optional)</label>
                <input
                  type="date"
                  value={eventDate}
                  onChange={e => setEventDate(e.target.value)}
                  className="w-full p-3 rounded-xl border border-[#E5DFD3] bg-white font-sans text-xs focus:ring-2 focus:ring-[#B8860B] focus:outline-none cursor-pointer"
                />
              </div>

              <div>
                <label className="block font-bold text-[#1A1817] mb-1">Special Artisan Notes / Tailoring Details</label>
                <textarea
                  rows={3}
                  value={specialNotes}
                  onChange={e => setSpecialNotes(e.target.value)}
                  placeholder="Any embroidery motifs, collar styles, or matching netela scarves required..."
                  className="w-full p-3 rounded-xl border border-[#E5DFD3] bg-white font-sans text-xs focus:ring-2 focus:ring-[#B8860B] focus:outline-none resize-none"
                />
              </div>
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-4 border-t border-[#E5DFD3] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-gray-500 font-sans">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Complimentary bespoke consultation with Shiro Meda Master Guild artisans.</span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-8 py-4 bg-[#231B15] hover:bg-black text-[#D4AF37] font-serif text-xs font-bold uppercase tracking-widest rounded-xl transition shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-amber-300 border-t-transparent rounded-full animate-spin" />
                  <span>Submitting Commission...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Submit Bespoke Commission</span>
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
